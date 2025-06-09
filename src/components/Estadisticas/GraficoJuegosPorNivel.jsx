import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes del gráfico
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoJuegosPorNivel = ({ juegosPorNivel }) => {
  // Preparar datos
  const nombresNiveles = Object.keys(juegosPorNivel).map((nivel) => `Nivel ${nivel}`);
  const cantidadJuegos = Object.values(juegosPorNivel).map((juegos) => juegos.length);

  const data = {
    labels: nombresNiveles,
    datasets: [
      {
        label: "Cantidad de Juegos",
        data: cantidadJuegos,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Cantidad de Juegos por Nivel",
        font: { size: 18 },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <Card className="p-3 shadow my-4">
      <Bar data={data} options={options} />
    </Card>
  );
};

export default GraficoJuegosPorNivel;
