import React from 'react';
import {
  FaInstagram,
  FaFacebook,
  FaEnvelope,
  FaPortrait,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../styles/HeaderLanding.css';
import logoImagem from '../assets/adopet.png';

const INSTAGRAM = 'https://instagram.com';
const FACEBOOK = 'https://instagram.com';
const EMAIL = 'https://instagram.com';

export default function HeaderLanding() {
  return (
    <header className='main-header'>
      <img className='header-logo' src={logoImagem} alt='Logo da Adopet' />

      <nav className='header-nav'>
        <a href={INSTAGRAM} target='_blank' rel='noopener noreferrer'>
          <FaInstagram size={20} />
        </a>
        <a href={FACEBOOK} target='_blank' rel='noopener noreferrer'>
          <FaFacebook size={20} />
        </a>

        <a href={EMAIL} target='_blank' rel='noopener noreferrer'>
          <FaEnvelope size={20} />
        </a>
        <a
          className='button-link'
          href='https://api.whatsapp.com/send?phone=5511912345678&text=ola,%20estou%20interessado(a)%20em%20adotar%20(envie%20o%20nome%20do%20pet)%20:'
          target='_blank'
          rel='noopener noreferrer'
        >
          Quero adotar
        </a>
        <span> | </span>
        <Link to='/login'>
          <FaPortrait size={20} />
        </Link>
      </nav>
    </header>
  );
}
