import React, { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const materias = ['matematica', 'lengua', 'naturales', 'sociales', 'ingles'];
const grados = ['Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto'];

// Datos de libros directamente en el componente
const librosData = {
  matematica: {
    primero: [
      {
        titulo: 'Libro Matematica 1ero',
        portada: '/src/assets/icons/Matematica1.jpeg',
        archivo: '/src/assets/libros/matematica/GUIA-METODOLOGICA_1er-Grado_20231122-1.pdf',
      },
      {
        titulo: 'Libro Matematica 2do',
        portada: '/src/assets/icons/matematica2.png',
        archivo: '/src/assets/libros/matematica/LIBRO-DE-TEXTO_Matematica-2do-Grado-2025.pdf',
      },
      {
        titulo: 'Libro Matematica 3ero',
        portada: '/src/assets/icons/Matematica 3.webp',
        archivo: '/src/assets/libros/matematica/LIBRO-DE-TEXTO_Matematica-3er-Grado-2025.pdf',
      },
      {
        titulo: 'Libro Matematica 4to',
        portada: '/src/assets/icons/matematica2.png',
        archivo: '/src/assets/libros/matematica/Guia-5to-MATEMATICA-BAJA-1.pdf',
      },

      {
        titulo: 'Libro Matematica 5to',
        portada: '/src/assets/icons/matematica2.png',
        archivo:  '/src/assets/libros/matematica/Guia-5to-MATEMATICA-BAJA-1.pdf',
      }
      
    ],
    segundo: [],
    tercero: [],
    cuarto: [],
    quinto: [],
    sexto: []
  },
  lengua: {
    primero: [],
    segundo: [],
    tercero: [],
    cuarto: [],
    quinto: [],
    sexto: []
  },
  naturales: { primero: [], segundo: [], tercero: [], cuarto: [], quinto: [], sexto: [] },
  sociales: { primero: [], segundo: [], tercero: [], cuarto: [], quinto: [], sexto: [] },
  ingles:    { primero: [], segundo: [], tercero: [], cuarto: [], quinto: [], sexto: [] }
};

export default function Biblioteca() {
  const [materia, setMateria] = useState(null);
  const [grado, setGrado] = useState(null);

  const volver = () => {
    if (grado) setGrado(null);
    else setMateria(null);
  };

  const libros = materia && grado
    ? librosData[materia]?.[grado.toLowerCase()] || []
    : [];

  return (
    <Container className="py-4">
      <h3 className="text-center mb-4">Biblioteca NicaLee</h3>

      {!materia && (
        <Row className="g-4 justify-content-center">
          {materias.map(m => (
            <Col xs={6} md={4} lg={3} key={m}>
              <Card className="text-center shadow-sm" onClick={() => setMateria(m)} style={{ cursor: 'pointer' }}>
                <Card.Body>
                  <img src={`/assets/icons/${m}.png`} alt={m} style={{ width: 60 }} />
                  <Card.Title className="mt-2">{m.charAt(0).toUpperCase() + m.slice(1)}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {materia && !grado && (
        <>
          <Button variant="secondary" onClick={volver} className="mb-3">← Volver a materias</Button>
          <h5 className="mb-3">Selecciona un grado para <strong>{materia}</strong></h5>
          <Row className="g-3">
            {grados.map(g => (
              <Col xs={6} md={4} lg={3} key={g}>
                <Card className="text-center shadow-sm" onClick={() => setGrado(g)} style={{ cursor: 'pointer' }}>
                  <Card.Body>
                    <Card.Title>{g} Grado</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {materia && grado && (
        <>
          <Button variant="secondary" onClick={volver} className="mb-3">← Volver a grados</Button>
          <h5 className="mb-4">{materia.charAt(0).toUpperCase() + materia.slice(1)} - {grado} Grado</h5>
          <Row className="g-3">
            {libros.length === 0 && <p>No hay libros disponibles.</p>}
            {libros.map((libro, idx) => (
              <Col xs={6} md={4} key={idx}>
                <Card className="shadow-sm h-100" style={{ cursor: 'pointer' }} onClick={() => window.open(libro.archivo, '_blank')}>
                  <Card.Img variant="top" src={libro.portada} />
                  <Card.Body>
                    <Card.Title style={{ fontSize: '1rem' }}>{libro.titulo}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}
    </Container>
  );
}
