import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container py-4">
      {/* Botón de retroceso */}
      <button className="btn btn-outline-secondary mb-4 d-flex align-items-center" onClick={handleBack}>
        <span className="me-2">←</span> Volver
      </button>

      {/* Tarjeta principal */}
      <div className="card shadow-lg p-4 rounded-4 bg-light">
        <h3 className="text-center text-primary fw-bold mb-4">🗣️ Juego: Sonidos y Pronunciación</h3>

        <div className="text-center mb-3">
          <h4>Letra: <span className="text-success">{leccion.letra}</span></h4>
          <p className="fs-5">Palabra: <strong>{leccion.palabra}</strong></p>
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
          <button className="btn btn-success btn-lg" onClick={() => hablar(leccion.letra)}>
            🔊 Escuchar letra
          </button>
          <button className="btn btn-info btn-lg" onClick={() => hablar(leccion.palabra)}>
            🔊 Escuchar palabra
          </button>
          <button className="btn btn-warning btn-lg" onClick={escucharPronunciacion} disabled={escuchando}>
            🎤 Pronunciar
          </button>
        </div>

        <div className="text-center">
          {mensaje && <p className="alert alert-secondary">{mensaje}</p>}
        </div>

        <div className="text-center mt-3">
          <button
            className="btn btn-primary btn-lg"
            onClick={siguienteLeccion}
            disabled={indiceActual >= lecciones.length - 1}
          >
            👉 Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}
