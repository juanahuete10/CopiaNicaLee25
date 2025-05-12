import React, { useState } from 'react';

// Datos para las lecciones
const lecciones = [
  { letra: 'A', palabra: 'Ardilla' },
  { letra: 'B', palabra: 'Ballena' },
  { letra: 'C', palabra: 'Casa' },
  { letra: 'D', palabra: 'Dado' },
  { letra: 'E', palabra: 'Elefante' },
];

const imagenes = [
  {
    palabra: 'Ardilla',
    opciones: ['ardilla.png', 'ballena.png', 'casa.png'],
    correcta: 'ardilla.png',
  },
  {
    palabra: 'Ballena',
    opciones: ['elefante.png', 'ballena.png', 'dado.png'],
    correcta: 'ballena.png',
  },
];

const quiz = [
  {
    audio: 'Casa',
    opciones: ['Dado', 'Casa', 'Flor'],
    correcta: 'Casa',
  },
  {
    audio: 'Elefante',
    opciones: ['Elefante', 'Ballena', 'Flor'],
    correcta: 'Elefante',
  },
];

export default function ActividadesPronunciacion() {
  const [actividad, setActividad] = useState('leccion');

  // Lecciones
  const [indiceLeccion, setIndiceLeccion] = useState(0);
  const [mensajeLeccion, setMensajeLeccion] = useState('');
  const [escuchando, setEscuchando] = useState(false);

  const leccion = lecciones[indiceLeccion] || {};

  const hablar = (texto) => {
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = 'es-ES';
    utter.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const escucharPronunciacion = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz.');
      return;
    }

    const reconocimiento = new SpeechRecognition();
    reconocimiento.lang = 'es-ES';
    reconocimiento.start();
    setEscuchando(true);

    reconocimiento.onresult = (event) => {
      const resultado = event.results[0][0].transcript.toLowerCase();
      const palabraEsperada = leccion.palabra.toLowerCase();

      if (resultado.includes(palabraEsperada)) {
        setMensajeLeccion(`✅ Bien dicho: "${resultado}"`);
      } else {
        setMensajeLeccion(`❌ Dijiste: "${resultado}". Intenta decir "${leccion.palabra}"`);
      }
      setEscuchando(false);
    };

    reconocimiento.onerror = () => {
      setMensajeLeccion('❌ No se pudo reconocer tu voz. Intenta de nuevo.');
      setEscuchando(false);
    };
  };

  // Imágenes
  const [indiceImagen, setIndiceImagen] = useState(0);
  const [mensajeImagen, setMensajeImagen] = useState('');
  const imgActual = imagenes[indiceImagen] || {};

  const seleccionarImagen = (imagen) => {
    if (imagen === imgActual.correcta) {
      setMensajeImagen('✅ ¡Correcto!');
    } else {
      setMensajeImagen('❌ Intenta de nuevo.');
    }
  };

  // Quiz
  const [indiceQuiz, setIndiceQuiz] = useState(0);
  const [mensajeQuiz, setMensajeQuiz] = useState('');
  const quizActual = quiz[indiceQuiz] || {};

  const verificarQuiz = (opcion) => {
    if (opcion === quizActual.correcta) {
      setMensajeQuiz('✅ ¡Correcto!');
    } else {
      setMensajeQuiz('❌ No es esa palabra.');
    }
  };

  return (
    <div className="container mt-4">
      <h3>🗣️ Actividades de Sonidos y Pronunciación</h3>
      <div className="btn-group my-3">
        <button className="btn btn-outline-primary" onClick={() => setActividad('leccion')}>Lecciones</button>
        <button className="btn btn-outline-success" onClick={() => setActividad('imagen')}>Imágenes</button>
        <button className="btn btn-outline-warning" onClick={() => setActividad('quiz')}>Quiz Sonoro</button>
      </div>

      {/* Lecciones */}
      {actividad === 'leccion' && leccion && (
        <div className="card p-3 mb-3">
          <h5>Letra: <span className="text-primary">{leccion.letra}</span></h5>
          <p>Palabra: <strong>{leccion.palabra}</strong></p>
          <div className="btn-group mb-2">
            <button className="btn btn-success" onClick={() => hablar(leccion.letra)}>🔊 Escuchar letra</button>
            <button className="btn btn-info" onClick={() => hablar(leccion.palabra)}>🔊 Escuchar palabra</button>
          </div>
          <div>
            <button className="btn btn-warning" onClick={escucharPronunciacion} disabled={escuchando}>
              🎤 Pronunciar "{leccion.palabra}"
            </button>
          </div>
          <p className="alert alert-secondary mt-2">{mensajeLeccion}</p>
          {indiceLeccion < lecciones.length - 1 && (
            <button className="btn btn-primary" onClick={() => {
              setIndiceLeccion(indiceLeccion + 1);
              setMensajeLeccion('');
            }}>👉 Siguiente</button>
          )}
        </div>
      )}

      {/* Imágenes */}
      {actividad === 'imagen' && imgActual && (
        <div>
          <h5>🖼️ Selecciona la imagen de: <strong>{imgActual.palabra}</strong></h5>
          <div className="d-flex flex-wrap gap-2">
            {imgActual.opciones.map((img, i) => (
              <img
                key={i}
                src={`/assets/${img}`} // Asegúrate que estén en public/assets
                alt="opción"
                className="img-thumbnail"
                width={100}
                onClick={() => seleccionarImagen(img)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
          <p>{mensajeImagen}</p>
          {mensajeImagen.includes('Correcto') && indiceImagen < imagenes.length - 1 && (
            <button className="btn btn-primary mt-2" onClick={() => {
              setIndiceImagen(indiceImagen + 1);
              setMensajeImagen('');
            }}>👉 Siguiente</button>
          )}
        </div>
      )}

      {/* Quiz Sonoro */}
      {actividad === 'quiz' && quizActual && (
        <div>
          <h5>🔊 ¿Qué palabra escuchas?</h5>
          <button className="btn btn-info mb-2" onClick={() => hablar(quizActual.audio)}>Reproducir sonido</button>
          <div className="d-flex gap-2">
            {quizActual.opciones.map((op, i) => (
              <button key={i} className="btn btn-outline-primary" onClick={() => verificarQuiz(op)}>
                {op}
              </button>
            ))}
          </div>
          <p>{mensajeQuiz}</p>
          {mensajeQuiz.includes('Correcto') && indiceQuiz < quiz.length - 1 && (
            <button className="btn btn-success mt-2" onClick={() => {
              setIndiceQuiz(indiceQuiz + 1);
              setMensajeQuiz('');
            }}>👉 Siguiente</button>
          )}
        </div>
      )}
    </div>
  );
}
