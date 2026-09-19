import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Modal } from '../common/Modal';

export const ServiceModal = ({ isOpen, onClose, categories = [], onAddService }) => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-plumbing');
  const [price, setPrice] = useState(499);
  const [originalPrice, setOriginalPrice] = useState(799);
  const [duration, setDuration] = useState('45 - 60 mins');
  const [description, setDescription] = useState('');
  const [badge, setBadge] = useState('Popular');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const cat = categories.find(c => c.id === categoryId) || categories[0];
    await onAddService({
      title,
      categoryId,
      categoryName: cat ? cat.name : "Plumbing",
      price: Number(price),
      originalPrice: Number(originalPrice),
      duration,
      description,
      badge,
      iconName: cat ? cat.iconName : "Wrench",
      includes: [
        "Professional diagnostics check",
        "30-day service warranty",
        "Safety verification"
      ]
    });
    
    setIsSubmitting(false);
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Service Offering">
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-grid">
          <div className="form-group full-width">
            <label>Service Title</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. Geyser Installation & Testing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select 
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Offering Badge Tag</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. Bestseller, 30-min Arrival"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Service Price (₹)</label>
            <input 
              type="number" 
              className="form-control" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Original Price (₹ MRP)</label>
            <input 
              type="number" 
              className="form-control" 
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>

          <div className="form-group full-width">
            <label>Estimated Duration</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="e.g. 45 - 60 mins"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Detailed Description</label>
          <textarea 
            rows={3} 
            className="form-control"
            placeholder="Describe what is included in this service..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : <><PlusCircle size={16} /> Publish Service</>}
          </button>
        </div>
      </form>
    </Modal>
  );
};
