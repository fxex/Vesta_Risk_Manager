<?php
class Tarea{
    private $nombre, $descripcion, $estado, $fecha_inicio, $fecha_fin, $fecha_fin_real; 
    private $conexion;
    function __construct($conexion, $nombre = null, $descripcion = null, $estado = null, $fecha_inicio = null, $fecha_fin = null, $fecha_fin_real = null) {
        $this->conexion = $conexion;
        $this->nombre = $nombre;
        $this->descripcion = $descripcion;
        $this->estado = $estado;
        $this->fecha_inicio = $fecha_inicio;
        $this->fecha_fin = $fecha_fin;
        $this->fecha_fin_real = $fecha_fin_real;
    }

    public function getNombre(){
        return $this->nombre;
    }
    public function setNombre($nombre){
        $this->nombre = $nombre;
    }

    public function getDescripcion(){
        return $this->descripcion;
    }
    public function setDescripcion($descripcion){
        $this->descripcion = $descripcion;
    }

    public function getEstado(){
        return $this->estado;
    }
    public function setEstado($estado){
        $this->estado = $estado;
    }

    public function getFechaInicio(){
        return $this->fecha_inicio;
    }
    public function setFechaInicio($fecha_inicio){
        $this->fecha_inicio = $fecha_inicio;
    }

    public function getFechaFin(){
        return $this->fecha_fin;
    }
    public function setFechaFin($fecha_fin){
        $this->fecha_fin = $fecha_fin;
    }

    public function getFechaFinReal(){
        return $this->fecha_fin_real;
    }
    public function setFechaFinReal($fecha_fin_real){
        $this->fecha_fin_real = $fecha_fin_real;
    }

    public function crearTarea($id_plan){
        $query = "INSERT INTO tarea (nombre, descripcion, estado, fecha_inicio, fecha_fin, fecha_fin_real, id_plan) values (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("ssssssi", $this->nombre, $this->descripcion, $this->estado, $this->fecha_inicio, $this->fecha_fin, $this->fecha_fin_real, $id_plan);
        if ($stmt->execute()) {
            return $this->conexion->insert_id;
        } else {
            throw new Exception("Error al crear la tarea: " . $stmt->error);
            return -1;
        }
    }

}