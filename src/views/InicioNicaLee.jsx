import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../src/styles.css";
import LogoNicaLee from "../assets/LogoNicaLee.png";
import bookIcon from "../assets/book-icon.png";
import starsIcon from "../assets/stars-icon.png";
import ModalInstalacionIOS from "../components/Inicio/ModalInstalacionIOS";

const InicioNicaLee = () => {
  const navigate = useNavigate();

  // 📌 Estados para la PWA
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [showModalInstrucciones, setShowModalInstrucciones] = useState(false); // Estado para el modal

  // Estado para detectar el tipo de dispositivo
  const [isDispositivoIOS, setIsDispositivoIOS] = useState(false);

  // 🎯 Detectar evento beforeinstallprompt
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    // Detectar si el dispositivo es iOS
    const userAgent = navigator.userAgent.toLowerCase();
    setIsDispositivoIOS(userAgent.includes("iphone") || userAgent.includes("ipod") || userAgent.includes("ipad"));

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // 🚀 Función para lanzar el prompt de instalación
  const instalarPWA = async () => {
    if (!deferredPrompt) return;

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(outcome === "accepted" ? "✅ Instalación aceptada" : "❌ Instalación rechazada");
    } catch (error) {
      console.error("Error al intentar instalar la PWA:", error);
    } finally {
      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  // 📄 Función para abrir el modal de instrucciones
  const abrirModalInstrucciones = () => setShowModalInstrucciones(true);

  // ❌ Función para cerrar el modal de instrucciones
  const cerrarModalInstrucciones = () => setShowModalInstrucciones(false);

  return (
    <div
      className="welcome-container d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(to bottom right, #b3e5fc, #ffffff)",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          maxWidth: "500px",
          width: "100%",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className="text-center mb-3">
          <img
            src={LogoNicaLee}
            alt="Logo Nica Lee"
            style={{ width: "180px", marginBottom: "15px" }}
          />
        </div>

        <h1 className="fw-bold mb-2 text-primary">Bienvenido a Nica Lee</h1>
        <p className="lead mb-4 text-secondary">
          Una plataforma educativa para mejorar la comprensión lectora en niños.
        </p>

        <div className="d-grid gap-3">
          <button className="btn btn-primary btn-lg rounded-pill" onClick={() => navigate("/registro")}>
            🚀 Registrarse
          </button>
          <button className="btn btn-outline-primary btn-lg rounded-pill" onClick={() => navigate("/login")}>
            🔐 Iniciar Sesión
          </button>

          {/* Mostrar el botón de instalación solo en dispositivos compatibles */}
          {showInstallButton && !isDispositivoIOS && (
            <div className="my-4">
              <button className="btn btn-success btn-lg rounded-pill" onClick={instalarPWA}>
                📲 Instalar App
              </button>
            </div>
          )}

          {/* Mostrar el botón de instrucciones solo en dispositivos iOS */}
          {isDispositivoIOS && (
            <div className="text-center my-4">
              <button className="btn btn-info btn-lg rounded-pill" onClick={abrirModalInstrucciones}>
                Cómo instalar NicaLee en iPhone <i className="bi-phone"></i>
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 d-flex justify-content-center gap-4">
          <img src={bookIcon} alt="Libro" style={{ width: "50px" }} />
          <img src={starsIcon} alt="Estrellas" style={{ width: "50px" }} />
        </div>
      </div>

      {/* Modal de instrucciones para iOS */}
      {isDispositivoIOS && showModalInstrucciones && (
        <ModalInstalacionIOS
          mostrar={showModalInstrucciones}
          cerrar={cerrarModalInstrucciones}
        />
      )}
    </div>
  );
};

export default InicioNicaLee;
