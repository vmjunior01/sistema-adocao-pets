# Sistema de Adoção de Pets

## Propósito do Projeto

Este projeto faz parte do trabalho em equipe do curso de DESENVOLVIMENTO FULL STACK BÁSICO - PROJETO DFS-2025.3 e consiste no desenvolvimento de uma aplicação web completa (Full Stack) para modernizar e otimizar o processo de adoção de animais em um abrigo de pets.

O objetivo principal é substituir o controle manual, que causa atrasos e desorganização, por uma plataforma digital eficiente. A aplicação permite o cadastro e visualização de pets, o registro de adotantes e a formalização das adoções, tornando o processo mais eficiente e acessível.

---

## Stack Tecnológica

O sistema foi desenvolvido utilizando as seguintes tecnologias:

### Backend
* **Linguagem:** Node.js 
* **Framework:** Express
* **ORM:** Prisma 
* **Banco de Dados:** PostgreSQL / MySQL (Relacional)

### Frontend (Próxima Fase)
* **Biblioteca:** ReactJS

---

## Contribuição da Equipe (Modelo de Colaboração)

Este projeto foi desenvolvido com uma divisão de tarefas clara, garantindo a cobertura total dos requisitos de Backend e Frontend (a ser implementado).

| Membro | Módulos e Contribuição Principal | Status da Implementação (Backend) |
| :--- | :--- | :--- |
| **Vicente Matos Jr.** | **Estrutura e Gestão de Pets:** Setup inicial do Node.js/Express/Prisma. Implementação completa do CRUD (Create, Read, Update, Delete) da entidade `Pet`, incluindo rotas de visualização e filtros básicos. | **CONCLUÍDO** |
| **Mariana Santos Rocha** | **Gestão de Adotantes e Filtros:** Implementação completa do CRUD (Create, Read, Update, Delete) da entidade `Adotante`. Implementação da lógica de filtros dinâmicos na rota `GET /pets`. | **CONCLUÍDO** |
| **Manuel Cunjuca Jamba** | **Processo de Adoção e Lógica:** Criação do modelo `Adocao` no Prisma. [cite_start]Implementação da rota `POST /adocoes` e da **lógica de negócios** crucial de atualização automática do status do pet para "adotado"[cite: 30]. | **CONCLUÍDO** |

---

## Funcionalidades Implementadas (Backend)

O backend do sistema é responsável por:

* **Pets:** Cadastro, visualização detalhada, exclusão e atualização de pets (CRUD).
* **Adotantes:** Cadastro, visualização detalhada, exclusão e atualização de adotantes (CRUD).
* **Adoções:** Registro do processo de adoção, com referência ao pet e adotante, e atualização automática do status do pet.
* **Consultas:** Visualização de pets disponíveis e implementação de filtros por espécie e status.

---

## Como Executar o Sistema

Siga estas instruções para clonar o projeto e executá-lo em sua máquina local.

### Pré-requisitos
Certifique-se de ter instalado:
1.  **Node.js (versão 18.18 ou superior)**
2.  **npm (gerenciador de pacotes do Node)**
3.  **PostgreSQL ou MySQL** (servidor de banco de dados rodando)

### 1. Backend (API)

#### a) Clonar o Repositório

git clone URL_DO_SEU_REPOSITORIO
cd sistema-adocao-pets

#### b) Configurar Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e insira a string de conexão com seu banco de dados. Exemplo para PostgreSQL:

DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/adocao_pets?schema=public"

#### c) Instalar Dependências e Migrar o Banco
Instale os pacotes Node.js e aplique os modelos de dados (tabelas) no seu banco:

npm install
npx prisma migrate dev --name inicial_models

#### d) Iniciar o Servidor (Com Recarregamento Automático)
O servidor está configurado com Nodemon para recarregar automaticamente.

npm run dev

O Backend estará rodando em http://localhost:3000.

#### 2. Frontend (Aplicação Web)
(Instruções a serem detalhadas após a conclusão da fase Frontend em ReactJS)

