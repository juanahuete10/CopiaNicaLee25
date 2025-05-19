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

  const pickImage = async (e) => {
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
      alert("Por favor completa todos los campos obligatorios.");
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
    <RainbowBackground>
      <FormWrapper>
        <BackButton onClick={handleRegresarInicio}>
          <FaHome size={30} />
        </BackButton>

        <Decorations>
          <span role="img" aria-label="book">📚</span>
          <span role="img" aria-label="rainbow">🌈</span>
          <span role="img" aria-label="cloud">☁️</span>
        </Decorations>

        <FormCard>
          <Title>📚 Registro Estudiantil 📚</Title>

          <ImagePreview>
            {imagen ? (
              <img
                src={imagen}
                alt="Perfil"
                onClick={() => setVerImagenCompleta(true)}
              />
            ) : (
              <p>📸 ¡Sube tu foto!</p>
            )}
            <input type="file" accept="image/*" onChange={pickImage} />
            {errores.imagen && <ErrorText>¡La foto es obligatoria!</ErrorText>}
          </ImagePreview>

          <Input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          {errores.nombre && <ErrorText>¡El nombre es obligatorio!</ErrorText>}

          <Input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          {errores.apellido && <ErrorText>¡El apellido es obligatorio!</ErrorText>}

          <Input 
            type="date" 
            placeholder="Fecha de Nacimiento" 
            value={fechaNacimiento} 
            onChange={(e) => {
              setFechaNacimiento(e.target.value);
              calcularEdad(e.target.value);
            }} 
          />
          {errores.fechaNacimiento && <ErrorText>¡La fecha de nacimiento es obligatoria!</ErrorText>}
          
          <Input type="text" placeholder="Edad" value={edad} disabled />

          <Select value={grado} onChange={(e) => setGrado(e.target.value)}>
            <option value="">Grado</option>
            <option value="Primero">Primero</option>
            <option value="Segundo">Segundo</option>
            <option value="Tercero">Tercero</option>
            <option value="Cuarto">Cuarto</option>
            <option value="Quinto">Quinto</option>
            <option value="Sexto">Sexto</option>
          </Select>
          {errores.grado && <ErrorText>¡El grado es obligatorio!</ErrorText>}

          <Select value={nivelEducativo} onChange={(e) => setNivelEducativo(e.target.value)}>
            <option value="">Nivel Educativo</option>
            <option value="Inicial">Inicial</option>
            <option value="Medio">Medio</option>
            <option value="Avanzado">Avanzado</option>
          </Select>
          {errores.nivelEducativo && <ErrorText>¡El nivel educativo es obligatorio!</ErrorText>}

          <label style={{ fontSize: "14px", marginBottom: "5px", display: "block", textAlign: "left" }}>
            Selecciona tus intereses:
          </label>
          <Select
            multiple
            value={intereses}
            onChange={(e) => {
              const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
              setIntereses(selectedOptions);
            }}
          >
            <option value="Lectura">Lectura</option>
            <option value="Matemáticas">Matemáticas</option>
            <option value="Ciencias">Ciencias</option>
            <option value="Juegos">Juegos</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Arte">Arte</option>
          </Select>
          {errores.intereses && <ErrorText>¡Debes seleccionar al menos un interés!</ErrorText>}

          <Input type="text" placeholder="Ubicación" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)} />
          {errores.ubicacion && <ErrorText>¡La ubicación es obligatoria!</ErrorText>}

          <Select value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option value="">Género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </Select>
          {errores.genero && <ErrorText>¡El género es obligatorio!</ErrorText>}

          <Button onClick={handleRegistro}>
            🚀 Registrar
          </Button>
        </FormCard>

        {verImagenCompleta && (
          <FullImageOverlay onClick={() => setVerImagenCompleta(false)}>
            <FullImage src={imagen} alt="Perfil grande" />
          </FullImageOverlay>
        )}
      </FormWrapper>
    </RainbowBackground>
  );
};

export default EstudianteFormularios;


// 🎨 ESTILOS
const RainbowBackground = styled.div`
  background: linear-gradient(to bottom right,rgb(76, 163, 245),rgb(248, 248, 248),rgb(248, 248, 245),rgb(247, 105, 117), #bdb2ff);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 460px;
  text-align: center;
  position: relative;
`;

const FormCard = styled.div`
  background: #ffffffd9;
  backdrop-filter: blur(6px);
  border-radius: 25px;
  box-shadow: 0 0 25px rgba(0, 153, 255, 0.3);
  padding: 30px;
`;

const Title = styled.h1`
  font-size: 26px;
  color: #0077ff;
  margin-bottom: 20px;
  font-family: 'Comic Sans MS', cursive;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 2px solid #7bdff2;
  border-radius: 15px;
  font-size: 14px;
  background-color: #f3f3f3;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 2px solid #7bdff2;
  border-radius: 15px;
  font-size: 14px;
  background-color: #f3f3f3;
`;

const Button = styled.button`
  background-color: #00bbf9;
  color: white;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  width: 100%;
  font-family: 'Comic Sans MS', cursive;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; 
  transition: 0.3s;

  &:hover {
    background-color: #f15bb5;
    transform: scale(1.05);
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 13px;
  margin-bottom: 10px;
`;

const ImagePreview = styled.div`
  margin-bottom: 15px;

  img {
    width: 130px; 
    height: 130px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #00bbf9;
    cursor: pointer;
  }

  input {
    margin-top: 10px;
    font-size: 13px;
  }

  p {
    color: #777;
    font-size: 14px;
  }
`;

const BackButton = styled.div`
  position: fixed;
  left: 20px;
  top: 20px;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  z-index: 999;
`;

const Decorations = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
`;

const FullImageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FullImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
`;
