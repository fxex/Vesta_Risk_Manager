export const crearIncidencia = async (id_proyecto, data) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/incidencia`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await respuesta.json();

  return json.creacion;
};

export const obtenerIncidenciasProyecto = async (id_proyecto) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/incidencias`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};