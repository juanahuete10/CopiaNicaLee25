import React from 'react';
import { useLocation } from 'react-router-dom';
import Recompensas from "../JuegosInteractivos/Recompensas";
import Biblioteca from "../Lecciones/Biblioteca";

const DashboardPFamilia = () => {
  const location = useLocation();
  const padre = location.state?.padreFamilia;

  return (
    <div className="container mt-4">
      <h2>¡Bienvenido, {padre?.nombre}!</h2>

      <section>
        <h4>📈 Progreso de tus hijos</h4>
        {/* Aquí iría un componente ProgresoHijos */}
        <p>(Aquí podrías ver cuántas lecciones y juegos han completado tus hijos)</p>
      </section>

      <section>
        <h4>📚 Biblioteca</h4>
        <Biblioteca />
      </section>

      <section>
        <h4>🏆 Recompensas</h4>
        <Recompensas />
      </section>

      <section>
        <h4>👨‍👩‍👧 Hijos Registrados</h4>
        <p>Nombre, grado y edad de los hijos registrados</p>
        {/* Aquí puedes conectar con Firestore para traer datos de hijos */}
      </section>
    </div>
  );
};

export default DashboardPFamilia;