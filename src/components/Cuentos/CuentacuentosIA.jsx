import React, { useState } from "react";
import { Button, Form, Spinner, Card } from "react-bootstrap";

const generarCuentoIA = async (tema) => {
  const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;
  const prompt = `Escribe un cuento corto para niños de 5 a 10 años que incluya la palabra "${tema}". El cuento debe ser creativo, educativo, positivo y fácil de entender.`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.8 },
        }),
      }
    );

    const data = await response.json();
    const texto = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return texto || "No se pudo generar el cuento.";
  } catch (error) {
    console.error("Error al generar cuento:", error);
    return "Error al conectarse con la IA.";
  }
};

const CuentacuentosIA = () => {
  const [tema, setTema] = useState("");
  const [cuento, setCuento] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleGenerarCuento = async () => {
    if (!tema.trim()) return;
    setCargando(true);
    const resultado = await generarCuentoIA(tema);
    setCuento(resultado);
    setCargando(false);

    // Reproduce el cuento en voz
    const tts = new SpeechSynthesisUtterance(resultado);
    speechSynthesis.speak(tts);
  };

  return (
    <div className="container mt-5">
      <Card className="p-4 shadow">
        <h3 className="text-primary text-center">🧚‍♂️ Cuentacuentos con IA</h3>
        <Form.Group className="mb-3">
          <Form.Label>Escribe una palabra o tema</Form.Label>
          <Form.Control
            type="text"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            placeholder="Ej. dragón, selva, estrella"
          />
        </Form.Group>
        <div className="text-center mb-3">
          <Button onClick={handleGenerarCuento} disabled={cargando}>
            {cargando ? <Spinner animation="border" size="sm" /> : "✨ Crear Cuento"}
          </Button>
        </div>

        {cuento && (
          <Card className="mt-3 p-3 bg-light">
            <h5 className="text-success">📖 Tu cuento generado:</h5>
            <p style={{ whiteSpace: "pre-line" }}>{cuento}</p>
          </Card>
        )}
      </Card>
    </div>
  );
};

export default CuentacuentosIA;
