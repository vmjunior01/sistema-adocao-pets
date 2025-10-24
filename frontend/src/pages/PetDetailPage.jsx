import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../styles/PetDetail.css';

const API_URL = 'http://localhost:3000';

const calcularIdade = (dataNascimento) => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const mes = hoje.getMonth() - nascimento.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idade--;
  }
  return idade;
};

const PetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn, userRole } = useAuth();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const role = userRole ? userRole.toLowerCase() : '';
  const isEmployee = role === 'funcionario';
  const isAdopter = role === 'adotante';
  const petStatus = pet?.status ? pet.status.toLowerCase() : '';
  const isAvailable = petStatus === 'disponível';

  const fetchPet = async () => {
    try {
      const response = await axios.get(`${API_URL}/pets/${id}`);
      setPet(response.data);
      setStatusMessage('');
    } catch (err) {
      console.error('Erro ao buscar pet:', err);
      setStatusMessage('Pet não encontrado ou erro ao carregar.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPet();
  }, [id]);

  const handleAdocao = async () => {
    const adotanteId = user?.id;

    if (!adotanteId) {
      setStatusMessage(
        'Erro: ID do adotante não encontrado. Faça login novamente.'
      );
      return;
    }

    if (
      !window.confirm(
        `Tem certeza que deseja adotar ${pet.nome}? Esta ação é irreversível.`
      )
    ) {
      return;
    }

    try {
      await axios.post(`${API_URL}/adocoes`, {
        petId: pet.id,
        adotanteId: adotanteId,
      });

      setStatusMessage(`Parabéns! ${pet.nome} foi adotado(a) com sucesso!`);
      setIsSuccess(true);

      setTimeout(() => {
        fetchPet();
      }, 2000);
    } catch (error) {
      const errorMsg =
        error.response?.data?.error ||
        'Erro desconhecido. Verifique o console.';
      setStatusMessage(`Falha na Adoção: ${errorMsg}`);
      setIsSuccess(false);
    }
  };

  const handleEdit = () => {
    navigate(`/app/cadastropet/${pet.id}`);
  };

  if (loading) return <h1>Carregando...</h1>;
  if (statusMessage && !pet)
    return <h1 className='error-status'>{statusMessage}</h1>;
  if (!pet) return <h1 className='error-status'>Pet indisponível.</h1>;

  const idade = calcularIdade(pet.dataNascimento);
  const idadeTexto = idade === 1 ? 'ano' : 'anos';
  const especieLowerCase = pet.especie ? pet.especie.toLowerCase() : '';
  const imageUrl = especieLowerCase.includes('cachorro')
    ? `https://placedog.net/600/400?random=${pet.id}`
    : `https://cataas.com/cat?width=600&height=400&v=${pet.id}`;

  const adocaoAtual = pet.adocao ? pet.adocao : null;
  const adotanteInfo = adocaoAtual ? adocaoAtual.adotante : null;

  return (
    <div className='detail-container'>
      <div className='detail-content-wrapper'>
        <div className='detail-image-box'>
          <img
            src={imageUrl}
            alt={`Foto do ${pet.nome}`}
            className='detail-image'
          />
        </div>

        <div className='detail-info-box'>
          <h2>{pet.nome}</h2>
          <p>
            <strong>Espécie:</strong> {pet.especie}
          </p>
          <p>
            <strong>Idade:</strong> {idade} {idadeTexto}
          </p>
          <p>
            <strong>Descrição:</strong> {pet.descricao}
          </p>

          <p
            className={`detail-status ${
              isAvailable ? 'status-disponivel' : 'status-adotado'
            }`}
            style={{ fontWeight: 'bold', fontSize: '1.1em' }}
          >
            {isAvailable ? 'DISPONÍVEL' : 'ADOTADO'}
          </p>

          {adotanteInfo && isEmployee && (
            <div className='adotante-box'>
              <h3>Detalhes da Adoção</h3>
              <p>
                <strong>Adotado por:</strong> {adotanteInfo.nomeCompleto}
              </p>
              <p>
                <strong>ID:</strong> {adotanteInfo.id}
              </p>
            </div>
          )}

          <div className='action-buttons-container'>
            {isAdopter && isAvailable && (
              <button onClick={handleAdocao} className='button-adopt'>
                ADOTAR ESTE PET
              </button>
            )}

            {isEmployee && (
              <button onClick={handleEdit} className='button-edit'>
                EDITAR INFORMAÇÕES
              </button>
            )}

            {!isLoggedIn && isAvailable && (
              <p style={{ marginTop: '20px', color: '#e62a2a' }}>
                Faça login como Adotante para adotar este pet.
              </p>
            )}

            {statusMessage && (
              <p
                className={isSuccess ? 'success-message' : 'error-message'}
                style={{ marginTop: '15px' }}
              >
                {statusMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailPage;
