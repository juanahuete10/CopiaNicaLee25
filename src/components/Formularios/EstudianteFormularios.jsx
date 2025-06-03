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

const Fondo = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #00aaff 0%, #ffffff 100%);
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
  box-shadow: 0 10px 30px rgba(0, 170, 255, 0.3);
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
  border-radius: 20px;  /* aquí más redondeado */
  border: 1.8px solid #00aaff;
  outline: none;
  &:focus {
    border-color: #005577;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 14px;
  margin: 10px 0 6px 0;
  font-size: 16px;
  border-radius: 20px; /* aquí más redondeado */
  border: 1.8px solid #00aaff;
  background: white;
  outline: none;
  &:focus {
    border-color: #005577;
  }
`;


const Boton = styled.button`
  margin-top: 18px;
  background: #0088dd;
  color: white;
  font-weight: bold;
  border: none;
  padding: 14px 0;
  width: 100%;
  border-radius: 12px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #005577;
  }
`;

const Error = styled.p`
  margin: 0 0 10px 0;
  font-size: 13px;
  color: #ff4444;
  font-weight: 600;
`;

const ErrorFoto = styled.p`
  font-size: 13px;
  color: #cc0000;
  font-weight: 600;
  margin-top: 4px;
`;

const VistaImagen = styled.div`
  margin-bottom: 15px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 15px;
    object-fit: cover;
    cursor: pointer;
    border: 3px solid #00aaff;
    margin-bottom: 8px;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.07);
      border-color: #005577;
    }
  }
  p {
    font-size: 16px;
    color: #555;
  }
  input[type='file'] {
    display: block;
    margin: 8px auto 0 auto;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: pointer;
`;

const ImagenGrande = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 20px;
`;

const BotonRegresar = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: transparent;
  border: none;
  color: #004466;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #00aaff;
  }
`;

const Decoraciones = styled.div`
  font-size: 28px;
  margin-bottom: 18px;
  > span {
    margin: 0 8px;
  }
`;
