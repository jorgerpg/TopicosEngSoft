const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// DB Config
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jayjayojatinho',
  database: 'team_manager',
});

// Conecting with DB
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL como ID ' + db.threadId);
});

// Define routes and logics
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor está rodando na porta ${PORT}`);
});
