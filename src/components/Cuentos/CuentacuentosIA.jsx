import React, { useState, useRef } from "react";
import { Button, Form, Spinner, Card, ToggleButtonGroup, ToggleButton } from "react-bootstrap";

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
  const [modo, setModo] = useState("textoAudio");
  const [leyendo, setLeyendo] = useState(false);
  const utteranceRef = useRef(null);

  const reproducirAudio = (texto) => {
    if (!texto) return;
    const tts = new SpeechSynthesisUtterance(texto);
    utteranceRef.current = tts;
    speechSynthesis.speak(tts);
    setLeyendo(true);

    tts.onend = () => setLeyendo(false);
  };

  const pausarAudio = () => {
    speechSynthesis.pause();
    setLeyendo(false);
  };

  const reanudarAudio = () => {
    speechSynthesis.resume();
    setLeyendo(true);
  };

  const detenerAudio = () => {
    speechSynthesis.cancel();
    setLeyendo(false);
  };

  const handleGenerarCuento = async () => {
    if (!tema.trim()) return;
    detenerAudio(); // Detener audio anterior
    setCargando(true);
    setCuento("");
    const resultado = await generarCuentoIA(tema);
    setCuento(resultado);
    setCargando(false);

    if (modo !== "texto") {
      reproducirAudio(resultado);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "700px" }}>
      <Card className="p-4 shadow-lg border-primary">
        <h3 className="text-center text-primary mb-4">
          🧚‍♀️ Cuentacuentos con IA
        </h3>

        <Form.Group className="mb-3">
          <Form.Label>
            <strong>🔤 Escribe una palabra o tema</strong>
          </Form.Label>
          <Form.Control
            type="text"
            value={tema}
            onChange={(e) => setTema(e.target.value)}
            placeholder="Ej. dragón, selva, estrella"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label><strong>🎧 ¿Cómo deseas recibir el cuento?</strong></Form.Label>
          <ToggleButtonGroup
            type="radio"
            name="modo"
            value={modo}
            onChange={setModo}
            className="d-flex justify-content-between"
          >
            <ToggleButton id="modo1" value="texto" variant="outline-primary">
              📖 Solo Texto
            </ToggleButton>
            <ToggleButton id="modo2" value="audio" variant="outline-success">
              🔊 Solo Audio
            </ToggleButton>
            <ToggleButton id="modo3" value="textoAudio" variant="outline-warning">
              📖 + 🔊 Ambos
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>

        <div className="text-center mb-3">
          <Button onClick={handleGenerarCuento} disabled={cargando}>
            {cargando ? <Spinner animation="border" size="sm" /> : "✨ Crear Cuento"}
          </Button>
        </div>

        {cuento && (
          <Card className="mt-3 p-3 bg-light border-success">
            <h5 className="text-success">📖 Tu cuento generado:</h5>
            {modo !== "audio" && (
              <p style={{ whiteSpace: "pre-line", fontSize: "1.1rem" }}>{cuento}</p>
            )}
            {modo !== "texto" && (
              <div className="d-flex justify-content-center gap-3 mt-2">
                <Button
                  variant="outline-danger"
                  onClick={detenerAudio}
                  size="sm"
                >
                  ⏹️ Detener
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={leyendo ? pausarAudio : reanudarAudio}
                  size="sm"
                >
                  {leyendo ? "⏸️ Pausar" : "▶️ Reanudar"}
                </Button>
              </div>
            )}
          </Card>
        )}
      </Card>
    </div>
  );
};

export default CuentacuentosIA;
