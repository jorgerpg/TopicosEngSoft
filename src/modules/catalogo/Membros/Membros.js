import React, { useEffect, useState } from "react";
import "./Membros.css";
import BaseCatalogo from "../components/BaseCatalogo/BaseCatalogo";
import MembroCard from "./components/MembroCard/MembroCard";
import Axios from "axios";
import "../../catalogo/components/BaseCatalogo/BaseCatalogo.css";

export default function Membros() {
  const [listMembers, setListMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3001/pessoas")
      .then((response) => {
        setListMembers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);


  if (loading) {
    // Display a loading indicator or message
    return <p>Loading...</p>;
  }

  if (error) {
    // Handle the error, display an error message, or take appropriate action
    return <p>Error: {error.message}</p>;
  }

  // Function to fetch 'cargo' for a specific member
  async function fetchCargo(id) {
    try {
      const response = await Axios.get(`http://localhost:3001/cargo/${id}`);
      if (response.data.error) {
        return null;
      }
      return response.data[0].NOME_CARGO;
    } catch (error) {
      // Handle the error, e.g., return an appropriate default value
      console.error("Error fetching 'cargo':", error);
      return null;
    }
  }

  return (
    <BaseCatalogo
      addBtnPath="/membros/cadastrar"
      title={<h1 className="catalogo-sub-title">Membros Equipe</h1>}
    >
      {listMembers.length > 0 ? (
        listMembers.map((value) => (
          <MembroCard
            id={value.PESSOA_ID}
            key={value.PESSOA_ID}
            name={`${value.NOME}`}
            email={`${value.EMAIL}`}
            ativo={`${value.ATIVO}`}
            fetchCargo={() => fetchCargo(value.PESSOA_ID)}
          />
        ))
      ) : (
        <p>No members to display.</p>
      )}
    </BaseCatalogo>
  );
}
