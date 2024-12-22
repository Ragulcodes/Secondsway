import axios from 'axios';

// Set the base URL for your backend
const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',// Your backend URL  https://secondsway-server.onrender.com
    withCredentials: true,   
});

// Set up interceptors to include JWT token in headers if available
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');  // Get token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
