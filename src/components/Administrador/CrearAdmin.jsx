import React, { useState } from "react";
import { auth, db } from "../../database/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const CrearAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      await setDoc(doc(db, "users", uid), {
        email,
        role: "admin",
      });

      alert("Administrador creado exitosamente.");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear Nuevo Administrador</h2>
      <form onSubmit={handleCreateAdmin}>
        <input
          type="email"
          className="form-control mb-2"
          placeholder="Correo del nuevo admin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-danger" type="submit">Crear Admin</button>
      </form>
    </div>
  );
};

export default CrearAdmin;
