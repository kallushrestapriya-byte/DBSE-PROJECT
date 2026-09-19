import React, { useState } from 'react';
import { UserCheck, Star, ShieldCheck, Briefcase, Award, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const TechProfilePage = () => {
  const { currentUser } = useAuth();
  const [availability, setAvailability] = useState(currentUser?.availability || 'Available');
  const [bio, setBio] = useState(currentUser?.bio || 'Senior certified technician with 6+ years experience in pipe leakages and AC jet wash.');

  return (
    <div className="technician-page">
      <div className="page-header-row">
        <div>
          <h2>Technician Profile & Settings</h2>
          <p>Manage your public professional profile, skills, and dispatch availability status</p>
        </div>
      </div>

      <div className="profile-grid-layout">
        
        {/* Left Tech Card */}
        <div className="profile-sidebar-card">
          <div className="avatar-section">
            <img 
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"} 
              alt={currentUser?.name}
              className="profile-large-avatar"
            />
            <h3 className="profile-user-name">{currentUser?.name}</h3>
            <span className="profile-role-pill">Verified Technician</span>
          </div>

          <div className="availability-toggle-box mt-3">
            <label className="font-semibold block mb-2">Dispatch Status</label>
            <select 
              className="form-control"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            >
              <option value="Available">🟢 Available for Dispatch</option>
              <option value="On Job">🟡 On Active Job</option>
              <option value="Off Duty">🔴 Off Duty / On Break</option>
            </select>
          </div>

          <div className="profile-stats-summary mt-4">
            <div className="stat-box">
              <span className="num">{currentUser?.rating || 4.8}★</span>
              <span className="label">Rating</span>
            </div>
            <div className="stat-box">
              <span className="num">{currentUser?.completedJobsCount || 128}</span>
              <span className="label">Jobs Done</span>
            </div>
            <div className="stat-box">
              <span className="num">{currentUser?.experienceYears || 6} yrs</span>
              <span className="label">Experience</span>
            </div>
          </div>
        </div>

        {/* Right Details Card */}
        <div className="profile-main-content">
          <div className="profile-card">
            <h3>Technician Qualifications & Specialization</h3>
            
            <div className="form-group mt-3">
              <label>Specialization</label>
              <input type="text" className="form-control" value={currentUser?.specialization || "Plumbing & AC Repair"} disabled />
            </div>

            <div className="form-group mt-3">
              <label>Skills & Certifications</label>
              <div className="skills-tags-row">
                {(currentUser?.skills || ["Plumbing", "AC Repair", "Pipe Fitting", "Gas Refill", "Leak Detection"]).map((skill, idx) => (
                  <span key={idx} className="skill-pill">
                    <CheckCircle2 size={12} /> {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="form-group mt-4">
              <label>Bio / Background Summary</label>
              <textarea 
                rows={4}
                className="form-control"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <button className="btn btn-primary mt-3" onClick={() => alert("Tech profile updated!")}>
              Save Profile Updates
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
