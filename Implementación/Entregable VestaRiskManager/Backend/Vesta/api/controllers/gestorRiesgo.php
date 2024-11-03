<?php
require_once __DIR__ . "/../models/categoria.php";
require_once __DIR__ . "/../models/riesgo.php";
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
        return $resultado;
    }


}