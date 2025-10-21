// frontend/src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'; // Vamos criar este arquivo de estilo

const Header = () => {
  return (
    <header className="main-header">
      {/* 1. Logo do Sistema */}
      <Link to="/" className="header-logo">
        Adopet 🐾
      </Link>

      {/* 2. Links Principais de Navegação */}
      <nav className="header-nav">
        <Link to="/" className="nav-link">Adotar um Pet</Link>
        <Link to="/cadastro/pet" className="nav-link">Cadastrar Pet</Link>
        <Link to="/cadastro/adotante" className="nav-link">Cadastrar Adotante</Link>
      </nav>
    </header>
  );
};

export default Header;