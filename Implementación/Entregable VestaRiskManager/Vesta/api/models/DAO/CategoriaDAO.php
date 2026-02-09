<?php

require_once __DIR__ . "/../DTO/Categoria/CategoriaDTO.php";
require_once __DIR__ . "/../Interface/RepositoryCategoria.php";

class CategoriaDAO implements RepositoryCategoria
{
    private $conexion;
    function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function obtenerCategoriasGenerales(): array
    {
        $categorias = $this->conexion->query("SELECT id_categoria, nombre, descripcion FROM categoria where estado = 'activo'");
        $resultado = [];
        while ($categoria = $categorias->fetch_assoc()) {
            $resultado[] = new CategoriaDTO(
                $categoria["id_categoria"],
                $categoria["nombre"],
                $categoria["descripcion"]
            );
        }
        return $resultado;
    }

    public function obtenerDatosGraficoTelaraña(int $id_proyecto): array
    {
        $query = "SELECT c.nombre, COALESCE(sum(r.factor_riesgo), 0) as total_riesgo  
                from categoria c
                inner join proyecto_categoria pc on c.id_categoria = pc.id_categoria 
                left join riesgo r on r.id_categoria = c.id_categoria and r.id_proyecto = ?
                group by c.id_categoria, c.nombre";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_proyecto);
        $stmt->execute();
        $categorias = $stmt->get_result();
        $resultado = [];
        while ($categoria = $categorias->fetch_assoc()) {
            $resultado[] = $categoria;
        }
        return $resultado;
    }

    public function obtenerCategoriasGeneralesPaginado(int $pagina, int $cantidad_pagina = 10): array
    {
        $categoriaPorPagina = $cantidad_pagina;
        $offset = 0;
        if ($pagina > 1) {
            $offset = ($pagina - 1) * $categoriaPorPagina;
        }

        $categorias = $this->conexion->query("SELECT id_categoria, nombre, descripcion FROM categoria where estado = 'activo' limit $categoriaPorPagina offset $offset");
        $resultado = [];
        while ($categoria = $categorias->fetch_assoc()) {
            $resultado[] = new CategoriaDTO($categoria["id_categoria"], $categoria["nombre"], $categoria["descripcion"]);
        }
        $totalPaginas = $this->obtenerCantidadCategoria($categoriaPorPagina);
        return ["categorias" => $resultado, "totalPaginas" => $totalPaginas];
    }

    private function obtenerCantidadCategoria(int $categoriaPorPagina)
    {
        $totalQuery = $this->conexion->query("SELECT COUNT(*) AS total FROM categoria WHERE estado = 'activo'");
        $totalCategoria = $totalQuery->fetch_assoc()['total'];
        $totalPaginas = ceil($totalCategoria / $categoriaPorPagina);

        return $totalPaginas;
    }

    public function obtenerCategoriaPorId(int $id_categoria): CategoriaDTO|null
    {
        $query = "SELECT id_categoria, nombre, descripcion, version FROM categoria WHERE id_categoria = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_categoria);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();

        if ($resultado == null) {
            return null; //TODO: Se debe arrojar una excepcion de dominio. No es posible que este metodo reciba un id_categoria incorrecto
        }

        return new CategoriaDTO(
            $id_categoria,
            $resultado["nombre"],
            $resultado["descripcion"],
            null,
            $resultado["version"]
        );
    }

    public function obtenerCategoriaPorNombre(string $nombre): int | null
    {
        $query = "SELECT id_categoria FROM categoria 
        WHERE nombre = ? AND estado = 'activo'";

        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("s", $nombre);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();

        return $resultado["id_categoria"] ?? null;
    }

    public function crearCategoria(CategoriaDTO $categoria): CategoriaDTO
    {
        $nombre = $categoria->getNombre();
        $descripcion = $categoria->getDescripcion();
        $query = "INSERT INTO categoria (nombre, descripcion) VALUES (?, ?)";
        $stmt = $this->conexion->prepare($query);

        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }

