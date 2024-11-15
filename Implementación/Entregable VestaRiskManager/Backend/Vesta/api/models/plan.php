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

    public function obtenerPlanesIteracion($id_iteracion){
        $query = "SELECT p.*, r.id_riesgo, r.factor_riesgo FROM plan p 
                inner join riesgo r on p.id_riesgo = r.id_riesgo 
                inner join proyecto_riesgo pr on pr.id_riesgo = r.id_riesgo
                inner join iteracion i on i.id_proyecto = pr.id_proyecto
                where i.id_iteracion = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i",$id_iteracion);
        $stmt->execute();
        $planes = $stmt->get_result(); 
        $resultado = [];
        while ($fila = $planes->fetch_assoc()) {
            $resultado[] = $fila;
        }
        return $resultado;
    }

    public function obtenerPlanId($id_plan){
        $query = "SELECT * FROM plan where id_plan = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i",$id_plan);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc(); 
        return $resultado;
    }

    public function obtenerTareasPlan($id_plan) {
        $query = "SELECT * from tarea where id_plan = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_plan);
        $stmt->execute();
        $participantes   = $stmt->get_result();
        
        $resultado = [];
        while ($fila = $participantes->fetch_assoc()) {
            $resultado[] = $fila;
        }
        return $resultado;
    }

    public function actualizarPlan($id_plan){
        $query = "UPDATE plan set descripcion = ?, tipo = ? where id_plan = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("ssi", $this->descripcion, $this->tipo, $id_plan);
        if ($stmt->execute()) {
            return true;
        } else {
            throw new Exception("Error al crear el usuario: " . $stmt->error);
            return false;
        }
    }

}