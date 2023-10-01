import { useState, useEffect } from "react";
import "./AddMeeting.css";

import CustomImput from "../../../utils/components/CustomInput/CustomInput";
import DropdownTile from "./components/DropdownTile";

import Axios from "axios";
import { Link } from "react-router-dom";

export default function AddMeeting() {

    const [show, setShow] = useState(false);

    const [pessoasDropdown, setPessoasDropdown] = useState([]);

    const [responsavel, selectedResonsavel] = useState("");

    const [responsavelID, setResponsavelID] = useState(0);

    const [descricao, setDescricao] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [dataHora, setDataHora] = useState("");
    const [ata, setAta] = useState("");

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

    return (
        <div className="add-meeting-main-view">
            <div className="meet-inputs">
                <CustomImput
                    placeholder={"Descrição"}
                    maxLength={30}
                    onChange={(e) => handleChange(e, setDescricao)}
                />
                <CustomImput
                    placeholder={"Localização"}
                    maxLength={30}
                    onChange={(e) => handleChange(e, setLocalizacao)}
                />
                <CustomImput
                    placeholder={"Data / Hora"}
                    maxLength={30}
                    onChange={(e) => handleChange(e, setDataHora)}
                />
                <CustomImput
                    placeholder={"ATA"}
                    maxLength={30}
                    onChange={(e) => handleChange(e, setAta)}
                />
            </div>
            <button className="responsavel-dropdown"  onClick={handleButton}>
                <h2 className="dropdown-text">Selecione um responsavel</h2>
            </button>
            <div className="responsaveis-overflow">
            {show === false ? <div className="dropdown-invisible"/> : 
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
            {responsavel !== "" ? <h3 className="responsavel-selecionado">Responsável: {responsavel}</h3> : ""}

            <button className="back-to-meet-btn">
                <Link to={"/reunioes"} className="back-to-meeting-btn-txt">VOLTAR</Link>
            </button>

            <button className="criar-reuniao-btn" onClick={() => {
                Axios.post(`http://localhost:3001/adicionar-reuniao/${descricao}/${localizacao}/${dataHora}/${responsavelID}/${ata}`).then((response) => {
                    if (response.data.error) {
                        alert(`ERRO: ${response.data.error.sqlMessage}`);
                    } else {
                        window.location.href = "http://localhost:3000/reunioes";
                    }
                }).catch(() => {
                    alert("ERRO: Preencha os campos da reunião com informações válidas!");
                });
            }}>CRIAR REUNIÃO</button>
        </div>
    );
}