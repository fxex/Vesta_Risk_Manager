import { URL } from "../utils/URL";

export const obtenerRiesgosProyecto = async (id_proyecto) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/riesgos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};

export const crearRiesgo = async (id_proyecto, data) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/riesgo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await respuesta.json();

  return json;
};

export const modificarRiesgo = async (id_proyecto, id_riesgo, data) => {
  const respuesta = await fetch(
    `${URL}/proyecto/${id_proyecto}/riesgo/${id_riesgo}`,
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

export const eliminarRiesgo = async (id_proyecto, id_riesgo) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/riesgo/${id_riesgo}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};

export const obtenerRiesgoId = async (id_proyecto, id_riesgo) => {
  const respuesta = await fetch(
    `${URL}/proyecto/${id_proyecto}/riesgo/${id_riesgo}`,
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

export const obtenerEvaluacionesAnterioresProyecto = async (id_proyecto) => {
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

export const crearIncidencia = async (id_proyecto, data) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/incidencia`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const json = await respuesta.json();

  return json.creacion;
};

export const modificarIncidencia = async (id_proyecto, id_incidencia, data) => {
  const respuesta = await fetch(
    `${URL}/proyecto/${id_proyecto}/incidencia/${id_incidencia}`,
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

export const obtenerIncidenciasProyecto = async (id_proyecto) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/incidencias`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
};

export const obtenerDatosRiesgos = async (id_proyecto) => {
  const respuesta = await fetch(`${URL}/proyecto/${id_proyecto}/riesgo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await respuesta.json();

  return json;
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
