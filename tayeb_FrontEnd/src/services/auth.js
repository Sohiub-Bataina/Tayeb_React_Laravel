import apiClient from '../api/axios';

export const login = async (email, password) => {
    const response = await apiClient.post('/login', { email, password });
    return response.data;
};

export const register = async (name, email, password) => {
    const response = await apiClient.post('/register', { name, email, password });
    return response.data;
};

export const logout = async () => {
    const response = await apiClient.post('/logout');
    return response.data;
};

export const getUser = async () => {
    const response = await apiClient.get('/user');
    return response.data;
};
