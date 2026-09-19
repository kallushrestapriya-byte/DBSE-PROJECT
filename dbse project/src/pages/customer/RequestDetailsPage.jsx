import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Wrench, 
  Calendar, 
  Clock, 
  MapPin, 
  UserCheck, 
  ArrowLeft, 
  CheckCircle2, 
  CalendarCheck,
  Tag
} from 'lucide-react';
import { requestApi } from '../../api/requestApi';
import { bookingApi } from '../../api/bookingApi';
import { serviceApi } from '../../api/serviceApi';
import { userApi } from '../../api/userApi';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorMessage } from '../../components/common/ErrorMessage';
import { TechnicianCard } from '../../components/customer/TechnicianCard';

export const RequestDetailsPage = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState(null);
  const [service, setService] = useState(null);
  const [booking, setBooking] = useState(null);
  const [technician, setTechnician] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const reqData = await requestApi.getRequestById(requestId);
        setRequest(reqData);

        if (reqData && reqData.service_id) {
          try {
            const srvData = await serviceApi.getServiceById(reqData.service_id);
            setService(srvData);
          } catch (e) {}
        }

        // Check if there is an associated booking
        const bookingsList = await bookingApi.getMyBookings();
        const foundBooking = bookingsList.find(b => String(b.request_id) === String(requestId));
        if (foundBooking) {
          setBooking(foundBooking);
          if (foundBooking.technician_id) {
            const techData = await userApi.getTechnicianById(foundBooking.technician_id);
            setTechnician(techData);
          }
        }
      } catch (err) {
        setError("Unable to load request details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [requestId]);

  if (loading) return <div className="container py-5"><LoadingSpinner message="Loading request details..." /></div>;
  if (error || !request) return <div className="container py-5"><ErrorMessage message={error || "Request record not found."} /></div>;

  return (
    <div className="request-details-page container py-4">
      
      <button onClick={() => navigate(-1)} className="btn btn-ghost mb-3">
        <ArrowLeft size={16} /> Back to My Requests
      </button>

      <div className="page-header mb-4 flex-between">
        <div>
          <h1 className="page-title">Request #{request.id}</h1>
          <p className="page-subtitle">Submitted on {request.created_at || "Recent"}</p>
        </div>
        <StatusBadge status={request.status} />
      </div>

      <div className="details-grid-two-col">
        
        {/* Left Column */}
        <div className="details-col-main">
          
          {/* Service Information */}
          <div className="detail-section-card mb-4">
            <h3 className="card-section-title"><Wrench size={18} className="icon-blue" /> Service Information</h3>
            <div className="service-info-flex mt-3">
              <div className="si-details">
                <h4>{request.service_name || service?.name || "Home Repair"}</h4>
                <p>{service?.description || "Professional service fulfilled by verified technicians."}</p>
                <div className="si-meta">
                  <span className="price-tag">Price: <strong>₹{request.service_price || service?.price || 499}</strong></span>
                  <span className="duration-tag"><Clock size={14} /> Duration: {service?.duration || request.service_duration || "45 mins"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Request Schedule & Details */}
          <div className="detail-section-card mb-4">
            <h3 className="card-section-title"><Calendar size={18} className="icon-blue" /> Request Details</h3>
            <div className="info-kv-grid mt-3">
              <div className="kv-item">
                <span className="kv-label">Request ID</span>
                <span className="kv-val font-mono">#{request.id}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Preferred Date</span>
                <span className="kv-val">{request.preferred_date}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Preferred Time Slot</span>
                <span className="kv-val">{request.preferred_time}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Current Status</span>
                <span className="kv-val"><StatusBadge status={request.status} /></span>
              </div>
            </div>

            <div className="problem-box mt-3">
              <strong>Problem Description:</strong>
              <p>{request.problem_description}</p>
            </div>
          </div>

          {/* Location Information */}
          <div className="detail-section-card mb-4">
            <h3 className="card-section-title"><MapPin size={18} className="icon-blue" /> Service Location</h3>
            <div className="location-info-box mt-3">
              <p className="address-text">{request.location_details || request.address || "Home Address"}</p>
            </div>
          </div>

        </div>

        {/* Right Column: Booking Information */}
        <div className="details-col-side">
          
          <div className="detail-section-card sticky-card">
            <h3 className="card-section-title"><CalendarCheck size={18} className="icon-blue" /> Booking & Assignment</h3>
            
            {booking ? (
              <div className="booking-assigned-box mt-3">
                <div className="booking-meta-row mb-3">
                  <span className="b-id">Booking #{booking.id}</span>
                  <StatusBadge status={booking.status} />
                </div>

                <div className="schedule-box mb-3">
                  <span className="s-label">Assigned Schedule:</span>
                  <p className="s-val">{booking.booking_date} ({booking.start_time} - {booking.end_time})</p>
                </div>

                {technician && (
                  <div className="tech-assigned-wrapper">
                    <h4 className="tech-header">Assigned Technician:</h4>
                    <TechnicianCard technician={technician} />
                  </div>
                )}

                <Link to={`/bookings/${booking.id}`} className="btn btn-primary btn-block mt-3">
                  View Full Booking Progress
                </Link>
              </div>
            ) : (
              <div className="booking-pending-box mt-3">
                <Clock size={32} className="text-amber mb-2" />
                <h4>Assignment Pending</h4>
                <p>We are assigning the best technician near your locality. Once assigned, booking details will appear here.</p>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
