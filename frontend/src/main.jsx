// frontend/src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import PetDetailPage from './pages/PetDetailPage';

// Importe os componentes de página que criaremos em breve
// Por enquanto, usaremos o componente App como um placeholder
import HomePage from './pages/HomePage'; 
import CadastroPetPage from './pages/CadastroPetPage';
import CadastroAdotantePage from './pages/CadastroAdotantePage';

// frontend/src/main.jsx (Apenas o bloco do ReactDOM)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* O App agora é o layout pai */}
      <Routes>
        <Route path="/" element={<App />}> 
          {/* As rotas filhas serão renderizadas no <Outlet /> do App.jsx */}
          <Route index element={<HomePage />} /> {/* Rota Home */}
          <Route path="cadastro/pet" element={<CadastroPetPage />} />
          <Route path="cadastro/adotante" element={<CadastroAdotantePage />} />
          {/* Rota de Detalhes (A ser implementada) */}
          <Route path="pets/:id" element={<PetDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);

// NOTA: Os imports de HomePage, CadastroPetPage, etc. causarão um erro
// até que você crie os arquivos na pasta /pages. Vamos fazer isso agora.