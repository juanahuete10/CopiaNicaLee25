import React, { useState } from 'react';

const ejercicios = [
  { pregunta: '¿En qué continente se encuentra Brasil?', respuesta: 'américa del sur' },
  { pregunta: '¿En qué continente se encuentra Argentina?', respuesta: 'américa del sur' },
  { pregunta: '¿En qué continente se encuentra Perú?', respuesta: 'américa del sur' },
  { pregunta: '¿En qué continente se encuentra Francia?', respuesta: 'europa' },
  { pregunta: '¿En qué continente se encuentra Alemania?', respuesta: 'europa' },
  { pregunta: '¿En qué continente se encuentra Italia?', respuesta: 'europa' },
  { pregunta: '¿En qué continente se encuentra Canadá?', respuesta: 'américa del norte' },
  { pregunta: '¿En qué continente se encuentra Estados Unidos?', respuesta: 'américa del norte' },
  { pregunta: '¿En qué continente se encuentra México?', respuesta: 'américa del norte' },
  { pregunta: '¿En qué continente se encuentra China?', respuesta: 'asia' },
  { pregunta: '¿En qué continente se encuentra Japón?', respuesta: 'asia' },
  { pregunta: '¿En qué continente se encuentra India?', respuesta: 'asia' },
  { pregunta: '¿En qué continente se encuentra Egipto?', respuesta: 'áfrica' },
  { pregunta: '¿En qué continente se encuentra Nigeria?', respuesta: 'áfrica' },
  { pregunta: '¿En qué continente se encuentra Sudáfrica?', respuesta: 'áfrica' },
  { pregunta: '¿En qué continente se encuentra Australia?', respuesta: 'oceanía' },
  { pregunta: '¿En qué continente se encuentra Nueva Zelanda?', respuesta: 'oceanía' },
  { pregunta: '¿En qué continente se encuentra Papúa Nueva Guinea?', respuesta: 'oceanía' },
  { pregunta: '¿En qué continente se encuentra Rusia?', respuesta: 'asia' },
  { pregunta: '¿En qué continente se encuentra Marruecos?', respuesta: 'áfrica' },
];

const opcionesContinentales = ['américa del sur', 'américa del norte', 'europa', 'asia', 'áfrica', 'oceanía'];

const TriviaGeografica = () => {
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [acertado, setAcertado] = useState(false);
  const [modo, setModo] = useState('seleccion'); // 'seleccion', 'completar', 'escribir'
  const [saltados, setSaltados] = useState([]);

  const actual = ejercicios[indice];

  const handleVerificar = () => {
    if (respuesta.trim().toLowerCase() === actual.respuesta) {
      setMensaje('¡Correcto! 🎉');
      setAcertado(true);
    } else {
      setMensaje('Incorrecto. Intenta de nuevo.');
    }
  };

  const siguiente = () => {
    if (indice < ejercicios.length - 1) {
      setIndice(indice + 1);
      setRespuesta('');
      setMensaje('');
      setAcertado(false);
    } else {
      setMensaje('¡Has completado todos los ejercicios!');
    }
  };

  const saltar = () => {
    setSaltados([...saltados, actual]);
    siguiente();
  };

  const renderInput = () => {
    if (modo === 'seleccion') {
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
          {opcionesContinentales.map((opcion) => (
            <button
              key={opcion}
              onClick={() => {
                setRespuesta(opcion);
                setTimeout(handleVerificar, 200);
              }}
              disabled={acertado}
              style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}
            >
              {opcion}
            </button>
          ))}
        </div>
      );
    }

    if (modo === 'completar') {
      const partes = actual.pregunta.split(actual.respuesta);
      return (
        <div>
          <p>{partes[0]} <input
            type="text"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            style={{ width: '150px', fontSize: '1rem' }}
          /> {partes[1] || '?'}</p>
          {!acertado && (
            <button onClick={handleVerificar} style={{ padding: '0.5rem 1rem' }}>
              Verificar
            </button>
          )}
        </div>
      );
    }

    return (
      <>
        <input
          type="text"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          placeholder="Escribe tu respuesta"
          style={{ padding: '0.5rem', fontSize: '1rem', width: '80%', maxWidth: '400px' }}
        />
        <div style={{ marginTop: '1rem' }}>
          {!acertado && (
            <button onClick={handleVerificar} style={{ padding: '0.5rem 1rem' }}>
              Verificar
            </button>
          )}
        </div>
      </>
    );
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '700px', margin: 'auto', textAlign: 'center' }}>
      <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>🌍 Trivia Geográfica</h3>
      <p><strong>Ejercicio {indice + 1} de {ejercicios.length}</strong></p>

      <p style={{ fontSize: '1.2rem' }}>{actual.pregunta}</p>

      {renderInput()}

      <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{mensaje}</p>

      {acertado && (
        <button onClick={siguiente} style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}>
          Siguiente
        </button>
      )}

      {!acertado && (
        <button onClick={saltar} style={{ padding: '0.5rem 1rem', marginTop: '1rem', marginLeft: '10px' }}>
          Realizar luego
        </button>
      )}

      <div style={{ marginTop: '2rem' }}>
        <label htmlFor="modo" style={{ fontWeight: 'bold' }}>Modo de respuesta: </label>
        <select
          id="modo"
          value={modo}
          onChange={(e) => setModo(e.target.value)}
          style={{ marginLeft: '0.5rem', padding: '0.4rem', fontSize: '1rem' }}
        >
          <option value="seleccion">Selección</option>
          <option value="completar">Completar</option>
          <option value="escribir">Escribir</option>
        </select>
      </div>
    </div>
  );
};

export default TriviaGeografica;
