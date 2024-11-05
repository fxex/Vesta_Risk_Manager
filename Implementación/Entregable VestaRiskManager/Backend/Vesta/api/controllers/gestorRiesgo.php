<?php
require_once __DIR__ . "/../models/categoria.php";
require_once __DIR__ . "/../models/riesgo.php";
require_once __DIR__ . "/../models/vincularTabla.php";
require_once __DIR__ . "/../../config/BDConexion.php";

class GestorRiesgo {
    private $conexion, $riesgo, $categoria;

    function __construct() {
        $this->conexion = BDConexion::getInstancia();
        $this->categoria = new Categoria($this->conexion);
        $this->riesgo = new Riesgo($this->conexion);
        $this->conexion->set_charset("utf8");
    }

    public function obtenerCategoriasGenerales(){
        $resultado = $this->categoria->obtenerCategoriasGenerales();
        return $resultado;
    }

    public function obtenerRiesgoProyecto($id_proyecto){
        $resultado = $this->riesgo->obtenerRiesgoProyecto($id_proyecto);
        foreach ($resultado as &$riesgo) {
            $riesgo["responsables"] = $this->riesgo->obtenerParticipantesRiesgo($riesgo["id_riesgo"]);
        }
        return $resultado;
    }

    public function crearRiesgo($id_proyecto, $data){
        $comprobar = !empty($data["descripcion"]) && !empty($data["categoria"]) && !empty($data["responsables"]) && is_numeric($data["categoria"]);
        if ($comprobar) {
            $this->riesgo->setDescripcion($data["descripcion"]);
            $id_riesgo = $this->riesgo->crearRiesgo($data["categoria"]);
            vincularTabla::crearVinculo($this->conexion, "proyecto_riesgo", "id_proyecto", "id_riesgo",$id_proyecto, $id_riesgo);
            foreach ($data["responsables"] as $id_usuario) {
                vincularTabla::crearVinculo($this->conexion, "participante_riesgo", "id_usuario", "id_riesgo",$id_usuario, $id_riesgo);
            }
            return $id_riesgo > 0;
        }else{
            return false;
        }
    }


}