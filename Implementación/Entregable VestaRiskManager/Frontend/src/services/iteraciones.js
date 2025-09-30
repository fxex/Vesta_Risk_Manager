import { URL } from "../utils/funciones";

export async function obtenerIteracionesPaginada(id_proyecto, pagina) {
  const paginaActual = pagina ? pagina : 1;
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/iteraciones/${paginaActual}`);
  const json = await respuesta.json();
  
  return json;
}

export const crearIteracion = async (id_proyecto, data) => {
  const respuesta = await fetch(
    `${URL}/proyecto/${id_proyecto}/iteraciones`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const json = await respuesta.json();  

  return json;
};

export const actualizarIteracion = async (id_proyecto, data) => {
  const respuesta = await fetch(
    `${URL}/proyecto/${id_proyecto}/iteraciones`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const json = await respuesta.json();  

  return json;
};
