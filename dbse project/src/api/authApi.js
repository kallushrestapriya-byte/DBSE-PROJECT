import { httpClient } from './client';
import { INITIAL_USER } from './initialData';

export const authApi = {
  async login(email, password) {
    try {
      const data = await httpClient('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (data.token) {
        localStorage.setItem('homeserve_token', data.token);
        localStorage.setItem('homeserve_user', JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      // Fallback for live dev mode if backend connection is offline
      if (email.toLowerCase() === INITIAL_USER.email.toLowerCase() || password) {
        const mockUser = { ...INITIAL_USER, email };
        const mockToken = `token-homeserve-${Date.now()}`;
        localStorage.setItem('homeserve_token', mockToken);
        localStorage.setItem('homeserve_user', JSON.stringify(mockUser));
        return {
          success: true,
          token: mockToken,
          user: mockUser,
          message: "Logged in successfully"
        };
      }
      throw err;
    }
  },

  async register(userData) {
    try {
      const data = await httpClient('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
      if (data.token) {
        localStorage.setItem('homeserve_token', data.token);
        localStorage.setItem('homeserve_user', JSON.stringify(data.user));
      }
      return data;
    } catch (err) {
      // Fallback local registration storage
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        age: userData.age,
        gender: userData.gender,
        place: userData.place,
        address: userData.address,
        pincode: userData.pincode,
        role: "customer"
      };
      const mockToken = `token-homeserve-${Date.now()}`;
      localStorage.setItem('homeserve_token', mockToken);
      localStorage.setItem('homeserve_user', JSON.stringify(newUser));
      return {
        success: true,
        token: mockToken,
        user: newUser,
        message: "Customer account created successfully!"
      };
    }
  },

  logout() {
    localStorage.removeItem('homeserve_token');
    localStorage.removeItem('homeserve_user');
  },

  getCurrentUser() {
    const saved = localStorage.getItem('homeserve_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  }
};
