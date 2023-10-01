import { Link } from "react-router-dom";
import "./AddButton.css";

export default function AddButton({action, to}) {
    return (
        <button className="add-data-btn">
            <Link className="add-decor" to={to}>{"+"}</Link>
        </button>
    );
}