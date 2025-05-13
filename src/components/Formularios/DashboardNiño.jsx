import React from "react";
import { useNavigate } from "react-router-dom";
import Racha from "./Racha"; 

const DashboardNiño = ({ uid }) => {  
  const navigate = useNavigate();

  return (
    <div
      className="container text-center mt-5"
      style={{
        background: 'linear-gradient(135deg, #66ccff, #ffcc66)', // Degradado simple con azul y amarillo
        minHeight: '100vh',
        padding: '20px',
        borderRadius: '15px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h1 className="mb-4" style={{ color: 'black', fontFamily: 'Comic Sans MS' }}>
        ¡Bienvenido a NicaLee!
      </h1>
      <p className="lead" style={{ color: 'black', fontFamily: 'Comic Sans MS' }}>
        Explora juegos, historias y actividades para mejorar tu lectura.
      </p>

      {/* Aquí agregamos el componente Racha */}
      <Racha uid={uid} />

      <div className="row mt-4">
        <div className="col-md-4">
          <div
            className="card shadow-lg p-3"
            style={{
              backgroundColor: '#fff',
              borderRadius: '15px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ color: 'black' }}>📚 Biblioteca</h3>
            <p>Lee cuentos y libros interactivos.</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/biblioteca")}
              style={{
                backgroundColor: '#66ccff',
                borderColor: '#3399ff',
                fontWeight: 'bold',
              }}
            >
              Explorar
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card shadow-lg p-3"
            style={{
              backgroundColor: '#fff',
              borderRadius: '15px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ color: 'black' }}>🎮 Juegos</h3>
            <p>Aprende con juegos divertidos y educativos.</p>
            <button
              className="btn btn-success"
              onClick={() => navigate("/juegos")}
              style={{
                backgroundColor: '#ffcc66',
                borderColor: '#ff9966',
                fontWeight: 'bold',
              }}
            >
              Jugar
            </button>
          </div>
        </div>

        <div className="col-md-4">
          <div
            className="card shadow-lg p-3"
            style={{
              backgroundColor: '#fff',
              borderRadius: '15px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3 style={{ color: 'black' }}>🏆 Recompensas</h3>
            <p>Consulta tus logros y premios.</p>
            <button
              className="btn btn-warning"
              onClick={() => navigate("/recompensas")}
              style={{
                backgroundColor: '#ffcc66',
                borderColor: '#ff9966',
                fontWeight: 'bold',
              }}
            >
              Ver
            </button>
          </div>
        </div>
      </div>

      <button
        className="btn btn-danger mt-4"
        onClick={() => navigate("/")}
        style={{
          backgroundColor: '#ff4d4d',
          borderColor: '#ff1a1a',
          fontWeight: 'bold',
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default DashboardNiño;