        if (
            !$stmt->bind_param(
                "ss",
                $nombre,
                $descripcion
            )
        ) {
            throw new RuntimeException("Error en bind_param: " . $stmt->error);
        }

        if (!$stmt->execute()) {
            throw new RuntimeException("Error en execute: " . $stmt->error);
        }

        if ($stmt->affected_rows !== 1) {
            throw new RuntimeException("No se insertó ninguna fila");
        }

        return new CategoriaDTO(
            $this->conexion->insert_id,
            $nombre,
            $descripcion
        );
    }

    public function eliminarCategoria(int $id_categoria): int
    {
        $stmt = NULL;
        $cantidadProyectos = $this->obtenerCantidadProyectosCategoria($id_categoria);
        if ($cantidadProyectos < 1) {
            $query = "DELETE FROM categoria WHERE id_categoria = ?";
            $stmt = $this->conexion->prepare($query);
            if ($stmt === false) {
                throw new RuntimeException("Error en prepare: " . $this->conexion->error);
            }

            if (
                !$stmt->bind_param(
                    "i",
                    $id_categoria
                )
            ) {
                throw new RuntimeException("Error en bind_param: " . $stmt->error);
            }

        } else {
            $query = "UPDATE categoria SET estado = ? WHERE id_categoria = ?";
            $stmt = $this->conexion->prepare($query);

            if (
                !$stmt->bind_param(
                    "si",
                    "inactivo",
                    $id_categoria
                )
            ) {
                throw new RuntimeException("Error en bind_param: " . $stmt->error);
            }

        }

        if (!$stmt->execute()) {
            throw new RuntimeException("Error en execute: " . $stmt->error);
        }

        if ($stmt->affected_rows !== 1) {
            throw new RuntimeException("No se elimino o actualizo el registro  " . $id_categoria);
        }

        return $id_categoria;
    }

    private function obtenerCantidadProyectosCategoria(int $id_categoria)
    {
        $totalQuery = $this->conexion->query("SELECT COUNT(DISTINCT pc.id_proyecto) AS total FROM categoria c 
        INNER JOIN proyecto_categoria pc ON c.id_categoria = pc.id_categoria 
        WHERE c.id_categoria = {$id_categoria}");
        $totalProyectos = $totalQuery->fetch_assoc()['total'];
        return $totalProyectos;
    }

    public function actualizarCategoria(CategoriaDTO $categoria): CategoriaDTO
    {
        $nombre = $categoria->getNombre();
        $descripcion = $categoria->getDescripcion();
        $version = $categoria->getVersion();

        $query = "INSERT INTO categoria (nombre, descripcion, version, estado) VALUES (?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($query);

        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }

        if (
            !$stmt->bind_param(
                "ssis",
                $nombre,
                $descripcion,
                $version,
                "activo"
            )
        ) {
            throw new RuntimeException("Error en bind_param: " . $stmt->error);
        }

        if (!$stmt->execute()) {
            throw new RuntimeException("Error en execute: " . $stmt->error);
        }

        if ($stmt->affected_rows === 0) {
            throw new RuntimeException("No se actualizo ninguna fila o no se realizo ningun cambio"); // TODO: Cambiar Tipo de excepcion, de dominio.  
        }

        return new CategoriaDTO(
            $this->conexion->insert_id,
            $nombre,
            $descripcion,
            "activo",
            $version
        );
    }

    public function obtenerCategoriasProyectoPorId(int $id_proyecto): array
    {
        $query = "SELECT c.id_categoria, c.nombre, c.descripcion FROM categoria c 
        INNER JOIN proyecto_categoria pc ON c.id_categoria = pc.id_categoria 
        WHERE pc.id_proyecto = ?";
        $stmt = $this->conexion->prepare($query);

        $stmt->bind_param("i", $id_proyecto);
        $stmt->execute();
        $categorias = $stmt->get_result();
        $resultado = [];

        while ($categoria = $categorias->fetch_assoc()) {
            $resultado[] = new CategoriaDTO($categoria["id_categoria"], $categoria["nombre"], $categoria["descripcion"]);
        }

        return $resultado;
    }
}