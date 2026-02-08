<?php

class CategoriaDTO implements JsonSerializable{
    private Int $id, $version; 
    private String $nombre, $descripcion, $estado;

    function __construct($id = null, $nombre = null, $descripcion = null, $estado = null, $version = null)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->descripcion = $descripcion;
        $this->estado = $estado;
        $this->version = $version;
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

    public function getVersion()
    {
        return $this->version;
    }

    public function setNombre(String $nombre)
    {
        $this->nombre = $nombre;
    }

    public function setDescripcion(String $descripcion)
    {
        $this->descripcion = $descripcion;
    }

    public function setEstado(String $estado)
    {
        $this->estado = $estado;
    }

    public function setVersion(Int $version)
    {
        $this->version = $version;
    }

    public function setId(Int $id)
    {
        $this->id = $id;
    }

    public function jsonSerialize(){
        return [
            "id_categoria"=> $this->id,
            "nombre"=> $this->nombre,
            "descripcion"=> $this->descripcion,
            "version" => $this->version
        ];
    }
}