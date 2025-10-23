// src/pages/HomePublic.jsx (COMPLETO COM FILTROS)

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

import HeaderLanding from '../components/HeaderLanding';
import Footer from '../components/Footer';
import PetCard from '../components/PetCard';
import '../styles/HomePage.css';

const API_URL = 'http://localhost:3000';

const getAgeCategory = (dataNascimento) => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  let idadeAnos = hoje.getFullYear() - nascimento.getFullYear();

  const mes = hoje.getMonth() - nascimento.getMonth();
  if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
    idadeAnos--;
  }

  if (idadeAnos <= 1) return 'Filhote';
  if (idadeAnos <= 7) return 'Adulto';
  return 'Idoso';
};

export default function HomePublic() { 
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [speciesFilter, setSpeciesFilter] = useState('Todos');
  const [ageFilter, setAgeFilter] = useState('Todos');

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`${API_URL}/pets`);
        setPets(response.data);
      } catch (err) {
        setError('Não foi possível carregar a lista de pets.');
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  const filteredPets = useMemo(() => {
    let currentPets = pets;

    if (speciesFilter !== 'Todos') {
      currentPets = currentPets.filter(
        (pet) =>
          pet.especie &&
          pet.especie.toLowerCase() === speciesFilter.toLowerCase()
      );
    }

    if (ageFilter !== 'Todos') {
      currentPets = currentPets.filter(
        (pet) => getAgeCategory(pet.dataNascimento) === ageFilter
      );
    }

    return currentPets;
  }, [pets, speciesFilter, ageFilter]);

  const renderContent = () => {
    if (loading) {
      return <h1 className='loading'>Carregando Pets...</h1>;
    }

    if (error) {
      return <h1 style={{ color: 'red' }}>{error}</h1>;
    }

    return (
      <div className='homepage-container'>
        <h2>Pets Disponíveis para Adoção</h2>

        <div className='filters-container'>
          <label>Filtrar por Espécie:</label>
          <select
            value={speciesFilter}
            onChange={(e) => setSpeciesFilter(e.target.value)}
          >
            <option value='Todos'>Todas as Espécies</option>
            <option value='Cachorro'>Cachorros</option>
            <option value='Gato'>Gatos</option>
          </select>

          <label>Filtrar por Idade:</label>
          <select
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
          >
            <option value='Todos'>Todas as Idades</option>
            <option value='Filhote'>Filhote (até 1 ano)</option>
            <option value='Adulto'>Adulto (2 a 7 anos)</option>
            <option value='Idoso'>Idoso (8+ anos)</option>
          </select>
        </div>

        {filteredPets.length === 0 ? ( // ⬅️ Usando filteredPets
          <p>Nenhum pet encontrado com os filtros selecionados.</p>
        ) : (
          <div className='pets-grid'>
            {filteredPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <HeaderLanding />
      <main>{renderContent()}</main>
      <Footer />
    </>
  );
};

