// src/components/Lecciones/Biblioteca.jsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../database/firebaseConfig';

export default function Biblioteca() {
  const [cuentos, setCuentos]     = useState([]);
  const [poemas, setPoemas]       = useState([]);
  const [lecturas, setLecturas]   = useState([]);

  useEffect(() => {
    // ejemplo de colección en Firestore
    const fetch = async (col, setter) => {
      const snap = await getDocs(collection(db, col));
      setter(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetch('cuentos', setCuentos);
    fetch('poemas', setPoemas);
    fetch('lecturas', setLecturas);
  }, []);

  const renderSection = (title, items) => (
    <>
      <h4 className="mt-4">{title}</h4>
      <Row className="g-3">
        {items.map((it) => (
          <Col xs={6} md={3} key={it.id}>
            <Card className="shadow-sm">
              <Card.Img variant="top" src={it.portada} />
              <Card.Body>
                <Card.Title style={{ fontSize: '1rem' }}>{it.titulo}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );

  return (
    <Container className="py-5">
      <h3 className="text-center mb-4">Biblioteca NicaLee</h3>
      {renderSection('Cuentos', cuentos)}
      {renderSection('Poemas', poemas)}
      {renderSection('Lecturas', lecturas)}
    </Container>
  );
}
