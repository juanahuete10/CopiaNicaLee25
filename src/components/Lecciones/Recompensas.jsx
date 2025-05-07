import React, { useEffect, useState } from "react";
import { Card, Badge } from "react-bootstrap";
import { format, differenceInCalendarDays } from "date-fns";

const Recompensas = () => {
  const [racha, setRacha] = useState(0);
  const [ultimaFecha, setUltimaFecha] = useState(null);

  // Simula que el usuario practicó hoy
  const registrarPractica = () => {
    const hoy = new Date();
    if (ultimaFecha) {
      const diff = differenceInCalendarDays(hoy, new Date(ultimaFecha));
      if (diff === 1) {
        setRacha(racha + 1);
      } else if (diff > 1) {
        setRacha(1); // Pierde racha
      }
    } else {
      setRacha(1);
    }
    setUltimaFecha(hoy);
  };

  useEffect(() => {
    // Aquí podrías recuperar datos del backend o localStorage
    registrarPractica(); // Solo para test, en producción esto sería después de practicar
  }, []);

  return (
    <Card className="mt-4 shadow">
      <Card.Body>
        <Card.Title>🏆 Recompensas</Card.Title>
        <Card.Text>
          Racha actual de lectura:{" "}
          <Badge bg={racha >= 3 ? "success" : "warning"}>
            {racha} día{racha === 1 ? "" : "s"}
          </Badge>
        </Card.Text>
        {ultimaFecha && (
          <Card.Text>
            Última práctica: {format(new Date(ultimaFecha), "dd/MM/yyyy")}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default Recompensas;
