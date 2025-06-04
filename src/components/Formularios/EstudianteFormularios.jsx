import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const EstudianteFormularios = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [edad, setEdad] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [grado, setGrado] = useState('');
  const [intereses, setIntereses] = useState([]);
  const [nivelEducativo, setNivelEducativo] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [ubicacionOtra, setUbicacionOtra] = useState('');
  const [genero, setGenero] = useState('');
  const [imagen, setImagen] = useState(null);
  const [verImagenCompleta, setVerImagenCompleta] = useState(false);
  const [errores, setErrores] = useState({
    nombre: false,
    apellido: false,
    grado: false,
    intereses: false,
    nivelEducativo: false,
    ubicacion: false,
    genero: false,
    imagen: false,
    fechaNacimiento: false,
  });

  const navigate = useNavigate();

  const calcularEdad = (fecha) => {
    const fechaNacimiento = new Date(fecha);
    const hoy = new Date();
    const diferencia = hoy - fechaNacimiento;
    const edadCalculada = new Date(diferencia).getUTCFullYear() - 1970;
    setEdad(edadCalculada);
  };

  const pickImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagen(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRegistro = () => {
    const ubicacionFinal = ubicacion === 'Otra' ? ubicacionOtra.trim() : ubicacion;

    const newErrores = {
      nombre: !nombre,
      apellido: !apellido,
      grado: !grado,
      intereses: intereses.length === 0,
      nivelEducativo: !nivelEducativo,
      ubicacion: !ubicacionFinal,
      genero: !genero,
      imagen: !imagen,
      fechaNacimiento: !fechaNacimiento,
    };

    setErrores(newErrores);

    if (Object.values(newErrores).includes(true)) {
      alert("¡Ups! Por favor completa todos los campos para continuar.");
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
      ubicacion: ubicacionFinal,
      genero,
      imagen,
    };

    navigate('/dashboardnino', { state: { estudiante } });
  };

  const handleRegresarInicio = () => {
    navigate('/');
  };

  return (
    <Fondo>
      <Contenedor>
        <BotonRegresar onClick={handleRegresarInicio} title="Volver al inicio">
          <FaHome size={30} />
        </BotonRegresar>

        <Decoraciones>
          <span role="img" aria-label="emoji">📚</span>
          <span role="img" aria-label="emoji">🌈</span>
          <span role="img" aria-label="emoji">☁️</span>
          <span role="img" aria-label="emoji">✨</span>
          <span role="img" aria-label="emoji">🦄</span>
        </Decoraciones>

        <Titulo>🎉 Registro Estudiantil 🎉</Titulo>

        <VistaImagen>
          {imagen ? (
            <img
              src={imagen}
              alt="Preview"
              onClick={() => setVerImagenCompleta(true)}
              title="Haz clic para ver grande"
            />
          ) : (
            <p>📸 ¡Sube tu foto !</p>
          )}
          <input type="file" accept="image/*" onChange={pickImage} />
          {errores.imagen && <ErrorFoto>¡No olvides subir tu foto! 🌟</ErrorFoto>}
        </VistaImagen>

        <Input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        {errores.nombre && <Error>¡Por favor, escribe tu nombre! 🥳</Error>}

        <Input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
        {errores.apellido && <Error>¡Tu apellido también es importante! 🎈</Error>}

        <Input
          type="date"
          value={fechaNacimiento}
          onChange={(e) => {
            setFechaNacimiento(e.target.value);
            calcularEdad(e.target.value);
          }}
          max={new Date().toISOString().split('T')[0]}
        />
        {errores.fechaNacimiento && <Error>¡Dinos cuándo naciste! 🎂</Error>}

        <Input type="text" value={edad} placeholder="Edad" disabled />

        <Select value={grado} onChange={(e) => setGrado(e.target.value)}>
          <option value="">Selecciona tu grado escolar</option>
          <option value="Primero">Primero</option>
          <option value="Segundo">Segundo</option>
          <option value="Tercero">Tercero</option>
          <option value="Cuarto">Cuarto</option>
          <option value="Quinto">Quinto</option>
          <option value="Sexto">Sexto</option>
        </Select>
        {errores.grado && <Error>¡Selecciona tu grado! 🏫</Error>}

        <Select value={nivelEducativo} onChange={(e) => setNivelEducativo(e.target.value)}>
          <option value="">Nivel Educativo</option>
          <option value="Inicial">Inicial</option>
          <option value="Medio">Medio</option>
          <option value="Avanzado">Avanzado</option>
        </Select>
        {errores.nivelEducativo && <Error>¡Elige tu nivel educativo! 📚</Error>}

        <label style={{ fontWeight: 'bold', marginBottom: '5px', color: '#000000' }}>
          Selecciona tus intereses:
        </label>
        <Select
          multiple
          value={intereses}
          onChange={(e) => {
            const options = Array.from(e.target.selectedOptions).map(op => op.value);
            setIntereses(options);
          }}
          style={{ height: '90px', fontSize: '14px' }}
        >
          <option value="Lectura">📖 Lectura</option>
          <option value="Matemáticas">➗ Matemáticas</option>
          <option value="Ciencias">🔬 Ciencias</option>
          <option value="Juegos">🎮 Juegos</option>
          <option value="Tecnología">💻 Tecnología</option>
          <option value="Arte">🎨 Arte</option>
        </Select>
        {errores.intereses && <Error>¡Elige al menos un interés! 🌟</Error>}

        <Select value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}>
          <option value="">Selecciona tu localidad</option>
          <option value="Juigalpa">Juigalpa</option>
          <option value="Tecolostote">Tecolostote</option>
          <option value="Boaco">Boaco</option>
          <option value="San Lorenzo">San Lorenzo</option>
          <option value="Santo Tómas">Santo Tómas</option>
          <option value="Managua">Managua</option>
          <option value="San Esteban">San Esteban</option>
          <option value="Matagalpa">Matagalpa</option>
          <option value="Camoapa">Camoapa</option>
          <option value="Estelí">Estelí</option>
          <option value="Otra">Otra</option>
        </Select>
        {ubicacion === 'Otra' && (
          <Input
            type="text"
            placeholder="Escribe tu localidad"
            value={ubicacionOtra}
            onChange={(e) => setUbicacionOtra(e.target.value)}
          />
        )}
        {errores.ubicacion && <Error>¡La ubicación es necesaria! 📍</Error>}

        <Select value={genero} onChange={(e) => setGenero(e.target.value)}>
          <option value="">Género</option>
          <option value="Masculino">👦 Masculino</option>
          <option value="Femenino">👧 Femenino</option>
          <option value="Otro">🌟 Otro</option>
        </Select>
        {errores.genero && <Error>¡Selecciona tu género! 🚀</Error>}

        <Boton onClick={handleRegistro}>🚀 ¡Regístrate y diviértete!</Boton>

        {verImagenCompleta && (
          <Overlay onClick={() => setVerImagenCompleta(false)}>
            <ImagenGrande src={imagen} alt="Imagen completa" />
          </Overlay>
        )}
      </Contenedor>
    </Fondo>
  );
};

