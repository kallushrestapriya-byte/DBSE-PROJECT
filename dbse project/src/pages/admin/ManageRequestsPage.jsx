import React, { useState } from 'react';
import { ClipboardList, UserCheck, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { useServices } from '../../context/ServiceContext';
import { StatusBadge } from '../../components/common/StatusBadge';

export const ManageRequestsPage = () => {
  const { requests, allUsers, updateStatus } = useServices();
  const [filterTab, setFilterTab] = useState('all');

  const technicians = allUsers.filter(u => u.role === 'technician');

  const filtered = requests.filter(r => {
    if (filterTab === 'pending') return r.status === 'Pending';
    if (filterTab === 'active') return r.status === 'Accepted' || r.status === 'In Progress';
    if (filterTab === 'completed') return r.status === 'Completed';
    if (filterTab === 'cancelled') return r.status === 'Cancelled';
    return true;
  });

  const handleAssignTechnician = async (requestId, techId) => {
    const techObj = technicians.find(t => t.id === techId);
    if (techObj) {
      await updateStatus(requestId, 'Accepted', techObj);
    }
  };

  const handleStatusOverride = async (requestId, newStatus) => {
    await updateStatus(requestId, newStatus);
  };

  return (
    <div className="admin-page">
      <div className="page-header-row mb-4">
        <div>
          <h2>Manage Service Requests</h2>
          <p>Global dispatch table: Monitor all customer service requests, assign technicians, or override job status</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="requests-filter-tabs mb-4">
        <button className={`tab-btn ${filterTab === 'all' ? 'active' : ''}`} onClick={() => setFilterTab('all')}>
          All Requests ({requests.length})
        </button>
        <button className={`tab-btn ${filterTab === 'pending' ? 'active' : ''}`} onClick={() => setFilterTab('pending')}>
          Pending ({requests.filter(r => r.status === 'Pending').length})
        </button>
        <button className={`tab-btn ${filterTab === 'active' ? 'active' : ''}`} onClick={() => setFilterTab('active')}>
          Active ({requests.filter(r => r.status === 'Accepted' || r.status === 'In Progress').length})
        </button>
        <button className={`tab-btn ${filterTab === 'completed' ? 'active' : ''}`} onClick={() => setFilterTab('completed')}>
          Completed ({requests.filter(r => r.status === 'Completed').length})
        </button>
        <button className={`tab-btn ${filterTab === 'cancelled' ? 'active' : ''}`} onClick={() => setFilterTab('cancelled')}>
          Cancelled ({requests.filter(r => r.status === 'Cancelled').length})
        </button>
      </div>

      <div className="table-wrapper-card">
        <div className="table-responsive">
          <table className="admin-custom-table">
            <thead>
              <tr>
                <th>Req ID</th>
                <th>Service & Category</th>
                <th>Customer & Address</th>
                <th>Schedule Slot</th>
                <th>Assigned Technician</th>
                <th>Status</th>
                <th>Admin Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((req) => (
                <tr key={req.id}>
                  <td className="font-mono font-semibold">{req.id}</td>
                  <td>
                    <div className="font-semibold">{req.serviceTitle}</div>
                    <span className="category-pill text-xs">{req.categoryName}</span>
                  </td>
                  <td>
                    <div className="font-medium">{req.customerName}</div>
                    <div className="text-xs text-muted truncate max-w-xs">{req.address}</div>
                  </td>
                  <td>
                    <div className="text-xs">{req.scheduledDate}</div>
                    <div className="text-xs text-muted">{req.scheduledSlot}</div>
                  </td>
                  <td>
                    <select 
                      className="form-control form-control-sm text-xs"
                      value={req.technicianId || ''}
                      onChange={(e) => handleAssignTechnician(req.id, e.target.value)}
                    >
                      <option value="">-- Assign Technician --</option>
                      {technicians.map(tech => (
                        <option key={tech.id} value={tech.id}>{tech.name} ({tech.specialization})</option>
                      ))}
                    </select>
                  </td>
                  <td><StatusBadge status={req.status} /></td>
                  <td>
                    <select 
                      className="form-control form-control-sm text-xs"
                      value={req.status}
                      onChange={(e) => handleStatusOverride(req.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
