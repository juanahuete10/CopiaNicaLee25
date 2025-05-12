import React, { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { cuentoEjemplo } from '../../data/cuentoData'; // Ruta a tu archivo de datos

const hablar = (texto) => {
  const utterance = new SpeechSynthesisUtterance(texto);
  utterance.lang = 'es-ES';
  window.speechSynthesis.speak(utterance);
};

const escucharPronunciacion = (fraseOriginal) => {
  const recognition = new window.webkitSpeechRecognition();
  recognition.lang = 'es-ES';
  recognition.start();
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    alert(`Dijiste: "${transcript}"\nFrase original: "${fraseOriginal}"`);
  };
};

const CuentosAnimados = () => {
  const [cuento, setCuento] = useState([]);

  const generarCuento = () => {
    setCuento(cuentoEjemplo.paginas); // Cargar el cuento completo
  };

  return (
    <Container className="py-4 text-center">
      <h2>📖 Cuento Animado Infantil</h2>

      {!cuento.length && (
        <Button onClick={generarCuento} className="my-4">
          Generar cuento
        </Button>
      )}

      {cuento.length > 0 && (
        <Row className="g-4 justify-content-center">
          {cuento.map((pagina, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card>
                <Card.Img variant="top" src={pagina.imagenUrl} />
                <Card.Body>
                  <Card.Text style={{ fontSize: '1.1rem' }}>{pagina.texto}</Card.Text>
                  <Button className="me-2" onClick={() => hablar(pagina.texto)}>🔊 Escuchar</Button>
                  <Button onClick={() => escucharPronunciacion(pagina.texto)}>🎤 Repetir frase</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CuentosAnimados;
