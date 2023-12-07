const express = require("express");

const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "jayjayojatinho",
    database: "team_manager"
});


const app = express();

app.use(cors());
app.use(express.json());

app.get("/pessoas", (req, res) => {
    let query = "SELECT * FROM PESSOA";

    db.query(query, (error, result) => {
        res.json(result);
    });

});

app.get("/pessoa/:id", (req, res) => {
    let query = `SELECT * FROM PESSOA WHERE PESSOA_ID = ${req.params.id}`;
    
    db.query(query, (error, result) => {
        res.json(result);
    });
});

app.get("/pessoa-last-registered", (req, res) => {
    let query = "SELECT * FROM PESSOA ORDER BY PESSOA_ID DESC LIMIT 1";

    
    db.query(query, (error, result) => {
        res.json(result);
    });
});

app.get("/auth/:email", (req, res) => {
    let query = `SELECT NOME, EMAIL, SENHA FROM PESSOA WHERE EMAIL = '${req.params.email.toLocaleLowerCase()}'`;
    db.query(query, (error, result) => {
        res.json(result);
    });

});

app.get("/eventos", (req, res) => {
    let query = "SELECT * FROM EVENTO";

    db.query(query, (error, result) => {
        res.json(result);
    });

});

app.get("/evento/:id", (req, res) => {
    let query = `SELECT * FROM EVENTO WHERE EVENTO_ID = ${req.params.id}`;

    db.query(query, (error, result) => {
        res.json(result);
    });
});

app.get("/reunioes", (req, res) => {
    let query = "SELECT * FROM REUNIAO";

    db.query(query, (error, result) => {
        res.json(result);
    });

});

app.get("/reuniao/:id", (req, res) => {
    let query = `SELECT * FROM REUNIAO WHERE REUNIAO_ID = ${req.params.id}`;

    db.query(query, (error, result) => {
        res.json(result);
    });

});

app.get("/projetos", (req, res) => {
    let query = "SELECT * FROM PROJETO";

    db.query(query, (error, result) => {
        res.json(result);
    });

});

app.get("/projeto/:id", (req, res) => {
    let query = `SELECT * FROM PROJETO WHERE PROJETO_ID = ${req.params.id}`;

    db.query(query, (error, result) => {
        res.json(result);
    });

});

app.get("/cargo/:pessoaID", (req, res) => {
    let query = `SELECT NOME_CARGO FROM CARGO c INNER JOIN PESSOA P ON c.PESSOA_ID = p.PESSOA_ID WHERE p.PESSOA_ID = ${req.params.pessoaID}`;

    db.query(query, (error, result) => {
        res.json(result);
    });

});

app.put("/atualiza-cargo/:pessoaID/:cargo", (req, res) => {
    let query = `UPDATE CARGO SET NOME_CARGO = '${req.params.cargo}' WHERE PESSOA_ID = ${req.params.pessoaID}`;

    db.query(query, (error, result) => {
        res.json(result);
    });

});

app.get("/responsavel-reuniao/:pessoaID", (req, res) => {
    let query = `SELECT NOME FROM PESSOA P INNER JOIN REUNIAO R ON P.PESSOA_ID = R.RESPONSAVEL_ID WHERE p.PESSOA_ID = ${req.params.pessoaID}`;

    db.query(query, (error, result) => {
        res.json(result);
    });
});

app.get("/responsavel-evento/:pessoaID", (req, res) => {
    let query = `SELECT NOME FROM PESSOA P INNER JOIN EVENTO E ON P.PESSOA_ID = E.RESPONSAVEL_ID WHERE p.PESSOA_ID = ${req.params.pessoaID}`;

    db.query(query, (error, result) => {
        res.json(result);
    });
});

app.get("/responsavel-projeto/:pessoaID", (req, res) => {
    let query = `SELECT NOME FROM PESSOA P INNER JOIN PROJETO PR ON P.PESSOA_ID = PR.RESPONSAVEL_ID WHERE p.PESSOA_ID = ${req.params.pessoaID}`;

    db.query(query, (error, result) => {
        res.json(result);
    });
});

app.get("/membros-do-projeto/:idProjeto", (req, res) => {
    const { idProjeto } = req.params;
    let query = `
      SELECT P.NOME
      FROM PESSOA P
      INNER JOIN PROJETO_PESSOA PP ON P.PESSOA_ID = PP.PESSOA_ID
      WHERE PP.PROJETO_ID = ${idProjeto};
    `;

    db.query(query, (error, result) => {
        res.json(result);
    });
});

//#//#//#//#//#//#//#//#//# [ CADASTRO DE USUÁRIO ] //#//#//#//#//#//#//#//#//#

