import React, { useState } from "react";
import { Button, Form, Spinner, Card } from "react-bootstrap";

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

export default function AsistenteIA() {
  const [mensaje, setMensaje] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async () => {
    if (!mensaje.trim()) return;
    setCargando(true);
    const resultado = await obtenerLecturaIA(mensaje);
    setRespuesta(resultado);
    setCargando(false);
  };

  return (
    <Card className="p-4 shadow" style={{ maxWidth: "700px", margin: "auto", backgroundColor: "#f7f9fc", borderRadius: "16px" }}>
      <div className="text-center mb-3">
        <h5 className="fw-bold text-primary">
          🧠 Asistente IA para Docentes
        </h5>
        <p className="text-muted" style={{ fontSize: "0.9rem" }}>
          Genera lecturas educativas adaptadas según el nivel o tema que necesites.
        </p>
      </div>

      <Form.Group className="mb-3">
        <Form.Label className="fw-semibold">¿Qué necesitas generar?</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ej: Genera una lectura sobre animales del bosque para tercer grado"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          style={{
            borderRadius: "12px",
            borderColor: "#ced4da",
            padding: "10px",
            fontSize: "0.95rem",
          }}
        />
      </Form.Group>

      <div className="text-center">
        <Button
          variant="primary"
          onClick={manejarEnvio}
          disabled={cargando}
          style={{ paddingLeft: "30px", paddingRight: "30px", borderRadius: "20px" }}
        >
          {cargando ? <Spinner size="sm" animation="border" /> : "✨ Generar con IA"}
        </Button>
      </div>

      {respuesta && (
        <Card
          className="mt-4 p-3"
          style={{
            backgroundColor: "#fff",
            borderLeft: "5px solid #0d6efd",
            borderRadius: "12px",
          }}
        >
          <h6 className="fw-bold text-success mb-2">📘 Resultado generado:</h6>
          <p style={{ whiteSpace: "pre-wrap", fontSize: "0.95rem" }}>{respuesta}</p>
        </Card>
      )}
    </Card>
  );
}
