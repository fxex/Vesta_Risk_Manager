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

    public function obtenerRiesgoProyecto($id_proyecto, $id_iteracion){
        $query = "SELECT 
                        r.id_riesgo, 
                        r.descripcion, 
                        r.factor_riesgo, 
                        c.nombre AS nombre_categoria,
                        GROUP_CONCAT(DISTINCT u.nombre ORDER BY u.nombre SEPARATOR ', ') AS responsables,
                        COUNT(DISTINCT e.id_evaluacion) AS evaluado
                    FROM riesgo r
                    INNER JOIN categoria c ON r.id_categoria = c.id_categoria
                    LEFT JOIN participante_riesgo pr ON r.id_riesgo = pr.id_riesgo
                    LEFT JOIN usuario u ON pr.id_usuario = u.id_usuario
                    LEFT JOIN evaluacion e ON r.id_riesgo = e.id_riesgo AND e.id_iteracion = ?
                    WHERE r.id_proyecto = ?
                    GROUP BY r.id_riesgo, r.descripcion, r.factor_riesgo, c.nombre;
                    ";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("ii", $id_iteracion, $id_proyecto);
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

    public function crearRiesgo($id_proyecto, $id_categoria){
        $query = "INSERT INTO riesgo (descripcion, id_categoria, id_proyecto) VALUES (?, ?, ?)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("sii", $this->descripcion, $id_categoria, $id_proyecto);
        if ($stmt->execute()) {
            $query_max = "SELECT MAX(id_riesgo) FROM riesgo WHERE id_proyecto = ?";
            $stmt_max = $this->conexion->prepare($query_max);
            $stmt_max->bind_param("i", $id_proyecto);
            $stmt_max->execute();
            $stmt_max->bind_result($id_riesgo);
            $stmt_max->fetch();
            $stmt_max->close();
            return $id_riesgo;
        } else {
            throw new Exception("Error al crear el usuario: " . $stmt->error);
            return -1;
        }
    }

    public function actualizarRiesgo($id_riesgo, $id_categoria, $id_proyecto){
        $query = "UPDATE riesgo set descripcion = ?, id_categoria = ? where id_riesgo = ? and id_proyecto = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("siii", $this->descripcion, $id_categoria, $id_riesgo, $id_proyecto);
        if ($stmt->execute()) {
            return true;
        } else {
            throw new Exception("Error al crear el usuario: " . $stmt->error);
            return false;
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
         $stmt = $this->conexion->prepare($query);
         $stmt->bind_param("ii",$id_iteracion, $id_riesgo);
         $stmt->execute();
         $resultado = $stmt->get_result()->fetch_assoc(); 
         return $resultado;
    }

    public function obtenerCantidadPlanes($id_proyecto, $id_riesgo, $id_iteracion){
        $query = "SELECT r.id_riesgo,
                SUM(CASE WHEN p.tipo = 'minimizacion' THEN 1 ELSE 0 END) AS total_minimizacion,
                SUM(CASE WHEN p.tipo = 'mitigacion' THEN 1 ELSE 0 END) AS total_mitigacion,
                SUM(CASE WHEN p.tipo = 'contingencia' THEN 1 ELSE 0 END) AS total_contingencia
                FROM riesgo r
                LEFT JOIN plan p ON r.id_riesgo = p.id_riesgo
                where p.id_iteracion = ? and r.id_riesgo = ? and r.id_proyecto = ?
                GROUP BY r.id_riesgo"; 
         $stmt = $this->conexion->prepare($query);
         $stmt->bind_param("iii",$id_iteracion, $id_riesgo, $id_proyecto);
         $stmt->execute();
         $resultado = $stmt->get_result()->fetch_assoc(); 
         return $resultado;
    }
}