app.post("/cadastrar-membro/:nome/:email/:senha/:cpf/:telefone", (req, res) => {
    let query = `INSERT INTO PESSOA VALUES (NULL, NULL, '${req.params.nome}', '2023-09-20', '${req.params.email}', '${req.params.cpf} ', '${req.params.senha}', '${req.params.telefone}', 'ATIVO');`;

    db.query(query, (error, result) => {
        if (error) return res.json({error: error});
        return res.json(result);
    });
})

//#//#//#//#//#//#//#//#//# [ CADASTRO DE CARGO ] //#//#//#//#//#//#//#//#//#

app.post("/cadastrar-membro-cargo/:id/:cargo", (req, res) => {
    let query = `INSERT INTO CARGO VALUES ('${req.params.id}', '${req.params.id}', '${req.params.cargo}');`;

    db.query(query, (error, result) => {
        if (error) return res.json({error: error});
        return res.json(result);
    });
})

//#//#//#//#//#//#//#//#//# [ CADASTRO DE EVENTO ] //#//#//#//#//#//#//#//#//#

app.post("/adicionar-evento/:descricao/:responsavelID/:palestrante/:localizacao/:status", (req, res) => {
    let query = `INSERT INTO EVENTO VALUES (NULL, ${req.params.responsavelID}, '${req.params.descricao}', '2022-09-20', '${req.params.localizacao}', '${req.params.palestrante}', '${req.params.status}');`;

    db.query(query, (error, result) => {
        if (error) return res.json({error: error});
        return res.json(result);
    });
})

//#//#//#//#//#//#//#//#//# [ CADASTRO DE REUNIÃO ] //#//#//#//#//#//#//#//#//#

app.post("/adicionar-reuniao/:descricao/:localizacao/:datahora/:responsavel/:ata", (req, res) => {
    let query = `INSERT INTO REUNIAO VALUES (null, ${req.params.responsavel}, '${req.params.descricao}', '${req.params.datahora}', '${req.params.localizacao}', '${req.params.ata}')`;

    db.query(query, (error, result) => {
        if (error) return res.json({error: error});
        return res.json(result);
    });
})

//#//#//#//#//#//#//#//#//# [ CADASTRO DE PROJETO ] //#//#//#//#//#//#//#//#//#

app.post("/adicionar-projeto/:descricao/:responsavelID/:status", (req, res) => {
    let query = `INSERT INTO PROJETO VALUES (null, ${req.params.responsavelID} , '${req.params.descricao}', '${req.params.status}')`;

    db.query(query, (error, result) => {
        if (error) return res.json({error: error});
        return res.json(result);
    });
})

//#//#//#//#//#//#//#//#//#//#//#//#//#//#//#//#//#//#//#//#//#//#//#//#//#//#

//#//#//#//#//#//#//#//#//# [ DELETAR MEMBRO ] //#//#//#//#//#//#//#//#//#

app.delete("/deletar-membro/:id", (req, res) => {
    let query = `DELETE FROM PESSOA WHERE PESSOA_ID = ${req.params.id}`;

    db.query(query, (error, result) => {
        if (error) return res.json({error: error});
        return res.json(result);
    });
})

//#//#//#//#//#//#//#//#//# [ DELETAR EVENTO ] //#//#//#//#//#//#//#//#//#

app.delete("/deletar-evento/:id", (req, res) => {
    let query = `DELETE FROM EVENTO WHERE EVENTO_ID = ${req.params.id}`;

    db.query(query, (error, result) => {
        if (error) return res.json({error: error});
        return res.json(result);
    });
})

//#//#//#//#//#//#//#//#//# [ DELETAR REUNIAO ] //#//#//#//#//#//#//#//#//#

app.delete("/deletar-reuniao/:id", (req, res) => {
    let query = `DELETE FROM REUNIAO WHERE REUNIAO_ID = ${req.params.id}`;

    db.query(query, (error, result) => {
        if (error) return res.json({error: error});
        return res.json(result);
    });
})

//#//#//#//#//#//#//#//#//# [ DELETAR PROJETO ] //#//#//#//#//#//#//#//#//#

app.delete("/deletar-projeto/:id", (req, res) => {
    let query = `DELETE FROM PROJETO WHERE PROJETO_ID = ${req.params.id}`;

    db.query(query, (error, result) => {
        if (error) return res.json({error: error});
        return res.json(result);
    });
})

//#//#//#//#//#//#//#//#//# [ DELETAR MEMBRO DO PROJETO ATUAL ] //#//#//#//#//#//#//#//#//#

app.delete("/deletar-membro-projeto/:pessoaID/:projetoID", (req, res) => {
    let query = `DELETE FROM PROJETO_PESSOA WHERE PROJETO_ID = ${req.params.projetoID} AND PESSOA_ID = ${req.params.pessoaID}`;

    db.query(query, (error, result) => {
        if (error) return res.json({error: error});
        return res.json(result);
    });
})

const _serverPort = 3001;

app.listen(_serverPort, () => {
    console.log(`RUNNING SERVER AT PORT: ${_serverPort}`);
})