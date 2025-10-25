# Sistema de Adoção de Pets

## Propósito do Projeto

Este projeto faz parte do trabalho em equipe do curso de DESENVOLVIMENTO FULL STACK BÁSICO - PROJETO DFS-2025.3 e consiste no desenvolvimento de uma aplicação web completa (Full Stack) para modernizar e otimizar o processo de adoção de animais em um abrigo de pets.

O objetivo principal é substituir o controle manual, que causa atrasos e desorganização, por uma plataforma digital eficiente. A aplicação permite o cadastro e visualização de pets, o registro de adotantes e a formalização das adoções, tornando o processo mais eficiente e acessível.

---

## Stack Tecnológica

O sistema foi desenvolvido utilizando as seguintes tecnologias:

### Backend

**Linguagem:** JavaScript
**Ambiente de Execução:** Node.js
**Framework:** Express
**ORM:** Prisma
**Banco de Dados:** PostgreSQL ou MySQL (banco relacional)

### Frontend

**Linguagens:** JavaScript e CSS
**Biblioteca:** ReactJS
**Gerenciamento de Estado:** React Context API
**Requisições HTTP:** Axios (para comunicação com a API)
**Estilização e UX:** CSS e React Icons (para ícones vetoriais)

---

## Contribuição da Equipe (Modelo de Colaboração)

Este projeto foi desenvolvido com uma divisão de tarefas clara, garantindo a cobertura total dos requisitos de Backend e Frontend.

| Membro                   | Módulos e Contribuição Principal                                                                                                                                                                                                  | Status da Implementação (Backend) |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| **Vicente Matos Jr.**    | **Estrutura e Gestão de Pets:** Setup inicial do Node.js/Express/Prisma. Implementação completa do CRUD (Create, Read, Update, Delete) da entidade `Pet`, incluindo rotas de visualização e filtros básicos.                      | **CONCLUÍDO**                     |
| **Mariana Santos Rocha** | **Gestão de Adotantes e Filtros:** Implementação completa do CRUD (Create, Read, Update, Delete) da entidade `Adotante`. Implementação da lógica de filtros dinâmicos na rota `GET /pets`.                                        | **CONCLUÍDO**                     |
| **Manuel Cunjuca Jamba** | **Processo de Adoção e Lógica:** Criação do modelo `Adocao` no Prisma. [cite_start]Implementação da rota `POST /adocoes` e da **lógica de negócios** crucial de atualização automática do status do pet para "adotado". | **CONCLUÍDO**                     |

---

| Membro                   | Módulos e Contribuição Principal (Frontend)                                                                                                                                                                                                                      | Status da Implementação (Frontend) |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| **Vicente Matos Jr.**    | **Estrutura e Gestão de Rotas:** Setup inicial e organização de pastas do projeto React (componentes, _hooks_, _pages_). Implementação da estrutura de navegação.                                                                                                | **CONCLUÍDO**                      |
| **Mariana Santos Rocha** | **Layout e Design System:** Criação da **Landing Page** responsiva. Definição do design system _(paleta de cores, tipografia, espaçamento e resposividade de todas as paginas)_. Desenvolvimento dos componentes de layout globais _(Header, Footer e Sidebar)_. | **CONCLUÍDO**                      |
| **Manuel Cunjuca Jamba** | **Componentes de Formulário:** Implementação dos componentes de formulário reutilizáveis (input, select, botão) e validação básica do formulário de adoção. Filtro de listagem de Pets.                                                                          | **CONCLUÍDO**                      |

## Funcionalidades Implementadas (Backend)

O backend do sistema é responsável por:

- **Pets:** Cadastro, visualização detalhada, exclusão e atualização de pets (CRUD).
- **Adotantes:** Cadastro, visualização detalhada, exclusão e atualização de adotantes (CRUD).
- **Adoções:** Registro do processo de adoção, com referência ao pet e adotante, e atualização automática do status do pet.
- **Funcionários:** Registro de funcionários com possibilidade de visualização, edição e exclusão dentro do sistema.
- **Consultas:** Visualização de pets disponíveis e implementação de filtros por espécie e status.

