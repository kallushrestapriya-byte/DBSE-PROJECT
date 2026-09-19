import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Wrench, 
  ClipboardList, 
  User, 
  LogOut, 
  Menu, 
  X, 
  CalendarCheck,
  LayoutDashboard,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const { currentUser, logoutUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
          <div className="brand-icon">
            <Wrench size={22} className="icon-wrench" />
            <Sparkles size={14} className="icon-sparkle" />
          </div>
          <span className="brand-text">Home<span className="brand-accent">Serve</span></span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links">
          <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
            <Home size={18} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/services" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Wrench size={18} />
            <span>Services</span>
          </NavLink>

          {currentUser && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/requests" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <ClipboardList size={18} />
                <span>My Requests</span>
              </NavLink>
              <NavLink to="/bookings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <CalendarCheck size={18} />
                <span>Bookings</span>
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <User size={18} />
                <span>Profile</span>
              </NavLink>
            </>
          )}
        </nav>

        {/* User Action Bar */}
        <div className="navbar-actions">
          {currentUser ? (
            <div className="user-profile-menu">
              <Link to="/profile" className="user-info-chip">
                <div className="avatar-circle">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="user-details">
                  <span className="user-name">{currentUser.name}</span>
                  <span className="user-role-badge">Customer</span>
                </div>
              </Link>
              <button onClick={handleLogout} className="logout-btn" title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button 
            className="mobile-hamburger" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-nav-links">
            <Link to="/" onClick={closeMobileMenu}><Home size={18} /> Home</Link>
            <Link to="/services" onClick={closeMobileMenu}><Wrench size={18} /> Services</Link>
            {currentUser ? (
              <>
                <Link to="/dashboard" onClick={closeMobileMenu}><LayoutDashboard size={18} /> Dashboard</Link>
                <Link to="/requests" onClick={closeMobileMenu}><ClipboardList size={18} /> My Requests</Link>
                <Link to="/bookings" onClick={closeMobileMenu}><CalendarCheck size={18} /> My Bookings</Link>
                <Link to="/profile" onClick={closeMobileMenu}><User size={18} /> Profile</Link>
                <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="btn btn-outline btn-block mt-3">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <div className="mobile-auth-row mt-3">
                <Link to="/login" className="btn btn-outline btn-block" onClick={closeMobileMenu}>Login</Link>
                <Link to="/register" className="btn btn-primary btn-block" onClick={closeMobileMenu}>Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
