import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProjetoCard.css";

export default function ProjetoCard({description, responsavel, id}) {

    const [nomeResponsavel, setResponsavel] = useState("");

    useEffect(() => {
        Axios.get(`http://localhost:3001/responsavel-projeto/${responsavel}`).then((response) => {
                        setResponsavel(response.data.at(0).NOME);
                    });
    }, [responsavel]);

    return(
        <div className="project-card">
                <Link to={`/projeto/${id}`} className="project-description">{description}</Link>
                <div className="project-resp">{nomeResponsavel}</div>
            </div>
    );

}