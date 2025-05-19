import React, { useEffect, useState } from 'react';
import { Container, Nav, Card, Button, Spinner } from 'react-bootstrap';
import { firestore, auth } from '../../database/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const MisProgresos = () => {
  const [seccionActiva, setSeccionActiva] = useState(null);
  const [progreso, setProgreso] = useState(null);
  const [loading, setLoading] = useState(true);

  const uid = auth.currentUser?.uid;

  useEffect(() => {
/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Obtiene los progresos del usuario actual de la base de datos
   * y los guarda en el estado local
   * @returns {undefined}
/*******  ac407394-00eb-400b-bc06-09f31285e27f  *******/
    const obtenerDatos = async () => {
      if (!uid) return;
      try {
        const docRef = doc(firestore, 'progresos', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProgreso(docSnap.data());
        } else {
          console.log("No se encontraron progresos");
        }
      } catch (error) {
        console.error("Error obteniendo progreso:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, [uid]);

  const renderContenido = () => {
    if (loading) {
      return (
        <Card.Body className="text-center">
          <Spinner animation="border" variant="primary" />
        </Card.Body>
      );
    }

    if (!progreso) {
      return (
        <Card.Body>
          <p>No se encontraron progresos aún.</p>
        </Card.Body>
      );
    }

    switch (seccionActiva) {
      case 'juegos':
        return (
          <Card.Body>
            <h5>Juegos Completados</h5>
            <ul>
              {progreso.juegosCompletados?.map((juego, index) => (
                <li key={index}>{juego.nombre} - Nivel {juego.nivel}</li>
              ))}
            </ul>
          </Card.Body>
        );
      case 'puntuaciones':
        return (
          <Card.Body>
            <h5>Puntuaciones / Estrellas Obtenidas</h5>
            {progreso.puntuaciones?.map((p, i) => (
              <p key={i}>⭐️ x{p.estrellas} en {p.juego}</p>
            ))}
          </Card.Body>
        );
      case 'tiempo':
        return (
          <Card.Body>
            <h5>Tiempo Jugado</h5>
            <p>Total: {progreso.tiempoTotal} minutos</p>
            {progreso.tiempoPorNivel?.map((t, i) => (
              <p key={i}>Nivel {t.nivel}: {t.minutos} minutos</p>
            ))}
          </Card.Body>
        );
      case 'errores':
        return (
          <Card.Body>
            <h5>Errores Cometidos / Aciertos</h5>
            <p>Errores: {progreso.errores}</p>
            <p>Aciertos: {progreso.aciertos}</p>
          </Card.Body>
        );
      default:
        return (
          <Card.Body>
            <p>Selecciona una opción para ver tus progresos.</p>
          </Card.Body>
        );
    }
  };

  return (
    <Container className="py-5">
      <h3 className="mb-4 text-center">Mis Progresos</h3>
      <Nav
        variant="pills"
        className="justify-content-center mb-4"
        activeKey={seccionActiva}
        onSelect={(selectedKey) => setSeccionActiva(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="juegos">Juegos Completados</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="puntuaciones">Puntuaciones</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="tiempo">Tiempo Jugado</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="errores">Errores / Acertados</Nav.Link>
        </Nav.Item>
      </Nav>

      <Card className="mx-auto" style={{ maxWidth: '600px' }}>
        {renderContenido()}
      </Card>

      {seccionActiva && (
        <div className="text-center mt-3">
          <Button variant="primary" disabled>
            Descargar Progreso (PDF)
          </Button>
        </div>
      )}
    </Container>
  );
};

export default MisProgresos;
