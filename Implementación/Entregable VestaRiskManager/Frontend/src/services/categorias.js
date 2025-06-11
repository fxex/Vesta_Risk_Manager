import { URL } from "../utils/funciones";

export async function obtenerCategorias(pagina) {
  let paginaUsada = pagina ? pagina : 1;
  const respuesta = await fetch(`${URL}/categoria/generales/${paginaUsada}`);
  const json = await respuesta.json();
  return json;
}

export async function obtenerCategoriaId(id) {
  const respuesta = await fetch(`${URL}/categoria/${id}`);
  const json = await respuesta.json();
  return json;
}

export const crearCategoria = async (data) => {
  const respuesta = await fetch(`${URL}/categoria`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await respuesta.json();

  return json;
};

export const actualizarCategoria = async (id_categoria, data) => {
  const respuesta = await fetch(`${URL}/categoria/${id_categoria}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await respuesta.json();

  return json;
};

export const eliminarCategoria = async (id_categoria) => {
  const respuesta = await fetch(
    `${URL}/categoria/${id_categoria}/eliminar`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      }
    }
  );
  const json = await respuesta.json();

  return json;
};

export async function obtenerCategoriaNombre(nombre) {

  const respuesta = await fetch(`${URL}/categoria/comprobar/${nombre}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
}