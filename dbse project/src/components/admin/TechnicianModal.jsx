import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Modal } from '../common/Modal';

export const TechnicianModal = ({ isOpen, onClose, categories = [], onAddTechnician }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialization, setSpecialization] = useState('Plumbing');
  const [experienceYears, setExperienceYears] = useState(3);
  const [bio, setBio] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onAddTechnician({
      name,
      email,
      phone,
      specialization,
      experienceYears: Number(experienceYears),
      bio: bio || `${specialization} expert technician with ${experienceYears} years experience.`,
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
    });
    setIsSubmitting(false);
    // Reset
    setName('');
    setEmail('');
    setPhone('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Technician">
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Technician Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. Suresh Kumar"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="suresh@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              className="form-control" 
              placeholder="+91 98765 11223"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Primary Specialization</label>
            <select 
              className="form-control"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Experience (Years)</label>
            <input 
              type="number" 
              min={1} 
              max={30} 
              className="form-control"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Bio / Background</label>
          <textarea 
            rows={3} 
            className="form-control"
            placeholder="Brief profile summary..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : <><UserPlus size={16} /> Save Technician</>}
          </button>
        </div>
      </form>
    </Modal>
  );
};
