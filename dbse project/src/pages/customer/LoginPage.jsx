import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Wrench, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const LoginPage = () => {
  const { loginUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('ananya@example.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await loginUser(email, password);
      setLoading(false);

      if (res.success) {
        showToast(`Welcome back, ${res.user?.name || 'Customer'}!`, "success");
        navigate('/dashboard');
      } else {
        setError(res.message || "Invalid credentials. Please check your email and password.");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || "Unable to connect to login server. Please try again.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-container">
        
        <div className="auth-card-header">
          <div className="auth-brand-logo">
            <Wrench size={28} className="brand-icon" />
            <span>HomeServe</span>
          </div>
          <h2>Customer Sign In</h2>
          <p>Login to request home services and manage your orders</p>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="login-email">Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input 
                id="login-email"
                type="email" 
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="login-password">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input 
                id="login-password"
                type="password" 
                className="form-control"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block auth-btn" disabled={loading}>
            {loading ? "Authenticating..." : <>Sign In <ArrowRight size={18} /></>}
          </button>
        </form>

        <div className="auth-footer-text">
          Don't have an account? <Link to="/register">Register Here</Link>
        </div>

      </div>
    </div>
  );
};
