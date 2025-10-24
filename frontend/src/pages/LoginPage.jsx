import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/LoginPage.css';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const [loginType, setLoginType] = useState('adotante');

    const navigate = useNavigate();
    const { login, user } = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const success = await login(email, senha, loginType); 

        if (success) {
            const userRole = JSON.parse(localStorage.getItem('user'))?.role;

            if (userRole === 'Adotante') {
                navigate('/pets', { replace: true });
            } else if (userRole === 'Funcionario' || userRole === 'Admin') {
                navigate('/pets', { replace: true });
            }

        } else {
            setError('E-mail ou senha incorretos. Verifique suas credenciais.');
        }
    };

    return (
        <div className='login-container'>
            <div className='login-box'>
                <h2>Login Adopet</h2>
                <form onSubmit={handleSubmit}>
                    {error && <p className='error-message'>{error}</p>}

                    <div className='input-group login-type-selector'>
                        <label htmlFor='loginType'>Acesso</label>
                        <select
                            id='loginType'
                            value={loginType}
                            onChange={(e) => setLoginType(e.target.value)}
                            className='select-input'
                        >
                            <option value='adotante'>Adotante</option>
                            <option value='funcionario'>Funcionário</option>
                        </select>
                    </div>

                    <div className='input-group'>
                        <label htmlFor='email'>E-mail</label>
                        <input
                            id='email'
                            type='email'
                            placeholder={
                                loginType === 'funcionario'
                                    ? 'seuemail@abrigo.com'
                                    : 'seuemail@exemplo.com'
                            }
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
                            placeholder='•••'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <button type='submit' className='login-button'>
                        Entrar
                    </button>

                    <div className='register-msg'>
                        <p>
                            Novo por aqui?{' '}
                            <Link to='/cadastro' className='register-link'>
                                Cadastre-se!
                            </Link>
                        </p>
                    </div>

                    <Link to='/' className='back-link'>
                         Voltar / Home
                    </Link>
                </form>
            </div>
        </div>
    );
}