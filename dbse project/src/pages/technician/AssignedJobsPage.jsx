import React, { useState } from 'react';
import { Briefcase, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useServices } from '../../context/ServiceContext';
import { JobCard } from '../../components/technician/JobCard';
import { JobDetailModal } from '../../components/technician/JobDetailModal';

export const AssignedJobsPage = () => {
  const { currentUser } = useAuth();
  const { requests, updateStatus } = useServices();
  const [filterTab, setFilterTab] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);

  // All requests assigned or pending
  const assignedJobs = requests.filter(r => r.technicianId === currentUser?.id || r.status === 'Pending' || r.status === 'Accepted' || r.status === 'In Progress' || r.status === 'Completed');

  const filteredJobs = assignedJobs.filter(job => {
    if (filterTab === 'pending') return job.status === 'Pending';
    if (filterTab === 'accepted') return job.status === 'Accepted';
    if (filterTab === 'progress') return job.status === 'In Progress';
    if (filterTab === 'completed') return job.status === 'Completed';
    return true;
  });

  const handleUpdateStatus = async (jobId, newStatus) => {
    await updateStatus(jobId, newStatus, currentUser);
  };

  return (
    <div className="technician-page">
      <div className="page-header-row">
        <div>
          <h2>Assigned Service Requests</h2>
          <p>Review customer requirements, navigate to addresses, and update job progress</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="requests-filter-tabs">
        <button className={`tab-btn ${filterTab === 'all' ? 'active' : ''}`} onClick={() => setFilterTab('all')}>
          All Assigned ({assignedJobs.length})
        </button>
        <button className={`tab-btn ${filterTab === 'pending' ? 'active' : ''}`} onClick={() => setFilterTab('pending')}>
          Pending Accept ({assignedJobs.filter(j => j.status === 'Pending').length})
        </button>
        <button className={`tab-btn ${filterTab === 'accepted' ? 'active' : ''}`} onClick={() => setFilterTab('accepted')}>
          Accepted ({assignedJobs.filter(j => j.status === 'Accepted').length})
        </button>
        <button className={`tab-btn ${filterTab === 'progress' ? 'active' : ''}`} onClick={() => setFilterTab('progress')}>
          In Progress ({assignedJobs.filter(j => j.status === 'In Progress').length})
        </button>
        <button className={`tab-btn ${filterTab === 'completed' ? 'active' : ''}`} onClick={() => setFilterTab('completed')}>
          Completed ({assignedJobs.filter(j => j.status === 'Completed').length})
        </button>
      </div>

      {/* Jobs Grid */}
      {filteredJobs.length === 0 ? (
        <div className="empty-state-box">
          <Briefcase size={44} className="empty-icon" />
          <h3>No jobs found under this status</h3>
          <p>Switch filter tabs to check pending or completed jobs.</p>
        </div>
      ) : (
        <div className="tech-jobs-grid mt-4">
          {filteredJobs.map((job) => (
            <JobCard 
              key={job.id}
              job={job}
              onViewDetails={(j) => setSelectedJob(j)}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <JobDetailModal 
        isOpen={Boolean(selectedJob)}
        onClose={() => setSelectedJob(null)}
        job={selectedJob}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};
