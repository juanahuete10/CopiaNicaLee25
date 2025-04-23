import React, { useState } from "react";
import { db } from "../../database/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../src/styles.css";
import LogoNicaLee from "../../assets/LogoNicaLee.png";

const RegistroEstudiante = ({ uid }) => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [edad, setEdad] = useState("");
  const [grado, setGrado] = useState("");
  const [intereses, setIntereses] = useState("");
  const [nivelEducativo, setNivelEducativo] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [genero, setGenero] = useState("");
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!genero) {
      alert("Por favor, selecciona un género.");
      return;
    }
    try {
      await setDoc(doc(db, "users", uid), {
        nombres,
        apellidos,
        edad,
        grado,
        intereses,
        nivelEducativo,
        ubicacion,
        genero,
        fotoPerfil: fotoPerfil ? URL.createObjectURL(fotoPerfil) : null,
        role: "niño",
      });

      navigate("/dashboard-nino");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      className="auth-container d-flex flex-column align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(to bottom, #cce7ff, #ffffff)",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <img src={LogoNicaLee} alt="Logo" className="mb-4" style={{ width: "180px" }} />
      <div className="card p-4 shadow" style={{ width: "400px", borderRadius: "12px" }}>
        <h2 className="mb-3">Registro de Estudiante</h2>
        <form onSubmit={handleRegister}>
          <label className="form-label">Selecciona tu foto de perfil</label>
          <input
            className="form-control mb-2"
            type="file"
            accept="image/*"
            onChange={(e) => setFotoPerfil(e.target.files[0])}
          />

          <input
            className="form-control mb-2"
            type="text"
            placeholder="Nombres"
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
            required
          />

          <input
            className="form-control mb-2"
            type="text"
            placeholder="Apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
            required
          />

          <input
            className="form-control mb-2"
            type="number"
            placeholder="Edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />

          <input
            className="form-control mb-2"
            type="text"
            placeholder="Grado"
            value={grado}
            onChange={(e) => setGrado(e.target.value)}
            required
          />

          <input
            className="form-control mb-2"
            type="text"
            placeholder="Intereses"
            value={intereses}
            onChange={(e) => setIntereses(e.target.value)}
            required
          />

          <input
            className="form-control mb-2"
            type="text"
            placeholder="Nivel Educativo"
            value={nivelEducativo}
            onChange={(e) => setNivelEducativo(e.target.value)}
            required
          />

          <input
            className="form-control mb-2"
            type="text"
            placeholder="Ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
          />

          <h4 className="mt-3">Género</h4>
          <div className="d-flex justify-content-around mb-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="genero"
                value="Masculino"
                checked={genero === "Masculino"}
                onChange={(e) => setGenero(e.target.value)}
              />
              <label className="form-check-label">Masculino</label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="genero"
                value="Femenino"
                checked={genero === "Femenino"}
                onChange={(e) => setGenero(e.target.value)}
              />
              <label className="form-check-label">Femenino</label>
            </div>
          </div>

          <button className="btn btn-success btn-lg w-100 mt-3" type="submit">
            Guardar Datos Personales
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistroEstudiante;