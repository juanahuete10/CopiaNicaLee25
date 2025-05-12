import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import AbecedarioAE from '../JuegosInteractivos/AbecedarioAE';
import MemoriaLetras from '../JuegosInteractivos/MemoriaLetras';
import SonidosLetras from '../JuegosInteractivos/SonidosLetras';
import ActividadesPronunciacion from '../Pronunciacion/ActividadesPronunciacion';
import SonidosYPronunciacion from '../Pronunciacion/SonidosYPronunciacion';

const levels = [
  { id: 1, label: 'Nivel 1', icon: '/src/assets/nivel1.png' },
  { id: 2, label: 'Nivel 2', icon: '/src/assets/dos.png' },
  { id: 3, label: 'Nivel 3', icon: '/src/assets/nivel3.png' },
  { id: 4, label: 'Nivel 4', icon: '/src/assets/cuatro.png' },
  { id: 5, label: 'Nivel 5', icon: '/src/assets/numero-5.png' },
  { id: 6, label: 'Nivel 6', icon: '/src/assets/seis.png' },
];

const juegosPorNivel = {
  2: [
    {
      id: 'pronunciacion1',
      nombre: 'Actividades de Pronunciación',
      descripcion: 'Escucha y repite palabras',
      icono: '/src/assets/pronunciacion.png',
      componente: <ActividadesPronunciacion />
    },
    {
      id: 'pronunciacion2',
      nombre: 'Sonidos y Pronunciación',
      descripcion: 'Relaciona sonidos con letras',
      icono: '/src/assets/auricular.png',
      componente: <SonidosYPronunciacion />
    },
  ],
  4: [
    {
      id: 'abc1',
      nombre: 'Abecedario A-E',
      descripcion: 'Aprende las letras A-E',
      icono: '/src/assets/bloque-abc.png',
      componente: <AbecedarioAE />
    },
    {
      id: 'parejas1',
      nombre: 'Memoria de letras',
      descripcion: 'Haz coincidir las letras',
      icono: '/src/assets/alfabeto.png',
      componente: <MemoriaLetras />
    },
    {
      id: 'sonidos1',
      nombre: 'Sonidos y letras',
      descripcion: 'Relaciona letras con sonidos',
      icono: '/src/assets/pronunciacion.png',
      componente: <SonidosLetras />
    },
  ],
};

export default function Juegos() {
  const [nivelSeleccionado, setNivelSeleccionado] = useState(null);
  const [juegoActivo, setJuegoActivo] = useState(null);

  const juegos = juegosPorNivel[nivelSeleccionado] || [];

  return (
    <Container className="py-5 text-center">
      <h3 className="mb-4">Juegos NicaLee</h3>
      <p>Racha diaria: ⭐⭐⭐⭐ 10</p>

      {!nivelSeleccionado && (
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
                    onClick={() => setNivelSeleccionado(lvl.id)}
                  >
                    Ver juegos
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {nivelSeleccionado && !juegoActivo && (
        <>
          <Button variant="secondary" className="mb-3" onClick={() => setNivelSeleccionado(null)}>
            ← Volver a niveles
          </Button>
          <Row className="g-4 justify-content-center">
            {juegos.map((juego) => (
              <Col xs={12} sm={6} md={4} key={juego.id}>
                <Card className="shadow-sm h-100">
                  <Card.Img variant="top" src={juego.icono} />
                  <Card.Body>
                    <Card.Title>{juego.nombre}</Card.Title>
                    <Card.Text>{juego.descripcion}</Card.Text>
                    <Button variant="success" onClick={() => setJuegoActivo(juego.componente)}>
                      Jugar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {juegoActivo && (
        <>
          <Button variant="secondary" className="mb-3" onClick={() => setJuegoActivo(null)}>
            ← Volver a juegos
          </Button>
          <div className="text-start p-3 border rounded bg-light">{juegoActivo}</div>
        </>
      )}
    </Container>
  );
}
