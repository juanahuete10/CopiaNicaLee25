import React, { useState } from 'react';

const ejercicios = [
  { pregunta: '¿Cuál es la capital de tu país?', tipo: 'completar', respuesta: 'managua' },
  { pregunta: '¿En qué departamento se encuentra León?', tipo: 'completar', respuesta: 'león' },
  { pregunta: '¿Cuál es el volcán más alto de tu país?', tipo: 'completar', respuesta: 'san cristóbal' },
  { pregunta: '¿Qué río cruza la región central?', tipo: 'seleccion', opciones: ['río grande de matagalpa', 'río san juan', 'río coco'], respuesta: 'río grande de matagalpa' },
  { pregunta: '¿Qué océano baña la costa oeste de tu país?', tipo: 'completar', respuesta: 'pacífico' },
  { pregunta: '¿Qué animal representa a tu país?', tipo: 'seleccion', opciones: ['guardabarranco', 'quetzal', 'león'], respuesta: 'guardabarranco' },
  { pregunta: '¿Qué flor es símbolo nacional?', tipo: 'seleccion', opciones: ['sacuanjoche', 'rosa', 'lirio'], respuesta: 'sacuanjoche' },
  { pregunta: '¿Qué baile es típico de tu país?', tipo: 'seleccion', opciones: ['el güegüense', 'zumba', 'merengue'], respuesta: 'el güegüense' },
  { pregunta: '¿Cuál es una comida típica?', tipo: 'seleccion', opciones: ['gallo pinto', 'tacos', 'pizza'], respuesta: 'gallo pinto' },
  { pregunta: '¿Qué idioma se habla?', tipo: 'completar', respuesta: 'español' },
  { pregunta: '¿Cuántos departamentos tiene tu país?', tipo: 'completar', respuesta: '15' },
  { pregunta: '¿Qué moneda se usa?', tipo: 'completar', respuesta: 'córdoba' },
  { pregunta: '¿Cuál es el símbolo patrio que representa la libertad?', tipo: 'completar', respuesta: 'bandera' },
  { pregunta: '¿Qué instrumento se usa en la marimba?', tipo: 'completar', respuesta: 'baquetas' },
  { pregunta: '¿Qué celebración se hace en septiembre?', tipo: 'completar', respuesta: 'fiestas patrias' },
  { pregunta: '¿Cuál es un parque nacional importante?', tipo: 'completar', respuesta: 'masaya' },
  { pregunta: '¿Qué producto agrícola es muy exportado?', tipo: 'completar', respuesta: 'café' },
  { pregunta: '¿Qué mar baña la costa este?', tipo: 'completar', respuesta: 'caribe' },
   { pregunta: '¿En qué departamento se encuentra León?', tipo: 'completar', respuesta: 'león' },
  { pregunta: '¿Qué significa la franja blanca en la bandera?', tipo: 'completar', respuesta: 'paz' },
    { pregunta: '¿Qué lago es el más grande de tu país?', tipo: 'completar', respuesta: 'lago cocibolca' },
];

const SECCION = 5;

const ExploraTuPais = () => {
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [acertado, setAcertado] = useState(false);
  const [mostrarContinuar, setMostrarContinuar] = useState(false);
  const [seccionActual, setSeccionActual] = useState(1);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState('');

  const actual = ejercicios[indice];

  const handleVerificar = () => {
    if (actual.tipo === 'completar') {
      if (respuesta.trim().toLowerCase() === actual.respuesta) {
        setMensaje('¡Correcto! 🎉');
        setAcertado(true);
      } else {
        setMensaje('Incorrecto. Intenta de nuevo.');
      }
    } else if (actual.tipo === 'seleccion') {
      if (respuestaSeleccionada.trim().toLowerCase() === actual.respuesta) {
        setMensaje('¡Correcto! 🎉');
        setAcertado(true);
      } else {
        setMensaje('Incorrecto. Intenta de nuevo.');
      }
    }
  };

  const siguiente = () => {
    const nuevoIndice = indice + 1;
    if (nuevoIndice < ejercicios.length) {
      if (nuevoIndice % SECCION === 0) {
        setMostrarContinuar(true);
      } else {
        setIndice(nuevoIndice);
        setRespuesta('');
        setRespuestaSeleccionada('');
        setMensaje('');
        setAcertado(false);
      }
    } else {
      setMensaje('¡Has completado todos los ejercicios!');
    }
  };

  const continuarSeccion = () => {
    setMostrarContinuar(false);
    setSeccionActual(seccionActual + 1);
    setIndice(indice + 1);
    setRespuesta('');
    setRespuestaSeleccionada('');
    setMensaje('');
    setAcertado(false);
  };

  const saltar = () => {
    siguiente(); // como si acertó
    setMensaje('');
    setRespuesta('');
    setRespuestaSeleccionada('');
    setAcertado(false);
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '700px', margin: 'auto', textAlign: 'center' }}>
      <h3 style={{ fontSize: '1.8rem' }}>📌 Explora tu País</h3>
      <p><strong>Sección {seccionActual} — Ejercicio {indice + 1} de {ejercicios.length}</strong></p>
      <p style={{ fontSize: '1.2rem' }}>{actual.pregunta}</p>

      {actual.tipo === 'completar' && (
        <input
          type="text"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          placeholder="Escribe tu respuesta"
          style={{ padding: '0.5rem', fontSize: '1rem', width: '80%', maxWidth: '400px' }}
        />
      )}

      {actual.tipo === 'seleccion' && (
        <select
          value={respuestaSeleccionada}
          onChange={(e) => setRespuestaSeleccionada(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem', width: '80%', maxWidth: '400px' }}
        >
          <option value="">Selecciona una opción</option>
          {actual.opciones.map((opcion, index) => (
            <option key={index} value={opcion.toLowerCase()}>
              {opcion}
            </option>
          ))}
        </select>
      )}

      <div style={{ marginTop: '1rem' }}>
        {!acertado && !mostrarContinuar && (
          <>
            <button onClick={handleVerificar} style={{ padding: '0.5rem 1rem', marginRight: '10px' }}>
              Verificar
            </button>
            <button onClick={saltar} style={{ padding: '0.5rem 1rem' }}>
              Realizar luego
            </button>
          </>
        )}

        {acertado && !mostrarContinuar && (
          <button onClick={siguiente} style={{ padding: '0.5rem 1rem' }}>
            Siguiente
          </button>
        )}

        {mostrarContinuar && (
          <button onClick={continuarSeccion} style={{ padding: '0.7rem 1.2rem', background: '#4caf50', color: 'white' }}>
            ✅ Continuar jugando
          </button>
        )}
      </div>

      <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{mensaje}</p>
    </div>
  );
};

export default ExploraTuPais;
