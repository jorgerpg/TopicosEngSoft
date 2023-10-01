import "./AddEvent.css";
import CustomInput from "../../../utils/components/CustomInput/CustomInput";

import Axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DropdownTile from "../AddMeeting/components/DropdownTile";

export default function AddEvent() {

    const statusList = ["EM PROGRESSO", "ABANDONADO", "CONCLUÍDO"];
    const [showStatus, setShowStatus] = useState(false);
    const [status, selectedStatus] = useState("");

    function handleButtonStatus() {
        setShowStatus(!showStatus);
    }

    const [descricao, setDescricao] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [palestrante, setPalestrante] = useState("");
    const [localizacao, setLocalizacao] = useState("");

    function handleChangeInput(ev, changeFunction) {
        changeFunction(ev.target.value);
    }

    const [showRespEvento, setShowRespEvento] = useState(false);

    const [responsavelID, setResponsavelID] = useState(0);

    const [pessoasDropdown, setPessoasDropdown] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/pessoas").then((response) => {
            setPessoasDropdown(response.data);
        });
    }, []);

    function handleBtnDropdownResponsaveis() {
        setShowRespEvento(!showRespEvento);
    }

    return (
        <div className="event-main-view">
            <div className="add-event-text">ADICIONAR UM EVENTO </div>
            <div className="event-inputs">
                <CustomInput
                    type="text"
                    placeholder="Descrição"
                    maxLength={35}
                    onChange={(e) => handleChangeInput(e, setDescricao)}
                />
                <CustomInput
                    type="text"
                    placeholder="Palestrante"
                    maxLength={35}
                    onChange={(e) => handleChangeInput(e, setPalestrante)}
                />
                <CustomInput
                    type="text"
                    placeholder="Localização"
                    maxLength={35}
                    onChange={(e) => handleChangeInput(e, setLocalizacao)}
                />
            </div>


            {/* --------------------------------------------------------------------- */}
                <button className="event-status-dropdown"  onClick={handleButtonStatus}>
                <h2 className="event-status-dropdown-text">Status</h2>
                </button>
                <div className="event-status-overflow">
                {showStatus === false ? <div className="event-status-dropdown-invisible"/> : 
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


            {/* ----------------------------------------------------------------------- */}
            <button className="event-responsavel-dropdown" onClick={handleBtnDropdownResponsaveis}>
                <h2 className="event-dropdown-text">Selecione um responsavel</h2>
            </button>
            <div className="event-responsaveis-overflow">
            {showRespEvento === false ? <div className="event-dropdown-invisible"/> : 
            (typeof pessoasDropdown != "undefined" && pessoasDropdown.map((value) => {
                return <DropdownTile key={value.PESSOA_ID} nomePessoa={value.NOME}
                    onClick={() => {
                        setResponsavel(value.NOME);
                        setResponsavelID(value.PESSOA_ID);
                        handleBtnDropdownResponsaveis();
                    }}
                />
            }))
            }
            </div>
            {responsavel !== "" ? <h3 className="event-responsavel-selecionado">Responsável: {responsavel}</h3> : ""}
            {/* ----------------------------------------------------------------------- */}

            <button className="back-to-event-btn">
                <Link to={"/eventos"} className="back-to-event-btn-txt">VOLTAR</Link>
            </button>

            <button className="add-event-btn"
                onClick={() => {
                    Axios.post(`http://localhost:3001/adicionar-evento/${descricao}/${responsavelID}/${palestrante}/${localizacao}/${status}`).then((response) => {

                        if (response.data.error) {
                            alert(`ERRO: ${response.data.error.sqlMessage}`);
                        } else {
                            window.location.href = "http://localhost:3000/eventos";
                        }

                    }).catch(() => {
                        alert("ERRO: Preencha os campos do evento com informações válidas!");
                    });
                }
                }
            >
                ADICIONAR
            </button>
        </div>
    );
}