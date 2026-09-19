import { httpClient } from './client';
import { INITIAL_SERVICES } from './initialData';

export const serviceApi = {
  async getServices() {
    try {
      const data = await httpClient('/services');
      return Array.isArray(data) ? data : (data.services || INITIAL_SERVICES);
    } catch (err) {
      return INITIAL_SERVICES;
    }
  },

  async getServiceById(serviceId) {
    try {
      const data = await httpClient(`/services/${serviceId}`);
      return data;
    } catch (err) {
      const found = INITIAL_SERVICES.find(s => String(s.id) === String(serviceId));
      if (found) return found;
      throw new Error("Service not found");
    }
  }
};
