import React, { useState } from 'react';
import axios from 'axios';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000';

export default function CadastroFuncionarioPage() {
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    senhaHash: '',
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setIsSuccess(false);

    try {
      await axios.post(`${API_URL}/funcionarios`, formData);

      setStatusMessage(
        'Funcionário cadastrado com sucesso! Redirecionando para o Login...'
      );
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Erro ao cadastrar funcionário:', error);

      const errorMsg =
        error.response?.data?.error ||
        'Erro ao cadastrar o Funcionário. Verifique os dados.';
      setStatusMessage(errorMsg);
      setIsSuccess(false);
    }
  };

  return (
    <FormContainer title='Cadastrar Novo Funcionário'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='nomeCompleto'>Nome Completo</label>
          <input
            type='text'
            id='nomeCompleto'
            name='nomeCompleto'
            value={formData.nomeCompleto}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='email'>E-mail</label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='senhaHash'>Senha de Acesso</label>
          <input
            type='password'
            id='senhaHash'
            name='senhaHash'
            value={formData.senhaHash}
            onChange={handleChange}
            required
          />
        </div>

        <button type='submit' className='form-button'>
          Cadastrar Funcionário
        </button>

        {statusMessage && (
          <p className={isSuccess ? 'success-message' : 'error-message'}>
            {statusMessage}
          </p>
        )}
      </form>
    </FormContainer>
  );
}
