import React, { useState, useEffect } from "react";
import { Document, Page } from 'react-pdf';
import Turn from 'turn.js';
import { storage } from '../firebase';  // Asumiendo que has configurado Firebase

const CuentosAnimados = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  
  useEffect(() => {
    // Cargar el PDF desde Firebase Storage
    const loadPdf = async () => {
      const url = await storage.ref('cuentos/mi_cuento.pdf').getDownloadURL();
      setPdfFile(url);
    };
    loadPdf();
  }, []);

  const onLoadSuccess = ({ numPages }) => setNumPages(numPages);

  return (
    <div className="cuento-container">
      <h2>Mi Cuento Animado</h2>
      <div id="flipbook" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Document
          file={pdfFile}
          onLoadSuccess={onLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={index} pageNumber={index + 1} />
          ))}
        </Document>
      </div>
    </div>
  );
};

export default CuentosAnimados;
