import React from "react";
import './CustomButton.css';

// import { Link } from 'react-router-dom'; 
export default class CustomButton extends React.Component {
    render() {
        return(
            <button className="custom-btn" onClick={this.props.onClick}>
                ENTRAR
                {/* <Link to={this.props.navTo} className="custom-btn-text"></Link> */}
            </button>
        );
    }
}