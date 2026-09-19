import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Hash, Edit3, Save, X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { userApi } from '../../api/userApi';
import { useToast } from '../../context/ToastContext';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const ProfilePage = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const { showToast } = useToast();

  const [profile, setProfile] = useState(currentUser || {});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    age: currentUser?.age || '',
    gender: currentUser?.gender || 'Male',
    place: currentUser?.place || '',
    address: currentUser?.address || '',
    pincode: currentUser?.pincode || ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await userApi.getUserProfile();
        if (data) {
          setProfile(data);
          setFormData({
            name: data.name || '',
            email: data.email || '',
            phone: data.phone || '',
            age: data.age || '',
            gender: data.gender || 'Male',
            place: data.place || '',
            address: data.address || '',
            pincode: data.pincode || ''
          });
        }
      } catch (err) {
        console.warn("Using current user context profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await userApi.updateUserProfile(formData);
      setSubmitting(false);

      if (res.success || res.user) {
        const updatedUser = res.user || { ...profile, ...formData };
        setProfile(updatedUser);
        updateUserProfile(updatedUser);
        setIsEditing(false);
        showToast("Profile updated successfully!", "success");
      } else {
        setError(res.message || "Failed to update profile.");
      }
    } catch (err) {
      setSubmitting(false);
      setError(err.message || "Error updating profile.");
    }
  };

  if (loading) return <div className="container py-5"><LoadingSpinner message="Loading user profile..." /></div>;

  return (
    <div className="profile-page container py-4">
      
      <div className="page-header mb-4 flex-between">
        <div>
          <h1 className="page-title">Customer Profile</h1>
          <p className="page-subtitle">Manage your personal details, contact info, and home location address</p>
        </div>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="btn btn-primary">
            <Edit3 size={18} /> Edit Profile
          </button>
        ) : (
          <button onClick={() => setIsEditing(false)} className="btn btn-outline">
            <X size={18} /> Cancel Editing
          </button>
        )}
      </div>

      {error && <div className="alert alert-danger mb-4">{error}</div>}

      <div className="profile-card-wrapper">
        
        {/* Profile Avatar Header */}
        <div className="profile-header-banner">
          <div className="profile-avatar-large">
            {profile.name ? profile.name.charAt(0).toUpperCase() : 'C'}
          </div>
          <div className="profile-title-info">
            <h2>{profile.name || "Customer User"}</h2>
            <span className="profile-email-tag">{profile.email}</span>
            <div className="profile-role-chip mt-1">
              <ShieldCheck size={14} /> Registered HomeServe Customer
            </div>
          </div>
        </div>

        {/* Profile Details / Edit Form */}
        <div className="profile-body-content p-4">
          
          {!isEditing ? (
            <div className="profile-view-grid">
              
              <div className="pv-item">
                <span className="pv-label"><User size={16} /> Full Name</span>
                <span className="pv-val">{profile.name || "Not provided"}</span>
              </div>

              <div className="pv-item">
                <span className="pv-label"><Mail size={16} /> Email Address</span>
                <span className="pv-val">{profile.email || "Not provided"}</span>
              </div>

              <div className="pv-item">
                <span className="pv-label"><Phone size={16} /> Phone Number</span>
                <span className="pv-val">{profile.phone || "Not provided"}</span>
              </div>

              <div className="pv-item">
                <span className="pv-label">Age</span>
                <span className="pv-val">{profile.age ? `${profile.age} Years` : "Not provided"}</span>
              </div>

              <div className="pv-item">
                <span className="pv-label">Gender</span>
                <span className="pv-val">{profile.gender || "Not specified"}</span>
              </div>

              <div className="pv-item">
                <span className="pv-label"><MapPin size={16} /> Place / Locality</span>
                <span className="pv-val">{profile.place || "Not provided"}</span>
              </div>

              <div className="pv-item full-width">
                <span className="pv-label"><MapPin size={16} /> Street Address</span>
                <span className="pv-val">{profile.address || "Not provided"}</span>
              </div>

              <div className="pv-item">
                <span className="pv-label"><Hash size={16} /> Pincode</span>
                <span className="pv-val">{profile.pincode || "Not provided"}</span>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="profile-edit-form grid-form">
              
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Age</label>
                <input 
                  type="number" 
                  name="age"
                  className="form-control"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select 
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

              <div className="form-group">
                <label>Locality / Place</label>
                <input 
                  type="text" 
                  name="place"
                  className="form-control"
                  value={formData.place}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label>Street Address</label>
                <input 
                  type="text" 
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Pincode</label>
                <input 
                  type="text" 
                  name="pincode"
                  className="form-control"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>

              <div className="form-submit-container full-width mt-3">
                <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
                  {submitting ? "Saving Updates..." : <><Save size={18} /> Save Changes</>}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
