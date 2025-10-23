import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import App from '../App.jsx';

export default function ProtectedRoute() {
    const { isLoggedIn } = useAuth();
    
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <App />;
}