import React, { useState } from 'react';
import { db, auth } from '../../database/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function FormularioDocente() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('masculino');
  const [, setFotoPerfil] = useState(null);
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
      await addDoc(collection(db, 'docentes'), {
        uid: user.uid,
        nombre,
        apellido,
        fechaNacimiento,
        edad,
        genero,
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
        background: 'linear-gradient(to bottom right, #a2d4f6, #e0f7ff)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        position: 'relative',
      }}
    >
      {/* Ícono de la casa en una bolita redonda */}
      <div
        onClick={() => navigate('/')}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '3px solid white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 9999,
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        <FaHome size={30} color="black" />
      </div>

      {/* Contenedor del formulario */}
      <div
        style={{
          backgroundColor: '#fff',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '500px',
          border: '3px solid #fff',
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#00aaff', fontWeight: 'bold' }}>
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
              border: '2px solid #00aaff',
              borderRadius: '8px',
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
                border: '3px solid #00aaff',
              }}
            />
          </div>
        )}

        {registroExitoso && (
          <div className="alert alert-success text-center">¡Registro exitoso! Redirigiendo...</div>
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
                border: '2px solid #00aaff',
                borderRadius: '8px',
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
                border: '2px solid #00aaff',
                borderRadius: '8px',
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
                border: '2px solid #00aaff',
                borderRadius: '8px',
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
                border: '2px solid #00aaff',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
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
                border: '2px solid #00aaff',
                borderRadius: '8px',
              }}
            >
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              backgroundColor: '#00aaff',
              borderColor: '#00aaff',
              borderRadius: '8px',
              fontWeight: 'bold',
            }}
          >
            Registrar Docente
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormularioDocente;
