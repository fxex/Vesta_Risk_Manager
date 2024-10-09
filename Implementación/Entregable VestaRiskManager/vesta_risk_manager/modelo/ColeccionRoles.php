<?php
include_once 'BDColeccionGenerica.Class.php';
include_once 'Rol.Class.php';

class ColeccionRoles extends BDColeccionGenerica {

    /**
     *
     * @var Rol[]
     */
    private $roles;
   
    function __construct() {
        parent::__construct();
        $this->setColeccion("rol","Rol");
        $this->roles = $this->coleccion;
    }
    
     /**
     * 
     * @return array()
     */
    function getRoles() {
        return $this->roles;
    }
}
