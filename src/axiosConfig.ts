import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',  // URL base de tu API REST
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('[PizzeriaIA] axiosConfig inicializado, baseURL:', api.defaults.baseURL);

api.interceptors.request.use((config) => {
  console.log('[PizzeriaIA] API request:', config.method?.toUpperCase(), config.baseURL, config.url);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log('[PizzeriaIA] API response OK:', response.config.url, response.status, response.data);
    return response;
  },
  (error) => {
    console.error('[PizzeriaIA] API response ERROR:', error.config?.url, error.message, error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
