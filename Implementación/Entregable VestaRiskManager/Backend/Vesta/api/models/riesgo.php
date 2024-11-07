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
        $query = "SELECT r.*, c.nombre as nombre_categoria FROM riesgo r 
        inner join proyecto_riesgo pr on pr.id_riesgo = r.id_riesgo 
        inner join proyecto p on pr.id_proyecto = p.id_proyecto
        inner join categoria c on r.id_categoria = c.id_categoria 
        where pr.id_proyecto = ?";
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

    public function obtenerParticipantesRiesgo($id_riesgo){
        $query = "SELECT u.* FROM participante_riesgo pr inner join usuario u on pr.id_usuario = u.id_usuario WHERE pr.id_riesgo = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_riesgo);
        $stmt->execute();
        $participantes   = $stmt->get_result();
        
        $resultado = [];
        while ($fila = $participantes->fetch_assoc()) {
            $resultado[] = $fila;
        }
        return $resultado;
    }

    public function crearRiesgo($id_categoria){
        $query = "INSERT INTO riesgo (descripcion, id_categoria) VALUES (?, ?)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("si", $this->descripcion, $id_categoria);
        if ($stmt->execute()) {
            return $this->conexion->insert_id;
        } else {
            throw new Exception("Error al crear el usuario: " . $stmt->error);
            return -1;
        }
    }
    public function obtenerRiesgoId($id_riesgo){
        $query = "SELECT r.*, c.nombre as nombre_categoria FROM riesgo r 
        inner join categoria c on r.id_categoria = c.id_categoria 
        where r.id_riesgo = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_riesgo);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc(); 
        return $resultado;
    }

    public function actualizarFactorRiesgo($id_riesgo) {
        $query = "UPDATE riesgo SET factor_riesgo= ? WHERE id_riesgo = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("ii", $this->factor_riesgo, $id_riesgo);
        if ($stmt->execute()) {
            return true;
        }else{
            throw new Exception("Error al crear la evaluación: " . $stmt->error);
            return false;
        }   
    }

    public function obtenerCantidadEvaluaciones($id_riesgo, $id_iteracion){
        $query = "SELECT r.id_riesgo, count(e.id_evaluacion) as total_evaluaciones from riesgo r 
                    left join evaluacion e on r.id_riesgo = e.id_riesgo 
                    inner join iteracion_evaluacion ie on e.id_evaluacion = ie.id_evaluacion
                    where ie.id_iteracion = ? and r.id_riesgo = ?
                    group by r.id_riesgo"; 
    }
}
