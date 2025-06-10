import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, ResponsiveContainer
} from "recharts";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const EstadisticaN = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const docRef = doc(db, "estadisticasDocente", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData(docSnap.data());
        } else {
          console.log("No hay datos para este docente.");
        }
      } catch (error) {
        console.error("Error al cargar estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center">Cargando estadísticas...</p>;
  if (!data) return <p className="text-center">No hay datos estadísticos aún.</p>;

  return (
    <div className="p-4 grid gap-8">
      {/* 1. Tiempo promedio de juego por nivel */}
      <div>
        <h3 className="text-xl font-bold mb-2">⏱️ Tiempo Promedio de Juego por Nivel</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.tiempoPorNivel} layout="vertical" margin={{ left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
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
          <BarChart data={data.juegosPopulares}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="juego" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="usos" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Avance promedio por usuario por nivel */}
      <div>
        <h3 className="text-xl font-bold mb-2">📈 Avance Promedio por Usuario por Nivel</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data.avanceUsuarios}>
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
          <LineChart data={data.comprensionMensual}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis unit="%" />
            <Tooltip />
            <Line type="monotone" dataKey="comprension" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 5. Juegos por nivel */}
      <div>
        <h3 className="text-xl font-bold mb-2">🎯 Cantidad de Juegos por Nivel</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data.juegosPorNivel}>
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
