import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaRobot,
  FaGamepad,
  FaUser,
  FaTrophy,
  FaChartBar,
  FaChartLine,
  FaUsers
} from "react-icons/fa";
import Racha from "./Racha";

const DashboardNiño = ({ uid }) => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const menuItemStyle = {
    margin: "10px 0",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px"
  };

  const iconStyle = {
    color: "#00bfff"
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #00bfff, #ffffff)",
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
          fontFamily: "Comic Sans MS"
        }}
      >
        <h3>Menú</h3>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          <li style={menuItemStyle} onClick={() => navigate("/biblioteca")}>
            <FaBook style={iconStyle} /> Biblioteca
          </li>
          <li style={menuItemStyle} onClick={() => navigate("/cuentacuentosia")}>
            <FaRobot style={iconStyle} /> Cuentos IA
          </li>
          <li style={menuItemStyle} onClick={() => navigate("/juegos")}>
            <FaGamepad style={iconStyle} /> Juegos
          </li>
          <li style={menuItemStyle} onClick={() => navigate("/perfilestudiante")}>
            <FaUser style={iconStyle} /> Perfil
          </li>
          <li style={menuItemStyle} onClick={() => navigate("/recompensas")}>
            <FaTrophy style={iconStyle} /> Recompensas
          </li>
          <li style={menuItemStyle} onClick={() => navigate("/estadisticaN")}>
            <FaChartBar style={iconStyle} /> Estadísticas
          </li>
          <li style={menuItemStyle} onClick={() => navigate("/misprogresos")}>
            <FaChartLine style={iconStyle} /> Mis Progresos
          </li>
          <li style={menuItemStyle} onClick={() => navigate("/estudiantegruposchat")}>
            <FaUsers style={iconStyle} /> Grupos
          </li>
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
          fontFamily: "Comic Sans MS"
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
            backgroundColor: "#00bfff",
            border: "none",
            padding: "10px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "20px",
            color: "#fff",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
          }}
          aria-label="Toggle menu"
        >
          &#9776;
        </button>

        {/* Encabezado */}
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <h1 style={{ color: "black" }}>¡Bienvenido a NicaLee!</h1>
          <p style={{ color: "black", fontSize: "18px" }}>
            Explora juegos, cuentos y actividades para mejorar tu lectura.
          </p>
        </div>

        {/* Componente de racha */}
        <Racha uid={uid} />

        {/* Tarjetas */}
        <div className="row mt-4">
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm p-3 text-center" style={{ borderRadius: "15px" }}>
              <h3>📚 Biblioteca</h3>
              <p>Lee cuentos y libros interactivos.</p>
              <button className="btn btn-primary" onClick={() => navigate("/biblioteca")}>
                Explorar
              </button>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm p-3 text-center" style={{ borderRadius: "15px" }}>
              <h3>Cuentos IA</h3>
              <p>Genera tus cuentos favoritos.</p>
              <button className="btn btn-success" onClick={() => navigate("/cuentacuentosia")}>
                Generar cuentos
              </button>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm p-3 text-center" style={{ borderRadius: "15px" }}>
              <h3>🎮 Juegos</h3>
              <p>Aprende con juegos divertidos y educativos.</p>
              <button className="btn btn-warning" onClick={() => navigate("/juegos")}>
                Jugar
              </button>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm p-3 text-center" style={{ borderRadius: "15px" }}>
              <h3>👤 Perfil</h3>
              <p>Consulta tu perfil de estudiante.</p>
              <button className="btn btn-info" onClick={() => navigate("/perfilestudiante")}>
                Ver Perfil
              </button>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm p-3 text-center" style={{ borderRadius: "15px" }}>
              <h3>🏆 Recompensas</h3>
              <p>Consulta tus logros y premios.</p>
              <button className="btn btn-success" onClick={() => navigate("/recompensas")}>
                Ver Recompensas
              </button>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm p-3 text-center" style={{ borderRadius: "15px" }}>
              <h3>📊 Estadísticas</h3>
              <p>Consulta tus estadísticas.</p>
              <button className="btn btn-success" onClick={() => navigate("/estadisticaN")}>
                Ver Estadísticas
              </button>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm p-3 text-center" style={{ borderRadius: "15px" }}>
              <h3>📈 Mis Progresos</h3>
              <p>Mira tus avances y aprendizajes.</p>
              <button className="btn btn-secondary" onClick={() => navigate("/misprogresos")}>
                Ver Avances
              </button>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm p-3 text-center" style={{ borderRadius: "15px" }}>
              <h3>👨‍👩‍👧 Grupos</h3>
              <p>Mira tus grupos y lecciones.</p>
              <button className="btn btn-secondary" onClick={() => navigate("/estudiantegruposchat")}>
                Ver Grupos
              </button>
            </div>
          </div>
        </div>

        {/* Botón cerrar sesión */}
        <div className="text-center mt-4">
          <button className="btn btn-danger" onClick={() => navigate("/")}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardNiño;
