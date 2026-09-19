import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, AlertCircle, Upload, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useServices } from '../../context/ServiceContext';
import { useAuth } from '../../context/AuthContext';

export const ServiceRequestForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { services, createNewRequest } = useServices();

  const preselectedService = location.state?.selectedService || services[0];

  const [serviceId, setServiceId] = useState(preselectedService?.id || '');
  const [scheduledDate, setScheduledDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [scheduledSlot, setScheduledSlot] = useState('10:00 AM - 12:00 PM');
  const [urgency, setUrgency] = useState('Standard');
  const [address, setAddress] = useState(currentUser?.address || 'B-402, Green Valley Heights, Sector 62, Noida, UP');
  const [problemDescription, setProblemDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedServiceObj = services.find(s => s.id === serviceId) || preselectedService;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await createNewRequest({
      serviceId,
      serviceTitle: selectedServiceObj?.title || 'Home Service',
      address,
      scheduledDate,
      scheduledSlot,
      urgency,
      problemDescription,
      paymentMethod
    });

    setIsSubmitting(false);
    navigate('/customer/requests');
  };

  return (
    <div className="request-form-page">
      <div className="form-header-banner">
        <h2>Raise a Service Request</h2>
        <p>Fill in your service requirements & schedule a verified technician visit</p>
      </div>

      <div className="booking-layout-grid">
        
        {/* Main Request Form */}
        <form onSubmit={handleSubmit} className="booking-form-card">
          
          {/* Step 1: Service Selection */}
          <div className="form-section">
            <h3 className="section-title-num"><span>1</span> Select Service</h3>
            
            <div className="form-group">
              <label>Service Item</label>
              <select 
                className="form-control large-select"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
              >
                {services.map((srv) => (
                  <option key={srv.id} value={srv.id}>
                    [{srv.categoryName}] {srv.title} - ₹{srv.price}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Step 2: Date & Slot Schedule */}
          <div className="form-section">
            <h3 className="section-title-num"><span>2</span> Schedule Visit Date & Time</h3>
            
            <div className="form-grid">
              <div className="form-group">
                <label><Calendar size={16} /> Preferred Date</label>
                <input 
                  type="date"
                  className="form-control"
                  value={scheduledDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label><Clock size={16} /> Time Slot</label>
                <select 
                  className="form-control"
                  value={scheduledSlot}
                  onChange={(e) => setScheduledSlot(e.target.value)}
                >
                  <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM (Morning)</option>
                  <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM (Morning)</option>
                  <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM (Afternoon)</option>
                  <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM (Evening)</option>
                  <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM (Night)</option>
                </select>
              </div>
            </div>

            {/* Urgency Level Pills */}
            <div className="form-group mt-3">
              <label>Service Priority Level</label>
              <div className="urgency-pills-row">
                <button
                  type="button"
                  className={`urgency-pill ${urgency === 'Standard' ? 'active' : ''}`}
                  onClick={() => setUrgency('Standard')}
                >
                  Standard Visit (No Extra Fee)
                </button>
                <button
                  type="button"
                  className={`urgency-pill ${urgency === 'Express' ? 'active' : ''}`}
                  onClick={() => setUrgency('Express')}
                >
                  Express Arrival (Within 2 Hours)
                </button>
                <button
                  type="button"
                  className={`urgency-pill urgency-emergency ${urgency === 'Emergency' ? 'active' : ''}`}
                  onClick={() => setUrgency('Emergency')}
                >
                  ⚡ Emergency (30-Min Arrival)
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Location & Details */}
          <div className="form-section">
            <h3 className="section-title-num"><span>3</span> Location & Problem Description</h3>
            
            <div className="form-group">
              <label><MapPin size={16} /> Service Address</label>
              <textarea 
                rows={2}
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter complete door address, sector, landmark..."
                required
              />
            </div>

            <div className="form-group">
              <label>Detailed Issue Description</label>
              <textarea 
                rows={4}
                className="form-control"
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Describe the issue in detail (e.g. water dripping from tap, switchboard sparking, AC not cooling)..."
                required
              />
            </div>

            {/* Upload Attachment simulation */}
            <div className="form-group">
              <label>Upload Problem Photo (Optional)</label>
              <div className="photo-upload-dropzone">
                <Upload size={24} className="upload-icon" />
                <span>Click or drag image file here to attach photo</span>
                <span className="text-xs text-muted">Supports JPG, PNG (Max 5MB)</span>
              </div>
            </div>
          </div>

          {/* Step 4: Payment Option */}
          <div className="form-section">
            <h3 className="section-title-num"><span>4</span> Payment Preference</h3>
            
            <div className="payment-options-row">
              <label className={`payment-card ${paymentMethod === 'cash' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="cash" 
                  checked={paymentMethod === 'cash'} 
                  onChange={() => setPaymentMethod('cash')}
                />
                <div>
                  <strong>Pay Cash / UPI on Service</strong>
                  <p>Pay technician directly after work completion</p>
                </div>
              </label>

              <label className={`payment-card ${paymentMethod === 'online' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="online" 
                  checked={paymentMethod === 'online'} 
                  onChange={() => setPaymentMethod('online')}
                />
                <div>
                  <strong>Pay Online Now (Simulated)</strong>
                  <p>Debit/Credit Card, NetBanking, Wallet</p>
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg mt-4" disabled={isSubmitting}>
            {isSubmitting ? "Submitting Service Request..." : <>Confirm & Raise Service Request <ArrowRight size={18} /></>}
          </button>
        </form>

        {/* Sidebar Summary Card */}
        <div className="booking-summary-sidebar">
          <div className="summary-card">
            <h3 className="summary-title">Booking Summary</h3>

            {selectedServiceObj && (
              <div className="selected-service-box">
                <span className="category-pill">{selectedServiceObj.categoryName}</span>
                <h4>{selectedServiceObj.title}</h4>
                <p className="duration-info"><Clock size={14} /> Duration: {selectedServiceObj.duration}</p>
              </div>
            )}

            <div className="price-breakdown-list">
              <div className="price-row">
                <span>Base Service Fee</span>
                <span>₹{selectedServiceObj?.price || 499}</span>
              </div>
              {urgency === 'Express' && (
                <div className="price-row">
                  <span>Express 2-Hr Fee</span>
                  <span>+ ₹99</span>
                </div>
              )}
              {urgency === 'Emergency' && (
                <div className="price-row text-warning">
                  <span>Emergency 30-Min Fee</span>
                  <span>+ ₹199</span>
                </div>
              )}
              <div className="price-row">
                <span>Safety & Sanitation Fee</span>
                <span>₹29</span>
              </div>
              <div className="price-row discount">
                <span>Voucher Discount</span>
                <span>- ₹29</span>
              </div>

              <div className="price-row total-row">
                <span>Total Amount Due</span>
                <span>₹{(selectedServiceObj?.price || 499) + (urgency === 'Express' ? 99 : urgency === 'Emergency' ? 199 : 0)}</span>
              </div>
            </div>

            <div className="trust-guarantee-box">
              <ShieldCheck size={20} className="trust-icon" />
              <div>
                <strong>HomeEase 100% Assurance</strong>
                <p>30-day post-service warranty on all repairs. Free re-visit if issue recurs.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
