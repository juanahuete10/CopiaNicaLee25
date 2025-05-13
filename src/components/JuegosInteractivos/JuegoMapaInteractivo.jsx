import React, { useState } from 'react';

const ejercicios = [
  // Sección 1: Capitales del mundo
  { pregunta: '¿Cuál es la capital de México?', opciones: ['Ciudad de México', 'Guadalajara', 'Cancún'], respuesta: 'Ciudad de México' },
  { pregunta: '¿Cuál es la capital de Francia?', opciones: ['París', 'Lyon', 'Marsella'], respuesta: 'París' },
  { pregunta: '¿Cuál es la capital de Japón?', opciones: ['Tokio', 'Osaka', 'Kioto'], respuesta: 'Tokio' },
  { pregunta: '¿Cuál es la capital de Canadá?', opciones: ['Toronto', 'Ottawa', 'Vancouver'], respuesta: 'Ottawa' },
  { pregunta: '¿Cuál es la capital de Australia?', opciones: ['Sídney', 'Canberra', 'Melbourne'], respuesta: 'Canberra' },

  // Sección 2: Capitales del mundo
  { pregunta: '¿Cuál es la capital de España?', opciones: ['Madrid', 'Barcelona', 'Sevilla'], respuesta: 'Madrid' },
  { pregunta: '¿Cuál es la capital de Alemania?', opciones: ['Múnich', 'Berlín', 'Hamburgo'], respuesta: 'Berlín' },
  { pregunta: '¿Cuál es la capital de Italia?', opciones: ['Roma', 'Milán', 'Venecia'], respuesta: 'Roma' },
  { pregunta: '¿Cuál es la capital de China?', opciones: ['Shanghái', 'Beijing', 'Cantón'], respuesta: 'Beijing' },
  { pregunta: '¿Cuál es la capital de Egipto?', opciones: ['El Cairo', 'Alejandría', 'Giza'], respuesta: 'El Cairo' },

  // Sección 3: Geografía de Nicaragua
  { pregunta: '¿Cuál es la capital de Nicaragua?', opciones: ['León', 'Managua', 'Granada'], respuesta: 'Managua' },
  { pregunta: '¿Cuál es la capital de Estelí?', opciones: ['Estelí', 'Condega', 'Pueblo Nuevo'], respuesta: 'Estelí' },
  { pregunta: '¿Estelí es un departamento?', opciones: ['Verdadero', 'Falso'], respuesta: 'Verdadero' },
  { pregunta: '¿Rivas es un municipio?', opciones: ['Sí', 'No'], respuesta: 'Sí' },
  { pregunta: '¿Cuántos departamentos tiene Nicaragua?', opciones: ['15', '17', '19'], respuesta: '15' },

  // Sección 4: Geografía de Nicaragua
  { pregunta: '¿Cuál de los siguientes es un departamento?', opciones: ['Masaya', 'La Conquista', 'Diriá'], respuesta: 'Masaya' },
  { pregunta: '¿Cuál de estos es un municipio?', opciones: ['Nandaime', 'Boaco', 'Chontales'], respuesta: 'Nandaime' },
  { pregunta: '¿La Pitahaya es un departamento?', opciones: ['Falso', 'Verdadero'], respuesta: 'Falso' },
  { pregunta: '¿Qué ciudad es la capital de Chinandega?', opciones: ['Chinandega', 'El Viejo', 'Corinto'], respuesta: 'Chinandega' },
  { pregunta: '¿Cuál es la capital de Matagalpa?', opciones: ['Matagalpa', 'Waslala', 'Río Blanco'], respuesta: 'Matagalpa' },

  // Sección 5: Mixto
  { pregunta: '¿Cuál es la capital de Argentina?', opciones: ['Buenos Aires', 'Córdoba', 'Rosario'], respuesta: 'Buenos Aires' },
  { pregunta: '¿Cuál es la capital de Brasil?', opciones: ['Río de Janeiro', 'Brasilia', 'São Paulo'], respuesta: 'Brasilia' },
  { pregunta: '¿Cuál es la capital de Estados Unidos?', opciones: ['Washington D.C.', 'Nueva York', 'Los Ángeles'], respuesta: 'Washington D.C.' },
  { pregunta: '¿Cuál es la capital de Colombia?', opciones: ['Bogotá', 'Medellín', 'Cali'], respuesta: 'Bogotá' },
  { pregunta: '¿Cuál es la capital de Perú?', opciones: ['Lima', 'Cusco', 'Arequipa'], respuesta: 'Lima' },
];

const JuegoMapaInteractivo = () => {
  const [indice, setIndice] = useState(0);
  const [respuestaUsuario, setRespuestaUsuario] = useState('');
  const [acertado, setAcertado] = useState(false);

  const ejercicioActual = ejercicios[indice];

  const manejarSeleccion = (opcion) => {
    if (opcion === ejercicioActual.respuesta) {
      setRespuestaUsuario('¡Correcto! 🎉');
      setAcertado(true);
    } else {
      setRespuestaUsuario('Incorrecto. Intenta de nuevo.');
    }
  };

  const siguiente = () => {
    if (indice < ejercicios.length - 1) {
      setIndice(indice + 1);
      setRespuestaUsuario('');
      setAcertado(false);
    } else {
      setRespuestaUsuario('¡Has completado todos los ejercicios!');
    }
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '700px', margin: 'auto' }}>
      <h3>Juego Interactivo de Geografía</h3>
      <p><strong>Ejercicio {indice + 1} de {ejercicios.length}</strong></p>
      <p>{ejercicioActual.pregunta}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {ejercicioActual.opciones.map((opcion) => (
          <button
            key={opcion}
            onClick={() => manejarSeleccion(opcion)}
            disabled={acertado}
          >
            {opcion}
          </button>
        ))}
      </div>
      <p style={{ marginTop: '10px' }}>{respuestaUsuario}</p>
      {acertado && (
        <button onClick={siguiente} style={{ marginTop: '10px' }}>
          Siguiente
        </button>
      )}
    </div>
  );
};

export default JuegoMapaInteractivo;