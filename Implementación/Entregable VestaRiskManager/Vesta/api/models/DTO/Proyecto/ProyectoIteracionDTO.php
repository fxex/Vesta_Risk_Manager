<?php

require_once __DIR__ . "/ProyectoDTO.php";
require_once __DIR__ . "/IteracionDTO.php";

class ProyectoIteracionDTO implements JsonSerializable{
    private ProyectoDTO $proyecto;
    private array $iteraciones;
    function __construct($proyecto = null, $iteraciones = null)
    {
        $this->proyecto = $proyecto;
        $this->iteraciones = $iteraciones;
    }

   
    public function getProyecto()
    {
        return $this->proyecto;
    }
    
    public function getIteraciones()
    {
        return $this->iteraciones;
    }


    public function setProyecto(ProyectoDTO $proyecto)
    {
        $this->proyecto = $proyecto;
    }
    public function setIteraciones(array $iteraciones)
    {
        $this->iteraciones = $iteraciones;
    }

    public function jsonSerialize(){
        return [
            "proyecto"=> $this->proyecto,
            "iteraciones"=> $this->iteraciones,
        ];
    }
}