import { URL } from "../utils/funciones";

export const crearEvaluacion = async (id_proyecto, id_riesgo, data) => {
  const respuesta = await fetch(
    `${URL}/proyecto/${id_proyecto}/riesgo/${id_riesgo}/evaluacion`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const json = await respuesta.json();  

  return json;
};

export const obtenerEvaluacionesActualesProyecto = async (id_proyecto) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/evaluaciones`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};

export const obtenerEvaluacionesActualesProyectoPaginado = async (id_proyecto, pagina) => {
  const paginaActual = pagina ? pagina : 1;
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/evaluaciones/${paginaActual}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};

export const obtenerEvaluacionesActualesProyectoDesarrolladorPaginado = async (id_proyecto, id_usuario, pagina) => {
  const paginaActual = pagina ? pagina : 1;
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/evaluaciones/${paginaActual}/${id_usuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};

export const obtenerEvaluacionesAnterioresProyecto = async (id_proyecto) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/evaluaciones/antiguos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};

export const obtenerEvaluacionesAnterioresProyectoPaginado = async (id_proyecto, pagina) => {
  const paginaActual = pagina ? pagina : 1;
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/evaluaciones/antiguos/${paginaActual}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();  

  return json;
};

export const obtenerEvaluacionesAnterioresDesarrolladorProyectoPaginado = async (id_proyecto, id_usuario, pagina) => {
  const paginaActual = pagina ? pagina : 1;
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/evaluaciones/antiguos/${paginaActual}/${id_usuario}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};

export const obtenerEvaluacionId = async (id_proyecto, id_evaluacion) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/evaluacion/${id_evaluacion}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};

export const editarEvaluacion = async (id_proyecto, id_riesgo, id_evaluacion, data) => {
  const respuesta = await fetch(
    `${URL}/proyecto/${id_proyecto}/riesgo/${id_riesgo}/evaluacion/editar/${id_evaluacion}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const json = await respuesta.json();  

  return json;
};