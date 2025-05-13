import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./database/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import InicioNicaLee from "./views/InicioNicaLee";
import Encabezado from "./components/Encabezado";
import Login from './components/Login';
import Registro from "./components/Registro";
import EstudianteFormularios from "./components/Formularios/EstudianteFormularios";
import DashboardDocente from "./components/Docente/DashboardDocente";
import FormularioDocente from "./components/Docente/FormularioDocente";
import CrearGrupo from "./components/Docente/CrearGrupo";
import MisGrupos from "./components/Docente/MisGrupos";
import PerfilDocente from "./components/Docente/PerfilDocente";
import LandingPage from "./views/LandingPage";
import DashboardNiño from "./components/Formularios/DashboardNiño";
import LeccionMatch from "./components/Lecciones/LeccionMatch";
import Lecciones from "./components/Lecciones/Lecciones";
import Juegos from "./components/Lecciones/Juegos"
import Biblioteca from "./components/Lecciones/Biblioteca";
import LeccionFill from "./components/Lecciones/LeccionFill";
import DashboardAdmin from "./components/Administrador/DashboardAdmin";
import CrearAdmin from "./components/Administrador/CrearAdmin";
import ListaDocentes from "./components/Administrador/ListaDocentes";
import Recompensas from "./components/JuegosInteractivos/Recompensas";
import Racha from "./components/Formularios/Racha";
 
function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="App">
      {!isLandingPage && <Encabezado />}
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/inicionicalee" element={<InicioNicaLee />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboarddocente" element={<DashboardDocente />} />
          <Route path="/formulariodocente" element={<FormularioDocente />} />
          <Route path="/creargrupo" element={<CrearGrupo />} />
          <Route path="/misgrupos" element={<MisGrupos />} />
          <Route path="/perfildocente" element={<PerfilDocente />} />
           <Route path="/estudianteformularios" element={<EstudianteFormularios/>} />
          <Route path="/dashboardnino" element={<DashboardNiño />} />
          <Route path="/lecciones" element={<Lecciones />} />
          <Route path="/leccionmatch" element={<LeccionMatch />} />
          <Route path="/juegos" element={<Juegos />} />
          <Route path="/biblioteca" element={<Biblioteca />} />
          <Route path="/leccionfill" element={<LeccionFill />} />
          <Route path="/dashboardadmin" element={<DashboardAdmin />} />
          <Route path="/crearadmin" element={<CrearAdmin />} />
          <Route path="/listadocentes" element={<ListaDocentes />} />
          <Route path="/listaestudiantes" element={<ListaDocentes />} />
          <Route path="/recompensas" element={<Recompensas />} />
           <Route path="/racha" element={<Racha />} />

          
        </Routes>
      </main>
    </div>
  );
}

function App() {
  useEffect(() => {
    // Código Hotjar
    (function (h, o, t, j, a, r) {
      h.hj =
        h.hj ||
        function () {
          (h.hj.q = h.hj.q || []).push(arguments);
        };
      h._hjSettings = { hjid: 5363747, hjsv: 6 };
      a = o.getElementsByTagName("head")[0];
      r = o.createElement("script");
      r.async = 1;
      r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
      a.appendChild(r);
    })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
  }, []);

  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