export default EstudianteFormularios;

// 🎨 Estilos
const Fondo = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom right, #9DE1F3, #FFFFFF);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const Contenedor = styled.div`
  max-width: 600px;
  width: 100%;
  background: #ffffffcc;
  padding: 25px 35px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(157, 225, 243, 0.5);
  text-align: center;
  position: relative;
`;

const Titulo = styled.h2`
  margin-bottom: 20px;
  font-size: 2.3rem;
  color: #004466;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  margin: 10px 0 6px 0;
  font-size: 16px;
  border-radius: 20px;
  border: 1.8px solid #00aaff;
  outline: none;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 14px;
  margin: 10px 0 6px 0;
  font-size: 16px;
  border-radius: 15px;
  border: 1.8px solid #00aaff;
  outline: none;
`;

const Boton = styled.button`
  background-color: #00aaff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  padding: 12px 20px;
  margin-top: 20px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color: #0077aa;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 13px;
  margin: 0 0 8px;
`;

const ErrorFoto = styled.p`
  color: darkred;
  font-weight: bold;
  font-size: 14px;
`;

const VistaImagen = styled.div`
  margin: 15px 0;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid #00aaff;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ImagenGrande = styled.img`
  max-width: 80%;
  max-height: 80%;
  border: 5px solid white;
  border-radius: 10px;
`;

const BotonRegresar = styled.button`
  position: absolute;
  left: 20px;
  top: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #0077aa;
`;

const Decoraciones = styled.div`
  display: flex;
  justify-content: center;
  font-size: 24px;
  gap: 10px;
  margin-bottom: 15px;
`;
