import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./database/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import InicioNicaLee from "./views/InicioNicaLee";
import Encabezado from "./components/Encabezado";
import Login from './components/Login';
import Registro from "./components/Registro";
import EstudianteFormularios from "./components/Formularios/EstudianteFormularios";
import EstudianteDashboard from "./components/Formularios/EstudianteDashboard";
import DashboardDocente from "./components/Docente/DashboardDocente";
import FormularioDocente from "./components/Docente/FormularioDocente";
import CrearGrupo from "./components/Docente/CrearGrupo";
import MisGrupos from "./components/Docente/MisGrupos";
import PerfilDocente from "./components/Docente/PerfilDocente";
import LandingPage from "./views/LandingPage";

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
          <Route path="/estudianteformularios" element={<ProtectedRoute><EstudianteFormularios /></ProtectedRoute>} />
          <Route path="/estudiantedashboard" element={<EstudianteDashboard />} />
          <Route path="/dashboarddocente" element={<DashboardDocente />} />
          <Route path="/formulariodocente" element={<FormularioDocente />} />
          <Route path="/creargrupo" element={<CrearGrupo />} />
          <Route path="/misgrupos" element={<MisGrupos />} />
          <Route path="/perfildocente" element={<PerfilDocente />} />
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
