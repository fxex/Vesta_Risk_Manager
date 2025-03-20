<?php
class Categoria{
    private $nombre, $descripcion, $estado, $version;
    private $conexion;

    function __construct($conexion, $nombre = null, $descripcion = null, $estado = null, $version = null) {
        $this->conexion = $conexion;
        $this->nombre = $nombre;
        $this->descripcion = $descripcion;
        $this->estado = $estado;
        $this->version = $version;
    }

    public function getNombre(){
        return $this->nombre;
    }

    public function getDescripcion(){
        return $this->descripcion;
    }

    public function getEstado(){
        return $this->estado;
    }

    public function getVersion(){
        return $this->version;
    }

    public function setNombre($nombre){
        $this->nombre = $nombre;
    }

    public function setDescripcion($descripcion){
        $this->descripcion = $descripcion;
    }

    public function setEstado($estado){
        $this->estado = $estado;
    }

    public function setVersion($version){
        $this->version = $version;
    }

    public function obtenerCategoriasGenerales(){
        $categorias = $this->conexion->query("SELECT * FROM categoria where estado = 'activo'");
        $resultado = [];
        while ($fila = $categorias->fetch_assoc()) {
            $resultado[] = $fila;
        }
        return $resultado;
    }

    public function obtenerCategorias($pagina){
        $categoriaPorPagina = 10;
        $offset = 0;
        if ($pagina > 1) {
            $offset = ($pagina - 1) * $categoriaPorPagina;
        }

        $categorias = $this->conexion->query("SELECT * FROM categoria where estado = 'activo' limit $categoriaPorPagina offset $offset");
        $resultado = [];
        while ($fila = $categorias->fetch_assoc()) {
            $resultado[] = $fila;
        }
        $totalPaginas = $this->obtenerCantidadCategoria($categoriaPorPagina);
        return ["categorias"=>$resultado, "totalPaginas" => $totalPaginas];
    }

    private function obtenerCantidadCategoria($categoriaPorPagina){
        $totalQuery = $this->conexion->query("select count(*) as total from categoria");
        $totalCategoria = $totalQuery->fetch_assoc()['total'];
        $totalPaginas = ceil($totalCategoria / $categoriaPorPagina);

        return $totalPaginas;
    }

    public function obtenerCategoriaId($id) {
        $query = "Select id_categoria, nombre, descripcion, version from categoria where id_categoria = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();
        $this->setNombre($resultado["nombre"]);
        $this->setDescripcion($resultado["descripcion"]);

        return $resultado;
    }

    public function obtenerCategoriaNombre($nombre) {
        $query = "Select id_categoria from categoria where nombre = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("s", $nombre);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();
        return $resultado;
    }

    public function crearCategoria(){
        $query = "INSERT INTO categoria (nombre, descripcion) values (?, ?)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("ss", $this->nombre, $this->descripcion);
        if ($stmt->execute()) {
            return $this->conexion->insert_id;
        } else {
            throw new Exception("Error al crear el plan: " . $stmt->error);
            return -1;
        }
    }

    public function eliminarCategoria($id_categoria){
        $query = "UPDATE categoria SET estado = ? where id_categoria = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("si", $this->estado, $id_categoria);
        if ($stmt->execute()) {
            return true;
        } else {
            throw new Exception("Error al crear el plan: " . $stmt->error);
            return false;
        }
    }

    public function actualizarCategoria(){
        $query = "INSERT INTO categoria (nombre, descripcion, version, estado) values (?, ?, ?, 'activo')";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("ssi", $this->nombre, $this->descripcion, $this->version);
        if ($stmt->execute()) {
            return $this->conexion->insert_id;
        } else {    
            throw new Exception("Error al crear el plan: " . $stmt->error);
            return -1;
        }
    }
}
