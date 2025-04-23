// DashboardDocente.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUser, FaUsers, FaBookOpen, FaListUl } from 'react-icons/fa';

function DashboardDocente() {
  const navigate = useNavigate();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      alert("¡Conexión restablecida!");
    };

    const handleOffline = () => {
      setIsOffline(true);
      alert("Estás offline. Los cambios se sincronizarán cuando vuelvas a conectarte.");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <Container className="pt-5 mt-4 mb-5">
      <div className="text-center mb-4">
        <h2>👋 ¡Bienvenido al Panel del Docente!</h2>
        <p>Desde aquí puedes gestionar tu perfil, crear grupos y asignar lecciones.</p>
        {isOffline && <p className="text-danger fw-bold">Modo offline activado</p>}
      </div>

      <Row className="g-4 justify-content-center">
        <Col xs={12} sm={6} md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <FaUser size={50} className="mb-3 text-primary" />
              <Card.Title>Perfil del Docente</Card.Title>
              <Card.Text>Revisa y edita tu información personal.</Card.Text>
              <Button variant="primary" className="mt-auto w-100" onClick={() => navigate('/perfildocente')}>
                Ir al Perfil
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <FaUsers size={50} className="mb-3 text-success" />
              <Card.Title>Crear Grupo</Card.Title>
              <Card.Text>Crea un grupo nuevo para tus estudiantes.</Card.Text>
              <Button variant="success" className="mt-auto w-100" onClick={() => navigate('/creargrupo')}>
                Crear Grupo
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <FaBookOpen size={50} className="mb-3 text-info" />
              <Card.Title>Asignar Lecciones</Card.Title>
              <Card.Text>Selecciona un grupo y asigna lecciones.</Card.Text>
              <Button variant="info" className="mt-auto w-100" onClick={() => navigate('/listargrupo')}>
                Asignar Lecciones
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={6} lg={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center text-center">
              <FaListUl size={50} className="mb-3 text-warning" />
              <Card.Title>Mis Grupos</Card.Title>
              <Card.Text>Consulta los grupos que has creado.</Card.Text>
              <Button variant="warning" className="mt-auto w-100" onClick={() => navigate('/misgrupos')}>
                Ver Grupos
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default DashboardDocente;