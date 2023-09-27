const express = require('express');
const mysql = require('mysql2');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jayjayojatinho',
  database: 'team_manager',
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Configuração do Body Parser para ler dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para a página de login (formulário)
app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html'); // Crie um arquivo HTML para o formulário de login
});


// Rota para autenticar o usuário
app.post('/auth', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Consulta SQL para verificar as credenciais do usuário
  const sql = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      res.status(500).send('Erro no servidor');
      return;
    }

    if (results.length > 0) {
      // Credenciais corretas, usuário autenticado
      res.send('Login bem-sucedido');
    } else {
      // Credenciais incorretas, login falhou
      res.send('Login falhou');
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});