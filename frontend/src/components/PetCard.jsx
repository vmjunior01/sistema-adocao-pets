// frontend/src/components/PetCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PetCard.css';

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

const PetCard = ({ pet }) => {
const especieLowerCase = pet.especie ? pet.especie.toLowerCase() : '';

let imageUrl;

if (especieLowerCase === 'cachorro') {
    imageUrl = `https://placedog.net/300/200?random=${pet.id}`; 
} else if (especieLowerCase === 'gato') {
    imageUrl = `https://cataas.com/cat?width=300&height=200&v=${pet.id}`; 
} else {
    imageUrl = `https://via.placeholder.com/300x200?text=${pet.nome}`;
}
  const idade = calcularIdade(pet.dataNascimento);
  const idadeTexto = idade === 1 ? 'ano' : 'anos'; 

  return (
    <div className="pet-card">
      <div className="pet-card-image-container">
        <img src={imageUrl} alt={`Foto do ${pet.nome}`} className="pet-card-image" />
      </div>

      <div className="pet-card-content">
        <h3 className="pet-card-name">{pet.nome}</h3>
        <p className="pet-card-detail">
            <span className="detail-label">Espécie:</span> {pet.especie}
        </p>
        <p className="pet-card-detail">
            <span className="detail-label">Idade:</span> {idade} {idadeTexto}
        </p>
        
        <Link to={`/pets/${pet.id}`} className="details-button">
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default PetCard;