import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CuentosAnimados from '../Biblioteca/CuentosAnimados';

const materias = ['matematica', 'lengua', 'ciencias', 'sociales', 'ingles'];
const grados = ['1', '2', '3', '4', '5', '6'];

const Biblioteca = () => {
  const [materia, setMateria] = useState(null);
  const [grado, setGrado] = useState(null);

  const libros = materia && grado
    ? Array.from({ length: 6 }, (_, i) => `/assets/libros/${materia}/${grado}/${i + 1}.png`)
    : [];

  return (
    <Container className="py-4">
      <h3 className="text-center mb-4">Biblioteca NicaLee</h3>

    
      {!materia && !grado && <CuentosAnimados />}

      {/* Selector de materia */}
      {!materia && (
        <Row className="g-4 justify-content-center">
          {materias.map(m => (
            <Col xs={6} md={4} lg={3} key={m}>
              <Card
                className="text-center shadow-sm h-100"
                onClick={() => setMateria(m)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Img
                  variant="top"
                  src={`/assets/icons/${m}.png`}
                  alt={m}
                  style={{ height: 160, objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{m.charAt(0).toUpperCase() + m.slice(1)}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Selector de grado */}
      {materia && !grado && (
        <>
          <h4 className="text-center mb-3">Selecciona un grado</h4>
          <Row className="g-4 justify-content-center">
            {grados.map(g => (
              <Col xs={4} md={2} key={g}>
                <Button
                  variant="primary"
                  className="w-100"
                  onClick={() => setGrado(g)}
                >
                  {g}°
                </Button>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-3">
            <Button variant="secondary" onClick={() => setMateria(null)}>← Volver</Button>
          </div>
        </>
      )}

      {/* Mostrar libros */}
      {materia && grado && (
        <>
          <h4 className="text-center mb-3">Libros de {materia} - {grado}° grado</h4>
          <Row className="g-4 justify-content-center">
            {libros.map((src, i) => (
              <Col xs={6} md={4} lg={3} key={i}>
                <Card className="text-center shadow-sm h-100">
                  <Card.Img
                    variant="top"
                    src={src}
                    alt={`Libro ${i + 1}`}
                    style={{ height: 200, objectFit: 'contain' }}
                  />
                  <Card.Body>
                    <Card.Text>Libro {i + 1}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-3">
            <Button variant="secondary" onClick={() => setGrado(null)}>← Volver</Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Biblioteca;
