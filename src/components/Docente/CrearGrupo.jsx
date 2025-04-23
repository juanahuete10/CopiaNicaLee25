import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Card, Row, Col, Image } from 'react-bootstrap';
import { db } from '../../database/firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import logo from '../../assets/LogoNicaLee.png';

function CrearGrupo() {
  const [nombreGrupo, setNombreGrupo] = useState('');
  const [grado, setGrado] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudiantesGrado, setEstudiantesGrado] = useState([]);
  const [estudiantesSeleccionados, setEstudiantesSeleccionados] = useState([]);

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
    if (grado) {
      const filtrados = estudiantes.filter((e) => e.grado === grado);
      setEstudiantesGrado(filtrados);
    } else {
      setEstudiantesGrado([]);
    }
  }, [grado, estudiantes]);

  const handleAgregarEstudiante = (estudiante) => {
    if (!estudiantesSeleccionados.find((e) => e.id === estudiante.id)) {
      setEstudiantesSeleccionados([...estudiantesSeleccionados, estudiante]);
    }
  };

  const handleCrearGrupo = async () => {
    await addDoc(collection(db, 'grupos'), {
      nombre: nombreGrupo,
      grado,
      estudiantes: estudiantesSeleccionados.map((e) => e.id),
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
                    placeholder="Ej. Grupo A de Primero"
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
                      {estudiantesGrado.map((estudiante) => (
                        <Form.Check
                          key={estudiante.id}
                          type="checkbox"
                          label={`${estudiante.nombre} ${estudiante.apellido}`}
                          onChange={() => handleAgregarEstudiante(estudiante)}
                        />
                      ))}
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
