import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Clock, Tag, ArrowRight, ShieldCheck, Wrench } from 'lucide-react';

export const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  if (!service) return null;

  return (
    <div className="service-card">
      <div className="service-card-image-box">
        <img 
          src={service.image_url || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&auto=format&fit=crop&q=80"} 
          alt={service.name} 
          className="service-card-img"
        />
        <span className="service-category-badge">{service.category || "Home Service"}</span>
      </div>

      <div className="service-card-body">
        <h3 className="service-card-title">{service.name}</h3>
        <p className="service-card-desc">{service.description}</p>
        
        <div className="service-card-meta">
          <div className="meta-item">
            <Clock size={15} />
            <span>{service.duration || "45 mins"}</span>
          </div>
          <div className="meta-item price-tag">
            <Tag size={15} />
            <span>Base Price: <strong>₹{service.price}</strong></span>
          </div>
        </div>
      </div>

      <div className="service-card-footer">
        <Link to={`/services/${service.id}`} className="btn btn-outline btn-sm">
          Details
        </Link>
        <button 
          onClick={() => navigate(`/book/${service.id}`)} 
          className="btn btn-primary btn-sm"
        >
          Book Now <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
