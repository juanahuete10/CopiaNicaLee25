import React, { useState } from 'react';
import { Button } from 'react-bootstrap';


const piezasOriginales = ['🧩', '🧩', '🧩', '🧩'];
const piezasDesordenadas = [...piezasOriginales].sort(() => Math.random() - 0.5);

export default function Rompecabezas() {
  const [piezas, setPiezas] = useState(piezasDesordenadas);
  const [mensaje, setMensaje] = useState('');

  const intercambiar = (i) => {
    const nuevas = [...piezas];
    [nuevas[i], nuevas[i + 1]] = [nuevas[i + 1], nuevas[i]];
    setPiezas(nuevas);
  };

  const verificar = () => {
    const esCorrecto = JSON.stringify(piezas) === JSON.stringify(piezasOriginales);
    setMensaje(esCorrecto ? '¡Rompecabezas completo! 🎉' : 'Inténtalo de nuevo.');
  };

  return (
    <div className="text-center">
      <h5>Rompecabezas Visual</h5>
      <div className="d-flex justify-content-center mb-3">
        {piezas.map((pieza, i) => (
          <span key={i} style={{ fontSize: '2rem', margin: '0 5px' }}>{pieza}</span>
        ))}
      </div>
      <div className="d-flex justify-content-center mb-2">
        {piezas.slice(0, -1).map((_, i) => (
          <Button
            key={i}
            size="sm"
            variant="info"
            onClick={() => intercambiar(i)}
            className="me-1"
          >
            Intercambiar {i + 1}↔{i + 2}
          </Button>
        ))}
      </div>
      <Button variant="success" onClick={verificar}>Verificar</Button>
      <p className="mt-3">{mensaje}</p>
    </div>
  );
}
