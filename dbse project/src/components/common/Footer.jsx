import React from 'react';
import { Wrench, ShieldCheck, Clock, Award, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-brand-section">
          <div className="footer-logo">
            <Wrench size={22} className="brand-icon" />
            <span className="brand-title">HomeServe</span>
          </div>
          <p className="footer-tagline-text">
            <strong>Reliable Home Services at Your Doorstep</strong>
          </p>
          <p className="footer-desc">
            Connecting homeowners with verified background-checked technicians for plumbing, electrical, AC repair, cleaning, painting, and appliance maintenance.
          </p>
          <div className="footer-badges">
            <span className="badge-item"><ShieldCheck size={14} /> Verified Pros</span>
            <span className="badge-item"><Clock size={14} /> Fast Arrival</span>
            <span className="badge-item"><Award size={14} /> Transparent Pricing</span>
          </div>
        </div>

        <div className="footer-links-grid">
          <div className="footer-col">
            <h4>Popular Services</h4>
            <ul>
              <li>Plumbing & Leak Repair</li>
              <li>Electrical Fixes</li>
              <li>AC Repair & Servicing</li>
              <li>Home Deep Cleaning</li>
              <li>Carpentry & Locks</li>
              <li>Pest Control Treatment</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/services">Services Catalog</a></li>
              <li><a href="/requests">My Requests</a></li>
              <li><a href="/bookings">My Bookings</a></li>
              <li><a href="/profile">My Profile</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Technology Stack</h4>
            <div className="tech-pills">
              <span>React 18</span>
              <span>Vite</span>
              <span>React Router v6</span>
              <span>Plain CSS</span>
              <span>Express API</span>
              <span>MySQL Database</span>
            </div>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© {new Date().getFullYear()} HomeServe - Reliable Home Services at Your Doorstep.</p>
        </div>
      </div>
    </footer>
  );
};
