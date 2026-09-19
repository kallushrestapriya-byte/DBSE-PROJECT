import { httpClient } from './client';
import { INITIAL_PAYMENTS } from './initialData';

export const paymentApi = {
  async getPaymentByBookingId(bookingId) {
    try {
      const data = await httpClient(`/payments/booking/${bookingId}`);
      return data;
    } catch (err) {
      const stored = localStorage.getItem('homeserve_payments');
      const list = stored ? JSON.parse(stored) : INITIAL_PAYMENTS;
      const found = list.find(p => String(p.booking_id) === String(bookingId));
      if (found) return found;
      // Return default pending payment status object if not yet initialized
      return {
        id: Math.floor(8000 + Math.random() * 1000),
        booking_id: Number(bookingId),
        amount: 699,
        payment_method: "Cash / UPI on Completion",
        payment_status: "Pending",
        payment_time: "Awaiting Service Completion"
      };
    }
  }
};
