import React, { useEffect, useState } from "react";
import "./Membros.css";

import BaseCatalogo from "../components/BaseCatalogo/BaseCatalogo"
import MembroCard from "./components/MembroCard/MembroCard";
import Axios from "axios";

import "../../catalogo/components/BaseCatalogo/BaseCatalogo.css";

export default function Membros() {

    const [listMembers, setListMembers] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/pessoas").then((response) => {
            setListMembers(response.data);
        });
    }, []);

        return (
            <BaseCatalogo addBtnPath={"/membros/cadastrar"} title={
                <h1 className="catalogo-sub-title">Membros Equipe</h1>
            }
            children={
                <>
                {typeof listMembers != "undefined" && listMembers.map((value) => {
                return <MembroCard
                id={value.PESSOA_ID}
                key={value.PESSOA_ID}
                name={`${value.NOME}`}
                email={`${value.EMAIL}`}
                ativo={`${value.ATIVO}`}
                />
                })}
                </>
            }
            >
            </BaseCatalogo>
        );
}