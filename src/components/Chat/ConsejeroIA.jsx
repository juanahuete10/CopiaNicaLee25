// components/chat/ConsejeroIA.jsx
import React, { useState } from "react";
import { Modal, Button, Form, Spinner, ListGroup } from "react-bootstrap";

const ConsejeroIA = ({ show, onHide }) => {
  const [mensaje, setMensaje] = useState("");
  const [respuestas, setRespuestas] = useState([]);
  const [cargando, setCargando] = useState(false);

  const obtenerConsejo = async () => {
    if (!mensaje.trim()) return;

    setCargando(true);
    setRespuestas((prev) => [...prev, { texto: mensaje, emisor: "padre" }]);
    setMensaje("");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GOOGLE_AI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Consejo educativo para padres: ${mensaje}` }] }],
          }),
        }
      );

      // Validación explícita del status
      if (!response.ok) {
        throw new Error(`Error de respuesta: ${response.status}`);
      }

      const data = await response.json();
      const textoIA = data.candidates?.[0]?.content?.parts?.[0]?.text || "No hubo respuesta de la IA.";

      setRespuestas((prev) => [...prev, { texto: textoIA, emisor: "ia" }]);
    } catch (error) {
      console.error("Error al conectar con IA:", error);
      setRespuestas((prev) => [
        ...prev,
        { texto: "Error al conectar con la IA. Intenta nuevamente más tarde.", emisor: "ia" },
      ]);
    }

    setCargando(false);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Asistencia IA para Padres</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ListGroup style={{ maxHeight: "250px", overflowY: "auto" }}>
          {respuestas.map((msg, idx) => (
            <ListGroup.Item key={idx} variant={msg.emisor === "ia" ? "light" : "primary"}>
              <strong>{msg.emisor === "ia" ? "IA:" : "Tú:"}</strong> {msg.texto}
            </ListGroup.Item>
          ))}
        </ListGroup>
        <Form.Control
          className="mt-3"
          type="text"
          placeholder="Escribe tu pregunta..."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && obtenerConsejo()}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={obtenerConsejo} disabled={cargando}>
          {cargando ? <Spinner size="sm" animation="border" /> : "Enviar"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConsejeroIA;
