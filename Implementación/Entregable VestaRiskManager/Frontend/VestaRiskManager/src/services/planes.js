import { URL } from "../utils/URL";

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