import { useEffect, useState } from "react";
import BaseCatalogo from "../components/BaseCatalogo/BaseCatalogo";
import Axios from 'axios';
import ReuniaoCard from "./components/ReuniaoCard/ReuniaoCard";

import "../../catalogo/components/BaseCatalogo/BaseCatalogo.css";

export default function Reunioes() {

    const [reunioesList, setReunioesList] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/reunioes").then((response) => {
            setReunioesList(response.data);
        });
    }, []);

    return (
        <BaseCatalogo addBtnPath={"/reunioes/adicionar"} title={
            <h1 className="catalogo-sub-title">REUNIÕES</h1>
        } children={
            <>
            {typeof reunioesList != "undefined" && reunioesList.map((value) => {
                return <ReuniaoCard
                    key={value.REUNIAO_ID}
                    id={value.REUNIAO_ID}
                    nome={value.DESCRICAO}
                    local={value.LOCALIZACAO}
                    horario={value.DT_HORA}
                />
            })}
            </>
        }/>
    );

}