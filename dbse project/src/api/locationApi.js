import { httpClient } from './client';
import { INITIAL_LOCATIONS } from './initialData';

export const locationApi = {
  async getLocations() {
    try {
      const data = await httpClient('/locations');
      return Array.isArray(data) ? data : (data.locations || INITIAL_LOCATIONS);
    } catch (err) {
      const stored = localStorage.getItem('homeserve_locations');
      return stored ? JSON.parse(stored) : INITIAL_LOCATIONS;
    }
  },

  async createLocation(locationData) {
    try {
      const data = await httpClient('/locations', {
        method: 'POST',
        body: JSON.stringify(locationData),
      });
      return data;
    } catch (err) {
      const stored = localStorage.getItem('homeserve_locations');
      const list = stored ? JSON.parse(stored) : INITIAL_LOCATIONS;
      const newLoc = {
        id: Date.now(),
        ...locationData
      };
      const updated = [newLoc, ...list];
      localStorage.setItem('homeserve_locations', JSON.stringify(updated));
      return newLoc;
    }
  }
};
