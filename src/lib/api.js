import axios from 'axios';

const api = axios.create({
    // Use environment variable if available, otherwise fallback to the production URL
    baseURL: import.meta.env.VITE_API_URL || 'https://smart-eprint-solution-backend.vercel.app/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor — automatically attach auth token
api.interceptors.request.use(
    (config) => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || 'null');
        if (userInfo?.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor — normalize error messages and handle session expiry
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle session expiry / invalid token
            localStorage.removeItem('userInfo');
            const isRootAdmin = window.location.pathname.startsWith('/admin');
            if (isRootAdmin && !window.location.pathname.includes('/login')) {
                window.location.href = '/admin/login';
            }
        }
        const message =
            error.response?.data?.message || error.message || 'Something went wrong';
        error.message = message;
        return Promise.reject(error);
    }
);

export default api;
