import axios from 'axios';

const baseURL = 'http://localhost:3001/';

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 1000,
});

export default api;
