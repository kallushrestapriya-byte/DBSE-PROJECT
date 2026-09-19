import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Global Styles
import './styles/global.css';
import './styles/navbar.css';
import './styles/footer.css';
import './styles/auth.css';
import './styles/dashboard.css';
import './styles/services.css';
import './styles/request-form.css';
import './styles/my-requests.css';
import './styles/profile.css';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

// Common Components
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { ProtectedRoute } from './components/common/ProtectedRoute';

// Customer Pages
import { HomePage } from './pages/customer/HomePage';
import { LoginPage } from './pages/customer/LoginPage';
import { RegisterPage } from './pages/customer/RegisterPage';
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { ServicesPage } from './pages/customer/ServicesPage';
import { ServiceDetailsPage } from './pages/customer/ServiceDetailsPage';
import { BookServicePage } from './pages/customer/BookServicePage';
import { MyRequestsPage } from './pages/customer/MyRequestsPage';
import { RequestDetailsPage } from './pages/customer/RequestDetailsPage';
import { MyBookingsPage } from './pages/customer/MyBookingsPage';
import { BookingDetailsPage } from './pages/customer/BookingDetailsPage';
import { PaymentPage } from './pages/customer/PaymentPage';
import { ProfilePage } from './pages/customer/ProfilePage';

export const App = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <div className="app-viewport">
          <Navbar />
          
          <main className="main-content">
            <Routes>
              {/* 1. Home Page */}
              <Route path="/" element={<HomePage />} />

              {/* 2. Public Auth Routes */}
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />

              {/* 3. Services Catalog & Details */}
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:serviceId" element={<ServiceDetailsPage />} />

              {/* 4. Protected Customer Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <CustomerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/book/:serviceId" element={
                <ProtectedRoute>
                  <BookServicePage />
                </ProtectedRoute>
              } />
              <Route path="/requests" element={
                <ProtectedRoute>
                  <MyRequestsPage />
                </ProtectedRoute>
              } />
              <Route path="/requests/:requestId" element={
                <ProtectedRoute>
                  <RequestDetailsPage />
                </ProtectedRoute>
              } />
              <Route path="/bookings" element={
                <ProtectedRoute>
                  <MyBookingsPage />
                </ProtectedRoute>
              } />
              <Route path="/bookings/:bookingId" element={
                <ProtectedRoute>
                  <BookingDetailsPage />
                </ProtectedRoute>
              } />
              <Route path="/payments/:bookingId" element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />

              {/* Aliases for legacy customer routes */}
              <Route path="/customer/dashboard" element={<Navigate to="/dashboard" replace />} />
              <Route path="/customer/services" element={<Navigate to="/services" replace />} />
              <Route path="/customer/requests" element={<Navigate to="/requests" replace />} />
              <Route path="/customer/profile" element={<Navigate to="/profile" replace />} />

              {/* Catch-all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
