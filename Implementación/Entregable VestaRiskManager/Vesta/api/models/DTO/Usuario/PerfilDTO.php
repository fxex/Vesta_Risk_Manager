<?php

class PerfilDTO implements JsonSerializable
{
    private $id, $nombre;
    
    public function __construct($id = null, $nombre = null){
        $this->id = $id;
        $this->nombre = $nombre;
    }
    public function getId()
    {
        return $this->id;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }

    public function jsonSerialize(){
        return [
            "id_perfil"=> $this->id,
            "nombre"=> $this->nombre,
        ];
    }
}