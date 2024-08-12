// src/api.js
import axios from 'axios';

// config the axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// put the token in the header
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Interceptor
api.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    // Borrar el token si se recibe un 401
    localStorage.removeItem('token');
    
    
    window.location.href = '/'; 
  }
  return Promise.reject(error);
});

export default api;
