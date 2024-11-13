import axios from 'axios';

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: 'http://localhost:5000/api',
});



export default api;
