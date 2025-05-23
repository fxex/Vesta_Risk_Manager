<?php
require_once __DIR__ . "/../controllers/gestorUsuario.php";
require_once __DIR__ . "/../controllers/gestorProyecto.php";
require_once __DIR__ . "/../controllers/gestorRiesgo.php";
require_once "router.php";

$router = new Router();
$router->setBase('Vesta');

$controladorUsuario = new GestorUsuario();
$controladorProyecto = new GestorProyecto();
$controladorRiesgo = new GestorRiesgo();


function getAuthorizationHeader() {
    // Comprobamos si la cabecera HTTP_AUTHORIZATION está presente
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        return trim($_SERVER['HTTP_AUTHORIZATION']);
    }
    // Si no está presente, verificamos otras posibles formas de obtenerla
    if (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        return trim($_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
    }
    return null;
}

function decodeJWT($jwt) {
    // Divide el JWT en sus partes: header, payload y signature
    list($headerEncoded, $payloadEncoded, $signatureEncoded) = explode('.', $jwt);
    
    // Decodifica el header y el payload
    $header = json_decode(base64_decode(strtr($headerEncoded, '-_', '+/')), true);
    $payload = json_decode(base64_decode(strtr($payloadEncoded, '-_', '+/')), true);
    
    // Retorna el header y el payload
    return ['header' => $header, 'payload' => $payload];
}

function extractToken($authorizationHeader) {
    // Comprobamos si el token tiene el prefijo "Bearer "
    if (preg_match('/Bearer\s(\S+)/', $authorizationHeader, $matches)) {
        return $matches[1];  // El token será el primer grupo capturado
    }
    return null;
}

function obtenerClavePublicaGoogle() {
    $url = "https://www.googleapis.com/oauth2/v3/certs";
    $certificados = json_decode(file_get_contents($url), true);

    return $certificados['keys'];
}

function validarJWT($controladorUsuario){
    $autorizacion = getAuthorizationHeader();
    
    if (empty($autorizacion)) {
        return false;
    }
    
    $JWT = extractToken($autorizacion);
    if (empty($JWT)) {
        return false;
    }

    $resultado = decodeJWT($JWT);
    if (empty($resultado["header"]) || empty($resultado["payload"])) {
        return false;
    }

    if (empty($resultado["header"]["typ"]) || $resultado["header"]["typ"] != "JWT") {
        return false;
    }

    if (empty($resultado["header"]["kid"])) {
        return false;
    }

    if (empty($resultado["payload"]["email"])) {
        return false;
    }

    $usuario = $controladorUsuario->obtenerUsuarioCorreo($resultado["payload"]["email"]);

    if (empty($usuario)) {
        return false;
    }

    return true;

}

// Rutas para el Gestor de usuarios
// Usuarios
$router->add("GET", "usuarios/{pagina}", function($pagina) use ($controladorUsuario){
    $validado = validarJWT($controladorUsuario);
    if ($validado) {
        $resultado = $controladorUsuario->obtenerTodosUsuarios((int)$pagina); 
        echo json_encode($resultado); // Retorna un json con todos los usuarios que tenga la base de datos.
    }else{
        header('HTTP/1.1 403 Forbidden');
        echo json_encode([
            "error" => "No tienes permisos para realizar esta acción o el token es inválido."
        ]);
    }
});


$router->add("GET","usuario/{parametro}", function($parametro) use($controladorUsuario){
    $resultado = null;
    if (is_numeric($parametro)) {
        $validado = validarJWT($controladorUsuario);
        if ($validado) {
            $autorizacion = getAuthorizationHeader();
            $resultado = $controladorUsuario->obtenerUsuarioId($parametro, $autorizacion);
        }
    }elseif (filter_var($parametro, FILTER_VALIDATE_EMAIL)) {
        $resultado = $controladorUsuario->obtenerUsuarioCorreo($parametro);
    }else{
        //TODO Modificar
    }
    echo json_encode($resultado);
    
});

