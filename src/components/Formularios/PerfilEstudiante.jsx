import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

function PerfilEstudiante({ estudianteId }) {
  const [estudiante, setEstudiante] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [previewFoto, setPreviewFoto] = useState(null);

  useEffect(() => {
    const fetchEstudiante = async () => {
      if (estudianteId) {
        try {
          const estudiantesRef = collection(db, 'estudiantes');
          const q = query(estudiantesRef, where('uid', '==', estudianteId));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const estudianteRef = querySnapshot.docs[0];
            setEstudiante(estudianteRef.data());
            setPreviewFoto(estudianteRef.data().fotoPerfil || null);
          } else {
            console.log('No se encontró el estudiante con UID:', estudianteId);
          }
        } catch (error) {
          console.error('Error al obtener el estudiante:', error);
        }
      }
      setCargando(false);
    };

    fetchEstudiante();
  }, [estudianteId]);

  if (cargando) {
    return <div>Cargando...</div>;
  }

  if (!estudiante) {
    return <div>No se encontró el perfil del estudiante</div>;
  }

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Perfil Estudiante</h1>
      <img
        src={previewFoto || 'default-foto.png'}
        alt="Foto de perfil"
        width={100}
        height={100}
        style={{ borderRadius: "50%", marginBottom: "1rem" }}
      />
      <p><strong>Nombre:</strong> {estudiante.nombre}</p>
      <p><strong>Apellido:</strong> {estudiante.apellido}</p>
      <p><strong>Email:</strong> {estudiante.email}</p>
    </div>
  );
}

export default PerfilEstudiante;
