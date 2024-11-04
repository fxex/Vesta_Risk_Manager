import { URL } from "../utils/URL";

export const obtenerRiesgosProyecto = async (id_proyecto) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/riesgos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();
  return json;
};

export const crearRiesgo = async (id_proyecto, data) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/riesgo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await respuesta.json();

  return json;
};
