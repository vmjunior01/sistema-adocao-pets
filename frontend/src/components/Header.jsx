import { Link, useNavigate } from 'react-router-dom'; // Precisamos de useNavigate
import { useAuth } from '../contexts/AuthContext'; // ⬅️ Importa o hook de autenticação
import { FaPowerOff } from 'react-icons/fa';
import '../styles/Header.css';
import logoImagem from '../assets/adopet.png';


const Header = () => {
    // 1. Obtém a função de logout do contexto e o hook de navegação
    const { logout } = useAuth(); 
    const navigate = useNavigate();

    // 2. Função que lida com o logout
    const handleLogout = () => {
        logout(); // Limpa o estado e o localStorage
        navigate('/login', { replace: true }); // ⬅️ Redireciona explicitamente para a página de login
    };

    return (
        <header className='main-header'>
            <img className='header-logo' src={logoImagem} alt='Logo da Adopet' />

            <nav className='header-nav'>
                {/* Mantemos seus Links de navegação */}
                <Link to='/pets' className='nav-link'>
                    Ver Pets
                </Link>
                <Link to='/cadastro/pet' className='nav-link'>
                    Cadastrar Pet
                </Link>
                <Link to='/cadastro/adotante' className='nav-link'>
                    Cadastrar Adotante
                </Link>

                <span> | </span>

                {/* 3. SUBSTITUÍMOS o Link por um Botão (ou div clicável) */}
                <button 
                    onClick={handleLogout} // ⬅️ Chama a função de logout
                    className='logout-button' // Adicione uma classe para estilizar
                    title="Sair da área interna"
                >
                    <FaPowerOff size={20} />
                </button>
            </nav>
        </header>
    );
};

export default Header;