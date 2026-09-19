import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export const StatusStepper = ({ timeline = [] }) => {
  const steps = [
    { title: "Request Placed", key: "Request Placed" },
    { title: "Technician Assigned", key: "Technician Assigned" },
    { title: "In Progress", key: "Work In Progress" },
    { title: "Work Completed", key: "Work Completed" }
  ];

  return (
    <div className="status-stepper-container">
      <div className="stepper-track">
        {steps.map((stepItem, index) => {
          const matchedTimeline = timeline.find(t => t.step === stepItem.key);
          const isDone = matchedTimeline ? matchedTimeline.done : false;

          return (
            <div key={index} className={`stepper-item ${isDone ? 'step-done' : 'step-pending'}`}>
              <div className="stepper-node">
                {isDone ? (
                  <CheckCircle2 size={20} className="node-done-icon" />
                ) : (
                  <Circle size={20} className="node-pending-icon" />
                )}
                {index < steps.length - 1 && (
                  <div className={`stepper-line ${isDone ? 'line-done' : ''}`} />
                )}
              </div>
              <div className="stepper-label">
                <span className="step-title">{stepItem.title}</span>
                {matchedTimeline && matchedTimeline.date !== "Pending" && (
                  <span className="step-date">{matchedTimeline.date}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
