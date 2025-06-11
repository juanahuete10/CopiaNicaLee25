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
  Button,
  Spinner,
  Row,
  Col,
  Image,
  Form
} from 'react-bootstrap';

function PerfilDocente() {
  const [docente, setDocente] = useState(null);
  const [docenteId, setDocenteId] = useState(null);
  const [editando, setEditando] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [previewFoto, setPreviewFoto] = useState(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchDocente = async () => {
      const user = auth.currentUser;
      if (user) {
        setEmail(user.email);
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
    <div style={{ background: 'linear-gradient(to bottom, #00c6ff, #ffffff)', minHeight: '100vh', padding: '2rem 0' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={7}>
            <Card className="shadow-lg border-0 rounded-4 p-4" style={{ backgroundColor: '#f0f8ff' }}>
              <Card.Body className="text-center">

                <Card.Title style={{ color: '#007bff', fontWeight: '700', fontSize: '1.8rem' }}>
                  👨‍🏫 Perfil del Docente
                </Card.Title>

                {previewFoto ? (
                  <Image
                    src={previewFoto}
                    roundedCircle
                    width={120}
                    height={120}
                    style={{ objectFit: 'cover', border: '4px solid #007bff', margin: '1rem auto' }}
                    alt="Foto de perfil"
                  />
                ) : (
                  <div style={{
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    backgroundColor: '#cce7ff',
                    margin: '1rem auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#007bff',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                  }}>
                    ?
                  </div>
                )}

                {/* Mostrar info en vista no editable */}
                {!editando ? (
                  <>
                    <h3 style={{ color: '#004a99', marginBottom: '0.3rem' }}>
                      {docente.nombre} {docente.apellido}
                    </h3>
                    <p style={{ color: '#555', fontStyle: 'italic', marginBottom: '0.5rem' }}>
                      🎓 Rol: {docente.rol || 'Docente'}
                    </p>
                    <p style={{ color: '#555', marginBottom: '0.5rem' }}>
                      📧 {email}
                    </p>
                    <p style={{ color: '#555', marginBottom: '0.5rem' }}>
                      📅 Fecha de Nacimiento: {docente.fechaNacimiento || 'No especificada'}
                    </p>
                    <p style={{ color: '#555', marginBottom: '0.5rem' }}>
                      🧓 Edad: {docente.edad || 'No calculada'}
                    </p>
                    <p style={{ color: '#555', marginBottom: '1.5rem' }}>
                      ⚧ Género: {docente.genero ? (docente.genero === 'masculino' ? 'Masculino' : 'Femenino') : 'No especificado'}
                    </p>
                    <Button variant="primary" onClick={() => setEditando(true)}>
                      ✏️ Editar Perfil
                    </Button>
                  </>
                ) : (
                  // Mostrar formulario solo al editar
                  <Form className="text-start">
                    <Form.Group className="mb-3 text-center">
                      <Form.Label className="fw-bold">Cambiar Foto de Perfil</Form.Label>
                      <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleFotoChange}
                        style={{
                          borderColor: '#007bff',
                          borderWidth: '2px',
                          borderRadius: '20px',
                          marginTop: '10px',
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        value={docente.nombre || ''}
                        onChange={handleChange}
                        style={{
                          borderColor: '#007bff',
                          borderWidth: '2px',
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
                        style={{
                          borderColor: '#007bff',
                          borderWidth: '2px',
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
                        style={{
                          borderColor: '#007bff',
                          borderWidth: '2px',
                          borderRadius: '20px',
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Género</Form.Label>
                      <Form.Select
                        name="genero"
                        value={docente.genero || ''}
                        onChange={handleChange}
                        style={{
                          borderColor: '#007bff',
                          borderWidth: '2px',
                          borderRadius: '20px',
                        }}
                      >
                        <option value="">Selecciona</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                      </Form.Select>
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                      <Button variant="success" onClick={handleGuardar}>
                        Guardar Cambios
                      </Button>
                      <Button variant="secondary" onClick={() => setEditando(false)}>
                        Cancelar
                      </Button>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PerfilDocente;
