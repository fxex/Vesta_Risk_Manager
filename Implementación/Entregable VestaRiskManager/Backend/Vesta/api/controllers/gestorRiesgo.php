<?php
require_once __DIR__ . "/../models/categoria.php";
require_once __DIR__ . "/../models/riesgo.php";
require_once __DIR__ . "/../models/evaluacion.php";
require_once __DIR__ . "/../models/plan.php";
require_once __DIR__ . "/../models/tarea.php";
require_once __DIR__ . "/../models/vincularTabla.php";
require_once __DIR__ . "/../../config/BDConexion.php";

class GestorRiesgo {
    private $conexion;
    private $riesgo, $categoria, $evaluacion, $plan, $tarea;

    function __construct() {
        $this->conexion = BDConexion::getInstancia();
        $this->categoria = new Categoria($this->conexion);
        $this->riesgo = new Riesgo($this->conexion);
        $this->evaluacion = new Evaluacion($this->conexion);
        $this->plan = new Plan($this->conexion);
        $this->tarea = new Tarea($this->conexion);
        $this->conexion->set_charset("utf8");
    }

    public function obtenerCategoriasGenerales(){
        $resultado = $this->categoria->obtenerCategoriasGenerales();
        return $resultado;
    }

    public function obtenerCategoriaId($id){
        $resultado = $this->categoria->obtenerCategoriaId($id);
        return $resultado;
    }


    public function obtenerRiesgoProyecto($id_proyecto){
        $iteracion = json_decode($this->obtenerIteracionActual($id_proyecto), true);
        $resultado = null;
        if (!empty($iteracion)) {
            $resultado = $this->riesgo->obtenerRiesgoProyecto($id_proyecto, $iteracion["id_iteracion"]);
        }else{
            $resultado = $this->riesgo->obtenerRiesgoProyecto($id_proyecto, 0);
        }
        if (!empty($resultado)) {
            foreach ($resultado as &$riesgo) {
                $riesgo["planes_realizado"] = $this->obtenerCantidadPlanes($id_proyecto, $riesgo["id_riesgo"]);
            }
        }
        return $resultado;
    }

    public function crearRiesgo($id_proyecto, $data){
        $comprobar = !empty($data["descripcion"]) && !empty($data["categoria"]) && !empty($data["responsables"]) && is_numeric($data["categoria"]);
        if ($comprobar) {
            $this->riesgo->setFactorRiesgo(null);
            $this->riesgo->setDescripcion($data["descripcion"]);
            $id_riesgo = $this->riesgo->crearRiesgo($id_proyecto, $data["categoria"]);
            foreach ($data["responsables"] as $id_usuario) {
                vincularTabla::crearVinculoRiesgo($this->conexion, "participante_riesgo", "id_usuario", "id_riesgo", "id_proyecto", $id_usuario, $id_riesgo, $id_proyecto);
            }
            return $id_riesgo > 0;
        }else{
            return false;
        }
    }

    public function crearEvaluacion($id_proyecto, $id_riesgo, $data){
        $comprobar = !empty($data["descripcion"]) && !empty($data["impacto"]) && !empty($data["probabilidad"]) && is_numeric($data["impacto"]) && is_numeric($data["probabilidad"]) && !empty("responsable") && !empty($data["id_iteracion"]);
        if ($comprobar) {
            $this->evaluacion->setDescripcion($data["descripcion"]);
            $this->evaluacion->setImpacto($data["impacto"]);
            $this->evaluacion->setProbabilidad($data["probabilidad"]);
            $this->evaluacion->setFechaRealizacion(date("Y-m-d H:i:s"));
            $id_evaluacion = $this->evaluacion->crearEvaluacion($data["responsable"], $id_riesgo, $id_proyecto, $data["id_iteracion"]);
            $factorRiesgo = $data["impacto"] * $data["probabilidad"];
            $this->riesgo->setFactorRiesgo($factorRiesgo);
            $this->riesgo->actualizarFactorRiesgo($id_riesgo);
            return $id_evaluacion > 0;
        }else{
            return false;
        }
    }

    public function actualizarRiesgo($id_riesgo, $data, $id_proyecto){
        $comprobar = !empty($data["descripcion"] && !empty($data["categoria"])) && !empty($data["responsables"]);
        if ($comprobar) {
            vincularTabla::eliminarVinculoRiesgo($this->conexion,"participante_riesgo", "id_proyecto","id_riesgo", $id_proyecto, $id_riesgo);
            $this->riesgo->setDescripcion($data["descripcion"]);
            $resultado = $this->riesgo->actualizarRiesgo($id_riesgo, $data["categoria"], $id_proyecto);
            foreach ($data["responsables"] as $id_usuario) {
                vincularTabla::crearVinculoRiesgo($this->conexion, "participante_riesgo", "id_usuario", "id_riesgo", "id_proyecto", $id_usuario, $id_riesgo, $id_proyecto);
            }
            return $resultado;
        }
        else {
            return false;
        }
    }

