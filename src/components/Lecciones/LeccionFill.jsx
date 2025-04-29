import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Row, Col, Alert, Image } from 'react-bootstrap';

// Lista de oraciones con sus respuestas, opciones e imagen
const sentencePool = [
  {
    sentence: 'La niña está _____ .',
    options: ['Jugando', 'Corriendo', 'Comiendo', 'Llorando'],
    answer: 'Corriendo',
    img: '/src/assets/perseguir.png',
  },
  {
    sentence: 'El perro está _____ .',
    options: ['Durmiendo', 'Ladrando', 'Bañando', 'Saltando'],
    answer: 'Durmiendo',
    img: '/src/assets/perro-durmiendo.png',
  },
  {
    sentence: 'El gato está  .',
    options: ['Comiendo', 'Cantando', 'Jugando', 'Bailando'],
    answer: 'Jugando',
    img: '/src/assets/pegatina.png',
  },
];

export default function LeccionFill() {
  const [current, setCurrent] = useState(null);
  const [chosen, setChosen] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * sentencePool.length);
    setCurrent(sentencePool[randomIndex]);
  }, []);

  const handleClick = (opt) => {
    setChosen(opt);
    setResult(opt === current.answer ? 'correcto' : 'incorrecto');
  };

  const handleNext = () => {
    const randomIndex = Math.floor(Math.random() * sentencePool.length);
    setCurrent(sentencePool[randomIndex]);
    setChosen('');
    setResult('');
  };

  if (!current) return <p>Cargando...</p>;

  return (
    <Container className="py-5 text-center">
      <h3 className="mb-4">Seleccione la palabra correcta</h3>

      <Image
        src={current.img}
        alt="Ilustración"
        fluid
        style={{ maxHeight: '220px', objectFit: 'contain', marginBottom: '20px' }}
      />

      <Card className="p-4 mb-4">
        <Card.Text style={{ fontSize: '1.4rem' }}>
          {current.sentence.replace('_____', <b>_____</b>)}
        </Card.Text>
      </Card>

      <Row className="g-3 justify-content-center">
        {current.options.map((opt) => (
          <Col xs={6} md={3} key={opt}>
            <Button
              variant={
                chosen
                  ? opt === current.answer
                    ? 'success'
                    : chosen === opt
                    ? 'danger'
                    : 'outline-secondary'
                  : 'outline-primary'
              }
              className="w-100"
              onClick={() => handleClick(opt)}
              disabled={!!chosen}
            >
              {opt}
            </Button>
          </Col>
        ))}
      </Row>

      {result && (
        <Alert variant={result === 'correcto' ? 'success' : 'danger'} className="mt-4">
          {result === 'correcto' ? '✅ ¡Muy bien! Has acertado.' : '❌ Intenta otra vez.'}
        </Alert>
      )}

      {result === 'correcto' && (
        <Button className="mt-3" onClick={handleNext}>
          👉 Siguiente oración
        </Button>
      )}
    </Container>
  );
}
