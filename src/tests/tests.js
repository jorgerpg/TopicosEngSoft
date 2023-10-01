// No seu arquivo server/index.js ou equivalente

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do banco de dados
const dbConfig = {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "jayjayojatinho",
    database: "team_manager"
};

// Rota para criar um novo membro
app.post('/cadastrar-membro', async (req, res) => {
  try {
    // Conecte-se ao banco de dados
    const connection = await mysql.createConnection(dbConfig);

    const { nome, email, senha, cpf, telefone } = req.body;

    // Execute a inserção do membro na tabela de membros
    const [result] = await connection.execute(
      'INSERT INTO membros (nome, email, senha, cpf, telefone) VALUES (?, ?, ?, ?, ?)',
      [nome, email, senha, cpf, telefone]
    );

    connection.end();

    res.json({ success: true, message: 'Membro cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Erro ao cadastrar o membro' });
  }
});

// Resto das configurações e rotas...

app.listen(3001, () => {
  console.log('Servidor iniciado na porta 3001');
});
