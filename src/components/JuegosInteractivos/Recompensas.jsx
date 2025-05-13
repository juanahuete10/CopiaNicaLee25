import React, { useEffect, useState } from 'react';
import { db } from '../../database/firebaseConfig'; 
import { doc, getDoc } from 'firebase/firestore';

const Recompensas = ({ uid }) => {
  const [recompensas, setRecompensas] = useState([]);

  useEffect(() => {
    const obtenerRecompensas = async () => {
      try {
        const usuarioRef = doc(db, 'usuarios', uid);
        const usuarioSnap = await getDoc(usuarioRef);

        if (usuarioSnap.exists()) {
          const data = usuarioSnap.data();
          setRecompensas(data.recompensas || []);
        }
      } catch (error) {
        console.error('Error al obtener recompensas:', error);
      }
    };

    obtenerRecompensas();
  }, [uid]);

  return (
    <div className="container mt-5 text-center">
      <h2 style={{ fontFamily: 'Comic Sans MS', color: '#ff9900' }}>🏆 Tus Recompensas</h2>

      {recompensas.length === 0 ? (
        <p style={{ fontFamily: 'Comic Sans MS' }}>Aún no has ganado recompensas. ¡Sigue jugando y aprendiendo!</p>
      ) : (
        <div className="row mt-4">
          {recompensas.map((recompensa, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div
                className="card shadow-lg"
                style={{
                  borderRadius: '15px',
                  backgroundColor: '#fffbe6',
                  padding: '20px',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                }}
              >
                <div style={{ fontSize: '2rem' }}>{recompensa.icono || '🌟'}</div>
                <h4 style={{ fontFamily: 'Comic Sans MS', color: '#ff6600' }}>{recompensa.titulo}</h4>
                <p style={{ fontFamily: 'Comic Sans MS' }}>{recompensa.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recompensas;
