import axios from 'axios';

const API = 'http://localhost:5000/api/auth'; // Change if backend URL is different

export const register = async (data) => {
  const res = await axios.post(`${API}/register`, data);
  return res.data;
};

export const login = async (data) => {
  const res = await axios.post(`${API}/login`, data);
  return res.data;
};