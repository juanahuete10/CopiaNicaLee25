import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import { Container, Row, Col } from 'react-bootstrap';

const EstadisticasDocente = () => {
  // Datos simulados - puedes conectarlos con Firestore luego
  const rendimientoPromedio = [
    { grupo: 'Grupo A', promedio: 80 },
    { grupo: 'Grupo B', promedio: 70 },
    { grupo: 'Grupo C', promedio: 85 },
  ];

  const progresoLectura = [
    { mes: 'Ene', avance: 20 },
    { mes: 'Feb', avance: 35 },
    { mes: 'Mar', avance: 55 },
    { mes: 'Abr', avance: 70 },
    { mes: 'May', avance: 85 },
  ];

  const asistenciaPorGrupo = [
    { grupo: 'Grupo A', asistencia: 95 },
    { grupo: 'Grupo B', asistencia: 88 },
    { grupo: 'Grupo C', asistencia: 75 },
  ];

  const tiposActividades = [
    { nombre: 'Lectura', valor: 40 },
    { nombre: 'Juegos', valor: 30 },
    { nombre: 'Evaluaciones', valor: 20 },
    { nombre: 'Otros', valor: 10 },
  ];

  const colores = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Container fluid className="my-5 px-3">
      <h3 className="text-center mb-4">📊 Estadísticas de Grupos y Estudiantes</h3>
      <Row className="gy-4">
        {/* Rendimiento promedio */}
        <Col xs={12} md={6}>
          <h5 className="text-center">🎯 Rendimiento Promedio por Grupo</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={rendimientoPromedio}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grupo" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="promedio" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Col>

        {/* Progreso de lectura mensual */}
        <Col xs={12} md={6}>
          <h5 className="text-center">📚 Progreso de Lectura Mensual</h5>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={progresoLectura}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="avance" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </Col>

        {/* Asistencia promedio */}
        <Col xs={12} md={6}>
          <h5 className="text-center">🧑‍🏫 Asistencia Promedio por Grupo</h5>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={asistenciaPorGrupo}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grupo" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="asistencia" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </Col>

        {/* Tipos de actividades más asignadas */}
        <Col xs={12} md={6}>
          <h5 className="text-center">📌 Distribución de Actividades Asignadas</h5>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={tiposActividades}
                dataKey="valor"
                nameKey="nombre"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {tiposActividades.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colores[index % colores.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default EstadisticasDocente;
