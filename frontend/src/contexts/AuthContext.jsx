import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000'; 

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    }); 

    const login = async (email, senha) => { 
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { email, senha });
            
            const userData = {
                ...response.data.user,
                token: response.data.token,
            };

            localStorage.setItem('user', JSON.stringify(userData));
            setUser(userData);
            return true;

        } catch (error) {
            console.error('Falha no login:', error.response?.data?.error || error.message);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };
 
    useEffect(() => {
        if (user && user.token) {
    
            axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        } else {

            delete axios.defaults.headers.common['Authorization'];
        }
    }, [user]);

    const value = {
        user,
        isLoggedIn: !!user,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};