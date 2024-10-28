export async function obtenerProyectos() {
  const respuesta = await fetch("http://localhost/Vesta/proyecto");
  const json = await respuesta.json();
  return json;
}

export async function obtenerParticipanteNombre(nombre) {
  const respuesta = await fetch("http://localhost/Vesta/proyecto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nombre: nombre }),
  });
  const json = await respuesta.json();

  return json;
}

export async function obtenerCategoriaGeneral() {
  const respuesta = await fetch("http://localhost/Vesta/proyecto/categorias");
  const json = await respuesta.json();
  return json;
}
