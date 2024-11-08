<?php
require_once __DIR__ . "/../models/categoria.php";
require_once __DIR__ . "/../models/riesgo.php";
require_once __DIR__ . "/../models/evaluacion.php";
require_once __DIR__ . "/../models/vincularTabla.php";
require_once __DIR__ . "/../../config/BDConexion.php";

class GestorRiesgo {
    private $conexion, $riesgo, $categoria, $evaluacion;

    function __construct() {
        $this->conexion = BDConexion::getInstancia();
        $this->categoria = new Categoria($this->conexion);
        $this->riesgo = new Riesgo($this->conexion);
        $this->evaluacion = new Evaluacion($this->conexion);
        $this->conexion->set_charset("utf8");
    }

    public function obtenerCategoriasGenerales(){
        $resultado = $this->categoria->obtenerCategoriasGenerales();
        return $resultado;
    }

    public function obtenerRiesgoProyecto($id_proyecto){
        $resultado = $this->riesgo->obtenerRiesgoProyecto($id_proyecto);
        $iteracion = json_decode($this->obtenerIteracionActual($id_proyecto), true);
        if (!empty($resultado)) {
            foreach ($resultado as &$riesgo) {
                $riesgo["responsables"] = $this->riesgo->obtenerParticipantesRiesgo($riesgo["id_riesgo"]);
                if (!empty($iteracion)) {
                    $cantidad = $this->riesgo->obtenerCantidadEvaluaciones($riesgo["id_riesgo"], $iteracion["id_iteracion"]);
                    if (!empty($cantidad)) {
                        $riesgo["evaluado"] = $cantidad["total_evaluaciones"] > 0;
                    }else{
                        $riesgo["evaluado"] = false;
                    }
                }
            }
        }
        return $resultado;
    }

    public function crearRiesgo($id_proyecto, $data){
        $comprobar = !empty($data["descripcion"]) && !empty($data["categoria"]) && !empty($data["responsables"]) && is_numeric($data["categoria"]);
        if ($comprobar) {
            $this->riesgo->setFactorRiesgo(null);
            $this->riesgo->setDescripcion($data["descripcion"]);
            $id_riesgo = $this->riesgo->crearRiesgo($data["categoria"]);
            vincularTabla::crearVinculo($this->conexion, "proyecto_riesgo", "id_proyecto", "id_riesgo",$id_proyecto, $id_riesgo);
            foreach ($data["responsables"] as $id_usuario) {
                vincularTabla::crearVinculo($this->conexion, "participante_riesgo", "id_usuario", "id_riesgo",$id_usuario, $id_riesgo);
            }
            return $id_riesgo > 0;
        }else{
            return false;
        }
    }

    public function crearEvaluacion($id_riesgo, $data){
        $comprobar = !empty($data["descripcion"]) && !empty($data["impacto"]) && !empty($data["probabilidad"]) && is_numeric($data["impacto"]) && is_numeric($data["probabilidad"]) && !empty("responsable") && !empty($data["id_iteracion"]);
        if ($comprobar) {
            $this->evaluacion->setDescripcion($data["descripcion"]);
            $this->evaluacion->setImpacto($data["impacto"]);
            $this->evaluacion->setProbabilidad($data["probabilidad"]);
            $this->evaluacion->setFechaRealizacion(date("Y-m-d H:i:s"));
            $id_evaluacion = $this->evaluacion->crearEvaluacion($data["responsable"], $id_riesgo);
            vincularTabla::crearVinculo($this->conexion, "iteracion_evaluacion", "id_iteracion", "id_evaluacion",$data["id_iteracion"], $id_evaluacion);
            $factorRiesgo = $data["impacto"] * $data["probabilidad"];
            $this->riesgo->setFactorRiesgo($factorRiesgo);
            $this->riesgo->actualizarFactorRiesgo($id_riesgo);
            return $id_evaluacion > 0;
        }else{
            return false;
        }
    }

    public function obtenerRiesgoId($id_riesgo){
        $resultado = $this->riesgo->obtenerRiesgoId($id_riesgo);
        return $resultado;
    }


    public function obtenerIteracionActual($id_proyecto){
        $url = "http://localhost/Vesta/proyecto/". $id_proyecto . "/iteracion";
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  // Para obtener la respuesta como string

        $response = curl_exec($ch);
        
        if (curl_errno($ch)) {
            return curl_error($ch);
        } else {
            return $response;
        }
        
        curl_close($ch);
    }

}