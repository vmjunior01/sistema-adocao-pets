// frontend/src/components/PetCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/PetCard.css'; // Vamos criar este arquivo de estilo

// Função utilitária para calcular a idade (aproximada) em anos
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
  // Simulação de URL de imagem baseada na espécie
  // Lógica para decidir qual placeholder de imagem usar
const especieLowerCase = pet.especie ? pet.especie.toLowerCase() : '';

let imageUrl;

if (especieLowerCase === 'cachorro') {
    // URL de cachorros (PlaceDog) - Estável
    imageUrl = `https://placedog.net/300/200?random=${pet.id}`; 
} else if (especieLowerCase === 'gato') {
    // NOVO: Usando cataas.com/cat/ com parâmetros de largura/altura
    // Este endpoint retorna uma imagem pura, sem o texto 'Miau'.
    imageUrl = `https://cataas.com/cat?width=300&height=200&v=${pet.id}`; 
} else {
    // Placeholder genérico para "outros"
    imageUrl = `https://via.placeholder.com/300x200?text=${pet.nome}`;
}
  const idade = calcularIdade(pet.dataNascimento);
  const idadeTexto = idade === 1 ? 'ano' : 'anos'; // Define 'ano' ou 'anos'

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
        
        {/* Link para a página de Detalhes e Adoção */}
        <Link to={`/pets/${pet.id}`} className="details-button">
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default PetCard;