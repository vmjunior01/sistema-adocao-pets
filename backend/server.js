import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.post('/auth/login', async (req, res) => {
  const {email, senha, loginType} = req.body;
  const emailLimpo = email ? email.trim() : null;
  const senhaLimpa = senha ? senha.trim() : null;

  try {
    let usuario = null;
    let tabelaPrisma;

    if (loginType === 'funcionario') {
      tabelaPrisma = prisma.usuario;
    } else if (loginType === 'adotante') {
      tabelaPrisma = prisma.adotante;
    } else {
      return res
        .status(400)
        .json({ error: 'Tipo de login inválido ou não especificado, verifique seus dados.' });
    }

    usuario = await tabelaPrisma.findUnique({
      where: { email: emailLimpo },
      select: {
        id: true,
        nomeCompleto: true,
        email: true,
        role: true,
        senhaHash: true,
      },
    });

    if (!usuario) {
      return res.status(401).json({
        error: 'E-mail ou senha incorretos. Verifique suas credenciais.',
      });
    }

    if (usuario.senhaHash?.trim() !== senhaLimpa) {
      return res.status(401).json({
        error: 'E-mail ou senha incorretos. Verifique suas credenciais.',
      });
    }

    res.json({
      token: 'valid-test-token',
      user: {
        id: usuario.id,
        nome: usuario.nomeCompleto || usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    });
  } catch (error) {
    console.error('ERRO CRÍTICO NA API (ROTA LOGIN):', error);
    res.status(500).json({
      error:
        'Erro interno no servidor de autenticação. Verifique o console do backend.',
    });
  }
});

app.get('/', (req, res) => {
  res.send('API de Adoção de Pets está rodando!');
});

app.post('/pets', async (req, res) => {
  try {
    const { nome, especie, dataNascimento, descricao } = req.body;
    const dataNascimentoFormatada = new Date(dataNascimento).toISOString();

    const novoPet = await prisma.pet.create({
      data: {
        nome,
        especie,
        dataNascimento: dataNascimentoFormatada,
        descricao,
      },
    });

    res.status(201).json(novoPet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível cadastrar o Pet.' });
  }
});

app.get('/pets', async (req, res) => {
  try {
    const { especie, status } = req.query;

    let whereClause = {};
    if (status && status.toLowerCase() !== 'todos') {
      whereClause.status = status;
    } else if (!status) {
      whereClause.status = 'disponível';
    }

    if (especie) {
      whereClause.especie = especie;
    }
    const pets = await prisma.pet.findMany({
      where: whereClause,
      select: {
        id: true,
        nome: true,
        especie: true,
        dataNascimento: true,
        descricao: true,
        status: true,
        adocao: {
          select: {
            adotante: {
              select: {
                id: true,
                nomeCompleto: true,
              },
            },
          },
        },
      },
    });

    res.json(pets);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Não foi possível listar os Pets com filtros.' });
  }
});

app.get('/pets/:id', async (req, res) => {
  try {
    const petId = parseInt(req.params.id);

    const pet = await prisma.pet.findUnique({
      where: { id: petId },
      include: {
        adocao: {
          select: {
            id: true,
            adotante: {
              select: {
                id: true,
                nomeCompleto: true,
              },
            },
          },
        },
      },
    });

    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado.' });
    }

    res.json(pet);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'Não foi possível buscar os detalhes do Pet.' });
  }
});


app.delete('/pets/:id', async (req, res) => {
  try {
    const petId = parseInt(req.params.id);

    const petExistente = await prisma.pet.findUnique({
      where: { id: petId },
    });

    if (!petExistente) {
      return res.status(404).json({ error: 'Pet não encontrado.' });
    }

    await prisma.pet.delete({
      where: { id: petId },
    });

    res.json({ message: `Pet ${petExistente.nome} excluído com sucesso.` });
  } catch (error) {
    console.error('Erro ao excluir pet:', error);
    res.status(500).json({ error: 'Erro ao excluir o pet.' });
  }
});


