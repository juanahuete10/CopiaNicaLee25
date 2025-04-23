import React, { useState, useEffect } from 'react';
import { auth, db } from '../../database/firebaseConfig';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { Container, Card, Form, Button, Spinner } from 'react-bootstrap';

function PerfilDocente() {
  const [docente, setDocente] = useState(null);
  const [docenteId, setDocenteId] = useState(null);
  const [editando, setEditando] = useState(false);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchDocente = async () => {
      const user = auth.currentUser;
      if (user) {
        const docentesRef = collection(db, 'docentes');
        const q = query(docentesRef, where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0];
          setDocente(docRef.data());
          setDocenteId(docRef.id);
        }
      }
      setCargando(false);
    };

    fetchDocente();
  }, []);

  const handleChange = (e) => {
    setDocente({
      ...docente,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardar = async () => {
    if (docenteId) {
      const docenteRef = doc(db, 'docentes', docenteId);
      await updateDoc(docenteRef, docente);
      setEditando(false);
      alert('Perfil actualizado con éxito');
    }
  };

  if (cargando) {
    return <div className="text-center mt-5"><Spinner animation="border" variant="primary" /><p>Cargando perfil...</p></div>;
  }

  if (!docente) {
    return <p>No se encontró información del docente.</p>;
  }

  return (
    <Container className="mt-5">
      <Card className="shadow-lg">
        {docente.fotoPerfil && <Card.Img variant="top" src={docente.fotoPerfil} />}
        <Card.Body>
          <Card.Title>Perfil del Docente</Card.Title>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={docente.nombre}
                onChange={handleChange}
                disabled={!editando}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={docente.apellido}
                onChange={handleChange}
                disabled={!editando}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Edad</Form.Label>
              <Form.Control
                type="number"
                name="edad"
                value={docente.edad}
                onChange={handleChange}
                disabled={!editando}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Género</Form.Label>
              <Form.Select
                name="genero"
                value={docente.genero}
                onChange={handleChange}
                disabled={!editando}
              >
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </Form.Select>
            </Form.Group>

            {editando ? (
              <Button variant="success" onClick={handleGuardar}>
                Guardar Cambios
              </Button>
            ) : (
              <Button variant="primary" onClick={() => setEditando(true)}>
                Editar Perfil
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PerfilDocente;
