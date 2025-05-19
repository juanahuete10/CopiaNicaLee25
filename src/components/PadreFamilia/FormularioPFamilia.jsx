import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaHome } from 'react-icons/fa';

const FormularioPFamilia = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [genero, setGenero] = useState('');
  const [cuantosHijosEstudian, setCuantosHijosEstudian] = useState('');
  const [gradoHijos, setGradoHijos] = useState('');
  const [imagen, setImagen] = useState(null);
  const [verImagenCompleta, setVerImagenCompleta] = useState(false);

  const [errores, setErrores] = useState({
    nombre: false,
    apellido: false,
    gradoHijos: false,
    cuantosHijosEstudian: false,
    localidad: false,
    genero: false,
    imagen: false,
    fechaNacimiento: false,
  });

  const navigate = useNavigate();

  // Calcula la edad a partir de la fecha de nacimiento
  const calcularEdad = (fecha) => {
    if (!fecha) return '';
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    let edadCalculada = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edadCalculada--;
    }
    return edadCalculada;
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
    // Validar todos los campos excepto edad que es calculada
    const newErrores = {
      nombre: !nombre.trim(),
      apellido: !apellido.trim(),
      gradoHijos: !gradoHijos,
      cuantosHijosEstudian: !cuantosHijosEstudian,
      localidad: !localidad.trim(),
      genero: !genero,
      imagen: !imagen,
      fechaNacimiento: !fechaNacimiento,
    };

    setErrores(newErrores);

    if (Object.values(newErrores).includes(true)) {
      alert("Por favor completa todos los campos obligatorios.");
      return;
    }

    const edadCalculada = calcularEdad(fechaNacimiento);

    const padreFamilia = {
      id: Date.now(),
      nombre,
      apellido,
      edad: edadCalculada,
      fechaNacimiento,
      localidad,
      genero,
      cuantosHijosEstudian,
      gradoHijos,
      imagen,
    };

    console.log("Redirigiendo con datos:", padreFamilia);
    navigate('/dashboardpfamilia', { state: { padreFamilia } });
  };

  const handleRegresarInicio = () => {
    navigate(-1);
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
          <Title>📚 Registro Padre de Familia 📚</Title>

          <ImagePreview>
            {imagen ? (
              <img src={imagen} alt="Perfil" onClick={() => setVerImagenCompleta(true)} />
            ) : (
              <p>📸 ¡Sube tu foto!</p>
            )}
            <input type="file" accept="image/*" onChange={pickImage} />
            {errores.imagen && <ErrorText>¡La foto es obligatoria!</ErrorText>}
          </ImagePreview>

          <Input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {errores.nombre && <ErrorText>¡El nombre es obligatorio!</ErrorText>}

          <Input
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          {errores.apellido && <ErrorText>¡El apellido es obligatorio!</ErrorText>}

          <Input
            type="date"
            placeholder="Fecha de Nacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
          {errores.fechaNacimiento && <ErrorText>¡La fecha de nacimiento es obligatoria!</ErrorText>}

          <Input
            type="text"
            placeholder="Edad"
            value={fechaNacimiento ? calcularEdad(fechaNacimiento) : ''}
            disabled
          />

          <Input
            type="text"
            placeholder="Localidad"
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value)}
          />
          {errores.localidad && <ErrorText>¡La localidad es obligatoria!</ErrorText>}

          <Select value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option value="">Género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </Select>
          {errores.genero && <ErrorText>¡El género es obligatorio!</ErrorText>}

          <Input
            type="number"
            placeholder="¿Cuántos hijos estudian?"
            value={cuantosHijosEstudian}
            onChange={(e) => setCuantosHijosEstudian(e.target.value)}
          />
          {errores.cuantosHijosEstudian && <ErrorText>¡Este campo es obligatorio!</ErrorText>}

          <Select value={gradoHijos} onChange={(e) => setGradoHijos(e.target.value)}>
            <option value="">Grado de los hijos</option>
            <option value="Primero">Primero</option>
            <option value="Segundo">Segundo</option>
            <option value="Tercero">Tercero</option>
            <option value="Cuarto">Cuarto</option>
            <option value="Quinto">Quinto</option>
            <option value="Sexto">Sexto</option>
          </Select>
          {errores.gradoHijos && <ErrorText>¡El grado es obligatorio!</ErrorText>}

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

export default FormularioPFamilia;

//
const RainbowBackground = styled.div`
  background: linear-gradient(135deg, #f9f6ff, #d0f0ff, #d1ffd6);
  min-height: 100vh;
  padding: 2rem;
`;

const FormWrapper = styled.div`
  max-width: 600px;
  margin: auto;
  background: white;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  position: relative;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 15px;
  left: 15px;
`;

const Decorations = styled.div`
  text-align: center;
  font-size: 2rem;
`;

const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 10px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #00c853;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: #00b342;
  }
`;

const ImagePreview = styled.div`
  text-align: center;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 0.5rem;
    cursor: pointer;
  }

  input {
    margin-top: 0.5rem;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin: 0;
`;

const FullImageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 20px;
`;