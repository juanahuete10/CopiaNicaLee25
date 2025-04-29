// src/components/Lecciones/Juegos.jsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const levels = [
  { id: 1, label: 'Nivel 1', icon: '/src/assets/nivel1.png' },
  { id: 2, label: 'Nivel 2', icon: '/src/assets/dos.png' },
  { id: 3, label: 'Nivel 3', icon: '/src/assets/nivel3.png' },
  { id: 4, label: 'Nivel 4', icon: '/src/assets/cuatro.png' },
  { id: 5, label: 'Nivel 5', icon: '/src/assets//numero-5.png' },
  { id: 6, label: 'Nivel 6', icon: '/src/assets/seis.png' },
];

export default function Juegos() {
  const handleStart = (lvl) => {
    // aquí podrías navegar a /juego/:lvl
    console.log('Iniciar nivel', lvl);
  };

  return (
    <Container className="py-5 text-center">
      <h3 className="mb-4">Juegos NicaLee</h3>
      <p>Racha diaria: ⭐⭐⭐⭐ 10</p>
      <Row className="g-3 justify-content-center">
        {levels.map((lvl) => (
          <Col xs={6} sm={4} md={2} key={lvl.id}>
            <Card className="shadow-sm h-100">
              <Card.Img variant="top" src={lvl.icon} />
              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ fontSize: '1rem' }}>{lvl.label}</Card.Title>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="mt-auto"
                  onClick={() => handleStart(lvl.id)}
                >
                  Jugar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
