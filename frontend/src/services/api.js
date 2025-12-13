import axios from 'axios';

const API = axios.create({
    baseURL: 'https://neodetect-backend.onrender.com/api',
    withCredentials: true
});

// Auth interceptor removed as authentication is no longer required.
// API.interceptors.request.use((config) => { ... });

export default API;
