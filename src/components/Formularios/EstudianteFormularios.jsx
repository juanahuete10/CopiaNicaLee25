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
  
  // --- AGREGADO: estado para código MINED ---
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
    // --- AGREGADO: no obligatorio, así que no lo agregamos en errores ---
  });

  const navigate = useNavigate();

  // Función para calcular la edad desde fecha nacimiento
  const calcularEdad = (fecha) => {
    const fechaNac = new Date(fecha);
    const hoy = new Date();
    const diff = hoy - fechaNac;
    const edadCalc = new Date(diff).getUTCFullYear() - 1970;
    setEdad(edadCalc);
  };

  // Manejo de la imagen cargada por input file
  const pickImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagen(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Función para generar código MINED automático
  const generarCodigoMinedAutomatico = () => {
    // Ejemplo: "MINED" + fecha + random 4 dígitos
    const fechaStr = new Date().toISOString().slice(0,10).replace(/-/g, '');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `MINED${fechaStr}${randomNum}`;
  };

  // Validar datos para mostrar resumen
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

  // Cuando el usuario da clic en "Registrarse" para mostrar resumen
  const handleMostrarResumen = () => {
    if (validarDatos()) {
      // --- AGREGADO: si no hay código MINED, generar uno automático ---
      if (!codigoMined.trim()) {
        const nuevoCodigo = generarCodigoMinedAutomatico();
        setCodigoMined(nuevoCodigo);
      }
      setMostrarResumen(true);
    } else {
      alert("¡Ups! Por favor completa todos los campos para continuar.");
    }
  };

  // Confirmar registro y navegar al dashboard
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
      codigoMined: codigoMined || generarCodigoMinedAutomatico(), // por seguridad
    };
    navigate('/dashboardnino', { state: { estudiante } });
  };

  // Cancelar resumen para editar datos
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

            <Input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errores.nombre && <Error>¡Por favor, escribe tu nombre! 🥳</Error>}

            <Input
              type="text"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
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
            {errores.intereses && <Error>¡Elige al menos un interés! 🎯</Error>}

            <Select value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}>
              <option value="">Selecciona tu ubicación</option>
              <option value="Managua">Managua</option>
              <option value="León">León</option>
              <option value="Granada">Granada</option>
              <option value="Otra">Otra</option>
            </Select>
            {ubicacion === 'Otra' && (
              <Input
                type="text"
                placeholder="Escribe tu ubicación"
                value={ubicacionOtra}
                onChange={(e) => setUbicacionOtra(e.target.value)}
              />
            )}
            {errores.ubicacion && <Error>¡Indica dónde estás! 📍</Error>}

            <div>
              <label style={{ fontWeight: 'bold' }}>Género:</label><br />
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="Masculino"
                  checked={genero === 'Masculino'}
                  onChange={(e) => setGenero(e.target.value)}
                /> Masculino
              </label>
              {' '}
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="Femenino"
                  checked={genero === 'Femenino'}
                  onChange={(e) => setGenero(e.target.value)}
                /> Femenino
              </label>
            </div>
            {errores.genero && <Error>¡Selecciona tu género! ⚧️</Error>}

            {/* --- AGREGADO: input opcional para código MINED --- */}
            <Input
              type="text"
              placeholder="Código MINED (opcional)"
              value={codigoMined}
              onChange={(e) => setCodigoMined(e.target.value)}
              maxLength={20}
            />

            <BotonRegistrar onClick={handleMostrarResumen}>
              Mostrar resumen para confirmar
            </BotonRegistrar>
          </>
        ) : (
          <Resumen>
            <h2>Resumen de tu registro</h2>
            <p><strong>Nombre:</strong> {nombre} {apellido}</p>
            <p><strong>Edad:</strong> {edad} años</p>
            <p><strong>Fecha de nacimiento:</strong> {fechaNacimiento}</p>
            <p><strong>Grado escolar:</strong> {grado}</p>
            <p><strong>Nivel educativo:</strong> {nivelEducativo}</p>
            <p><strong>Intereses:</strong> {intereses.join(', ')}</p>
            <p><strong>Ubicación:</strong> {ubicacion === 'Otra' ? ubicacionOtra : ubicacion}</p>
            <p><strong>Género:</strong> {genero}</p>
            <p><strong>Código MINED:</strong> {codigoMined}</p> {/* Mostrar código generado o ingresado */}
            {imagen && <img src={imagen} alt="Foto del estudiante" style={{ width: '200px', borderRadius: '15px', marginTop: '10px' }} />}
            <ContBotones>
              <BotonConfirmar onClick={handleConfirmarRegistro}>Confirmar Registro</BotonConfirmar>
              <BotonCancelar onClick={handleCancelarResumen}>Editar Datos</BotonCancelar>
            </ContBotones>
          </Resumen>
        )}

        {verImagenCompleta && (
          <ImagenGrande onClick={() => setVerImagenCompleta(false)}>
            <img src={imagen} alt="Imagen completa" />
          </ImagenGrande>
        )}
      </Contenedor>
    </Fondo>
  );
};