    public function obtenerRiesgoId($id_riesgo){
        $resultado = $this->riesgo->obtenerRiesgoId($id_riesgo);
        $responsables = $this->riesgo->obtenerParticipantesRiesgo($id_riesgo);
        foreach ($responsables as $responsable) {
            $resultado["responsables"][] = $responsable["id_usuario"];
        }
        
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

    public function obtenerCantidadPlanes($id_proyecto,$id_riesgo) {
        $iteracion = json_decode($this->obtenerIteracionActual($id_proyecto), true);
        if (!empty($iteracion)) {
            $resultado = $this->riesgo->obtenerCantidadPlanes($id_proyecto, $id_riesgo, $iteracion["id_iteracion"]);
            if (!empty($resultado)) {
                return $resultado;
            }else{
                return ["id_riesgo"=>$id_riesgo, "total_minimizacion"=>0, "total_mitigacion"=>0, "total_contingencia"=>0];
            }
        }else{
            return ["id_riesgo"=>$id_riesgo, "total_minimizacion"=>1, "total_mitigacion"=>1, "total_contingencia"=>1];
        }

    }
    

    public function crearPlan($id_proyecto, $id_riesgo, $data){
        $comprobar = !empty($data["descripcion"]) && !empty($data["tipo"]) && !empty($data["tareas"]) && !empty($data["id_iteracion"]);
        if ($comprobar) {
            $this->plan->setTipo($data["tipo"]);
            $this->plan->setDescripcion($data["descripcion"]);
            $id_plan = $this->plan->crearPlan($id_proyecto, $id_riesgo, $data["id_iteracion"]);
            foreach ($data["tareas"] as $tarea) {
                $this->tarea->setNombre($tarea["nombre"]);
                $this->tarea->setDescripcion($tarea["descripcion"]);
                $this->tarea->setEstado($tarea["estado"]);
                $this->tarea->setFechaInicio($tarea["fecha_inicio"]);
                $this->tarea->setFechaFin($tarea["fecha_fin"]);
                $id_tarea = $this->tarea->crearTarea($id_plan);
                foreach ($tarea["responsables"] as $responsable) {
                    vincularTabla::crearVinculo($this->conexion, "participante_tarea", "id_usuario", "id_tarea",$responsable["id_usuario"], $id_tarea);
                }
            }
            return $id_plan > 0;
        }else{
            return false;
        }
    }

    public function obtenerPlanesIteracion ($id_proyecto) {
        $iteracion = json_decode($this->obtenerIteracionActual($id_proyecto), true);
        if (!empty($iteracion)) {
            $planes = $this->plan->obtenerPlanesIteracion($iteracion["id_iteracion"]);
            return $planes;
        }else{
            return [];
        }
    }

    public function obtenerPlanId ($id_plan, $id_proyecto) {
        $resultado = $this->plan->obtenerPlanId($id_plan);
        $resultado["riesgo"] = $this->obtenerRiesgoId($resultado["id_riesgo"]);
        $resultado["planes_realizado"] = $this->obtenerCantidadPlanes($id_proyecto, $resultado["id_riesgo"]);
        $resultado["tareas"] = $this->plan->obtenerTareasPlan($id_plan);
        foreach ($resultado["tareas"] as &$tarea) {
            $tarea["responsables"] = $this->tarea->obtenerResponsablesTarea($tarea["id_tarea"]);
        }
        return $resultado;
    }

    public function actualizarPlan($id_plan, $data){
        $comprobar = !empty($data["descripcion"]) && !empty($data["tipo"]) && !empty($data["tareas"]);
        if ($comprobar) {
            $this->plan->setTipo($data["tipo"]);
            $this->plan->setDescripcion($data["descripcion"]);
            $this->plan->actualizarPlan($id_plan);
            if (!empty($data["tareas_eliminadas"])) {
                foreach ($data["tareas_eliminadas"] as $tarea) {
                    vincularTabla::eliminarVinculo($this->conexion,"participante_tarea", "id_tarea", $tarea["id_tarea"]);
                    $this->tarea->eliminarTarea($tarea["id_tarea"]);
                }
            }
            foreach ($data["tareas"] as $tarea) {
                if (!empty($tarea["id_tarea"])) {
                    //TODO debera permitir editar tarea en un futuro
                }else{
                    $this->tarea->setNombre($tarea["nombre"]);
                    $this->tarea->setDescripcion($tarea["descripcion"]);
                    $this->tarea->setEstado($tarea["estado"]);
                    $this->tarea->setFechaInicio($tarea["fecha_inicio"]);
                    $this->tarea->setFechaFin($tarea["fecha_fin"]);
                    $id_tarea = $this->tarea->crearTarea($id_plan);
                    foreach ($tarea["responsables"] as $responsable) {
                        vincularTabla::crearVinculo($this->conexion, "participante_tarea", "id_usuario", "id_tarea",$responsable["id_usuario"], $id_tarea);
                    }
                }
            }
            return $id_plan > 0;
        }else{
            return false;
        }
    }

}