import React, { createContext, useContext, useState } from 'react';
import { MOCK_USERS } from '../data/mockUsers';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Default logged in user is Customer for instant initial demo access
  const [currentUser, setCurrentUser] = useState(MOCK_USERS.customer);
  const [token, setToken] = useState("mock-jwt-token-initial-12345");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Switch Role helper for seamless demo testing (Customer / Technician / Admin)
  const switchRole = (roleName) => {
    if (MOCK_USERS[roleName]) {
      setCurrentUser(MOCK_USERS[roleName]);
      setToken(`mock-jwt-token-${roleName}-${Date.now()}`);
    }
  };

  const loginUser = async (email, password, role) => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await api.login(email, password, role);
      if (res.success) {
        setCurrentUser(res.user);
        setToken(res.token);
        setLoading(false);
        return { success: true, user: res.user };
      } else {
        setAuthError(res.message || "Invalid credentials");
        setLoading(false);
        return { success: false, message: res.message };
      }
    } catch (err) {
      setAuthError("Login failed. Please check network.");
      setLoading(false);
      return { success: false, message: err.message };
    }
  };

  const registerCustomer = async (userData) => {
    setLoading(true);
    setAuthError(null);
    try {
      const res = await api.register(userData);
      if (res.success) {
        setCurrentUser(res.user);
        setToken(res.token);
        setLoading(false);
        return { success: true };
      }
      setLoading(false);
      return { success: false };
    } catch (err) {
      setAuthError("Registration failed.");
      setLoading(false);
      return { success: false };
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setToken(null);
  };

  const updateUserProfile = (updatedFields) => {
    setCurrentUser(prev => prev ? { ...prev, ...updatedFields } : prev);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      token,
      loading,
      authError,
      switchRole,
      loginUser,
      registerCustomer,
      logoutUser,
      updateUserProfile,
      role: currentUser?.role || 'guest'
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
