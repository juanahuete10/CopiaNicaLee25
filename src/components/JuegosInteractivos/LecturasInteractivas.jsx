import React from 'react';
import { Accordion } from 'react-bootstrap';

const lecturas = [
  {
    titulo: 'El Pez Valiente',
    contenido: 'Había una vez un pez que no temía a nada. Viajó por todo el mar ayudando a otros animales. Todos lo llamaban el Pez Valiente.'
  },
  {
    titulo: 'La Gallina Creativa',
    contenido: 'Una gallina muy creativa pintaba huevos de colores. Cada uno tenía una historia diferente que compartía con los pollitos.'
  }
];

export default function LecturasInteractivas() {
  return (
    <div>
      <h5>Lecturas Interactivas</h5>
      <Accordion>
        {lecturas.map((lectura, idx) => (
          <Accordion.Item eventKey={idx.toString()} key={idx}>
            <Accordion.Header>{lectura.titulo}</Accordion.Header>
            <Accordion.Body>{lectura.contenido}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}
