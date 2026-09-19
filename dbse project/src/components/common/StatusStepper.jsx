import React from 'react';
import { Check, Clock, PlayCircle } from 'lucide-react';

export const StatusStepper = ({ currentStatus }) => {
  const steps = [
    { key: 'Confirmed', label: 'Confirmed', desc: 'Booking confirmed & tech assigned' },
    { key: 'Started', label: 'Started', desc: 'Technician on-site / work started' },
    { key: 'Completed', label: 'Completed', desc: 'Service fulfilled successfully' }
  ];

  // Helper to get step index
  const getStepState = (stepKey, index) => {
    const statusMap = {
      'Pending': 0,
      'Confirmed': 1,
      'Accepted': 1,
      'Started': 2,
      'In Progress': 2,
      'Completed': 3
    };

    const currentLevel = statusMap[currentStatus] || 0;
    const stepLevel = index + 1;

    if (currentLevel > stepLevel) return 'completed';
    if (currentLevel === stepLevel) return 'active';
    return 'upcoming';
  };

  return (
    <div className="status-stepper-container">
      <div className="stepper-track">
        {steps.map((step, idx) => {
          const state = getStepState(step.key, idx);
          return (
            <div key={step.key} className={`stepper-step ${state}`}>
              <div className="step-node">
                {state === 'completed' ? (
                  <Check size={16} />
                ) : state === 'active' ? (
                  <PlayCircle size={16} />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>
              <div className="step-info">
                <span className="step-title">{step.label}</span>
                <span className="step-sub">{step.desc}</span>
              </div>
              {idx < steps.length - 1 && <div className="step-line"></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
