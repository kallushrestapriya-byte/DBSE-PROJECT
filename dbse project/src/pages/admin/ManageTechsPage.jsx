import React, { useState } from 'react';
import { UserPlus, Star, Phone, Mail, Award, CheckCircle2 } from 'lucide-react';
import { useServices } from '../../context/ServiceContext';
import { TechnicianModal } from '../../components/admin/TechnicianModal';

export const ManageTechsPage = () => {
  const { allUsers, categories, addNewTechnician } = useServices();
  const [showAddModal, setShowAddModal] = useState(false);

  const technicians = allUsers.filter(u => u.role === 'technician');

  return (
    <div className="admin-page">
      <div className="page-header-row mb-4">
        <div>
          <h2>Manage Technicians Directory</h2>
          <p>Register new service technicians, check availability status, ratings and completed job metrics</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <UserPlus size={16} /> Register New Technician
        </button>
      </div>

      <div className="table-wrapper-card">
        <div className="table-responsive">
          <table className="admin-custom-table">
            <thead>
              <tr>
                <th>Technician Name</th>
                <th>Specialization</th>
                <th>Contact</th>
                <th>Rating & Jobs</th>
                <th>Availability</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {technicians.map((tech) => (
                <tr key={tech.id}>
                  <td>
                    <div className="user-name-cell">
                      <img 
                        src={tech.avatar || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&auto=format&fit=crop&q=80"} 
                        alt={tech.name} 
                        className="user-table-avatar" 
                      />
                      <div>
                        <span className="font-semibold">{tech.name}</span>
                        <span className="text-xs text-muted block">{tech.experienceYears || 5} Years Exp</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="category-pill">{tech.specialization}</span>
                  </td>
                  <td>
                    <div className="cell-flex text-xs"><Mail size={12} /> {tech.email}</div>
                    <div className="cell-flex text-xs"><Phone size={12} /> {tech.phone}</div>
                  </td>
                  <td>
                    <div className="font-semibold text-warning">★ {tech.rating || 4.8}</div>
                    <div className="text-xs text-muted">{tech.completedJobsCount || 100}+ Jobs Done</div>
                  </td>
                  <td>
                    <span className={`status-pill ${tech.availability === 'Available' ? 'status-active' : 'status-pending'}`}>
                      {tech.availability || 'Available'}
                    </span>
                  </td>
                  <td>
                    <span className="status-pill status-active">Verified</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TechnicianModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        categories={categories}
        onAddTechnician={addNewTechnician}
      />
    </div>
  );
};
