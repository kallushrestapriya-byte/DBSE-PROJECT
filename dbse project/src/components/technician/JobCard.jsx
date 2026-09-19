import React from 'react';
import { Calendar, Clock, MapPin, Phone, Eye, CheckCircle2, Play } from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';

export const JobCard = ({ job, onViewDetails, onUpdateStatus }) => {
  return (
    <div className="tech-job-card">
      <div className="job-card-header">
        <span className="job-id-pill">{job.id}</span>
        <StatusBadge status={job.status} />
      </div>

      <div className="job-card-body">
        <span className="category-tag">{job.categoryName}</span>
        <h3 className="service-title">{job.serviceTitle}</h3>

        <div className="customer-preview">
          <span className="cust-name">Customer: <strong>{job.customerName}</strong></span>
          <span className="cust-phone"><Phone size={13} /> {job.customerPhone}</span>
        </div>

        <div className="job-meta-list">
          <div className="meta-line">
            <Calendar size={14} />
            <span>{job.scheduledDate}</span>
          </div>
          <div className="meta-line">
            <Clock size={14} />
            <span>{job.scheduledSlot}</span>
          </div>
          <div className="meta-line">
            <MapPin size={14} />
            <span className="truncate">{job.address}</span>
          </div>
        </div>
      </div>

      <div className="job-card-footer">
        <div className="job-price">₹{job.price}</div>
        <div className="footer-actions">
          <button className="btn btn-outline btn-sm" onClick={() => onViewDetails(job)}>
            <Eye size={14} /> View
          </button>

          {job.status === 'Pending' && (
            <button className="btn btn-primary btn-sm" onClick={() => onUpdateStatus(job.id, 'Accepted')}>
              Accept
            </button>
          )}

          {job.status === 'Accepted' && (
            <button className="btn btn-primary btn-sm" onClick={() => onUpdateStatus(job.id, 'In Progress')}>
              <Play size={14} /> Start
            </button>
          )}

          {job.status === 'In Progress' && (
            <button className="btn btn-success btn-sm" onClick={() => onUpdateStatus(job.id, 'Completed')}>
              <CheckCircle2 size={14} /> Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
