import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import AbecedarioAE from '../JuegosInteractivos/AbecedarioAE';
import MemoriaLetras from '../JuegosInteractivos/MemoriaLetras';
import SonidosLetras from '../JuegosInteractivos/SonidosLetras';
import ActividadesPronunciacion from '../Pronunciacion/ActividadesPronunciacion';
import SonidosYPronunciacion from '../Pronunciacion/SonidosYPronunciacion';
import Nivel1AsociarImagen from '../JuegosInteractivos/Nivel1AsociarImagen';
import Nivel1LetraCorrecta from '../JuegosInteractivos/Nivel1LetraCorrecta';
import Nivel1RepetirPalabra from '../JuegosInteractivos/Nivel1RepetirPalabra';
import LeccionMatch from '../Lecciones/LeccionMatch';
import LeccionFill from '../Lecciones/LeccionFill';
import Biblioteca from './BibliotecaChat';

import CazaNumeroPrimo from '../JuegosInteractivos/CazaNumeroPrimo';
import OperacionesMatematicas from '../JuegosInteractivos/OperacionesMatematicas';
import RompecabezasGeometria from '../JuegosInteractivos/RompecabezasGeometria';
import EscapeRoomMatematica from '../JuegosInteractivos/EscapeRoomMatematica';
import SopaDeLetras from '../JuegosInteractivos/SopaDeLetras';
import TriviaFigurasGeometricas from '../JuegosInteractivos/TriviaFigurasGeometricas';

import JuegoMapasInteractivos from '../JuegosInteractivos/JuegoMapaInteractivo';
import TriviaGeografica from '../JuegosInteractivos/TriviaGeografica';
import ExploraTuPais from '../JuegosInteractivos/ExploraTuPais';
import CompletaPalabra from '../JuegosInteractivos/CompletaPalabra';
import DetectiveOrtografia from '../JuegosInteractivos/DetectiveOrtografia';
import LecturasInteractivas from '../JuegosInteractivos/LecturasInteractivas';
import ClasificaPalabras from '../JuegosInteractivos/ClasificaPalabras';

const levels = [
  { id: 1, label: 'Nivel 1', icon: 'bi bi-123' },
  { id: 2, label: 'Nivel 2', icon: 'bi bi-volume-up' },
  { id: 3, label: 'Nivel 3', icon: 'bi bi-image' },
 { id: 4, label: 'Nivel 4', icon: 'bi bi-book' },
  { id: 5, label: 'Nivel 5', icon: 'bi bi-calculator' },
  { id: 6, label: 'Nivel 6', icon: 'bi bi-map' },
];

