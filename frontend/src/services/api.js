import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
});

// Auth interceptor removed as authentication is no longer required.
// API.interceptors.request.use((config) => { ... });

export default API;
