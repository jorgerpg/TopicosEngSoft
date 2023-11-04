import Axios from "axios";
import { useState } from "react";
import CustomInput from "../../../utils/components/CustomInput/CustomInput";

import "./AddMember.css";

export default function AddMember() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cpf, setCPF] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cargo, setCargo] = useState(""); // Add state for cargo


    function handleInputChange(e, changeFunction) {
        changeFunction(e.target.value);
    }

    function handleCargoSelection(selectedCargo) {
        setCargo(selectedCargo);
    }
    
    function DropdownTile({ options, selectedOption, onSelect }) {
        return (
          <div className="dropdown">
            <button className="dropdown-button" onClick={() => onSelect(selectedOption)}>
              {selectedOption || "Selecione um cargo"}
            </button>
            <ul className="dropdown-options">
              {options.map((option) => (
                <li key={option} onClick={() => onSelect(option)}>
                  {option}
                </li>
              ))}
            </ul>
          </div>
        );
      }

    return (
        <div className="add-member-view">

            <div className="add-member-title">CADASTRAR MEMBRO</div>

            <CustomInput
                type="text"
                placeholder="Nome"
                onChange={(e) => handleInputChange(e, setNome)}
                maxLength={50}
            />
            <CustomInput
                type="text"
                placeholder="E-mail"
                onChange={(e) => handleInputChange(e, setEmail)}
                maxLength={50}
            />
            <CustomInput
                type="password"
                placeholder="Senha"
                onChange={(e) => handleInputChange(e, setSenha)}
                maxLength={30}
            />
            <CustomInput
                type="number"
                placeholder="CPF"
                onChange={(e) => handleInputChange(e, setCPF)}
                maxLength={15}
            />
            <CustomInput
                type="number"
                placeholder="Telefone"
                onChange={(e) => handleInputChange(e, setTelefone)}
                maxLength={15}
            />

            <DropdownTile
                options={["EFETIVO", "ESTAGIARIO", "TECNICO", "GERENCIA"]}
                selectedOption={cargo}
                onSelect={handleCargoSelection}
            />

            <button className="back-to-members"
                onClick={() => {
                    window.location.href = "http://localhost:3000/membros";
                }}
            >VOLTAR</button>

            <button className="next-member-register" onClick={() => {
                // Make sure all required fields are filled before making the API call.
                if (nome && email && senha && cpf && telefone && cargo) {
                    Axios.post(`http://localhost:3001/cadastrar-membro/${nome}/${email}/${senha}/${cpf}/${telefone}`)
                        .then((response) => {
                            if (response.data.error) {
                                alert(`ERRO: ${response.data.error.sqlMessage}`);
                            } else {
                                const newMemberId = response.data.insertId;
                                // After successfully registering the member, also assign the cargo.
                                Axios.post(`http://localhost:3001/cadastrar-membro-cargo/${newMemberId}/${cargo}`)
                                    .then(() => {
                                        alert(`Membro cadastrado com sucesso!`);
                                        window.location.href = "";
                                    })
                                    .catch(() => {
                                        alert("ERRO: Falha ao atribuir cargo ao membro.");
                                    });
                            }
                        })
                        .catch(() => {
                            alert("ERRO: Preencha os campos do membro com informações válidas!");
                        });
                } else {
                    alert("ERRO: Preencha todos os campos, incluindo o cargo.");
                }
            }}>PRÓXIMO</button>
        </div>
    );
}