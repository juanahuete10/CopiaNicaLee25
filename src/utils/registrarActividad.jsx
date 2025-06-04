// src/utils/registrarActividad.js
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../database/firebaseConfig";

export const registrarActividad = async (actividad) => {
  const user = auth.currentUser;
  if (!user) return;

  const today = new Date().toISOString().slice(0, 10); // formato: YYYY-MM-DD
  const actividadRef = doc(db, "progreso", user.uid, "actividad_diaria", today);

  try {
    const docSnap = await getDoc(actividadRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const juegos = data.juegosCompletados || [];
      if (!juegos.includes(actividad)) {
        juegos.push(actividad);
        await setDoc(actividadRef, {
          juegosCompletados: juegos,
          fecha: today
        });
      }
    } else {
      await setDoc(actividadRef, {
        juegosCompletados: [actividad],
        fecha: today
      });
    }
  } catch (error) {
    console.error("Error al registrar actividad:", error);
  }
};
