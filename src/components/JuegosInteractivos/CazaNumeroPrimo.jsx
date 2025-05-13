import React, { useState } from 'react';

const numerosEjercicios = [
  // Sección 1
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
  // Sección 2
  12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  // Sección 3
  22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const verificarPrimo = (num) => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const CazaNumeroPrimo = () => {
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState('');

  const numeroActual = numerosEjercicios[indice];

  const manejarVerificacion = (respuestaUsuario) => {
    const esPrimo = verificarPrimo(numeroActual);
    if ((respuestaUsuario === 'sí' && esPrimo) || (respuestaUsuario === 'no' && !esPrimo)) {
      setRespuesta('¡Correcto! 🎉');
    } else {
      setRespuesta('Incorrecto. Inténtalo de nuevo.');
    }
  };

  const siguiente = () => {
    setIndice((prev) => (prev < numerosEjercicios.length - 1 ? prev + 1 : 0));
    setRespuesta('');
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '500px', margin: 'auto' }}>
      <h3>Caza del Número Primo</h3>
      <p><strong>Ejercicio {indice + 1} de {numerosEjercicios.length}</strong></p>
      <p>¿El número <strong>{numeroActual}</strong> es un número primo?</p>
      <button onClick={() => manejarVerificacion('sí')}>Sí</button>
      <button onClick={() => manejarVerificacion('no')}>No</button>
      <p>{respuesta}</p>
      {respuesta === '¡Correcto! 🎉' && (
        <button onClick={siguiente} style={{ marginTop: '10px' }}>
          Siguiente
        </button>
      )}
    </div>
  );
};

export default CazaNumeroPrimo;
