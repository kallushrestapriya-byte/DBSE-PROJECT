import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, Wrench } from 'lucide-react';
import { serviceApi } from '../../api/serviceApi';
import { ServiceCard } from '../../components/customer/ServiceCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { EmptyState } from '../../components/common/EmptyState';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const ServicesPage = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await serviceApi.getServices();
      setServices(data || []);
    } catch (err) {
      setError("Unable to load services from server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Categories list
  const categories = ["All", "Plumbing", "Electrical", "AC Repair", "Carpentry", "Painting", "Appliance", "Pest Control", "Cleaning"];

  // Filter & Sort Logic
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.category && service.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return a.id - b.id;
  });

  return (
    <div className="services-page-container container py-4">
      
      <div className="page-header mb-4">
        <div>
          <h1 className="page-title">Home Services Catalog</h1>
          <p className="page-subtitle">Select from our expert home repair, cleaning, and maintenance offerings</p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="filter-search-toolbar mb-4">
        
        {/* Search */}
        <div className="toolbar-search-input">
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search by service name or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Pills */}
        <div className="toolbar-categories">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="toolbar-sort">
          <ArrowUpDown size={16} className="sort-icon" />
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="popular">Popularity</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="name">Service Name (A-Z)</option>
          </select>
        </div>

      </div>

      {/* Main Grid Content */}
      {loading ? (
        <LoadingSpinner message="Fetching live service catalog from backend..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchServices} />
      ) : filteredServices.length === 0 ? (
        <EmptyState 
          title="No Services Found" 
          message="No matching home services found for your current search filter." 
          actionText="Clear Filters"
          actionLink="#"
        />
      ) : (
        <div className="services-cards-grid">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}

    </div>
  );
};
