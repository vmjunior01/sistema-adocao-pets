import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdopterCard from '../components/AdopterCard';
import { useAuth } from '../contexts/AuthContext';
import '../styles/HomePage.css';

const API_URL = 'http://localhost:3000';

const AdopterListPage = () => {
  const [adopters, setAdopters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isEmployee } = useAuth();

  useEffect(() => {
    const fetchAdopters = async () => {
      if (!isEmployee) {
        setError('Acesso negado. Apenas funcionários podem ver esta lista.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/adotantes`);
        setAdopters(response.data);
      } catch (err) {
        console.error('Erro ao buscar adotantes:', err);
        setError(
          'Não foi possível carregar a lista de adotantes. O servidor pode estar offline.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAdopters();
  }, [isEmployee]);

  if (loading) {
    return <h1 className='loading-message'>Carregando Adotantes...</h1>;
  }

  if (error) {
    return <h1 style={{ color: 'red', textAlign: 'center' }}>{error}</h1>;
  }

  return (
    <div className='adopter-list-container homepage-container'>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>
        Gerenciamento de Adotantes Cadastrados
      </h2>

      {adopters.length === 0 ? (
        <p
          className='empty-message'
          style={{ textAlign: 'center', fontSize: '1.2em' }}
        >
          Nenhum adotante cadastrado no momento.
        </p>
      ) : (
        <div className='pets-grid'>
          {adopters.map((adopter) => (
            <AdopterCard key={adopter.id} adopter={adopter} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdopterListPage;
