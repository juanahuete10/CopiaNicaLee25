import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const EstudianteFormularios = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [grado, setGrado] = useState('');
  const [intereses, setIntereses] = useState('');
  const [nivelEducativo, setNivelEducativo] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [genero, setGenero] = useState('');
  const [imagen, setImagen] = useState(null);

  const navigate = useNavigate();

  const pickImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagen(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRegistro = () => {
    if (
      !nombre || !apellido || !edad || !grado || !intereses ||
      !nivelEducativo || !ubicacion || !genero || !imagen
    ) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }
  
    const estudiante = {
      id: Date.now(),
      nombre,
      apellido,
      edad,
      grado,
      intereses,
      nivelEducativo,
      ubicacion,
      genero,
      imagen,
    };
  
    console.log(estudiante); // Imprimir el objeto para asegurarnos de que tiene los datos correctos
  
    // Navega al dashboard del estudiante después de completar el registro
    navigate('/dashboard', { state: { estudiante } });
  
    // Limpiar campos
    setNombre('');
    setApellido('');
    setEdad('');
    setGrado('');
    setIntereses('');
    setNivelEducativo('');
    setUbicacion('');
    setGenero('');
    setImagen(null);
  };
  

  return (
    <GradientContainer>
      <div className="container">
        <h2>Registro de Estudiante</h2>

        <div>
          {imagen ? (
            <img src={imagen} alt="Perfil" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
          ) : (
            <p>Selecciona tu foto de perfil</p>
          )}
          <input type="file" onChange={pickImage} required />
        </div>

        <InputField type="text" placeholder="Nombres" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <InputField type="text" placeholder="Apellidos" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        <InputField type="number" placeholder="Edad" value={edad} onChange={(e) => setEdad(e.target.value)} />

        <SelectField value={grado} onChange={(e) => setGrado(e.target.value)} >
          <option value="">Selecciona el grado</option>
          <option value="Primero">Primero</option>
          <option value="Segundo">Segundo</option>
          <option value="Tercero">Tercero</option>
          <option value="Cuarto">Cuarto</option>
          <option value="Quinto">Quinto</option>
          <option value="Sexto">Sexto</option>
        </SelectField>

        <SelectField value={nivelEducativo} onChange={(e) => setNivelEducativo(e.target.value)} >
          <option value="">Selecciona el nivel educativo</option>
          <option value="Primaria">Primaria</option>
          <option value="Secundaria">Secundaria</option>
          <option value="Preparatoria">Preparatoria</option>
          <option value="Universidad">Universidad</option>
        </SelectField>

        <InputField type="text" placeholder="Intereses" value={intereses} onChange={(e) => setIntereses(e.target.value)} />
        <InputField type="text" placeholder="Ubicación" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />

        {/* Cambio de género a un campo de selección */}
        <SelectField value={genero} onChange={(e) => setGenero(e.target.value)} >
          <option value="">Selecciona tu género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </SelectField>

        <StyledButton onClick={handleRegistro}>Registrar Estudiante</StyledButton>
      </div>
    </GradientContainer>
  );
};

export default EstudianteFormularios;

// 🎨 Estilos
const GradientContainer = styled.div`
  padding: 20px;
  background: linear-gradient(to right, #f6f6f6, #d3e0ea);
  font-family: sans-serif;
`;

const InputField = styled.input`
  display: block;
  margin: 10px 0;
  padding: 8px;
  width: 100%;
`;

const SelectField = styled.select`
  display: block;
  margin: 10px 0;
  padding: 8px;
  width: 100%;
`;

// 🎨 Botón centrado estilizado
const StyledButton = styled.button`
  padding: 12px 25px;
  background-color: #28a745; /* Verde */
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: block;
  margin: 20px auto; /* Esto centra el botón */
  width: auto; /* Ancho automático */
  
  &:hover {
    background-color: #218838; /* Verde más oscuro */
    transform: scale(1.05);
  }

  &:active {
    background-color: #1e7e34; /* Verde más oscuro al hacer clic */
    transform: scale(1);
  }
`;
