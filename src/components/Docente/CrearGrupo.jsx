import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Row, Col, Image } from 'react-bootstrap';
import { db } from '../../database/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useAuth } from '../../database/AuthContext';
import logo from '../../assets/LogoNicaLee.png';

function CrearGrupo() {
  const [nombreGrupo, setNombreGrupo] = useState('');
  const [grado, setGrado] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudiantesGrado, setEstudiantesGrado] = useState([]);
  const [estudiantesSeleccionados, setEstudiantesSeleccionados] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchEstudiantes = async () => {
      const estudiantesRef = collection(db, 'estudiantes');
      const querySnapshot = await getDocs(estudiantesRef);
      const estudiantesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEstudiantes(estudiantesData);
    };
    fetchEstudiantes();
  }, []);

  useEffect(() => {
    if (grado && estudiantes.length > 0) {
      const filtrados = estudiantes.filter((e) =>
        e.grado?.toLowerCase().trim() === grado.toLowerCase().trim()
      );
      setEstudiantesGrado(filtrados);
      setEstudiantesSeleccionados([]);
    } else {
      setEstudiantesGrado([]);
    }
  }, [grado, estudiantes]);

  const handleSeleccionEstudiante = (estudiante, checked) => {
    if (checked) {
      setEstudiantesSeleccionados(prev => [...prev, estudiante]);
    } else {
      setEstudiantesSeleccionados(prev => prev.filter(e => e.id !== estudiante.id));
    }
  };

  const handleCrearGrupo = async () => {
    if (!nombreGrupo || !grado || estudiantesSeleccionados.length === 0) {
      alert('Por favor, completa todos los campos y selecciona al menos un estudiante.');
      return;
    }

    await addDoc(collection(db, 'grupos'), {
      nombre: nombreGrupo,
      grado,
      estudiantes: estudiantesSeleccionados.map(e => e.id),
      uidDocente: user.uid,
    });

    alert('¡Grupo creado con éxito!');
    setNombreGrupo('');
    setGrado('');
    setEstudiantesSeleccionados([]);
  };

  return (
    <Container className="pt-5 pb-4">
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <Image src={logo} alt="Logo de NicaLee" fluid style={{ maxHeight: '80px' }} />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow p-4 border-0 rounded-4">
            <Card.Body>
              <h3 className="text-center mb-4" style={{ color: '#007bff' }}>
                📘 Crear un Nuevo Grupo
              </h3>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label><strong>Nombre del Grupo</strong></Form.Label>
                  <Form.Control
                    type="text"
                    value={nombreGrupo}
                    onChange={(e) => setNombreGrupo(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label><strong>Grado</strong></Form.Label>
                  <Form.Select value={grado} onChange={(e) => setGrado(e.target.value)} required>
                    <option value="">Seleccionar grado</option>
                    <option value="Primero">Primero</option>
                    <option value="Segundo">Segundo</option>
                    <option value="Tercero">Tercero</option>
                    <option value="Cuarto">Cuarto</option>
                    <option value="Quinto">Quinto</option>
                    <option value="Sexto">Sexto</option>
                  </Form.Select>
                </Form.Group>

                {grado && (
                  <>
                    <Form.Label><strong>Seleccionar Estudiantes</strong></Form.Label>
                    <div className="mb-3 p-2 rounded border" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {estudiantesGrado.length > 0 ? (
                        estudiantesGrado.map((estudiante) => (
                          <Form.Check
                            key={estudiante.id}
                            type="checkbox"
                            label={`${estudiante.nombre} ${estudiante.apellido}`}
                            checked={estudiantesSeleccionados.some(e => e.id === estudiante.id)}
                            onChange={(e) => handleSeleccionEstudiante(estudiante, e.target.checked)}
                          />
                        ))
                      ) : (
                        <p className="text-muted">No hay estudiantes registrados en este grado.</p>
                      )}
                    </div>
                  </>
                )}

                <div className="d-grid gap-2">
                  <Button variant="primary" size="lg" onClick={handleCrearGrupo}>
                    Crear Grupo
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CrearGrupo;
