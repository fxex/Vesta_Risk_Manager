<?php

class UsuarioDTO implements JsonSerializable
{
    private $id, $nombre, $correo;
    function __construct($id = null, $nombre = null, $correo = null)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->correo = $correo;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getNombre()
    {
        return $this->nombre;
    }
    
    public function getCorreo()
    {
        return $this->correo;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function setNombre($nombre)
    {
        $this->nombre = $nombre;
    }
    public function setCorreo($correo)
    {
        $this->correo = $correo;
    }

    public function jsonSerialize(){
        return [
            "id_usuario"=> $this->id,
            "nombre"=> $this->nombre,
            "email"=> $this->correo,
        ];
    }
}