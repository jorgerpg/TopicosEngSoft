import React from "react";
import { Link } from "react-router-dom";
import "./MembroCard.css";

export default function MembroCard({id, name, ativo, email}) {
    
    return (
        <div className="member-card">
            <Link to={`/membro/${id}`} className="member-name">{name}</Link>
            <a className="member-email" href={`mailto:${email}`}>{email}</a>
            <div className="member-class">{ativo}</div>
        </div>
    );
}