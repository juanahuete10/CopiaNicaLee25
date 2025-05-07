import React, { useEffect, useState } from 'react';
import { db } from '../../database/firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Modal, Button, Form } from 'react-bootstrap';

const ListaEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filtroGrado, setFiltroGrado] = useState('');
  const [searchText, setSearchText] = useState('');
  const [estudianteSeleccionado, setEstudianteSeleccionado] = useState(null);
  const [modoEditar, setModoEditar] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const obtenerEstudiantes = async () => {
    const snapshot = await getDocs(collection(db, 'estudiantes'));
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setEstudiantes(lista);
  };

  useEffect(() => {
    obtenerEstudiantes();
  }, []);

  const eliminarEstudiante = async (id) => {
    await deleteDoc(doc(db, 'estudiantes', id));
    obtenerEstudiantes();
  };

  const abrirModalPerfil = (estudiante) => {
    setEstudianteSeleccionado(estudiante);
    setModoEditar(false);
    setMostrarModal(true);
  };

  const abrirModalEditar = (estudiante) => {
    setEstudianteSeleccionado(estudiante);
    setModoEditar(true);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setEstudianteSeleccionado(null);
  };

  const handleChange = (e) => {
    setEstudianteSeleccionado({
      ...estudianteSeleccionado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const guardarCambios = async () => {
    const { id, ...datos } = estudianteSeleccionado;
    await updateDoc(doc(db, 'estudiantes', id), datos);
    obtenerEstudiantes();
    cerrarModal();
  };

  const gradosUnicos = [...new Set(estudiantes.map(e => e.grado))];

  const estudiantesFiltrados = estudiantes.filter(e => {
    const coincideGrado = filtroGrado ? e.grado === filtroGrado : true;
    const coincideBusqueda = `${e.nombre} ${e.apellido}`.toLowerCase().includes(searchText);
    return coincideGrado && coincideBusqueda;
  });

  return (
    <div className="container mt-4" style={{ minHeight: '100vh', overflowY: 'auto' }}>
      <h3 className="mb-4 text-center">Estudiantes Registrados</h3>

      <Form.Group className="mb-3">
        <Form.Label><strong>Filtrar por Grado:</strong></Form.Label>
        <Form.Select
          value={filtroGrado}
          onChange={(e) => setFiltroGrado(e.target.value)}
        >
          <option value="">Todos los grados</option>
          {gradosUnicos.map(grado => (
            <option key={grado} value={grado}>{grado}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <input
        type="text"
        placeholder="Buscar por nombre o apellido..."
        value={searchText}
        onChange={handleSearchChange}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc"
        }}
      />

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <ul className="list-group">
          {estudiantesFiltrados.map(estudiante => (
            <li key={estudiante.id} className="list-group-item">
              <div className="row align-items-center">
                <div className="col-md-8 col-12 d-flex align-items-center gap-3 mb-2 mb-md-0">
                  {estudiante.imagen && (
                    <img
                      src={estudiante.imagen}
                      alt="Perfil"
                      style={{ width: 40, height: 40, borderRadius: '50%' }}
                    />
                  )}
                  <div>
                    <strong>{estudiante.nombre} {estudiante.apellido}</strong> - <em>{estudiante.grado}</em>
                  </div>
                </div>
                <div className="col-md-4 col-12 d-flex flex-wrap justify-content-md-end gap-2">
                  <button className="btn btn-info btn-sm" onClick={() => abrirModalPerfil(estudiante)}>Ver</button>
                  <button className="btn btn-warning btn-sm" onClick={() => abrirModalEditar(estudiante)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarEstudiante(estudiante.id)}>Eliminar</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Modal show={mostrarModal} onHide={cerrarModal} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{modoEditar ? 'Editar Estudiante' : 'Perfil del Estudiante'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {estudianteSeleccionado && (
            modoEditar ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control name="nombre" value={estudianteSeleccionado.nombre} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control name="apellido" value={estudianteSeleccionado.apellido} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control name="edad" value={estudianteSeleccionado.edad} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Género</Form.Label>
                  <Form.Control name="genero" value={estudianteSeleccionado.genero} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control name="fechaNacimiento" value={estudianteSeleccionado.fechaNacimiento || ''} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Grado</Form.Label>
                  <Form.Control name="grado" value={estudianteSeleccionado.grado} onChange={handleChange} />
                </Form.Group>
              </Form>
            ) : (
              <div>
                {estudianteSeleccionado.imagen && (
                  <img
                    src={estudianteSeleccionado.imagen}
                    alt="Perfil"
                    style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 10 }}
                  />
                )}
                <p><strong>Nombre:</strong> {estudianteSeleccionado.nombre} {estudianteSeleccionado.apellido}</p>
                <p><strong>Edad:</strong> {estudianteSeleccionado.edad}</p>
                <p><strong>Género:</strong> {estudianteSeleccionado.genero}</p>
                <p><strong>Fecha de Nacimiento:</strong> {estudianteSeleccionado.fechaNacimiento}</p>
                <p><strong>Grado:</strong> {estudianteSeleccionado.grado}</p>
              </div>
            )
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>Cerrar</Button>
          {modoEditar && <Button variant="success" onClick={guardarCambios}>Guardar Cambios</Button>}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ListaEstudiantes;
