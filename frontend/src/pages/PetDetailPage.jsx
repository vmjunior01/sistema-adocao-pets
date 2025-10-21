// frontend/src/pages/PetDetailPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import '../styles/PetDetail.css'; // Estilos para a página de detalhes

const API_URL = 'http://localhost:3000';

// Função utilitária para calcular a idade (aproximada) em anos
const calcularIdade = (dataNascimento) => {
    // [CÓDIGO DE CALCULAR IDADE (Já existe no PetCard.jsx, mas o repetimos aqui)]
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
    const { id } = useParams(); // Pega o ID da URL (ex: /pets/1)
    const navigate = useNavigate();
    
    const [pet, setPet] = useState(null);
    const [adotanteId, setAdotanteId] = useState('');
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    // 1. Busca os detalhes do Pet
    useEffect(() => {
        const fetchPet = async () => {
            try {
                // A rota GET /pets/:id não existe no seu server.js. Vamos buscá-lo na lista
                // Em um sistema real, essa rota seria implementada no Backend.
                // Aqui, vamos apenas buscar a lista e filtrar pelo ID (solução provisória)
                
                const response = await axios.get(`${API_URL}/pets?status=disponível&id=${id}`);
                const petEncontrado = response.data.find(p => p.id === parseInt(id));

                if (petEncontrado) {
                    setPet(petEncontrado);
                } else {
                    setStatusMessage('Pet não encontrado ou não está disponível para adoção.');
                }
            } catch (err) {
                console.error("Erro ao buscar pet:", err);
                setStatusMessage('Erro ao carregar os detalhes do Pet.');
            } finally {
                setLoading(false);
            }
        };

        fetchPet();
    }, [id]);

    // 2. Lógica para Adoção
    const handleAdocao = async (e) => {
        e.preventDefault();
        setStatusMessage('');
        setIsSuccess(false);

        if (!adotanteId) {
            setStatusMessage('Por favor, insira o ID do Adotante.');
            return;
        }

        try {
            // Chama a rota de adoção no Backend (POST /adocoes)
            await axios.post(`${API_URL}/adocoes`, {
                petId: pet.id,
                adotanteId: parseInt(adotanteId) // Converte para número
            });

            setStatusMessage(`Parabéns! ${pet.nome} foi adotado(a)! Redirecionando...`);
            setIsSuccess(true);

            // Redireciona para a lista após a adoção (o Pet deve sumir da lista)
            setTimeout(() => {
                navigate('/');
            }, 3000);

        } catch (error) {
            console.error('Erro na adoção:', error.response ? error.response.data : error);
            // Mensagens de erro do Backend (ex: Pet já adotado, Adotante não existe)
            const errorMsg = error.response?.data?.error || 'Erro: Verifique se o ID do Adotante é válido.';
            setStatusMessage(`Falha na Adoção: ${errorMsg}`);
            setIsSuccess(false);
        }
    };

    if (loading) return <h1>Carregando...</h1>;
    if (statusMessage && !pet) return <h1 style={{textAlign: 'center', marginTop: '50px'}}>{statusMessage}</h1>;
    if (!pet) return <h1 style={{textAlign: 'center', marginTop: '50px'}}>Pet indisponível.</h1>;

    const idade = calcularIdade(pet.dataNascimento);
    const idadeTexto = idade === 1 ? 'ano' : 'anos';
    const especieLowerCase = pet.especie ? pet.especie.toLowerCase() : '';
    const imageUrl = especieLowerCase.includes('cachorro') 
        ? `https://placedog.net/600/400?random=${pet.id}` 
        : `https://cataas.com/cat?width=600&height=400&v=${pet.id}`;

    return (
        <div className="detail-container">
            <h1 className="detail-name">{pet.nome}</h1>
            
            <div className="detail-content-wrapper">
                <div className="detail-image-box">
                    <img src={imageUrl} alt={`Foto do ${pet.nome}`} className="detail-image" />
                </div>
                
                <div className="detail-info-box">
                    <h2>Detalhes do Pet</h2>
                    <p><strong>Espécie:</strong> {pet.especie}</p>
                    <p><strong>Idade:</strong> {idade} {idadeTexto}</p>
                    <p><strong>Descrição:</strong> {pet.descricao}</p>
                    <p className="detail-status">Status: {pet.status === 'disponível' ? 'Pronto para Adoção' : 'Adotado'}</p>

                    <FormContainer title="Processo de Adoção">
                        <form onSubmit={handleAdocao}>
                            <p className="adoção-instrução">Para adotar, insira o ID de cadastro do Adotante:</p>
                            <div className="form-group">
                                <label htmlFor="adotanteId">ID do Adotante</label>
                                <input 
                                    type="number" 
                                    id="adotanteId" 
                                    name="adotanteId" 
                                    value={adotanteId} 
                                    onChange={(e) => setAdotanteId(e.target.value)} 
                                    required 
                                />
                            </div>

                            <button type="submit" className="form-button">CONFIRMAR ADOÇÃO</button>
                            
                            {statusMessage && (
                                <p className={isSuccess ? 'success-message' : 'error-message'}>
                                    {statusMessage}
                                </p>
                            )}
                        </form>
                    </FormContainer>
                </div>
            </div>
        </div>
    );
};

export default PetDetailPage;