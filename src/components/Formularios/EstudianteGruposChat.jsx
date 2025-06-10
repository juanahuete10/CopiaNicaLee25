import React, { useState, useEffect } from 'react';
import { db } from '../../database/firebaseConfig';
import { collection, query, where, getDocs, orderBy, addDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../database/AuthContext';
import { Container, ListGroup, Form, Button, Row, Col, Card } from 'react-bootstrap';

function EstudianteGruposChat() {
  const { user } = useAuth();
  const [grupos, setGrupos] = useState([]);
  const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  // 1. Obtener grupos donde está asignado el estudiante
  useEffect(() => {
    if (!user) return;
    const fetchGrupos = async () => {
      const gruposRef = collection(db, 'grupos');
      const q = query(gruposRef, where('estudiantes', 'array-contains', user.uid));
      const querySnapshot = await getDocs(q);
      const listaGrupos = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGrupos(listaGrupos);
    };
    fetchGrupos();
  }, [user]);

  // 2. Escuchar mensajes en grupo seleccionado
  useEffect(() => {
    if (!grupoSeleccionado) {
      setMensajes([]);
      return;
    }
    const mensajesRef = collection(db, 'grupos', grupoSeleccionado.id, 'mensajes');
    const q = query(mensajesRef, orderBy('fecha', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const mensajesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMensajes(mensajesData);
    });
    return () => unsubscribe();
  }, [grupoSeleccionado]);

  // 3. Enviar mensaje
  const enviarMensaje = async () => {
    if (!nuevoMensaje.trim() || !grupoSeleccionado) return;
    const mensajesRef = collection(db, 'grupos', grupoSeleccionado.id, 'mensajes');
    await addDoc(mensajesRef, {
      texto: nuevoMensaje.trim(),
      uidEmisor: user.uid,
      fecha: serverTimestamp(),
    });
    setNuevoMensaje('');
  };

  return (
    <Container className="mt-4">
      <Row>
        {/* Lista de grupos */}
        <Col md={4} style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <h5>Mis Grupos</h5>
          <ListGroup>
            {grupos.map(grupo => (
              <ListGroup.Item
                key={grupo.id}
                active={grupoSeleccionado?.id === grupo.id}
                onClick={() => setGrupoSeleccionado(grupo)}
                style={{ cursor: 'pointer' }}
              >
                <strong>{grupo.nombre}</strong><br />
                <small>Grado: {grupo.grado} - Sección: {grupo.seccion || 'N/A'}</small>
              </ListGroup.Item>
            ))}
            {grupos.length === 0 && <p>No estás asignado a ningún grupo.</p>}
          </ListGroup>
        </Col>

        {/* Chat */}
        <Col md={8} style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
          {grupoSeleccionado ? (
            <>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Chat: {grupoSeleccionado.nombre}</Card.Title>
                  <Card.Text>Grado: {grupoSeleccionado.grado} | Sección: {grupoSeleccionado.seccion || 'N/A'}</Card.Text>
                </Card.Body>
              </Card>

              <div style={{ flexGrow: 1, overflowY: 'auto', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
                {mensajes.length === 0 && <p className="text-center text-muted">No hay mensajes aún.</p>}
                {mensajes.map(m => (
                  <div key={m.id} style={{
                    marginBottom: '10px',
                    textAlign: m.uidEmisor === user.uid ? 'right' : 'left'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      backgroundColor: m.uidEmisor === user.uid ? '#0d6efd' : '#e4e6eb',
                      color: m.uidEmisor === user.uid ? 'white' : 'black',
                      padding: '6px 12px',
                      borderRadius: '15px',
                      maxWidth: '75%',
                      wordWrap: 'break-word',
                      fontSize: '0.9rem'
                    }}>
                      {m.texto}
                    </span>
                  </div>
                ))}
              </div>

              <Form
                onSubmit={e => {
                  e.preventDefault();
                  enviarMensaje();
                }}
                className="mt-3 d-flex"
              >
                <Form.Control
                  type="text"
                  placeholder="Escribe un mensaje..."
                  value={nuevoMensaje}
                  onChange={e => setNuevoMensaje(e.target.value)}
                />
                <Button variant="primary" type="submit" className="ms-2">Enviar</Button>
              </Form>
            </>
          ) : (
            <p className="text-center text-muted">Selecciona un grupo para chatear.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default EstudianteGruposChat;
