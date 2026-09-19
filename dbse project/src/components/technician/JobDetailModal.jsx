import React from 'react';
import { MapPin, Phone, Calendar, Clock, AlertTriangle, CheckCircle, User } from 'lucide-react';
import { Modal } from '../common/Modal';
import { StatusBadge } from '../common/StatusBadge';

export const JobDetailModal = ({ isOpen, onClose, job, onUpdateStatus }) => {
  if (!job) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Job Details - ${job.id}`}>
      <div className="job-detail-content">
        <div className="job-detail-header">
          <div>
            <span className="category-pill">{job.categoryName}</span>
            <h3 className="job-service-name">{job.serviceTitle}</h3>
          </div>
          <StatusBadge status={job.status} />
        </div>

        <div className="customer-info-box">
          <h4>Customer Contact & Location</h4>
          <div className="info-grid">
            <div className="info-row">
              <User size={16} />
              <span>Name: <strong>{job.customerName}</strong></span>
            </div>
            <div className="info-row">
              <Phone size={16} />
              <span>Phone: <a href={`tel:${job.customerPhone}`}><strong>{job.customerPhone}</strong></a></span>
            </div>
            <div className="info-row full-width">
              <MapPin size={16} />
              <span>Address: <strong>{job.address}</strong></span>
            </div>
          </div>
        </div>

        <div className="job-schedule-box">
          <div className="info-row">
            <Calendar size={16} />
            <span>Scheduled Date: <strong>{job.scheduledDate}</strong></span>
          </div>
          <div className="info-row">
            <Clock size={16} />
            <span>Time Slot: <strong>{job.scheduledSlot}</strong></span>
          </div>
          <div className="info-row">
            <AlertTriangle size={16} />
            <span>Urgency: <strong>{job.urgency}</strong></span>
          </div>
        </div>

        <div className="problem-description-box">
          <h4>Problem Statement</h4>
          <p>{job.problemDescription || "No additional problem details provided."}</p>
        </div>

        <div className="pricing-summary">
          <span>Service Amount to Collect / Verify:</span>
          <span className="amount">₹{job.price} ({job.paymentStatus})</span>
        </div>

        <div className="modal-actions tech-job-actions">
          {job.status === 'Pending' && (
            <button 
              className="btn btn-primary"
              onClick={() => { onUpdateStatus(job.id, 'Accepted'); onClose(); }}
            >
              Accept This Job
            </button>
          )}

          {job.status === 'Accepted' && (
            <button 
              className="btn btn-primary"
              onClick={() => { onUpdateStatus(job.id, 'In Progress'); onClose(); }}
            >
              Start Work (In Progress)
            </button>
          )}

          {job.status === 'In Progress' && (
            <button 
              className="btn btn-success"
              onClick={() => { onUpdateStatus(job.id, 'Completed'); onClose(); }}
            >
              <CheckCircle size={16} /> Mark as Work Completed
            </button>
          )}

          <button className="btn btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </Modal>
  );
};
