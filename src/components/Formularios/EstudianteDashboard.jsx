import React from 'react';
import { useLocation } from 'react-router-dom';

const DashboardEstudiante = () => {
  const location = useLocation();
  const estudiante = location.state?.estudiante;

  if (!estudiante) {
    return <p>No se encontraron datos del estudiante.</p>;
  }

  return (
    <div>
      <h2>Dashboard del Estudiante</h2>
      <h3>{estudiante.nombre} {estudiante.apellido}</h3>
      <p>Edad: {estudiante.edad}</p>
      <p>Grado: {estudiante.grado}</p>
      <p>Intereses: {estudiante.intereses}</p>
      <p>Nivel Educativo: {estudiante.nivelEducativo}</p>
      <p>Ubicación: {estudiante.ubicacion}</p>
      <p>Género: {estudiante.genero}</p>
      <img src={estudiante.imagen} alt="Perfil" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
    </div>
  );
};

export default DashboardEstudiante;
