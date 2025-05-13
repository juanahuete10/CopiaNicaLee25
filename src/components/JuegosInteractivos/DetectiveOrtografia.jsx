import React, { useState } from 'react';
import { Button, Form, Alert, Container, Row, Col, Card } from 'react-bootstrap';
import { CheckCircle, ArrowRightCircle, Pencil, HouseDoor, Sun, Leaf, PersonFill, MusicNoteBeamed, Book, Flower, Fire, CloudSun, Tree, Car, Bell, XCircle } from 'react-bootstrap-icons';

const frases = [
  { texto: 'El gato se acuesta en la ___.', correcta: 'alfombra', icono: 'cat' },
  { texto: 'María ___ una carta a su amiga.', correcta: 'escribió', icono: 'pencil' },
  { texto: 'El sol ___ todos los días.', correcta: 'brilla', icono: 'sun' },
  { texto: 'El perro corre en el ___.', correcta: 'parque', icono: 'house-door' },
  { texto: 'Ana ___ un regalo para su cumpleaños.', correcta: 'recibió', icono: 'gift' },
  { texto: 'La luna ___ por la noche.', correcta: 'brilla', icono: 'sun' },
  { texto: 'Carlos ___ a la escuela cada día.', correcta: 'camina', icono: 'person-fill' },
  { texto: 'El pájaro ___ en el árbol.', correcta: 'canta', icono: 'music-note-beamed' },
  { texto: 'La abuela ___ a sus nietos.', correcta: 'cuenta', icono: 'book' },
  { texto: 'El niño ___ mucho al jugar.', correcta: 'sonríe', icono: 'smile' },
  { texto: 'María ___ una flor en el jardín.', correcta: 'planta', icono: 'flower' },
  { texto: 'El maestro ___ a los estudiantes.', correcta: 'enseña', icono: 'book' },
  { texto: 'La mamá ___ a su hijo.', correcta: 'abraza', icono: 'person-fill' },
  { texto: 'El río ___ por las montañas.', correcta: 'fluye', icono: 'cloud-sun' },
  { texto: 'El tren ___ muy rápido.', correcta: 'viaja', icono: 'car' },
  { texto: 'El árbol ___ hojas verdes.', correcta: 'tiene', icono: 'leaf' },
  { texto: 'Nosotros ___ en el parque.', correcta: 'jugamos', icono: 'person-fill' },
  { texto: 'Ella ___ un libro interesante.', correcta: 'lee', icono: 'book' },
  { texto: 'El coche ___ por la carretera.', correcta: 'pasa', icono: 'car' },
  { texto: 'El sol ___ en el cielo.', correcta: 'brilla', icono: 'sun' },
  { texto: 'El elefante ___ por la selva.', correcta: 'camina', icono: 'person-fill' },
  { texto: 'La pelota ___ por el aire.', correcta: 'suelta', icono: 'cloud-sun' },
  { texto: 'Juan ___ una sopa caliente.', correcta: 'come', icono: 'food' },
  { texto: 'Las estrellas ___ por la noche.', correcta: 'aparecen', icono: 'star' },
  { texto: 'El árbol ___ frutos.', correcta: 'da', icono: 'tree' },
  { texto: 'El viento ___ las hojas de los árboles.', correcta: 'mueve', icono: 'wind' },
  { texto: 'Los niños ___ juegos divertidos.', correcta: 'disfrutan', icono: 'music-note-beamed' },
  { texto: 'El perro ___ de la casa.', correcta: 'sale', icono: 'house-door' },
  { texto: 'María ___ muchas fotos.', correcta: 'toma', icono: 'camera' },
  { texto: 'El león ___ en la selva.', correcta: 'vive', icono: 'lion' },
  { texto: 'El tren ___ a gran velocidad.', correcta: 'avanza', icono: 'car' },
  { texto: 'El fuego ___ en la fogata.', correcta: 'arde', icono: 'fire' },
  { texto: 'La nube ___ por el cielo.', correcta: 'flota', icono: 'cloud-sun' }
];

