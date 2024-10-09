<?php 
include_once 'BDConexion.Class.php';

/**
 * Descripcion de BDModeloGenerico
 * Esta clase posee los componentes para el acceso a una base de datos MySQL y la manipulacion de consultas.
 * 
 * @author Eder dos Santos
 * @author Fabricio Gonzalez
 * @author Vanina Gola
 * 
 */
class BDModeloGenerico {

    protected $query;

    /**
     *
     * @var mysqli_result
     */
    protected $datos;


    function __construct() {
        ;
    }

}