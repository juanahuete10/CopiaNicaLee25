import React, { useState, useEffect } from 'react';
import { db, auth } from '../../database/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Container, Card, ListGroup } from 'react-bootstrap';

function ListarGrupos() {
  const [grupos, setGrupos] = useState([]);

  useEffect(() => {
    const fetchGrupos = async () => {
      const user = auth.currentUser;
      if (user) {
        const gruposRef = collection(db, 'grupos');
        const q = query(gruposRef, where('docenteId', '==', user.uid)); // Asumiendo que guardas el uid del docente en el grupo
        const querySnapshot = await getDocs(q);
        const gruposData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGrupos(gruposData);
      }
    };

    fetchGrupos();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Mis Grupos</h2>
      {grupos.length === 0 ? (
        <p>No tienes grupos creados.</p>
      ) : (
        grupos.map((grupo) => (
          <Card key={grupo.id} className="mb-3">
            <Card.Body>
              <Card.Title>{grupo.nombre}</Card.Title>
              <Card.Text>Grado: {grupo.grado}</Card.Text>
              <ListGroup>
                {grupo.estudiantes && grupo.estudiantes.map((estudianteId) => (
                  <ListGroup.Item key={estudianteId}>{estudianteId}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default ListarGrupos;