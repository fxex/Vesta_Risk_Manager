import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Index from "./pages/Index.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home.jsx";
import ListaUsuarios from "./pages/usuarios/ListaUsuarios.jsx";
import CrearUsuario from "./pages/usuarios/CrearUsuario.jsx";
import Salir from "./pages/Salir.jsx";

import {
  obtenerUsuarios as userLoader,
  obtenerPerfiles as perfilLoader,
  obtenerPermisos as permisoLoader,
} from "./services/usuarios.js";
import RutaProtegida from "./utils/RutaProtegida.jsx";
import VerUsuario, { cargarUsuario } from "./pages/usuarios/VerUsuario.jsx";
import ModificarUsuario, {
  cargarModificarUsuario,
} from "./pages/usuarios/ModificarUsuario.jsx";
import EliminarUsuario, {
  cargarEliminarUsuario,
} from "./pages/usuarios/EliminarUsuario.jsx";
import { UsuarioProvider } from "./context/usuarioContext.jsx";
import ListaPerfiles from "./pages/perfiles/ListaPerfiles.jsx";
import CrearPerfil from "./pages/perfiles/CrearPerfil.jsx";
import VerPerfil, { cargarPerfilId } from "./pages/perfiles/VerPerfil.jsx";
import ModificarPerfil, {
  cargarModificarPerfil,
} from "./pages/perfiles/ModificarPerfil.jsx";
import EliminarPerfil, {
  cargarEliminarPerfil,
} from "./pages/perfiles/EliminarPerfil.jsx";
import ListaProyecto from "./pages/proyecto/ListaProyecto.jsx";
import CrearProyecto from "./pages/proyecto/CrearProyecto.jsx";
import {
  obtenerCategoriaGeneral,
  obtenerProyectos as proyectoLoader,
} from "./services/proyectos.js";
import VerProyecto, { cargarProyecto } from "./pages/proyecto/VerProyecto.jsx";
import ModificarProyecto from "./pages/proyecto/ModificarProyecto.jsx";
import ListaProyectoLider, {
  obtenerListaProyectoLider,
} from "./pages/proyecto/client/ListaProyectoLider.jsx";
import VerProyectoLider from "./pages/proyecto/client/verProyectoLider.jsx";
import ListaProyectoDesarrollador, {
  obtenerListaProyectoDesarrollador,
} from "./pages/proyecto/client/ListaProyectoDesarrollador.jsx";
import ListaRiesgos, { riesgoLoader } from "./pages/riesgos/ListaRiesgos.jsx";
import CrearRiesgo from "./pages/riesgos/CrearRiesgo.jsx";
import CrearEvaluacionLider, {
  evaluacionCreacionLoader,
} from "./pages/evaluacion/lider/CrearEvaluacionLider.jsx";

