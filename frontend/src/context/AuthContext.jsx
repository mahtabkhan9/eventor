import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // decode token or fetch user profile if endpoint exists
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) setUser(storedUser);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setUser(res.data.user);
    };

    const register = async (username, email, password) => {
        await axios.post(`${backendUrl}/api/auth/register`, { username, email, password });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