export default function DetectiveOrtografia() {
  const [indice, setIndice] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState('');
  const [resultado, setResultado] = useState(null);

  const respuestasPosibles = () => {
    const correcta = frases[indice].correcta;
    const respuestas = [correcta];
    
    // Generamos 3 respuestas aleatorias
    while (respuestas.length < 4) {
      const random = frases[Math.floor(Math.random() * frases.length)].correcta;
      if (!respuestas.includes(random)) {
        respuestas.push(random);
      }
    }
    
    // Mezclamos las respuestas
    return respuestas.sort(() => Math.random() - 0.5);
  };

  const verificar = () => {
    const correcta = frases[indice].correcta.toLowerCase();
    const usuario = respuestaSeleccionada.trim().toLowerCase();
    setResultado(usuario === correcta ? '¡Correcto!' : `Incorrecto. Era: ${correcta}`);
  };

  const siguiente = () => {
    setIndice((prev) => (prev + 1) % frases.length);
    setRespuestaSeleccionada('');
    setResultado(null);
  };

  const obtenerIcono = (icono) => {
    switch(icono) {
      case 'cat':
        return <img src="https://example.com/cat-icon.png" alt="Gato" style={{ width: '30px' }} />;
      case 'pencil':
        return <Pencil size={30} />;
      case 'sun':
        return <Sun size={30} />;
      case 'house-door':
        return <HouseDoor size={30} />;
      case 'flower':
        return <Flower size={30} />;
      case 'music-note-beamed':
        return <MusicNoteBeamed size={30} />;
      case 'person-fill':
        return <PersonFill size={30} />;
      case 'book':
        return <Book size={30} />;
      case 'smile':
        return <img src="https://example.com/smile-icon.png" alt="Sonrisa" style={{ width: '30px' }} />;
      case 'cloud-sun':
        return <CloudSun size={30} />;
      case 'car':
        return <Car size={30} />;
      case 'star':
        return <img src="https://example.com/star-icon.png" alt="Estrella" style={{ width: '30px' }} />;
      case 'wind':
        return <img src="https://example.com/wind-icon.png" alt="Viento" style={{ width: '30px' }} />;
      case 'food':
        return <img src="https://example.com/food-icon.png" alt="Comida" style={{ width: '30px' }} />;
      case 'camera':
        return <img src="https://example.com/camera-icon.png" alt="Cámara" style={{ width: '30px' }} />;
      case 'lion':
        return <img src="https://example.com/lion-icon.png" alt="León" style={{ width: '30px' }} />;
      case 'fire':
        return <Fire size={30} />;
      default:
        return null;
    }
  };

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Detective de Ortografía 🕵️‍♂️</h2>
      <Row>
        <Col xs={12} md={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="text-center">Completa la frase:</h5>
              <div className="d-flex justify-content-center align-items-center">
                {obtenerIcono(frases[indice].icono)}
                <p className="text-center ms-3">{frases[indice].texto.replace('___', '_________')}</p>
              </div>

              <div className="d-flex flex-column align-items-center">
                {respuestasPosibles().map((respuesta, index) => (
                  <Form.Check 
                    key={index}
                    type="radio"
                    label={respuesta}
                    name="respuesta"
                    value={respuesta}
                    onChange={(e) => setRespuestaSeleccionada(e.target.value)}
                    checked={respuestaSeleccionada === respuesta}
                  />
                ))}
              </div>

              <div className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  onClick={verificar}
                  className="me-2 d-flex align-items-center"
                >
                  <CheckCircle className="me-1" />
                  Verificar
                </Button>
                <Button
                  variant="secondary"
                  onClick={siguiente}
                  className="d-flex align-items-center"
                >
                  <ArrowRightCircle className="me-1" />
                  Siguiente
                </Button>
              </div>

              {resultado && (
                <Alert variant={resultado === '¡Correcto!' ? 'success' : 'danger'} className="mt-3 text-center">
                  {resultado}
                  {resultado !== '¡Correcto!' && (
                    <XCircle className="ms-2" />
                  )}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
