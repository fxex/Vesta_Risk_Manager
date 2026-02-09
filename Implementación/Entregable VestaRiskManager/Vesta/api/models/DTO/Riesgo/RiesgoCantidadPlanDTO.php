<?php

class RiesgoCantidadPlanDTO implements JsonSerializable {
    private int $id_riesgo, $plan_minimizacion, $plan_mitigacion, $plan_contigencia;

    public function __construct(int $id_riesgo, int $plan_minimizacion, int $plan_mitigacion, int $plan_contigencia){
        $this->id_riesgo = $id_riesgo;
        $this->plan_minimizacion = $plan_minimizacion;
        $this->plan_mitigacion = $plan_mitigacion;
        $this->plan_contigencia = $plan_contigencia;
    }

    public function getIdRiesgo(){
        return $this->id_riesgo;
    }
    public function getPlanMinizacion(){
        return $this->plan_minimizacion;
    }
    public function getPlanMitigacion(){
        return $this->plan_mitigacion;
    }
    public function getPlanContigencia(){
        return $this->plan_contigencia;
    }

    public function setIdRiesgo(int $id_riesgo){
        $this->id_riesgo = $id_riesgo;
    }
    public function setPlanMinizacion(int $plan_minimizacion){
        $this->plan_minimizacion = $plan_minimizacion;
    }
    public function setPlanMitigacion(int $plan_mitigacion){
        $this->plan_mitigacion = $plan_mitigacion;
    }
    public function setPlanContigencia(int $plan_contigencia){
        $this->plan_contigencia = $plan_contigencia;
    }
    public function jsonSerialize(){
        return [
            "id_riesgo"=> $this->id_riesgo,
            "plan_minimizacion"=> $this->plan_minimizacion,
            "plan_mitigacion"=> $this->plan_mitigacion,
            "plan_contigencia"=> $this->plan_contigencia
        ];
    }
}