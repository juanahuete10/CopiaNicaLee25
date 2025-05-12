import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardNiño = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">¡Bienvenido a NicaLee!</h1>
      <p className="lead">Explora juegos, historias y actividades para mejorar tu lectura.</p>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card shadow-lg p-3">
            <h3>📚 Biblioteca</h3>
            <p>Lee cuentos y libros interactivos.</p>
            <button className="btn btn-primary" onClick={() => navigate("/biblioteca")}>Explorar</button>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-lg p-3">
            <h3>🎮 Juegos</h3>
            <p>Aprende con juegos divertidos y educativos.</p>
            <button className="btn btn-success" onClick={() => navigate("/juegos")}>Jugar</button>
          </div>
        </div>

    


        <div className="col-md-4">
          <div className="card shadow-lg p-3">
            <h3>🏆 Recompensas</h3>
            <p>Consulta tus logros y premios.</p>
            <button className="btn btn-warning" onClick={() => navigate("/recompensas")}>Ver</button>
          </div>
        </div>
      </div>

      <button className="btn btn-danger mt-4" onClick={() => navigate("/")}>Cerrar sesión</button>
    </div>
  );
};

export default DashboardNiño;
