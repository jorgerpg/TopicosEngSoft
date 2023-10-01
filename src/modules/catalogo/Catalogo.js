import React from "react";
import "./Catalogo.css"

import CatalogoCard from "./components/CatalogoCard/CatalogoCard";

import person from "../../assets/person.svg";
import reunioes from "../../assets/reunioes.svg";

export default class Catalogo extends React.Component {
    render() {
        return (
            <div className="catalogo-extras">
                <div className="catalogo">
                    <h4 className="info-dev-icon" onClick={(_) => {
                        window.location.href = "http://localhost:3000/infodev";
                    }}>ⓘ</h4>
                    <CatalogoCard path="/membros" icon={person} title="Membros da Equipe"/>
                    <CatalogoCard path="/eventos" icon={person} title="Eventos"/>
                    <CatalogoCard path="/reunioes" icon={reunioes} title="Reuniões"/>
                    <CatalogoCard path="/projetos" icon={person} title="Projetos"/>
                </div>
            </div>
        );
    }
}