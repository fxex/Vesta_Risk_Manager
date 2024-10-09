<?php
include_once 'BDColeccionGenerica.Class.php';
include_once 'Usuario.Class.php';

class ColeccionUsuarios extends BDColeccionGenerica{
    
    /**
     *
     * @var Usuario[]
     */
    private $usuarios;
       
    function __construct() {
        parent::__construct();
        $this->setColeccion("usuario","Usuario");
        $this->usuarios = $this->coleccion;
    }
    
     /**
     * 
     * @return array()
     */
    function getUsuarios() {
        return $this->usuarios;
    }
}


