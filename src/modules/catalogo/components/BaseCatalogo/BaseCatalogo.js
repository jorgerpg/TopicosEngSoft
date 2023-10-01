import React from "react";
import "./BaseCatalogo.css";
import AddButton from "./components/AddButton/AddButton";
import BackButton from "./components/BackButton/BackButton";


export default function BaseCatalogo({title, children, addBtnPath}) {
        return (
            <div className="catalogo">
                <>
                    <div className="title-row">
                        <BackButton/>
                        {title}
                        <AddButton to={addBtnPath}/>
                    </div>
                    <div className="sep-line"></div>
                    <div className="cards-view">
                    {children}
                    </div>
                </>
            </div>
        );
}