import React from 'react';
import { useServices } from '../../context/ServiceContext';
import { CustomerTable } from '../../components/admin/CustomerTable';

export const ManageCustomersPage = () => {
  const { allUsers, toggleUserActiveStatus } = useServices();

  const customers = allUsers.filter(u => u.role === 'customer');

  return (
    <div className="admin-page">
      <div className="page-header-row mb-4">
        <div>
          <h2>Manage Customers</h2>
          <p>Monitor customer registrations, review address profiles, and toggle account access status</p>
        </div>
      </div>

      <CustomerTable 
        customers={customers}
        onToggleStatus={toggleUserActiveStatus}
      />
    </div>
  );
};
