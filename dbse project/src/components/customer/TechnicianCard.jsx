import React from 'react';
import { UserCheck, Star, Phone, Mail, Award, CheckCircle } from 'lucide-react';

export const TechnicianCard = ({ technician }) => {
  if (!technician) return null;

  return (
    <div className="technician-info-card">
      <div className="tech-card-header">
        <div className="tech-avatar">
          <UserCheck size={32} />
        </div>
        <div className="tech-main-details">
          <h4 className="tech-name">{technician.name || "Assigned Technician"}</h4>
          <span className="tech-spec">{technician.specialization || "Home Service Specialist"}</span>
          <div className="tech-rating">
            <Star size={14} fill="#f59e0b" color="#f59e0b" />
            <span>{technician.rating || 4.9}</span>
            <span className="tech-jobs">({technician.completed_jobs || technician.completedJobsCount || 45}+ jobs completed)</span>
          </div>
        </div>
      </div>

      <div className="tech-contact-list">
        {technician.phone && (
          <div className="tech-contact-item">
            <Phone size={15} />
            <span>{technician.phone}</span>
          </div>
        )}
        {technician.email && (
          <div className="tech-contact-item">
            <Mail size={15} />
            <span>{technician.email}</span>
          </div>
        )}
        <div className="tech-contact-item">
          <Award size={15} />
          <span>Status: <strong>{technician.availability || "Available"}</strong></span>
        </div>
      </div>
    </div>
  );
};
