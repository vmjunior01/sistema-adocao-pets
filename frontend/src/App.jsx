// frontend/src/App.jsx

import React from 'react';
import Header from './components/Header';
// Importamos o Outlet para renderizar o componente da rota ativa
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <main className="main-content">
        {/* O Outlet renderizará a HomePage, CadastroPetPage, etc. aqui */}
        <Outlet /> 
      </main>
    </>
  );
}

export default App;