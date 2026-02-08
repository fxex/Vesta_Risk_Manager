<?php

require_once __DIR__ . "/ProyectoDTO.php";
require_once __DIR__ . "/../Categoria/CategoriaDTO.php";

class ProyectoCategoriaDTO implements JsonSerializable{
    private ProyectoDTO $proyecto;
    private array $categorias;
    function __construct($proyecto = null, $categorias = null)
    {
        $this->proyecto = $proyecto;
        $this->categorias = $categorias;
    }

   
    public function getProyecto()
    {
        return $this->proyecto;
    }
    
    public function getCategorias()
    {
        return $this->categorias;
    }


    public function setProyecto(ProyectoDTO $proyecto)
    {
        $this->proyecto = $proyecto;
    }
    public function setCategorias(array $categorias)
    {
        $this->categorias = $categorias;
    }

    public function jsonSerialize(){
        return [
            "proyecto"=> $this->proyecto,
            "categorias"=> $this->categorias,
        ];
    }
}