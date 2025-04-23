import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../database/firebaseConfig';
import styled from 'styled-components';

const ListaEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(collection(db, "estudiantes"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEstudiantes(data);
      } catch (err) {
        console.error("Error al obtener estudiantes:", err);
        setError("Hubo un problema al cargar los estudiantes.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p>Cargando estudiantes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <h2>Lista de Estudiantes</h2>
      {estudiantes.length === 0 ? (
        <p>No hay estudiantes registrados.</p>
      ) : (
        <Lista>
          {estudiantes.map(est => (
            <Item key={est.id}>
              <img src={est.imagen} alt={`Foto de ${est.nombre}`} />
              <div>
                <h3>{est.nombre}</h3>
                <p>{est.correo}</p>
              </div>
            </Item>
          ))}
        </Lista>
      )}
    </Container>
  );
};

export default ListaEstudiantes;

const Container = styled.div`
  padding: 40px;
  background: linear-gradient(to bottom right, #e1f5fe, #ffffff);
  min-height: 100vh;
`;

const Lista = styled.ul`
  list-style: none;
  padding: 0;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  background: white;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 15px;
  }

  h3 {
    margin: 0;
    color: #00796b;
  }

  p {
    margin: 5px 0 0;
    color: #555;
  }
`;
