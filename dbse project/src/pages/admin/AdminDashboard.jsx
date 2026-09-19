import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, ClipboardList, Users, UserCheck, Layers, ArrowUpRight, TrendingUp, ShieldCheck } from 'lucide-react';
import { useServices } from '../../context/ServiceContext';
import { AdminStatCard } from '../../components/admin/AdminStatCard';
import { StatusBadge } from '../../components/common/StatusBadge';

export const AdminDashboard = () => {
  const { requests, services, allUsers } = useServices();
  const navigate = useNavigate();

  const customers = allUsers.filter(u => u.role === 'customer');
  const technicians = allUsers.filter(u => u.role === 'technician');
  const totalRevenue = requests.reduce((sum, r) => sum + (r.price || 0), 0);
  const activeRequestsCount = requests.filter(r => r.status !== 'Completed' && r.status !== 'Cancelled').length;

  return (
    <div className="admin-page">
      
      {/* Admin Header */}
      <div className="admin-hero-banner">
        <div>
          <h2>System Administration Dashboard 🛡️</h2>
          <p>Control center for customers, technicians, home services catalog, and request fulfillments</p>
        </div>
        <div className="admin-live-badge">
          <ShieldCheck size={16} />
          <span>System Status: <strong>Operational (Mock Data Active)</strong></span>
        </div>
      </div>

      {/* KPI Widgets */}
      <div className="admin-stats-grid">
        <AdminStatCard 
          title="Total App Revenue"
          value={`₹${totalRevenue}`}
          subtitle="+18% from last month"
          trend="↑ Growing"
          icon={DollarSign}
          colorClass="emerald"
        />
        <AdminStatCard 
          title="Active Service Requests"
          value={activeRequestsCount}
          subtitle="Pending / In-Progress"
          icon={ClipboardList}
          colorClass="blue"
        />
        <AdminStatCard 
          title="Verified Technicians"
          value={technicians.length}
          subtitle="Ready for assignment"
          icon={UserCheck}
          colorClass="purple"
        />
        <AdminStatCard 
          title="Registered Customers"
          value={customers.length}
          subtitle="Active platform users"
          icon={Users}
          colorClass="amber"
        />
      </div>

      {/* Middle Grid: Category Distribution & Quick Links */}
      <div className="admin-content-grid">
        
        {/* Category Breakdown Card */}
        <div className="admin-card">
          <div className="card-header-flex">
            <h3>Service Category Distribution</h3>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/admin/services')}>
              Manage Services ({services.length})
            </button>
          </div>

          <div className="category-stats-list">
            {['Plumbing', 'Electrical', 'AC Repair', 'Cleaning', 'Appliance Repair', 'Painting'].map((catName) => {
              const count = requests.filter(r => r.categoryName === catName).length;
              const percentage = Math.round((count / (requests.length || 1)) * 100);
              return (
                <div key={catName} className="cat-stat-row">
                  <div className="cat-stat-info">
                    <span className="cat-title font-semibold">{catName}</span>
                    <span className="cat-count">{count} requests ({percentage}%)</span>
                  </div>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${Math.max(percentage, 8)}%` }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Admin Actions Panel */}
        <div className="admin-card">
          <h3>Quick Management Shortcuts</h3>
          <p className="text-muted text-sm mb-4">Direct access to administrative master controls</p>
          
          <div className="quick-actions-column">
            <button className="action-button-tile" onClick={() => navigate('/admin/customers')}>
              <Users size={20} className="text-blue" />
              <div>
                <strong>Manage Customer Accounts</strong>
                <p>View user list, block/unblock, check booking histories</p>
              </div>
              <ArrowUpRight size={18} className="arrow" />
            </button>

            <button className="action-button-tile" onClick={() => navigate('/admin/technicians')}>
              <UserCheck size={20} className="text-purple" />
              <div>
                <strong>Manage Technician Network</strong>
                <p>Register new technicians, assign categories, check ratings</p>
              </div>
              <ArrowUpRight size={18} className="arrow" />
            </button>

            <button className="action-button-tile" onClick={() => navigate('/admin/services')}>
              <Layers size={20} className="text-emerald" />
              <div>
                <strong>Manage Services Catalog</strong>
                <p>Add new service offerings, update pricing and inclusions</p>
              </div>
              <ArrowUpRight size={18} className="arrow" />
            </button>

            <button className="action-button-tile" onClick={() => navigate('/admin/requests')}>
              <ClipboardList size={20} className="text-amber" />
              <div>
                <strong>All Requests Dispatch Control</strong>
                <p>Manual technician re-assignment, status overrides</p>
              </div>
              <ArrowUpRight size={18} className="arrow" />
            </button>
          </div>
        </div>

      </div>

      {/* Recent Requests Audit Feed */}
      <div className="admin-card mt-4">
        <div className="card-header-flex">
          <h3>Recent System Requests</h3>
          <button className="btn btn-outline btn-sm" onClick={() => navigate('/admin/requests')}>
            View All Requests
          </button>
        </div>

        <div className="table-responsive mt-3">
          <table className="admin-custom-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Customer</th>
                <th>Service</th>
                <th>Assigned Tech</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.slice(0, 5).map((req) => (
                <tr key={req.id}>
                  <td className="font-mono font-semibold">{req.id}</td>
                  <td>{req.customerName}</td>
                  <td>{req.serviceTitle}</td>
                  <td>{req.technicianName || <span className="text-muted italic">Unassigned</span>}</td>
                  <td className="font-semibold">₹{req.price}</td>
                  <td><StatusBadge status={req.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
