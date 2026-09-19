import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  CalendarCheck, 
  PlusCircle, 
  ArrowRight, 
  User, 
  ClipboardList,
  AlertCircle,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { requestApi } from '../../api/requestApi';
import { bookingApi } from '../../api/bookingApi';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const CustomerDashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [reqData, bookData] = await Promise.all([
          requestApi.getMyRequests(),
          bookingApi.getMyBookings()
        ]);
        setRequests(reqData || []);
        setBookings(bookData || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Compute Real Statistics
  const totalRequestsCount = requests.length;
  const pendingRequestsCount = requests.filter(r => r.status === 'Pending').length;
  const confirmedBookingsCount = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Accepted').length;
  const completedServicesCount = requests.filter(r => r.status === 'Completed').length + bookings.filter(b => b.status === 'Completed').length;

  // Upcoming Booking Highlight
  const upcomingBooking = bookings.find(b => b.status === 'Confirmed' || b.status === 'Accepted') || null;

  return (
    <div className="dashboard-page container py-4">
      
      {/* Welcome Banner */}
      <section className="dashboard-welcome-banner mb-4">
        <div className="welcome-banner-text">
          <h1>Welcome back, <span className="highlight-text">{currentUser?.name || "Customer"}</span>!</h1>
          <p>Manage your home service requests, track active technician bookings, and keep your home running smoothly.</p>
        </div>
        <Link to="/services" className="btn btn-primary btn-lg welcome-cta-btn">
          <PlusCircle size={20} /> Book a New Service
        </Link>
      </section>

      {/* Statistics Cards Grid */}
      <section className="mb-5">
        <h3 className="section-subtitle mb-3 font-weight-bold">Overview Statistics</h3>
        {loading ? (
          <LoadingSpinner message="Calculating dashboard metrics..." />
        ) : (
          <div className="metrics-grid">
            
            <div className="metric-card" onClick={() => navigate('/requests')}>
              <div className="metric-icon-box bg-blue-light">
                <ClipboardList size={26} className="text-blue" />
              </div>
              <div className="metric-data">
                <span className="metric-label">Total Requests</span>
                <h2 className="metric-value">{totalRequestsCount}</h2>
                <span className="metric-foot">Submitted service orders</span>
              </div>
            </div>

            <div className="metric-card" onClick={() => navigate('/requests')}>
              <div className="metric-icon-box bg-amber-light">
                <Clock size={26} className="text-amber" />
              </div>
              <div className="metric-data">
                <span className="metric-label">Pending Requests</span>
                <h2 className="metric-value">{pendingRequestsCount}</h2>
                <span className="metric-foot">Awaiting technician match</span>
              </div>
            </div>

            <div className="metric-card" onClick={() => navigate('/bookings')}>
              <div className="metric-icon-box bg-indigo-light">
                <CalendarCheck size={26} className="text-indigo" />
              </div>
              <div className="metric-data">
                <span className="metric-label">Confirmed Bookings</span>
                <h2 className="metric-value">{confirmedBookingsCount}</h2>
                <span className="metric-foot">Scheduled & assigned</span>
              </div>
            </div>

            <div className="metric-card" onClick={() => navigate('/requests')}>
              <div className="metric-icon-box bg-emerald-light">
                <CheckCircle2 size={26} className="text-emerald" />
              </div>
              <div className="metric-data">
                <span className="metric-label">Completed Services</span>
                <h2 className="metric-value">{completedServicesCount}</h2>
                <span className="metric-foot">Successfully resolved</span>
              </div>
            </div>

          </div>
        )}
      </section>

      {/* Quick Actions Row */}
      <section className="mb-5">
        <h3 className="section-subtitle mb-3">Quick Actions</h3>
        <div className="quick-actions-grid">
          <Link to="/services" className="quick-action-card">
            <div className="qa-icon"><Wrench size={22} /></div>
            <div className="qa-text">
              <h4>Book a Service</h4>
              <p>Browse plumbing, electrical, AC repair & cleaning catalog</p>
            </div>
            <ArrowRight size={18} className="qa-arrow" />
          </Link>

          <Link to="/requests" className="quick-action-card">
            <div className="qa-icon"><ClipboardList size={22} /></div>
            <div className="qa-text">
              <h4>My Requests</h4>
              <p>View & track status of your service requests</p>
            </div>
            <ArrowRight size={18} className="qa-arrow" />
          </Link>

          <Link to="/bookings" className="quick-action-card">
            <div className="qa-icon"><CalendarCheck size={22} /></div>
            <div className="qa-text">
              <h4>My Bookings</h4>
              <p>Check technician assignments & service schedules</p>
            </div>
            <ArrowRight size={18} className="qa-arrow" />
          </Link>

          <Link to="/profile" className="quick-action-card">
            <div className="qa-icon"><User size={22} /></div>
            <div className="qa-text">
              <h4>My Profile</h4>
              <p>Update personal contact info & home address</p>
            </div>
            <ArrowRight size={18} className="qa-arrow" />
          </Link>
        </div>
      </section>

      {/* Upcoming Booking & Recent Requests Section */}
      <div className="dashboard-two-col-grid">
        
        {/* Upcoming Booking Card */}
        <div className="dashboard-card">
          <div className="card-header-flex">
            <h3><Calendar size={20} className="icon-blue" /> Upcoming Booking</h3>
            <Link to="/bookings" className="link-sm">All Bookings</Link>
          </div>

          {upcomingBooking ? (
            <div className="upcoming-booking-box">
              <div className="ub-header">
                <span className="ub-id">Booking #{upcomingBooking.id}</span>
                <StatusBadge status={upcomingBooking.status} />
              </div>
              <h4 className="ub-title">{upcomingBooking.service_name || "AC Repair & Servicing"}</h4>
              <div className="ub-schedule">
                <Clock size={16} /> 
                <span>{upcomingBooking.booking_date} • {upcomingBooking.start_time} - {upcomingBooking.end_time}</span>
              </div>
              <div className="ub-actions mt-3">
                <Link to={`/bookings/${upcomingBooking.id}`} className="btn btn-outline btn-sm btn-block">
                  View Booking Details
                </Link>
              </div>
            </div>
          ) : (
            <div className="empty-mini-box">
              <Sparkles size={28} className="empty-mini-icon" />
              <p>No upcoming bookings scheduled.</p>
              <Link to="/services" className="btn btn-primary btn-sm mt-2">Book a Service</Link>
            </div>
          )}
        </div>

        {/* Recent Requests Card */}
        <div className="dashboard-card">
          <div className="card-header-flex">
            <h3><ClipboardList size={20} className="icon-blue" /> Recent Requests</h3>
            <Link to="/requests" className="link-sm">View All</Link>
          </div>

          {requests.length === 0 ? (
            <div className="empty-mini-box">
              <Wrench size={28} className="empty-mini-icon" />
              <p>No recent requests found.</p>
            </div>
          ) : (
            <div className="recent-requests-list">
              {requests.slice(0, 3).map(req => (
                <div key={req.id} className="recent-request-item" onClick={() => navigate(`/requests/${req.id}`)}>
                  <div className="req-item-left">
                    <div className="req-icon-circle">
                      <Wrench size={18} />
                    </div>
                    <div>
                      <h5 className="req-name">{req.service_name || "Home Repair"}</h5>
                      <span className="req-date">REQ-{req.id} • {req.preferred_date}</span>
                    </div>
                  </div>
                  <div className="req-item-right">
                    <StatusBadge status={req.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
