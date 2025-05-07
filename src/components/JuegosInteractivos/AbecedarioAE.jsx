import React, { useState, useMemo } from 'react';
import './AbecedarioAE.css';

const letrasData = [
  { letra: 'A', palabra: 'Ardilla' },
  { letra: 'B', palabra: 'Ballena' },
  { letra: 'C', palabra: 'Casa' },
  { letra: 'D', palabra: 'Dado' },
  { letra: 'E', palabra: 'Elefante' },
  { letra: 'F', palabra: 'Flor' },
  { letra: 'G', palabra: 'Gato' },
  { letra: 'H', palabra: 'Helado' },
  { letra: 'I', palabra: 'Iglesia' },
  { letra: 'J', palabra: 'Jugo' },
  { letra: 'K', palabra: 'Koala' },
  { letra: 'L', palabra: 'Luna' },
  { letra: 'M', palabra: 'Manzana' },
  { letra: 'N', palabra: 'Nube' },
  { letra: 'Ñ', palabra: 'Ñandú' },
  { letra: 'O', palabra: 'Oso' },
  { letra: 'P', palabra: 'Perro' },
  { letra: 'Q', palabra: 'Queso' },
  { letra: 'R', palabra: 'Ratón' },
  { letra: 'S', palabra: 'Sol' },
  { letra: 'T', palabra: 'Tigre' },
  { letra: 'U', palabra: 'Uvas' },
  { letra: 'V', palabra: 'Vaca' },
  { letra: 'W', palabra: 'Wafle' },
  { letra: 'X', palabra: 'Xilófono' },
  { letra: 'Y', palabra: 'Yoyo' },
  { letra: 'Z', palabra: 'Zorro' },
];

export default function AbecedarioAE() {
  const [letraSeleccionada, setLetraSeleccionada] = useState(null);
  const [emparejados, setEmparejados] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const palabrasMezcladas = useMemo(() => {
    return [...letrasData]
      .map(item => item.palabra)
      .sort(() => Math.random() - 0.5);
  }, []);

  const hablar = (texto) => {
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = 'es-ES';
    utter.rate = 0.85;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  const seleccionarLetra = (letra) => {
    setLetraSeleccionada(letra);
    setMensaje(`Letra seleccionada: ${letra}`);
    hablar(letra);
  };

  const seleccionarPalabra = (palabra) => {
    if (!letraSeleccionada) {
      setMensaje('Primero selecciona una letra');
      hablar('Primero selecciona una letra');
      return;
    }

    const letraCorrecta = palabra.charAt(0).toUpperCase();
    if (letraCorrecta === letraSeleccionada) {
      setEmparejados(prev => [...prev, letraSeleccionada]);
      setMensaje(`✅ ¡Correcto! ${palabra} empieza con ${letraSeleccionada}`);
      hablar(`Correcto. ${palabra} empieza con ${letraSeleccionada}`);
    } else {
      setMensaje(`❌ Incorrecto. ${palabra} no empieza con ${letraSeleccionada}`);
      hablar(`Incorrecto. ${palabra} no empieza con ${letraSeleccionada}`);
    }

    setLetraSeleccionada(null);
  };

  const juegoTerminado = emparejados.length === letrasData.length;

  return (
    <div className="abecedario-container">
      <h4>🔡 Une la letra con su palabra</h4>
      <p>Haz clic en una letra y luego en la palabra que empieza con esa letra.</p>

      {juegoTerminado && (
        <div className="mensaje-final">
          🎉 ¡Muy bien! Has completado la lección.
        </div>
      )}

      <div className="juego-grid">
        <div className="letras-col">
          {letrasData.map(({ letra }) => (
            <button
              key={letra}
              className={`boton-letra-col ${letraSeleccionada === letra ? 'seleccionada' : ''} ${emparejados.includes(letra) ? 'completada' : ''}`}
              onClick={() => seleccionarLetra(letra)}
              disabled={emparejados.includes(letra)}
            >
              {letra}
            </button>
          ))}
        </div>

        <div className="palabras-col">
          {palabrasMezcladas.map(palabra => {
            const letraInicial = palabra.charAt(0).toUpperCase();
            const emparejada = emparejados.includes(letraInicial);

            return (
              <button
                key={palabra}
                className={`boton-palabra-col ${emparejada ? 'completada' : ''}`}
                onClick={() => !emparejada && seleccionarPalabra(palabra)}
                disabled={emparejada}
              >
                {palabra}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mensaje-juego">{mensaje}</div>
    </div>
  );
}
