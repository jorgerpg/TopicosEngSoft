// Importações existentes
import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProjetoView.css";
// ... Importações existentes ...

export default function ProjetoView() {
    const { id } = useParams();
  
    const [projeto, setProjeto] = useState([]);
    const [responsavel, setResponsavel] = useState("");
    const [membrosDoProjeto, setMembrosDoProjeto] = useState([]);
  
    useEffect(() => {
      Axios.get(`http://localhost:3001/projeto/${id}`).then((response) => {
        setProjeto(response.data);
      });
    }, [id]);
  
    useEffect(() => {
      if (projeto && projeto.length > 0) {
        const responsavelId = projeto[0].RESPONSAVEL_ID;
        Axios.get(`http://localhost:3001/responsavel-projeto/${responsavelId}`).then((response) => {
          if (response.data && response.data.length > 0) {
            setResponsavel(response.data[0].NOME);
          }
        });
      }
    }, [projeto]);
  
    useEffect(() => {
      Axios.get(`http://localhost:3001/membros-do-projeto/${id}`).then((response) => {
        setMembrosDoProjeto(response.data);
      });
    }, [id]);
  
    return (
      <div className="projeto-view-card">
        <div className="projeto-card-options">
          <Link to={"/projetos"} className="projeto-card-close">
            X
          </Link>
          {typeof projeto !== "undefined" &&
            projeto.map((value) => {
              return (
                <div className="projeto-view-column" key={value.ID}>
                  <div className="selected-projeto-descricao">{value.DESCRICAO}</div>
                  <div className="selected-projeto-responsavel">(Responsável: {responsavel || "N/A"})</div>
                  <div className="selected-reuniao-status">Status: {parseProjectStatus(value.STATUS)}</div>
                  <div className="selected-membros-do-projeto">
                    <strong>Membros do Projeto:</strong>
                    <ul>
                      {membrosDoProjeto.map((membro) => (
                        <li key={membro.NOME}>{membro.NOME}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
        </div>
  
        <button
          className="deletar-projeto-btn"
          onClick={(_) => {
            Axios.delete(`http://localhost:3001/deletar-projeto/${id}`).then((response) => {
              let data = response.data;
  
              if (data.error) {
                alert(`ERRO: ${data.error.sqlMessage}`);
              } else {
                alert(`Projeto [${id}] deletado com sucesso!`);
                window.location.href = "http://localhost:3000/projetos";
              }
            });
          }}
        >
          DELETAR PROJETO
        </button>
      </div>
    );
  
    function parseProjectStatus(status) {
      switch (status) {
        case "EMPROGRESSO":
          return "EM PROGRESSO";
        case "CONCLUIDO":
          return "CONCLUÍDO";
        default:
          return "ABANDONADO";
      }
    }
  }
  