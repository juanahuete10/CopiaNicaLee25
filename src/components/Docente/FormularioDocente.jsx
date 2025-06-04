import React, { useState } from 'react';
import { db, auth } from '../../database/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function FormularioDocente() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [localidadOtra, setLocalidadOtra] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [errores, setErrores] = useState({});
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const navigate = useNavigate();

  const localidades = [
    "Juigalpa", "Tecolostote", "Boaco", "San Lorenzo", "Santo Tómas",
    "Managua", "San Esteban", "Matagalpa", "Camoapa", "Estelí"
  ];

  const calcularEdad = (fecha) => {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edadCalculada = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edadCalculada--;
    }
    return edadCalculada;
  };

  const validarCampos = () => {
    const erroresTemp = {};
    if (!nombre.trim()) erroresTemp.nombre = 'El nombre es obligatorio';
    if (!apellido.trim()) erroresTemp.apellido = 'El apellido es obligatorio';
    if (!fechaNacimiento) erroresTemp.fechaNacimiento = 'La fecha de nacimiento es obligatoria';
    if (!localidad) erroresTemp.localidad = 'La localidad es obligatoria';
    if (localidad === 'otra' && !localidadOtra.trim()) erroresTemp.localidadOtra = 'Por favor escribe tu localidad';
    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleFechaNacimientoChange = (e) => {
    const fecha = e.target.value;
    setFechaNacimiento(fecha);
    setEdad(calcularEdad(fecha));
  };

  const handleFotoChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setFotoPerfil(archivo);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarCampos()) return;

    const user = auth.currentUser;
    if (!user) {
      alert('Debes iniciar sesión para registrar un docente.');
      return;
    }

    try {
      let urlFoto = '';
      if (fotoPerfil) {
        const storage = getStorage();
        const storageRef = ref(storage, `docentes/${user.uid}/fotoPerfil.jpg`);
        await uploadBytes(storageRef, fotoPerfil);
        urlFoto = await getDownloadURL(storageRef);
      }

      const localidadFinal = localidad === 'otra' ? localidadOtra.trim() : localidad;

      await addDoc(collection(db, 'docentes'), {
        uid: user.uid,
        nombre,
        apellido,
        fechaNacimiento,
        edad,
        genero,
        localidad: localidadFinal,
        fotoPerfil: urlFoto,
        creadoEn: new Date()
      });

      setRegistroExitoso(true);
      setTimeout(() => {
        navigate('/dashboarddocente');
      }, 1500);
    } catch (err) {
      console.error('Error al registrar docente:', err);
      alert('Ocurrió un error al registrar al docente. Intenta nuevamente.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        position: 'relative',
        background: 'linear-gradient(to bottom right, #9DE1F3, #FFFFFF)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          cursor: 'pointer',
          color: '#004080',
          zIndex: 5
        }}
        onClick={() => navigate('/')}
        title="Volver a inicio"
      >
        <FaHome size={28} />
      </div>

      <div
        style={{
          background: '#ffffff',
          borderRadius: '30px',
          border: '4px solid',
          borderImage: 'linear-gradient(45deg, #9DE1F3, #4facfe) 1',
          padding: '2rem',
          boxShadow: '0 0 15px rgba(0, 102, 255, 0.3)',
          width: '100%',
          maxWidth: '600px',
          zIndex: 2
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '2rem' }}>🎓👩‍🏫📘</div>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#004080' }}>Registro de Docente</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ fontWeight: 'bold', color: '#004080', display: 'block', marginBottom: '0.5rem', textAlign: 'center' }}>
              📸 ¡Sube tu foto!
            </label>
            <div style={{ textAlign: 'center' }}>
              <input type="file" accept="image/*" onChange={handleFotoChange} />
            </div>
            {previewFoto && (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <img
                  src={previewFoto}
                  alt="Preview"
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    boxShadow: '0 0 10px rgba(0, 132, 255, 0.8)',
                    objectFit: 'cover'
                  }}
                />
              </div>
            )}
          </div>

          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" style={inputStyle(errores.nombre)} />
          {errores.nombre && <div style={errorStyle}>{errores.nombre}</div>}

          <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Apellido" style={inputStyle(errores.apellido)} />
          {errores.apellido && <div style={errorStyle}>{errores.apellido}</div>}

          <input type="date" value={fechaNacimiento} onChange={handleFechaNacimientoChange} style={inputStyle(errores.fechaNacimiento)} />
          {errores.fechaNacimiento && <div style={errorStyle}>{errores.fechaNacimiento}</div>}

          <input type="number" value={edad} readOnly style={inputStyle()} placeholder="Edad" />

          <select value={localidad} onChange={(e) => setLocalidad(e.target.value)} style={inputStyle(errores.localidad)}>
            <option value="">Selecciona tu localidad</option>
            {localidades.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
            <option value="otra">Otra</option>
          </select>
          {errores.localidad && <div style={errorStyle}>{errores.localidad}</div>}

          {localidad === 'otra' && (
            <input type="text" value={localidadOtra} onChange={(e) => setLocalidadOtra(e.target.value)} placeholder="Escribe tu localidad" style={inputStyle(errores.localidadOtra)} />
          )}
          {errores.localidadOtra && <div style={errorStyle}>{errores.localidadOtra}</div>}

          <select value={genero} onChange={(e) => setGenero(e.target.value)} style={inputStyle()}>
            <option value="">Género</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>

          <button type="submit" style={submitButtonStyle}>Registrar</button>

          {registroExitoso && (
            <div style={{ marginTop: '1rem', color: '#004080', textAlign: 'center' }}>
              ¡Registro exitoso! Redirigiendo...
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

const inputStyle = (error = false) => ({
  width: '100%',
  padding: '14px 16px',
  borderRadius: '20px',
  border: `2px solid ${error ? 'red' : '#a3cfff'}`,
  backgroundColor: '#ffffff',
  boxShadow: 'inset 0 0 4px rgba(0,0,0,0.05)',
  color: '#003366',
  marginBottom: '0.75rem',
  fontSize: '1rem'
});

const errorStyle = {
  color: 'red',
  fontSize: '0.85rem',
  marginBottom: '0.5rem',
  marginTop: '-0.25rem'
};

const submitButtonStyle = {
  width: '100%',
  padding: '12px',
  background: 'linear-gradient(90deg, #00d2ff, #3a7bd5)',
  border: 'none',
  borderRadius: '20px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '1rem',
  boxShadow: '0 0 10px rgba(0, 102, 255, 0.5)'
};

export default FormularioDocente;
