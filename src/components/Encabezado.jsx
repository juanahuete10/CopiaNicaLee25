import React from "react";
import Container from "react-bootstrap/Container";
import LogoNicaLee from "../assets/LogoNicaLee.png";
import "../App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Encabezado = () => {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <header
      style={{
        backgroundColor: "#7EC8E3",
        padding: "5px 0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 999,
        height: "55px"
      }}
    >
      <Container className="d-flex align-items-center justify-content-between">
        <button
          onClick={handleBack}
          className="btn btn-link text-white p-0 ps-1"
          style={{ fontSize: "1.3rem" }}
        >
          <i className="bi bi-arrow-left"></i>
        </button>

        <div className="d-flex align-items-center mx-auto">
          <img
            src={LogoNicaLee}
            alt="Logo de NicaLee"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <h1
            className="text-white m-0"
            style={{
              fontSize: "1.3rem",
              fontWeight: "bold",
              fontFamily: "'Comic Sans MS', cursive",
              lineHeight: "1"
            }}
          >
            NicaLee
          </h1>
        </div>

        {/* Espacio vacío para alinear correctamente */}
        <div style={{ width: "1.5rem" }}></div>
      </Container>
    </header>
  );
};

export default Encabezado;
