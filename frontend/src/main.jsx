import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import LandingPage from './components/LandingPage.jsx';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import CadastroPetPage from './pages/CadastroPetPage.jsx';
import CadastroAdotantePage from './pages/CadastroAdotantePage.jsx';
import PetDetailPage from './pages/PetDetailPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/" element={<App />}>
          <Route path="home" element={<HomePage />} />
          <Route path="cadastro/pet" element={<CadastroPetPage />} />
          <Route path="cadastro/adotante" element={<CadastroAdotantePage />} />
          <Route path="pets/:id" element={<PetDetailPage />} />
        </Route>

        <Route path="/pets" element={<App />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
