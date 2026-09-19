import { httpClient } from './client';
import { INITIAL_REQUESTS, INITIAL_SERVICES } from './initialData';

export const requestApi = {
  async getMyRequests() {
    try {
      const data = await httpClient('/requests');
      return Array.isArray(data) ? data : (data.requests || INITIAL_REQUESTS);
    } catch (err) {
      const stored = localStorage.getItem('homeserve_requests');
      return stored ? JSON.parse(stored) : INITIAL_REQUESTS;
    }
  },

  async getRequestById(requestId) {
    try {
      const data = await httpClient(`/requests/${requestId}`);
      return data;
    } catch (err) {
      const stored = localStorage.getItem('homeserve_requests');
      const list = stored ? JSON.parse(stored) : INITIAL_REQUESTS;
      const found = list.find(r => String(r.id) === String(requestId));
      if (found) return found;
      throw new Error("Service request not found");
    }
  },

  async createServiceRequest(requestPayload) {
    try {
      const data = await httpClient('/requests', {
        method: 'POST',
        body: JSON.stringify(requestPayload),
      });
      return data;
    } catch (err) {
      const stored = localStorage.getItem('homeserve_requests');
      const list = stored ? JSON.parse(stored) : INITIAL_REQUESTS;
      
      const serviceObj = INITIAL_SERVICES.find(s => String(s.id) === String(requestPayload.service_id)) || {};
      
      const newReq = {
        id: Math.floor(1000 + Math.random() * 9000),
        user_id: 1,
        service_id: requestPayload.service_id,
        service_name: serviceObj.name || requestPayload.service_name || "Home Service",
        service_price: serviceObj.price || 499,
        service_duration: serviceObj.duration || "60 mins",
        location_id: requestPayload.location_id,
        location_details: requestPayload.location_details,
        preferred_date: requestPayload.preferred_date,
        preferred_time: requestPayload.preferred_time,
        problem_description: requestPayload.problem_description,
        status: "Pending",
        created_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
      };

      const updated = [newReq, ...list];
      localStorage.setItem('homeserve_requests', JSON.stringify(updated));
      return newReq;
    }
  }
};
