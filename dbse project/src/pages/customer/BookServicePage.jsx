import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Wrench, 
  MapPin, 
  Calendar, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Tag
} from 'lucide-react';
import { serviceApi } from '../../api/serviceApi';
import { locationApi } from '../../api/locationApi';
import { requestApi } from '../../api/requestApi';
import { useToast } from '../../context/ToastContext';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const BookServicePage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [service, setService] = useState(null);
  const [existingLocations, setExistingLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Form Fields
  const [selectedLocationId, setSelectedLocationId] = useState('new');
  const [locationForm, setLocationForm] = useState({
    place: 'Home',
    address: 'Flat 402, Sunshine Heights, 10th Main Road',
    city: 'Bengaluru',
    pincode: '560038',
    latitude: '12.9716',
    longitude: '77.6412'
  });

  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });

  const [preferredTime, setPreferredTime] = useState('10:00 AM - 12:00 PM');
  const [problemDescription, setProblemDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [srvData, locData] = await Promise.all([
          serviceApi.getServiceById(serviceId),
          locationApi.getLocations()
        ]);
        setService(srvData);
        setExistingLocations(locData || []);
        if (locData && locData.length > 0) {
          setSelectedLocationId(String(locData[0].id));
        }
      } catch (err) {
        setError("Failed to load service or locations data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [serviceId]);

  const handleLocationSelect = (locId) => {
    setSelectedLocationId(locId);
    if (locId !== 'new') {
      const found = existingLocations.find(l => String(l.id) === String(locId));
      if (found) {
        setLocationForm({
          place: found.place || 'Home',
          address: found.address || '',
          city: found.city || 'Bengaluru',
          pincode: found.pincode || '',
          latitude: found.latitude || '12.9716',
          longitude: found.longitude || '77.6412'
        });
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return; // Prevent duplicate submission

    if (!problemDescription.trim()) {
      setError("Please describe the problem or service you need.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      let targetLocationId = selectedLocationId;

      // If user selected new location, save it first
      if (selectedLocationId === 'new') {
        const newLoc = await locationApi.createLocation(locationForm);
        targetLocationId = newLoc.id;
      }

      const payload = {
        service_id: service.id,
        service_name: service.name,
        location_id: targetLocationId,
        location_details: `${locationForm.place} - ${locationForm.address}, ${locationForm.city} (${locationForm.pincode})`,
        preferred_date: preferredDate,
        preferred_time: preferredTime,
        problem_description: problemDescription
      };

      const result = await requestApi.createServiceRequest(payload);
      setSubmitting(false);

      showToast("Service request confirmed successfully!", "success");
      navigate('/requests');
    } catch (err) {
      setSubmitting(false);
      setError(err.message || "Failed to submit service request. Please try again.");
    }
  };

  if (loading) return <div className="container py-5"><LoadingSpinner message="Preparing booking form..." /></div>;
  if (!service) return <div className="container py-5"><AlertCircle className="text-red mb-2" /> Service not found.</div>;

  return (
    <div className="book-service-page container py-4">
      
      <div className="page-header mb-4">
        <h1 className="page-title">Book Service</h1>
        <p className="page-subtitle">Complete your appointment & location details to confirm service request</p>
      </div>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      <div className="booking-layout-grid">
        
        {/* Left Form Column */}
        <div className="booking-form-col">
          
          <form onSubmit={handleFormSubmit} className="booking-form-card">
            
            {/* 1. Selected Service Summary Banner */}
            <div className="service-selected-banner mb-4">
              <div className="ss-icon">
                <Wrench size={24} />
              </div>
              <div className="ss-details">
                <h3>{service.name}</h3>
                <span className="ss-meta">Base Price: <strong>₹{service.price}</strong> • Est. Duration: <strong>{service.duration || "45 mins"}</strong></span>
              </div>
            </div>

            {/* 2. Location Selection */}
            <div className="form-section mb-4">
              <h4 className="section-heading"><MapPin size={18} className="icon-blue" /> Service Location</h4>
              
              {existingLocations.length > 0 && (
                <div className="location-select-bar mb-3">
                  <label className="form-label font-weight-bold">Select Saved Location:</label>
                  <select 
                    className="form-control"
                    value={selectedLocationId}
                    onChange={(e) => handleLocationSelect(e.target.value)}
                  >
                    {existingLocations.map(loc => (
                      <option key={loc.id} value={loc.id}>
                        {loc.place} - {loc.address}, {loc.city} ({loc.pincode})
                      </option>
                    ))}
                    <option value="new">+ Add New Address Location</option>
                  </select>
                </div>
              )}

              {/* Location Input Fields */}
              <div className="grid-form">
                <div className="form-group">
                  <label>Place / Locality</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Home, Office, Indiranagar"
                    value={locationForm.place}
                    onChange={(e) => setLocationForm({ ...locationForm, place: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>City</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Bengaluru"
                    value={locationForm.city}
                    onChange={(e) => setLocationForm({ ...locationForm, city: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Full Address</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Flat/House No, Building, Street Address"
                    value={locationForm.address}
                    onChange={(e) => setLocationForm({ ...locationForm, address: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Pincode</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="560038"
                    value={locationForm.pincode}
                    onChange={(e) => setLocationForm({ ...locationForm, pincode: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Latitude (GPS)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={locationForm.latitude}
                    onChange={(e) => setLocationForm({ ...locationForm, latitude: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Longitude (GPS)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={locationForm.longitude}
                    onChange={(e) => setLocationForm({ ...locationForm, longitude: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* 3. Appointment Date & Time */}
            <div className="form-section mb-4">
              <h4 className="section-heading"><Calendar size={18} className="icon-blue" /> Appointment Schedule</h4>
              <div className="grid-form">
                
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input 
                    type="date" 
                    className="form-control"
                    min={new Date().toISOString().split('T')[0]}
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Preferred Time Slot</label>
                  <select 
                    className="form-control"
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                  >
                    <option value="08:00 AM - 10:00 AM">08:00 AM - 10:00 AM</option>
                    <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</option>
                    <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM</option>
                    <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM</option>
                    <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM</option>
                    <option value="06:00 PM - 08:00 PM">06:00 PM - 08:00 PM</option>
                  </select>
                </div>

              </div>
            </div>

            {/* 4. Problem Description */}
            <div className="form-section mb-4">
              <h4 className="section-heading"><Wrench size={18} className="icon-blue" /> Problem Description</h4>
              <div className="form-group">
                <textarea 
                  className="form-control" 
                  rows={4}
                  placeholder="Describe the problem or service you need in detail..."
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-lg btn-block" 
              disabled={submitting}
            >
              {submitting ? "Submitting Request..." : <>Confirm Service Request <ArrowRight size={20} /></>}
            </button>

          </form>

        </div>

        {/* Right Live Summary Sidebar */}
        <div className="booking-summary-col">
          <div className="summary-card-sticky">
            <h3>Booking Summary</h3>
            
            <div className="summary-row">
              <span className="s-label">Selected Service:</span>
              <span className="s-val font-weight-bold">{service.name}</span>
            </div>

            <div className="summary-row">
              <span className="s-label">Base Price:</span>
              <span className="s-val text-blue font-weight-bold">₹{service.price}</span>
            </div>

            <div className="summary-row">
              <span className="s-label">Est. Duration:</span>
              <span className="s-val">{service.duration || "45 mins"}</span>
            </div>

            <hr />

            <div className="summary-row">
              <span className="s-label">Location:</span>
              <span className="s-val">{locationForm.place} ({locationForm.pincode})</span>
            </div>

            <div className="summary-row">
              <span className="s-label">Appointment Date:</span>
              <span className="s-val">{preferredDate}</span>
            </div>

            <div className="summary-row">
              <span className="s-label">Time Slot:</span>
              <span className="s-val">{preferredTime}</span>
            </div>

            <div className="summary-guarantee-box mt-3">
              <ShieldCheck size={20} className="icon-emerald" />
              <span>Free cancellation up to 1 hour before scheduled slot. Pay after work completion.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
