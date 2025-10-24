import React from 'react';
import '../styles/LandingPage.css';

import HeroBg from '../assets/hero-bg.jpg';
import CheckIcon from '../assets/check.png';
import PetsGrid from '../assets/pets-grid.jpg';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className='adopet-landing'>
      <section
        className='hero-section'
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        <div className='hero-content'>
          <h1>Encontre o seu novo melhor amigo na Adopet.</h1>
          <p className='subtitle'>
            Conectamos corações em busca de um lar com patinhas ansiosas por
            carinho. Adotar é fácil, seguro e a maior prova de amor!
          </p>
          <a href='#como-funciona' className='cta-button primary'>
            Como faço para adotar?
          </a>
        </div>
      </section>

      <section className='benefits-section'>
        <h2 className='section-title'>Por que escolher a Adopet?</h2>
        <div className='benefits-grid'>
          <div className='benefit-card'>
            <img src={CheckIcon} alt='Ícone de Visto' className='check-icon' />
            <h3>Processo descomplicado</h3>
            <p>
              Suporte completo e plataforma simples para uma adoção tranquila,
              do início ao fim.
            </p>
          </div>
          <div className='benefit-card'>
            <img src={CheckIcon} alt='Ícone de Visto' className='check-icon' />
            <h3>Animais vacinados e castrados</h3>
            <p>
              Todos os nossos pets são entregues com a saúde em dia, prontos
              para a nova vida.
            </p>
          </div>
          <div className='benefit-card'>
            <img src={CheckIcon} alt='Ícone de Visto' className='check-icon' />
            <h3>Busca personalizada</h3>
            <p>
              Filtros avançados que ajudam você a encontrar o pet que realmente
              combina com seu estilo de vida.
            </p>
          </div>
        </div>
      </section>

      <section className='process-section' id='como-funciona'>
        <div className='process-image'>
          <img
            src={PetsGrid}
            alt='Vários animais fofos em adoção'
            className='process-image'
          />
        </div>
        <div className='process-steps'>
          <h2 className='section-title'>O caminho para um lar feliz:</h2>

          <div className='step'>
            <span className='step-number'>1</span>
            <span className='step-text'>
              <h3>Cadastre-se e pesquise</h3>
              <p>
                Use nossos filtros para visualizar cães e gatos disponíveis.
              </p>
            </span>
          </div>

          <div className='step'>
            <span className='step-number'>2</span>
            <span className='step-text'>
              <h3>Escolha seu pet</h3>
              <p>
                Leia a descrição de cada animal e escolha o que mais combina com
                a sua rotina diária.
              </p>
            </span>
          </div>

          <div className='step'>
            <span className='step-number'>3</span>
            <span className='step-text'>
              <h3>Conheça e Adote!</h3>
              <p>
                Agende uma visita ao abrigo e leve seu novo amigo para casa. É
                alegria garantida!
              </p>
            </span>
          </div>

          <Link to='/pets' className='cta-button secondary'>
            Ver animais disponíveis
          </Link>
        </div>
      </section>
    </div>
  );
}
