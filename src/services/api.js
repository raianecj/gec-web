import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.15:8080', 
});

export const login = (email, password) => {
  return api.post('/login', { email, password });
};

export const register = (name, email, password) => {
  return api.post('/register', { name, email, password });
};