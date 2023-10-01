import { Link } from 'react-router-dom';
import './ReuniaoCard.css';

export default function ReuniaoCard({nome, local, horario, id}) {
    return (
        <div className="member-card">
            <Link to={`/reuniao/${id}`} className="member-name">{nome}</Link>
            <div className="member-local">{local}</div>
            <div className="member-horario">{horario}</div>
            
        </div>
    );
}