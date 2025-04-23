import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const VerPerfilEstudiante = () => {
  // Obtenemos los datos del estudiante desde el 'state' (pasados a través de la navegación)
  const location = useLocation();
  const { estudiante } = location.state || {};

  // Verifica si los datos están disponibles
  if (!estudiante) {
    return <p>No se encontraron datos del estudiante.</p>;
  }

  return (
    <ProfileContainer>
      <h2>Perfil del Estudiante</h2>
      <div>
        {/* Mostrar la imagen del perfil */}
        <ProfileImage src={estudiante.imagen} alt="Perfil" />
        <div>
          <h3>Nombre: {estudiante.nombre} {estudiante.apellido}</h3>
          <p>Edad: {estudiante.edad}</p>
          <p>Grado: {estudiante.grado}</p>
          <p>Intereses: {estudiante.intereses}</p>
          <p>Nivel Educativo: {estudiante.nivelEducativo}</p>
          <p>Ubicación: {estudiante.ubicacion}</p>
          <p>Género: {estudiante.genero}</p>
        </div>
      </div>
    </ProfileContainer>
  );
};

export default VerPerfilEstudiante;

// 🎨 Estilos
const ProfileContainer = styled.div`
  padding: 20px;
  background: linear-gradient(to right, #f6f6f6, #d3e0ea);
  font-family: sans-serif;
  text-align: center;

  h2 {
    color: #333;
  }

  div {
    margin-top: 20px;
    padding: 15px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  p {
    margin: 10px 0;
    font-size: 16px;
    color: #555;
  }
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
`;
