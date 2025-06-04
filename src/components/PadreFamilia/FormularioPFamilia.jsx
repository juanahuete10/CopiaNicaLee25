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

  const calcularEdad = (fecha) => {
    if (!fecha) return '';
    const nacimiento = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
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
      localidad: !localidad,
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

          <Select value={localidad} onChange={(e) => setLocalidad(e.target.value)}>
            <option value="">Selecciona Localidad</option>
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

// 🟦 Estilos con fondo degradado 9DE1F3 a blanco

const RainbowBackground = styled.div`
  background: linear-gradient(135deg, #9DE1F3, #FFFFFF);
  min-height: 100vh;
  padding: 3rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  background: #ffffffcc;
  padding: 2.5rem;
  border-radius: 25px;
  box-shadow: 0 0 15px 3px #9de1f3aa;
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
  padding: 0.5rem;
  box-shadow: 0 0 8px #00aaff;
  transition: background-color 0.3s ease;
  &:hover {
    background: #005fa3;
  }
`;

const Decorations = styled.div`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  user-select: none;
`;

const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: #0077cc;
`;

const Input = styled.input`
  padding: 0.6rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Select = styled.select`
  padding: 0.6rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Button = styled.button`
  background-color: #00aaff;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 15px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0077cc;
  }
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.85rem;
`;

const ImagePreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    box-shadow: 0 0 8px #0077cc;
  }
`;

const FullImageOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const FullImage = styled.img`
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
  box-shadow: 0 0 20px #ffffff;
`;