import CrearEvaluacionDesarrollador from "./pages/evaluacion/desarrollador/CrearEvaluacionDesarrollador.jsx";
import CrearPlanLider, {
  planCreacionLoader,
} from "./pages/plan/lider/crearPlanLider.jsx";
import CrearPlanDesarrollador from "./pages/plan/desarrollador/CrearPlanDesarrollador.jsx";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/inicio",
      element: <RutaProtegida element={<Home />} />,
    },
    {
      path: "/inicio/usuarios",
      element: <RutaProtegida element={<ListaUsuarios />} isAdmin={true} />,
      loader: userLoader,
    },
    {
      path: "/inicio/usuario/crear",
      element: <RutaProtegida element={<CrearUsuario />} isAdmin={true} />,
      loader: perfilLoader,
    },
    {
      path: "/inicio/usuario/:id_usuario",
      element: <RutaProtegida element={<VerUsuario />} isAdmin={true} />,
      loader: cargarUsuario,
    },
    {
      path: "/inicio/usuario/modificar/:id_usuario",
      element: <RutaProtegida element={<ModificarUsuario />} isAdmin={true} />,
      loader: cargarModificarUsuario,
    },
    {
      path: "/inicio/usuario/eliminar/:id_usuario",
      element: <RutaProtegida element={<EliminarUsuario />} isAdmin={true} />,
      loader: cargarEliminarUsuario,
    },
    {
      path: "/inicio/perfiles",
      element: <RutaProtegida element={<ListaPerfiles />} isAdmin={true} />,
      loader: perfilLoader,
    },
    {
      path: "/inicio/perfil/crear",
      element: <RutaProtegida element={<CrearPerfil />} isAdmin={true} />,
      loader: permisoLoader,
    },
    {
      path: "/inicio/perfil/:id_perfil",
      element: <RutaProtegida element={<VerPerfil />} isAdmin={true} />,
      loader: cargarPerfilId,
    },
    {
      path: "/inicio/perfil/modificar/:id_perfil",
      element: <RutaProtegida element={<ModificarPerfil />} isAdmin={true} />,
      loader: cargarModificarPerfil,
    },
    {
      path: "/inicio/perfil/eliminar/:id_perfil",
      element: <RutaProtegida element={<EliminarPerfil />} isAdmin={true} />,
      loader: cargarEliminarPerfil,
    },
    {
      path: "/inicio/proyectos",
      element: <RutaProtegida element={<ListaProyecto />} isAdmin={true} />,
      loader: proyectoLoader,
    },

    {
      path: "/inicio/proyecto/crear",
      element: <RutaProtegida element={<CrearProyecto />} isAdmin={true} />,
      loader: obtenerCategoriaGeneral,
    },
    {
      path: "/inicio/proyecto/:id_proyecto",
      element: <RutaProtegida element={<VerProyecto />} isAdmin={true} />,
      loader: cargarProyecto,
    },
    {
      path: "/inicio/proyecto/modificar/:id_proyecto",
      element: <RutaProtegida element={<ModificarProyecto />} isAdmin={true} />,
      loader: cargarProyecto,
    },
    {
      path: "/inicio/proyectos/lider",
      element: <RutaProtegida element={<ListaProyectoLider />} />,
      loader: obtenerListaProyectoLider,
    },
    {
      path: "/inicio/proyectos/desarrollador",
      element: <RutaProtegida element={<ListaProyectoDesarrollador />} />,
      loader: obtenerListaProyectoDesarrollador,
    },
    {
      path: "/inicio/proyecto/lider/:id_proyecto",
      element: <RutaProtegida element={<VerProyectoLider />} />,
    },
    {
      path: "/inicio/proyecto/lider/:id_proyecto/riesgos",
      element: <RutaProtegida element={<ListaRiesgos />} />,
      loader: riesgoLoader,
    },
    {
      path: "/inicio/proyecto/lider/:id_proyecto/riesgo/crear",
      element: <RutaProtegida element={<CrearRiesgo />} />,
      loader: cargarProyecto,
    },
    {
      path: "/inicio/proyecto/lider/:id_proyecto/riesgo/:id_riesgo/evaluacion/crear",
      element: <RutaProtegida element={<CrearEvaluacionLider />} />,
      loader: evaluacionCreacionLoader,
    },
    {
      path: "/inicio/proyecto/lider/:id_proyecto/riesgo/:id_riesgo/plan/crear",
      element: <RutaProtegida element={<CrearPlanLider />} />,
      loader: planCreacionLoader,
    },
    {
      path: "/inicio/proyecto/desarrollador/:id_proyecto/riesgos",
      element: <RutaProtegida element={<ListaRiesgos />} />,
      loader: riesgoLoader,
    },
    {
      path: "/inicio/proyecto/desarrollador/:id_proyecto/riesgo/crear",
      element: <RutaProtegida element={<CrearRiesgo />} />,
      loader: cargarProyecto,
    },
    {
      path: "/inicio/proyecto/desarrollador/:id_proyecto/riesgo/:id_riesgo/evaluacion/crear",
      element: <RutaProtegida element={<CrearEvaluacionDesarrollador />} />,
      loader: evaluacionCreacionLoader,
    },
    {
      path: "/inicio/proyecto/desarrollador/:id_proyecto/riesgo/:id_riesgo/plan/crear",
      element: <RutaProtegida element={<CrearPlanDesarrollador />} />,
      loader: planCreacionLoader,
    },
    {
      path: "/salir",
      element: <RutaProtegida element={<Salir />} />,
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UsuarioProvider>
      <GoogleOAuthProvider clientId="865850828899-d9raoavrfjenindu8qsunk4p0a3g37vf.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </UsuarioProvider>
  </React.StrictMode>
);
