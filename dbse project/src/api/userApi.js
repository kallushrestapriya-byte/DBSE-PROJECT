import { httpClient } from './client';
import { INITIAL_USER, INITIAL_TECHNICIANS } from './initialData';

export const userApi = {
  async getUserProfile() {
    try {
      const data = await httpClient('/users/profile');
      return data;
    } catch (err) {
      const saved = localStorage.getItem('homeserve_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    }
  },

  async updateUserProfile(profileData) {
    try {
      const data = await httpClient('/users/profile', {
        method: 'PUT',
        body: JSON.stringify(profileData),
      });
      if (data.user) {
        localStorage.setItem('homeserve_user', JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      const current = localStorage.getItem('homeserve_user');
      const existing = current ? JSON.parse(current) : INITIAL_USER;
      const updated = { ...existing, ...profileData };
      localStorage.setItem('homeserve_user', JSON.stringify(updated));
      return { success: true, user: updated, message: "Profile updated successfully!" };
    }
  },

  async getTechnicianById(techId) {
    try {
      const data = await httpClient(`/technicians/${techId}`);
      return data;
    } catch (err) {
      const found = INITIAL_TECHNICIANS.find(t => String(t.id) === String(techId));
      if (found) return found;
      return INITIAL_TECHNICIANS[0];
    }
  }
};
