import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import LandingPage from './components/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import HomePage from './pages/HomePage.jsx';
import CadastroPetPage from './pages/CadastroPetPage.jsx';
import CadastroAdotantePage from './pages/CadastroAdotantePage.jsx';
import PetDetailPage from './pages/PetDetailPage.jsx';
import AdopterListPage from './pages/AdopterListPage.jsx';
import CadastroFuncionarioPage from './pages/CadastroFuncionarioPage.jsx';

import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<App />}>
            {' '}
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/pets' element={<HomePage />} />
            <Route path='/cadastro/adotante' element={<CadastroAdotantePage />} />
            <Route path='/cadastro/funcionario' element={<CadastroFuncionarioPage />} />
            <Route path='pets/:id' element={<PetDetailPage />} />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Route>

          <Route path='/app' element={<ProtectedRoute />}>
            <Route path='cadastropet' element={<CadastroPetPage />} />
            <Route path='adotantes' element={<AdopterListPage />} />
            <Route path='cadastropet/:idPet' element={<CadastroPetPage />} />

            <Route index element={<Navigate to='pets' replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
