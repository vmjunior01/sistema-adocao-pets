import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // ⬅️ Hook de autenticação
import '../styles/LoginPage.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/pets', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const success = await login(email, senha);

    if (success) {
      navigate('/pets');

    } else {
      setError('E-mail ou senha incorretos. Verifique suas credenciais.');
    }
  };

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2>Login Interno Adopet</h2>
        <p>Acesso exclusivo para funcionários do abrigo.</p>

        <form onSubmit={handleSubmit}>
          {error && <p className='error-message'>{error}</p>}

          <div className='input-group'>
            <label htmlFor='email'>E-mail</label>
            <input
              id='email'
              type='email'
              placeholder='seu.email@abrigo.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='input-group'>
            <label htmlFor='senha'>Senha</label>
            <input
              id='senha'
              type='password'
              placeholder='••••••••'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type='submit' className='cta-button primary login-button'>
            Entrar
          </button>

          <Link to='/' className='back-link'>
            ← Voltar para a Landing Page
          </Link>
        </form>
      </div>
    </div>
  );
}
