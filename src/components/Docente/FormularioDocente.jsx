import React, { useState } from 'react';
import { db, auth } from '../../database/firebaseConfig'; // ✅ asegurarte de importar auth
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function FormularioDocente() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('masculino');
  const [ , setFotoPerfil] = useState(null); // no se usa pero se mantiene la vista previa
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
        uid: user.uid, // ✅ guarda el UID del usuario autenticado
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
    <div className="container mt-5">
      <h2 className="mb-4">Registro de Docente</h2>

      {registroExitoso && (
        <div className="alert alert-success">¡Registro exitoso! Redirigiendo...</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
          />
          {errores.apellido && <div className="invalid-feedback">{errores.apellido}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de Nacimiento</label>
          <input
            type="date"
            className={`form-control ${errores.fechaNacimiento ? 'is-invalid' : ''}`}
            value={fechaNacimiento}
            max={new Date().toISOString().split('T')[0]}
            onChange={handleFechaNacimientoChange}
          />
          {errores.fechaNacimiento && (
            <div className="invalid-feedback">{errores.fechaNacimiento}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Edad</label>
          <input
            type="number"
            className="form-control"
            value={edad}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Género</label>
          <select
            className="form-select"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
          >
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Foto de Perfil (solo vista previa)</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleFotoChange}
          />
        </div>

        {previewFoto && (
          <div className="mb-3 text-center">
            <img
              src={previewFoto}
              alt="Vista previa"
              className="img-thumbnail"
              style={{ maxWidth: '200px', maxHeight: '200px' }}
            />
          </div>
        )}

        <button type="submit" className="btn btn-success w-100">
          Registrar Docente
        </button>
      </form>
    </div>
  );
}

export default FormularioDocente;
