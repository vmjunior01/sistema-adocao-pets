import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import logoImagem from '../assets/adopet.png';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const userRole = user?.role;
  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const renderEmployeeNav = () => (
    // CENÁRIO 1: FUNCIONÁRIO LOGADO
    <div className='header-nav'>
      <Link className='link-text' to='/pets'>
        Pets
      </Link>
      <Link className='link-text' to='/app/cadastropet'>
        Cadastro
      </Link>
      <Link className='link-text' to='/app/adotantes'>
        Adotantes
      </Link>
      <button onClick={handleLogout} className='button-login' title='Logout'>
        Logout
      </button>
    </div>
  );

  const renderAdopterNav = () => (
    // CENÁRIO 2: ADOTANTE LOGADO
    <div className='header-nav login-adopter'>
      <Link className='link-text' to='/pets'>
        Pets
      </Link>
      <button onClick={handleLogout} className='button-login' title='Logout'>
        Logout
      </button>
    </div>
  );

  const renderPublicNav = () => (
    // CENÁRIO 3: DESLOGADO
    <div className='logout-user'>
      <Link className='button-login' to='/login'>
        Login
      </Link>
    </div>
  );

  let navigationContent;
  if (isLoggedIn) {
    if (userRole === 'Funcionario') {
      navigationContent = renderEmployeeNav();
    } else if (userRole === 'Adotante') {
      navigationContent = renderAdopterNav();
    } else {
      navigationContent = renderAdopterNav();
    }
  } else {
    navigationContent = renderPublicNav();
  }

  return (
    <header className='main-header'>
      <Link to='/'>
        <img className='header-logo' src={logoImagem} alt='Logo da Adopet' />
      </Link>
      <nav className='header-nav'>{navigationContent}</nav>
    </header>
  );
};

export default Header;