$router->add("POST","usuario", function() use($controladorUsuario){
    $validado = validarJWT($controladorUsuario);
    if ($validado) {
        $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
        if (!empty($body)) {
            $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
            $resultado = $controladorUsuario->crearUsuario($data);
            echo json_encode(["creacion"=>$resultado]); 
        } else {
            echo json_encode(["creacion"=>false]);
        }
    }else{
        header('HTTP/1.1 403 Forbidden');
        echo json_encode([
            "error" => "No tienes permisos para realizar esta acción o el token es inválido."
        ]);
    }
});

$router->add("PUT", "usuario/{id}",function($id) use($controladorUsuario){
    $validado = validarJWT($controladorUsuario);
    if ($validado) {
        $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
        if (!empty($body)) {
            $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
            $resultado = $controladorUsuario->actualizarUsuario($id, $data);
            echo json_encode(["modificacion"=>$resultado]); 
        } else {
            echo json_encode(["modificacion"=>false]);
        }
    }else{
        header('HTTP/1.1 403 Forbidden');
        echo json_encode([
            "error" => "No tienes permisos para realizar esta acción o el token es inválido."
        ]);
    }
});

$router->add("DELETE", "usuario/{id}",function($id) use($controladorUsuario){
    $validado = validarJWT($controladorUsuario);
    if ($validado) {
        $resultado = $controladorUsuario->eliminarUsuario($id);
        echo json_encode(["eliminado"=>$resultado]); 
    }else{
        header('HTTP/1.1 403 Forbidden');
        echo json_encode([
            "error" => "No tienes permisos para realizar esta acción o el token es inválido."
        ]);
    }
});


$router->add("GET", "perfiles", function() use ($controladorUsuario){
    $validado = validarJWT($controladorUsuario);
    if ($validado) {
        $resultado = $controladorUsuario->obtenerTodosPerfiles(); 
        echo json_encode($resultado); // Retorna un json con todos los usuarios que tenga la base de datos.
    }else{
        header('HTTP/1.1 403 Forbidden');
        echo json_encode([
            "error" => "No tienes permisos para realizar esta acción o el token es inválido."
        ]);
    }
});

// $router->add("POST","perfil", function() use($controladorUsuario){
//     $validado = validarJWT($controladorUsuario);
//     if ($validado) {
//         $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
//         if (!empty($body)) {
//             $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
//             $resultado = $controladorUsuario->crearPerfil($data);
//             echo json_encode(["creacion"=>$resultado]); 
//         } else {
//             echo json_encode(["creacion"=>false]);
//         }
//     } else {
//         header('HTTP/1.1 403 Forbidden');
//         echo json_encode([
//             "error" => "No tienes permisos para realizar esta acción o el token es inválido."
//         ]);
//     }
// });

// $router->add("PUT", "perfil/{id}",function($id) use($controladorUsuario){
//     $validado = validarJWT($controladorUsuario);
//     if ($validado) {
//         $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
//         if (!empty($body)) {
//             $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
//             $resultado = $controladorUsuario->actualizarPerfil($id, $data);
//             echo json_encode(["modificacion"=>$resultado]); 
//         } else {
//             echo json_encode(["modificacion"=>false]);
//         }
//     } else {
//         header('HTTP/1.1 403 Forbidden');
//         echo json_encode([
//             "error" => "No tienes permisos para realizar esta acción o el token es inválido."
//         ]);
//     }
// });

// $router->add("DELETE", "perfil/{id}",function($id) use($controladorUsuario){
//     $validado = validarJWT($controladorUsuario);
//     if ($validado) {
//         $resultado = $controladorUsuario->eliminarPerfil($id);
//         echo json_encode(["eliminado"=>$resultado]); 
//     } else {
//         header('HTTP/1.1 403 Forbidden');
//         echo json_encode([
//             "error" => "No tienes permisos para realizar esta acción o el token es inválido."
//         ]);
//     }
    
// });


// $router->add("GET", "perfil/{id}", function($id) use($controladorUsuario) {
//     $validado = validarJWT($controladorUsuario);
//     if ($validado) {
//         $resultado = $controladorUsuario->obtenerPerfilId($id);
//         echo json_encode($resultado);
//     } else {
//         header('HTTP/1.1 403 Forbidden');
//         echo json_encode([
//             "error" => "No tienes permisos para realizar esta acción o el token es inválido."
//         ]);
//     }
    
