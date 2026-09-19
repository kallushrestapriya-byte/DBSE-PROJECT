import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Star, 
  MessageSquare, 
  XCircle, 
  ChevronDown, 
  ChevronUp,
  UserCheck
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { StatusStepper } from './StatusStepper';
import { Modal } from '../common/Modal';

export const RequestCard = ({ request, onCancel, onOpenFeedback }) => {
  const [expanded, setExpanded] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  return (
    <div className="request-card">
      
      {/* Card Top Row */}
      <div className="request-card-header">
        <div className="req-id-box">
          <span className="req-id-text">{request.id}</span>
          <span className="req-date-badge">Placed on {request.createdAt}</span>
        </div>
        <StatusBadge status={request.status} />
      </div>

      {/* Main Info Body */}
      <div className="request-card-body">
        <div className="service-info-row">
          <div className="service-title-section">
            <span className="category-pill">{request.categoryName}</span>
            <h3 className="req-service-title">{request.serviceTitle}</h3>
          </div>
          <div className="req-price-box">
            <span className="req-price">₹{request.price}</span>
            <span className="payment-method">{request.paymentStatus}</span>
          </div>
        </div>

        {/* Schedule & Address Row */}
        <div className="req-meta-grid">
          <div className="meta-item">
            <Calendar size={16} className="meta-icon" />
            <span>Date: <strong>{request.scheduledDate}</strong></span>
          </div>
          <div className="meta-item">
            <Clock size={16} className="meta-icon" />
            <span>Slot: <strong>{request.scheduledSlot}</strong></span>
          </div>
          <div className="meta-item address-item">
            <MapPin size={16} className="meta-icon" />
            <span>Address: <strong>{request.address}</strong></span>
          </div>
        </div>

        {/* Status Stepper Timeline */}
        <div className="stepper-wrapper">
          <StatusStepper timeline={request.timeline} />
        </div>

        {/* Assigned Technician Block if assigned */}
        {request.technicianName && (
          <div className="assigned-tech-banner">
            <div className="tech-avatar-box">
              <img 
                src={request.technicianAvatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80"} 
                alt={request.technicianName} 
              />
            </div>
            <div className="tech-info">
              <span className="tech-label">Assigned Technician</span>
              <h4 className="tech-name">{request.technicianName}</h4>
              <div className="tech-sub">
                <Star size={12} fill="#f59e0b" color="#f59e0b" />
                <span>{request.technicianRating || "4.8"} Rating</span>
                <span className="bullet">•</span>
                <Phone size={12} />
                <span>{request.technicianPhone}</span>
              </div>
            </div>
            <a href={`tel:${request.technicianPhone}`} className="btn btn-outline btn-sm call-tech-btn">
              Call Tech
            </a>
          </div>
        )}

        {/* Expandable Problem Description */}
        {expanded && (
          <div className="expanded-details">
            <h4>Problem Description & Notes</h4>
            <p className="problem-text">{request.problemDescription || "No detailed description provided."}</p>
            <div className="urgency-tag">Urgency: <strong>{request.urgency}</strong></div>
          </div>
        )}
      </div>

      {/* Card Footer Actions */}
      <div className="request-card-footer">
        <button 
          className="btn-toggle-expand"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <>Hide Details <ChevronUp size={16} /></> : <>View Details & Notes <ChevronDown size={16} /></>}
        </button>

        <div className="action-buttons-group">
          {request.status === 'Pending' && (
            <button 
              className="btn btn-outline btn-danger-text"
              onClick={() => onCancel(request.id)}
            >
              <XCircle size={16} /> Cancel Request
            </button>
          )}

          {request.status === 'Completed' && (
            request.feedback ? (
              <div className="given-feedback-badge">
                <Star size={14} fill="#f59e0b" color="#f59e0b" />
                <span>You Rated {request.feedback.rating}/5</span>
              </div>
            ) : (
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => onOpenFeedback(request)}
              >
                <MessageSquare size={16} /> Rate & Review
              </button>
            )
          )}
        </div>
      </div>

    </div>
  );
};
