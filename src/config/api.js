// API Configuration
import { API_BASE_URL } from './environment.js';

export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/api/auth`,
  EXPERIENCES: `${API_BASE_URL}/api/experiences`,
  MODELS: `${API_BASE_URL}/api/models`,
};

export default API_BASE_URL; 