const juegosPorNivel = {
  1: [
    {
      id: 'leccion1',
      nombre: 'Asociar Imagen',
      descripcion: 'Asocia imagen con las palabras.',
      icono: 'bi bi-image',
      componente: <Nivel1AsociarImagen />
    },
    {
      id: 'leccion2',
      nombre: 'Letras Correctas',
      descripcion: 'Puedes ver las letras correctas de tus lecciones.',
      icono: 'bi bi-alphabet',
      componente: <Nivel1LetraCorrecta />
    },
    {
      id: 'leccion3',
      nombre: 'Repetición de Palabras',
      descripcion: 'Puedes repetir palabras.',
      icono: 'bi bi-repeat',
      componente: <Nivel1RepetirPalabra />
    },
  ],

  2: [
    {
      id: 'pronunciacion1',
      nombre: 'Actividades de Pronunciación',
      descripcion: 'Escucha y repite palabras',
      icono: 'bi bi-mic',
      componente: <ActividadesPronunciacion />
    },
    {
      id: 'pronunciacion2',
      nombre: 'Sonidos y Pronunciación',
      descripcion: 'Relaciona sonidos con letras',
      icono: 'bi bi-volume-up',
      componente: <SonidosYPronunciacion />
    },
  ],

  3: [
    {
      id: 'leccion1',
      nombre: 'Unir Palabra con Imagen',
      descripcion: 'Asocia palabras con su imagen correspondiente.',
      icono: 'bi bi-link',
      componente: <LeccionMatch />
    },
    {
      id: 'leccion2',
      nombre: 'Seleccionar Palabra Correcta',
      descripcion: 'Completa la oración con la palabra correcta.',
      icono: 'bi bi-check-circle',
      componente: <LeccionFill />
    },
    {
      id: 'leccion3',
      nombre: 'Biblioteca NicaLee',
      descripcion: 'Explora cuentos, poemas y lecturas.',
      icono: 'bi bi-book',
      componente: <Biblioteca />
    },
  ],

  4: [
    {
      id: 'abc1',
      nombre: 'Abecedario A-E',
      descripcion: 'Aprende las letras A-E',
      icono: 'bi bi-book',
      componente: <AbecedarioAE />
    },
    {
      id: 'parejas1',
      nombre: 'Memoria de Letras',
      descripcion: 'Haz coincidir las letras',
      icono: 'bi bi-ui-checks',
      componente: <MemoriaLetras />
    },
    {
      id: 'sonidos1',
      nombre: 'Sonidos y Letras',
      descripcion: 'Relaciona letras con sonidos',
      icono: 'bi bi-ear',
      componente: <SonidosLetras />
    },
  ],

  5: [
    {
      id: 'mate1',
      nombre: 'Caza Números Primos',
      descripcion: 'Identifica números primos en un juego divertido.',
      icono: 'bi bi-target',
      componente: <CazaNumeroPrimo />
    },
    {
      id: 'mate2',
      nombre: 'Operaciones Matemáticas',
      descripcion: 'Practica sumas, restas, multiplicaciones y divisiones.',
      icono: 'bi bi-calculator',
      componente: <OperacionesMatematicas />
    },
    {
      id: 'mate3',
      nombre: 'Rompecabezas Geometría',
      descripcion: 'Arma figuras geométricas con piezas.',
      icono: 'bi bi-app',
      componente: <RompecabezasGeometria />
    },
    {
      id: 'mate4',
      nombre: 'Escape Room Lógica',
      descripcion: 'Resuelve acertijos lógicos para escapar.',
      icono: 'bi bi-door-open',
      componente: <EscapeRoomMatematica />
    },
    {
      id: 'mate5',
      nombre: 'Sopa de Letras',
      descripcion: 'Encuentra términos matemáticos en una sopa de letras.',
      icono: 'bi bi-grid',
      componente: <SopaDeLetras />
    },
    {
      id: 'mate6',
      nombre: 'Trivia de Figuras',
      descripcion: '¿Cuánto sabes de figuras geométricas? Descúbrelo.',
      icono: 'bi bi-question-circle',
      componente: <TriviaFigurasGeometricas />
    },
  ],

  6: [
    {
      id: 'geo1',
      nombre: 'Mapas Interactivos',
      descripcion: 'Explora mapas y aprende sobre geografía.',
      icono: 'bi bi-map',
      componente: <JuegoMapasInteractivos />
    },
    {
      id: 'geo2',
      nombre: 'Trivia Geográfica',
      descripcion: 'Responde preguntas sobre tu país y el mundo.',
      icono: 'bi bi-geo-alt',
      componente: <TriviaGeografica />
    },
    {
      id: 'geo3',
      nombre: 'Explora tu País',
      descripcion: 'Conoce departamentos y regiones de Nicaragua.',
      icono: 'bi bi-globe-americas',
      componente: <ExploraTuPais />
    },
    {
      id: 'leng1',
      nombre: 'Completa la Palabra',
      descripcion: 'Rellena letras faltantes para completar palabras.',
      icono: 'bi bi-pencil',
      componente: <CompletaPalabra />
    },
    {
      id: 'leng2',
      nombre: 'Detective de Ortografía',
      descripcion: 'Detecta errores ortográficos en oraciones.',
      icono: 'bi bi-search',
      componente: <DetectiveOrtografia />
    },
    {
      id: 'leng3',
      nombre: 'Lecturas Interactivas',
      descripcion: 'Lee y responde preguntas de comprensión.',
      icono: 'bi bi-book',
      componente: <LecturasInteractivas />
    },
    {
      id: 'leng4',
      nombre: 'Clasifica Palabras',
      descripcion: 'Clasifica palabras por tipo gramatical.',
      icono: 'bi bi-diagram-3',
      componente: <ClasificaPalabras />
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
                <div className="text-primary mt-3" style={{ fontSize: '3rem' }}>
                  <i className={lvl.icon}></i>
                </div>
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
                <Card className="shadow-sm h-100 text-center">
                  <div className="text-primary" style={{ fontSize: '3rem', marginTop: '1rem' }}>
                    <i className={juego.icono}></i>
                  </div>
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
        <div className="mt-4">
          <Button variant="warning" className="mb-3" onClick={() => setJuegoActivo(null)}>
            ← Volver a juegos
          </Button>
          {juegoActivo}
        </div>
      )}
    </Container>
  );
}
