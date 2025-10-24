import React from 'react';
import '../styles/AdopterCard.css'; 

const AdopterCard = ({ adopter }) => {
    
    const endereco = adopter.endereco || 'Endereço não cadastrado';

    return (
        <div className='adopter-card no-image'>
            
            <div className='adopter-card-content'>
                <h3 className='adopter-card-name'>{adopter.nomeCompleto}</h3>
                <p className='adopter-card-detail id-label'>
                    <span className='detail-label'>ID:</span> {adopter.id}
                </p>

                <p className='adopter-card-detail'>
                    <span className='detail-label'>Email:</span> {adopter.email}
                </p>

                <p className='adopter-card-detail'>
                    <span className='detail-label'>Tel:</span> {adopter.telefone || 'Não informado'}
                </p>

                <p className='adopter-card-description'>
                    <span className='detail-label'>Endereço:</span> {endereco}
                </p>
            </div>
        </div>
    );
};

export default AdopterCard;