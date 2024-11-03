<?php
require_once __DIR__ . "/../models/proyecto.php";
require_once __DIR__ . "/../models/iteracion.php";
require_once __DIR__ . "/../models/vincularTabla.php";
require_once __DIR__ . "/../../config/BDConexion.php";

class GestorProyecto {
    private $conexion, $proyecto, $iteracion;

    function __construct() {
        $this->conexion = BDConexion::getInstancia();
        $this->proyecto = new Proyecto($this->conexion);
        $this->conexion->set_charset("utf8");
        $this->iteracion = new Iteracion($this->conexion);
    }

    public function obtenerTodosProyecto(){
        $resultado = $this->proyecto->obtenerTodosProyecto();
        return $resultado;
    }

    public function obtenerTodosProyectoLider($correo){
        $resultado = $this->proyecto->obtenerTodosProyectoLider($correo);
        return $resultado;
    }

    public function obtenerTodosProyectoDesarrollador($correo){
        $resultado = $this->proyecto->obtenerTodosProyectoDesarrollador($correo);
        return $resultado;
    }

    public function obtenerProyectoId($id_proyecto){
        $resultado = $this->proyecto->obtenerProyectoId($id_proyecto);
        $categorias = $this->proyecto->obtenerCategoriaProyectoId($id_proyecto);
        $participantes = $this->proyecto->obtenerParticipanteProyectoId($id_proyecto);
        $iteraciones = $this->proyecto->obtenerIteracionProyectoId($id_proyecto);
        $resultado["categorias"] = $categorias;
        $resultado["participantes"] = $participantes;
        $resultado["iteraciones"] = $iteraciones;
        return $resultado;
    }

    public function obtenerParticipanteNombre($nombre){
        $url = "http://localhost/Vesta/participante/". $nombre;
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  // Para obtener la respuesta como string

        // 6. Ejecutar la solicitud y obtener la respuesta
        $response = curl_exec($ch);

        // 7. Verificar si hubo un error
        if (curl_errno($ch)) {
           return curl_error($ch);
        } else {
            return $response;
        }

        // 8. Cerrar la conexión cURL
        curl_close($ch);
    }

    public function obtenerCategoriasGenerales(){
        $url = "http://localhost/Vesta/categoria/generales";
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  // Para obtener la respuesta como string

        $response = curl_exec($ch);
        
        if (curl_errno($ch)) {
            return curl_error($ch);
        } else {
            return $response;
        }
        
        curl_close($ch);
    }

    public function crearProyecto($data){
        $this->proyecto->setFechaInicio(null);
        $this->proyecto->setFechaFin(null);
        $comprobar = !empty($data["nombre"] && !empty($data["descripcion"])) && !empty($data["estado"]);
        if ($comprobar) {
            $this->proyecto->setNombre($data["nombre"]);
            $this->proyecto->setDescripcion($data["descripcion"]);
            $this->proyecto->setEstado($data["estado"]);
            if (!empty($data["fecha_inicio"])) {
                $this->proyecto->setFechaInicio($data["fecha_inicio"]);
                $this->proyecto->setFechaFin($data["fecha_fin"]);
            }
            $id_proyecto = $this->proyecto->crearProyecto();
            if (!empty($data["participantes"])) {
                foreach ($data["participantes"] as $participante) {
                    vincularTabla::crearVinculoAtributo($this->conexion,"proyecto_participante", "id_proyecto", "id_usuario", "rol", $id_proyecto,$participante["id_usuario"],$participante["rol"]);                    
                }
            }
            if (!empty($data["categorias"])) {
                foreach ($data["categorias"] as $categoria) {
                    $id_categoria = $categoria["id_categoria"];
                    vincularTabla::crearVinculo($this->conexion,"proyecto_categoria", "id_proyecto", "id_categoria", $id_proyecto, $id_categoria);                    
                }
            }

            if (!empty($data["iteraciones"])) {
                foreach ($data["iteraciones"] as $iteracion) {
                    $this->iteracion->setNombre($iteracion["nombre"]);
                    $this->iteracion->setFechaInicio($iteracion["fecha_inicio"]);
                    $this->iteracion->setFechaFin($iteracion["fecha_fin"]);
                    $this->iteracion->crearIteracion($id_proyecto);
                }
            }
            return !empty($id_proyecto);
        } else {
            return false;
        }
    }

    public function actualizarProyecto($id_proyecto, $data){
        $this->proyecto->setFechaInicio(null);
        $this->proyecto->setFechaFin(null);
        $comprobar = !empty($data["nombre"] && !empty($data["descripcion"])) && !empty($data["estado"]);
        if ($comprobar) {
            vincularTabla::eliminarVinculo($this->conexion,"proyecto_participante", "id_proyecto", $id_proyecto);
            vincularTabla::eliminarVinculo($this->conexion,"iteracion", "id_proyecto", $id_proyecto);
            
            $this->proyecto->setNombre($data["nombre"]);
            $this->proyecto->setDescripcion($data["descripcion"]);
            $this->proyecto->setEstado($data["estado"]);
            
            if (!empty($data["fecha_inicio"])) {
                $this->proyecto->setFechaInicio($data["fecha_inicio"]);
                $this->proyecto->setFechaFin($data["fecha_fin"]);
            }

            $resultado = $this->proyecto->actualizarProyecto($id_proyecto);
            if (!empty($data["participantes"])) {
                foreach ($data["participantes"] as $participante) {
                    vincularTabla::crearVinculoAtributo($this->conexion,"proyecto_participante", "id_proyecto", "id_usuario", "rol", $id_proyecto,$participante["id_usuario"],$participante["rol"]);                    
                }
            }

            if (!empty($data["iteraciones"])) {
                foreach ($data["iteraciones"] as $iteracion) {
                    $this->iteracion->setNombre($iteracion["nombre"]);
                    $this->iteracion->setFechaInicio($iteracion["fecha_inicio"]);
                    $this->iteracion->setFechaFin($iteracion["fecha_fin"]);
                    $this->iteracion->crearIteracion($id_proyecto);
                }
            }
            return $resultado;
        }
        else {
            return false;
        }
    }

    


}