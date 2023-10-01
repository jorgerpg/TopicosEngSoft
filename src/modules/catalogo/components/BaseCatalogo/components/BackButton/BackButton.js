import { Link } from "react-router-dom";
import "./BackButton.css";

export default function BackButton() {
    return(
        <button className="back-btn">
            <Link className="back-decor" to="/catalogo">{"<"}</Link>
        </button>
    );
}