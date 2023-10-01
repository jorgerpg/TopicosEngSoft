# TEAM MANAGER

## Equipe e corpo docente

Discentes (integrantes):

- Jorge Ricarte Passos Gonçalves - jorge.goncalves@aln.senaicimatec.edu.br
- Felipe Artur Macedo Lima - felipe.lima@aln.senaicimatec.edu.br
- Rafael Vieira Miguez - rafael.miguez@aln.senaicimatec.edu.br
- Marina Calheira de Oliveira - marina.oliveira@aln.senaicimatec.edu.br
- Breno Bogéa Alves Passos - breno.passos@aln.senaicimatec.edu.br

Docente:

- Sergio Martins Fernandes


## Como acessar

**Clonando o repositório:**<br/>
1. Clique no botão de cor verde escrito "Code"
2. Copie a URL fornecida na aba Local > HTTPS
3. Abra o terminal no diretório desejado e digite o comando: `git clone https://github.com/jorgerpg/TopicosEngSoft.git`

**Executando o projeto**<br/>
> Executando o Back-end

*Requisitos*: 
- Utilizar o nvm com o node versão 16!!!
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [MySQL](https://dev.mysql.com/downloads/installer/)

- [Nosso script MySQL](https://docs.google.com/document/d/1WbkUUopGC6hdc7APQQ4b5MDZ-2g07MCo8G4GKXQEDRg/edit?usp=sharing)

1. Caso não tenha o MySQL instalado, siga este [passo-a-passo para instalação](https://youtu.be/KYaZVqHHXpM).
2. Após instalado o MySQL, abra o MySQL Workbench.
3. Crie uma nova conexão (de preferência com o usuário `root`).
5. Rode o script do banco.
7. Deixe a conexão aberta e volte para o projeto que você clonou do Github.
8. Na pasta `server`, abra o arquivo `index.js`.
9. Neste arquivo, da linha 7 à linha 10, altere o que for necessário baseado nas configurações de sua conexão no MySQL Workbench.
10. Após as alterações, abra um terminal dentro do projeto e digite `cd server`
11. Execute o comando `node index.js`
12. Será aberta uma janela em seu navegador acessando o `localhost:3001`.
13. Faça um teste acrescentando um caminho a essa URL. Recomendamos: `localhost:3001/pessoas`.
14. Caso seja exibido um `json`, pode fechar apenas a janela, mas deixe o terminal aberto. Ele será importante para deixar o servidor funcionando.

> Executando o Front-End

*Requisitos*:
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

1. Abra um OUTRO terminal dentro do projeto (na raiz, **fora** da pasta **server**).
2. Digite `npm start` (caso não funcione de primeira rodar um `npm install react`)
3. Será aberta uma aba conectada ao `localhost:3000`.
4. Não é necessário fazer login. Clique em `Entrar`.
5. Telas conectadas ao banco de dados e funcionando: `Membros`, `Eventos` e `Reuniões`.


---

# Especificações técnicas

- Front-End: ReactJS - NPM.
- Back-End: ExpressJS - conexão direta com MySQL via `mysql2`
- Banco de Dados: MySQL - Team_Manager

`ReactJS`: Framework Front-End<br/>
`ExpressJS`: Framework Back-End Node responsável por fornecer recursos mínimos para implementação de servidor web.<br/>
`MySQL (mysql2)`: Banco de Dados relacional que interage com o ExpressJS para manipulação e integração de dados.

Tecnologia | Status 
------ | ------
ReactJS | ✔ 
ExpressJS   | ✔ 
MySQL   | ✔

# Acessos

- Rotas para navegação entre telas: [Routes](src/Routes.js)
- Conexão com Banco de Dados (MySQL): [server](server/index.js)