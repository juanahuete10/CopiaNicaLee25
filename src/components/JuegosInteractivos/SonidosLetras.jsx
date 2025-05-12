import React, { useState } from 'react';

const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÑ'.split('');

export default function SonidosLetras() {
  const [letraActual, setLetraActual] = useState(null);
  const [respuesta, setRespuesta] = useState('');
  const [resultado, setResultado] = useState('');

  const reproducirSonido = () => {
    const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
    setLetraActual(letraAleatoria);
    setRespuesta('');
    setResultado('');

    const utter = new SpeechSynthesisUtterance(letraAleatoria);
    utter.lang = 'es-ES'; // Español
    utter.rate = 0.8;
    window.speechSynthesis.cancel(); // Detener sonidos previos
    window.speechSynthesis.speak(utter);
  };

  const verificarRespuesta = (letraSeleccionada) => {
    setRespuesta(letraSeleccionada);

    if (!letraActual) {
      setResultado('Primero debes reproducir el sonido 🔊');
      return;
    }

    if (letraSeleccionada === letraActual) {
      setResultado('✅ ¡Correcto!');
    } else {
      setResultado(`❌ Oops, la letra correcta era "${letraActual}". Intenta de nuevo.`);
    }

    
  };

  return (
    <div className="sonidos-container">
      <h4>🔊 Juego: Sonidos y Letras</h4>
      <p>Escucha el sonido y selecciona la letra correcta.</p>

      <button className="reproducir-btn" onClick={reproducirSonido}>
        🔉 Reproducir sonido
      </button>

      <div className="letras-grid">
        {letras.map(letra => (
          <button
            key={letra}
            className="letra-boton"
            onClick={() => verificarRespuesta(letra)}
          >
            {letra}
          </button>
        ))}
      </div>

      {respuesta && (
        <div className="resultado">
          <p>Tu respuesta: <strong>{respuesta}</strong></p>
          <p>{resultado}</p>
        </div>
      )}
    </div>
  );
}
