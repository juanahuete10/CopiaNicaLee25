import React, { useState, useEffect } from 'react';
import './MemoriaLetras.css';

const datos = {
  abecedario: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  consonantes: 'BCDFGHJKLMNPQRSTVWXYZ'.split(''),
  numeros: '0123456789'.split(''),
  palabras: ['mamá', 'papá', 'tío', 'tía', 'perro', 'gato']
};

function generarCartas(tipo) {
  const originales = datos[tipo];
  const duplicadas = [...originales, ...originales];
  return duplicadas
    .map(texto => ({
      id: Math.random(),
      texto,
      volteada: false,
      encontrada: false
    }))
    .sort(() => Math.random() - 0.5);
}

export default function MemoriaLetras() {
  const [modo, setModo] = useState('abecedario');
  const [cartas, setCartas] = useState(generarCartas(modo));
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [bloqueado, setBloqueado] = useState(false);
  const [completado, setCompletado] = useState(false);

  useEffect(() => {
    if (seleccionadas.length === 2) {
      setBloqueado(true);
      const [primera, segunda] = seleccionadas;

      if (primera.texto === segunda.texto) {
        setTimeout(() => {
          setCartas(prev =>
            prev.map(carta =>
              carta.texto === primera.texto
                ? { ...carta, encontrada: true }
                : carta
            )
          );
          setSeleccionadas([]);
          setBloqueado(false);
        }, 800);
      } else {
        setTimeout(() => {
          setCartas(prev =>
            prev.map(carta =>
              carta.id === primera.id || carta.id === segunda.id
                ? { ...carta, volteada: false }
                : carta
            )
          );
          setSeleccionadas([]);
          setBloqueado(false);
        }, 1000);
      }
    }
  }, [seleccionadas]);

  useEffect(() => {
    if (cartas.every(c => c.encontrada)) {
      setCompletado(true);
    }
  }, [cartas]);

  const manejarClick = (carta) => {
    if (bloqueado || carta.volteada || carta.encontrada) return;

    const cartaVolteada = { ...carta, volteada: true };
    setCartas(prev =>
      prev.map(c =>
        c.id === carta.id ? cartaVolteada : c
      )
    );

    setSeleccionadas(prev => [...prev, cartaVolteada]);
  };

  const reiniciarJuego = (nuevoModo = modo) => {
    setModo(nuevoModo);
    setCartas(generarCartas(nuevoModo));
    setSeleccionadas([]);
    setCompletado(false);
    setBloqueado(false);
  };

  return (
    <div className="memoria-container">
      <h4>🧠 Juego de Memoria</h4>
      <p>Selecciona una categoría y empareja los elementos iguales.</p>

      <div className="modo-selector">
        <button onClick={() => reiniciarJuego('abecedario')}>🔤 Abecedario</button>
        <button onClick={() => reiniciarJuego('consonantes')}>🅲 Consonantes</button>
        <button onClick={() => reiniciarJuego('numeros')}>🔢 Números</button>
        <button onClick={() => reiniciarJuego('palabras')}>📝 Palabras</button>
      </div>

      <div className="memoria-grid">
        {cartas.map(carta => (
          <div
            key={carta.id}
            className={`carta ${carta.volteada || carta.encontrada ? 'volteada' : ''}`}
            onClick={() => manejarClick(carta)}
          >
            <div className="cara frente">?</div>
            <div className="cara trasera">{carta.texto}</div>
          </div>
        ))}
      </div>

      {completado && (
        <div className="mensaje-final">
          🎉 ¡Muy bien! Has emparejado todas las tarjetas.
          <button className="reiniciar-btn" onClick={() => reiniciarJuego()}>🔁 Jugar de nuevo</button>
        </div>
      )}
    </div>
  );
}
