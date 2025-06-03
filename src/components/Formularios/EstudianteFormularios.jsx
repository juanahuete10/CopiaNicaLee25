import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
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
    const newErrores = {
      nombre: !nombre,
      apellido: !apellido,
      grado: !grado,
      intereses: intereses.length === 0,
      nivelEducativo: !nivelEducativo,
      ubicacion: !ubicacion,
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
      ubicacion,
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
          <FaHome size={28} />
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
            <p>📸 ¡Sube tu foto divertida!</p>
          )}
          <input type="file" accept="image/*" onChange={pickImage} />
          {errores.imagen && <ErrorFoto>¡No olvides subir tu foto! 🌟</ErrorFoto>}
        </VistaImagen>

        <Input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          maxLength={20}
        />
        {errores.nombre && <Error>¡Por favor, escribe tu nombre! 🥳</Error>}

        <Input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          maxLength={20}
        />
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

        <label style={{ fontWeight: 'bold', marginBottom: '5px', color: '#ff66cc' }}>
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

        <Input
          type="text"
          placeholder="¿Dónde vives?"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
        />
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

// Animaciones
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  } 
  40% {
    transform: translateY(-15px);
  } 
  60% {
    transform: translateY(-8px);
  }
`;

const Fondo = styled.div`
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
`;

const Contenedor = styled.div`
  background: #fff3f8;
  width: 650px;
  max-width: 95vw;
  padding: 40px 35px 50px 35px;
  border-radius: 35px;
  border: 6px solid;
  border-image: linear-gradient(45deg, #ff66cc, #ff3399) 1;
  box-shadow: 0 0 30px #ff66cc;
  position: relative;
  box-sizing: border-box;

  &:hover {
    box-shadow: 0 0 50px #ff33aa;
    transform: scale(1.03);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
`;

const Titulo = styled.h1`
  text-align: center;
  font-size: 36px;
  color: #ff3399;
  margin-bottom: 25px;
  text-shadow: 2px 2px 6px #ff66cc;
  user-select: none;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  margin-bottom: 15px;
  border-radius: 25px;
  border: 2px solid #ff99cc;
  background: #fff0f6;
  box-shadow: inset 3px 3px 8px #ffb3d9;
  font-size: 16px;
  color: #aa0066;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #ff3399;
    box-shadow: 0 0 8px #ff3399;
    background: #ffe6f2;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px 18px;
  margin-bottom: 15px;
  border-radius: 25px;
  border: 2px solid #ff99cc;
  background: #fff0f6;
  box-shadow: inset 3px 3px 8px #ffb3d9;
  font-size: 16px;
  color: #aa0066;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #ff3399;
    box-shadow: 0 0 8px #ff3399;
    background: #ffe6f2;
  }
`;

const Boton = styled.button`
  background: linear-gradient(45deg, #ff66cc, #ff3399);
  color: white;
  font-weight: 700;
  font-size: 22px;
  width: 100%;
  padding: 15px 0;
  border-radius: 30px;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 12px #ff3399;
  transition: background 0.3s, transform 0.2s;
  user-select: none;

  &:hover {
    background: linear-gradient(45deg, #ff3399, #ff66cc);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Error = styled.p`
  color: #d1006c;
  font-weight: 700;
  margin-top: -12px;
  margin-bottom: 12px;
  font-size: 14px;
  user-select: none;
  animation: ${bounce} 1.5s;
`;

const ErrorFoto = styled(Error)`
  text-align: center;
`;

const VistaImagen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;

  img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    border: 4px solid #ff66cc;
    cursor: pointer;
    box-shadow: 0 0 15px #ff66cc;
    object-fit: cover;
    margin-bottom: 10px;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.12);
    }
  }

  p {
    font-size: 18px;
    color: #ff3399;
    margin-bottom: 10px;
    user-select: none;
  }

  input[type="file"] {
    cursor: pointer;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255, 20, 147, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  cursor: pointer;
`;

const ImagenGrande = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 20px;
  box-shadow: 0 0 40pxrgb(51, 241, 255);
`;

const BotonRegresar = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  background: transparent;
  border: none;
  color:rgb(51, 156, 255);
  cursor: pointer;
  transition: color 0.3s;
  user-select: none;

  &:hover {
    color: #ff66cc;
  }
`;

const Decoraciones = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 15px;
  font-size: 30px;
  user-select: none;
`;
