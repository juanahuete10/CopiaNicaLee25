import React, { useState } from 'react';
import './SopaDeLetras.css';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';

const sopasDisponibles = [
  {
    sopa: [
      ['S', 'U', 'M', 'A', 'F', 'R', 'G', 'Q', 'X', 'Z'],
      ['K', 'R', 'E', 'S', 'T', 'A', 'L', 'P', 'M', 'W'],
      ['P', 'L', 'R', 'D', 'I', 'V', 'I', 'S', 'I', 'O'],
      ['M', 'X', 'F', 'G', 'U', 'E', 'M', 'R', 'D', 'N'],
      ['U', 'N', 'U', 'M', 'E', 'R', 'O', 'A', 'A', 'B'],
      ['L', 'A', 'H', 'S', 'B', 'A', 'R', 'C', 'G', 'N'],
      ['T', 'Y', 'I', 'F', 'I', 'G', 'U', 'R', 'A', 'S'],
      ['I', 'O', 'D', 'M', 'U', 'L', 'T', 'I', 'P', 'L'],
      ['B', 'R', 'Z', 'Q', 'R', 'T', 'Y', 'I', 'U', 'K'],
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
    ],
    palabras: ['SUMA', 'RESTA', 'MULTIPLICACION', 'DIVISION', 'NUMERO', 'FIGURA']
  }
];

const obtenerSopaAleatoria = () => {
  const indice = Math.floor(Math.random() * sopasDisponibles.length);
  return JSON.parse(JSON.stringify(sopasDisponibles[indice]));
};

const SopaDeLetras = () => {
  const [sopaActual, setSopaActual] = useState(obtenerSopaAleatoria());
  const [palabrasEncontradas, setPalabrasEncontradas] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [seleccion, setSeleccion] = useState([]);

  const manejarClickCelda = (fila, columna) => {
    const nuevaSeleccion = [...seleccion, { fila, columna }];
    setSeleccion(nuevaSeleccion);

    const palabra = nuevaSeleccion.map(pos => sopaActual.sopa[pos.fila][pos.columna]).join('');

    // Verifica en ambas direcciones
    const posibles = [palabra, palabra.split('').reverse().join('')];

    for (let posible of posibles) {
      if (
        sopaActual.palabras.includes(posible) &&
        !palabrasEncontradas.includes(posible)
      ) {
        setPalabrasEncontradas([...palabrasEncontradas, posible]);
        setMensaje(`¡Encontraste la palabra: ${posible}! 🎉`);
        setTimeout(() => setMensaje(null), 3000);
        setSeleccion([]);
        return;
      }
    }

    // Limitar selección a 12 letras
    if (nuevaSeleccion.length >= 12) {
      setSeleccion([]);
    }
  };

  const reiniciarJuego = () => {
    setSopaActual(obtenerSopaAleatoria());
    setPalabrasEncontradas([]);
    setSeleccion([]);
    setMensaje(null);
  };

  const estaSeleccionada = (fila, columna) =>
    seleccion.some(pos => pos.fila === fila && pos.columna === columna);

  const estaEncontrada = (fila, columna) => {
    const letra = sopaActual.sopa[fila][columna];
    return palabrasEncontradas.some(palabra => palabra.includes(letra));
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-3 text-primary">🧠 Sopa de Letras Matemáticas</h2>
      <p className="text-center fs-5">Haz clic en las letras para formar palabras.</p>

      {mensaje && <Alert variant="success" className="text-center">{mensaje}</Alert>}

      <div className="sopa-grid mx-auto mb-4">
        {sopaActual.sopa.map((fila, rowIndex) => (
          <div key={rowIndex} className="sopa-row">
            {fila.map((letra, colIndex) => {
              const seleccionada = estaSeleccionada(rowIndex, colIndex);
              const encontrada = estaEncontrada(rowIndex, colIndex);
              return (
                <span
                  key={colIndex}
                  className={`sopa-cell ${seleccionada ? 'seleccionada' : ''} ${encontrada ? 'encontrada' : ''}`}
                  onClick={() => manejarClickCelda(rowIndex, colIndex)}
                >
                  {letra}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <h5 className="text-center">Palabras por encontrar:</h5>
      <Row className="justify-content-center text-center">
        {sopaActual.palabras.map((palabra) => (
          <Col key={palabra} xs={6} sm={4} md={2} className="my-2">
            <Button
              variant={palabrasEncontradas.includes(palabra) ? 'success' : 'outline-primary'}
              disabled
              className="w-100"
              style={{
                textDecoration: palabrasEncontradas.includes(palabra) ? 'line-through' : 'none',
                opacity: palabrasEncontradas.includes(palabra) ? 0.7 : 1
              }}
            >
              {palabra}
            </Button>
          </Col>
        ))}
      </Row>

      <div className="text-center mt-4">
        <Button variant="warning" onClick={reiniciarJuego}>🔁 Jugar de nuevo</Button>
      </div>

      {palabrasEncontradas.length === sopaActual.palabras.length && (
        <Alert variant="info" className="text-center mt-4">
          ¡Felicidades! 🎉 Has encontrado todas las palabras.
        </Alert>
      )}
    </Container>
  );
};

export default SopaDeLetras;
