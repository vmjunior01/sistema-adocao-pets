import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logoImagem from '../assets/adopet.png';
import { FaPowerOff } from 'react-icons/fa';

const Header = () => {
  return (
    <header className='main-header'>
      <img className='header-logo' src={logoImagem} alt='Logo da Adopet' />

      <nav className='header-nav'>
        <Link to='/' className='nav-link'>
          Ver Pets
        </Link>
        <Link to='/cadastro/pet' className='nav-link'>
          Cadastrar Pet
        </Link>
        <Link to='/cadastro/adotante' className='nav-link'>
          Cadastrar Adotante
        </Link>
        <span> | </span>
        <Link className='logout' to='/'>
          <FaPowerOff size={20} />
        </Link>
      </nav>
    </header>
  );
};

export default Header;
