import Axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./AtualizarCargo.css";

import DropdownTile from "../../../../admin/AddMeeting/components/DropdownTile";

export default function AtualizarCargo() {

    const {id} = useParams();

    let cargos = ["TRAINEE", "VOLUNTARIO", "MEMBRO", "ADMIN"];

    const [cargo, setCargo] = useState("");

    const [showDropdown, setShowDropdown] = useState(false);

    function handleBtnDropdown() {
        setShowDropdown(!showDropdown);
    }

    return (
        <div className="atualizar-cargo-view-card">        
            <div className="atualizar-cargo-card-options">
                <Link to={`/membro/${id}`} className="atualizar-cargo-card-close">X</Link>
                    <div className="member-view-column">
                        {/* ----------------------------------------------------------------------- */}
                        <button className="atualizar-cargo-dropdown" onClick={handleBtnDropdown}>
                        <h2 className="atualizar-cargo-dropdown-text">Selecione um cargo</h2>
                        </button>
                        <div className="atualizar-cargo-overflow">
                        {showDropdown === false ? <div className="atualizar-cargo-dropdown-invisible"/> : 
                        (typeof cargos != "undefined" && cargos.map((value) => {
                        return <DropdownTile key={value} nomePessoa={value}
                            onClick={() => {
                                setCargo(value);
                                handleBtnDropdown();
                            }}
                        />
                        }))
                        }
                        </div>
                        {/* ----------------------------------------------------------------------- */}
                        {cargo !== "" ? <h3 className="atualizar-cargo-selecionado">Cargo selecionado: {cargo}</h3> : ""}
                        <button className="update-cargo-btn" onClick={() => {
                            Axios.put(`http://localhost:3001/atualiza-cargo-pessoa/${id}/${cargo}`).then((response) => {
                                if (response.data.error) {
                                    alert("ERRO");
                                } else {
                                    alert(`Cargo do membro [${id}] atualizado para: ${cargo} com sucesso!`);
                                    window.location.href = `http://localhost:3000/membro/${id}`;
                                }
                            }).catch((e) => {
                                alert(e.message);
                            });
                        }}>Atualizar</button>
                    </div>
            </div>
        </div>
    );

}