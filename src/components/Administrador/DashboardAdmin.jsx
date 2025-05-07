import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BsFileEarmarkPlusFill,
  BsPeopleFill,
  BsBookFill,
  BsHeartFill,
  BsBarChartFill,
} from "react-icons/bs";
import LogoNicaLee from "../../assets/LogoNicaLee.png";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  const buttonStyle = {
    borderRadius: "16px",
    padding: "15px",
    margin: "10px 0",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    justifyContent: "center",
    width: "100%",
    minWidth: "200px",
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#d4ecff",
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Panel lateral izquierdo */}
      <div
        style={{
          width: "280px",
          background: "#e6f4ff",
          padding: "30px 20px",
          borderTopRightRadius: "30px",
          borderBottomRightRadius: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontWeight: "bold", marginBottom: "30px", color: "#003366" }}>NicaLee</h2>

        <button
          onClick={() => navigate("/crearadmin")}
          style={{ ...buttonStyle, background: "#ff6b6b" }}
        >
          <BsFileEarmarkPlusFill size={20} /> Crear Lecciones
        </button>

        <button
          onClick={() => navigate("/listaestudiantes")}
          style={{ ...buttonStyle, background: "#ffc107" }}
        >
          <BsPeopleFill size={20} /> Ver Estudiantes
        </button>

        <button
          onClick={() => alert("Padres de familia")}
          style={{ ...buttonStyle, background: "#ff8c42" }}
        >
          <BsHeartFill size={20} /> Padres de Familia
        </button>

        <button
          onClick={() => navigate("/listadocentes")}
          style={{ ...buttonStyle, background: "#8265e3" }}
        >
          <BsPeopleFill size={20} /> Docentes
        </button>

        <button
          onClick={() => navigate("/biblioteca")}
          style={{ ...buttonStyle, background: "#38b2ac" }}
        >
          <BsBookFill size={20} /> Biblioteca
        </button>

        <button
          onClick={() => alert("Reportes generales")}
          style={{ ...buttonStyle, background: "#ff6b81" }}
        >
          <BsBarChartFill size={20} /> Reportes
        </button>
      </div>

      {/* Panel principal */}
      <div
        style={{
          flex: 1,
          padding: "50px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo centrado */}
        <img
          src={LogoNicaLee}
          alt="Logo"
          style={{ width: "150px", marginBottom: "30px" }}
        />

        {/* Panel de bienvenida con fondo celeste degradado */}
        <div
          style={{
            background: "linear-gradient(135deg, #c0eaff, #b3d4ff)",
            borderRadius: "20px",
            padding: "30px",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h2 style={{ fontWeight: "bold", color: "#003366" }}>
            ¡Bienvenido al Panel de Administración!
          </h2>
          <img
            src="https://cdn-icons-png.flaticon.com/512/5231/5231019.png"
            alt="niña feliz"
            style={{ width: "200px", marginTop: "20px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
