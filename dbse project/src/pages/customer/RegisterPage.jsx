import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wrench, User, Mail, Phone, Lock, MapPin, Hash, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const RegisterPage = () => {
  const { registerCustomer } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    email: '',
    place: '',
    address: '',
    pincode: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Form Validations
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError("Please fill in all mandatory fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    try {
      const res = await registerCustomer(formData);
      setLoading(false);
      if (res.success) {
        showToast("Registration successful! Welcome to HomeServe.", "success");
        navigate('/dashboard');
      } else {
        setError(res.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Network error. Registration failed.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-container wide-card">
        
        <div className="auth-card-header">
          <div className="auth-brand-logo">
            <Wrench size={28} className="brand-icon" />
            <span>HomeServe</span>
          </div>
          <h2>Create Your Account</h2>
          <p>Register as a customer for instant home service bookings</p>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form grid-form">
          
          {/* Name */}
          <div className="form-group">
            <label htmlFor="reg-name">Full Name *</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input 
                id="reg-name"
                name="name"
                type="text" 
                className="form-control"
                placeholder="e.g. Ananya Sharma"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="reg-email">Email Address *</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input 
                id="reg-email"
                name="email"
                type="email" 
                className="form-control"
                placeholder="ananya@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="reg-phone">Phone Number *</label>
            <div className="input-with-icon">
              <Phone size={18} className="input-icon" />
              <input 
                id="reg-phone"
                name="phone"
                type="tel" 
                className="form-control"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Age */}
          <div className="form-group">
            <label htmlFor="reg-age">Age</label>
            <input 
              id="reg-age"
              name="age"
              type="number" 
              className="form-control"
              placeholder="e.g. 28"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div className="form-group">
            <label htmlFor="reg-gender">Gender</label>
            <select 
              id="reg-gender"
              name="gender"
              className="form-control"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Place */}
          <div className="form-group">
            <label htmlFor="reg-place">Locality / Place</label>
            <div className="input-with-icon">
              <MapPin size={18} className="input-icon" />
              <input 
                id="reg-place"
                name="place"
                type="text" 
                className="form-control"
                placeholder="e.g. Indiranagar"
                value={formData.place}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Address */}
          <div className="form-group full-width">
            <label htmlFor="reg-address">Full Street Address</label>
            <input 
              id="reg-address"
              name="address"
              type="text" 
              className="form-control"
              placeholder="e.g. Flat 402, Sunshine Heights, 10th Main Road"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Pincode */}
          <div className="form-group">
            <label htmlFor="reg-pincode">Pincode</label>
            <div className="input-with-icon">
              <Hash size={18} className="input-icon" />
              <input 
                id="reg-pincode"
                name="pincode"
                type="text" 
                className="form-control"
                placeholder="560038"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="reg-password">Password *</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input 
                id="reg-password"
                name="password"
                type="password" 
                className="form-control"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="reg-confirmPassword">Confirm Password *</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input 
                id="reg-confirmPassword"
                name="confirmPassword"
                type="password" 
                className="form-control"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-submit-container full-width">
            <button type="submit" className="btn btn-primary btn-block auth-btn" disabled={loading}>
              {loading ? "Creating Account..." : <>Complete Registration <ArrowRight size={18} /></>}
            </button>
          </div>

        </form>

        <div className="auth-footer-text">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>

      </div>
    </div>
  );
};
