import { URL } from "../utils/funciones";

export const obtenerCantidadPlanTipo = async (id_proyecto, id_riesgo, id_iteracion) => {
  const respuesta = await fetch(
    `${URL}/proyecto/${id_proyecto}/riesgo/${id_riesgo}/plan/tipo/cantidad/${id_iteracion}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await respuesta.json();    

  return json;
};

export const crearPlan = async (id_proyecto, id_riesgo, data) => {
  const token = localStorage.getItem("jwt");
  const respuesta = await fetch(
    `${URL}/proyecto/${id_proyecto}/riesgo/${id_riesgo}/plan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  const json = await respuesta.json();

  return json.creacion;
};

export const obtenerPlanesProyecto = async (id_proyecto) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/planes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};

export const obtenerPlanesAnterioresProyecto = async (id_proyecto) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/planes/antiguos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};

export const obtenerPlanId = async (id_proyecto, id_plan) => {
  const respuesta = await fetch(
    `${URL}/proyecto/${id_proyecto}/plan/${id_plan}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await respuesta.json();

  return json;
};

export const modificarPlan = async (id_proyecto, id_plan, data) => {
  const respuesta = await fetch(
    `${URL}/proyecto/${id_proyecto}/plan/${id_plan}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    }
  );
  const json = await respuesta.json();

  return json.modificado;
};

export const obtenerTareasProyecto = async (id_proyecto, id_usuario) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/tareas/${id_usuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};

export const obtenerTareasProyectoPaginado = async (id_proyecto, id_usuario, pagina) => {
  let paginaUsada = pagina ? pagina : 1;
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/tareas/${id_usuario}/${paginaUsada}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};


export const completarTarea = async (id_tarea) => {
  const respuesta = await fetch(
    `${URL}/tarea/${id_tarea}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await respuesta.json();

  return json;
};

export const obtenerDatosTareasInforme = async (id_proyecto) => {
  const respuesta = await fetch(
    `${URL}/proyecto/${id_proyecto}/tareas/informe`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await respuesta.json();

  return json;
};
