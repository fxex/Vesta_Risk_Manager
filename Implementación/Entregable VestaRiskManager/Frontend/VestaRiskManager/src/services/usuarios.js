export async function obtenerUsuarios() {
  const respuesta = await fetch("http://localhost/Vesta/usuario");
  const json = await respuesta.json();
  return json;
}

export async function obtenerUsuariosCorreo(correo) {
  const respuesta = await fetch("http://localhost/Vesta/usuario", {
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
  const respuesta = await fetch(`http://localhost/Vesta/usuario/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();
  return json;
}

export async function crearUsuario(formData) {
  const respuesta = await fetch("http://localhost/Vesta/usuario/crear", {
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
  const respuesta = await fetch(
    `http://localhost/Vesta/usuario/modificar/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const json = await respuesta.json();

  return json;
}

export async function eliminarUsuario(id) {
  const respuesta = await fetch(
    `http://localhost/Vesta/usuario/eliminar/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await respuesta.json();

  return json;
}

export async function obtenerPerfiles() {
  const respuesta = await fetch("http://localhost/Vesta/perfil");
  const json = await respuesta.json();
  return json;
}

export async function obtenerPermisos() {
  const respuesta = await fetch("http://localhost/Vesta/permiso");
  const json = await respuesta.json();
  return json;
}

export async function crearPerfil(formData) {
  const respuesta = await fetch("http://localhost/Vesta/perfil/crear", {
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
  const respuesta = await fetch(`http://localhost/Vesta/perfil/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();
  return json;
}

export async function actualizarPerfil(id, formData) {
  const respuesta = await fetch(
    `http://localhost/Vesta/perfil/modificar/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );
  const json = await respuesta.json();

  return json;
}

export async function eliminarPerfil(id) {
  const respuesta = await fetch(
    `http://localhost/Vesta/perfil/eliminar/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await respuesta.json();
  return json;
}
