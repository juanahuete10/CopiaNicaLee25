// src/components/LayoutDocente.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
  ListGroup,
} from 'react-bootstrap';
import {
  FaUser,
  FaUsers,
  FaBookOpen,
  FaListUl,
  FaChartBar,
  FaArrowLeft,
  FaBars,
  FaTimes,
} from 'react-icons/fa';

function DashboardDocente() {
  const navigate = useNavigate();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      alert('¡Conexión restablecida!');
    };

    const handleOffline = () => {
      setIsOffline(true);
      alert('Estás offline. Los cambios se sincronizarán cuando vuelvas a conectarte.');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

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

      {/* Botón de regreso */}
      <Container fluid className="mt-1 mb-3">
        <div
          style={{
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#000',
            fontWeight: '500',
            marginBottom: '15px',
          }}
          onClick={() => navigate('/formulariodocente')}
          aria-label="Regresar al formulario docente"
        >
          <FaArrowLeft size={20} />
          <span></span>
        </div>
      </Container>

      {/* Layout con fondo degradado y sidebar */}
      <Container
        fluid
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(180deg, #9DE1F3 0%, #FFFFFF 100%)',
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Row>
          {/* Sidebar lateral izquierdo */}
          <Col
            xs={sidebarOpen ? 12 : 1}
            md={sidebarOpen ? 3 : 1}
            lg={sidebarOpen ? 2 : 1}
            className="p-3 border-end d-flex flex-column"
            style={{
              minHeight: '100vh',
              backgroundColor: '#fff',
              transition: 'width 0.3s ease',
              overflowX: 'hidden',
              position: 'relative',
            }}
          >
            {/* Botón para abrir/cerrar sidebar */}
            <Button
              variant="light"
              onClick={toggleSidebar}
              style={{
                position: 'absolute',
                top: 10,
                right: sidebarOpen ? 10 : 'unset',
                left: sidebarOpen ? 'unset' : 5,
                borderRadius: '50%',
                width: 35,
                height: 35,
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 0 5px rgba(0,0,0,0.1)',
                zIndex: 10,
              }}
              aria-label={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </Button>

            {/* Lista de navegación */}
            <ListGroup variant="flush" style={{ marginTop: 50, width: '100%' }}>
              <ListGroup.Item
                action
                onClick={() => navigate('/dashboarddocente')}
                className="d-flex align-items-center"
              >
                <FaUser className="me-2" size={20} />
                {sidebarOpen && 'Inicio'}
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => navigate('/perfildocente')}
                className="d-flex align-items-center"
              >
                <FaUser className="me-2" size={20} />
                {sidebarOpen && 'Perfil'}
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => navigate('/creargrupo')}
                className="d-flex align-items-center"
              >
                <FaUsers className="me-2" size={20} />
                {sidebarOpen && 'Crear Grupo'}
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => navigate('/listargrupos')}
                className="d-flex align-items-center"
              >
                <FaBookOpen className="me-2" size={20} />
                {sidebarOpen && 'Asignar Lecciones'}
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => navigate('/misgrupos')}
                className="d-flex align-items-center"
              >
                <FaListUl className="me-2" size={20} />
                {sidebarOpen && 'Mis Grupos'}
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => navigate('/estadisticasdocente')}
                className="d-flex align-items-center"
              >
                <FaChartBar className="me-2" size={20} />
                {sidebarOpen && 'Estadísticas'}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Contenido principal */}
          <Col
            xs={12}
            md={sidebarOpen ? 9 : 11}
            lg={sidebarOpen ? 10 : 11}
            className="p-4"
            style={{ transition: 'all 0.3s ease' }}
          >
            <div className="text-center mb-4">
              <h2>¡Bienvenido Docente!</h2>
              <p>Desde aquí puedes gestionar tu perfil, crear grupos y asignar lecciones.</p>
              {isOffline && <p className="text-danger fw-bold">Modo offline activado</p>}
            </div>

            <Row className="g-4 justify-content-center">
              {/* Perfil del Docente */}
              <Col xs={12} sm={6} md={6} lg={4}>
                <Card className="shadow-sm h-100">
                  <Card.Body className="d-flex flex-column align-items-center text-center">
                    <FaUser size={50} className="mb-3 text-primary" />
                    <Card.Title>Perfil del Docente</Card.Title>
                    <Card.Text>Revisa y edita tu información personal.</Card.Text>
                    <Button
                      variant="primary"
                      className="mt-auto w-100"
                      onClick={() => navigate('/perfildocente')}
                    >
                      Ir al Perfil
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              {/* Crear Grupo */}
              <Col xs={12} sm={6} md={6} lg={4}>
                <Card className="shadow-sm h-100">
                  <Card.Body className="d-flex flex-column align-items-center text-center">
                    <FaUsers size={50} className="mb-3 text-success" />
                    <Card.Title>Crear Grupo</Card.Title>
                    <Card.Text>Crea un grupo nuevo para tus estudiantes.</Card.Text>
                    <Button
                      variant="success"
                      className="mt-auto w-100"
                      onClick={() => navigate('/creargrupo')}
                    >
                      Crear Grupo
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              {/* Asignar Lecciones */}
              <Col xs={12} sm={6} md={6} lg={4}>
                <Card className="shadow-sm h-100">
                  <Card.Body className="d-flex flex-column align-items-center text-center">
                    <FaBookOpen size={50} className="mb-3 text-info" />
                    <Card.Title>Asignar Lecciones</Card.Title>
                    <Card.Text>Selecciona un grupo y asigna lecciones.</Card.Text>
                    <Button
                      variant="info"
                      className="mt-auto w-100"
                      onClick={() => navigate('/listargrupos')}
                    >
                      Asignar Lecciones
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              {/* Mis Grupos */}
              <Col xs={12} sm={6} md={6} lg={4}>
                <Card className="shadow-sm h-100">
                  <Card.Body className="d-flex flex-column align-items-center text-center">
                    <FaListUl size={50} className="mb-3 text-warning" />
                    <Card.Title>Mis Grupos</Card.Title>
                    <Card.Text>Consulta los grupos que has creado.</Card.Text>
                    <Button
                      variant="warning"
                      className="mt-auto w-100"
                      onClick={() => navigate('/misgrupos')}
                    >
                      Ver Grupos
                    </Button>
                  </Card.Body>
                </Card>
              </Col>

              {/* Estadísticas */}
              <Col xs={12} sm={6} md={6} lg={4}>
                <Card className="shadow-sm h-100">
                  <Card.Body className="d-flex flex-column align-items-center text-center">
                    <FaChartBar size={50} className="mb-3 text-secondary" />
                    <Card.Title>Estadísticas</Card.Title>
                    <Card.Text>Consulta el rendimiento y progreso.</Card.Text>
                    <Button
                      variant="secondary"
                      className="mt-auto w-100"
                      onClick={() => navigate('/estadisticasdocente')}
                    >
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
