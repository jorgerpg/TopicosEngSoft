import Axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ReuniaoView.css";

export default function ReuniaoView() {

    const {id} = useParams();

    const [reuniao, setReuniao] = useState([]);

    useEffect(() => {
        Axios.get(`http://localhost:3001/reuniao/${id}`).then((response) => {
            setReuniao(response.data);
        });
    }, [id]);

    const [nomeResponsavel, setResponsavel] = useState("");

    return(
        <div className="reuniao-view-card">
            <div className="reuniao-card-options">
                    <Link to={"/reunioes"} className="reuniao-card-close">X</Link>
                {typeof reuniao !== "undefined" && reuniao.map((value) => {
                    Axios.get(`http://localhost:3001/responsavel-reuniao/${value.RESPONSAVEL_ID}`).then((response) => {
                        setResponsavel(response.data.at(0).NOME);
                    });
                    return (<>
                        <div className="reuniao-view-column">
                            <div className="selected-reuniao-descricao">{value.DESCRICAO}</div>
                            <div className="selected-reuniao-responsavel">(Responsável: {nomeResponsavel})</div>


                            <div className="selected-reuniao-info-row">
                                <div className="selected-reuniao-data">
                                    A reuniao acontecerá no dia {sqlToJsDate(value.DT_HORA)}
                                </div>
                            </div>

                            <div className="selected-reuniao-info-row">
                                <div className="selected-reuniao-data">
                                    A reunião acontecerá no local: {value.LOCALIZACAO}
                                </div>
                            </div>

                        </div>
                    </>);
                })}
            </div>

            <button className="deletar-reuniao-btn"
                onClick={(_) => {
                    Axios.delete(`http://localhost:3001/deletar-reuniao/${id}`).then((_) => {
                        window.location.href = "http://localhost:3000/reunioes";
                    }).finally(() => {
                        alert(`Reunião [${id}] deletada com sucesso!`);
                    });
                }}>DELETAR REUNIÃO</button>
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