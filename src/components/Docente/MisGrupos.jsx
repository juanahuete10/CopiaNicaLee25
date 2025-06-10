import React, { useEffect, useState } from 'react';
import { db } from '../../database/firebaseConfig';
import { collection, query, where, getDocs, updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { useAuth } from '../../database/AuthContext';
import { Container, Row, Col, ListGroup, Card, Form, Button, Spinner } from 'react-bootstrap';

function MisGrupos() {
  const { user } = useAuth();
  const [grupos, setGrupos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  // Obtener grupos del docente
  useEffect(() => {
    const obtenerGrupos = async () => {
      try {
        const q = query(collection(db, 'grupos'), where('uidDocente', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const lista = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGrupos(lista);
        if (lista.length > 0) setGrupoSeleccionado(lista[0]);
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

  // Enviar mensaje / nota al grupo (guardamos mensajes en Firestore en un campo "mensajes")
  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !grupoSeleccionado) return;

    const grupoRef = doc(db, 'grupos', grupoSeleccionado.id);
    const mensajeObj = {
      texto: nuevoMensaje.trim(),
      fecha: new Date().toISOString(),
      enviadoPor: user.uid,
    };

    try {
      await updateDoc(grupoRef, {
        mensajes: arrayUnion(mensajeObj),
      });

      // Actualizar localmente el estado para mostrar el mensaje
      setGrupos(prev =>
        prev.map(g =>
          g.id === grupoSeleccionado.id
            ? { ...g, mensajes: [...(g.mensajes || []), mensajeObj] }
            : g
        )
      );

      setGrupoSeleccionado(prev => ({
        ...prev,
        mensajes: [...(prev.mensajes || []), mensajeObj],
      }));

      setNuevoMensaje('');
    } catch (error) {
      console.error('Error enviando mensaje:', error);
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
    <Container fluid className="mt-4" style={{ height: '80vh' }}>
      <Row className="h-100">
        {/* Lista lateral tipo WhatsApp */}
        <Col xs={12} md={4} className="border-end overflow-auto" style={{ maxHeight: '80vh' }}>
          <h4>📚 Mis Grupos</h4>
          <ListGroup variant="flush">
            {grupos.map(grupo => (
              <ListGroup.Item
                key={grupo.id}
                action
                active={grupoSeleccionado?.id === grupo.id}
                onClick={() => setGrupoSeleccionado(grupo)}
                style={{ cursor: 'pointer' }}
              >
                <strong>{grupo.nombre}</strong> <br />
                <small>{grupo.grado} - {grupo.seccion || 'Sin sección'}</small>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Panel de detalle y chat */}
        <Col xs={12} md={8} className="d-flex flex-column" style={{ maxHeight: '80vh' }}>
          {grupoSeleccionado ? (
            <>
              <Card className="mb-3 flex-grow-0">
                <Card.Body>
                  <Card.Title>{grupoSeleccionado.nombre}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Grado: {grupoSeleccionado.grado} | Sección: {grupoSeleccionado.seccion || 'N/A'}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Estudiantes:</strong>
                    <ul>
                      {(grupoSeleccionado.estudiantes || []).length > 0 ? (
                        grupoSeleccionado.estudiantes.map((est, idx) => <li key={idx}>{est}</li>)
                      ) : (
                        <li>No hay estudiantes asignados</li>
                      )}
                    </ul>
                  </Card.Text>
                  <Button
                    variant="success"
                    onClick={() => window.alert(`Aquí podrías abrir asignar lecciones para el grupo ${grupoSeleccionado.nombre}`)}
                  >
                    📚 Asignar Lecciones
                  </Button>
                </Card.Body>
              </Card>

              {/* Chat / Notas del grupo */}
              <Card className="flex-grow-1 d-flex flex-column">
                <Card.Body style={{ overflowY: 'auto', flexGrow: 1 }}>
                  {grupoSeleccionado.mensajes && grupoSeleccionado.mensajes.length > 0 ? (
                    grupoSeleccionado.mensajes
                      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
                      .map((msg, i) => (
                        <div
                          key={i}
                          className={`mb-2 p-2 rounded ${
                            msg.enviadoPor === user.uid ? 'bg-primary text-white ms-auto' : 'bg-light'
                          }`}
                          style={{ maxWidth: '75%' }}
                        >
                          <small>{new Date(msg.fecha).toLocaleString()}</small>
                          <p className="mb-0">{msg.texto}</p>
                        </div>
                      ))
                  ) : (
                    <p className="text-muted">No hay mensajes todavía.</p>
                  )}
                </Card.Body>
                <Card.Footer className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Escribe un mensaje..."
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); enviarMensaje(); } }}
                  />
                  <Button onClick={enviarMensaje} variant="primary">
                    Enviar
                  </Button>
                </Card.Footer>
              </Card>
            </>
          ) : (
            <p className="text-center text-muted mt-5">Selecciona un grupo para ver detalles.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default MisGrupos;
