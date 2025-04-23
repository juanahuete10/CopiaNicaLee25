import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../src/styles.css";
import LogoNicaLee from "../assets/LogoNicaLee.png";
import bookIcon from "../assets/book-icon.png";
import starsIcon from "../assets/stars-icon.png";

const InicioNicaLee = () => {
  const navigate = useNavigate();

  return (
    <div
      className="welcome-container d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(to bottom right, #b3e5fc, #ffffff)",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="text-center mb-3">
          <img
            src={LogoNicaLee}
            alt="Logo Nica Lee"
            style={{ width: "180px", marginBottom: "15px" }}
          />
        </div>

        <h1 className="fw-bold mb-2 text-primary">Bienvenido a Nica Lee</h1>
        <p className="lead mb-4 text-secondary">
          Una plataforma educativa para mejorar la comprensión lectora en niños.
        </p>

        <div className="d-grid gap-3">
          <button className="btn btn-primary btn-lg rounded-pill" onClick={() => navigate("/registro")}>
            🚀 Registrarse
          </button>
          <button className="btn btn-outline-primary btn-lg rounded-pill" onClick={() => navigate("/login")}>
            🔐 Iniciar Sesión
          </button>
        </div>

        <div className="mt-4 d-flex justify-content-center gap-4">
          <img src={bookIcon} alt="Libro" style={{ width: "50px" }} />
          <img src={starsIcon} alt="Estrellas" style={{ width: "50px" }} />
        </div>
      </div>
    </div>
  );
};

export default InicioNicaLee;
