import React from 'react';
import { FaGithub, FaFacebook, FaEnvelope, FaWhatsapp, FaInstagram } from 'react-icons/fa';
import '../styles/Footer.css';

const GITHUB = 'https://github.com/vmjunior01/sistema-adocao-pets';
const INSTAGRAM = 'https://instagram.com';
const FACEBOOK = 'https://facebook.com';
const EMAIL = 'mailto:adopet@adopet.com';
const WHATSAPP = 'https://web.whatsapp.com/';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-abrigo'>
        <p>&copy; {new Date().getFullYear()} Adopet </p>
        <a href={INSTAGRAM} target='_blank' rel='noopener noreferrer'>
          <FaInstagram size={20} />
        </a>
        <a href={FACEBOOK} target='_blank' rel='noopener noreferrer'>
          <FaFacebook size={20} />
        </a>

        <a href={EMAIL} target='_blank' rel='noopener noreferrer'>
          <FaEnvelope size={20} />
        </a>

        <a href={WHATSAPP} target='_blank' rel='noopener noreferrer'>
          <FaWhatsapp size={20} />
        </a>
      </div>

      <div className='footer-dev'>
        <p>
          Desenvolvido por{' '}
          <a href={GITHUB} target='_blank' rel='noopener noreferrer'>
            Squad 7
          </a>
        </p>
        <div className='social-icons'>
          <a href={GITHUB} target='_blank' rel='noopener noreferrer'>
            <FaGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
