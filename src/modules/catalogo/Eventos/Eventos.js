import React, { useEffect, useState }  from "react"
import BaseCatalogo from "../components/BaseCatalogo/BaseCatalogo";
import EventoCard from "./components/EventoCard/EventoCard";
import Axios from "axios";

export default function Eventos() {

    const [listEvents, setListEvents] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:3001/eventos").then((response) => {
            setListEvents(response.data);
        });
    }, []);

        return (
            <BaseCatalogo addBtnPath={"/eventos/adicionar"} title={
                <h1 className="catalogo-sub-title">Eventos</h1>
            } children={
                <>
                    {typeof listEvents != "undefined" && listEvents.map((value) => {
                        return <EventoCard
                        title={"" + value.DESCRICAO}
                        id={value.EVENTO_ID}
                        date={"" + value.DT_HORA}
                        local={"" + value.LOCALIZACAO}
                    />
                    
                    })}
                </>
            }>

            </BaseCatalogo>
        );
}