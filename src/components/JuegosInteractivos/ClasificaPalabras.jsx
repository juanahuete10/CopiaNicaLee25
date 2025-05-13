import React, { useState } from 'react';
import { Button, Badge, Container, Row, Col, Card, CardBody } from 'react-bootstrap';

const palabras = [
  { texto: 'perro', tipo: 'sustantivo' },
  { texto: 'canta', tipo: 'verbo' },
  { texto: 'feliz', tipo: 'adjetivo' },
  { texto: 'saltó', tipo: 'verbo' },
  { texto: 'mesa', tipo: 'sustantivo' },
  { texto: 'rojo', tipo: 'adjetivo' },
  { texto: 'correr', tipo: 'verbo' },
  { texto: 'flor', tipo: 'sustantivo' },
  { texto: 'alto', tipo: 'adjetivo' },
  { texto: 'escribir', tipo: 'verbo' },
  { texto: 'pelota', tipo: 'sustantivo' },
  { texto: 'rápido', tipo: 'adjetivo' },
  { texto: 'coche', tipo: 'sustantivo' },
  { texto: 'caminar', tipo: 'verbo' },
  { texto: 'inteligente', tipo: 'adjetivo' },
  { texto: 'gato', tipo: 'sustantivo' },
  { texto: 'bailar', tipo: 'verbo' },
  { texto: 'hermoso', tipo: 'adjetivo' },
  { texto: 'computadora', tipo: 'sustantivo' },
  { texto: 'leer', tipo: 'verbo' },
  { texto: 'tranquilo', tipo: 'adjetivo' },
  { texto: 'película', tipo: 'sustantivo' },
  { texto: 'cantar', tipo: 'verbo' },
  { texto: 'maravilloso', tipo: 'adjetivo' },
  { texto: 'carro', tipo: 'sustantivo' },
  { texto: 'reír', tipo: 'verbo' },
  { texto: 'brillante', tipo: 'adjetivo' },
  { texto: 'zapato', tipo: 'sustantivo' },
  { texto: 'nadar', tipo: 'verbo' },
  { texto: 'bonito', tipo: 'adjetivo' },
];

export default function ClasificaPalabras() {
  const [respuestas, setRespuestas] = useState({});

  const clasificar = (palabra, tipoElegido) => {
    setRespuestas((prev) => ({ ...prev, [palabra]: tipoElegido }));
  };

  const verificar = (palabra, tipo) => {
    return respuestas[palabra] === tipo;
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Clasifica las Palabras 📝</h2>
      <Row>
        {palabras.map(({ texto, tipo }) => (
          <Col sm={12} md={6} lg={4} key={texto}>
            <Card className="mb-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <strong>{texto}</strong>
                  <div>
                    {['sustantivo', 'verbo', 'adjetivo'].map((t) => (
                      <Button
                        key={t}
                        size="sm"
                        className="me-2"
                        variant={respuestas[texto] === t ? (t === tipo ? 'success' : 'danger') : 'outline-primary'}
                        onClick={() => clasificar(texto, t)}
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                </div>
                {respuestas[texto] && (
                  <Badge bg={verificar(texto, tipo) ? 'success' : 'danger'} className="mt-2">
                    {verificar(texto, tipo) ? 'Correcto' : 'Incorrecto'}
                  </Badge>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
