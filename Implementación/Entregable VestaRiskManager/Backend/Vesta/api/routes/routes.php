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
$router->add("GET", "usuarios", function() use ($controladorUsuario){
    $validado = validarJWT($controladorUsuario);
    if ($validado) {
        $resultado = $controladorUsuario->obtenerTodosUsuarios(); 
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

$router->add("POST","perfil", function() use($controladorUsuario){
    $validado = validarJWT($controladorUsuario);
    if ($validado) {
        $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
        if (!empty($body)) {
            $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
            $resultado = $controladorUsuario->crearPerfil($data);
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

$router->add("PUT", "perfil/{id}",function($id) use($controladorUsuario){
    $validado = validarJWT($controladorUsuario);
    if ($validado) {
        $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
        if (!empty($body)) {
            $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
            $resultado = $controladorUsuario->actualizarPerfil($id, $data);
            echo json_encode(["modificacion"=>$resultado]); 
        } else {
            echo json_encode(["modificacion"=>false]);
        }
    } else {
        header('HTTP/1.1 403 Forbidden');
        echo json_encode([
            "error" => "No tienes permisos para realizar esta acción o el token es inválido."
        ]);
    }
});

$router->add("DELETE", "perfil/{id}",function($id) use($controladorUsuario){
    $validado = validarJWT($controladorUsuario);
    if ($validado) {
        $resultado = $controladorUsuario->eliminarPerfil($id);
        echo json_encode(["eliminado"=>$resultado]); 
    } else {
        header('HTTP/1.1 403 Forbidden');
        echo json_encode([
            "error" => "No tienes permisos para realizar esta acción o el token es inválido."
        ]);
    }
    
});


$router->add("GET", "perfil/{id}", function($id) use($controladorUsuario) {
    $validado = validarJWT($controladorUsuario);
    if ($validado) {
        $resultado = $controladorUsuario->obtenerPerfilId($id);
        echo json_encode($resultado);
    } else {
        header('HTTP/1.1 403 Forbidden');
        echo json_encode([
            "error" => "No tienes permisos para realizar esta acción o el token es inválido."
        ]);
    }
    
});

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

$router->add("GET", "permisos", function() use ($controladorUsuario){
    $validado = validarJWT($controladorUsuario);
    if ($validado) {
        $resultado = $controladorUsuario->obtenerTodosPermisos(); 
        echo json_encode($resultado); 
    }else{
        header('HTTP/1.1 403 Forbidden');
        echo json_encode([
            "error" => "No tienes permisos para realizar esta acción o el token es inválido."
        ]);
    }
});


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
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorProyecto->obtenerTodosProyectoLider($data["correo"]);
        echo json_encode($resultado); 
    } else {
        echo json_encode(null);
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

$router->add("POST","proyecto", function() use($controladorProyecto){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorProyecto->crearProyecto($data);
        echo json_encode(["creacion"=>$resultado]);
    } else {
        echo json_encode(["creacion"=>false]);
    }
});

$router->add("GET", "proyecto/{id}", function($id) use ($controladorProyecto){
    $resultado = $controladorProyecto->obtenerProyectoId($id); 
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id}/iteracion", function($id) use ($controladorProyecto){
    $resultado = $controladorProyecto->obtenerIteracionActual($id); 
    echo json_encode($resultado);
});

$router->add("PUT", "proyecto/{id}",function($id) use($controladorProyecto){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
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

$router->add("GET", "proyecto/{id_proyecto}/riesgos", function($id_proyecto) use ($controladorRiesgo){
    $resultado = $controladorRiesgo->obtenerRiesgoProyecto($id_proyecto);
    echo json_encode($resultado);
});


$router->add("POST", "proyecto/{id_proyecto}/riesgo", function($id_proyecto) use ($controladorRiesgo){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        
        $resultado = $controladorRiesgo->crearRiesgo($id_proyecto, $data);
        echo json_encode(["creacion"=>$resultado]);
    } else {
        echo json_encode(["creacion"=>false]);
    }
});

$router->add("PUT", "proyecto/{id_proyecto}/riesgo/{id_riesgo}", function($id_proyecto, $id_riesgo) use ($controladorRiesgo){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true);
        $resultado = $controladorRiesgo->actualizarRiesgo($id_riesgo, $data);
        echo json_encode(["modificado"=>$resultado]);
    } else {
        echo json_encode(["modificado"=>false]);
    }
});

$router->add("GET", "proyecto/{id_proyecto}/riesgo/{id_riesgo}", function($id_proyecto, $id_riesgo) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerRiesgoId($id_riesgo);
    echo json_encode($resultado);
});

$router->add("POST", "proyecto/{id_proyecto}/riesgo/{id_riesgo}/evaluacion", function($id_proyecto, $id_riesgo) use ($controladorRiesgo){
    $body = file_get_contents('php://input');          
    if (!empty($body)) {
        $data = json_decode($body, true);
        $resultado = $controladorRiesgo->crearEvaluacion($id_riesgo, $data);
        echo json_encode(["creacion"=>$resultado]);
    } else {
        echo json_encode(["creacion"=>false]);
    }
});

$router->add("POST", "proyecto/{id_proyecto}/riesgo/{id_riesgo}/plan", function($id_proyecto, $id_riesgo) use ($controladorRiesgo, $controladorUsuario){
    $validado = validarJWT($controladorUsuario);
    if ($validado) {
        $body = file_get_contents('php://input');          
        if (!empty($body)) {
            $data = json_decode($body, true);
            $resultado = $controladorRiesgo->crearPlan($id_riesgo, $data);
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

$router->add("GET", "proyecto/{id_proyecto}/riesgo/{id_riesgo}/plan/tipo/cantidad", function($id_proyecto, $id_riesgo) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerCantidadPlanes($id_proyecto, $id_riesgo);
    echo json_encode($resultado);
});


$router->add("GET", "proyecto/{id_proyecto}/planes", function($id_proyecto) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerPlanesIteracion($id_proyecto);
    echo json_encode($resultado);
});

$router->add("GET", "proyecto/{id_proyecto}/plan/{id_plan}", function($id_proyecto, $id_plan) use ($controladorRiesgo){ 
    $resultado = $controladorRiesgo->obtenerPlanId($id_plan, $id_proyecto);
    echo json_encode($resultado);
});

$router->add("PUT", "proyecto/{id_proyecto}/plan/{id_plan}", function($id_proyecto, $id_plan) use ($controladorRiesgo){ 
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true);
        $resultado = $controladorRiesgo->actualizarPlan($id_plan, $data);
        echo json_encode(["modificado"=>$resultado]);
    } else {
        echo json_encode(["modificado"=>false]);
    }
});



$router->run();