import axios from 'axios';
import { toast } from 'react-toastify';
import { csrfService } from './csrfService';

// Create axios instance with base URL & credentials for cookies
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor to add CSRF token on state-changing requests
apiClient.interceptors.request.use(
  async (config) => {
    if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
      try {
        const csrfToken = await csrfService.getToken();
        if (csrfToken) {
          config.headers['X-CSRF-Token'] = csrfToken;
        }
      } catch (error) {
        console.error('Failed to get CSRF token:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to retry on CSRF token errors
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 403 &&
      error.response?.data?.message?.includes('CSRF') &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await csrfService.refreshToken();
        const newToken = await csrfService.getToken();
        if (newToken) {
          originalRequest.headers['X-CSRF-Token'] = newToken;
        }
        return apiClient(originalRequest);
      } catch (csrfError) {
        console.error('Failed to refresh CSRF token:', csrfError);
        toast.error('Security token expired. Please refresh the page.');
        csrfService.clearToken();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

// Helper HTTP methods wrapper
export const api = {
  get: (url, config = {}) => apiClient.get(url, config),
  post: (url, data, config = {}) => apiClient.post(url, data, config),
  put: (url, data, config = {}) => apiClient.put(url, data, config),
  patch: (url, data, config = {}) => apiClient.patch(url, data, config),
  delete: (url, config = {}) => apiClient.delete(url, config),
};

export default apiClient;
