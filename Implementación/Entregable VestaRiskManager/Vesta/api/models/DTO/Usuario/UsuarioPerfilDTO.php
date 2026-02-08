<?php

class UsuarioPerfilDTO implements JsonSerializable{
    private $usuario, $perfil;
    function __construct($usuario = null, $perfil = null)
    {
        $this->usuario = $usuario;
        $this->perfil = $perfil;
    }

   
    public function getUsuario()
    {
        return $this->usuario;
    }
    
    public function getPerfil()
    {
        return $this->perfil;
    }


    public function setUsuario($usuario)
    {
        $this->usuario = $usuario;
    }
    public function setPerfil($perfil)
    {
        $this->perfil = $perfil;
    }

    public function jsonSerialize(){
        return [
            "usuario"=> $this->usuario,
            "perfil"=> $this->perfil,
        ];
    }
}