// src/components/AdopterCard.jsx (SEM O BOTÃO DE AÇÃO)

import React from 'react';
// 🚨 REMOVIDO: { Link }
import '../styles/AdopterCard.css'; 

// URL base para avatares aleatórios (Usando a semente do nome)
const DICEBEAR_API = (name) => {
    const seed = encodeURIComponent(name.trim().toLowerCase());
    return `https://api.dicebear.com/8.x/pixel-art/svg?seed=${seed}`;
};


const AdopterCard = ({ adopter }) => {
    
    const imageUrl = adopter.nomeCompleto 
        ? DICEBEAR_API(adopter.nomeCompleto)
        : DICEBEAR_API('Adotante'); 

    // O endereço agora virá do backend, mas mantemos o fallback
    const endereco = adopter.endereco || 'Endereço não cadastrado';


    return (
        <div className='adopter-card'>
            <div className='adopter-card-image-container'>
                <img
                    src={imageUrl}
                    alt={`Avatar de ${adopter.nomeCompleto}`}
                    className='adopter-card-image'
                />
            </div>

            <div className='adopter-card-content'>
                {/* ID e Nome Completo */}
                <h3 className='adopter-card-name'>{adopter.nomeCompleto}</h3>
                <p className='adopter-card-detail id-label'>
                    <span className='detail-label'>ID:</span> {adopter.id}
                </p>

                {/* Email */}
                <p className='adopter-card-detail'>
                    <span className='detail-label'>Email:</span> {adopter.email}
                </p>

                {/* Telefone */}
                <p className='adopter-card-detail'>
                    <span className='detail-label'>Tel:</span> {adopter.telefone || 'Não informado'}
                </p>

                {/* Endereço - Agora deve aparecer! */}
                <p className='adopter-card-description'>
                    <span className='detail-label'>Endereço:</span> {endereco}
                </p>

                {/* 🚨 REMOVIDO: O bloco <Link> do botão de Ver/Editar Adotante */}
            </div>
        </div>
    );
};

export default AdopterCard;