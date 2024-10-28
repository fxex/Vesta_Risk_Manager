import { URL } from "../utils/URL";

export async function obtenerProyectos() {
  const respuesta = await fetch(`${URL}/proyecto`);
  const json = await respuesta.json();
  return json;
}

export async function obtenerParticipanteNombre(nombre) {
  const respuesta = await fetch(`${URL}/proyecto`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre: nombre }),
  });
  const json = await respuesta.json();

  return json;
}

export async function obtenerProyectosId(id) {
  const respuesta = await fetch(`${URL}/proyecto/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();
  return json;
}

export async function obtenerCategoriaGeneral() {
  const respuesta = await fetch(`${URL}/proyecto/categorias`);
  const json = await respuesta.json();
  return json;
}
