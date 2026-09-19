import React, { useState } from 'react';
import { PlusCircle, Trash2, Edit3, Clock, Star, Layers } from 'lucide-react';
import { useServices } from '../../context/ServiceContext';
import { ServiceModal } from '../../components/admin/ServiceModal';

export const ManageServicesPage = () => {
  const { services, categories, addNewService, removeService } = useServices();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCatFilter, setSelectedCatFilter] = useState('all');

  const filteredServices = services.filter(s => 
    selectedCatFilter === 'all' || s.categoryId === selectedCatFilter
  );

  const handleDelete = async (serviceId, title) => {
    if (window.confirm(`Are you sure you want to remove "${title}" from service catalog?`)) {
      await removeService(serviceId);
    }
  };

  return (
    <div className="admin-page">
      <div className="page-header-row mb-4">
        <div>
          <h2>Manage Home Services Catalog</h2>
          <p>Create, update, or deactivate home service packages, pricing, and estimated durations</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <PlusCircle size={16} /> Add New Service
        </button>
      </div>

      {/* Category Tabs */}
      <div className="requests-filter-tabs mb-4">
        <button 
          className={`tab-btn ${selectedCatFilter === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCatFilter('all')}
        >
          All Services ({services.length})
        </button>
        {categories.map(cat => (
          <button 
            key={cat.id}
            className={`tab-btn ${selectedCatFilter === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCatFilter(cat.id)}
          >
            {cat.name} ({services.filter(s => s.categoryId === cat.id).length})
          </button>
        ))}
      </div>

      <div className="table-wrapper-card">
        <div className="table-responsive">
          <table className="admin-custom-table">
            <thead>
              <tr>
                <th>Service Offering</th>
                <th>Category</th>
                <th>Price / MRP</th>
                <th>Duration</th>
                <th>Rating</th>
                <th>Badge</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((srv) => (
                <tr key={srv.id}>
                  <td>
                    <div className="font-semibold text-main">{srv.title}</div>
                    <div className="text-xs text-muted truncate-2 font-light max-w-xs">{srv.description}</div>
                  </td>
                  <td><span className="category-pill">{srv.categoryName}</span></td>
                  <td>
                    <span className="font-semibold text-emerald-600">₹{srv.price}</span>
                    {srv.originalPrice && <span className="text-xs line-through text-muted ml-2">₹{srv.originalPrice}</span>}
                  </td>
                  <td><div className="cell-flex text-xs"><Clock size={12} /> {srv.duration}</div></td>
                  <td><div className="text-warning font-semibold">★ {srv.rating} ({srv.reviewsCount})</div></td>
                  <td><span className="badge-tag-pill">{srv.badge || 'Standard'}</span></td>
                  <td>
                    <button 
                      className="btn-icon-danger"
                      onClick={() => handleDelete(srv.id, srv.title)}
                      title="Delete Service"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ServiceModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        categories={categories}
        onAddService={addNewService}
      />
    </div>
  );
};
