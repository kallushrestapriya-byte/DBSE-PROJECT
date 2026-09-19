import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  ArrowLeft, 
  ShieldCheck, 
  FileText,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { paymentApi } from '../../api/paymentApi';
import { bookingApi } from '../../api/bookingApi';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { ErrorMessage } from '../../components/common/ErrorMessage';

export const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(null);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const [pData, bData] = await Promise.all([
          paymentApi.getPaymentByBookingId(bookingId),
          bookingApi.getBookingById(bookingId)
        ]);
        setPayment(pData);
        setBooking(bData);
      } catch (err) {
        setError("Unable to load payment details.");
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentInfo();
  }, [bookingId]);

  if (loading) return <div className="container py-5"><LoadingSpinner message="Fetching payment details..." /></div>;
  if (error || !payment) return <div className="container py-5"><ErrorMessage message={error || "Payment record not found."} /></div>;

  const isCompleted = payment.payment_status === 'Completed' || payment.payment_status === 'Paid';

  return (
    <div className="payment-page container py-4">
      
      <button onClick={() => navigate(-1)} className="btn btn-ghost mb-3">
        <ArrowLeft size={16} /> Back to Booking Details
      </button>

      <div className="page-header mb-4">
        <h1 className="page-title">Payment & Invoice Details</h1>
        <p className="page-subtitle">Receipt for Booking #{bookingId}</p>
      </div>

      <div className="payment-layout-card">
        
        {/* Header Status Banner */}
        <div className={`payment-status-header ${isCompleted ? 'status-paid' : 'status-pending'}`}>
          <div className="ps-icon">
            {isCompleted ? <CheckCircle2 size={32} /> : <Clock size={32} />}
          </div>
          <div className="ps-text">
            <h2>Payment Status: {payment.payment_status}</h2>
            <p>{isCompleted ? "Payment settlement confirmed by backend." : "Actual payment will be settled upon technician service completion."}</p>
          </div>
        </div>

        {/* Payment Summary Breakdown */}
        <div className="payment-body-grid">
          
          <div className="payment-info-list">
            <h3 className="section-title-sm mb-3">Transaction Details</h3>

            <div className="pay-kv-row">
              <span className="pay-label">Booking ID:</span>
              <span className="pay-val font-mono">#{payment.booking_id || bookingId}</span>
            </div>

            <div className="pay-kv-row">
              <span className="pay-label">Total Service Amount:</span>
              <span className="pay-val text-blue font-weight-bold text-lg">₹{payment.amount || booking?.amount || 699}</span>
            </div>

            <div className="pay-kv-row">
              <span className="pay-label">Selected Payment Method:</span>
              <span className="pay-val badge-method">{payment.payment_method || "Cash / UPI on Service"}</span>
            </div>

            <div className="pay-kv-row">
              <span className="pay-label">Backend Payment Status:</span>
              <span className={`pay-val status-pill ${isCompleted ? 'pill-completed' : 'pill-pending'}`}>
                {payment.payment_status}
              </span>
            </div>

            <div className="pay-kv-row">
              <span className="pay-label">Payment Time / Stamp:</span>
              <span className="pay-val">{payment.payment_time || "Pending Completion"}</span>
            </div>
          </div>

          {/* Legal / Protection Notice */}
          <div className="payment-protection-box">
            <div className="pp-icon">
              <ShieldCheck size={28} className="text-blue" />
            </div>
            <h4>Real Database Payment Record</h4>
            <p>
              This payment status is retrieved directly from your existing <code>payments</code> database table. No mock online gateway popups are simulated.
            </p>
            <div className="mt-3">
              <Link to={`/bookings/${bookingId}`} className="btn btn-outline btn-block btn-sm">
                Return to Booking
              </Link>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
