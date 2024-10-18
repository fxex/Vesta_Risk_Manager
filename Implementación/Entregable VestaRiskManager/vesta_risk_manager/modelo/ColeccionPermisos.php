<?php
include_once 'BDColeccionGenerica.Class.php';
include_once 'Permiso.Class.php';

class ColeccionPermisos extends BDColeccionGenerica {
    
    /**
     *
     * @var Permiso[]
     */
    private $permisos;
   
    function __construct() {
        parent::__construct();
        $this->setColeccion("permiso","Permiso");
        $this->permisos = $this->coleccion;
    }
    
    /**
     * 
     * @return array()
     */
    function getPermisos() {
        return $this->permisos;
    }


}