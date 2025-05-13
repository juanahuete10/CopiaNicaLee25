import React, { useState } from 'react';

const preguntas = [
  {
    pregunta: '¿Qué figura geométrica es redonda y no tiene vértices?',
    opciones: ['Círculo', 'Cuadrado', 'Triángulo'],
    respuestaCorrecta: 'Círculo',
  },
  {
    pregunta: '¿Cuál figura tiene cuatro lados iguales y cuatro ángulos rectos?',
    opciones: ['Rectángulo', 'Cuadrado', 'Trapecio'],
    respuestaCorrecta: 'Cuadrado',
  },
  {
    pregunta: '¿Qué figura tiene tres lados y tres vértices?',
    opciones: ['Triángulo', 'Pentágono', 'Hexágono'],
    respuestaCorrecta: 'Triángulo',
  },
  {
    pregunta: '¿Cuál figura tiene seis lados?',
    opciones: ['Pentágono', 'Hexágono', 'Octágono'],
    respuestaCorrecta: 'Hexágono',
  },
  {
    pregunta: '¿Qué figura tiene cinco lados?',
    opciones: ['Pentágono', 'Heptágono', 'Triángulo'],
    respuestaCorrecta: 'Pentágono',
  },
  {
    pregunta: '¿Cuál figura tiene ocho lados?',
    opciones: ['Hexágono', 'Cuadrado', 'Octágono'],
    respuestaCorrecta: 'Octágono',
  },
  {
    pregunta: '¿Qué figura tiene dos lados paralelos y dos no paralelos?',
    opciones: ['Trapecio', 'Rombo', 'Círculo'],
    respuestaCorrecta: 'Trapecio',
  },
  {
    pregunta: '¿Qué figura tiene todos sus lados iguales pero no necesariamente ángulos rectos?',
    opciones: ['Rombo', 'Cuadrado', 'Rectángulo'],
    respuestaCorrecta: 'Rombo',
  },
  {
    pregunta: '¿Cuál figura es un cuadrilátero con lados opuestos iguales y ángulos rectos?',
    opciones: ['Rectángulo', 'Rombo', 'Triángulo'],
    respuestaCorrecta: 'Rectángulo',
  },
  {
    pregunta: '¿Qué figura tiene siete lados?',
    opciones: ['Hexágono', 'Heptágono', 'Pentágono'],
    respuestaCorrecta: 'Heptágono',
  },
  {
    pregunta: '¿Qué figura tiene diez lados?',
    opciones: ['Decágono', 'Octágono', 'Heptágono'],
    respuestaCorrecta: 'Decágono',
  },
];

const TriviaFigurasGeometricas = () => {
  const [indice, setIndice] = useState(0);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState('');
  const [terminado, setTerminado] = useState(false);

  const preguntaActual = preguntas[indice];

  const handleCheck = (respuesta) => {
    if (respuesta === preguntaActual.respuestaCorrecta) {
      setRespuestaCorrecta('✅ ¡Correcto!');
      setTimeout(() => {
        if (indice + 1 < preguntas.length) {
          setIndice(indice + 1);
          setRespuestaCorrecta('');
        } else {
          setTerminado(true);
        }
      }, 1000);
    } else {
      setRespuestaCorrecta('❌ Intenta de nuevo');
    }
  };

  const reiniciar = () => {
    setIndice(0);
    setRespuestaCorrecta('');
    setTerminado(false);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem', textAlign: 'center' }}>
      <h2>🧩 Trivia de Figuras Geométricas</h2>

      {!terminado ? (
        <>
          <h4>{preguntaActual.pregunta}</h4>
          {preguntaActual.opciones.map((opcion, idx) => (
            <button
              key={idx}
              onClick={() => handleCheck(opcion)}
              style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
            >
              {opcion}
            </button>
          ))}
          <p style={{ fontWeight: 'bold' }}>{respuestaCorrecta}</p>
          <p>Pregunta {indice + 1} de {preguntas.length}</p>
        </>
      ) : (
        <>
          <h3>🎉 ¡Felicidades, completaste la trivia!</h3>
          <button onClick={reiniciar} style={{ padding: '0.5rem 1rem' }}>
            🔁 Volver a jugar
          </button>
        </>
      )}
    </div>
  );
};

export default TriviaFigurasGeometricas;
