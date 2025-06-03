import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
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

    navigate('/dashboardpfamilia', { state: { padreFamilia } });
  };

  const handleRegresarInicio = () => {
    navigate(-1);
  };

  return (
    <RainbowBackground>
      <BackButton onClick={handleRegresarInicio}>
        <FaHome size={30} color="#ffffff" />
      </BackButton>

      <FormWrapper>
        <Decorations>
          <span role="img" aria-label="book">📚</span>
          <span role="img" aria-label="rainbow">🌈</span>
          <span role="img" aria-label="rocket">🚀</span>
          <span role="img" aria-label="star">⭐</span>
        </Decorations>

        <FormCard>
          <Title>🎨 Registro Padre de Familia 🎨</Title>

          <ImagePreview>
            {imagen ? (
              <img src={imagen} alt="Perfil" onClick={() => setVerImagenCompleta(true)} />
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

          <Input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
          {errores.fechaNacimiento && <ErrorText>¡La fecha de nacimiento es obligatoria!</ErrorText>}

          <Input type="text" placeholder="Edad" value={fechaNacimiento ? calcularEdad(fechaNacimiento) : ''} disabled />

          <Input type="text" placeholder="Localidad" value={localidad} onChange={(e) => setLocalidad(e.target.value)} />
          {errores.localidad && <ErrorText>¡La localidad es obligatoria!</ErrorText>}

          <Select value={genero} onChange={(e) => setGenero(e.target.value)}>
            <option value="">Género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
          </Select>
          {errores.genero && <ErrorText>¡El género es obligatorio!</ErrorText>}

          <Input type="number" placeholder="¿Cuántos hijos estudian?" value={cuantosHijosEstudian} onChange={(e) => setCuantosHijosEstudian(e.target.value)} />
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

          <Button onClick={handleRegistro}>🎉 Registrar</Button>
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

// Estilos llamativos

const RainbowBackground = styled.div`
  background: linear-gradient(135deg, #005f99, #007acc, #00aaff, #66ccff);
  min-height: 100vh;
  padding: 3rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const FormWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  background: linear-gradient(135deg, #ffffffdd, #cceeffdd);
  padding: 3rem 3.5rem;
  border-radius: 30px;
  box-shadow:
    0 0 15px 3px #00aaffaa,
    0 0 30px 10px #0077cc55,
    0 10px 40px -10px #004466aa;
  border: 4px solid;
  border-image-slice: 1;
  border-width: 4px;
  border-image-source: linear-gradient(45deg, #0077cc, #00aaff, #66ccff);
  position: relative;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.02);
    box-shadow:
      0 0 20px 5px #00c0ffcc,
      0 0 40px 15px #0099ffaa,
      0 15px 50px -15px #006699cc;
  }
`;

const BackButton = styled.button`
  background: #0077cc;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 1000;
  padding: 0.4rem;
  box-shadow: 0 0 8px #00aaff;
  transition: background-color 0.3s ease;
  &:hover {
    background: #005fa3;
  }
`;

const Decorations = styled.div`
  text-align: center;
  font-size: 3rem;
  margin-bottom: 1.2rem;
  user-select: none;
`;

const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.4rem;
  color: #004466;
  font-weight: 700;
  text-shadow: 2px 2px 6px #00aaffaa;
  user-select: none;
`;

const Input = styled.input`
  padding: 0.85rem 1rem;
  border-radius: 18px;
  border: 3px solid #00aaff;
  background-color: #e0f4ff;
  font-size: 1.1rem;
  color: #003355;
  font-weight: 600;
  box-shadow: inset 0 3px 6px #aaddffaa;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &:focus {
    outline: none;
    border-color: #0077cc;
    box-shadow: 0 0 8px #00aaffcc;
    background-color: #ccf0ff;
  }
`;

const Select = styled.select`
  padding: 0.85rem 1rem;
  border-radius: 18px;
  border: 3px solid #00aaff;
  background-color: #e0f4ff;
  font-size: 1.1rem;
  color: #003355;
  font-weight: 600;
  box-shadow: inset 0 3px 6px #aaddffaa;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  &:focus {
    outline: none;
    border-color: #0077cc;
    box-shadow: 0 0 8px #00aaffcc;
    background-color: #ccf0ff;
  }
`;

const glow = keyframes`
  0% {
    box-shadow: 0 0 5px #00aaff88, 0 0 15px #00aaff88;
  }
  50% {
    box-shadow: 0 0 15px #00cfffcc, 0 0 25px #00cfffcc;
  }
  100% {
    box-shadow: 0 0 5px #00aaff88, 0 0 15px #00aaff88;
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #0077cc, #00aaff, #0099ff);
  color: white;
  padding: 1rem 0;
  border: none;
  border-radius: 25px;
  font-weight: 700;
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: 0 0 10px #00aaffcc;
  animation: ${glow} 3s ease-in-out infinite;
  transition: background 0.3s ease;
  user-select: none;
  &:hover {
    background: linear-gradient(45deg, #005fa3, #0088cc, #006699);
    box-shadow: 0 0 20px #00ccffdd;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  input[type="file"] {
    cursor: pointer;
    border-radius: 15px;
    border: 2px dashed #0077cc;
    padding: 0.4rem 0.8rem;
    background-color: #ccf0ff;
    font-weight: 600;
    color: #004466;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #99ddff;
    }
  }
  img {
    max-width: 160px;
    max-height: 160px;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 0 15px #00aaffcc;
    border: 3px solid #00aaff;
    object-fit: cover;
  }
  p {
    font-size: 1.3rem;
    color: #005f99;
    user-select: none;
  }
`;

const ErrorText = styled.span`
  color: #dd3333;
  font-weight: 700;
  font-size: 0.9rem;
  user-select: none;
`;

const FullImageOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: #000000cc;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: zoom-out;
  z-index: 999;
`;

const FullImage = styled.img`
  max-width: 95vw;
  max-height: 95vh;
  border-radius: 30px;
  box-shadow: 0 0 30px 8px #00aaffcc;
  user-select: none;
`;
