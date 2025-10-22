// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import App from '../App.jsx'; // Importa o App para usar como layout

export default function ProtectedRoute() {
    const { isLoggedIn } = useAuth();
    
    // Se o usuário NÃO estiver logado, redireciona-o para a página de Login.
    if (!isLoggedIn) {
        // 'replace: true' impede que o usuário volte para a rota protegida com o botão Voltar do navegador.
        return <Navigate to="/login" replace />;
    }

    // Se estiver logado, renderiza o componente de layout App
    return <App />;
}