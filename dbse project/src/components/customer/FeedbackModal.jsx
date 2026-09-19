import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import { Modal } from '../common/Modal';

export const FeedbackModal = ({ isOpen, onClose, request, onSubmitFeedback }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!request) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmitFeedback(request.id, rating, comment);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Give Service Feedback">
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="feedback-service-summary">
          <h4>{request.serviceTitle}</h4>
          <p className="tech-assigned-name">Technician: <strong>{request.technicianName || "Assigned Expert"}</strong></p>
        </div>

        <div className="rating-selector-group">
          <label>Your Rating</label>
          <div className="stars-row">
            {[1, 2, 3, 4, 5].map((starNum) => (
              <button
                type="button"
                key={starNum}
                className={`star-btn ${(hoverRating || rating) >= starNum ? 'active' : ''}`}
                onClick={() => setRating(starNum)}
                onMouseEnter={() => setHoverRating(starNum)}
                onMouseLeave={() => setHoverRating(0)}
              >
                <Star size={28} fill={(hoverRating || rating) >= starNum ? '#f59e0b' : 'none'} color="#f59e0b" />
              </button>
            ))}
          </div>
          <span className="rating-label-text">
            {rating === 5 ? "Excellent Service!" : rating === 4 ? "Good Experience" : rating === 3 ? "Average" : rating === 2 ? "Below Expectations" : "Poor Service"}
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="feedback-comment">Comments & Suggestions</label>
          <textarea
            id="feedback-comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share details about punctuality, work quality, cleanliness..."
            className="form-control"
            required
          />
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : <><Send size={16} /> Submit Feedback</>}
          </button>
        </div>
      </form>
    </Modal>
  );
};