app.post('/adotantes', async (req, res) => {
  try {
    const { nomeCompleto, email, telefone, endereco, senhaHash } = req.body;

    const novoAdotante = await prisma.adotante.create({
      data: {
        nomeCompleto,
        email,
        telefone,
        endereco,
        senhaHash,
        role: 'Adotante',
      },
    });
    res.status(201).json(novoAdotante);
  } catch (error) {
    if (error.code === 'P2002') {
      return res
        .status(409)
        .json({ error: 'O e-mail informado já está cadastrado.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Não foi possível cadastrar o Adotante.' });
  }
});

app.get('/adotantes', async (req, res) => {
  try {
    const adotantes = await prisma.adotante.findMany({
      select: {
        id: true,
        nomeCompleto: true,
        email: true,
        telefone: true,
        endereco: true,
      },
    });

    res.json(adotantes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Não foi possível listar os Adotantes.' });
  }
});

app.post('/adocoes', async (req, res) => {
  try {
    const { petId, adotanteId } = req.body;

    const pet = await prisma.pet.findUnique({ where: { id: petId } });
    const adotante = await prisma.adotante.findUnique({
      where: { id: adotanteId },
    });

    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado.' });
    }
    if (!adotante) {
      return res.status(404).json({ error: 'Adotante não encontrado.' });
    }

    if (pet.status === 'adotado') {
      return res.status(409).json({ error: 'Este Pet já foi adotado.' });
    }

    const novaAdocao = await prisma.adocao.create({
      data: {
        petId: pet.id,
        adotanteId: adotante.id,
      },
      include: {
        pet: true,
        adotante: true,
      },
    });

    await prisma.pet.update({
      where: { id: pet.id },
      data: { status: 'adotado' },
    });

    res.status(201).json({
      mensagem: 'Adoção registrada com sucesso!',
      adocao: novaAdocao,
    });
  } catch (error) {
    console.error(error);
    if (error.code === 'P2002') {
      return res.status(409).json({
        error:
          'Erro de unicidade. Verifique se o Pet já tem um registro de adoção.',
      });
    }
    res.status(500).json({ error: 'Erro ao processar a adoção.' });
  }
});

app.put('/pets/:id', async (req, res) => {
  try {
    const petId = parseInt(req.params.id);
    const { nome, especie, dataNascimento, descricao, status } = req.body;

    const petAtualizado = await prisma.pet.update({
      where: { id: petId },
      data: {
        nome,
        especie,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined,
        descricao,
        status,
      },
    });

    res.json(petAtualizado);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Pet não encontrado.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Não foi possível atualizar o Pet.' });
  }
});

app.delete('/pets/:id', async (req, res) => {
  try {
    const petId = parseInt(req.params.id);

    await prisma.pet.delete({
      where: { id: petId },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Pet não encontrado.' });
    }
    console.error(error);
    res.status(500).json({ error: 'Não foi possível deletar o Pet.' });
  }
});

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
    if (error.code === 'P2002') {
      return res.status(409).json({
        error: 'O e-mail informado já está sendo usado por outro adotante.',
      });
    }
    console.error(error);
    res.status(500).json({ error: 'Não foi possível atualizar o Adotante.' });
  }
});

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

app.post('/funcionarios', async (req, res) => {
  try {
    const { nomeCompleto, email, senhaHash } = req.body;

    const novoFuncionario = await prisma.usuario.create({
      data: {
        nomeCompleto,
        email,
        senhaHash,
        role: 'Funcionario',
      },
    });

    res.status(201).json(novoFuncionario);
  } catch (error) {
    if (error.code === 'P2002') {
      return res
        .status(409)
        .json({ error: 'O e-mail informado já está cadastrado.' });
    }
    console.error(error);
    res
      .status(500)
      .json({ error: 'Não foi possível cadastrar o Funcionário.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
