<?php
class Incidencia{
    private $gravedad, $descripcion; 
    private $conexion;
    function __construct($conexion, $gravedad = null, $descripcion = null) {
        $this->conexion = $conexion;
        $this->gravedad = $gravedad;
        $this->descripcion = $descripcion;
    }

    public function getGravedad(){
        return $this->gravedad;
    }
    public function setGravedad($gravedad){
        $this->gravedad = $gravedad;
    }

    public function getDescripcion(){
        return $this->descripcion;
    }
    public function setDescripcion($descripcion){
        $this->descripcion = $descripcion;
    }


    public function crearIncidencia($id_proyecto, $id_riesgo, $id_usuario){
        $query = "INSERT INTO incidencia (descripcion, gravedad, id_riesgo, id_proyecto, id_usuario) values (?, ?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("ssiii", $this->descripcion, $this->gravedad, $id_riesgo, $id_proyecto, $id_usuario);
        if ($stmt->execute()) {
            return $this->conexion->insert_id;
        } else {
            throw new Exception("Error al crear el plan: " . $stmt->error);
            return -1;
        }
    }

    public function obtenerTodasIncidencia($id_proyecto){
        $query = "select i.id_incidencia, i.descripcion, i.gravedad, i.fecha_ocurrencia, i.id_riesgo, u.nombre as responsable from incidencia i inner join usuario u on i.id_usuario = u.id_usuario where id_proyecto = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_proyecto);
        $stmt->execute();
        $incidencias = $stmt->get_result();
        $resultado = [];
        while ($fila = $incidencias->fetch_assoc()) {
            $resultado[] = $fila;
        }
        return $resultado;
    }

    public function obtenerTodasIncidenciaUsuario($id_proyecto, $id_usuario){
        $query = "select i.id_incidencia, i.descripcion, i.gravedad, i.fecha_ocurrencia, i.id_riesgo, u.nombre as responsable from incidencia i inner join usuario u on i.id_usuario = u.id_usuario where id_proyecto = ? and id_usuario = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("ii", $id_proyecto, $id_usuario);
        $stmt->execute();
        $incidencias = $stmt->get_result();
        $resultado = [];
        while ($fila = $incidencias->fetch_assoc()) {
            $resultado[] = $fila;
        }
        return $resultado;
    }
}