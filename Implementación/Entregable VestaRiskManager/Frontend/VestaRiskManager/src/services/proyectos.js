import { URL } from "../utils/funciones";

/**
 * Obtiene la lista de todos los proyectos.
 *
 * @returns {Promise<JSON>} - Una promesa que resuelve en un objeto JSON con la lista de proyectos. El objeto sigue el siguiente formato [{id_proyecto, nombre, descripcion, estado, fecha_inicio, fecha_fin}]
 */
export async function obtenerProyectos() {
  const respuesta = await fetch(`${URL}/proyectos`);
  const json = await respuesta.json();
  return json;
}

export async function obtenerProyectosPaginado(pagina, orden) {
  const paginaActual = pagina ? pagina : 1;
  const ordenado = orden ? orden : 1; // 1: Activos, 2: Inactivos, 3: Abandonados, 4: Finalizados
  const respuesta = await fetch(`${URL}/proyectos/${paginaActual}/${ordenado}`);
  const json = await respuesta.json();
  return json;
}
/**
 * Obtiene los datos de un participante por su nombre.
 *
 * @param {string} nombre - El nombre del participante a buscar.
 * @returns {Promise<JSON>} - Una promesa que resuelve en un objeto JSON con los datos del participante. El objeto sigue el siguiente formato [{id_usuario, nombre_usuario, email, id_perfil, nombre_perfil}]
 */
export async function obtenerParticipanteNombre(nombre) {
  const respuesta = await fetch(`${URL}/proyecto/participante/${nombre}`);
  const json = await respuesta.json();
  return json;
}

/**
 * Obtiene los datos de un proyecto por su ID.
 *
 * @param {string} id - El ID del proyecto a buscar.
 * @returns {Promise<Object>} - Una promesa que resuelve en un objeto JSON con los datos del proyecto. El objeto sigue el siguiente formato {id_proyecto, nombre, descripcion, estado, fecha_inicio, fecha_fin}
 */
export async function obtenerProyectosId(id) {
  const respuesta = await fetch(`${URL}/proyecto/${id}`);
  const json = await respuesta.json();
  return json;
}

export async function obtenerCategoriaGeneral() {
  const respuesta = await fetch(`${URL}/proyecto/categorias`);
  const json = await respuesta.json();

  return json;
}

export async function crearProyecto(formData) {
  const respuesta = await fetch(`${URL}/proyecto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const json = await respuesta.json();

  return json.creacion;
}

export async function actualizarProyecto(id, formData) {
  const respuesta = await fetch(`${URL}/proyecto/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const json = await respuesta.json();

  return json.modificacion;
}

export async function obtenerProyectosUsuarioLider(correo) {
  const respuesta = await fetch(`${URL}/proyectos/lider`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo: correo }),
  });
  const json = await respuesta.json();

  return json;
}

export async function obtenerProyectosUsuarioLiderPaginado(correo, pagina) {
  const paginaActual = pagina ? pagina : 1;
  const respuesta = await fetch(`${URL}/proyectos/lider/${paginaActual}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo: correo }),
  });
  const json = await respuesta.json();

  return json;
}

export async function obtenerProyectosUsuarioDesarrollador(correo) {
  const respuesta = await fetch(`${URL}/proyectos/desarrollador`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo: correo }),
  });
  const json = await respuesta.json();

  return json;
}

export async function obtenerProyectosUsuarioDesarrolladorPaginado(correo, pagina) {
  const paginaActual = pagina ? pagina : 1;
  const respuesta = await fetch(`${URL}/proyectos/desarrollador/${paginaActual}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo: correo }),
  });
  const json = await respuesta.json();

  return json;
}

export const obtenerIteracionActual = async (id_proyecto) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/iteracion`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};

export async function activarProyecto(id) {
  const respuesta = await fetch(`${URL}/proyecto/${id}/activo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json.modificacion;
}

export async function inactivarProyecto(id) {
  const respuesta = await fetch(`${URL}/proyecto/${id}/inactivo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json.modificacion;
}

export async function abandonarProyecto(id) {
  const respuesta = await fetch(`${URL}/proyecto/${id}/abandonado`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json.modificacion;
}

export async function finalizarProyecto(id) {
  const respuesta = await fetch(`${URL}/proyecto/${id}/finalizado`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json.modificacion;
}