import axios from 'axios';

const baseURL = 'http://localhost:3001/';

const api = axios.create({
  baseURL,
  withCredentials: false,
  timeout: 10000,
});

export default api;
