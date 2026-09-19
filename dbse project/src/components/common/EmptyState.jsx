import React from 'react';
import { PackageOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export const EmptyState = ({ 
  title = "No Data Found", 
  message = "There are no records available to show.", 
  actionText, 
  actionLink 
}) => {
  return (
    <div className="empty-state-box">
      <PackageOpen size={48} className="empty-icon" />
      <h3 className="empty-title">{title}</h3>
      <p className="empty-desc">{message}</p>
      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary mt-3">
          {actionText}
        </Link>
      )}
    </div>
  );
};
