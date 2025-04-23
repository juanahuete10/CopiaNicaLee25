import React, { useEffect, useState } from 'react';
import { db } from '../../database/firebaseConfig';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../../database/AuthContext';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function MisGrupos() {
  const { user } = useAuth();
  const [grupos, setGrupos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

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
                  <Card.Title>{grupo.nombre}</Card.Title>
                  <Card.Text>
                    Grado: {grupo.grado} <br />
                    Sección: {grupo.seccion || 'N/A'}
                  </Card.Text>
                  <div className="d-flex justify-content-end gap-2">
                    <Button variant="outline-primary" size="sm" onClick={() => navigate(`/editargrupo/${grupo.id}`)}>
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => eliminarGrupo(grupo.id)}>
                      <FaTrashAlt />
                    </Button>
                  </div>
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