// });

$router->add("GET","perfil/comprobar/{nombre}", function($nombre) use($controladorUsuario){
    $validado = validarJWT($controladorUsuario);
    if ($validado) {
        $resultado = $controladorUsuario->obtenerPerfilNombre(urldecode($nombre));
        echo json_encode($resultado); 
    }else{
        header('HTTP/1.1 403 Forbidden');
        echo json_encode([
            "error" => "No tienes permisos para realizar esta acción o el token es inválido."
        ]);
    }
});

// $router->add("GET", "permisos", function() use ($controladorUsuario){
//     $validado = validarJWT($controladorUsuario);
//     if ($validado) {
//         $resultado = $controladorUsuario->obtenerTodosPermisos(); 
//         echo json_encode($resultado); 
//     }else{
//         header('HTTP/1.1 403 Forbidden');
//         echo json_encode([
//             "error" => "No tienes permisos para realizar esta acción o el token es inválido."
//         ]);
//     }
// });


$router->add("GET","participante/{nombre}", function($nombre) use($controladorUsuario){
    $resultado = $controladorUsuario->obtenerUsuariosNombre(urldecode($nombre));
    echo json_encode($resultado); 
});
$router->add("GET","usuario/comprobar/{nombre}", function($nombre) use($controladorUsuario){
    $resultado = $controladorUsuario->obtenerUsuariosNombreEqual(urldecode($nombre));
    echo json_encode($resultado); 
});


// Rutas para el Gestor de Proyecto

$router->add("GET", "proyectos", function() use ($controladorProyecto){
    $resultado = $controladorProyecto->obtenerTodosProyecto(); 
    echo json_encode($resultado);
});

$router->add("GET","proyecto/categorias", function() use($controladorProyecto){
    $resultado = $controladorProyecto->obtenerCategoriasGenerales();
    echo json_encode($resultado); 
});

$router->add("GET","proyecto/participante/{nombre}", function($nombre) use($controladorProyecto){
    $resultado = $controladorProyecto->obtenerParticipanteNombre($nombre);
    echo json_encode($resultado); 
});

$router->add("POST","proyectos/lider", function() use($controladorProyecto){
    $body = file_get_contents('php://input');                
    if (!empty($body)) {
        $data = json_decode($body, true); 
        $resultado = $controladorProyecto->obtenerTodosProyectoLider($data["correo"]);
        echo json_encode($resultado); 
    } else {
        echo json_encode([]);
    }
});

$router->add("POST","proyectos/lider/{pagina}", function($pagina) use($controladorProyecto){
    $body = file_get_contents('php://input');                
    if (!empty($body)) {
        $data = json_decode($body, true); 
        $resultado = $controladorProyecto->obtenerTodosProyectoLiderPaginado($data["correo"], (int)$pagina);
        echo json_encode($resultado); 
    } else {
        echo json_encode([]);
    }
});

$router->add("POST","proyectos/desarrollador", function() use($controladorProyecto){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorProyecto->obtenerTodosProyectoDesarrollador($data["correo"]);
        echo json_encode($resultado); 
    } else {
        echo json_encode(null);
    }
});

$router->add("POST","proyectos/desarrollador/{pagina}", function($pagina) use($controladorProyecto){
    $body = file_get_contents('php://input');           
    if (!empty($body)) {
        $data = json_decode($body, true); 
        $resultado = $controladorProyecto->obtenerTodosProyectoDesarrolladorPaginado($data["correo"], (int)$pagina);
        echo json_encode($resultado); 
    } else {
        echo json_encode(null);
    }
});

$router->add("GET", "proyectos/{pagina}", function($pagina) use ($controladorProyecto){
    $resultado = $controladorProyecto->obtenerTodosProyectoPaginado((int)$pagina); 
    echo json_encode($resultado);
});


$router->add("POST","proyecto", function() use($controladorProyecto){
    $body = file_get_contents('php://input');                 
    if (!empty($body)) {
        $data = json_decode($body, true); 
        $resultado = $controladorProyecto->crearProyecto($data);
        echo json_encode(["creacion"=>$resultado]);
    } else {
        echo json_encode(["creacion"=>false]);
    }
});

