import React, { useState } from 'react';

const CompletaPalabra = () => {
  const [palabra, setPalabra] = useState('');

  const manejarCambio = (e) => {
    setPalabra(e.target.value);
  };

  const verificarPalabra = () => {
    if (palabra === 'leer') {
      alert('¡Correcto!');
    } else {
      alert('Intenta de nuevo');
    }
  };

  return (
    <div>
      <h3>Completa la Palabra</h3>
      <p>Completa la palabra: l__r</p>
      <input
        type="text"
        value={palabra}
        onChange={manejarCambio}
        placeholder="Introduce la palabra"
      />
      <button onClick={verificarPalabra}>Verificar</button>
    </div>
  );
};

export default CompletaPalabra;
