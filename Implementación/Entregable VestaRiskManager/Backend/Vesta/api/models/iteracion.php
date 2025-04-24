<?php
class Iteracion{
    private $nombre, $fecha_inicio, $fecha_fin;
    private $conexion;

    function __construct($conexion, $nombre = null, $fecha_inicio = null, $fecha_fin = null) {
        $this->conexion = $conexion;
        $this->nombre = $nombre;
        $this->fecha_inicio = $fecha_inicio;
        $this->fecha_fin = $fecha_fin;
    }

    public function getNombre(){
        return $this->nombre;
    }
    public function getFechaInicio(){
        return $this->fecha_inicio;
    }
    public function getFechaFin(){
        return $this->fecha_fin;
    }

    public function setNombre($nombre){
        $this->nombre = $nombre;
    }
    public function setFechaInicio($fecha_inicio){
        $this->fecha_inicio = $fecha_inicio;
    }
    public function setFechaFin($fecha_fin){
        $this->fecha_fin = $fecha_fin;
    }

    public function crearIteracion($id_proyecto){
        $query = "INSERT INTO iteracion (nombre, fecha_inicio, fecha_fin, id_proyecto) VALUES (?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("sssi", $this->nombre, $this->fecha_inicio, $this->fecha_fin, $id_proyecto);
        if ($stmt->execute()) {
            return $this->conexion->insert_id;
        } else {
            throw new Exception("Error al crear el usuario: " . $stmt->error);
            return -1;
        }
    }

    public function actualizarIteracion($id_iteracion, $id_proyecto){
        $query = "UPDATE iteracion SET nombre = ?, fecha_inicio = ?, fecha_fin = ? WHERE id_iteracion = ? and id_proyecto = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("sssii", $this->nombre, $this->fecha_inicio, $this->fecha_fin, $id_iteracion, $id_proyecto);
        if ($stmt->execute()) {
            return true;
        } else {
            throw new Exception("Error al crear el usuario: " . $stmt->error);
            return false;
        }
    }

    public function eliminarIteracion($id_iteracion) {
        $query = "DELETE FROM iteracion WHERE id_iteracion = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_iteracion);

        if ($stmt->execute()) {
            return true;
        }else{
            throw new Exception("Error al eliminar el usuario: " . $stmt->error);
            return false;
        }
    }

}
