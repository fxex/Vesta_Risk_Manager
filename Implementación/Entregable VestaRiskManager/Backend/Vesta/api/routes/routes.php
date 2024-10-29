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

$router->add("GET", "usuario", function() use ($controladorUsuario){
    $resultado = $controladorUsuario->obtenerTodosUsuarios(); 
    echo json_encode($resultado); // Retorna un json con todos los usuarios que tenga la base de datos.
});

$router->add("POST","usuario", function() use($controladorUsuario){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorUsuario->obtenerUsuarioCorreo($data["correo"]);
        echo json_encode(["validacion"=>!empty($resultado), "datos"=> $resultado]); 
    } else {
        echo json_encode(["validacion"=>false]);
    }
});

$router->add("POST","usuario/crear", function() use($controladorUsuario){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorUsuario->crearUsuario($data);
        echo json_encode(["creacion"=>$resultado]); 
    } else {
        echo json_encode(["creacion"=>false]);
    }
});

$router->add("POST", "usuario/modificar/{id}",function($id) use($controladorUsuario){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorUsuario->actualizarUsuario($id, $data);
        echo json_encode(["modificacion"=>$resultado]); 
    } else {
        echo json_encode(["modificacion"=>false]);
    }
});

$router->add("POST", "usuario/eliminar/{id}",function($id) use($controladorUsuario){
        $resultado = $controladorUsuario->eliminarUsuario($id);
        echo json_encode(["eliminado"=>$resultado]); 
});

$router->add("GET", "usuario/{id}", function($id) use($controladorUsuario) {
    $resultado = $controladorUsuario->obtenerUsuarioId($id);
    echo json_encode($resultado);
});

$router->add("GET", "perfil", function() use ($controladorUsuario){
    $resultado = $controladorUsuario->obtenerTodosPerfiles(); 
    echo json_encode($resultado); // Retorna un json con todos los usuarios que tenga la base de datos.
});

$router->add("POST","perfil/crear", function() use($controladorUsuario){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorUsuario->crearPerfil($data);
        echo json_encode(["creacion"=>$resultado]); 
    } else {
        echo json_encode(["creacion"=>false]);
    }
});

$router->add("POST", "perfil/modificar/{id}",function($id) use($controladorUsuario){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorUsuario->actualizarPerfil($id, $data);
        echo json_encode(["modificacion"=>$resultado]); 
    } else {
        echo json_encode(["modificacion"=>false]);
    }
});

$router->add("POST", "perfil/eliminar/{id}",function($id) use($controladorUsuario){
    $resultado = $controladorUsuario->eliminarPerfil($id);
    echo json_encode(["eliminado"=>$resultado]); 
});


$router->add("GET", "perfil/{id}", function($id) use($controladorUsuario) {
    $resultado = $controladorUsuario->obtenerPerfilId($id);
    echo json_encode($resultado);
});


$router->add("GET", "permiso", function() use ($controladorUsuario){
    $resultado = $controladorUsuario->obtenerTodosPermisos(); 
    echo json_encode($resultado); 
});

$router->add("POST","participante", function() use($controladorUsuario){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorUsuario->obtenerUsuariosNombre($data["nombre"]);
        echo json_encode($resultado); 
    } else {
        echo json_encode(null);
    }
});

$router->add("GET","participante/{nombre}", function($nombre) use($controladorUsuario){
    $resultado = $controladorUsuario->obtenerIdUsuarioNombre(urldecode($nombre));
    echo json_encode($resultado); 
});

// Rutas para el Gestor de Proyecto

$router->add("GET", "proyecto", function() use ($controladorProyecto){
    $resultado = $controladorProyecto->obtenerTodosProyecto(); 
    echo json_encode($resultado);
});

$router->add("GET","proyecto/categorias", function() use($controladorProyecto){
    $resultado = $controladorProyecto->obtenerCategoriasGenerales();
    echo json_encode($resultado); 
});

$router->add("POST","proyecto", function() use($controladorProyecto){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorProyecto->obtenerParticipanteNombre($data);
        echo json_encode($resultado); 
    } else {
        echo json_encode(null);
    }
});

$router->add("POST","proyecto/lider", function() use($controladorProyecto){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorProyecto->obtenerTodosProyectoLider($data["correo"]);
        echo json_encode($resultado); 
    } else {
        echo json_encode(null);
    }
});

$router->add("POST","proyecto/desarrollador", function() use($controladorProyecto){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorProyecto->obtenerTodosProyectoLider($data["correo"]);
        echo json_encode($resultado); 
    } else {
        echo json_encode(null);
    }
});

$router->add("POST","proyecto/crear", function() use($controladorProyecto){
    $body = file_get_contents('php://input'); // Obtiene el cuerpo de la peticion                
    if (!empty($body)) {
        $data = json_decode($body, true); // Genera un vector asociativo del json obtenido. Si no se pone el true, actua como un objeto
        $resultado = $controladorProyecto->crearProyecto($data);
        print_r($resultado);
    } else {
    }
});


$router->add("GET", "proyecto/{id}", function($id) use ($controladorProyecto){
    $resultado = $controladorProyecto->obtenerProyectoId($id); 
    echo json_encode($resultado);
});

$router->add("POST", "proyecto/modificar/{id}",function($id) use($controladorProyecto){
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




$router->run();