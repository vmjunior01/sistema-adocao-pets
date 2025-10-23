// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import './index.css';

// import LandingPage from './components/LandingPage.jsx';
// import App from './App.jsx';
// import HomePage from './pages/HomePage.jsx';
// import CadastroPetPage from './pages/CadastroPetPage.jsx';
// import CadastroAdotantePage from './pages/CadastroAdotantePage.jsx';
// import PetDetailPage from './pages/PetDetailPage.jsx';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />

//         <Route path="/" element={<App />}>
//           <Route path="home" element={<HomePage />} />
//           <Route path="cadastro/pet" element={<CadastroPetPage />} />
//           <Route path="cadastro/adotante" element={<CadastroAdotantePage />} />
//           <Route path="pets/:id" element={<PetDetailPage />} />
//         </Route>

//         <Route path="/pets" element={<App />}>
//           <Route index element={<HomePage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   </React.StrictMode>
// );

// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';

// Importa os novos módulos de autenticação e proteção
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Importa suas páginas e componentes
import LandingPage from './components/LandingPage.jsx';
import LoginPage from './pages/LoginPage.jsx'; // ⬅️ Nova tela de Login
import HomePage from './pages/HomePage.jsx';
import CadastroPetPage from './pages/CadastroPetPage.jsx';
import CadastroAdotantePage from './pages/CadastroAdotantePage.jsx';
import PetDetailPage from './pages/PetDetailPage.jsx';
// Não precisamos importar App.jsx diretamente, pois ele é carregado pelo ProtectedRoute

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* ⬅️ 1. Envolve toda a aplicação no provedor de autenticação */}
      <AuthProvider>
        <Routes>
          {/* ROTAS PÚBLICAS */}
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />

          {/* ⬅️ 2. ROTAS PROTEGIDAS (Usando o ProtectedRoute) 
                Tudo aqui só será acessado se o usuário estiver logado. 
                O ProtectedRoute renderiza o App.jsx (Header Interno + Footer) 
            */}
          <Route path='/' element={<ProtectedRoute />}>
            {/* Redirecionamento de /pets para a HomePage (como você queria) */}
            <Route path='pets' element={<HomePage />} />
            <Route path='home' element={<HomePage />} />
            <Route path='cadastro/pet' element={<CadastroPetPage />} />
            <Route
              path='cadastro/adotante'
              element={<CadastroAdotantePage />}
            />
            <Route path='pets/:id' element={<PetDetailPage />} />
          </Route>

          {/* Rota para lidar com rotas não encontradas */}
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
