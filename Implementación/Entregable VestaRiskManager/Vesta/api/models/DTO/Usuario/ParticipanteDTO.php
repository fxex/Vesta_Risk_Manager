<?php

class ParticipanteDTO implements JsonSerializable
{
    private int $id; 
    private string $nombre, $correo, $rol;
    function __construct($id = null, $nombre = null, $correo = null, $rol = null)
    {
        $this->id = $id;
        $this->nombre = $nombre;
        $this->correo = $correo;
        $this->rol = $rol;
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

    public function getRol()
    {
        return $this->rol;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function setNombre(string $nombre)
    {
        $this->nombre = $nombre;
    }
    public function setCorreo(string $correo)
    {
        $this->correo = $correo;
    }

    public function setRol(string $rol)
    {
        $this->rol = $rol;
    }

    public function jsonSerialize(){
        return [
            "id_usuario"=> $this->id,
            "nombre"=> $this->nombre,
            "email"=> $this->correo,
            "rol"=> $this->rol,
        ];
    }
}