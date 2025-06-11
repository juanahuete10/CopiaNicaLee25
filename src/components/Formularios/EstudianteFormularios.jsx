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
  const [mostrarResumen, setMostrarResumen] = useState(false);
  const [codigoMined, setCodigoMined] = useState('');

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
    const fechaNac = new Date(fecha);
    const hoy = new Date();
    const diff = hoy - fechaNac;
    const edadCalc = new Date(diff).getUTCFullYear() - 1970;
    setEdad(edadCalc);
  };

  const pickImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagen(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const generarCodigoMinedAutomatico = () => {
    const fechaStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `MINED${fechaStr}${randomNum}`;
  };

  const validarDatos = () => {
    const ubicacionFinal = ubicacion === 'Otra' ? ubicacionOtra.trim() : ubicacion;

    const nuevosErrores = {
      nombre: !nombre.trim(),
      apellido: !apellido.trim(),
      grado: !grado,
      intereses: intereses.length === 0,
      nivelEducativo: !nivelEducativo,
      ubicacion: !ubicacionFinal,
      genero: !genero,
      imagen: !imagen,
      fechaNacimiento: !fechaNacimiento,
    };

    setErrores(nuevosErrores);
    return !Object.values(nuevosErrores).includes(true);
  };

  const handleMostrarResumen = () => {
    if (validarDatos()) {
      if (!codigoMined.trim()) {
        setCodigoMined(generarCodigoMinedAutomatico());
      }
      setMostrarResumen(true);
    } else {
      alert("¡Ups! Por favor completa todos los campos para continuar.");
    }
  };

  const handleConfirmarRegistro = () => {
    const estudiante = {
      id: Date.now(),
      nombre,
      apellido,
      edad,
      grado,
      intereses,
      nivelEducativo,
      ubicacion: ubicacion === 'Otra' ? ubicacionOtra.trim() : ubicacion,
      genero,
      imagen,
      codigoMined: codigoMined || generarCodigoMinedAutomatico(),
    };
    navigate('/dashboardnino', { state: { estudiante } });
  };

  const handleCancelarResumen = () => {
    setMostrarResumen(false);
  };

  const handleRegresarInicio = () => {
    navigate('/');
  };

  return (
    <Fondo>
      <Contenedor>
        <BotonRegresar onClick={handleRegresarInicio} title="Volver al inicio">
          <FaHome size={24} />
        </BotonRegresar>

        <Titulo>🎉 Registro Estudiantil 🎉</Titulo>

        {!mostrarResumen ? (
          <>
            <VistaImagen>
              {imagen ? (
                <img
                  src={imagen}
                  alt="Preview"
                  onClick={() => setVerImagenCompleta(true)}
                  title="Haz clic para ver grande"
                />
              ) : (
                <p>📸 ¡Sube tu foto!</p>
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

            <label>Selecciona tus intereses:</label>
            <Select
              multiple
              value={intereses}
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions).map(op => op.value);
                setIntereses(options);
              }}
              style={{ height: '90px' }}
            >
              <option value="Lectura">📖 Lectura</option>
              <option value="Matemáticas">➗ Matemáticas</option>
              <option value="Ciencias">🔬 Ciencias</option>
              <option value="Juegos">🎮 Juegos</option>
              <option value="Tecnología">💻 Tecnología</option>
              <option value="Arte">🎨 Arte</option>
            </Select>
            {errores.intereses && <Error>¡Elige al menos un interés! 🎯</Error>}

            <Select value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}>
              <option value="">Selecciona tu ubicación</option>
              <option value="Managua">Managua</option>
              <option value="León">León</option>
              <option value="Granada">Granada</option>
              <option value="Otra">Otra</option>
            </Select>
            {ubicacion === 'Otra' && (
              <Input type="text" placeholder="Escribe tu ubicación" value={ubicacionOtra} onChange={(e) => setUbicacionOtra(e.target.value)} />
            )}
            {errores.ubicacion && <Error>¡Indica dónde estás! 📍</Error>}

            <div>
              <label>Género:</label><br />
              <label><input type="radio" name="genero" value="Masculino" checked={genero === 'Masculino'} onChange={(e) => setGenero(e.target.value)} /> Masculino</label>
              {' '}
              <label><input type="radio" name="genero" value="Femenino" checked={genero === 'Femenino'} onChange={(e) => setGenero(e.target.value)} /> Femenino</label>
            </div>
            {errores.genero && <Error>¡Selecciona tu género! ⚧️</Error>}

            <Input type="text" placeholder="Código MINED (opcional)" value={codigoMined} onChange={(e) => setCodigoMined(e.target.value)} maxLength={20} />

            <BotonRegistrar onClick={handleMostrarResumen}>Registrar</BotonRegistrar>
          </>
        ) : (
          <Resumen>
            <h3>Resumen del Registro:</h3>
            <p>👤 {nombre} {apellido}</p>
            <p>🎂 Edad: {edad}</p>
            <p>📘 Grado: {grado}</p>
            <p>📚 Nivel: {nivelEducativo}</p>
            <p>🎯 Intereses: {intereses.join(', ')}</p>
            <p>📍 Ubicación: {ubicacion === 'Otra' ? ubicacionOtra : ubicacion}</p>
            <p>⚧️ Género: {genero}</p>
            <p>📄 Código MINED: {codigoMined}</p>
            <BotonRegistrar onClick={handleConfirmarRegistro}>Confirmar</BotonRegistrar>
            <BotonCancelar onClick={handleCancelarResumen}>Editar</BotonCancelar>
          </Resumen>
        )}
      </Contenedor>
    </Fondo>
  );
};

// 🔷 Estilos
const Fondo = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #9DE1F3, #FFFFFF);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Contenedor = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Titulo = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  width: 100%;
  margin: 10px 0;
  padding: 8px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const VistaImagen = styled.div`
  text-align: center;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const BotonRegistrar = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin: 15px 0;
  width: 100%;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
`;

const BotonCancelar = styled(BotonRegistrar)`
  background-color: #f44336;
`;

const Error = styled.p`
  color: red;
  margin: 0;
  font-size: 14px;
`;

const ErrorFoto = styled(Error)`
  margin-top: 5px;
`;

const Resumen = styled.div`
  text-align: center;
`;

const BotonRegresar = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #555;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

export default EstudianteFormularios;
