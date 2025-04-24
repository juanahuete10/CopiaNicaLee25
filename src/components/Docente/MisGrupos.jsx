import React, { useEffect, useState } from 'react';
import { db } from '../../database/firebaseConfig';
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useAuth } from '../../database/AuthContext';
import { Container, Row, Col, Card, Spinner, Button, Form } from 'react-bootstrap';
import { FaTrashAlt, FaEdit, FaSave } from 'react-icons/fa';

function MisGrupos() {
  const { user } = useAuth();
  const [grupos, setGrupos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [editandoId, setEditandoId] = useState(null);
  const [formEdit, setFormEdit] = useState({ nombre: '', grado: '', seccion: '' });

  useEffect(() => {
    const obtenerGrupos = async () => {
      try {
        const q = query(collection(db, 'grupos'), where('uidDocente', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGrupos(lista);
      } catch (error) {
        console.error('Error al obtener los grupos:', error);
      } finally {
        setCargando(false);
      }
    };

    if (user?.uid) {
      obtenerGrupos();
    }
  }, [user]);

  const eliminarGrupo = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este grupo?')) {
      try {
        await deleteDoc(doc(db, 'grupos', id));
        setGrupos(prev => prev.filter(g => g.id !== id));
      } catch (error) {
        console.error('Error eliminando el grupo:', error);
      }
    }
  };

  const iniciarEdicion = (grupo) => {
    setEditandoId(grupo.id);
    setFormEdit({
      nombre: grupo.nombre,
      grado: grupo.grado,
      seccion: grupo.seccion || '',
    });
  };

  const guardarEdicion = async (id) => {
    try {
      const grupoRef = doc(db, 'grupos', id);
      await updateDoc(grupoRef, {
        nombre: formEdit.nombre,
        grado: formEdit.grado,
        seccion: formEdit.seccion,
      });
      setGrupos(prev => prev.map(g => (g.id === id ? { ...g, ...formEdit } : g)));
      setEditandoId(null);
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
    }
  };

  if (cargando) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Cargando grupos...</p>
      </div>
    );
  }

  return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">📚 Mis Grupos</h3>
      <Row>
        {grupos.length > 0 ? (
          grupos.map(grupo => (
            <Col key={grupo.id} xs={12} sm={6} md={4} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  {editandoId === grupo.id ? (
                    <>
                      <Form.Group className="mb-2">
                        <Form.Label><strong>Nombre</strong></Form.Label>
                        <Form.Control
                          type="text"
                          value={formEdit.nombre}
                          onChange={(e) => setFormEdit({ ...formEdit, nombre: e.target.value })}
                        />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label><strong>Grado</strong></Form.Label>
                        <Form.Select
                          value={formEdit.grado}
                          onChange={(e) => setFormEdit({ ...formEdit, grado: e.target.value })}
                        >
                          <option value="">Seleccionar grado</option>
                          <option value="Primero">Primero</option>
                          <option value="Segundo">Segundo</option>
                          <option value="Tercero">Tercero</option>
                          <option value="Cuarto">Cuarto</option>
                          <option value="Quinto">Quinto</option>
                          <option value="Sexto">Sexto</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label><strong>Sección</strong></Form.Label>
                        <Form.Control
                          type="text"
                          value={formEdit.seccion}
                          onChange={(e) => setFormEdit({ ...formEdit, seccion: e.target.value })}
                        />
                      </Form.Group>
                      <div className="d-flex justify-content-end gap-2">
                        <Button variant="success" size="sm" onClick={() => guardarEdicion(grupo.id)}>
                          <FaSave /> Guardar
                        </Button>
                        <Button variant="secondary" size="sm" onClick={() => setEditandoId(null)}>
                          Cancelar
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <Card.Title>{grupo.nombre}</Card.Title>
                      <Card.Text>
                        Grado: {grupo.grado} <br />
                        Sección: {grupo.seccion || 'N/A'}
                      </Card.Text>
                      <div className="d-flex justify-content-end gap-2">
                        <Button variant="outline-primary" size="sm" onClick={() => iniciarEdicion(grupo)}>
                          <FaEdit />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => eliminarGrupo(grupo.id)}>
                          <FaTrashAlt />
                        </Button>
                      </div>
                    </>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No has creado ningún grupo aún.</p>
        )}
      </Row>
    </Container>
  );
}

export default MisGrupos;
