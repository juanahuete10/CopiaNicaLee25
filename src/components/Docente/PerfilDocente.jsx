import React, { useState, useEffect } from 'react';
import { auth, db } from '../../database/firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc
} from 'firebase/firestore';
import {
  Container,
  Card,
  Form,
  Button,
  Spinner,
  Row,
  Col,
  Image
} from 'react-bootstrap';

function PerfilDocente() {
  const [docente, setDocente] = useState(null);
  const [docenteId, setDocenteId] = useState(null);
  const [editando, setEditando] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [previewFoto, setPreviewFoto] = useState(null);

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
          setPreviewFoto(docRef.data().fotoPerfil || null);
        }
      }
      setCargando(false);
    };

    fetchDocente();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocente((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'fechaNacimiento') {
      const edad = calcularEdad(value);
      setDocente((prev) => ({
        ...prev,
        fechaNacimiento: value,
        edad: edad,
      }));
    }
  };

  const calcularEdad = (fecha) => {
    const hoy = new Date();
    const nacimiento = new Date(fecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const handleFotoChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFoto(reader.result);
        setDocente((prev) => ({
          ...prev,
          fotoPerfil: reader.result,
        }));
      };
      reader.readAsDataURL(archivo);
    }
  };

  const handleGuardar = async () => {
    if (docenteId) {
      const docenteRef = doc(db, 'docentes', docenteId);
      await updateDoc(docenteRef, docente);
      setEditando(false);
      alert('✅ Perfil actualizado con éxito');
    }
  };

  if (cargando) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Cargando perfil...</p>
      </div>
    );
  }

  if (!docente) {
    return <p className="text-center text-danger mt-5">No se encontró información del docente.</p>;
  }

  return (
    <div style={{ background: 'linear-gradient(to bottom, #00c6ff, #ffffff)', minHeight: '100vh' }}>
      <Container className="mt-5 mb-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0 rounded-4">
              <Card.Body>
                <Card.Title className="text-center mb-4" style={{ color: '#007bff' }}>
                  👨‍🏫 Perfil del Docente
                </Card.Title>

                {previewFoto && (
                  <div className="text-center mb-3">
                    <Image
                      src={previewFoto}
                      roundedCircle
                      width={100}
                      height={100}
                      style={{ objectFit: 'cover', border: '3px solid #007bff' }}
                      alt="Foto de perfil"
                    />
                  </div>
                )}

                {/* Input de archivo debajo de la imagen */}
                <Form.Group className="mb-4 text-center">
                  <Form.Label className="fw-bold">Foto de Perfil (solo vista previa)</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleFotoChange}
                    disabled={!editando}
                    style={{
                      borderColor: '#007bff',
                      borderWidth: '2px',
                      boxShadow: editando ? '0 0 10px rgba(0, 123, 255, 0.5)' : 'none',
                      borderRadius: '20px',
                      marginTop: '10px',
                    }}
                  />
                </Form.Group>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                      type="text"
                      name="nombre"
                      value={docente.nombre || ''}
                      onChange={handleChange}
                      disabled={!editando}
                      style={{
                        borderColor: '#007bff',
                        borderWidth: '2px',
                        boxShadow: editando ? '0 0 10px rgba(0, 123, 255, 0.5)' : 'none',
                        borderRadius: '20px',
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                      type="text"
                      name="apellido"
                      value={docente.apellido || ''}
                      onChange={handleChange}
                      disabled={!editando}
                      style={{
                        borderColor: '#007bff',
                        borderWidth: '2px',
                        boxShadow: editando ? '0 0 10px rgba(0, 123, 255, 0.5)' : 'none',
                        borderRadius: '20px',
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <Form.Control
                      type="date"
                      name="fechaNacimiento"
                      value={docente.fechaNacimiento || ''}
                      onChange={handleChange}
                      disabled={!editando}
                      style={{
                        borderColor: '#007bff',
                        borderWidth: '2px',
                        boxShadow: editando ? '0 0 10px rgba(0, 123, 255, 0.5)' : 'none',
                        borderRadius: '20px',
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control
                      type="number"
                      name="edad"
                      value={docente.edad || ''}
                      disabled
                      style={{
                        borderColor: '#007bff',
                        borderWidth: '2px',
                        borderRadius: '20px',
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label>Género</Form.Label>
                    <Form.Select
                      name="genero"
                      value={docente.genero || ''}
                      onChange={handleChange}
                      disabled={!editando}
                      style={{
                        borderColor: '#007bff',
                        borderWidth: '2px',
                        boxShadow: editando ? '0 0 10px rgba(0, 123, 255, 0.5)' : 'none',
                        borderRadius: '20px',
                      }}
                    >
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="d-flex justify-content-center">
                    {editando ? (
                      <>
                        <Button variant="success" onClick={handleGuardar} className="me-2">
                          Guardar Cambios
                        </Button>
                        <Button variant="secondary" onClick={() => setEditando(false)}>
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button variant="primary" onClick={() => setEditando(true)}>
                        Editar Perfil
                      </Button>
                    )}
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PerfilDocente;
