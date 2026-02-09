<?php 

class RiesgoDTO implements JsonSerializable
{
    private int $id, $factor_riesgo; 
    private string $descripcion, $fecha_creacion;

    public function __construct($id = null, $descripcion = null, $fecha_creacion = null, $factor_riesgo = null){
        $this->id = $id;
        $this->descripcion = $descripcion;
        $this->fecha_creacion = $fecha_creacion;
        $this->factor_riesgo = $factor_riesgo;
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

    public function getFechaCreacion()
    {
        return $this->fecha_creacion;
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

    public function setFechaCreacion(string $fecha_creacion)
    {
        $this->fecha_creacion = $fecha_creacion;
    }

    public function jsonSerialize(){
        return [
            "id_riesgo"=> $this->id,
            "descripcion"=> $this->descripcion,
            "fecha_creacion"=> $this->fecha_creacion,
            "factor_riesgo"=> $this->factor_riesgo,
        ];
    }

}