import React, { useEffect, useState } from "react";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import {
  FaUserFriends,
  FaTools,
  FaSignInAlt,
  FaTimes,
  FaQuestionCircle,
  FaBookReader,
  FaHeart,
  FaClipboardList,
  FaSmile,
} from "react-icons/fa";
import logo from "../assets/LogoNicaLee.png";
import "../components/style/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".landing-page .reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.2 }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      {/* NAVBAR */}
      <Navbar expand="lg" fixed="top" className="lp-navbar">
        <Container>
          <Navbar.Brand className="lp-brand" onClick={() => scrollTo("hero")}>
            <img src={logo} alt="Logo NicaLee" className="lp-logo" loading="lazy" />
          </Navbar.Brand>
          <div className="d-none d-lg-block">
            <Nav className="lp-nav">
              <Nav.Link onClick={() => scrollTo("hero")}>Inicio</Nav.Link>
              <Nav.Link onClick={() => scrollTo("about")}>Sobre Nosotros</Nav.Link>
              <Nav.Link onClick={() => scrollTo("services")}>Características</Nav.Link>
              <Nav.Link onClick={() => scrollTo("benefitsFaq")}>Preguntas</Nav.Link>
              <Nav.Link onClick={() => navigate("/login")}>Ingresar</Nav.Link>
            </Nav>
          </div>
          <div className="d-lg-none">
            <Navbar.Toggle className="lp-toggle" onClick={() => setShowMenu(true)}>
              <HiOutlineMenuAlt1 size={24} />
            </Navbar.Toggle>
          </div>
        </Container>
      </Navbar>

      {/* MENU MÓVIL */}
      {showMenu && (
        <div className="lp-drawer-menu">
          <button className="lp-drawer-close" onClick={() => setShowMenu(false)}>
            <FaTimes size={20} />
          </button>
          <Nav className="lp-drawer-nav">
            <Nav.Link onClick={() => { scrollTo("hero"); setShowMenu(false); }}>
              <AiFillHome /> Inicio
            </Nav.Link>
            <Nav.Link onClick={() => { scrollTo("about"); setShowMenu(false); }}>
              <FaUserFriends /> Sobre Nosotros
            </Nav.Link>
            <Nav.Link onClick={() => { scrollTo("services"); setShowMenu(false); }}>
              <FaTools /> Características
            </Nav.Link>
            <Nav.Link onClick={() => { scrollTo("benefitsFaq"); setShowMenu(false); }}>
              <FaHeart /> Preguntas
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/inicionicalee")}> <FaSignInAlt /> Ingresar </Nav.Link>
          </Nav>
        </div>
      )}

      {/* HERO */}
      <section id="hero" className="lp-hero reveal">
        <div className="lp-hero-overlay"></div>
        <Container className="lp-hero-content text-center">
          <h1 className="lp-hero-title">Bienvenidos a NicaLee 📚</h1>
          <p className="lp-hero-subtitle">Descubrí el maravilloso mundo de la lectura y disfruta de los cuentos educativos para niñas y niños</p>
          <Button className="lp-hero-btn" onClick={() => navigate("/inicionicalee")}>Explorar Cuentos</Button>
        </Container>
      </section>

      
      <section id="about" className="lp-section lp-about reveal">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="lp-section-title">¿Quiénes somos?</h2>
              <p className="lp-section-text">
                En NicaLee creemos en el poder de la imaginación. Nuestra plataforma ofrece cuentos animados y educativos para que niñas y niños aprendan jugando. ¡Conectamos educación y diversión en cada historia!
              </p>
            </Col>
            <Col md={6} className="text-center">
              <img src="/cuento-ilustrado.webp" alt="Ilustración de cuentos" className="img-fluid rounded-4" loading="lazy" />
            </Col>
          </Row>
        </Container>
      </section>

      {/* CARACTERÍSTICAS */}
      <section id="services" className="lp-section lp-services reveal">
        <Container>
          <h2 className="lp-section-title text-center">Características Destacadas</h2>
          <Row className="lp-services-cards">
            <Col xs={6} md={4} className="mb-4">
              <div className="lp-card compact-card">
                <FaBookReader className="lp-card-icon-top" />
                <h4 className="lp-card-title">Cuentos Interactivos</h4>
                <p className="lp-card-text">Lectura animada para aprender jugando.</p>
              </div>
            </Col>
            <Col xs={6} md={4} className="mb-4">
              <div className="lp-card compact-card">
                <FaClipboardList className="lp-card-icon-top" />
                <h4 className="lp-card-title">Contenido Educativo</h4>
                <p className="lp-card-text">Basado en valores, ciencias y habilidades sociales.</p>
              </div>
            </Col>
            <Col xs={6} md={4} className="mb-4">
              <div className="lp-card compact-card">
                <FaSmile className="lp-card-icon-top" />
                <h4 className="lp-card-title">Diseño Amigable</h4>
                <p className="lp-card-text">Interfaz pensada para la niñez, colorida e intuitiva.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* PREGUNTAS Y BENEFICIOS */}
      <section id="benefitsFaq" className="lp-section lp-benefits-faq reveal">
        <Container>
          <h2 className="lp-section-title text-center">Preguntas Frecuentes</h2>
          <Row className="gy-4 mt-4">
            <Col md={6}>
              <div className="lp-card-info">
                <h3><FaHeart /> Beneficios</h3>
                <ul className="lp-check-list">
                  <li>Fomenta la lectura desde edades tempranas.</li>
                  <li>Estimula el pensamiento crítico y la creatividad.</li>
                  <li>Facilita el aprendizaje con cuentos interactivos.</li>
                </ul>
              </div>
            </Col>
            <Col md={6}>
              <div className="lp-card-info">
                <h3><FaQuestionCircle /> Preguntas</h3>
                <div className="lp-faq-item">
                  <strong>¿Es gratis?</strong>
                  <p>Sí. Podés crear una cuenta y acceder a cuentos gratuitos.</p>
                </div>
                <div className="lp-faq-item">
                  <strong>¿Para qué edades está pensado?</strong>
                  <p>Para niñas y niños de 4 a 10 años aproximadamente.</p>
                </div>
                <div className="lp-faq-item">
                  <strong>¿Puedo usarlo sin conexión?</strong>
                  <p>Si, puedes acceder a algunas funcionalidades sin necesidad de acceso offline.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer reveal">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} className="text-center">
              <h5>Contáctanos</h5>
              <p className="lp-footer-contact">
                <span>Email: contacto@nicalee.com</span> | <span>Tel: +505 8518-0717</span> | <span> Juigalpa, Nicaragua</span>
              </p>
              <p className="lp-footer-copy">
                © {new Date().getFullYear()} NicaLee. Todos los derechos reservados.
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default LandingPage;