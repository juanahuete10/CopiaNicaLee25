// EditarPerfilEstudiante.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EditarPerfilEstudiante = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const estudiante = location.state?.estudiante;

  // Si no hay datos, redirigir a perfil (evita error)
  if (!estudiante) {
    navigate('/perfil-estudiante');
    return null;
  }

  const [nombre, setNombre] = useState(estudiante.nombre || '');
  const [apellido, setApellido] = useState(estudiante.apellido || '');
  const [edad, setEdad] = useState(estudiante.edad || '');
  const [grado, setGrado] = useState(estudiante.grado || '');
  const [intereses, setIntereses] = useState(estudiante.intereses || '');
  const [nivelEducativo, setNivelEducativo] = useState(estudiante.nivelEducativo || '');
  const [ubicacion, setUbicacion] = useState(estudiante.ubicacion || '');
  const [genero, setGenero] = useState(estudiante.genero || '');
  const [imagen, setImagen] = useState(estudiante.imagen || null);

  const pickImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagen(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGuardarCambios = () => {
    if (!nombre || !apellido || !edad || !grado || !nivelEducativo || !intereses || !ubicacion || !genero) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const estudianteActualizado = {
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

    // Aquí guardarías los datos actualizados en la base de datos

    // Por ahora solo redirigimos al perfil pasando los datos actualizados
    navigate('/perfil-estudiante', { state: { estudiante: estudianteActualizado } });
  };

  return (
    <div>
      <h2>Editar Perfil</h2>
      <div>
        {imagen ? (
          <img 
            src={imagen} 
            alt="Perfil" 
            style={{ width: '150px', height: '150px', borderRadius: '50%' }} 
          />
        ) : (
          <p>Selecciona tu foto de perfil</p>
        )}
        <input type="file" onChange={pickImage} />
      </div>

      <div>
        <input 
          type="text" 
          value={nombre} 
          onChange={(e) => setNombre(e.target.value)} 
          placeholder="Nombres" 
        />
      </div>

      <div>
        <input 
          type="text" 
          value={apellido} 
          onChange={(e) => setApellido(e.target.value)} 
          placeholder="Apellidos" 
        />
      </div>

      <div>
        <input 
          type="number" 
          value={edad} 
          onChange={(e) => setEdad(e.target.value)} 
          placeholder="Edad" 
        />
      </div>

      <div>
        <select value={grado} onChange={(e) => setGrado(e.target.value)}>
          <option value="">Selecciona el grado</option>
          <option value="Primero">Primero</option>
          <option value="Segundo">Segundo</option>
          <option value="Tercero">Tercero</option>
          <option value="Cuarto">Cuarto</option>
          <option value="Quinto">Quinto</option>
          <option value="Sexto">Sexto</option>
        </select>
      </div>

      <div>
        <select value={nivelEducativo} onChange={(e) => setNivelEducativo(e.target.value)}>
          <option value="">Selecciona el nivel educativo</option>
          <option value="Primaria">Primaria</option>
          <option value="Secundaria">Secundaria</option>
          <option value="Preparatoria">Preparatoria</option>
          <option value="Universidad">Universidad</option>
        </select>
      </div>

      <div>
        <input 
          type="text" 
          value={intereses} 
          onChange={(e) => setIntereses(e.target.value)} 
          placeholder="Intereses" 
        />
      </div>

      <div>
        <input 
          type="text" 
          value={ubicacion} 
          onChange={(e) => setUbicacion(e.target.value)} 
          placeholder="Ubicación" 
        />
      </div>

      <div>
        <select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="">Selecciona género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
      </div>

      <div>
        <button onClick={handleGuardarCambios}>Guardar Cambios</button>
      </div>
    </div>
  );
};

export default EditarPerfilEstudiante;
