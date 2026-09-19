import { httpClient } from './client';
import { INITIAL_BOOKINGS } from './initialData';

export const bookingApi = {
  async getMyBookings() {
    try {
      const data = await httpClient('/bookings');
      return Array.isArray(data) ? data : (data.bookings || INITIAL_BOOKINGS);
    } catch (err) {
      const stored = localStorage.getItem('homeserve_bookings');
      return stored ? JSON.parse(stored) : INITIAL_BOOKINGS;
    }
  },

  async getBookingById(bookingId) {
    try {
      const data = await httpClient(`/bookings/${bookingId}`);
      return data;
    } catch (err) {
      const stored = localStorage.getItem('homeserve_bookings');
      const list = stored ? JSON.parse(stored) : INITIAL_BOOKINGS;
      const found = list.find(b => String(b.id) === String(bookingId));
      if (found) return found;
      throw new Error("Booking record not found");
    }
  }
};
