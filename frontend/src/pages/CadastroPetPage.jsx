import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';

const API_URL = 'http://localhost:3000';

const CadastroPetPage = () => {
  const { idPet } = useParams();
  const navigate = useNavigate();

  const isEditing = !!idPet;

  const [formData, setFormData] = useState({
    nome: '',
    especie: '',
    dataNascimento: '',
    descricao: '',
    status: 'disponível',
  });
  const [loading, setLoading] = useState(isEditing);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const fetchPetData = async () => {
        try {
          const response = await axios.get(`${API_URL}/pets/${idPet}`);
          const petData = response.data;

          const dataNascimentoFormatada = petData.dataNascimento
            ? new Date(petData.dataNascimento).toISOString().split('T')[0]
            : '';

          setFormData({
            nome: petData.nome || '',
            especie: petData.especie || '',
            dataNascimento: dataNascimentoFormatada,
            descricao: petData.descricao || '',
            status: petData.status || 'disponível',
          });
        } catch (error) {
          console.error('Erro ao carregar dados do Pet para edição:', error);
          setStatusMessage('Pet não encontrado ou erro ao carregar dados.');
          setIsSuccess(false);
        } finally {
          setLoading(false);
        }
      };
      fetchPetData();
    }
  }, [idPet, isEditing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setIsSuccess(false);

    try {
      let response;
      let finalMessage;

      if (isEditing) {
        response = await axios.put(`${API_URL}/pets/${idPet}`, formData);
        finalMessage = 'Pet atualizado com sucesso!';
      } else {
        response = await axios.post(`${API_URL}/pets`, formData);
        finalMessage = 'Novo Pet cadastrado com sucesso!';
      }

      setStatusMessage(finalMessage + ' Redirecionando...');
      setIsSuccess(true);

      setTimeout(() => {
        navigate('/pets');
      }, 2000);
    } catch (error) {
      console.error('Erro na operação de Pet:', error);
      const errorMsg = error.response?.data?.error || 'Erro ao salvar o Pet.';
      setStatusMessage(errorMsg);
      setIsSuccess(false);
    }
  };

  if (loading)
    return (
      <h1 style={{ textAlign: 'center', marginTop: '50px' }}>
        Carregando dados...
      </h1>
    );

  return (
    <FormContainer
      title={isEditing ? `Editar Pet (ID: ${idPet})` : 'Cadastrar Novo Pet'}
    >
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='nome'>Nome</label>
          <input
            type='text'
            id='nome'
            name='nome'
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='especie'>Espécie</label>
          <select
            id='especie'
            name='especie'
            value={formData.especie}
            onChange={handleChange}
            required
          >
            <option value=''>Selecione a Espécie</option>
            <option value='Cachorro'>Cachorro</option>
            <option value='Gato'>Gato</option>
            <option value='Outro'>Outro</option>
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='dataNascimento'>Data de Nascimento (Aprox.)</label>
          <input
            type='date'
            id='dataNascimento'
            name='dataNascimento'
            value={formData.dataNascimento}
            onChange={handleChange}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='descricao'>Descrição/Temperamento</label>
          <textarea
            id='descricao'
            name='descricao'
            value={formData.descricao}
            onChange={handleChange}
            rows='4'
          />
        </div>

        {isEditing && (
          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <select
              id='status'
              name='status'
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value='disponível'>Disponível</option>
              <option value='adotado'>Adotado</option>
            </select>
          </div>
        )}

        <button type='submit' className='form-button'>
          {isEditing ? 'SALVAR ALTERAÇÕES' : 'CADASTRAR PET'}
        </button>

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