const Fondo = styled.div`
  background: linear-gradient(to right, #f8fafc, #e0f2fe);
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Comic Sans MS', cursive, sans-serif;
`;

const Contenedor = styled.div`
  max-width: 420px;
  margin: auto;
  background: #fff;
  border-radius: 30px;
  padding: 30px 25px 40px;
  box-shadow: 0 15px 30px rgba(0,0,0,0.15);
  position: relative;
`;

const BotonRegresar = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  background: #fbbf24;
  border: none;
  border-radius: 50%;
  padding: 7px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background: #f59e0b;
  }
`;

const Decoraciones = styled.div`
  font-size: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  color: #fbbf24;
`;

const Titulo = styled.h1`
  text-align: center;
  margin-bottom: 25px;
  font-weight: 900;
  color: #0f172a;
  font-size: 26px;
`;

const VistaImagen = styled.div`
  border: 3px solid #fbbf24;
  border-radius: 25px;
  padding: 10px;
  margin-bottom: 20px;
  text-align: center;
  background: #fff9e5;
  p {
    font-size: 16px;
    color: #a16207;
  }
  img {
    max-width: 100%;
    max-height: 150px;
    border-radius: 20px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  input[type='file'] {
    margin-top: 8px;
  }
`;

const Input = styled.input`
  width: 100%;
  border-radius: 15px;
  padding: 10px 14px;
  border: 2px solid #fbbf24;
  margin-bottom: 15px;
  font-size: 14px;
  transition: all 0.3s ease;
  &:focus {
    border-color: #f59e0b;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  border-radius: 15px;
  padding: 10px 14px;
  border: 2px solid #fbbf24;
  margin-bottom: 15px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  &:focus {
    border-color: #f59e0b;
    outline: none;
  }
`;

const BotonRegistrar = styled.button`
  width: 100%;
  background: #fbbf24;
  border: none;
  border-radius: 25px;
  padding: 14px 0;
  font-weight: 700;
  font-size: 18px;
  color: #0c0c0c;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background: #f59e0b;
  }
`;

const Error = styled.div`
  color: #b91c1c;
  font-weight: 700;
  margin-top: -12px;
  margin-bottom: 10px;
  font-size: 13px;
  font-style: italic;
`;

const ErrorFoto = styled(Error)`
  margin-top: 0;
`;

const Resumen = styled.div`
  text-align: center;
  font-size: 15px;
  color: #334155;
  h2 {
    margin-bottom: 20px;
    font-weight: 800;
    color: #b45309;
  }
  p {
    margin-bottom: 10px;
  }
  img {
    border: 3px solid #fbbf24;
  }
`;

const ContBotones = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-around;
  gap: 20px;
`;

const BotonConfirmar = styled.button`
  background: #16a34a;
  border: none;
  border-radius: 25px;
  padding: 12px 25px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background: #15803d;
  }
`;

const BotonCancelar = styled.button`
  background: #ef4444;
  border: none;
  border-radius: 25px;
  padding: 12px 25px;
  font-weight: 700;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background: #b91c1c;
  }
`;

const ImagenGrande = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 20px;
    box-shadow: 0 0 15px #fbbf24;
    cursor: zoom-out;
  }
`;

export default EstudianteFormularios;
