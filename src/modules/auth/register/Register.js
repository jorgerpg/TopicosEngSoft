import React from "react";

import CustomInput  from "./../../../utils/components/CustomInput/CustomInput";
import CustomButton  from "./../../../utils/components/CustomButton/CustomButton";
import './Register.css';

export default class Register extends React.Component {
    render() {
        return (
            <div className="white-container">
                <>
                    <div className="input-column">
                        <h3 className="text-dados-pessoais">Dados Pessoais:</h3>
                        <CustomInput id="register-input-user" type="text" placeholder="Usuário" maxLength={35}/>
                        <CustomInput id="register-input-email" type="text" placeholder="E-mail" maxLength={20}/>
                        <CustomInput id="register-input-phone" type="text" placeholder="Telefone" maxLength={11}/>
                        <CustomInput id="register-input-password" type="password" placeholder="Senha" maxLength={20}/>
                        <CustomInput id="register-input-cpf" type="text" placeholder="CPF" maxLength={12}/>
                    </div>
                    <CustomButton navTo="/membros" text="Finalizar"/>
                </>
            </div>
            
        );
    }
}