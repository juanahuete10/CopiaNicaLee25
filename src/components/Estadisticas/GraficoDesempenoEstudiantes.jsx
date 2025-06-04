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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const GraficoDesempenoEstudiantes = ({ estudiantes, puntajes }) => {
  const data = {
    labels: estudiantes, // nombres de estudiantes
    datasets: [
      {
        label: "Puntaje promedio",
        data: puntajes, // por ejemplo: [80, 95, 70]
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Desempeño de los Estudiantes",
        font: { size: 20 },
      },
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100, // si tus puntajes están en escala de 0 a 100
        title: {
          display: true,
          text: "Puntaje (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Estudiantes",
        },
      },
    },
  };

  return (
    <Card className="p-3 shadow">
      <Bar data={data} options={options} />
    </Card>
  );
};

export default GraficoDesempenoEstudiantes;
