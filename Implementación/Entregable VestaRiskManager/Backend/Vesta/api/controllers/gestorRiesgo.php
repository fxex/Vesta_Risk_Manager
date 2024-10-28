<?php
require_once __DIR__ . "/../models/categoria.php";
require_once __DIR__ . "/../../config/BDConexion.php";

class GestorRiesgo {
    private $conexion, $categoria;

    function __construct() {
        $this->conexion = BDConexion::getInstancia();
        $this->categoria = new Categoria($this->conexion);
        $this->conexion->set_charset("utf8");
        // $this->iteracion = new Iteracion($this->conexion);
    }

    public function obtenerCategoriasGenerales(){
        $resultado = $this->categoria->obtenerCategoriasGenerales();
        return $resultado;
    }


}