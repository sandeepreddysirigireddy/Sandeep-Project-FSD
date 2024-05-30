// src/axiosConfig.js
import axios from 'axios';

// Default axios instance for the main backend server
axios.defaults.baseURL = 'http://localhost:8081';

// Separate axios instance for the credentials server
export const credAxios = axios.create({
    baseURL: 'http://localhost:8082',
});
