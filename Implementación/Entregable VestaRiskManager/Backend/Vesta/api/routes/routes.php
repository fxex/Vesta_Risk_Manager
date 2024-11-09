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


// Rutas para el Gestor de usuarios
// Usuarios
$router->add("GET", "usuarios", function() use ($controladorUsuario){
    $resultado = $controladorUsuario->obtenerTodosUsuarios(); 
    echo json_encode($resultado); // Retorna un json con todos los usuarios que tenga la base de datos.
});

$router->add("GET","usuario/{parametro}", function($parametro) use($controladorUsuario){
    $resultado = null;
    if (is_numeric($parametro)) {
        $resultado = $controladorUsuario->obtenerUsuarioId($parametro);
    }elseif (filter_var($parametro, FILTER_VALIDATE_EMAIL)) {
        $resultado = $controladorUsuario->obtenerUsuarioCorreo($parametro);
    }else{
        //TODO Modificar
    }
    echo json_encode($resultado);
    
});

$router->add("POST","usuario", function() use($controladorUsuario){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorUsuario->crearUsuario($data);
        echo json_encode(["creacion"=>$resultado]); 
    } else {
        echo json_encode(["creacion"=>false]);
    }
});

$router->add("PUT", "usuario/{id}",function($id) use($controladorUsuario){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorUsuario->actualizarUsuario($id, $data);
        echo json_encode(["modificacion"=>$resultado]); 
    } else {
        echo json_encode(["modificacion"=>false]);
    }
});

$router->add("DELETE", "usuario/{id}",function($id) use($controladorUsuario){
        $resultado = $controladorUsuario->eliminarUsuario($id);
        echo json_encode(["eliminado"=>$resultado]); 
});


$router->add("GET", "perfiles", function() use ($controladorUsuario){
    $resultado = $controladorUsuario->obtenerTodosPerfiles(); 
    echo json_encode($resultado); // Retorna un json con todos los usuarios que tenga la base de datos.
});

$router->add("POST","perfil", function() use($controladorUsuario){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorUsuario->crearPerfil($data);
        echo json_encode(["creacion"=>$resultado]); 
    } else {
        echo json_encode(["creacion"=>false]);
    }
});

$router->add("PUT", "perfil/{id}",function($id) use($controladorUsuario){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorUsuario->actualizarPerfil($id, $data);
        echo json_encode(["modificacion"=>$resultado]); 
    } else {
        echo json_encode(["modificacion"=>false]);
    }
});

$router->add("DELETE", "perfil/{id}",function($id) use($controladorUsuario){
    $resultado = $controladorUsuario->eliminarPerfil($id);
    echo json_encode(["eliminado"=>$resultado]); 
});


$router->add("GET", "perfil/{id}", function($id) use($controladorUsuario) {
    $resultado = $controladorUsuario->obtenerPerfilId($id);
    echo json_encode($resultado);
});

$router->add("GET","perfil/comprobar/{nombre}", function($nombre) use($controladorUsuario){
    $resultado = $controladorUsuario->obtenerPerfilNombre(urldecode($nombre));
    echo json_encode($resultado); 
});

$router->add("GET", "permisos", function() use ($controladorUsuario){
    $resultado = $controladorUsuario->obtenerTodosPermisos(); 
    echo json_encode($resultado); 
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




$router->run();