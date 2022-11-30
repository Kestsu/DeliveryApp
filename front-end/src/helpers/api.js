import axios from 'axios';

// const baseURL = 'http://localhost:3001/';

// rota de teste
const baseURL = 'https://virtserver.swaggerhub.com/joselucassr/AppDelivery/1.0.0/';

const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 1000,
});

export default api;
