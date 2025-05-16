import { URL } from "../utils/funciones";

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


export const obtenerDatosInformeSeguimiento = async (id_proyecto) => {
    const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/riesgos/informe`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await respuesta.json();
  
    return json;
  };