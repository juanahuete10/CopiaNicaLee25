import { Card, Col } from "react-bootstrap";

const TarjetaLeccion = ({ leccion }) => {
  return (
    <Col lg={3} md={4} sm={12} className="mb-4">
      <Card>
        {/* Mostrar imagen si existe */}
        {leccion.imagen && (
          <Card.Img variant="top" src={leccion.imagen} alt={leccion.tituloLeccion} />
        )}
        <Card.Body>
          {/* Mostrar título de la lección */}
          <Card.Title>{leccion.tituloLeccion}</Card.Title>

          {/* Mostrar contenido breve si es necesario */}
          <Card.Text>
            <strong>Nivel:</strong> {leccion.nivel} <br />
            <strong>Contenido:</strong> {leccion.contenido.substring(0, 100)}... <br />
            <strong>Ejercicios:</strong> {leccion.ejercicios.substring(0, 100)}... <br />
            <strong>Fecha de Publicación:</strong> {leccion.fechaPublicacion}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default TarjetaLeccion;
