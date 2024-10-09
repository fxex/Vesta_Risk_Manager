<?php
include_once 'BDObjetoGenerico.Class.php';

class Permiso extends BDObjetoGenerico {

    function __construct($id = null) {
        parent::__construct($id, "permiso");
    }

}
