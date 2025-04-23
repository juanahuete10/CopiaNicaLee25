import React from "react";
import { Modal, Form, Button, Image } from "react-bootstrap";

// Componente Modal de Edición de Lección
const ModalEdicionLeccion = ({
  showEditModal,
  setShowEditModal,
  leccionEditada,
  handleEditInputChange,
  handleEditImageChange,
  handleEditLeccion,
}) => {
  // Verificamos si leccionEditada existe y tiene los datos necesarios
  if (!leccionEditada) return null;

  return (
    <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Lección</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Título */}
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              type="text"
              name="tituloLeccion"
              value={leccionEditada.tituloLeccion || ""}
              onChange={handleEditInputChange}
            />
          </Form.Group>

          {/* Nivel */}
          <Form.Group className="mb-3">
            <Form.Label>Nivel</Form.Label>
            <Form.Control
              type="text"
              name="nivel"
              value={leccionEditada.nivel || ""}
              onChange={handleEditInputChange}
            />
          </Form.Group>

          {/* Contenido */}
          <Form.Group className="mb-3">
            <Form.Label>Contenido</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="contenido"
              value={leccionEditada.contenido || ""}
              onChange={handleEditInputChange}
            />
          </Form.Group>

          {/* Ejercicios */}
          <Form.Group className="mb-3">
            <Form.Label>Ejercicios</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="ejercicios"
              value={leccionEditada.ejercicios || ""}
              onChange={handleEditInputChange}
            />
          </Form.Group>

          {/* Fecha de Publicación */}
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Publicación</Form.Label>
            <Form.Control
              type="date"
              name="fechaPublicacion"
              value={leccionEditada.fechaPublicacion || ""}
              onChange={handleEditInputChange}
            />
          </Form.Group>

          {/* Imagen Actual */}
          <Form.Group className="mb-3">
            <Form.Label>Imagen Actual</Form.Label>
            {leccionEditada.imagen && (
              <Image src={leccionEditada.imagen} width="100" className="mb-2" />
            )}
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleEditImageChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleEditLeccion}>
          Actualizar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionLeccion;
