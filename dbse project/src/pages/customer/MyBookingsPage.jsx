import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CalendarCheck, Clock, UserCheck, ArrowRight, Wrench } from 'lucide-react';
import { bookingApi } from '../../api/bookingApi';
import { userApi } from '../../api/userApi';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await bookingApi.getMyBookings();
      setBookings(data || []);
    } catch (err) {
      setError("Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="my-bookings-page container py-4">
      
      <div className="page-header mb-4 flex-between">
        <div>
          <h1 className="page-title">My Bookings</h1>
          <p className="page-subtitle">View active technician appointments, work schedules, and service progress</p>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching confirmed bookings from backend..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchBookings} />
      ) : bookings.length === 0 ? (
        <EmptyState 
          title="No Bookings Scheduled" 
          message="You don't have any confirmed technician bookings yet."
          actionText="Book a Service"
          actionLink="/services"
        />
      ) : (
        <div className="bookings-grid-list">
          {bookings.map(booking => (
            <div key={booking.id} className="booking-card-item">
              
              <div className="booking-card-header">
                <div className="b-title-box">
                  <div className="b-icon">
                    <CalendarCheck size={20} />
                  </div>
                  <div>
                    <h3 className="b-service-name">{booking.service_name || "AC Repair & Servicing"}</h3>
                    <span className="b-id-tag">Booking ID: #{booking.id}</span>
                  </div>
                </div>
                <StatusBadge status={booking.status} />
              </div>

              <div className="booking-card-body">
                <div className="b-info-row">
                  <div className="info-col">
                    <span className="info-label"><Clock size={14} /> Scheduled Date</span>
                    <span className="info-val">{booking.booking_date}</span>
                  </div>

                  <div className="info-col">
                    <span className="info-label"><Clock size={14} /> Time Slot</span>
                    <span className="info-val">{booking.start_time} - {booking.end_time}</span>
                  </div>

                  <div className="info-col">
                    <span className="info-label"><UserCheck size={14} /> Technician</span>
                    <span className="info-val">{booking.technician_name || "Rajesh Kumar"}</span>
                  </div>
                </div>
              </div>

              <div className="booking-card-footer">
                <span className="created-time">Confirmed: {booking.created_at || "Recent"}</span>
                <button 
                  onClick={() => navigate(`/bookings/${booking.id}`)} 
                  className="btn btn-primary btn-sm"
                >
                  View Booking <ArrowRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
