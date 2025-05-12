// Nivel1LetraCorrecta.jsx
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";

const Nivel1LetraCorrecta = () => {
  const [seleccion, setSeleccion] = useState("");
  const letraCorrecta = "A";

  const verificar = (letra) => {
    setSeleccion(letra === letraCorrecta ? "¡Muy bien!" : "Intenta de nuevo");
  };

  return (
    <Card className="text-center p-4">
      <h4>¿Cuál es la letra que ves?</h4>
      <h1 style={{ fontSize: "80px", color: "#3b82f6" }}>{letraCorrecta}</h1>
      <div className="d-flex justify-content-center gap-3 my-3">
        {["A", "B", "C"].map((l) => (
          <Button key={l} onClick={() => verificar(l)}>{l}</Button>
        ))}
      </div>
      {seleccion && <p className="mt-3">{seleccion}</p>}
    </Card>
  );
};

export default Nivel1LetraCorrecta;
