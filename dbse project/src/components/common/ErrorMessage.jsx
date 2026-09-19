import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export const ErrorMessage = ({ message = "Unable to load data. Please try again.", onRetry }) => {
  return (
    <div className="error-message-box">
      <AlertTriangle size={32} className="error-icon" />
      <div className="error-content">
        <h4>Something Went Wrong</h4>
        <p>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="btn btn-outline btn-sm mt-2">
            <RefreshCw size={14} /> Try Again
          </button>
        )}
      </div>
    </div>
  );
};
