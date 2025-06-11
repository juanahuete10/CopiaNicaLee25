import React, { useState } from 'react';
import { Container, Form, Button, Spinner, Row, Col, Card, Alert } from 'react-bootstrap';

export default function BibliotecaChat() {
  const [consulta, setConsulta] = useState('');
  const [cargando, setCargando] = useState(false);
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState('');

  const handleBuscar = async () => {
    const consultaLower = consulta.trim().toLowerCase();

    setError('');
    setCargando(true);
    setLibros([]);

    try {
      let url;

      if (consultaLower === '' || consultaLower === 'primaria') {
        // Buscar todos los libros de primaria sin filtros
        const baseUrl = 'https://www.mined.gob.ni/biblioteca/product-category/primaria/?per_page=96';
        const proxyUrl = 'https://corsproxy.io/?';
        url = `${proxyUrl}${encodeURIComponent(baseUrl)}`;
      } else {
        // Buscar por materia y grado
        const partes = consultaLower.split(' ');
        if (partes.length < 2) {
          setError('Formato: <materia> <grado> (ej. matemática 3)');
          setCargando(false);
          return;
        }
        const [materia, grado] = partes;
        const baseUrl = `https://www.mined.gob.ni/biblioteca/product-category/${materia}/?per_page=96&filter_grado=${grado}`;
        const proxyUrl = 'https://corsproxy.io/?';
        url = `${proxyUrl}${encodeURIComponent(baseUrl)}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Error en la respuesta');

      const html = await res.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const items = doc.querySelectorAll('.products .product');

      if (items.length === 0) {
        setError('No se encontraron libros para esa consulta.');
        setLibros([]);
        return;
      }

      const nuevos = Array.from(items).map(item => ({
        title: item.querySelector('.woocommerce-loop-product__title')?.textContent.trim() || 'Sin título',
        link: item.querySelector('a')?.href || '#',
        img: item.querySelector('img')?.src || 'https://via.placeholder.com/180x240?text=Sin+imagen',
      })).slice(0, 12);

      setLibros(nuevos);
    } catch (e) {
      console.error(e);
      setError('Error al conectar con MINED o problema de CORS.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container className="py-4">
      <h3 className="text-center mb-4">📚 Biblioteca MINED (chat)</h3>
      <Form onSubmit={e => { e.preventDefault(); handleBuscar(); }}>
        <Form.Group className="mb-3">
          <Form.Label>🤖 Escríbenos materia y grado (ej. "matemática 2") o escribe "primaria" para todos los libros</Form.Label>
          <Form.Control
            value={consulta}
            onChange={e => setConsulta(e.target.value)}
            placeholder='ej. "matematica 1" o "primaria"'
            disabled={cargando}
          />
        </Form.Group>
        <div className="text-center mb-3">
          <Button type="submit" disabled={cargando}>
            {cargando ? <Spinner animation="border" size="sm" /> : 'Buscar Libros'}
          </Button>
        </div>
      </Form>

      {error && <Alert variant="warning">{error}</Alert>}

      <Row className="g-4 justify-content-center">
        {libros.map((lib, i) => (
          <Col xs={6} md={4} lg={3} key={i}>
            <Card className="h-100 text-center shadow-sm">
              <a
                href={lib.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Card.Img src={lib.img} style={{ height: 180, objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title style={{ fontSize: '1rem' }}>{lib.title}</Card.Title>
                </Card.Body>
              </a>
              <Button variant="outline-primary" size="sm" href={lib.link} target="_blank" className="mb-2">
                Ver PDF
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
