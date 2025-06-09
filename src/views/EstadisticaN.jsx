import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

const EstadisticaN = () => {
  // 1. Tiempo promedio de juego por nivel
  const tiempoPorNivel = [
    { nivel: "Nivel 1", minutos: 12 },
    { nivel: "Nivel 2", minutos: 10 },
    { nivel: "Nivel 3", minutos: 15 },
    { nivel: "Nivel 4", minutos: 8 },
    { nivel: "Nivel 5", minutos: 13 },
    { nivel: "Nivel 6", minutos: 9 },
  ];

  // 2. Juegos más jugados
  const juegosPopulares = [
    { juego: "Abecedario", usos: 120 },
    { juego: "Sopas", usos: 90 },
    { juego: "Detectives", usos: 70 },
    { juego: "Rompecabezas", usos: 50 },
  ];

  // 3. Avance promedio por usuario por nivel
  const avanceUsuarios = [
    { nivel: "Nivel 1", UsuarioA: 80, UsuarioB: 65 },
    { nivel: "Nivel 2", UsuarioA: 70, UsuarioB: 60 },
    { nivel: "Nivel 3", UsuarioA: 90, UsuarioB: 75 },
    { nivel: "Nivel 4", UsuarioA: 60, UsuarioB: 55 },
    { nivel: "Nivel 5", UsuarioA: 85, UsuarioB: 70 },
    { nivel: "Nivel 6", UsuarioA: 65, UsuarioB: 60 },
  ];

  // 4. Comprensión lectora por mes
  const comprensionMensual = [
    { mes: "Enero", comprension: 45 },
    { mes: "Febrero", comprension: 60 },
    { mes: "Marzo", comprension: 80 },
    { mes: "Abril", comprension: 75 },
  ];

  // 5. Juegos por nivel (como GraficoJuegosPorNivel.jsx)
  const juegosPorNivel = [
    { nivel: "Nivel 1", juegos: 3 },
    { nivel: "Nivel 2", juegos: 4 },
    { nivel: "Nivel 3", juegos: 5 },
    { nivel: "Nivel 4", juegos: 3 },
    { nivel: "Nivel 5", juegos: 4 },
    { nivel: "Nivel 6", juegos: 5 },
  ];

  return (
    <div className="p-4 grid gap-8">
      {/* 1. Tiempo promedio de juego */}
      <div>
        <h3 className="text-xl font-bold mb-2">⏱️ Tiempo Promedio de Juego por Nivel</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={tiempoPorNivel} layout="vertical" margin={{ left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" label={{ value: "Minutos", position: "insideBottom", offset: -5 }} />
            <YAxis type="category" dataKey="nivel" />
            <Tooltip />
            <Bar dataKey="minutos" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 2. Juegos más jugados */}
      <div>
        <h3 className="text-xl font-bold mb-2">🎮 Juegos Más Jugados</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={juegosPopulares}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="juego" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="usos" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Avance promedio por usuario */}
      <div>
        <h3 className="text-xl font-bold mb-2">📈 Avance Promedio por Usuario por Nivel</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={avanceUsuarios}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nivel" />
            <YAxis unit="%" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="UsuarioA" stroke="#8884d8" />
            <Line type="monotone" dataKey="UsuarioB" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 4. Comprensión lectora por mes */}
      <div>
        <h3 className="text-xl font-bold mb-2">📚 Comprensión Lectora por Mes</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={comprensionMensual}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis unit="%" />
            <Tooltip />
            <Line type="monotone" dataKey="comprension" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 5. Juegos por nivel (como GraficoJuegosPorNivel.jsx) */}
      <div>
        <h3 className="text-xl font-bold mb-2">🎯 Cantidad de Juegos por Nivel</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={juegosPorNivel}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nivel" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="juegos" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EstadisticaN;
