import React, { useState, useEffect } from 'react';
import { db } from '../../database/firebaseConfig'; 
import { doc, getDoc } from 'firebase/firestore';

const Racha = ({ uid }) => {
  const [racha, setRacha] = useState(0);

  useEffect(() => {
    const obtenerRacha = async () => {
      const usuarioRef = doc(db, 'usuarios', uid);
      const usuarioDoc = await getDoc(usuarioRef);

      if (usuarioDoc.exists()) {
        const datos = usuarioDoc.data();
        setRacha(datos.racha || 0); // Se establece la racha obtenida
      }
    };

    obtenerRacha();
  }, [uid]);

  return (
    <div className="racha-container text-center mt-4">
      <h3>🔥 Tu Racha: {racha} días</h3>
      <div
        style={{
          fontSize: '2rem',
          color: '#ff9900',
          animation: 'flame-animation 1s infinite alternate', // Efecto de llama animada
        }}
      >
        🔥
      </div>
      <p>¡Sigue así! Mantén tu racha para conseguir más recompensas.</p>
    </div>
  );
};

export default Racha;
