import React, { useState, useEffect } from 'react';

const figurasDisponibles = [
  { id: 'triangulo', nombre: 'Triángulo', color: 'red', forma: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
  { id: 'cuadrado', nombre: 'Cuadrado', color: 'blue', forma: '0%' },
  { id: 'circulo', nombre: 'Círculo', color: 'green', forma: '50%' },
  { id: 'rectangulo', nombre: 'Rectángulo', color: 'orange', forma: '0%' },
  { id: 'rombo', nombre: 'Rombo', color: 'purple', forma: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
  { id: 'trapecio', nombre: 'Trapecio', color: 'brown', forma: 'polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)' },
  { id: 'pentagono', nombre: 'Pentágono', color: 'teal', forma: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' },
  { id: 'hexagono', nombre: 'Hexágono', color: 'darkblue', forma: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' },
];

const RompecabezasGeometria = () => {
  const [figurasRestantes, setFigurasRestantes] = useState([]);
  const [figuraCorrecta, setFiguraCorrecta] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [completado, setCompletado] = useState(false);
  const [mostrarVistaPrevia, setMostrarVistaPrevia] = useState(true);

  useEffect(() => {
    // Mostrar vista previa por 5 segundos
    setTimeout(() => {
      const mezcladas = [...figurasDisponibles].sort(() => 0.5 - Math.random());
      setFigurasRestantes(mezcladas);
      setFiguraCorrecta(mezcladas[0]);
      setMostrarVistaPrevia(false);
    }, 5000);
  }, []);

  const handleDrop = (e) => {
    const figuraSoltada = e.dataTransfer.getData('text/plain');
    if (figuraSoltada === figuraCorrecta.id) {
      setMensaje('¡Figura completada correctamente! 🎉');
      setCompletado(true);

      setTimeout(() => {
        const nuevasFiguras = figurasRestantes.slice(1);
        if (nuevasFiguras.length === 0) {
          setMensaje('¡Has completado todas las figuras! 🏆');
          setFiguraCorrecta(null);
        } else {
          setFigurasRestantes(nuevasFiguras);
          setFiguraCorrecta(nuevasFiguras[0]);
          setMensaje('');
        }
        setCompletado(false);
      }, 1500);
    } else {
      setMensaje('Esa no es la figura correcta. Intenta de nuevo.');
    }
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h3>Rompecabezas de Geometría</h3>

      {mostrarVistaPrevia ? (
        <>
          <p>Memoriza las siguientes figuras:</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px' }}>
            {figurasDisponibles.map((figura) => (
              <div key={figura.id} style={{
                width: '80px',
                height: '80px',
                backgroundColor: figura.color,
                clipPath: figura.forma,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold'
              }}>
                {figura.nombre}
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {figuraCorrecta ? (
            <p><strong>¿Dónde está la figura <span style={{ color: 'blue' }}>{figuraCorrecta.nombre}</span>?</strong></p>
          ) : (
            <p>¡Actividad finalizada! 🎊</p>
          )}

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '30px',
          }}>
            {figurasRestantes.map((figura) => (
              <div
                key={figura.id}
                draggable
                onDragStart={(e) => handleDragStart(e, figura.id)}
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: figura.color,
                  clipPath: figura.forma,
                  cursor: 'grab',
                }}
              />
            ))}
          </div>

          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            style={{
              width: '220px',
              height: '220px',
              margin: 'auto',
              border: '3px dashed gray',
              borderRadius: '10px',
              lineHeight: '220px',
              fontSize: '18px',
              color: completado ? 'green' : 'gray',
              backgroundColor: completado ? '#e0ffe0' : '#f9f9f9',
            }}
          >
            {completado ? '✔️ Completado' : 'Suelta aquí'}
          </div>

          <p style={{
            marginTop: '20px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: mensaje.includes('correcta') || mensaje.includes('completado') ? 'green' : 'red',
          }}>
            {mensaje}
          </p>
        </>
      )}
    </div>
  );
};

export default RompecabezasGeometria;
