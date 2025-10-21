// frontend/src/pages/CadastroAdotantePage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000'; 

const CadastroAdotantePage = () => {
  // 1. Estados para o formulário (campos do Adotante)
  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    endereco: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  // 2. Função para atualizar o estado ao digitar
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 3. Função de Submissão
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setIsSuccess(false);

    try {
      // Chamada POST para a API (Backend) - Rota /adotantes
      await axios.post(`${API_URL}/adotantes`, formData);
      
      setStatusMessage('Adotante cadastrado com sucesso! Redirecionando...');
      setIsSuccess(true);
      
      // Redireciona para a home page após 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Erro ao cadastrar adotante:', error);
      // Tratamento de erro específico para email duplicado (P2002)
      const errorMsg = error.response?.data?.error || 'Erro ao cadastrar o Adotante. Verifique o e-mail.';
      setStatusMessage(errorMsg);
      setIsSuccess(false);
    }
  };

  return (
    <FormContainer title="Cadastrar Adotante">
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="nomeCompleto">Nome Completo</label>
          <input type="text" id="nomeCompleto" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Telefone</label>
          <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="endereco">Endereço</label>
          <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required />
        </div>

        <button type="submit" className="form-button">Cadastrar Adotante</button>
        
        {/* Exibe mensagem de status */}
        {statusMessage && (
            <p className={isSuccess ? 'success-message' : 'error-message'}>
                {statusMessage}
            </p>
        )}
      </form>
    </FormContainer>
  );
};

export default CadastroAdotantePage;