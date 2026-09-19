import React, { useState } from 'react';
import { Search, UserCheck, UserX, Mail, Phone, MapPin } from 'lucide-react';

export const CustomerTable = ({ customers = [], onToggleStatus }) => {
  const [search, setSearch] = useState('');

  const filtered = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  );

  return (
    <div className="table-wrapper-card">
      <div className="table-filter-bar">
        <div className="search-input-box">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search customer by name, email, or phone..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="records-count">Total Customers: <strong>{filtered.length}</strong></div>
      </div>

      <div className="table-responsive">
        <table className="admin-custom-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address / City</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4">No matching customers found.</td>
              </tr>
            ) : (
              filtered.map((cust) => (
                <tr key={cust.id}>
                  <td>
                    <div className="user-name-cell">
                      <img 
                        src={cust.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80"} 
                        alt={cust.name} 
                        className="user-table-avatar" 
                      />
                      <div>
                        <span className="font-semibold">{cust.name}</span>
                        <span className="text-xs text-muted block">ID: {cust.id}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="cell-flex"><Mail size={14} /> {cust.email}</div>
                  </td>
                  <td>
                    <div className="cell-flex"><Phone size={14} /> {cust.phone}</div>
                  </td>
                  <td>
                    <div className="cell-flex text-truncate"><MapPin size={14} /> {cust.address || cust.city || 'Noida'}</div>
                  </td>
                  <td>
                    <span className={`status-pill ${cust.status === 'Blocked' ? 'status-blocked' : 'status-active'}`}>
                      {cust.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    <button 
                      className={`btn btn-sm ${cust.status === 'Blocked' ? 'btn-success' : 'btn-outline-danger'}`}
                      onClick={() => onToggleStatus(cust.id)}
                    >
                      {cust.status === 'Blocked' ? <><UserCheck size={14} /> Unblock</> : <><UserX size={14} /> Block</>}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
