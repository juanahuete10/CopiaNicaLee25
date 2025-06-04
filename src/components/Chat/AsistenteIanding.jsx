import React, { useState } from "react";
import { Button, Form, Spinner, Card } from "react-bootstrap";
import { BsRobot, BsX } from "react-icons/bs";

const obtenerLecturaIA = async (mensaje) => {
  const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
  const prompt = `Genera una lectura educativa adaptada al nivel que se menciona en este mensaje: "${mensaje}". Asegúrate de que sea clara, educativa y adecuada para niños.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No se pudo generar la lectura.";
  } catch (error) {
    console.error("Error:", error);
    return "Ocurrió un error al conectarse con la IA.";
  }
};

export default function Asistentelanding() {
  const [mensaje, setMensaje] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [visible, setVisible] = useState(false);

  const manejarEnvio = async () => {
    if (!mensaje.trim()) return;
    setCargando(true);
    const resultado = await obtenerLecturaIA(mensaje);
    setRespuesta(resultado);
    setCargando(false);
  };

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      <Button
        variant="primary"
        className="asistente-float-btn"
        onClick={() => setVisible(!visible)}
      >
        {visible ? <BsX size={24} /> : <BsRobot size={24} />}
      </Button>

      {/* Ventana flotante del chat */}
      {visible && (
        <Card className="asistente-float-window shadow-lg">
          <h6>🧠 Chat General</h6>
          <Form.Group className="my-2">
            <Form.Control
              type="text"
              placeholder="Ej: Cuento para segundo grado sobre animales"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            />
          </Form.Group>
          <Button onClick={manejarEnvio} disabled={cargando}>
            {cargando ? <Spinner size="sm" animation="border" /> : "Generar"}
          </Button>
          {respuesta && (
            <div className="mt-3 respuesta-ia">
              <strong>Respuesta:</strong>
              <p>{respuesta}</p>
            </div>
          )}
        </Card>
      )}
    </>
  );
}