---

## Como Executar o Sistema

Siga estas instruções para clonar o projeto e executá-lo em sua máquina local.

### Pré-requisitos

Certifique-se de ter instalado:

1.  **Node.js (versão 18.18 ou superior)**
2.  **npm (gerenciador de pacotes do Node)**
3.  **PostgreSQL ou MySQL** (servidor de banco de dados rodando)

### 1. Backend - Configuração Inicial e Backend (API)

#### a) Clonar o Repositório
```
git clone URL_DO_SEU_REPOSITORIO
cd sistema-adocao-pets/
```

#### b) Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e insira a string de conexão com seu banco de dados. Exemplo para PostgreSQL:
```
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/adocao_pets?schema=public"
```
#### c) Instalar Dependências e Migrar o Banco
```
cd backend/
```
Instale os pacotes Node.js e aplique os modelos de dados (tabelas) no seu banco:

```
npm install
npx prisma migrate dev --name inicial_models
```

#### d) Iniciar o Servidor (Com Recarregamento Automático)

O servidor está configurado com Nodemon para recarregar automaticamente.
```
npm run dev
```
O Backend estará rodando em http://localhost:3000.

## Frontend (Aplicação Web em React)

### Configurações iniciais

Acesse a pasta Frontend e Instale os pacotes Node.js

```
cd frontend/
npm install
npm install axios
npm run dev
```

O Frontend estará rodando em http://localhost:5173

## Funcionalidades Implementadas (Frontend)

1. **Landig page.**
2. **Layout claro e intuitivo**
3. **Login Unificado:** (Tela de Login) Verifique com chave para usuário e funcionário. Com acesso a áreas distindas dentro do sistema.
4. **Área Protegida:** Após o login, o usuário é redirecionado para `/app/pets`. **Header** muda para o menu de gestão, de acordo com o tipo de acesso.
5. **CRUD de Pets:** Com acesso de funcionário, use a área de cadastro para **criar** novos pets e na tela de detalhes de cada pet use os botões **editar** e **deletar**.
6. **Filtros:** Na listagem de pets, use o filtro **Status** para alternar e exibir pets **Disponíveis** e **"Adotados"**.
7. **Cadastro de Funcionários:** Acessar o formulário de cadastro de novos funcionários.
8. **Cadastro de Adotantes/Usuários**
9. **Modo dark:** De acordo com o sistema/navegador.
10. **Telas responsivas:** `@media` com ajustes para telas menores.
11. **Alertas e Loadings em todas as telas:** Mensagens de alerta e sucesso para as ações que forem necessárias.
12. **Uso do route:** para mapeamento de rotas e permissões.

## Melhorias e possíveis implementações (futuras)

- **Permissões:** aumentar as permissõos dos funcionárias para edição na lista dos adotantes.
- **Botões de Salvar/Curtir/Favoritar:** Para que seja possível o adotante visualizar separadamente os seus preferidos.
- **Botão dark/Light** (independente do sistema).
- **Melhorias na lista/cards de adotantes**: mais informações sobre cadastro, mostrando qual pet cada adotante adotou.
- **Botão hamburguer:** Melhorar a responsividade do header.
- **Area adicionar foto ao cadastro** de pets e adotantes.
- **Header mais amigável** e com identificação de quem esta logado Ex.: "Ola, Rafael".
- **Mural de fotos:** Pagina com fotos dos pets adotados e seus adotantes.
- **Adicionar campo "sexo" no card/formulario do Pet**
- **Deploy**

## Capturas de tela

___

*Projeto desenvolvido por Squad 7, para o curso de Desenvolvimento FullStack da Atlântico Avanti.*

*Equipe: [Vicente Matos Jr.](https://github.com/vmjunior01), [Mariana Santos Rocha](http://github.com/mariana4ads) e [Manuel Cunjuca Jamba](https://github.com/manueljamba).*
