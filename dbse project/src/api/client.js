const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const getAuthHeader = () => {
  const token = localStorage.getItem('homeserve_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const httpClient = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get('content-type');
    
    let data;
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { text: await response.text() };
    }

    if (!response.ok) {
      const errorMsg = data?.message || data?.error || `HTTP Error ${response.status}: ${response.statusText}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.warn(`[API Client] Request to ${endpoint} failed:`, error.message);
    throw error;
  }
};
