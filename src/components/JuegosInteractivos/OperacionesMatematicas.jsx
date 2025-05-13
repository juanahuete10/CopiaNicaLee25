import React, { useState, useEffect } from 'react';

const generarOperacion = () => {
  const operadores = ['+', '-', '*', '/'];
  const operador = operadores[Math.floor(Math.random() * operadores.length)];

  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;

  if (operador === '/') {
    num1 = num1 * num2; // aseguramos que sea divisible
  }

  const resultado = eval(`${num1} ${operador} ${num2}`);
  return {
    operacion: `${num1} ${operador} ${num2}`,
    resultado: Math.round(resultado * 100) / 100,
  };
};

const generarOpciones = (respuestaCorrecta) => {
  const opciones = new Set([respuestaCorrecta]);

  while (opciones.size < 3) {
    const distractor = Math.round((respuestaCorrecta + (Math.random() * 10 - 5)) * 100) / 100;
    if (distractor !== respuestaCorrecta && !opciones.has(distractor)) {
      opciones.add(distractor);
    }
  }

  return Array.from(opciones).sort(() => Math.random() - 0.5);
};

const OperacionesMatematicas = () => {
  const [ejercicios, setEjercicios] = useState([]);
  const [ejercicioActual, setEjercicioActual] = useState(0);
  const [respuesta, setRespuesta] = useState('');
  const [feedback, setFeedback] = useState('');
  const [modoSeleccion, setModoSeleccion] = useState(false);
  const [opciones, setOpciones] = useState([]);

  useEffect(() => {
    const nuevosEjercicios = [];
    for (let i = 0; i < 15; i++) {
      nuevosEjercicios.push(generarOperacion());
    }
    setEjercicios(nuevosEjercicios);
  }, []);

  useEffect(() => {
    if (ejercicios.length > 0) {
      const actual = ejercicios[ejercicioActual];
      setModoSeleccion(Math.random() < 0.5); // 50% de las veces habrá opciones
      setOpciones(generarOpciones(actual.resultado));
      setRespuesta('');
      setFeedback('');
    }
  }, [ejercicioActual, ejercicios]);

  const handleRespuesta = (valor) => {
    const actual = ejercicios[ejercicioActual];
    const respuestaUsuario = parseFloat(valor);
    if (respuestaUsuario === actual.resultado) {
      setFeedback('¡Correcto! 🎉');
      setTimeout(() => {
        if (ejercicioActual + 1 < ejercicios.length) {
          setEjercicioActual(ejercicioActual + 1);
        } else {
          setFeedback('¡Has completado todos los ejercicios!');
        }
      }, 1500);
    } else {
      setFeedback('Intenta de nuevo 😕');
    }
  };

  if (ejercicios.length === 0) return <p>Cargando ejercicios...</p>;

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h3>Resolver Operaciones Matemáticas</h3>
      <p>Resuelve la operación:</p>
      <h2>{ejercicios[ejercicioActual].operacion}</h2>

      {modoSeleccion ? (
        <div>
          {opciones.map((op, idx) => (
            <button
              key={idx}
              onClick={() => handleRespuesta(op)}
              style={{
                margin: '10px',
                padding: '10px 20px',
                fontSize: '16px',
                borderRadius: '10px',
                backgroundColor: '#4db6ac',
                color: 'white',
                border: 'none',
              }}
            >
              {op}
            </button>
          ))}
        </div>
      ) : (
        <div>
          <input
            type="number"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            placeholder="Respuesta"
            style={{ fontSize: '18px', textAlign: 'center' }}
          />
          <br />
          <button
            onClick={() => handleRespuesta(respuesta)}
            style={{ marginTop: '10px', fontSize: '16px' }}
          >
            Comprobar
          </button>
        </div>
      )}

      <p style={{ fontSize: '18px', marginTop: '10px' }}>{feedback}</p>
    </div>
  );
};

export default OperacionesMatematicas;
