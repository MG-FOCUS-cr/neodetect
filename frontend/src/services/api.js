import axios from 'axios';

const API = axios.create({
    baseURL: 'https://neodetect-2.onrender.com/api',
});

// Auth interceptor removed as authentication is no longer required.
// API.interceptors.request.use((config) => { ... });

export default API;
