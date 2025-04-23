import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

// Función para convertir un Timestamp de Firebase a una fecha legible (YYYY-MM-DD)
const convertirTimestampAFecha = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return date.toISOString().split("T")[0]; // Convertir a formato 'YYYY-MM-DD'
  }
  return ""; // Retorna una cadena vacía si no es un Timestamp válido
};

const ModalRegistroLeccion = ({
  showModal,
  setShowModal,
  nuevaLeccion,
  handleInputChange,
  handleImageChange,
  handleAddLeccion
}) => {
  // Este estado maneja el estado local del modal.
  const [localShowModal, setLocalShowModal] = useState(showModal);

  // Sincronizar el estado `showModal` con el estado local
  useEffect(() => {
    setLocalShowModal(showModal);
  }, [showModal]);

  // Asegúrate de que el campo "fechaPublicacion" siempre esté en el formato adecuado
  const [fechaPublicacion, setFechaPublicacion] = useState(
    nuevaLeccion?.fechaPublicacion
      ? convertirTimestampAFecha(nuevaLeccion.fechaPublicacion)
      : ""
  );

  // Función para manejar el cambio de la fecha
  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setFechaPublicacion(selectedDate); // Actualizamos el estado local
    handleInputChange({
      target: {
        name: "fechaPublicacion",
        value: selectedDate // La fecha seleccionada en formato 'YYYY-MM-DD'
      }
    });
  };

  // Niveles predefinidos
  const niveles = [
    "Preescolar",
    "Primero",
    "Segundo",
    "Tercero",
    "Cuarto",
    "Quinto",
    "Sexto"
  ];

  return (
    <Modal show={localShowModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Lección</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Título de la Lección</Form.Label>
            <Form.Control
              type="text"
              name="tituloLeccion"
              value={nuevaLeccion?.tituloLeccion || ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Nivel</Form.Label>
            <Form.Select
              name="nivel"
              value={nuevaLeccion?.nivel || ""}
              onChange={handleInputChange}
              required
            >
              <option value="">Seleccione un nivel</option>
              {niveles.map((nivel, index) => (
                <option key={index} value={nivel}>
                  {nivel}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Publicación</Form.Label>
            <Form.Control
              type="date"
              name="fechaPublicacion"
              value={fechaPublicacion} // Usamos el estado actualizado
              onChange={handleDateChange} // Usamos la nueva función para manejar el cambio
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="contenido"
              value={nuevaLeccion?.contenido || ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ejercicios</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="ejercicios"
              value={nuevaLeccion?.ejercicios || ""}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleAddLeccion}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroLeccion;
