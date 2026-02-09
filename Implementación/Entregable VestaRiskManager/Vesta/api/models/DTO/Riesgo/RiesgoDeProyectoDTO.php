<?php 

class RiesgoDeProyectoDTO implements JsonSerializable
{
    private int $id, $factor_riesgo, $evaluado; 
    private string $descripcion, $responsables, $categoria;

    public function __construct($id = null, $descripcion = null, $factor_riesgo = null, $responsables = null, $evaluado = null,$categoria = null){
        $this->id = $id;
        $this->descripcion = $descripcion;
        $this->factor_riesgo = $factor_riesgo;
        $this->responsables = $responsables;
        $this->evaluado = $evaluado;
        $this->categoria = $categoria;
    }

    public function getId()
    {
        return $this->id;
    }
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    public function getFactorRiesgo()
    {
        return $this->factor_riesgo;
    }

    public function getResponsables()
    {
        return $this->responsables;
    }
    public function getEvaluado()
    {
        return $this->evaluado;
    }
    public function getCategoria()
    {
        return $this->categoria;
    }
    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function setDescripcion(string $descripcion)
    {
        $this->descripcion = $descripcion;
    }

    public function setFactorRiesgo(int $factor_riesgo)
    {
        $this->factor_riesgo = $factor_riesgo;
    }

    public function setResponsable(string $responsables)
    {
        $this->responsables = $responsables;
    }
    public function setEvaluado(int $evaluado)
    {
        $this->evaluado = $evaluado;
    }
    public function setCategoria(string $categoria)
    {
        $this->categoria = $categoria;
    }

    public function jsonSerialize(){
        return [
            "id_riesgo"=> $this->id,
            "descripcion"=> $this->descripcion,
            "factor_riesgo"=> $this->factor_riesgo,
            "responsables"=> $this->responsables,
            "evaluado"=> $this->evaluado,
            "categoria"=> $this->categoria
        ];
    }

}