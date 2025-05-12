import React, { useState } from 'react';

const lecciones = [
  { letra: 'A', palabra: 'Ardilla' },
  { letra: 'B', palabra: 'Ballena' },
  { letra: 'C', palabra: 'Casa' },
  { letra: 'D', palabra: 'Dado' },
  { letra: 'E', palabra: 'Elefante' },
  { letra: 'F', palabra: 'Foca' },
  { letra: 'G', palabra: 'Gato' },
  { letra: 'H', palabra: 'Helado' },
  { letra: 'I', palabra: 'Iglesia' },
  { letra: 'J', palabra: 'Jirafa' }
];

export default function SonidosYPronunciacion() {
  const [indiceActual, setIndiceActual] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [escuchando, setEscuchando] = useState(false);

  const leccion = lecciones[indiceActual];

  const hablar = (texto) => {
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = 'es-ES';
    utter.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const escucharPronunciacion = () => {
    const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    reconocimiento.lang = 'es-ES';
    reconocimiento.start();
    setEscuchando(true);

    reconocimiento.onresult = (event) => {
      const resultado = event.results[0][0].transcript.toLowerCase();
      const palabraEsperada = leccion.palabra.toLowerCase();

      if (resultado.includes(palabraEsperada)) {
        setMensaje(`✅ Bien dicho: "${resultado}"`);
      } else {
        setMensaje(`❌ Dijiste: "${resultado}". Intenta decir: "${leccion.palabra}"`);
      }
      setEscuchando(false);
    };

    reconocimiento.onerror = () => {
      setMensaje('❌ No se pudo reconocer tu voz. Intenta de nuevo.');
      setEscuchando(false);
    };
  };

  const siguienteLeccion = () => {
    if (indiceActual < lecciones.length - 1) {
      setIndiceActual(prev => prev + 1);
      setMensaje('');
    } else {
      setMensaje('🎉 ¡Has completado todas las lecciones!');
    }
  };

  return (
    <div className="container mt-4">
      <h4>🗣️ Juego: Sonidos y Pronunciación</h4>
      <div className="card p-3 mb-3">
        <h5>Letra: <span className="text-primary">{leccion.letra}</span></h5>
        <p>Palabra: <strong>{leccion.palabra}</strong></p>
        <div className="btn-group mb-2">
          <button className="btn btn-success" onClick={() => hablar(leccion.letra)}>
            🔊 Escuchar letra
          </button>
          <button className="btn btn-info" onClick={() => hablar(leccion.palabra)}>
            🔊 Escuchar palabra
          </button>
        </div>
        <div>
          <button className="btn btn-warning" onClick={escucharPronunciacion} disabled={escuchando}>
            🎤 Pronunciar "{leccion.palabra}"
          </button>
        </div>
      </div>

      <p className="alert alert-secondary">{mensaje}</p>

      <button
        className="btn btn-primary"
        onClick={siguienteLeccion}
        disabled={indiceActual >= lecciones.length - 1}
      >
        👉 Siguiente
      </button>
    </div>
  );
}
