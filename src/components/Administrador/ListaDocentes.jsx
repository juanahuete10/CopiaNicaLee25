import React, { useEffect, useState } from 'react';
import { db } from '../../database/firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Modal, Button, Form } from 'react-bootstrap';

const ListaDocentes = () => {
  const [docentes, setDocentes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [docenteSeleccionado, setDocenteSeleccionado] = useState(null);
  const [modoEditar, setModoEditar] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const obtenerDocentes = async () => {
    const snapshot = await getDocs(collection(db, 'docentes'));
    const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setDocentes(lista);
  };

  useEffect(() => {
    obtenerDocentes();
  }, []);

  const eliminarDocente = async (id) => {
    await deleteDoc(doc(db, 'docentes', id));
    obtenerDocentes();
  };

  const abrirModalPerfil = (docente) => {
    setDocenteSeleccionado(docente);
    setModoEditar(false);
    setMostrarModal(true);
  };

  const abrirModalEditar = (docente) => {
    setDocenteSeleccionado(docente);
    setModoEditar(true);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setDocenteSeleccionado(null);
  };

  const handleChange = (e) => {
    setDocenteSeleccionado({
      ...docenteSeleccionado,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const guardarCambios = async () => {
    const { id, ...datos } = docenteSeleccionado;
    await updateDoc(doc(db, 'docentes', id), datos);
    obtenerDocentes();
    cerrarModal();
  };

  const docentesFiltrados = docentes.filter(docente =>
    `${docente.nombre} ${docente.apellido}`.toLowerCase().includes(searchText)
  );

  return (
    <div className="container mt-4" style={{ minHeight: '100vh' }}>
      <h3 className="mb-4 text-center">Docentes Registrados</h3>

      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar por nombre o apellido..."
          value={searchText}
          onChange={handleSearchChange}
        />
      </Form.Group>

      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <ul className="list-group">
          {docentesFiltrados.map(docente => (
            <li key={docente.id} className="list-group-item">
              <div className="row align-items-center">
                <div className="col-md-8 col-12 mb-2 mb-md-0">
                  <strong>{docente.nombre} {docente.apellido}</strong>
                </div>
                <div className="col-md-4 col-12 d-flex flex-wrap justify-content-md-end gap-2">
                  <button className="btn btn-info btn-sm" onClick={() => abrirModalPerfil(docente)}>Ver</button>
                  <button className="btn btn-warning btn-sm" onClick={() => abrirModalEditar(docente)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => eliminarDocente(docente.id)}>Eliminar</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de Perfil / Edición */}
      <Modal show={mostrarModal} onHide={cerrarModal} centered scrollable>
        <Modal.Header closeButton>
          <Modal.Title>{modoEditar ? 'Editar Docente' : 'Perfil del Docente'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {docenteSeleccionado && (
            modoEditar ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control name="nombre" value={docenteSeleccionado.nombre} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Apellido</Form.Label>
                  <Form.Control name="apellido" value={docenteSeleccionado.apellido} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control name="edad" value={docenteSeleccionado.edad} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Género</Form.Label>
                  <Form.Control name="genero" value={docenteSeleccionado.genero} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control name="fechaNacimiento" value={docenteSeleccionado.fechaNacimiento} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>URL de Foto (fotoURL)</Form.Label>
                  <Form.Control name="fotoURL" value={docenteSeleccionado.fotoURL || ''} onChange={handleChange} />
                </Form.Group>
              </Form>
            ) : (
              <div className="text-center">
                {docenteSeleccionado.fotoURL && (
                  <img
                    src={docenteSeleccionado.fotoURL}
                    alt="Foto de perfil"
                    className="img-fluid rounded-circle mb-3"
                    style={{ maxWidth: '150px', objectFit: 'cover' }}
                  />
                )}
                <p><strong>Nombre:</strong> {docenteSeleccionado.nombre} {docenteSeleccionado.apellido}</p>
                <p><strong>Edad:</strong> {docenteSeleccionado.edad}</p>
                <p><strong>Género:</strong> {docenteSeleccionado.genero}</p>
                <p><strong>Fecha de Nacimiento:</strong> {docenteSeleccionado.fechaNacimiento}</p>
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

export default ListaDocentes;
