import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Wrench, 
  Zap, 
  Wind, 
  Sparkles, 
  Tv, 
  Paintbrush, 
  ShieldCheck, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  UserCheck,
  CalendarCheck,
  CreditCard,
  ThumbsUp,
  Headphones
} from 'lucide-react';
import { serviceApi } from '../../api/serviceApi';
import { ServiceCard } from '../../components/customer/ServiceCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

export const HomePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicesData = async () => {
      try {
        const data = await serviceApi.getServices();
        setServices(data || []);
      } catch (err) {
        console.error("Error fetching homepage services", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServicesData();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchTerm)}`);
    } else {
      navigate('/services');
    }
  };

  return (
    <div className="home-page-container">
      
      {/* 1. HERO SECTION */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="welcome-tag">
            <ShieldCheck size={16} /> Verified & Trusted Professionals
          </div>
          <h1 className="hero-heading">
            Home<span className="highlight-text">Serve</span>
          </h1>
          <p className="hero-tagline">
            Reliable Home Services at Your Doorstep
          </p>
          <p className="hero-subtext">
            Book top-rated plumbing, electrical repairs, AC servicing, appliance fixes, deep home cleaning, and interior painting with complete peace of mind.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="hero-search-box">
            <Search size={20} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search services (e.g. Plumbing, AC Repair, Cleaning)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary hero-search-btn">
              Search Services
            </button>
          </form>

          {/* Trust Badges */}
          <div className="hero-stats-strip mt-4">
            <div className="hero-stat-pill">
              <Award size={18} className="icon" />
              <span>4.9 ★ Rated Technicians</span>
            </div>
            <div className="hero-stat-pill">
              <Clock size={18} className="icon" />
              <span>Express 30-Min Arrival</span>
            </div>
            <div className="hero-stat-pill">
              <ShieldCheck size={18} className="icon" />
              <span>100% Upfront Pricing</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR SERVICES CATALOG */}
      <section className="dashboard-section container py-5">
        <div className="section-header">
          <div>
            <h2 className="section-title">Popular Home Services</h2>
            <p className="section-subtitle">Top requested repair & maintenance solutions</p>
          </div>
          <Link to="/services" className="see-all-link">
            Explore All Services <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching popular home services..." />
        ) : (
          <div className="services-cards-grid">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </section>

      {/* 3. BOOK A SERVICE CTA BANNER */}
      <section className="cta-banner-wrapper">
        <div className="cta-banner-content">
          <h2>Need Quick & Reliable Home Repair Today?</h2>
          <p>Book experienced background-checked experts in under 2 minutes.</p>
          <Link to="/services" className="btn btn-lg btn-accent cta-btn">
            <Wrench size={20} /> Book a Service Now
          </Link>
        </div>
      </section>

      {/* 4. HOW IT WORKS SECTION */}
      <section className="dashboard-section container py-5">
        <div className="section-header text-center flex-column">
          <h2 className="section-title">How HomeServe Works</h2>
          <p className="section-subtitle">4 easy steps to solve your household service needs</p>
        </div>

        <div className="how-it-works-grid">
          <div className="step-card">
            <div className="step-num">1</div>
            <div className="step-icon-box"><Search size={24} /></div>
            <h3>Select Service</h3>
            <p>Browse from our verified list of plumbing, AC, electrical, or cleaning services.</p>
          </div>

          <div className="step-card">
            <div className="step-num">2</div>
            <div className="step-icon-box"><CalendarCheck size={24} /></div>
            <h3>Pick Schedule & Location</h3>
            <p>Choose your preferred date, convenient time slot, and home address.</p>
          </div>

          <div className="step-card">
            <div className="step-num">3</div>
            <div className="step-icon-box"><UserCheck size={24} /></div>
            <h3>Technician Assigned</h3>
            <p>A certified nearby professional is assigned to reach your home punctually.</p>
          </div>

          <div className="step-card">
            <div className="step-num">4</div>
            <div className="step-icon-box"><CreditCard size={24} /></div>
            <h3>Service & Payment</h3>
            <p>Relax while your problem is solved. Pay safely upon service completion.</p>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="dashboard-section bg-light-section py-5">
        <div className="container">
          <div className="section-header text-center flex-column mb-4">
            <h2 className="section-title">Why Choose HomeServe?</h2>
            <p className="section-subtitle">The standard for quality home repairs</p>
          </div>

          <div className="why-us-grid">
            <div className="why-us-card">
              <ShieldCheck size={32} className="why-icon" />
              <h4>Background Verified Pros</h4>
              <p>Every technician undergoes strict identity & skill verification before joining.</p>
            </div>

            <div className="why-us-card">
              <Clock size={32} className="why-icon" />
              <h4>On-Time Service Guarantee</h4>
              <p>We value your time. Technicians arrive promptly within your selected time slot.</p>
            </div>

            <div className="why-us-card">
              <ThumbsUp size={32} className="why-icon" />
              <h4>Transparent Upfront Pricing</h4>
              <p>No hidden charges or surprise costs. Clear base prices for all services.</p>
            </div>

            <div className="why-us-card">
              <Headphones size={32} className="why-icon" />
              <h4>Dedicated Customer Support</h4>
              <p>24/7 assistance for all your service queries and booking updates.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
