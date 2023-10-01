import React, { useState } from "react";

import CustomInput  from "./../../../utils/components/CustomInput/CustomInput";
import Axios from 'axios';
import logo from "../../../assets/logo.png";

import './Login.css';
import CustomButton from "../../../utils/components/CustomButton/CustomButton";

export default function Login() {

    const [pessoas, setPessoas] = useState([]);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleClickBtn() {
        console.log("CLICOU");
    }

    function handleChangeEmail(ev) {
        setEmail(ev.target.value);
    }

    function handleChangePassword(ev) {
        setPassword(ev.target.value);
    }

    let route = "/catalogo";

    return (
            <>
                <div className="white-container">
                    <img src={logo} alt="Logo do Manager" className="logo"/>
                    <div className="input-column">
                        <CustomInput 
                        id="login-input-user" 
                        type="text" 
                        placeholder="Usuário" 
                        maxLength={50}
                        onChange={(e) => handleChangeEmail(e)}
                        />
                        <CustomInput 
                        id="login-input-password" 
                        type="password" 
                        placeholder="Senha" 
                        maxLength={20}
                        onChange={(e) => handleChangePassword(e)}
                        />
                    </div>
                    <CustomButton 
                    onClick={()=> {
                Axios.get(`http://localhost:3001/auth/${email}`).then((response) => {
                    setPessoas(response.data);

                    if (email === "" || password === "") {
                        alert("Preencha os campos obrigatórios!");
                    } else {
                        if (typeof response === "undefined") {
                            alert("Preencha os campos obrigatórios!");
                        }
                    }
                    
                    if (response.data.error) {
                        alert("ERRO: Autenticação falhou!");
                    } else {
                        if (pessoas.length > 0) {
                            let person = pessoas.at(0);
                            if (person.SENHA === password) {
                                window.location.href = "http://localhost:3000/catalogo";
                            } else {
                                alert("Senha incorreta!");
                            }
                        } else {
                            alert("ERRO: Autenticação falhou!");
                        }
                    }



                }).catch((_) => {
                    alert(`Autenticação falhou! Preencha os campos obrigatórios, ou então verifique se seus dados estão corretos.`);
                });
        return handleClickBtn;
                    }}
                    navTo={route} 
                    text="ENTRAR"
                    />
                </div> 
            </>
        );
}