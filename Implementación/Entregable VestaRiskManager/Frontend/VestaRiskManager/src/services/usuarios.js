import { URL } from "../utils/URL";

export async function obtenerUsuarios() {
  const respuesta = await fetch(`${URL}/usuario`);
  const json = await respuesta.json();
  return json;
}

export async function obtenerUsuariosCorreo(correo) {
  const respuesta = await fetch(`${URL}/usuario`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correo: correo }),
  });
  const json = await respuesta.json();

  return json;
}

export async function obtenerUsuariosId(id) {
  const respuesta = await fetch(`${URL}/usuario/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();
  return json;
}

export async function obtenerUsuarioNombre(nombre) {
  const respuesta = await fetch(`${URL}/usuario/comprobar/${nombre}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
}

export async function crearUsuario(formData) {
  const respuesta = await fetch(`${URL}/usuario/crear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const json = await respuesta.json();

  return json;
}

export async function actualizarUsuario(id, formData) {
  const respuesta = await fetch(`${URL}/usuario/modificar/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const json = await respuesta.json();

  return json;
}

export async function eliminarUsuario(id) {
  const respuesta = await fetch(`${URL}/usuario/eliminar/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
}

export async function obtenerPerfiles() {
  const respuesta = await fetch(`${URL}/perfil`);
  const json = await respuesta.json();
  return json;
}

export async function obtenerPermisos() {
  const respuesta = await fetch(`${URL}/permiso`);
  const json = await respuesta.json();
  return json;
}

export async function crearPerfil(formData) {
  const respuesta = await fetch(`${URL}/perfil/crear`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const json = await respuesta.json();

  return json;
}

export async function obtenerPerfilId(id) {
  const respuesta = await fetch(`${URL}/perfil/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();
  return json;
}

export async function actualizarPerfil(id, formData) {
  const respuesta = await fetch(`${URL}/perfil/modificar/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const json = await respuesta.json();

  return json;
}

export async function eliminarPerfil(id) {
  const respuesta = await fetch(`${URL}/perfil/eliminar/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
}

export async function obtenerPerfilNombre(nombre) {
  const respuesta = await fetch(`${URL}/perfil/comprobar/${nombre}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();
  return json;
}
