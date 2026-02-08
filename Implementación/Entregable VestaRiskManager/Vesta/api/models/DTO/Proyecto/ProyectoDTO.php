<?php

class ProyectoDTO implements JsonSerializable
{
    private int $id;
    private string $nombre, $descripcion, $estado, $fecha_inicio, $fecha_fin;
    function __construct($id = null, $nombre = null, $descripcion = null, $estado = null, $fecha_inicio = null, $fecha_fin = null)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->descripcion = $descripcion;
        $this->estado = $estado;
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
    public function getDescripcion()
    {
        return $this->descripcion;
    }
    public function getEstado()
    {
        return $this->estado;
    }
    public function getFechaInicio()
    {
        return $this->fecha_inicio;
    }
    public function getFechaFin()
    {
        return $this->fecha_fin;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function setNombre(string $nombre)
    {
        $this->nombre = $nombre;
    }
    public function setDescripcion(string $descripcion)
    {
        $this->descripcion = $descripcion;
    }
    public function setEstado(string $estado)
    {
        $this->estado = $estado;
    }
    public function setFechaInicio(string $fecha_inicio)
    {
        $this->fecha_inicio = $fecha_inicio;
    }
    public function setFechaFin(string $fecha_fin)
    {
        $this->fecha_fin = $fecha_fin;
    }

    public function jsonSerialize()
    {
        return [
            "id_proyecto" => $this->id,
            "nombre" => $this->nombre,
            "descripcion" => $this->descripcion,
            "estado" => $this->estado,
            "fecha_inicio" => $this->fecha_inicio,
            "fecha_fin" => $this->fecha_fin,
        ];
    }
}