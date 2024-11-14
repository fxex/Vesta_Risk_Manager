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

export const obtenerCantidadPlanTipo = async (id_proyecto, id_riesgo) => {
  const respuesta = await fetch(
    `${URL}/proyecto/${id_proyecto}/riesgo/${id_riesgo}/plan/tipo/cantidad`,
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
