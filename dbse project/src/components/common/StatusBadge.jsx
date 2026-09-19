import React from 'react';
import { Clock, CheckCircle2, AlertCircle, RefreshCw, XCircle, Play } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const getStatusConfig = (st) => {
    switch (st) {
      case 'Pending':
        return {
          label: 'Pending',
          className: 'badge-pending',
          icon: <Clock size={14} />
        };
      case 'Confirmed':
      case 'Accepted':
        return {
          label: 'Confirmed',
          className: 'badge-accepted',
          icon: <CheckCircle2 size={14} />
        };
      case 'Started':
      case 'In Progress':
        return {
          label: 'Started',
          className: 'badge-in-progress',
          icon: <Play size={14} />
        };
      case 'Completed':
        return {
          label: 'Completed',
          className: 'badge-completed',
          icon: <CheckCircle2 size={14} />
        };
      case 'Cancelled':
        return {
          label: 'Cancelled',
          className: 'badge-cancelled',
          icon: <XCircle size={14} />
        };
      default:
        return {
          label: st || 'Unknown',
          className: 'badge-default',
          icon: <AlertCircle size={14} />
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`status-badge ${config.className}`}>
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
};
