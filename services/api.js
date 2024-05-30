import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.15:5000/api', // Use your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