$router->add("GET", "proyecto/{id_proyecto}/riesgo", function($id_proyecto) use ($controladorRiesgo){
    $resultado = $controladorRiesgo->obtenerDatosRiesgo($id_proyecto);
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id}", function($id) use ($controladorProyecto){
    $resultado = $controladorProyecto->obtenerProyectoId($id); 
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id_proyecto}/iteracion/ultima", function($id_proyecto) use ($controladorProyecto){
    $resultado = $controladorProyecto->obtenerUltimaIteracion($id_proyecto); 
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id_proyecto}/iteracion/ultimas", function($id_proyecto) use ($controladorProyecto){
    $resultado = $controladorProyecto->obtenerUltimasIteraciones($id_proyecto); 
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id}/iteracion", function($id) use ($controladorProyecto){
    $resultado = $controladorProyecto->obtenerIteracionActual($id); 
    echo json_encode($resultado);
});



$router->add("PUT", "proyecto/{id}",function($id) use($controladorProyecto){
    $body = file_get_contents('php://input');                 
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorProyecto->actualizarProyecto($id, $data);
        echo json_encode(["modificacion"=>$resultado]); 
    } else {
        echo json_encode(["modificacion"=>false]);
    }
});


$router->add("GET","categoria/generales", function() use($controladorRiesgo){
    $resultado = $controladorRiesgo->obtenerCategoriasGenerales();
    echo json_encode($resultado); 
});

$router->add("GET","categoria/generales/{pagina}", function($pagina) use($controladorRiesgo){
    $resultado = $controladorRiesgo->obtenerCategorias((int)$pagina);
    echo json_encode($resultado); 
});
$router->add("POST","categoria", function() use($controladorRiesgo){
    $body = file_get_contents('php://input');                 
    if (!empty($body)) {
        $data = json_decode($body, true);
        $resultado = $controladorRiesgo->crearCategoria($data);
        echo json_encode(["creacion"=>$resultado]); 
    } else {
        echo json_encode(["creacion"=>false]);
    }
});

$router->add("GET", "categoria/comprobar/{nombre}", function($nombre) use ($controladorRiesgo){
    $resultado = $controladorRiesgo->obtenerCategoriaNombre(urldecode($nombre)); 
    echo json_encode($resultado);
});

$router->add("GET", "categoria/{id}", function($id) use ($controladorRiesgo){
    $resultado = $controladorRiesgo->obtenerCategoriaId($id); 
    echo json_encode($resultado);
});

$router->add("PUT", "categoria/{id}", function($id) use ($controladorRiesgo){
    $body = file_get_contents('php://input');
    if (!empty($body)) {
        $data = json_decode($body, true);
        $resultado = $controladorRiesgo->actualizarCategoria($id, $data);
        echo json_encode(["modificacion"=>$resultado]); 
    } else {
        echo json_encode(["modificacion"=>false]);
    }
});

$router->add("PUT", "categoria/{id}/eliminar", function($id) use ($controladorRiesgo){
    $resultado = $controladorRiesgo->eliminarCategoria($id); 
    echo json_encode($resultado);
});



$router->add("GET", "proyecto/{id_proyecto}/riesgos", function($id_proyecto) use ($controladorRiesgo){
    $resultado = $controladorRiesgo->obtenerRiesgoProyecto($id_proyecto);
    echo json_encode($resultado);
});


$router->add("GET", "proyecto/{id_proyecto}/riesgos/informe", function($id_proyecto) use ($controladorRiesgo){
    $resultado = $controladorRiesgo->obtenerDatosInformeSeguimiento($id_proyecto);
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id_proyecto}/riesgos/{pagina}/{orden}", function($id_proyecto, $pagina, $orden) use ($controladorRiesgo){
    $resultado = $controladorRiesgo->obtenerRiesgoProyectoPorPagina($id_proyecto, (int)$pagina, $orden);
    echo json_encode($resultado);
});


