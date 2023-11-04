import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MembroCard.css";

export default function MembroCard({ id, name, ativo, email, fetchCargo }) {
  const [cargo, setCargo] = useState(null);

  useEffect(() => {
    if (fetchCargo) {
      fetchCargo(id)
        .then((cargo) => {
          if (cargo) {
            setCargo(cargo);
          } else {
            setCargo("Cargo not available");
          }
        })
        .catch((error) => {
          console.error("Error fetching 'cargo':", error);
          setCargo("Error fetching 'cargo'");
        });
    }
  }, [id, fetchCargo]);

  return (
    <div className="member-card">
      <Link to={`/membro/${id}`} className="member-name">
        {name}
      </Link>
      <div className="member-email" href={`mailto:${email}`}>{email}</div>
      <div className="member-class">{ativo}</div>
      {cargo && <div className="member-cargo">{cargo}</div>}
    </div>
  );
}
