// frontend/src/pages/CadastroPetPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o sucesso

const API_URL = 'http://localhost:3000'; 

const CadastroPetPage = () => {
  // 1. Estados para o formulário
  const [formData, setFormData] = useState({
    nome: '',
    especie: 'cachorro',
    dataNascimento: '',
    descricao: ''
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
      // Chamada POST para a API (Backend)
      await axios.post(`${API_URL}/pets`, formData);
      
      setStatusMessage('Pet cadastrado com sucesso! Redirecionando...');
      setIsSuccess(true);
      
      // Redireciona para a home page após 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Erro ao cadastrar pet:', error);
      setStatusMessage('Erro ao cadastrar o Pet. Tente novamente.');
      setIsSuccess(false);
    }
  };

  return (
    <FormContainer title="Cadastrar Novo Pet">
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label htmlFor="nome">Nome do Pet</label>
          <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="especie">Espécie</label>
          <select id="especie" name="especie" value={formData.especie} onChange={handleChange} required>
            <option value="cachorro">Cachorro</option>
            <option value="gato">Gato</option>
            <option value="coelho">Coelho</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dataNascimento">Data de Nascimento (Aprox.)</label>
          {/* O Backend espera o formato string que o input date gera, mas com Timezone */}
          <input type="date" id="dataNascimento" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="descricao">Descrição (Personalidade e Necessidades)</label>
          <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows="4" required></textarea>
        </div>

        <button type="submit" className="form-button">Cadastrar Pet</button>
        
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

export default CadastroPetPage;