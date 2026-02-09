<?php

require_once __DIR__ . "/RiesgoDTO.php";
require_once __DIR__ . "/../Categoria/CategoriaDTO.php";

class RiesgoCategoriaDTO implements JsonSerializable{
    private RiesgoDTO $riesgo;
    private CategoriaDTO $categoria;
    function __construct(RiesgoDTO $riesgo, CategoriaDTO $categoria)
    {
        $this->riesgo = $riesgo;
        $this->categoria = $categoria;
    }

   
    public function getRiesgo(): RiesgoDTO
    {
        return $this->riesgo;
    }
    
    public function getCategoria(): CategoriaDTO
    {
        return $this->categoria;
    }


    public function setRiesgo(RiesgoDTO $riesgo)
    {
        $this->riesgo = $riesgo;
    }
    public function setCategoria(CategoriaDTO $categoria)
    {
        $this->categoria = $categoria;
    }

    public function jsonSerialize(){
        return [
            "riesgo"=> $this->riesgo,
            "categoria"=> $this->categoria,
        ];
    }
}