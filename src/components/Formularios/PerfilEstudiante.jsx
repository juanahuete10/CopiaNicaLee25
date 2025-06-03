import React, { useState, useEffect } from "react";
import { db, auth } from "../../database/firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  Button,
  Form,
  Card,
  Modal,
  Row,
  Col,
  Image,
  Container
} from "react-bootstrap";

export default function PerfilEstudiante() {
  const [estudiante, setEstudiante] = useState(null);
  const [editando, setEditando] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [noPerfil, setNoPerfil] = useState(false);

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    edad: "",
    fechaNacimiento: "",
    grado: "",
    intereses: "",
    nivelEducativo: "",
    ubicacion: "",
    genero: "",
    correo: "",
    rol: "estudiante"
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        try {
          const userRef = doc(db, "users", uid);
          const userSnap = await getDoc(userRef);
          const correo = userSnap.exists() ? userSnap.data().correo || user.email : user.email;

          const estudianteRef = doc(db, "estudiantes", uid);
          const estudianteSnap = await getDoc(estudianteRef);

          if (estudianteSnap.exists()) {
            const data = estudianteSnap.data();
            setEstudiante({ id: uid, ...data });
            setFormData({
              ...data,
              correo: correo,
              rol: "estudiante"
            });
            setNoPerfil(false);
          } else {
            setEstudiante(null);
            setNoPerfil(true);
            setFormData({
              nombre: "",
              apellido: "",
              edad: "",
              fechaNacimiento: "",
              grado: "",
              intereses: "",
              nivelEducativo: "",
              ubicacion: "",
              genero: "",
              correo: correo,
              rol: "estudiante"
            });
          }
        } catch (error) {
          console.error("❌ Error cargando datos del perfil:", error);
        }
      } else {
        setEstudiante(null);
        setNoPerfil(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const guardarCambios = async () => {
    try {
      const datosActualizables = { ...formData };
      delete datosActualizables.correo;
      delete datosActualizables.rol;

      const ref = doc(db, "estudiantes", estudiante.id);
      await updateDoc(ref, datosActualizables);
      setEstudiante({ ...estudiante, ...datosActualizables });
      setEditando(false);
      alert("✅ Datos actualizados correctamente.");
    } catch (error) {
      console.error("Error actualizando:", error);
      alert("❌ Ocurrió un error al guardar.");
    }
  };

  const crearPerfil = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("❌ No estás autenticado.");
        return;
      }

      const uid = user.uid;
      const datos = { ...formData };
      delete datos.correo;
      delete datos.rol;

      const ref = doc(db, "estudiantes", uid); // ✅ Aquí se asegura que 'uid' está definido
      await setDoc(ref, datos);
      setEstudiante({ id: uid, ...datos });
      setNoPerfil(false);
      alert("✅ Perfil creado correctamente.");
    } catch (error) {
      console.error("Error creando perfil:", error);
      alert("❌ Ocurrió un error al crear el perfil.");
    }
  };

  const eliminarPerfil = async () => {
    try {
      const ref = doc(db, "estudiantes", estudiante.id);
      await deleteDoc(ref);
      alert("❌ Perfil eliminado correctamente.");
      await signOut(auth);
    } catch (error) {
      console.error("Error eliminando:", error);
      alert("❌ Error al eliminar perfil.");
    }
  };

  if (noPerfil) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom, #f0f8ff, #ffffff)",
          padding: "40px 20px"
        }}
      >
        <Container className="d-flex justify-content-center align-items-center flex-column">
          <Card className="shadow-lg w-100" style={{ maxWidth: "800px" }}>
            <Card.Body>
              <h3 className="text-center text-primary mb-4">
                Crear Perfil de Estudiante
              </h3>
              <Form>
                <Row className="g-3">
                  {Object.entries(formData).map(([key, value]) => {
                    if (key === "correo" || key === "rol") return null;
                    return (
                      <Col md={6} xs={12} key={key}>
                        <Form.Group>
                          <Form.Label className="text-capitalize">{key}</Form.Label>
                          <Form.Control
                            type="text"
                            name={key}
                            value={value}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    );
                  })}
                </Row>
                <div className="mt-4 text-end">
                  <Button variant="success" onClick={crearPerfil}>
                    💾 Crear Perfil
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }

  if (!estudiante) {
    return <p className="text-center mt-5">Cargando perfil...</p>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f0f8ff, #ffffff)",
        padding: "40px 20px"
      }}
    >
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <Card className="shadow-lg mb-4 w-100" style={{ maxWidth: "800px" }}>
          <Card.Body>
            <Row className="align-items-center">
              <Col xs={12} md={4} className="text-center mb-3">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/4715/4715327.png"
                  roundedCircle
                  style={{ width: "130px", border: "4px solid #0d6efd" }}
                />
              </Col>
              <Col xs={12} md={8}>
                <h3 className="text-primary fw-bold mb-2">
                  {formData.nombre} {formData.apellido}
                </h3>
                <p className="mb-1">📩 Correo: {formData.correo}</p>
                <p className="mb-1">🛡️ Rol: {formData.rol}</p>
                <p className="mb-1">📚 Grado: {formData.grado}</p>
                <p className="mb-1">🎓 Nivel Educativo: {formData.nivelEducativo}</p>
                <p className="mb-1">📍 Ubicación: {formData.ubicacion}</p>
                <p className="mb-1">🧠 Intereses: {formData.intereses}</p>
                <p className="mb-1">📅 Edad: {formData.edad}</p>
                <p className="mb-1">🎂 Fecha de Nacimiento: {formData.fechaNacimiento}</p>
                <p className="mb-1">🧬 Género: {formData.genero}</p>
                <div className="mt-3 d-flex gap-3 flex-wrap">
                  <Button onClick={() => setEditando(true)} variant="primary">
                    ✏️ Editar
                  </Button>
                  <Button variant="danger" onClick={() => setShowConfirm(true)}>
                    🗑️ Eliminar
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {editando && (
          <Card className="shadow-sm w-100" style={{ maxWidth: "800px" }}>
            <Card.Body>
              <h5 className="mb-3 text-center text-secondary">
                Editar Información del Perfil
              </h5>
              <Form>
                <Row className="g-3">
                  {Object.entries(formData).map(([key, value]) => (
                    <Col md={6} xs={12} key={key}>
                      <Form.Group>
                        <Form.Label className="text-capitalize">{key}</Form.Label>
                        <Form.Control
                          type="text"
                          name={key}
                          value={value}
                          onChange={handleChange}
                          disabled={key === "correo" || key === "rol"}
                        />
                      </Form.Group>
                    </Col>
                  ))}
                </Row>
                <div className="mt-4 text-end">
                  <Button variant="success" onClick={guardarCambios}>
                    💾 Guardar Cambios
                  </Button>{" "}
                  <Button variant="secondary" onClick={() => setEditando(false)}>
                    ❌ Cancelar
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        )}

        <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>¿Eliminar perfil?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Esta acción eliminará permanentemente el perfil del estudiante.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={eliminarPerfil}>
              Sí, eliminar
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
