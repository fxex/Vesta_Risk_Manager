<?php

include_once 'BDModeloGenerico.Class.php';

/**
 * Descripcion de ColeccionBDGenerica
 * 
 * Esta clase permite crear una coleccion generica de objetos a partir de una consulta simple a una tabla de la base de datos.
 * Así, las clases de tipo "Coleccion" deben extender de esta clase.
 *
 * @author Eder dos Santos <esantos@uarg.unpa.edu.ar>
 * @author Fabricio Gonzalez
 * @author Vanina Gola
 * 
 */
class BDColeccionGenerica extends BDModeloGenerico {

    /**
     * Coleccion generica de objetos
     * @var StdClass[]
     */
    protected $coleccion;

    /**
     * 
     * @return StdClass[]
     */
    function getColeccion() {
        return $this->coleccion;
    }
    
    /**
     * 
     * Metodo generico para obtener todos los registros de una tabla de una base de datos.
     * 
     * @param String $tablaBD_ nombre de la tabla de la base de datos a partir de la cual se recuperaran los datos.
     * @param String $nombreClase nombre de clase en la que se incorporarán los datos obtenidos en la BD.
     * 
     */
    function setColeccion($tablaBD_, $nombreClase) {
        $this->query = "SELECT * FROM {$tablaBD_}";
        $this->datos = BDConexion::getInstancia()->query($this->query);
        for ($x = 0; $x < $this->datos->num_rows; $x++) {
            $this->addElemento($this->datos->fetch_object($nombreClase));
        }
    }
    
    /**
     * Método para implementar agregación de elementos a la colección.
     * @param StdClass $elemento_ 
     */
    function addElemento($elemento_) {
        $this->coleccion[] = $elemento_;
    }

}
