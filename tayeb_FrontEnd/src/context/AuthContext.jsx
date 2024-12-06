import React, { createContext, useState } from 'react';
import { login, logout, getUser } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const handleLogin = async (email, password) => {
        const data = await login(email, password);
        setUser(data.user);
    };

    const handleLogout = async () => {
        await logout();
        setUser(null);
    };

    const fetchUser = async () => {
        const data = await getUser();
        setUser(data);
    };

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleLogout, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
