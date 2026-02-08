<?php

class IteracionDTO implements JsonSerializable{
    private Int $id;
    private String $nombre, $fecha_inicio, $fecha_fin;
    function __construct($id = null, $nombre = null, $fecha_inicio = null, $fecha_fin = null)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->fecha_inicio = $fecha_inicio;
        $this->fecha_fin = $fecha_fin;
    }

     public function getId()
    {
        return $this->id;
    }

    public function getNombre()
    {
        return $this->nombre;
    }
    public function getFechaInicio()
    {
        return $this->fecha_inicio;
    }
    public function getFechaFin()
    {
        return $this->fecha_fin;
    }

    public function setId(Int $id)
    {
        $this->id = $id;
    }

    public function setNombre(String $nombre)
    {
        $this->nombre = $nombre;
    }
    public function setFechaInicio(String $fecha_inicio)
    {
        $this->fecha_inicio = $fecha_inicio;
    }
    public function setFechaFin(String $fecha_fin)
    {
        $this->fecha_fin = $fecha_fin;
    }

    public function jsonSerialize(){
        return [
            "id_iteracion"=> $this->id,
            "nombre"=> $this->nombre,
            "fecha_inicio"=> $this->fecha_inicio,
            "fecha_fin"=> $this->fecha_fin,
        ];
    }
}