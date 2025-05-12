import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import {
  TreeFill,
  HouseFill,
  Basket2Fill,
  CarFrontFill,
  CameraFill,
  StarFill,
  HeartFill,
  BookFill,
  CheckCircleFill,
} from "react-bootstrap-icons";

// Lista completa de opciones posibles
const todasLasOpciones = [
  { palabra: "Árbol", Icono: TreeFill, letra: "A" },
  { palabra: "Casa", Icono: HouseFill, letra: "C" },
  { palabra: "Balón", Icono: Basket2Fill, letra: "B" },
  { palabra: "Carro", Icono: CarFrontFill, letra: "C" },
  { palabra: "Cámara", Icono: CameraFill, letra: "C" },
  { palabra: "Estrella", Icono: StarFill, letra: "E" },
  { palabra: "Corazón", Icono: HeartFill, letra: "C" },
  { palabra: "Libro", Icono: BookFill, letra: "L" },
];

// Función para barajar un arreglo
const barajar = (arr) => [...arr].sort(() => Math.random() - 0.5);

const Nivel1AsociarImagen = () => {
  const [mensaje, setMensaje] = useState("");
  const [finalizado, setFinalizado] = useState(false);
  const [opciones, setOpciones] = useState([]);
  const [correcta, setCorrecta] = useState(null);

  const iniciarJuego = () => {
    const barajadas = barajar(todasLasOpciones).slice(0, 4); // Elige 4 opciones al azar
    const correctaAleatoria = barajadas.find((op) => op.letra === "A") || barajadas[0]; // Asegura una correcta
    setOpciones(barajadas);
    setCorrecta(correctaAleatoria);
    setMensaje("");
    setFinalizado(false);
  };

  useEffect(() => {
    iniciarJuego();
  }, []);

  const seleccionar = (letra, palabra) => {
    if (letra === correcta.letra && palabra === correcta.palabra) {
      setMensaje("¡Correcto! Has completado la lección.");
      setFinalizado(true);
    } else {
      setMensaje("Sigue intentando");
    }
  };

  return (
    <Card className="text-center p-4 shadow">
      <h4 className="mb-4">
        ¿Qué imagen representa una palabra que inicia con la letra "{correcta?.letra}"?
      </h4>
      <Row className="mb-3 justify-content-center">
        {opciones.map((op, i) => (
          <Col xs={6} sm={4} md={3} key={i}>
            <div
              onClick={() => seleccionar(op.letra, op.palabra)}
              style={{
                cursor: "pointer",
                padding: "10px",
                border: "2px solid #ccc",
                borderRadius: "12px",
                marginBottom: "10px",
                background: "#f9f9f9",
                transition: "all 0.2s",
              }}
            >
              <op.Icono size={50} color="#007bff" />
              <p className="mt-2">{op.palabra}</p>
            </div>
          </Col>
        ))}
      </Row>

      {mensaje && (
        <div className="mt-3">
          <p><strong>{mensaje}</strong></p>

          {finalizado && (
            <>
              <CheckCircleFill size={32} color="green" className="mb-2" />
              <p>¿Deseas seguir jugando?</p>
              <Button variant="primary" onClick={iniciarJuego}>
                Sí, jugar otra vez
              </Button>
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default Nivel1AsociarImagen;
