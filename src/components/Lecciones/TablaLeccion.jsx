import React from "react";
import { Table, Button, Image } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

// Función para convertir el Timestamp de Firebase a una fecha legible (YYYY-MM-DD)
const convertirTimestampAFecha = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString(); // Convertir a formato de fecha legible
  }
  return "No disponible"; // Retorna un valor por defecto si no es un Timestamp válido
};

const TablaLeccion = ({ lecciones, openEditModal, openDeleteModal }) => {
  // Si no hay lecciones, mostramos un mensaje indicando que no hay datos disponibles
  if (!lecciones || lecciones.length === 0) {
    return <p>No hay lecciones disponibles.</p>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Imagen</th>
          <th>Título</th>
          <th>Nivel</th>
          <th>Contenido</th>
          <th>Ejercicios</th>
          <th>Fecha de Publicación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {lecciones.map((leccion) => (
          <tr key={leccion.id}>
            <td>
              {leccion.imagen ? (
                <Image src={leccion.imagen} width="50" height="50" />
              ) : (
                <span>No disponible</span> // Si no hay imagen, mostramos un texto
              )}
            </td>
            <td>{leccion.tituloLeccion}</td>
            <td>{leccion.nivel}</td>
            <td>{leccion.contenido || "No disponible"}</td> {/* Muestra el contenido o "No disponible" */}
            <td>{leccion.ejercicios || "No disponible"}</td> {/* Muestra los ejercicios o "No disponible" */}
            <td>
              {/* Convertimos la fecha de publicación de Timestamp a Date */}
              {leccion.fechaPublicacion
                ? convertirTimestampAFecha(leccion.fechaPublicacion)
                : "No disponible"}
            </td>
            <td>
              <Button
                variant="outline-warning"
                size="sm"
                className="me-2"
                onClick={() => openEditModal(leccion)}
              >
                <i className="bi bi-pencil"></i> Editar
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => openDeleteModal(leccion)}
              >
                <i className="bi bi-trash"></i> Eliminar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TablaLeccion;
