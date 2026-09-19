import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const ServiceContext = createContext(null);

export const ServiceProvider = ({ children }) => {
  const { currentUser } = useAuth();
  
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [requests, setRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Refresh all state from api
  const refreshData = async () => {
    setLoading(true);
    try {
      const [catList, srvList, reqList, usrList] = await Promise.all([
        api.getCategories(),
        api.getServices(),
        api.getRequests(currentUser?.role, currentUser?.id),
        api.getUsers()
      ]);

      setCategories(catList);
      setServices(srvList);
      setRequests(reqList);
      setAllUsers(usrList);
    } catch (err) {
      console.error("Failed to load initial data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [currentUser]);

  // Create a new request
  const createNewRequest = async (requestData) => {
    const newReq = await api.createRequest(requestData, currentUser);
    setRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  // Update request status (Technician / Admin)
  const updateStatus = async (requestId, status, techInfo = null) => {
    const updated = await api.updateRequestStatus(requestId, status, techInfo || currentUser);
    setRequests(prev => prev.map(r => r.id === requestId ? updated : r));
    return updated;
  };

  // Submit Feedback
  const submitRequestFeedback = async (requestId, rating, comment) => {
    const updated = await api.submitFeedback(requestId, rating, comment);
    setRequests(prev => prev.map(r => r.id === requestId ? updated : r));
    return updated;
  };

  // Admin Actions
  const addNewService = async (serviceData) => {
    const created = await api.addService(serviceData);
    setServices(prev => [created, ...prev]);
    return created;
  };

  const removeService = async (serviceId) => {
    await api.deleteService(serviceId);
    setServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const addNewTechnician = async (techData) => {
    const created = await api.addTechnician(techData);
    setAllUsers(prev => [...prev, created]);
    return created;
  };

  const toggleUserActiveStatus = async (userId) => {
    const updated = await api.toggleUserStatus(userId);
    setAllUsers(prev => prev.map(u => u.id === userId ? updated : u));
  };

  return (
    <ServiceContext.Provider value={{
      categories,
      services,
      requests,
      allUsers,
      loading,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      createNewRequest,
      updateStatus,
      submitRequestFeedback,
      addNewService,
      removeService,
      addNewTechnician,
      toggleUserActiveStatus,
      refreshData
    }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useServices must be used within a ServiceProvider");
  }
  return context;
};
