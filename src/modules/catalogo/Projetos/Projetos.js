import React, { useEffect, useState } from "react";
import "./Projetos.css";

import BaseCatalogo from "../components/BaseCatalogo/BaseCatalogo"
import Axios from "axios";

import "../../catalogo/components/BaseCatalogo/BaseCatalogo.css";
import ProjetoCard from "./components/ProjetoCard/ProjetoCard";

export default function Projetos() {

    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/projetos").then((response) => {
            setProjectList(response.data);
        });
    }, []);


        return (
            <BaseCatalogo addBtnPath={"/projetos/adicionar"} title={
                <h1 className="catalogo-sub-title">Projetos</h1>
            }
            children={
                <>
                {typeof projectList != "undefined" && projectList.map((value) => {
                return <ProjetoCard
                key={value.PROJETO_ID}
                id={value.PROJETO_ID}
                description={`${value.DESCRICAO}`}
                responsavel={`${value.RESPONSAVEL_ID}`}
                status={`${value.STATUS}`}
                />
                })}
                </>
            }
            >
            </BaseCatalogo>
        );
}