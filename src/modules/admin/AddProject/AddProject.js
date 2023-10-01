import CustomInput from "../../../utils/components/CustomInput/CustomInput";
import "./AddProject.css";
import Axios from 'axios'
import { Link } from "react-router-dom";

import DropdownTile from "../AddMeeting/components/DropdownTile";
import { useEffect, useState } from "react";

export default function AddProject() {

    const statusList = ["EM PROGRESSO", "ABANDONADO", "CONCLUÍDO"];

    const [show, setShow] = useState(false);

    const [showStatus, setShowStatus] = useState(false);

    const [pessoasDropdown, setPessoasDropdown] = useState([]);

    const [responsavel, selectedResonsavel] = useState("");

    const [responsavelID, setResponsavelID] = useState(0);

    const [status, selectedStatus] = useState("");

    const [descricao, setDescricao] = useState("");

    function handleChange(e, changeFunction) {
        changeFunction(e.target.value);
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/pessoas").then((response) => {
            setPessoasDropdown(response.data);
        });
    }, []);

    function handleButton() {
        setShow(!show);
    }

    function handleButtonStatus() {
        setShowStatus(!showStatus);
    }

    return (
        <div className="add-project-main-view">
            <div className="project-inputs">
                <CustomInput
                    placeholder={"Descrição"}
                    onChange={(e) => handleChange(e, setDescricao)}
                />
                {/* --------------------------------------------------------------------- */}
                <button className="project-status-dropdown"  onClick={handleButtonStatus}>
                    <h2 className="project-status-dropdown-text">Status</h2>
                </button>
                <div className="project-status-overflow">
                {showStatus === false ? <div className="project-status-dropdown-invisible"/> : 
                (typeof statusList != "undefined" && statusList.map((value) => {
                    return <DropdownTile key={value} nomePessoa={value}
                    onClick={() => {
                        selectedStatus(value.replace(" ", ""));
                        handleButtonStatus();
                    }}
                />
                }))
                }
                </div>
                {/* --------------------------------------------------------------------- */}
            </div>
            <button className="project-responsavel-dropdown"  onClick={handleButton}>
                <h2 className="project-dropdown-text">Selecione um responsavel</h2>
            </button>
            <div className="project-responsaveis-overflow">
            {show === false ? <div className="project-dropdown-invisible"/> : 
            (typeof pessoasDropdown != "undefined" && pessoasDropdown.map((value) => {
                return <DropdownTile key={value.PESSOA_ID} nomePessoa={value.NOME}
                    onClick={() => {
                        selectedResonsavel(value.NOME);
                        setResponsavelID(value.PESSOA_ID);
                        handleButton();
                    }}
                />
            }))
            }
            </div>
            {responsavel !== "" ? <h3 className="project-responsavel-selecionado">Responsável: {responsavel}</h3> : ""}

            <button className="back-to-project-btn">
                <Link to={"/projetos"} className="back-to-project-btn-txt">VOLTAR</Link>
            </button>

            <button className="criar-projeto-btn" onClick={() => {
                Axios.post(`http://localhost:3001/adicionar-projeto/${descricao}/${responsavelID}/${status}`).then((response) => {

                    let data = response.data;

                    if (data.error) {
                        alert(`ERRO: ${data.error.sqlMessage}`);
                    } else {
                        window.location.href = "http://localhost:3000/projetos";
                    }

                }).catch(() => {
                    alert("ERRO: Preencha os campos do projeto com informações válidas!");
                });
            }}>CRIAR PROJETO</button>
        </div>
    );
}