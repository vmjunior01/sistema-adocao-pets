// server.js

// 1. Importa Express e o Prisma Client
import express from 'express';
import { PrismaClient } from '@prisma/client';

// 2. Inicializa o Express e o Prisma
const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// 3. Middlewares (para o Express entender JSON)
app.use(express.json());

// 4. Sua primeira rota de teste
app.get('/', (req, res) => {
  res.send('API de Adoção de Pets está rodando!');
});


// Rota para cadastrar um novo Pet (Create)
app.post('/pets', async (req, res) => {
  try {
    const { nome, especie, dataNascimento, descricao } = req.body;

    const novoPet = await prisma.pet.create({
      data: {
        nome,
        especie,
        dataNascimento: new Date(dataNascimento), // Converte a string para objeto Date
        descricao,
        // Status é 'disponível' por padrão (definido no schema.prisma)
      },
    });
    // Retorna o Pet criado com status 201 (Created)
    res.status(201).json(novoPet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível cadastrar o Pet.' });
  }
});

// Rota para listar Pets, agora com filtros (Read Avançado)
app.get('/pets', async (req, res) => {
  try {
    // 1. Recebe os filtros da URL
    const { especie, status } = req.query;

    // 2. Constrói o objeto 'where' para o Prisma
    let whereClause = {
      // Começamos com o status 'disponível' por padrão (Requisito)
      status: 'disponível' 
    };
    
    // Se um status diferente for passado na query, usamos ele.
    if (status) {
      whereClause.status = status;
    }

    // Se uma espécie for passada na query, adicionamos a restrição.
    if (especie) {
      // Usamos 'contains' para busca flexível, mas para este caso 'equals' é mais seguro.
      whereClause.especie = especie;
    }
    
    // *Filtro de Idade (idade é calculada a partir de dataNascimento)*
    // A lógica de filtragem por 'idade' é mais complexa e é melhor feita no Frontend
    // ou com cálculos avançados de SQL. Por enquanto, focamos em Espécie e Status.
    
    const pets = await prisma.pet.findMany({
      where: whereClause, // Aplica o filtro dinâmico
      select: {
        id: true,
        nome: true,
        especie: true,
        dataNascimento: true,
        descricao: true,
        status: true,
      }
    });

    res.json(pets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível listar os Pets com filtros.' });
  }
});

// Rota para cadastrar um novo Adotante (Create)
app.post('/adotantes', async (req, res) => {
  try {
    const { nomeCompleto, email, telefone, endereco } = req.body;

    const novoAdotante = await prisma.adotante.create({
      data: {
        nomeCompleto,
        email,
        telefone,
        endereco,
      },
    });
    // Retorna o Adotante criado com status 201
    res.status(201).json(novoAdotante);
  } catch (error) {
    // Se o email já existir (porque definimos como @unique no schema), o Prisma lançará um erro
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'O e-mail informado já está cadastrado.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Não foi possível cadastrar o Adotante.' });
  }
});

// Rota para listar todos os Adotantes (Read)
app.get('/adotantes', async (req, res) => {
  try {
    const adotantes = await prisma.adotante.findMany({
      // Listamos apenas os campos essenciais
      select: {
        id: true,
        nomeCompleto: true,
        email: true,
        telefone: true,
      }
    });

    res.json(adotantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível listar os Adotantes.' });
  }
});

// Rota para registrar uma nova Adoção
app.post('/adocoes', async (req, res) => {
  try {
    const { petId, adotanteId } = req.body;

    // 1. Verificar se o Pet e o Adotante existem
    const pet = await prisma.pet.findUnique({ where: { id: petId } });
    const adotante = await prisma.adotante.findUnique({ where: { id: adotanteId } });

    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado.' });
    }
    if (!adotante) {
      return res.status(404).json({ error: 'Adotante não encontrado.' });
    }

    // 2. Verificar se o Pet já está adotado
    if (pet.status === 'adotado') {
      return res.status(409).json({ error: 'Este Pet já foi adotado.' });
    }

    // 3. Registrar a Adoção (Create)
    const novaAdocao = await prisma.adocao.create({
      data: {
        petId: pet.id,
        adotanteId: adotante.id,
        // dataAdocao é preenchida automaticamente com 'now()'
      },
      // Incluímos o Pet e o Adotante na resposta para confirmar
      include: {
        pet: true,
        adotante: true,
      }
    });

    // 4. Atualizar o status do Pet para "adotado" (Update)
    await prisma.pet.update({
      where: { id: pet.id },
      data: { status: 'adotado' },
    });

    // Retorna a nova Adoção registrada
    res.status(201).json({ 
      mensagem: 'Adoção registrada com sucesso!',
      adocao: novaAdocao
    });
  } catch (error) {
    console.error(error);
    // Este erro P2002 pode ocorrer se o PetId já tiver sido usado em outra adoção
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Erro de unicidade. Verifique se o Pet já tem um registro de adoção.' });
    }
    res.status(500).json({ error: 'Erro ao processar a adoção.' });
  }
});

// Rota para atualizar informações de um Pet (Update)
app.put('/pets/:id', async (req, res) => {
  try {
    const petId = parseInt(req.params.id); // Converte o ID da URL para número
    const { nome, especie, dataNascimento, descricao, status } = req.body;

    const petAtualizado = await prisma.pet.update({
      where: { id: petId },
      data: {
        nome,
        especie,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined, // Atualiza se o valor for fornecido
        descricao,
        status,
      },
    });

    res.json(petAtualizado);
  } catch (error) {
    // Erro P2025: Pet não encontrado com o ID fornecido
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Pet não encontrado.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Não foi possível atualizar o Pet.' });
  }
});

// Rota para deletar um Pet (Delete)
app.delete('/pets/:id', async (req, res) => {
  try {
    const petId = parseInt(req.params.id);

    // O Prisma deleta o registro
    await prisma.pet.delete({
      where: { id: petId },
    });

    // Retorna status 204 (No Content) para indicar sucesso sem corpo de resposta
    res.status(204).send(); 
  } catch (error) {
    // Erro P2025: Pet não encontrado com o ID fornecido
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Pet não encontrado.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Não foi possível deletar o Pet.' });
  }
});

// Rota para atualizar informações de um Adotante (Update)
app.put('/adotantes/:id', async (req, res) => {
  try {
    const adotanteId = parseInt(req.params.id);
    const { nomeCompleto, email, telefone, endereco } = req.body;

    const adotanteAtualizado = await prisma.adotante.update({
      where: { id: adotanteId },
      data: { nomeCompleto, email, telefone, endereco },
    });

    res.json(adotanteAtualizado);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Adotante não encontrado.' });
    }
    // Erro P2002: Email já existe (unique constraint)
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'O e-mail informado já está sendo usado por outro adotante.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Não foi possível atualizar o Adotante.' });
  }
});

// Rota para deletar um Adotante (Delete)
app.delete('/adotantes/:id', async (req, res) => {
  try {
    const adotanteId = parseInt(req.params.id);

    await prisma.adotante.delete({
      where: { id: adotanteId },
    });

    res.status(204).send(); 
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Adotante não encontrado.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Não foi possível deletar o Adotante.' });
  }
});


// 5. Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});