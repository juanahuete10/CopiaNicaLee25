import React from "react";
import Container from "react-bootstrap/Container";
import LogoNicaLee from "../assets/LogoNicaLee.png";
import "../App.css";

const Encabezado = () => {
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
        height: "55px"  // Ajuste de altura máxima
      }}
    >
      <Container className="d-flex align-items-center justify-content-center">
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
      </Container>
    </header>
  );
};

export default Encabezado;
