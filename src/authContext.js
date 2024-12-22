// // AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [username, setUsername] = useState('');

//     useEffect(() => {
//         // Check for existing token and username on initial load
//         const token = localStorage.getItem('token');
//         if (token) {
//             setIsLoggedIn(true);
//             setUsername(localStorage.getItem('username') || '');
//         }
//     }, []);

//     const login = (token, username) => {
//         // Store token and username in localStorage
//         localStorage.setItem('token', token);
//         localStorage.setItem('username', username);

//         // Update context state
//         setIsLoggedIn(true);
//         setUsername(username);
//     };

//     const logout = () => {
//         // Clear token and username from localStorage
//         localStorage.removeItem('token');
//         localStorage.removeItem('username');

//         // Reset context state
//         setIsLoggedIn(false);
//         setUsername('');
//     };

//     return (
//         <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Updated to named import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        // Check for existing token and username on initial load
        const token = localStorage.getItem('token');
        if (token) {
            // Decode the token to extract user ID
            const decodedToken = jwtDecode(token);  // Use jwtDecode here
            const storedUserId = decodedToken.userId;

            setIsLoggedIn(true);
            setUsername(localStorage.getItem('username') || '');
            setEmail(localStorage.getItem('email') || '');
            setUserId(storedUserId); // Set the user ID from the decoded token

            // Optionally, store the userId in localStorage if needed for later use
            localStorage.setItem('userId', storedUserId);
        }
    }, []);

    const login = (token, username, email) => {
        // Decode the token to extract userId
        const decodedToken = jwtDecode(token); // Use jwtDecode here
        const storedUserId = decodedToken.userId;

        // Store token, username, and userId in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        localStorage.setItem('email', email);
        localStorage.setItem('userId', storedUserId); // Store userId in localStorage

        // Update context state
        setIsLoggedIn(true);
        setUsername(username);
        setUserId(storedUserId); // Update userId in context state
    };

    const logout = () => {
        // Clear token, username, and userId from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('userId'); // Remove userId from localStorage

        // Reset context state
        setIsLoggedIn(false);
        setUsername('');
        setUserId('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
