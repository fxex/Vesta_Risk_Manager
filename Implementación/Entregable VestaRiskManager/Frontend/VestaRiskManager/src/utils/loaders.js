import { obtenerCategoriaId } from "../services/categorias";
import { obtenerDatosInformeSeguimiento, obtenerIncidenciaId } from "../services/informes";
import { obtenerIteracionActual, obtenerProyectosId, obtenerProyectosUsuarioDesarrollador, obtenerProyectosUsuarioLider } from "../services/proyectos";
import { obtenerDatosRiesgos, obtenerRiesgoId, obtenerRiesgosProyecto, obtenerRiesgosProyectoPaginado} from "../services/riesgos";
import { obtenerEvaluacionesActualesProyecto, obtenerEvaluacionesAnterioresProyecto, obtenerEvaluacionId} from "../services/evaluacion"
import {obtenerPlanesAnterioresProyecto, obtenerPlanesProyecto, obtenerPlanId, obtenerTareasProyecto, obtenerTareasProyectoPaginado} from "../services/planes"
import { obtenerIncidenciasProyecto } from "../services/incidencia";
import { obtenerPerfiles, obtenerUsuariosId } from "../services/usuarios";

// Loaders de Usuarios
export async function cargarUsuario({ params }) {
  const usuario = await obtenerUsuariosId(params.id_usuario);
  return { usuario };
}

export async function cargarModificarUsuario({ params }) {
  const usuario = await obtenerUsuariosId(params.id_usuario);
  const perfiles = await obtenerPerfiles();
  return { usuarioLoader: usuario, perfiles };
}

export async function cargarEliminarUsuario({ params }) {
  const usuario = await obtenerUsuariosId(params.id_usuario);
  return { usuario };
}

// Loaders de Categorias
export async function cargarCategoria({ params }) {
  const categoria = await obtenerCategoriaId(params.id_categoria);
  return { categoria };
}


// Loaders de Proyectos
export async function cargarProyecto({ params }) {
  const proyecto = await obtenerProyectosId(params.id_proyecto);
  return { proyecto };
}

export const obtenerListaProyectoLider = async () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const proyectos = await obtenerProyectosUsuarioLider(usuario.email);
  return { proyectos };
};

export const obtenerListaProyectoDesarrollador = async () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const proyectos = await obtenerProyectosUsuarioDesarrollador(usuario.email);
  return { proyectos };
};


// Loaders de Riesgos
export const dashboardLoader = async ({ params }) => {
  const datosRiesgos = await obtenerDatosRiesgos(params.id_proyecto);
  return {datosRiesgos};
};

export const riesgoLoader = async ({ params }) => {
  const riesgos = await obtenerRiesgosProyecto(params.id_proyecto);
  const iteracion = await obtenerIteracionActual(params.id_proyecto);

  return { riesgos, iteracion };
};

export const riesgoLoaderPage = async ({ params }) => {
  const {riesgos, totalPaginas} = await obtenerRiesgosProyectoPaginado(params.id_proyecto, localStorage.getItem("pagina_riesgo")??1, localStorage.getItem("orden_riesgo")??1);
  const iteracion = await obtenerIteracionActual(params.id_proyecto);

  return { riesgos, totalPaginas, iteracion };
};

export async function cargarRiesgo({ params }) {
  const id_riesgo= params.id_riesgo
  const proyecto = await obtenerProyectosId(params.id_proyecto);
  const riesgo = await obtenerRiesgoId(params.id_proyecto, id_riesgo);
  return { proyecto, riesgo };
}

export const seguimientoLoader = async ({params}) =>{
    const resultado = await obtenerDatosInformeSeguimiento(params.id_proyecto)
    const iteracion_actual = await obtenerIteracionActual(params.id_proyecto)
    resultado["iteracion_actual"] = iteracion_actual
    return resultado;
}

//Loader de Evaluaciones
export const evaluacionesActualesLoader = async ({ params }) => {
  const evaluaciones = await obtenerEvaluacionesActualesProyecto(params.id_proyecto);
  return { evaluaciones };
};

export const evaluacionesPasadasLoader = async ({ params }) => {
  const evaluaciones = await obtenerEvaluacionesAnterioresProyecto(params.id_proyecto);
  return { evaluaciones };
};

export const evaluacionLoader = async ({ params }) => {
  const evaluacion = await obtenerEvaluacionId(params.id_proyecto, params.id_evaluacion);
  return { evaluacion };
};

export const evaluacionCreacionLoader = async ({ params }) => {
  const id_riesgo= params.id_riesgo
  const riesgo = await obtenerRiesgoId(params.id_proyecto, id_riesgo);
  const iteracion = await obtenerIteracionActual(params.id_proyecto);
  return { riesgo, iteracion };
};

// Loader de Planes
export const planesLoader = async ({ params }) => {
  const planes = await obtenerPlanesProyecto(params.id_proyecto);
  return { planes };
};

export const planLoader = async ({ params }) => {
  const id_plan= params.id_plan;
  const iteracion = await obtenerIteracionActual(params.id_proyecto);
  const plan = await obtenerPlanId(params.id_proyecto, id_plan);

  return { iteracion, plan };
};

export const planesAntiguosLoader = async ({ params }) => {
  const planes = await obtenerPlanesAnterioresProyecto(params.id_proyecto);
  return { planes };
};

export const TareaLoader = async ({ params }) => {
  const {tareas, totalPaginas} = await obtenerTareasProyectoPaginado(params.id_proyecto, params.id_usuario, 1);
  const iteracion = await obtenerIteracionActual(params.id_proyecto);
  return { tareas, totalPaginas, iteracion};
};

// Loader de Incidencias
export const incidenciaLoader = async ({ params }) => {
  const incidencias = await obtenerIncidenciasProyecto(params.id_proyecto);
  const iteracion = await obtenerIteracionActual(params.id_proyecto);
  return { incidencias, iteracion};
};


export async function cargarIncidencia({ params }) {
  const incidencia = await obtenerIncidenciaId(params.id_incidencia);
  return { incidencia };
}

