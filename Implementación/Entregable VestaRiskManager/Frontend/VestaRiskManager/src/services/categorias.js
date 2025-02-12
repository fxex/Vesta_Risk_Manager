import { URL } from "../utils/URL";

export async function obtenerCategoriaId(id) {
  const respuesta = await fetch(`${URL}/categoria/${id}`);
  const json = await respuesta.json();
  return json;
}
