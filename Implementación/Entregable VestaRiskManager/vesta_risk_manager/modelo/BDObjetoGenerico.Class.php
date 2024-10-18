<?php
include_once 'BDModeloGenerico.Class.php';

/**
 * Description of BDObjetoGenerico
 * 
 * Esta clase contiene los métodos genéricos para recuperar datos desde una base de datos y asociarlos a un objeto.
 * Así, las clases de modelo deben extender de esta clase.
 *
 * @author Eder dos Santos <esantos@uarg.unpa.edu.ar>
 * @author Fabricio Gonzalez
 * @author Vanina Gola
 * 
 */
class BDObjetoGenerico extends BDModeloGenerico {
    
    protected $id;
    protected $nombre;
    
    /** 
     * 
     * Coleccion generica de elementos.
     * Carga una coleccion de objetos vinculados a partir de relaciones 1xN o MxN de la base de datos.
     * Ejemplo: un Rol contiene una colección de Permisos.
     * 
     * @see Rol::setPermisos($tablaVinculacion, $tablaElementos, $idObjetoContenedor, $atributoFKElementoColeccion, $claseElementoColeccion)
     * @var StdClass[]
     * 
     */
    protected $coleccionElementos;
    
    function getId() {
        return $this->id;
    }

    function getNombre() {
        return $this->nombre;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setNombre($nombre) {
        $this->nombre = $nombre;
    }

    /**
     * 
     * Método constructor.
     * Asocia los campos de una tabla de la base de datos a los atributos del objeto en construcción.
     * 
     * @category BD
     * @copyright (c) 2018, Eder dos Santos. UNPA UARG
     * 
     * @todo [19/06/2018] Asociar tablas originadas desde relaciones 1xN y MxN
     * 
     * @param Int $id pasado por parametro
     * @param String $nombreTabla tabla de la bd
     */
    function __construct($id, $nombreTabla) {
        
        parent::__construct();
        $this->id = $id ? : $this->id;
        $this->query = "SELECT * FROM {$nombreTabla} WHERE id = {$this->id}";
        
        $this->datos = BDConexion::getInstancia()->query($this->query);
        $this->datos = $this->datos->fetch_assoc();
        
        foreach($this->datos as $atributo => $valor){
            $this->{$atributo} = $valor;
        }
        
        unset($this->query);
        unset($this->datos);
        
    }
    
    
    /**
     * 
     * Método generico para configurar datos desde relaciones entre clases 
     * (colecciones) basadas en datos relacionados via FK en la base de datos
     * 
     * A modo de ejemplo, se considera que un rol contiene una coleccion de permisos.
     * Asi, se desea obtener los datos de los permisos a partir de los datos de dos tablas:
     * 
     * * rol_permiso (contiene los vinculos originados de una relacion MxN).
     * * permiso (contiene los datos de los objetos que compondran la coleccion)..
     * 
     * @param String $tablaVinculacion Tabla de Vinculacion. Ejemplo: rol_permiso
     * @param String $tablaElementos Tabla del Objeto base. Ejemplo: Permiso
     * 
     * @param String $idObjetoContenedor Atributo de la bd que representa el Objeto contenedor en la tabla de vinculacion. Ejemplo: id_rol (en rol_permiso)
     * @param String $atributoFKElementoColeccion Atributo de la bd que representa la clave foranea del elemento de coleccion en la tabla de vinculacion. Ejemplo: id_permiso (en rol_permiso)
     * 
     * @param String $claseElementoColeccion Clase que se instancia como elemento de la coleccion. Ejemplo: permiso
     * 
     * 
     */
    function setColeccionElementos($tablaVinculacion, $tablaElementos, $idObjetoContenedor, $atributoFKElementoColeccion, $claseElementoColeccion) {

        $this->coleccionElementos = null;
        
        /**
         * @example 
         * SELECT TablaElementos.*
         * FROM permiso TablaElementos, rol_permiso TablaFK
         * WHERE TablaElementos.id = TablaFK.id_permiso
         * AND FK.id_rol = 1
         */
        $this->query = "SELECT TablaElementos.* "
                . "FROM {$tablaElementos} TablaElementos, {$tablaVinculacion} TablaFK "
                . "WHERE TablaElementos.id = TablaFK.{$atributoFKElementoColeccion} "
                . "AND TablaFK.{$idObjetoContenedor} = {$this->id}";

        $this->datos = BDConexion::getInstancia()->query($this->query);
        if(!$this->datos) {
            print_r($this->BD->error);
        }
        for ($x = 0; $x < $this->datos->num_rows; $x++) {
            $this->coleccionElementos[] = $this->datos->fetch_object($claseElementoColeccion);
        }

        unset($this->query);
        unset($this->datos);
    }
    
    /**
     * 
     * @return StdClass[]
     */
    function getColeccionElementos() {
        return $this->coleccionElementos;
    }


    
    
}
