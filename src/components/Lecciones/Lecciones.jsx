import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Lecciones = () => {
  const navigate = useNavigate();

  const lecciones = [
    {
      titulo: 'Unir palabra con imagen',
      descripcion: 'Asocia palabras con su imagen correspondiente.',
      ruta: '/leccionmatch',
      imagen: '/src/assets/cooperacion.png',
    },
    {
      titulo: 'Seleccionar palabra correcta',
      descripcion: 'Completa la oración con la palabra correcta.',
      ruta: '/leccionfill',
      imagen: '/src/assets/escoger.png',
    },
    {
      titulo: 'Biblioteca NicaLee',
      descripcion: 'Explora cuentos, poemas y lecturas.',
      ruta: '/biblioteca',
      imagen: '/src/assets/libro-de-ninos.png',
    },
    {
      titulo: 'Juegos NicaLee',
      descripcion: 'Actividades divertidas para aprender jugando.',
      ruta: '/juegos',
      imagen: '/src/assets/jugando.png',
    }
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lecciones</h2>
      <Row>
        {lecciones.map((lec, idx) => (
          <Col md={6} lg={4} className="mb-4" key={idx}>
            <Card className="h-100 shadow-sm text-center">
              <Card.Img
                variant="top"
                src={lec.imagen}
                alt={lec.titulo}
                style={{ height: '180px', objectFit: 'contain' }}
              />
              <Card.Body>
                <Card.Title>{lec.titulo}</Card.Title>
                <Card.Text>{lec.descripcion}</Card.Text>
                <Button variant="primary" onClick={() => navigate(lec.ruta)}>
                  Ir a lección
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Lecciones;
