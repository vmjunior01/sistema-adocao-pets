// frontend/src/pages/HomePage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PetCard from '../components/PetCard';
import '../styles/HomePage.css'; // Vamos criar este arquivo de estilo

// URL base do seu Backend (servidor Express)
const API_URL = 'http://localhost:3000'; 

const HomePage = () => {
  const [pets, setPets] = useState([]); // Estado para armazenar a lista de pets
  const [loading, setLoading] = useState(true); // Estado para gerenciar o carregamento
  const [error, setError] = useState(null); // Estado para gerenciar erros

  // useEffect é usado para executar a busca de dados assim que o componente é montado
  useEffect(() => {
    // Função para buscar os dados dos pets na API
    const fetchPets = async () => {
      try {
        // Chamada GET para a sua rota do Backend (GET /pets)
        const response = await axios.get(`${API_URL}/pets`);
        
        // Atualiza o estado com os dados recebidos
        setPets(response.data);
      } catch (err) {
        console.error("Erro ao buscar pets:", err);
        setError("Não foi possível carregar a lista de pets. O servidor pode estar offline.");
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    };

    fetchPets();
  }, []); // O array vazio [] garante que esta função só rode uma vez

  // Lógica de renderização
  if (loading) {
    return <h1>Carregando Pets...</h1>;
  }

  if (error) {
    return <h1 style={{color: 'red'}}>{error}</h1>;
  }

  return (
    <div className="homepage-container">
      <h2>Pets Disponíveis para Adoção</h2>
      
      {/* Aqui seria a área para o componente de Filtros que faremos depois */}
      {/* <Filtros /> */}

      {pets.length === 0 ? (
        <p>Nenhum pet disponível no momento. Volte mais tarde!</p>
      ) : (
        <div className="pets-grid">
          {/* Mapeia o array de pets para renderizar um PetCard para cada um */}
          {pets.map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;