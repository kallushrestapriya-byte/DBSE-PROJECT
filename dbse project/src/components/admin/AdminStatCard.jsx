import React from 'react';

export const AdminStatCard = ({ title, value, subtitle, icon: Icon, trend, colorClass = "blue" }) => {
  return (
    <div className={`admin-stat-card stat-${colorClass}`}>
      <div className="stat-header">
        <span className="stat-title">{title}</span>
        <div className="stat-icon">
          <Icon size={22} />
        </div>
      </div>
      <h2 className="stat-value">{value}</h2>
      <div className="stat-footer">
        {trend && <span className="stat-trend">{trend}</span>}
        {subtitle && <span className="stat-subtitle">{subtitle}</span>}
      </div>
    </div>
  );
};
