<?php
class Plan{
    private $tipo, $descripcion; 
    private $conexion;
    function __construct($conexion, $tipo = null, $descripcion = null) {
        $this->conexion = $conexion;
        $this->tipo = $tipo;
        $this->descripcion = $descripcion;
    }

    public function getTipo(){
        return $this->tipo;
    }
    public function setTipo($tipo){
        $this->tipo = $tipo;
    }

    public function getDescripcion(){
        return $this->descripcion;
    }
    public function setDescripcion($descripcion){
        $this->descripcion = $descripcion;
    }


    public function crearPlan($id_riesgo){
        $query = "INSERT INTO plan (descripcion, tipo, id_riesgo) values (?, ?, ?)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("ssi", $this->descripcion, $this->tipo, $id_riesgo);
        if ($stmt->execute()) {
            return $this->conexion->insert_id;
        } else {
            throw new Exception("Error al crear el plan: " . $stmt->error);
            return -1;
        }
    }

}