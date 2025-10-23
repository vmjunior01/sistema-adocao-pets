import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaPowerOff } from 'react-icons/fa';
import '../styles/Header.css';
import logoImagem from '../assets/adopet.png';


const Header = () => {
    const { logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // 
        navigate('/login', { replace: true });
    };

    return (
        <header className='main-header'>
            <img className='header-logo' src={logoImagem} alt='Logo da Adopet' />

            <nav className='header-nav'>
                <Link to='/app/pets' className='nav-link'>
                    Ver Pets
                </Link>
                <Link to='/app/cadastro/pet' className='nav-link'>
                    Cadastrar Pet
                </Link>
                <Link to='/app/cadastro/adotante' className='nav-link'>
                    Cadastrar Adotante
                </Link>

                <span> | </span>

                <button 
                    onClick={handleLogout}
                    className='logout-button'
                    title="Sair da área interna"
                >
                    <FaPowerOff size={20} />
                </button>
            </nav>
        </header>
    );
};

export default Header;