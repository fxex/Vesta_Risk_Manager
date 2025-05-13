import { obtenerCategoriaId } from "../services/categorias";
import { obtenerIncidenciaId } from "../services/informes";
import { obtenerIteracionActual, obtenerProyectosId, obtenerProyectosUsuarioDesarrollador, obtenerProyectosUsuarioLider } from "../services/proyectos";
import { obtenerDatosRiesgos, obtenerEvaluacionesActualesProyecto, obtenerIncidenciasProyecto, obtenerRiesgoId } from "../services/riesgos";
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

//Loader de Evaluaciones
export const evaluacionesActualesLoader = async ({ params }) => {
  const evaluaciones = await obtenerEvaluacionesActualesProyecto(params.id_proyecto);
  return { evaluaciones };
};

export const evaluacionCreacionLoader = async ({ params }) => {
  const id_riesgo= params.id_riesgo
  const riesgo = await obtenerRiesgoId(params.id_proyecto, id_riesgo);
  const iteracion = await obtenerIteracionActual(params.id_proyecto);
  return { riesgo, iteracion };
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

