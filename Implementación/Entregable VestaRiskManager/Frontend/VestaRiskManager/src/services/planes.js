import { URL } from "../utils/funciones";

export const completarTarea = async (id_tarea) => {
  const respuesta = await fetch(
    `${URL}/tarea/${id_tarea}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await respuesta.json();

  return json;
};

export const obtenerDatosTareasInforme = async (id_proyecto) => {
  const respuesta = await fetch(
    `${URL}/proyecto/${id_proyecto}/tareas/informe`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await respuesta.json();

  return json;
};
