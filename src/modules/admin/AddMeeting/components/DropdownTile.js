import React from "react";
import "./DropdownTile.css";

export default function DropdownTile({nomePessoa, onClick}) {
    return (
        <button className="white-tile" onClick={onClick}>
            {nomePessoa}
        </button>
    );
}