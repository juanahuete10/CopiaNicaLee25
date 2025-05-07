import React from 'react';

export default function SonidosLetras() {
  return (
    <div>
      <h5>Juego: Sonidos y Letras</h5>
      <p>Escucha el sonido y elige la letra correcta.</p>
      <button onClick={() => alert('🔊 sonido de la letra C')}>Reproducir sonido</button>
    </div>
  );
}
