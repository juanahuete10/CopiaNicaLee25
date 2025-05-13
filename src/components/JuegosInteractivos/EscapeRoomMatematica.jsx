import React, { useState } from 'react';

const acertijos = [
  { pregunta: '¿Cuánto es 7 x 6?', respuesta: '42' },
  { pregunta: '¿Cuál es la raíz cuadrada de 64?', respuesta: '8' },
  { pregunta: '¿Cuánto es 100 dividido entre 4?', respuesta: '25' },
  { pregunta: '¿Cuánto es 12 + 15?', respuesta: '27' },
  { pregunta: '¿Cuánto es 9 x 9?', respuesta: '81' },
  { pregunta: '¿Cuánto es 45 - 18?', respuesta: '27' },
  { pregunta: '¿Cuánto es 5 al cuadrado?', respuesta: '25' },
  { pregunta: '¿Cuál es el doble de 16?', respuesta: '32' },
  { pregunta: '¿Cuánto es 144 dividido entre 12?', respuesta: '12' },
  { pregunta: '¿Cuánto es 3 x 12?', respuesta: '36' },
  { pregunta: '¿Cuánto es 99 + 1?', respuesta: '100' },
  { pregunta: '¿Cuánto es 13 x 3?', respuesta: '39' },
  { pregunta: '¿Cuánto es 20 + 30?', respuesta: '50' },
  { pregunta: '¿Cuánto es 50 - 25?', respuesta: '25' },
  { pregunta: '¿Cuál es el triple de 9?', respuesta: '27' },
  { pregunta: '¿Cuánto es 7 x 8?', respuesta: '56' },
  { pregunta: '¿Cuánto es 18 dividido entre 2?', respuesta: '9' },
  { pregunta: '¿Cuánto es 11 + 22?', respuesta: '33' },
  { pregunta: '¿Cuánto es 10 x 10?', respuesta: '100' },
  { pregunta: '¿Cuánto es 81 dividido entre 9?', respuesta: '9' },
  { pregunta: '¿Cuánto es 6 x 6?', respuesta: '36' },
  { pregunta: '¿Cuánto es 8 x 8?', respuesta: '64' },
  { pregunta: '¿Cuánto es 72 dividido entre 8?', respuesta: '9' },
  { pregunta: '¿Cuánto es 15 + 27?', respuesta: '42' },
  { pregunta: '¿Cuánto es 49 dividido entre 7?', respuesta: '7' },
  { pregunta: '¿Cuánto es 33 + 44?', respuesta: '77' },
  { pregunta: '¿Cuánto es 60 dividido entre 5?', respuesta: '12' },
  { pregunta: '¿Cuánto es 6 al cuadrado?', respuesta: '36' },
  { pregunta: '¿Cuánto es 5 x 7?', respuesta: '35' },
  { pregunta: '¿Cuánto es 24 + 36?', respuesta: '60' },
  { pregunta: '¿Cuánto es 90 - 30?', respuesta: '60' },
  { pregunta: '¿Cuánto es 3 x 15?', respuesta: '45' },
  { pregunta: '¿Cuánto es 100 - 55?', respuesta: '45' },
];

const getRandomOptions = (correct, allAnswers) => {
  const opciones = new Set();
  opciones.add(correct);
  while (opciones.size < 3) {
    const aleatoria = allAnswers[Math.floor(Math.random() * allAnswers.length)];
    if (aleatoria !== correct) opciones.add(aleatoria);
  }
  return [...opciones].sort(() => Math.random() - 0.5); // mezclar
};

const EscapeRoomMatematica = () => {
  const [indice, setIndice] = useState(0);
  const [acertijosUsados, setAcertijosUsados] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [mostrarContinuar, setMostrarContinuar] = useState(false);
  const [completado, setCompletado] = useState(false);

  const acertijosRestantes = acertijos.filter((_, idx) => !acertijosUsados.includes(idx));
  const acertijosSeccion = acertijosRestantes.slice(0, 5);
  const acertijoActual = acertijosSeccion[indice];
  const todasLasRespuestas = acertijos.map(a => a.respuesta);
  const opciones = acertijoActual ? getRandomOptions(acertijoActual.respuesta, todasLasRespuestas) : [];

  const handleSeleccion = (respuesta) => {
    if (respuesta === acertijoActual.respuesta) {
      setMensaje('✅ ¡Correcto!');
      const nuevoIndice = indice + 1;
      if (nuevoIndice < 5 && nuevoIndice < acertijosSeccion.length) {
        setIndice(nuevoIndice);
      } else if (acertijosRestantes.length > 5) {
        setMostrarContinuar(true);
      } else {
        setCompletado(true);
        setMensaje('🎉 ¡Has resuelto todos los acertijos!');
      }
      const actualIdx = acertijos.findIndex(a => a.pregunta === acertijoActual.pregunta);
      setAcertijosUsados([...acertijosUsados, actualIdx]);
    } else {
      setMensaje('❌ Incorrecto. Intenta otra opción.');
    }
  };

  const continuar = () => {
    setIndice(0);
    setMensaje('');
    setMostrarContinuar(false);
  };

  const reiniciar = () => {
    setIndice(0);
    setMensaje('');
    setAcertijosUsados([]);
    setMostrarContinuar(false);
    setCompletado(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Escape Room de Lógica Matemática 🔢🧠</h2>

      {!completado ? (
        <>
          {acertijoActual && (
            <>
              <p><strong>{acertijoActual.pregunta}</strong></p>
              {opciones.map((opcion, i) => (
                <button
                  key={i}
                  onClick={() => handleSeleccion(opcion)}
                  style={{
                    margin: '10px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    borderRadius: '10px',
                    cursor: 'pointer'
                  }}
                >
                  {opcion}
                </button>
              ))}
              <p style={{ marginTop: '15px', fontWeight: 'bold', color: mensaje.includes('Correcto') ? 'green' : 'red' }}>
                {mensaje}
              </p>
            </>
          )}
          {mostrarContinuar && (
            <div>
              <p>¿Deseas continuar con la siguiente sección de acertijos?</p>
              <button onClick={continuar} style={{ padding: '10px 20px', marginRight: '10px' }}>Sí 👍</button>
              <button onClick={reiniciar} style={{ padding: '10px 20px' }}>No, reiniciar 🔄</button>
            </div>
          )}
        </>
      ) : (
        <div>
          <p style={{ color: 'green', fontWeight: 'bold' }}>{mensaje}</p>
          <button onClick={reiniciar} style={{ padding: '10px 20px' }}>
            Reiniciar Juego 🔄
          </button>
        </div>
      )}
    </div>
  );
};

export default EscapeRoomMatematica;
