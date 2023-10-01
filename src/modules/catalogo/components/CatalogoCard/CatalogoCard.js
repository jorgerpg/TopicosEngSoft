import React from "react";
import { Link } from "react-router-dom";
import "./CatalogoCard.css";
export default function CatalogoCard({icon, path, title}) {
    return (
        <div id="card" className="cat-card">
            <img alt="Card Icon" src={icon} className="card-icon"/>
            <Link className="card-title" to={path}>{title}</Link>
        </div>
    );
}