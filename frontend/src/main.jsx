import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import LandingPage from './components/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePublic from './pages/HomePublic.jsx';
import HomePage from './pages/HomePage.jsx';
import CadastroPetPage from './pages/CadastroPetPage.jsx';
import CadastroAdotantePage from './pages/CadastroAdotantePage.jsx';
import PetDetailPage from './pages/PetDetailPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/public' element={<HomePublic />} />

          <Route path='/app' element={<ProtectedRoute />}>
            <Route path='pets' element={<HomePage />} />
            <Route path='pets/:id' element={<PetDetailPage />} />

            <Route path='cadastro/pet' element={<CadastroPetPage />} />
            <Route path='cadastro/adotante' element={<CadastroAdotantePage />} />

            <Route index element={<Navigate to='pets' replace />} />
          </Route>

          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
