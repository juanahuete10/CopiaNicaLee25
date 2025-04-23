import React, { useState, useEffect } from 'react';
import { storage } from '../firebase';

const ListaDeCuentos = () => {
  const [cuentos, setCuentos] = useState([]);
  
  useEffect(() => {
    // Obtener lista de los PDFs desde Firebase Storage
    const loadCuentos = async () => {
      const listRef = storage.ref('cuentos'); // Carpeta donde están los PDFs
      const res = await listRef.listAll();
      const urls = await Promise.all(
        res.items.map(async (item) => {
          const url = await item.getDownloadURL();
          return { name: item.name, url };
        })
      );
      setCuentos(urls);
    };
    loadCuentos();
  }, []);

  return (
    <div className="listado-cuentes">
      <h2>Cuentos Disponibles</h2>
      <ul>
        {cuentos.map((cuento, index) => (
          <li key={index}>
            <a href={cuento.url} target="_blank" rel="noopener noreferrer">
              {cuento.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaDeCuentos;
