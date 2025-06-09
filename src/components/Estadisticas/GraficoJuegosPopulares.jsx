import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const juegosPopulares = [
  { juego: "Abecedario", usos: 120 },
  { juego: "Sopas", usos: 90 },
  { juego: "Detectives", usos: 70 },
  { juego: "Rompecabezas", usos: 50 },
];

const GraficoJuegosPopulares = () => (
  <div>
    <h3 className="text-lg font-semibold mb-2">🎮 Juegos Más Jugados</h3>
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
);

export default GraficoJuegosPopulares;