$router->add("POST", "proyecto/{id_proyecto}/riesgo", function($id_proyecto) use ($controladorRiesgo){
    $body = file_get_contents('php://input');                 
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        
        $resultado = $controladorRiesgo->crearRiesgo($id_proyecto, $data);
        echo json_encode(["creacion"=>$resultado]);
    } else {
        echo json_encode(["creacion"=>false]);
    }
});

$router->add("PUT", "proyecto/{id_proyecto}/riesgo/{id_riesgo}", function($id_proyecto, $id_riesgo) use ($controladorRiesgo){
    $body = file_get_contents('php://input');                 
    if (!empty($body)) {
        $data = json_decode($body, true);
        $resultado = $controladorRiesgo->actualizarRiesgo($id_riesgo, $data, $id_proyecto);
        echo json_encode(["modificado"=>$resultado]);
    } else {
        echo json_encode(["modificado"=>false]);
    }
});

$router->add("DELETE", "proyecto/{id_proyecto}/riesgo/{id_riesgo}", function($id_proyecto, $id_riesgo) use ($controladorRiesgo){
    $resultado = $controladorRiesgo->eliminarRiesgo($id_proyecto, $id_riesgo);
    echo json_encode(["eliminado"=>$resultado]);
});

$router->add("GET", "proyecto/{id_proyecto}/riesgo/{id_riesgo}", function($id_proyecto, $id_riesgo) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerRiesgoId($id_riesgo);
    echo json_encode($resultado);
});

$router->add("POST", "proyecto/{id_proyecto}/riesgo/{id_riesgo}/evaluacion", function($id_proyecto, $id_riesgo) use ($controladorRiesgo){
    $body = file_get_contents('php://input');          
    if (!empty($body)) {
        $data = json_decode($body, true);
        $resultado = $controladorRiesgo->crearEvaluacion($id_proyecto, $id_riesgo, $data);
        echo json_encode(["creacion"=>$resultado]);
    } else {
        echo json_encode(["creacion"=>false]);
    }
});

$router->add("PUT", "proyecto/{id_proyecto}/riesgo/{id_riesgo}/evaluacion/editar/{id_evaluacion}", function($id_proyecto, $id_riesgo, $id_evaluacion) use ($controladorRiesgo){
    $body = file_get_contents('php://input');          
    if (!empty($body)) {
        $data = json_decode($body, true);
        $resultado = $controladorRiesgo->actualizarEvaluacion($id_evaluacion, $id_riesgo, $id_proyecto, $data);
        echo json_encode(["modificacion"=>$resultado]);
    } else {
        echo json_encode(["modificacion"=>false]);
    }
});

$router->add("POST", "proyecto/{id_proyecto}/riesgo/{id_riesgo}/plan", function($id_proyecto, $id_riesgo) use ($controladorRiesgo, $controladorUsuario){
    $validado = validarJWT($controladorUsuario);
    if ($validado) {
        $body = file_get_contents('php://input');          
        if (!empty($body)) {
            $data = json_decode($body, true);
            $resultado = $controladorRiesgo->crearPlan($id_proyecto, $id_riesgo, $data);
            echo json_encode(["creacion"=>$resultado]);
        } else {
            echo json_encode(["creacion"=>false]);
        }
    } else {
        header('HTTP/1.1 403 Forbidden');
        echo json_encode([
            "error" => "No tienes permisos para realizar esta acción o el token es inválido."
        ]);
    }
});

$router->add("GET", "proyecto/{id_proyecto}/riesgo/{id_riesgo}/plan/tipo/cantidad/{id_iteracion}", function($id_proyecto, $id_riesgo, $id_iteracion) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerCantidadPlanes($id_proyecto, $id_riesgo, $id_iteracion);
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id_proyecto}/evaluaciones", function($id_proyecto) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerEvaluacionesActuales($id_proyecto);
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id_proyecto}/evaluaciones/antiguos", function($id_proyecto) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerEvaluacionesAnteriores($id_proyecto);
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id_proyecto}/evaluaciones/antiguos/{pagina}", function($id_proyecto, $pagina) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerEvaluacionesAnterioresPaginado($id_proyecto, $pagina);
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id_proyecto}/evaluaciones/{pagina}", function($id_proyecto, $pagina) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerEvaluacionesActualesPaginado($id_proyecto, $pagina);
    echo json_encode($resultado);
});



