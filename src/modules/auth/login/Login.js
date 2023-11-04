import React, { useState } from "react";
import CustomInput from "./../../../utils/components/CustomInput/CustomInput";
import Axios from "axios";
import logo from "../../../assets/logo.png";
import "./Login.css";
import CustomButton from "../../../utils/components/CustomButton/CustomButton";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChangeEmail(ev) {
        setEmail(ev.target.value);
    }

    function handleChangePassword(ev) {
        setPassword(ev.target.value);
    }

    function handleLogin() {
        if (email === "" || password === "") {
            alert("Preencha os campos obrigatórios!");
            return;
        }

        Axios.get(`http://localhost:3001/auth/${email}`).then((response) => {
            const pessoas = response.data;
            if (pessoas.length === 0) {
                alert("Usuário não encontrado.");
            } else {
                const person = pessoas[0];
                if (person.SENHA === password) {
                    alert("Login successful!");
                    window.location.href = "/catalogo";
                } else {
                    alert("Senha incorreta!");
                }
            }
        }).catch((error) => {
            console.error(error);
            alert("Autenticação falhou. Verifique se seus dados estão corretos.");
        });
    }

    return (
        <div className="white-container">
            <img src={logo} alt="Logo do Manager" className="logo" />
            <div className="input-column">
                <CustomInput
                    id="login-input-user"
                    type="text"
                    placeholder="Usuário"
                    maxLength={50}
                    onChange={handleChangeEmail}
                />
                <CustomInput
                    id="login-input-password"
                    type="password"
                    placeholder="Senha"
                    maxLength={20}
                    onChange={handleChangePassword}
                />
            </div>
            <CustomButton
                onClick={handleLogin}
                text="ENTRAR"
            />
        </div>
    );
}
