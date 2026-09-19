import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Wrench, 
  Clock, 
  Tag, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  Award
} from 'lucide-react';
import { serviceApi } from '../../api/serviceApi';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const ServiceDetailsPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await serviceApi.getServiceById(serviceId);
        setService(data);
      } catch (err) {
        setError("Unable to load service details.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [serviceId]);

  if (loading) return <div className="container py-5"><LoadingSpinner message="Loading service details..." /></div>;
  if (error || !service) return <div className="container py-5"><ErrorMessage message={error || "Service not found."} /></div>;

  return (
    <div className="service-details-page container py-4">
      
      <button onClick={() => navigate(-1)} className="btn btn-ghost mb-3">
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      <div className="service-details-grid">
        
        {/* Image & Banner */}
        <div className="service-details-media">
          <img 
            src={service.image_url || "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&fit=crop&q=80"} 
            alt={service.name} 
            className="service-detail-img"
          />
        </div>

        {/* Info & Booking Sidebar */}
        <div className="service-details-content">
          
          <span className="category-tag">{service.category || "Home Service"}</span>
          <h1 className="service-title">{service.name}</h1>
          
          <p className="service-desc">{service.description}</p>

          <div className="pricing-info-card">
            <div className="price-row">
              <span className="label">Base Service Price:</span>
              <span className="price-value">₹{service.price}</span>
            </div>
            <div className="duration-row">
              <Clock size={16} /> Estimated Duration: <strong>{service.duration || "45 mins"}</strong>
            </div>
          </div>

          <div className="service-features-list">
            <h4><ShieldCheck size={18} className="icon-blue" /> What's Included:</h4>
            <ul>
              <li><CheckCircle2 size={16} className="text-emerald" /> Certified background-verified technician</li>
              <li><CheckCircle2 size={16} className="text-emerald" /> Post-service cleanup and inspection</li>
              <li><CheckCircle2 size={16} className="text-emerald" /> 30-day HomeServe quality warranty</li>
              <li><CheckCircle2 size={16} className="text-emerald" /> Transparent pricing with zero hidden costs</li>
            </ul>
          </div>

          <div className="action-button-box mt-4">
            <button 
              onClick={() => navigate(`/book/${service.id}`)} 
              className="btn btn-primary btn-lg btn-block"
            >
              Book This Service <ArrowRight size={20} />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
