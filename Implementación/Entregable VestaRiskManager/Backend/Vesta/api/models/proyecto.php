<?php
class Proyecto{
    private $nombre, $descripcion, $estado, $fecha_inicio, $fecha_fin;
    // private $iteraciones, $participantes, $riesgos, $categorias;
    private $conexion;

    function __construct($conexion, $nombre=null, $descripcion=null, $estado=null, $fecha_inicio=null, $fecha_fin=null) {
        $this->conexion = $conexion;
        $this->nombre = $nombre;
        $this->descripcion = $descripcion;
        $this->estado = $estado;
        $this->fecha_inicio = $fecha_inicio;
        $this->fecha_fin = $fecha_fin;
        // $this->iteraciones = $iteraciones;
        // $this->participantes = $participantes;
        // $this->riesgos = $riesgos;
        // $this->categorias = $categorias;
    }

    public function getNombre(){
        return $this->nombre;
    }
    public function getDescripcion(){
        return $this->descripcion;
    }
    public function getEstado(){
        return $this->estado;
    }
    public function getFechaInicio(){
        return $this->fecha_inicio;
    }
    public function getFechaFin(){
        return $this->fecha_fin;
    }
    // public function getIteraciones(){
    //     return $this->iteraciones;
    // }
    // public function getParticipantes(){
    //     return $this->participantes;
    // }
    // public function getRiesgos(){
    //     return $this->riesgos;
    // }
    // public function getCategorias(){
    //     return $this->categorias;
    // }

    public function setNombre($nombre){
        $this->nombre = $nombre;
    }
    public function setDescripcion($descripcion){
        $this->descripcion = $descripcion;
    }
    public function setEstado($estado){
        $this->estado = $estado;
    }
    public function setFechaInicio($fecha_inicio){
        $this->fecha_inicio = $fecha_inicio;
    }
    public function setFechaFin($fecha_fin){
        $this->fecha_fin = $fecha_fin;
    }
    // public function setIteraciones($iteraciones){
    //     $this->iteraciones = $iteraciones;
    // }
    // public function setParticipantes($participantes){
    //     $this->participantes = $participantes;
    // }
    // public function setRiesgos($riesgos){
    //     $this->riesgos = $riesgos;
    // }
    // public function setCategorias($categorias){
    //     $this->categorias = $categorias;
    // }

    public function obtenerTodosProyecto(){
        $proyectos = $this->conexion->query("select * from proyecto");
        $resultado = [];
        while ($fila = $proyectos->fetch_assoc()) {
            $resultado[] = $fila;
        }
        return $resultado;
    }

    public function crearProyecto(){
        $query = "INSERT INTO proyecto (nombre, descripcion, estado, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("sssss", $this->nombre, $this->descripcion, $this->estado, $this->fecha_inicio, $this->fecha_fin);
        if ($stmt->execute()) {
            return $this->conexion->insert_id;
        } else {
            throw new Exception("Error al crear el usuario: " . $stmt->error);
        }
    }
}
