// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Check for existing token and username on initial load
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setUsername(localStorage.getItem('username') || '');
        }
    }, []);

    const login = (token, username) => {
        // Store token and username in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);

        // Update context state
        setIsLoggedIn(true);
        setUsername(username);
    };

    const logout = () => {
        // Clear token and username from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('username');

        // Reset context state
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
