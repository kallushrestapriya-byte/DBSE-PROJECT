import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ClipboardList, Wrench, Calendar, Clock, ArrowRight, PlusCircle } from 'lucide-react';
import { requestApi } from '../../api/requestApi';
import { StatusBadge } from '../../components/common/StatusBadge';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const MyRequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await requestApi.getMyRequests();
      setRequests(data || []);
    } catch (err) {
      setError("Unable to load service requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="my-requests-page container py-4">
      
      <div className="page-header mb-4 flex-between">
        <div>
          <h1 className="page-title">My Service Requests</h1>
          <p className="page-subtitle">Track live status and details of your raised home service orders</p>
        </div>
        <Link to="/services" className="btn btn-primary">
          <PlusCircle size={18} /> Raise New Request
        </Link>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching your service requests from backend..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchRequests} />
      ) : requests.length === 0 ? (
        <EmptyState 
          title="No Service Requests Found" 
          message="You haven't placed any home service requests yet."
          actionText="Explore Services"
          actionLink="/services"
        />
      ) : (
        <div className="requests-grid-list">
          {requests.map(req => (
            <div key={req.id} className="request-card-item">
              
              <div className="req-card-header">
                <div className="req-title-box">
                  <div className="req-icon">
                    <Wrench size={20} />
                  </div>
                  <div>
                    <h3 className="req-service-name">{req.service_name || "Home Repair Service"}</h3>
                    <span className="req-id-tag">Request ID: #{req.id}</span>
                  </div>
                </div>
                <StatusBadge status={req.status} />
              </div>

              <div className="req-card-body">
                <div className="req-info-row">
                  <div className="info-col">
                    <span className="info-label"><Calendar size={14} /> Scheduled Date</span>
                    <span className="info-val">{req.preferred_date || "Flexible"}</span>
                  </div>

                  <div className="info-col">
                    <span className="info-label"><Clock size={14} /> Preferred Time Slot</span>
                    <span className="info-val">{req.preferred_time || "Morning Slot"}</span>
                  </div>

                  <div className="info-col">
                    <span className="info-label">Base Price</span>
                    <span className="info-val text-blue font-weight-bold">₹{req.service_price || 499}</span>
                  </div>
                </div>

                <div className="req-problem-desc mt-3">
                  <strong>Problem Description:</strong>
                  <p>{req.problem_description || "No specific problem details provided."}</p>
                </div>
              </div>

              <div className="req-card-footer">
                <span className="created-time">Raised on: {req.created_at || "Recent"}</span>
                <button 
                  onClick={() => navigate(`/requests/${req.id}`)} 
                  className="btn btn-outline btn-sm"
                >
                  View Details <ArrowRight size={14} />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
