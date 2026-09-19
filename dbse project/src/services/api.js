import { 
  loginUser, 
  registerUser, 
  getServices, 
  getServiceById, 
  getMyRequests, 
  getRequestById, 
  createServiceRequest, 
  getMyBookings, 
  getBookingById, 
  getPaymentByBookingId, 
  getUserProfile, 
  updateUserProfile,
  getLocations,
  createLocation
} from '../api/api';

import { INITIAL_SERVICES } from '../api/initialData';

const categories = [
  { id: "cat-1", name: "Plumbing", description: "Leakages, drain unblocking & pipe fitting", popularTag: "Top Requested", color: "#2563eb", bgColor: "#eff6ff" },
  { id: "cat-2", name: "Electrical", description: "Wiring, switchboards, fans & short circuits", popularTag: "30-Min Arrival", color: "#d97706", bgColor: "#fffbeb" },
  { id: "cat-3", name: "AC Repair", description: "Jet foam servicing, gas refill & cooling fix", popularTag: "Summer Special", color: "#0284c7", bgColor: "#f0f9ff" },
  { id: "cat-4", name: "Cleaning", description: "Deep home, kitchen & bathroom scrubbing", popularTag: "4.9★ Rated", color: "#059669", bgColor: "#ecfdf5" },
  { id: "cat-5", name: "Appliance Repair", description: "Washing machines, fridges, RO purifiers & TVs", popularTag: "Part Warranty", color: "#7c3aed", bgColor: "#f5f3ff" },
  { id: "cat-6", name: "Painting", description: "Interior, exterior wall painting & damp proofing", popularTag: "Free Quotation", color: "#db2777", bgColor: "#fdf2f8" }
];

export const api = {
  login: loginUser,
  register: registerUser,
  getCategories: async () => categories,
  getServices,
  getServiceById,
  getRequests: getMyRequests,
  createRequest: createServiceRequest,
  updateRequestStatus: async (id, status) => ({ id, status }),
  submitFeedback: async (id, rating, comment) => ({ id, rating, comment }),
  getUsers: getUserProfile,
  updateProfile: updateUserProfile,
  getLocations,
  createLocation,
  getMyBookings,
  getBookingById,
  getPaymentByBookingId,
  addService: async (srv) => srv,
  deleteService: async (id) => ({ success: true }),
  addTechnician: async (tech) => tech,
  toggleUserStatus: async (id) => ({ id, status: 'Active' })
};

export default api;
