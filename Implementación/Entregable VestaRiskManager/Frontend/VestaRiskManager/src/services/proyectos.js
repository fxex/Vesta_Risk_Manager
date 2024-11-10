import { URL } from "../utils/URL";

export async function obtenerProyectos() {
  const respuesta = await fetch(`${URL}/proyectos`);
  const json = await respuesta.json();
  return json;
}

export async function obtenerParticipanteNombre(nombre) {
  const respuesta = await fetch(`${URL}/proyecto/participante/${nombre}`);
  const json = await respuesta.json();
  return json;
}

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

  return json;
}

export async function actualizarProyecto(id, formData) {
  const respuesta = await fetch(`${URL}/proyecto/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const json = await respuesta.text();
  console.log(json);

  return json;
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
