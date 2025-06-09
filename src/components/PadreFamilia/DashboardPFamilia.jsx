import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

const IconoRegresar = () => (
  <svg
    onClick={() => window.history.back()}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="black"
    strokeWidth={2}
    style={{ width: 30, height: 30, cursor: "pointer" }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const SvgEstrella = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="#00aaff"
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: 10 }}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
  </svg>
);

const DashboardPFamilia = () => {
  const location = useLocation();
  const padre = location.state?.padreFamilia;

  const [codigoMined, setCodigoMined] = useState("");
  const [estudiante, setEstudiante] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buscarEstudiante = async () => {
    setLoading(true);
    setError("");
    setEstudiante(null);

    try {
      const estudiantesRef = collection(db, "estudiantes");
      const q = query(estudiantesRef, where("codigoMined", "==", codigoMined.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError("No se encontró ningún estudiante con ese código.");
      } else {
        const doc = querySnapshot.docs[0];
        setEstudiante({ id: doc.id, ...doc.data() });
      }
    } catch (err) {
      setError("Error al buscar el estudiante: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #00aaff 0%, #ffffff 100%)",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#03314b",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      <div style={{ position: "fixed", top: 20, left: 20, zIndex: 1000 }}>
        <IconoRegresar />
      </div>

      <div
        style={{
          maxWidth: 700,
          width: "95%",
          backgroundColor: "#e0f7fa",
          borderRadius: 20,
          boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          padding: 40,
          marginTop: 60,
          fontSize: "1.1rem",
        }}
      >
        <h2
          style={{
            marginBottom: 30,
            fontWeight: "700",
            fontSize: "2.5rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SvgEstrella />
          ¡Bienvenido, {padre?.nombre}!
        </h2>

        <h3 style={{ marginBottom: 10 }}>🔍 Buscar hijo por código MINED</h3>
        <input
          type="text"
          placeholder="Ingresa el código MINED"
          value={codigoMined}
          onChange={(e) => setCodigoMined(e.target.value)}
          style={{ padding: 10, fontSize: "1rem", width: "60%", marginRight: 10 }}
        />
        <button
          onClick={buscarEstudiante}
          disabled={loading || !codigoMined.trim()}
          style={{
            padding: "10px 20px",
            fontSize: "1rem",
            backgroundColor: "#00aaff",
            color: "white",
            border: "none",
            borderRadius: 5,
            cursor: "pointer",
          }}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>

        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

        {estudiante && (
          <div
            style={{
              marginTop: 30,
              padding: 20,
              backgroundColor: "#b2ebf2",
              borderRadius: 10,
            }}
          >
            <h3>📄 Perfil del hijo:</h3>
            <p><strong>Nombre:</strong> {estudiante.nombre}</p>
            <p><strong>Grado:</strong> {estudiante.grado}</p>
            <p><strong>Edad:</strong> {estudiante.edad}</p>
            <p><strong>Lecciones completadas:</strong> {estudiante.leccionesCompletadas || 0}</p>
            <p><strong>Juegos completados:</strong> {estudiante.juegosCompletados || 0}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPFamilia;