$router->add("GET", "proyecto/{id_proyecto}/evaluacion/{id_evaluacion}", function($id_proyecto, $id_evaluacion) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerEvaluacionId($id_evaluacion);
    echo json_encode($resultado);
});



$router->add("GET", "proyecto/{id_proyecto}/planes", function($id_proyecto) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerPlanesIteracionActual($id_proyecto);
    echo json_encode($resultado);
});


$router->add("GET", "proyecto/{id_proyecto}/planes/antiguos", function($id_proyecto) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerPlanesIteracionAnteriores($id_proyecto);
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id_proyecto}/planes/antiguos/{pagina}", function($id_proyecto, $pagina) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerPlanesIteracionAnterioresPaginado($id_proyecto, $pagina);
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id_proyecto}/planes/{pagina}", function($id_proyecto, $pagina) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerPlanesIteracionActualPaginado($id_proyecto, $pagina);
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id_proyecto}/plan/{id_plan}", function($id_proyecto, $id_plan) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerPlanId($id_plan, $id_proyecto);
    echo json_encode($resultado);
});

$router->add("PUT", "proyecto/{id_proyecto}/plan/{id_plan}", function($id_proyecto, $id_plan) use ($controladorRiesgo){ 
    $body = file_get_contents('php://input');                 
    if (!empty($body)) {
        $data = json_decode($body, true);
        $resultado = $controladorRiesgo->actualizarPlan($id_plan, $data);
        echo json_encode(["modificado"=>$resultado]);
    } else {
        echo json_encode(["modificado"=>false]);
    }
});

$router->add("DELETE", "proyecto/{id_proyecto}/plan/{id_plan}", function($id_proyecto, $id_plan) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->eliminarPlan($id_plan);
    echo json_encode(["eliminado"=>$resultado]);
});



$router->add("GET", "proyecto/{id_proyecto}/incidencias", function($id_proyecto) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerIncidenciasProyecto($id_proyecto);
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id_proyecto}/incidencias/{pagina}", function($id_proyecto, $pagina) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerIncidenciasProyectoPaginado($id_proyecto, $pagina);
    echo json_encode($resultado);
});

$router->add("POST", "proyecto/{id_proyecto}/incidencia", function($id_proyecto) use ($controladorRiesgo){ 
    $body = file_get_contents('php://input');          
    if (!empty($body)) {
        $data = json_decode($body, true);
        $resultado = $controladorRiesgo->crearIncidencia($id_proyecto, $data);
        echo json_encode(["creacion"=>$resultado]);
    } else {
        echo json_encode(["creacion"=>false]);
    }
});

$router->add("GET", "incidencia/{id_incidencia}/informe", function($id_incidencia) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerInformeIncidencia($id_incidencia);
    echo json_encode($resultado);
});

$router->add("GET", "incidencia/{id_incidencia}", function($id_incidencia) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerIncidenciaId($id_incidencia);
    echo json_encode($resultado);
});


$router->add("DELETE", "incidencia/{id_incidencia}", function($id_incidencia) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->eliminarIncidencia($id_incidencia);
    echo json_encode($resultado);
});


$router->add("GET", "proyecto/{id_proyecto}/tareas/informe", function($id_proyecto) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerDatosTareasInforme($id_proyecto);
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id_proyecto}/tareas/{id_usuario}", function($id_proyecto, $id_usuario) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerTareas($id_proyecto, $id_usuario);
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id_proyecto}/tareas/{id_usuario}/{pagina}", function($id_proyecto, $id_usuario, $pagina) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerTareasPaginado($id_proyecto, $id_usuario, $pagina);
    echo json_encode($resultado);
});

$router->add("GET", "tarea/{id_tarea}", function($id_tarea) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerTareaId($id_tarea);
    echo json_encode($resultado);
});

$router->add("PUT", "tarea/{id_tarea}", function($id_tarea) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->completarTarea($id_tarea);
    echo json_encode(["modificado"=>$resultado]);
});




$router->run();