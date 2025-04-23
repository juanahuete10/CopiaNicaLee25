import React, { useState } from "react";
import { auth, db } from "../database/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../src/styles.css";
import LogoNicaLee from "../assets/LogoNicaLee.png";

const Registro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      alert("Por favor, selecciona un tipo de usuario.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      await setDoc(doc(db, "users", userId), { email, role: selectedRole });

      if (selectedRole === "estudiante") navigate("/registroestudiante");
      else if (selectedRole === "docente") navigate("/formulariodocente");
      else if (selectedRole === "padre") navigate("/dashboard-padre");
      else navigate("/dashboard");
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
      <div className="card p-4 shadow" style={{ width: "350px", borderRadius: "12px" }}>
        <h2 className="mb-3">Registro</h2>
        <form onSubmit={handleRegister}>
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
          <h4 className="mt-3">Selecciona tu tipo de usuario</h4>
          <select
            className="form-select mb-3"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            required
          >
            <option value="">-- Seleccionar --</option>
            <option value="estudiante">Estudiante</option>
            <option value="docente">Docente</option>
            <option value="padre">Padre de familia</option>
          </select>
          <button className="btn btn-success btn-lg w-100 mt-4" type="submit">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registro;
