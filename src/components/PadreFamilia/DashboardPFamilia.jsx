import React from "react";
import { useLocation } from "react-router-dom";
import Recompensas from "../JuegosInteractivos/Recompensas";
import Biblioteca from "../Lecciones/Biblioteca";

// Icono de regresar
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

// SVG Estrella
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

// Componente sección reutilizable
const SeccionDashboard = ({ icon, titulo, children }) => (
  <section
    style={{
      marginBottom: 40,
      display: "flex",
      alignItems: "center",
      gap: 20,
    }}
  >
    {icon}
    <div>
      <h4
        style={{
          marginBottom: 15,
          fontWeight: "600",
          fontSize: "1.6rem",
        }}
      >
        {titulo}
      </h4>
      {children}
    </div>
  </section>
);

const DashboardPFamilia = () => {
  const location = useLocation();
  const padre = location.state?.padreFamilia;

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
          maxWidth: 900,
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

        <SeccionDashboard icon={<SvgEstrella />} titulo="📈 Progreso de tus hijos">
          <p style={{ fontSize: "1.1rem", lineHeight: 1.5 }}>
            (Aquí podrías ver cuántas lecciones y juegos han completado tus hijos)
          </p>
        </SeccionDashboard>

        <SeccionDashboard icon={<SvgEstrella />} titulo="📚 Biblioteca">
          <Biblioteca />
        </SeccionDashboard>

        <SeccionDashboard icon={<SvgEstrella />} titulo="🏆 Recompensas">
          <Recompensas />
        </SeccionDashboard>

        <SeccionDashboard icon={<SvgEstrella />} titulo="👨‍👩‍👧 Hijos Registrados">
          <p style={{ fontSize: "1.1rem", lineHeight: 1.5 }}>
            Nombre, grado y edad de los hijos registrados
          </p>
          {/* Aquí puedes conectar con Firestore para traer datos de hijos */}
        </SeccionDashboard>
      </div>
    </div>
  );
};

export default DashboardPFamilia;
