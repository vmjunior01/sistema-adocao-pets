import React from 'react';
import { FaGithub } from 'react-icons/fa';
import '../styles/Footer.css';

const GITHUB_URL = 'https://github.com/vmjunior01/sistema-adocao-pets';

export default function Footer() {
  return (
    <footer className='footer'>

      <p className='text'>
        &copy; {new Date().getFullYear()} Adopet - Desenvolvido por{' '}
          <a           
            href={GITHUB_URL}
            target='_blank'
            rel='noopener noreferrer'
            >
            Squad 7</a>
      </p>
      <div className='social-icons'>
        <a
          href={GITHUB_URL}
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaGithub size={20} />
        </a>
      </div>
    </footer>
  );
}
