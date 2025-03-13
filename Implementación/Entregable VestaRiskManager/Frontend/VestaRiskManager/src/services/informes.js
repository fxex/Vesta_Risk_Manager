import { URL } from "../utils/URL";

export const obtenerIncidenciaId = async (id_incidencia) => {
    const respuesta = await fetch(`${URL}/incidencia/${id_incidencia}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await respuesta.json();
  
    return json;
  };