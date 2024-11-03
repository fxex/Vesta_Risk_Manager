<?php
class Riesgo {
    private $descripcion, $factor_riesgo, $fecha_creacion;
    private $conexion;

    function __construct($conexion, $descripcion = null, $factor_riesgo = null, $fecha_creacion = null) {
        $this->conexion = $conexion;
        $this->descripcion = $descripcion;
        $this->factor_riesgo = $factor_riesgo;
        $this->fecha_creacion = $fecha_creacion;
    }
    
    public function getDescripcion(){
        return $this->descripcion;
    }

    public function getFactorRiesgo(){
        return $this->factor_riesgo;
    }
    
    public function getFechaCreacion(){
        return $this->fecha_creacion;
    }

    public function setDescripcion($descripcion){
        $this->descripcion = $descripcion;
    }

    public function setFactorRiesgo($factor_riesgo){
        $this->factor_riesgo = $factor_riesgo;
    }

    public function setFechaCreacion($fecha_creacion){
        $this->fecha_creacion = $fecha_creacion;
    }

    public function obtenerRiesgoProyecto($id_proyecto){
        $query = "SELECT r.* FROM riesgo r inner join proyecto_riesgo pr on pr.id_riesgo = r.id_riesgo where pr.id_proyecto = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_proyecto);
        $stmt->execute();
        $riesgos = $stmt->get_result(); 
        $resultado = [];
        while ($fila = $riesgos->fetch_assoc()) {
            $resultado[] = $fila;
        }
        return $resultado;
    }
}
