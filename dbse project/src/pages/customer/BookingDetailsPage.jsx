import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CalendarCheck, 
  Wrench, 
  UserCheck, 
  Clock, 
  ArrowLeft, 
  CreditCard,
  CheckCircle2,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { bookingApi } from '../../api/bookingApi';
import { serviceApi } from '../../api/serviceApi';
import { userApi } from '../../api/userApi';
import { StatusBadge } from '../../components/common/StatusBadge';
import { StatusStepper } from '../../components/common/StatusStepper';
import { TechnicianCard } from '../../components/customer/TechnicianCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const BookingDetailsPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [service, setService] = useState(null);
  const [technician, setTechnician] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const bData = await bookingApi.getBookingById(bookingId);
        setBooking(bData);

        if (bData) {
          if (bData.service_id) {
            try {
              const sData = await serviceApi.getServiceById(bData.service_id);
              setService(sData);
            } catch (e) {}
          }

          if (bData.technician_id) {
            try {
              const tData = await userApi.getTechnicianById(bData.technician_id);
              setTechnician(tData);
            } catch (e) {}
          }
        }
      } catch (err) {
        setError("Unable to load booking details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookingDetails();
  }, [bookingId]);

  if (loading) return <div className="container py-5"><LoadingSpinner message="Loading booking details..." /></div>;
  if (error || !booking) return <div className="container py-5"><ErrorMessage message={error || "Booking not found."} /></div>;

  return (
    <div className="booking-details-page container py-4">
      
      <button onClick={() => navigate(-1)} className="btn btn-ghost mb-3">
        <ArrowLeft size={16} /> Back to My Bookings
      </button>

      <div className="page-header mb-4 flex-between">
        <div>
          <h1 className="page-title">Booking #{booking.id}</h1>
          <p className="page-subtitle">Scheduled for {booking.booking_date} ({booking.start_time} - {booking.end_time})</p>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      {/* 1. VISUAL PROGRESS TRACKER STEPPER */}
      <div className="detail-section-card mb-4">
        <h3 className="card-section-title mb-3"><Clock size={18} className="icon-blue" /> Service Progress Tracker</h3>
        <StatusStepper currentStatus={booking.status} />
      </div>

      <div className="details-grid-two-col">
        
        {/* Left Column */}
        <div className="details-col-main">
          
          {/* Service Info */}
          <div className="detail-section-card mb-4">
            <h3 className="card-section-title"><Wrench size={18} className="icon-blue" /> Service Details</h3>
            <div className="service-info-flex mt-3">
              <div className="si-details">
                <h4>{service?.name || booking.service_name || "AC Repair & Servicing"}</h4>
                <p>{service?.description || "Expert servicing, gas top-up, filter cleaning, and leak test."}</p>
                <div className="si-meta">
                  <span className="price-tag">Amount Due: <strong>₹{service?.price || booking.amount || 699}</strong></span>
                  <span className="duration-tag"><Clock size={14} /> Duration: {service?.duration || "60 mins"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Info */}
          <div className="detail-section-card mb-4">
            <h3 className="card-section-title"><CalendarCheck size={18} className="icon-blue" /> Schedule Information</h3>
            <div className="info-kv-grid mt-3">
              <div className="kv-item">
                <span className="kv-label">Booking ID</span>
                <span className="kv-val font-mono">#{booking.id}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Appointment Date</span>
                <span className="kv-val">{booking.booking_date}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">Start Time</span>
                <span className="kv-val">{booking.start_time}</span>
              </div>
              <div className="kv-item">
                <span className="kv-label">End Time</span>
                <span className="kv-val">{booking.end_time}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Technician & Payment CTA */}
        <div className="details-col-side">
          
          {/* Technician Info */}
          <div className="detail-section-card mb-4">
            <h3 className="card-section-title"><UserCheck size={18} className="icon-blue" /> Technician Details</h3>
            <TechnicianCard technician={technician || {
              name: booking.technician_name || "Rajesh Kumar",
              specialization: "HVAC & AC Master Technician",
              rating: 4.9,
              availability: "Assigned",
              completed_jobs: 142,
              phone: "+91 98765 43210",
              email: "rajesh.tech@homeserve.com"
            }} />
          </div>

          {/* Payment Link Card */}
          <div className="detail-section-card">
            <h3 className="card-section-title"><CreditCard size={18} className="icon-blue" /> Payment Status</h3>
            <p className="payment-status-preview mt-2">
              View invoice statement, payment method, and settlement status for this booking.
            </p>
            <Link to={`/payments/${booking.id}`} className="btn btn-primary btn-block mt-3">
              <CreditCard size={18} /> View Payment & Invoice
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
