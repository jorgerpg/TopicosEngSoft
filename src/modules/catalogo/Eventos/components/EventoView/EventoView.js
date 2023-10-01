import "./EventoView.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Axios from "axios";


export default function EventoView() {

    const {id} = useParams();

    const [evento, setEvento] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/evento/${id}`).then((response) => {
            setEvento(response.data);
        });
    }, [id]);

    const [nomeResponsavel, setResponsavel] = useState("");

    return (
        <div className="evento-view-card">        
            <div className="evento-card-options">
                    <Link to={"/eventos"} className="evento-card-close">X</Link>
                {typeof evento !== "undefined" && evento.map((value) => {
                    Axios.get(`http://localhost:3001/responsavel-evento/${value.RESPONSAVEL_ID}`).then((response) => {
                        setResponsavel(response.data.at(0).NOME);
                    });
                    return (<>
                        <div className="event-view-column">
                            <div className="selected-event-descricao">{value.DESCRICAO}</div>
                            <div className="selected-event-palestrante">Palestrante: {value.PALESTRANTE}</div>
                            <div className="selected-event-ativo">(Responsável: {nomeResponsavel})</div>


                            <div className="selected-event-in-data-row">
                                <div className="selected-event-data-entered-course">
                                    O evento acontecerá no dia {sqlToJsDate(value.DT_HORA)}
                                </div>
                            </div>

                            <div className="selected-event-in-data-row">
                                <div className="selected-event-data-entered">
                                    O evento acontecerá no local: {value.LOCALIZACAO}
                                </div>
                            </div>

                        </div>
                    </>);
                })}
            </div>
            <button className="deletar-evento-btn"
                onClick={(_) => {
                    Axios.delete(`http://localhost:3001/deletar-evento/${id}`).then((response) => {
                        
                        if (response.data.error) {
                            console.log(response.data.error);
                            alert(`${response.data.error.sqlMessage}`);
                        } else {
                            alert(`Evento [${id}] deletado com sucesso!`);
                            window.location.href = "http://localhost:3000/eventos";
                        }
                    });
                }}>DELETAR EVENTO</button>
        </div>
    );

    function parseMes(mes) {

        const translateMes = {
            "jan": "janeiro",
            "feb": "fevereiro",
            "mar": "março",
            "apr": "abril",
            "may": "maio",
            "jun": "junho",
            "jul": "julho",
            "aug": "agosto",
            "sep": "setembro",
            "oct": "outubro",
            "nov": "novembro",
            "dec": "dezembro",
        }

        let entries = Object.entries(translateMes);
        
        let meses = entries.filter(([key, value]) => {
            return key.toLowerCase() === mes.toLowerCase() ? value : "";
        }).at(0)[1];

        return meses;
    }

    function sqlToJsDate(sqlDate){
        let dateTime = sqlDate.replace("T", " ").replace("Z", "");

        let dateTimeParts= dateTime.split(/[- :]/);
        dateTimeParts[1]--;

        let dateStr = new Date(...dateTimeParts).toString();

        return formatDataBR(formatDate(dateStr));
    }

    function formatDate(date) {
        const dateSplit = date.split("03:00:00 GMT");

        let justDate = dateSplit[0];

        return justDate;
    }

    function formatDataBR(data) {
        const dataSep = data.split(" ");
        let mes = dataSep[1];
        let dia = dataSep[2];
        let ano = dataSep[3];

        return dia + " de " + parseMes(mes) + " de " + ano;
    }

}