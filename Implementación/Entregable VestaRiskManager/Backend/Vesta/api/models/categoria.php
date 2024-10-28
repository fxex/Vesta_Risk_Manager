<?php
class Categoria{
    private $nombre, $descripcion;
    private $conexion;

    function __construct($conexion, $nombre = null, $descripcion = null) {
        $this->conexion = $conexion;
        $this->nombre = $nombre;
        $this->descripcion = $descripcion;
    }

    public function obtenerCategoriasGenerales(){
        $categorias = $this->conexion->query("SELECT * FROM categoria where id_categoria < 11");
        $resultado = [];
        while ($fila = $categorias->fetch_assoc()) {
            $resultado[] = $fila;
        }
        return $resultado;
    }
}
