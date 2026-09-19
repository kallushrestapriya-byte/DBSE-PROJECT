import React from 'react';

export const LoadingSpinner = ({ message = "Loading details..." }) => {
  return (
    <div className="loading-spinner-wrapper">
      <div className="spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  );
};
