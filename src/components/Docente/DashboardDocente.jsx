// src/components/LayoutDocente.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Navbar, Nav, ListGroup } from 'react-bootstrap';
import { FaUser, FaUsers, FaBookOpen, FaListUl, FaChartBar } from 'react-icons/fa';

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
    <>
      {/* Navbar superior */}
      <Navbar bg="light" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand className="fw-bold">📚 NicaLee Docente</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-docente" />
          <Navbar.Collapse id="navbar-docente">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate('/dashboarddocente')}>Inicio</Nav.Link>
              <Nav.Link onClick={() => navigate('/perfildocente')}>Perfil</Nav.Link>
              <Nav.Link onClick={() => navigate('/creargrupo')}>Crear Grupo</Nav.Link>
              <Nav.Link onClick={() => navigate('/listargrupos')}>Asignar Lecciones</Nav.Link>
              <Nav.Link onClick={() => navigate('/misgrupos')}>Mis Grupos</Nav.Link>
              <Nav.Link onClick={() => navigate('/estadisticasdocente')}>Estadísticas</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Layout con Sidebar y Contenido del Dashboard */}
      <Container fluid className="mt-3">
        <Row>
          {/* Sidebar lateral izquierdo */}
          <Col xs={12} md={3} lg={2} className="bg-light p-3 border-end" style={{ minHeight: '100vh' }}>
            <ListGroup variant="flush">
              <ListGroup.Item action onClick={() => navigate('/dashboarddocente')}>
                <FaUser className="me-2" /> Inicio
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => navigate('/perfildocente')}>
                <FaUser className="me-2" /> Perfil
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => navigate('/creargrupo')}>
                <FaUsers className="me-2" /> Crear Grupo
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => navigate('/listargrupos')}>
                <FaBookOpen className="me-2" /> Asignar Lecciones
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => navigate('/misgrupos')}>
                <FaListUl className="me-2" /> Mis Grupos
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => navigate('/estadisticasdocente')}>
                <FaChartBar className="me-2" /> Estadísticas
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Contenido principal: Dashboard */}
          <Col xs={12} md={9} lg={10} className="p-4">
            <div className="text-center mb-4">
              <h2>¡Bienvenido Docente!</h2>
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
                    <Button variant="info" className="mt-auto w-100" onClick={() => navigate('/listargrupos')}>
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

              <Col xs={12} sm={6} md={6} lg={4}>
                <Card className="shadow-sm h-100">
                  <Card.Body className="d-flex flex-column align-items-center text-center">
                    <FaChartBar size={50} className="mb-3 text-secondary" />
                    <Card.Title>Estadísticas</Card.Title>
                    <Card.Text>Consulta el rendimiento y progreso.</Card.Text>
                    <Button variant="secondary" className="mt-auto w-100" onClick={() => navigate('/estadisticasdocente')}>
                      Ver Estadísticas
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default DashboardDocente;
