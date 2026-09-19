import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, CheckCircle2, Star, DollarSign, Clock, MapPin, User, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useServices } from '../../context/ServiceContext';
import { TechStatCard } from '../../components/technician/TechStatCard';
import { JobCard } from '../../components/technician/JobCard';
import { JobDetailModal } from '../../components/technician/JobDetailModal';

export const TechDashboard = () => {
  const { currentUser } = useAuth();
  const { requests, updateStatus } = useServices();
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  // Filter jobs for this technician or general unassigned/pending jobs
  const myAssignedJobs = requests.filter(r => r.technicianId === currentUser?.id || r.status === 'Pending' || r.status === 'Accepted' || r.status === 'In Progress');
  const activeJobs = myAssignedJobs.filter(r => r.status === 'Accepted' || r.status === 'In Progress');
  const completedJobs = requests.filter(r => (r.technicianId === currentUser?.id || r.status === 'Completed') && r.status === 'Completed');
  const totalEarnings = completedJobs.reduce((sum, j) => sum + (j.price || 0), 0);

  const handleUpdateStatus = async (jobId, newStatus) => {
    await updateStatus(jobId, newStatus, currentUser);
  };

  return (
    <div className="technician-page">
      
      {/* Tech Welcome Header */}
      <div className="tech-hero-banner">
        <div>
          <h2>Technician Workspace 🛠️</h2>
          <p>Welcome back, <strong>{currentUser?.name || "Technician"}</strong> • Specialization: {currentUser?.specialization || "Plumbing & AC Repair"}</p>
        </div>
        <div className="tech-availability-pill">
          <span className="dot pulse-green"></span>
          <span>Status: <strong>Available for Dispatch</strong></span>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="tech-stats-grid">
        <TechStatCard 
          title="Active Assigned Jobs" 
          value={activeJobs.length}
          subtitle="In progress or accepted"
          icon={Briefcase}
          colorClass="blue"
        />
        <TechStatCard 
          title="Completed Jobs" 
          value={completedJobs.length || currentUser?.completedJobsCount || 128}
          subtitle="Successfully resolved"
          icon={CheckCircle2}
          colorClass="green"
        />
        <TechStatCard 
          title="Total Earnings" 
          value={`₹${totalEarnings}`}
          subtitle="Commission accrued"
          icon={DollarSign}
          colorClass="purple"
        />
        <TechStatCard 
          title="Performance Rating" 
          value={`${currentUser?.rating || 4.8} ★`}
          subtitle={`Based on ${currentUser?.reviewsCount || 142} reviews`}
          icon={Star}
          colorClass="amber"
        />
      </div>

      {/* Active Jobs Section */}
      <div className="tech-section">
        <div className="section-header-flex">
          <div>
            <h3>Today's Assigned Jobs</h3>
            <p>Accept new incoming requests or update current work status</p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/technician/jobs')}>
            View All Jobs ({myAssignedJobs.length}) <ChevronRight size={16} />
          </button>
        </div>

        {myAssignedJobs.length === 0 ? (
          <div className="empty-state-box">
            <Briefcase size={40} className="empty-icon" />
            <h3>No jobs assigned currently</h3>
            <p>New customer service requests will appear here automatically when dispatched.</p>
          </div>
        ) : (
          <div className="tech-jobs-grid">
            {myAssignedJobs.slice(0, 3).map((job) => (
              <JobCard 
                key={job.id}
                job={job}
                onViewDetails={(j) => setSelectedJob(j)}
                onUpdateStatus={handleUpdateStatus}
              />
            ))}
          </div>
        )}
      </div>

      {/* Job Details Modal */}
      <JobDetailModal 
        isOpen={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
        onUpdateStatus={handleUpdateStatus}
      />

    </div>
  );
};
