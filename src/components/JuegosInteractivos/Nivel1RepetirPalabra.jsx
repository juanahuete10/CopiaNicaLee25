
import React from "react";
import { Button, Card } from "react-bootstrap";

const Nivel1RepetirPalabra = () => {
  const palabra = "mamá";

  const reproducirSonido = () => {
    const utterance = new SpeechSynthesisUtterance(palabra);
    utterance.lang = "es-ES";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Card className="text-center p-4">
      <h4>Escucha y repite</h4>
      <Button onClick={reproducirSonido}>🔊 Escuchar palabra</Button>
      <p className="mt-3">Palabra: <strong>{palabra}</strong></p>
    </Card>
  );
};

export default Nivel1RepetirPalabra;
