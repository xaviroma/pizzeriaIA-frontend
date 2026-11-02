import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',  // URL base de tu API REST
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const usuarioGuardado = localStorage.getItem("usuario");

  if (usuarioGuardado) {
    const usuario = JSON.parse(usuarioGuardado);

    if (usuario.token) {
      config.headers.Authorization = `Bearer ${usuario.token}`;
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('[PizzeriaIA] API response ERROR:', error.config?.url, error.message, error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
