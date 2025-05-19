import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Racha from "./Racha";

const DashboardNiño = ({ uid }) => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #66ccff, #ffcc66)",
        padding: "10px",
        boxSizing: "border-box",
        marginTop: "35px"
      }}
    >
      {/* Menú lateral */}
      <div
        style={{
          width: menuVisible ? 220 : 0,
          transition: "width 0.3s ease",
          overflow: "hidden",
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          padding: menuVisible ? "20px" : "0",
          color: "#333",
          fontFamily: "Comic Sans MS",
        }}
      >
        <h3>Menú</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          <li style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => navigate("/biblioteca")}>📚 Biblioteca</li>
          <li style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => navigate("/juegos")}>🎮 Juegos</li>
          <li style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => navigate("/perfilestudiante")}>👤 Perfil</li>
          <li style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => navigate("/recompensas")}>🏆 Recompensas</li>
        
        </ul>
      </div>

      {/* Contenido principal */}
      <div
        style={{
          flexGrow: 1,
          marginLeft: menuVisible ? 20 : 0,
          transition: "margin-left 0.3s ease",
          borderRadius: "15px",
          padding: "20px",
          boxSizing: "border-box",
          fontFamily: "Comic Sans MS",
        }}
      >
        {/* Botón de menú */}
        <button
          onClick={toggleMenu}
          style={{
            position: "fixed",
            top: 20,
            left: 20,
            zIndex: 1000,
            backgroundColor: "#66ccff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "20px",
            color: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
          aria-label="Toggle menu"
        >
          &#9776;
        </button>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "black" }}>¡Bienvenido a NicaLee!</h1>
          <p style={{ color: "black", fontSize: "18px" }}>
            Explora juegos, cuentos y actividades para mejorar tu lectura.
          </p>
        </div>

        <Racha uid={uid} />

        {/* Tarjetas */}
        <div className="row mt-4">
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm p-3 text-center" style={{ borderRadius: "15px" }}>
              <h3>📚 Biblioteca</h3>
              <p>Lee cuentos y libros interactivos.</p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/biblioteca")}
              >
                Explorar
              </button>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm p-3 text-center" style={{ borderRadius: "15px" }}>
              <h3>🎮 Juegos</h3>
              <p>Aprende con juegos divertidos y educativos.</p>
              <button
                className="btn btn-warning"
                onClick={() => navigate("/juegos")}
              >
                Jugar
              </button>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm p-3 text-center" style={{ borderRadius: "15px" }}>
              <h3>👤 Perfil</h3>
              <p>Consulta tu perfil de estudiante.</p>
              <button
                className="btn btn-info"
                onClick={() => navigate("/perfilestudiante")}
              >
                Ver Perfil
              </button>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm p-3 text-center" style={{ borderRadius: "15px" }}>
              <h3>🏆 Recompensas</h3>
              <p>Consulta tus logros y premios.</p>
              <button
                className="btn btn-success"
                onClick={() => navigate("/recompensas")}
              >
                Ver Recompensas
              </button>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm p-3 text-center" style={{ borderRadius: "15px" }}>
              <h3>📈 Mis Progresos</h3>
              <p>Mira tus avances y aprendizajes.</p>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/misprogresos")}
              >
                Ver Avances
              </button>
            </div>
          </div>
        </div>

        {/* Botón de cierre de sesión */}
        <div className="text-center mt-4">
          <button
            className="btn btn-danger"
            onClick={() => navigate("/")}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNiño;
