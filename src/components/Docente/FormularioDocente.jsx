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
  const [genero, setGenero] = useState('masculino');
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [errores, setErrores] = useState({});
  const [registroExitoso, setRegistroExitoso] = useState(false);
  const navigate = useNavigate();

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

      await addDoc(collection(db, 'docentes'), {
        uid: user.uid,
        nombre,
        apellido,
        fechaNacimiento,
        edad,
        genero,
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
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #a3d8f4, #71b7e6, #d0ebff)', // Degradado celeste suave
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        color: '#004466', // texto en azul oscuro para buen contraste
        fontWeight: 'bold',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* SVG decorativo - dibujos blancos y celestes */}
      <svg
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.12,
        }}
        viewBox="0 0 800 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="150" cy="150" r="100" fill="#d0ebff" />
        <circle cx="650" cy="450" r="120" fill="#71b7e6" />
        <rect x="350" y="200" width="100" height="100" fill="#a3d8f4" rx="20" ry="20" />
        <polygon points="700,100 750,180 650,180" fill="#d0ebff" />
        <line
          x1="100"
          y1="500"
          x2="700"
          y2="500"
          stroke="#71b7e6"
          strokeWidth="5"
          strokeDasharray="15 10"
        />
      </svg>

      {/* Ícono de Home */}
      <div
        onClick={() => navigate('/')}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          cursor: 'pointer',
          zIndex: 9999,
          color: '#004466',
        }}
      >
        <FaHome size={30} />
      </div>

      {/* Formulario con glassmorphism blanco translúcido */}
      <div
        style={{
          position: 'relative',
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // blanco translúcido para mejor contraste
          borderRadius: '20px',
          padding: '3rem', // aumenté padding
          boxShadow: '0 8px 32px 0 rgba(0, 68, 102, 0.25)',
          width: '100%',
          maxWidth: 'px',  // aumenté maxWidth para panel más grande
          border: '1px solid rgba(0, 68, 102, 0.3)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          color: '#004466',
          zIndex: 10,
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#004466' }}>
          Registro de Docente
        </h2>

        <div className="mb-3">
          <label className="form-label">Foto de Perfil</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFotoChange}
            style={{
              border: '2px solid #71b7e6',
              borderRadius: '8px',
              color: '#004466',
            }}
          />
        </div>

        {previewFoto && (
          <div className="mb-3 text-center">
            <img
              src={previewFoto}
              alt="Vista previa"
              className="img-thumbnail"
              style={{
                maxWidth: '120px',
                borderRadius: '50%',
                border: '3px solid #71b7e6',
              }}
            />
          </div>
        )}

        {registroExitoso && (
          <div className="alert alert-success text-center" style={{ color: '#0077cc' }}>
            ¡Registro exitoso! Redirigiendo...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Escribe tu nombre"
              style={{
                border: '2px solid #71b7e6',
                borderRadius: '8px',
                color: '#004466',
              }}
            />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input
              type="text"
              className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              placeholder="Escribe tu apellido"
              style={{
                border: '2px solid #71b7e6',
                borderRadius: '8px',
                color: '#004466',
              }}
            />
            {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de Nacimiento</label>
            <input
              type="date"
              className={`form-control ${errores.fechaNacimiento ? 'is-invalid' : ''}`}
              value={fechaNacimiento}
              onChange={handleFechaNacimientoChange}
              style={{
                border: '2px solid #71b7e6',
                borderRadius: '8px',
                color: '#004466',
              }}
            />
            {errores.fechaNacimiento && <div className="invalid-feedback">{errores.fechaNacimiento}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label">Edad</label>
            <input
              type="number"
              className="form-control"
              value={edad}
              readOnly
              style={{
                border: '2px solid #71b7e6',
                borderRadius: '8px',
                backgroundColor: '#e0f0ff',
                color: '#004466',
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Género</label>
            <select
              className="form-control"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              style={{
                border: '2px solid #71b7e6',
                borderRadius: '8px',
                color: '#004466',
              }}
            >
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: '#004466',
              color: 'white',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              padding: '0.5rem',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0077cc')}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#004466')}
          >
            Registrar Docente
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormularioDocente;
