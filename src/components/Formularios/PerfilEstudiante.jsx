import React, { useState, useEffect } from "react";
import { db, auth } from "../../database/firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  Button,
  Card,
  Row,
  Col,
  Image,
  Container,
  Modal,
} from "react-bootstrap";

export default function PerfilEstudiante() {
  const [estudiante, setEstudiante] = useState(null);
  const [editando, setEditando] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [cargando, setCargando] = useState(true);

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
    rol: "estudiante",
    imagen: null,
    codigoMined: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        try {
          const userRef = doc(db, "users", uid);
          const userSnap = await getDoc(userRef);
          const correo = userSnap.exists()
            ? userSnap.data().correo || user.email
            : user.email;

          const estudianteRef = doc(db, "estudiantes", uid);
          const estudianteSnap = await getDoc(estudianteRef);

          if (estudianteSnap.exists()) {
            const data = estudianteSnap.data();
            setEstudiante({ id: uid, ...data });
            setFormData({
              ...data,
              correo,
              rol: "estudiante",
            });
          } else {
            // Si no existe perfil, crear uno básico automáticamente
            const perfilInicial = {
              nombre: "",
              apellido: "",
              edad: "",
              fechaNacimiento: "",
              grado: "",
              intereses: "",
              nivelEducativo: "",
              ubicacion: "",
              genero: "",
              imagen: null,
              codigoMined: "",
            };
            await setDoc(estudianteRef, perfilInicial);
            setEstudiante({ id: uid, ...perfilInicial });
            setFormData({
              ...perfilInicial,
              correo,
              rol: "estudiante",
            });
          }
        } catch (error) {
          console.error("❌ Error cargando datos del perfil:", error);
          alert("❌ Error cargando perfil.");
        }
      } else {
        setEstudiante(null);
      }
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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

  if (cargando) {
    return <p className="text-center mt-5">🔄 Cargando perfil del estudiante...</p>;
  }

  if (!estudiante) {
    return <p className="text-center mt-5">❌ No se encontró usuario autenticado.</p>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f0f8ff, #ffffff)",
        padding: "40px 20px",
      }}
    >
      <Container className="d-flex justify-content-center align-items-center flex-column">
        <Card className="shadow-lg mb-4 w-100" style={{ maxWidth: "800px" }}>
          <Card.Body>
            <Row className="align-items-center">
              <Col xs={12} md={4} className="text-center mb-3">
                {formData.imagen ? (
                  <Image
                    src={formData.imagen}
                    roundedCircle
                    style={{ width: "130px", border: "4px solid #0d6efd" }}
                    alt="Foto de perfil"
                  />
                ) : (
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/4715/4715327.png"
                    roundedCircle
                    style={{ width: "130px", border: "4px solid #0d6efd" }}
                    alt="Icono de usuario"
                  />
                )}
              </Col>
              <Col xs={12} md={8}>
                <h3 className="text-primary fw-bold mb-2">
                  {formData.nombre || "Nombre no definido"} {formData.apellido || ""}
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
                <p className="mb-1">🔢 Código MINED: {formData.codigoMined || "No asignado"}</p>
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
              <form>
                <Row className="g-3">
                  {Object.entries(formData).map(([key, value]) => {
                    // No editar correo ni rol
                    if (key === "correo" || key === "rol") return null;
                    // Para imagen, mostrar input file separado
                    if (key === "imagen")
                      return (
                        <Col md={6} xs={12} key={key}>
                          <label className="form-label text-capitalize">{key}</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    imagen: reader.result,
                                  }));
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="form-control"
                          />
                        </Col>
                      );

                    return (
                      <Col md={6} xs={12} key={key}>
                        <label className="form-label text-capitalize">{key}</label>
                        <input
                          type="text"
                          name={key}
                          value={value || ""}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </Col>
                    );
                  })}
                </Row>
                <div className="mt-4 text-end">
                  <Button type="button" variant="success" onClick={guardarCambios}>
                    💾 Guardar Cambios
                  </Button>{" "}
                  <Button type="button" variant="secondary" onClick={() => setEditando(false)}>
                    ❌ Cancelar
                  </Button>
                </div>
              </form>
            </Card.Body>
          </Card>
        )}

        <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar eliminación</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Seguro que quieres eliminar tu perfil? Esta acción no se puede deshacer.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirm(false)}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                setShowConfirm(false);
                eliminarPerfil();
              }}
            >
              Eliminar Perfil
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
