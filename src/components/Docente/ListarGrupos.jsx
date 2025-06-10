import React, { useState, useEffect } from 'react';
import { db, auth } from '../../database/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Container, Card, ListGroup, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ListarGrupos() {
  const [grupos, setGrupos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrupos = async () => {
      const user = auth.currentUser;
      if (user) {
        const gruposRef = collection(db, 'grupos');
        const q = query(gruposRef, where('docenteId', '==', user.uid));
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
      <h2 className="mb-4">📘 Mis Grupos</h2>

      {grupos.length === 0 ? (
        <p>No tienes grupos creados.</p>
      ) : (
        grupos.map((grupo) => (
          <Card key={grupo.id} className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>{grupo.nombre}</Card.Title>
              <Card.Text><strong>Grado:</strong> {grupo.grado}</Card.Text>

              <Card.Subtitle className="mt-3 mb-2">Estudiantes:</Card.Subtitle>
              <ListGroup className="mb-3">
                {grupo.estudiantes && grupo.estudiantes.length > 0 ? (
                  grupo.estudiantes.map((estudianteId) => (
                    <ListGroup.Item key={estudianteId}>{estudianteId}</ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No hay estudiantes asignados.</ListGroup.Item>
                )}
              </ListGroup>

              <Row>
                <Col xs={12} sm={6} className="mb-2">
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => navigate('/juegos')}
                  >
                    🎮 Ver Juegos
                  </Button>
                </Col>
                <Col xs={12} sm={6}>
                  <Button
                    variant="success"
                    className="w-100"
                    onClick={() => navigate(`/asignarlecciones/${grupo.id}`)}
                  >
                    📚 Asignar Lecciones
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}

export default ListarGrupos;
