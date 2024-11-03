import { URL } from "../utils/URL";

export async function obtenerUsuarios() {
  const respuesta = await fetch(`${URL}/usuarios`);
  const json = await respuesta.json();
  return json;
}

export async function obtenerUsuariosCorreo(correo) {
  const respuesta = await fetch(`${URL}/usuario/${correo}`);
  const json = await respuesta.json();
  return json;
}

export async function obtenerUsuariosId(id) {
  const respuesta = await fetch(`${URL}/usuario/${id}`);
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
  const respuesta = await fetch(`${URL}/usuario`, {
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
  const respuesta = await fetch(`${URL}/usuario/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const json = await respuesta.json();

  return json;
}

export async function eliminarUsuario(id) {
  const respuesta = await fetch(`${URL}/usuario/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
}

export async function obtenerPerfiles() {
  const respuesta = await fetch(`${URL}/perfiles`);
  const json = await respuesta.json();
  return json;
}

export async function obtenerPermisos() {
  const respuesta = await fetch(`${URL}/permisos`);
  const json = await respuesta.json();
  return json;
}

export async function crearPerfil(formData) {
  const respuesta = await fetch(`${URL}/perfil`, {
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
  const respuesta = await fetch(`${URL}/perfil/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const json = await respuesta.json();

  return json;
}

export async function eliminarPerfil(id) {
  const respuesta = await fetch(`${URL}/perfil/${id}`, {
    method: "DELETE",
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
