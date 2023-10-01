import React from "react";
import "./EventoCard.css";

import calendar from "../../../../../assets/calendar.svg";
import place from "../../../../../assets/place.svg";
import { Link } from "react-router-dom";

export default function EventoCard({id, title, date, local}) {
    return (
        <div className="event-card">
            <Link to={"/evento/" + id} className="event-title">{title}</Link>
            <div className="flex-row">
                <img src={calendar} alt="Ícone calendário" className="icon"/>
                <div className="event-date">{date}</div>
            </div>
            <div className="flex-row">
            <img src={place} alt="Ícone local" className="icon"/>
                <div className="event-local">{local}</div>
            </div>
        </div>
    );
}