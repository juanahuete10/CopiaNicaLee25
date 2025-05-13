import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../database/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { FaArrowLeft } from "react-icons/fa"; 
import LogoNicaLee from "../assets/LogoNicaLee.png";
import "../../src/styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;
      const correo = userCredential.user.email;

      console.log("Usuario autenticado:", correo, "UID:", uid); // DEBUG

      // Administrador
      if (correo === "juanamasis18@gmail.com") {
        navigate("/dashboardadmin");
        return;
      }

      // Firestore
      const userDoc = await getDoc(doc(db, "users", uid));

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        console.log("Datos en Firestore:", userData); // DEBUG

        if (!role) {
          alert("El usuario no tiene un rol asignado.");
          return;
        }

        if (role === "estudiante") navigate("/dashboardniño");
        else if (role === "docente") navigate("/dashboarddocente");
        else if (role === "padre") navigate("/dashboardpfamilia");
        else navigate("/dashboard");
      } else {
        alert("No se encontró información del usuario.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error); // DEBUG
      alert("Error al iniciar sesión: " + error.message);
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
      {/* Botón de retroceso */}
      <button
        className="btn btn-link align-self-start ms-3 mb-2 text-decoration-none text-dark"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft className="me-2" />
        Volver
      </button>

      <img src={LogoNicaLee} alt="Logo" className="mb-4" style={{ width: "180px" }} />

      <div className="card p-4 shadow" style={{ width: "350px", borderRadius: "12px" }}>
        <h2 className="mb-3">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-2"
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="btn btn-primary btn-lg w-100" type="submit">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
