<?php
class Evaluacion {
    private $descripcion, $impacto, $probabilidad, $fecha_realizacion;
    private $conexion;

    function __construct($conexion, $descripcion = null, $impacto = null, $probabilidad = null, $fecha_realizacion = null) {
        $this->conexion = $conexion;
        $this->descripcion = $descripcion;
        $this->impacto = $impacto;
        $this->probabilidad = $probabilidad;
        $this->fecha_realizacion = $fecha_realizacion;
    }
    
    public function getDescripcion(){
        return $this->descripcion;
    }

    public function getImpacto(){
        return $this->impacto;
    }
    
    public function getProbabilidad(){
        return $this->probabilidad;
    }
    
    public function getFechaRealizacion(){
        return $this->fecha_realizacion;
    }

    public function setDescripcion($descripcion){
        $this->descripcion = $descripcion;
    }

    public function setImpacto($impacto){
        $this->impacto = $impacto;
    }

    public function setProbabilidad($probabilidad){
        $this->probabilidad = $probabilidad;
    }

    public function setFechaRealizacion($fecha_realizacion){
        $this->fecha_realizacion = $fecha_realizacion;
    }

    public function crearEvaluacion($id_usuario, $id_riesgo, $id_proyecto, $id_iteracion){
        $query = "INSERT INTO evaluacion (descripcion, impacto, probabilidad, fecha_realizacion, id_usuario, id_riesgo, id_proyecto, id_iteracion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("siisiiii", $this->descripcion, $this->impacto, $this->probabilidad, $this->fecha_realizacion, $id_usuario, $id_riesgo, $id_proyecto, $id_iteracion);
        if ($stmt->execute()) {
            return $this->conexion->insert_id;
        } else {
            throw new Exception("Error al crear el usuario: " . $stmt->error);
            return -1;
        }
    }
}
