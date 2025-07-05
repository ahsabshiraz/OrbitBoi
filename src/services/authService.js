import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

const API = API_ENDPOINTS.AUTH;

export const register = async (data) => {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
};