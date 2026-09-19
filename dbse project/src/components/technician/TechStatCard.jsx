import React from 'react';

export const TechStatCard = ({ title, value, subtitle, icon: Icon, colorClass = "blue" }) => {
  return (
    <div className={`tech-stat-card stat-${colorClass}`}>
      <div className="stat-icon-wrapper">
        <Icon size={24} />
      </div>
      <div className="stat-content">
        <span className="stat-title">{title}</span>
        <h3 className="stat-value">{value}</h3>
        {subtitle && <span className="stat-sub">{subtitle}</span>}
      </div>
    </div>
  );
};
