import { authApi } from './authApi';
import { serviceApi } from './serviceApi';
import { requestApi } from './requestApi';
import { bookingApi } from './bookingApi';
import { paymentApi } from './paymentApi';
import { userApi } from './userApi';
import { locationApi } from './locationApi';

export const loginUser = authApi.login;
export const registerUser = authApi.register;
export const logoutUser = authApi.logout;
export const getCurrentUser = authApi.getCurrentUser;

export const getServices = serviceApi.getServices;
export const getServiceById = serviceApi.getServiceById;

export const getMyRequests = requestApi.getMyRequests;
export const getRequestById = requestApi.getRequestById;
export const createServiceRequest = requestApi.createServiceRequest;

export const getMyBookings = bookingApi.getMyBookings;
export const getBookingById = bookingApi.getBookingById;

export const getPaymentByBookingId = paymentApi.getPaymentByBookingId;

export const getUserProfile = userApi.getUserProfile;
export const updateUserProfile = userApi.updateUserProfile;
export const getTechnicianById = userApi.getTechnicianById;

export const getLocations = locationApi.getLocations;
export const createLocation = locationApi.createLocation;

export default {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
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
  getTechnicianById,
  getLocations,
  createLocation
};
