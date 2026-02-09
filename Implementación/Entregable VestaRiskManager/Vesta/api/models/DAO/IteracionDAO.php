<?php

require_once __DIR__ . "/../DTO/Proyecto/IteracionDTO.php";
require_once __DIR__ . "/../Interface/RepositoryIteracion.php";

class IteracionDAO implements RepositoryIteracion
{
    private $conexion;
    function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function obtenerIteracionesPaginado(int $id_proyecto, int $pagina, $cantidad_pagina = 10): array
    {
        $cantidad_iteraciones = $cantidad_pagina;
        $offset = 0;

        if ($pagina > 1) {
            $offset = ($pagina - 1) * $cantidad_iteraciones;
        }

        $query = "SELECT id_iteracion, nombre, fecha_inicio, fecha_fin FROM iteracion WHERE id_proyecto = ? ORDER BY id_iteracion DESC LIMIT $cantidad_iteraciones OFFSET $offset";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_proyecto);
        $stmt->execute();
        $iteraciones = $stmt->get_result();
        $resultados = [];
        while ($iteracion = $iteraciones->fetch_assoc()) {
            $resultados[] = new IteracionDTO($iteracion["id_iteracion"], $iteracion["nombre"], $iteracion["fecha_inicio"], $iteracion["fecha_fin"]);
        }

        $totalPaginas = $this->obtenerCantidadPaginasIteraciones($cantidad_iteraciones, $id_proyecto);

        return ["iteraciones" => $resultados, "totalPaginas" => $totalPaginas];
    }

    private function obtenerCantidadPaginasIteraciones(int $cantidad_iteracion, int $id_proyecto)
    {
        $totalQuery = $this->conexion->query("SELECT COUNT(*) AS total FROM iteracion i 
        WHERE i.id_proyecto = $id_proyecto");
        $totalTareas = $totalQuery->fetch_assoc()['total'];
        $totalPaginas = ceil($totalTareas / $cantidad_iteracion);

        return $totalPaginas;
    }

    public function crearIteracion(IteracionDTO $iteracion, int $id_proyecto): IteracionDTO
    {
        $nombre = $iteracion->getNombre();
        $fecha_inicio = $iteracion->getFechaInicio();
        $fecha_fin = $iteracion->getFechaFin();

        $query = "INSERT INTO iteracion (nombre, fecha_inicio, fecha_fin, id_proyecto) VALUES (?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($query);

        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }

        if (
            !$stmt->bind_param(
                "sssi",
                $nombre,
                $fecha_inicio,
                $fecha_fin,
                $id_proyecto
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

        return new IteracionDTO(
            $this->conexion->insert_id,
            $nombre,
            $fecha_inicio,
            $fecha_fin
        );
    }

    public function actualizarIteracion(IteracionDTO $iteracion, int $id_proyecto): IteracionDTO
    {
        $nombre = $iteracion->getNombre();
        $fecha_inicio = $iteracion->getFechaInicio();
        $fecha_fin = $iteracion->getFechaFin();
        $id_iteracion = $iteracion->getId();

        $query = "UPDATE iteracion SET nombre = ?, fecha_inicio = ?, fecha_fin = ? WHERE id_iteracion = ? AND id_proyecto = ?";
        $stmt = $this->conexion->prepare($query);

        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }

        if (
            !$stmt->bind_param(
                "sssii",
                $nombre,
                $fecha_inicio,
                $fecha_fin,
                $id_iteracion,
                $id_proyecto
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

        return $iteracion;
    }

    public function eliminarIteracion(int $id_iteracion): int
    {
        $query = "DELETE FROM iteracion WHERE id_iteracion = ?";
        $stmt = $this->conexion->prepare($query);

        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }

        if (
            !$stmt->bind_param(
                "i",
                $id_iteracion
            )
        ) {
            throw new RuntimeException("Error en bind_param: " . $stmt->error);
        }

        if (!$stmt->execute()) {
            throw new RuntimeException("Error en execute: " . $stmt->error);
        }

        if ($stmt->affected_rows !== 1) {
            throw new RuntimeException("No se elimino el registro del " . $id_iteracion);
        }

        return $id_iteracion;
    }

    public function obtenerTodasIteracionesProyectoPorId(int $id_proyecto): array
    {
        $query = "SELECT i.id_iteracion, i.nombre, i.fecha_inicio, i.fecha_fin FROM proyecto p 
        INNER JOIN iteracion i ON p.id_proyecto = i.id_proyecto 
        WHERE p.id_proyecto = ?";

        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_proyecto);
        $stmt->execute();

        $iteraciones = $stmt->get_result();

        $resultado = [];
        while ($iteracion = $iteraciones->fetch_assoc()) {
            $resultado[] = new IteracionDTO(
                $iteracion["id_iteracion"],
                $iteracion["nombre"],
                $iteracion["fecha_inicio"],
                $iteracion["fecha_fin"]
            );
        }
        return $resultado;
    }

    public function obtenerIteracionActual(int $id_proyecto, string $fecha_actual): IteracionDTO
    {
        $query = "SELECT i.id_iteracion, i.nombre, i.fecha_inicio, i.fecha_fin FROM iteracion i 
        WHERE i.id_proyecto = ? AND (? BETWEEN i.fecha_inicio AND i.fecha_fin)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("is", $id_proyecto, $fecha_actual);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();
        return new IteracionDTO(
            $resultado["id_iteracion"],
            $resultado["nombre"],
            $resultado["fecha_inicio"],
            $resultado["fecha_fin"]
        );
    }

    public function obtenerUltimaIteracion(int $id_proyecto): IteracionDTO
    {
        $query = "SELECT i.id_iteracion, i.nombre, i.fecha_inicio, i.fecha_fin FROM proyecto p 
        INNER JOIN iteracion i ON p.id_proyecto = i.id_proyecto 
        WHERE p.id_proyecto = ? ORDER BY i.id_iteracion DESC LIMIT 1";
        $stmt = $this->conexion->prepare($query);

        $stmt->bind_param("i", $id_proyecto);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();

        return new IteracionDTO(
            $resultado["id_iteracion"],
            $resultado["nombre"],
            $resultado["fecha_inicio"],
            $resultado["fecha_fin"]
        );
    }

    public function obtenerUltimasIteraciones(int $id_proyecto, string $fecha_actual): array
    {
        $query = "
            (SELECT * FROM (
                SELECT i.id_iteracion, i.nombre, i.fecha_inicio
                FROM iteracion i
                WHERE i.id_proyecto = ?
                AND i.fecha_inicio < ?
                ORDER BY i.fecha_inicio DESC
            ) AS anteriores)
        UNION
            (SELECT i.id_iteracion, i.nombre, i.fecha_inicio
            FROM iteracion i
            WHERE i.id_proyecto = ?
            AND ? BETWEEN i.fecha_inicio AND i.fecha_fin
            )
        UNION
            (SELECT * FROM (
                SELECT i.id_iteracion, i.nombre, i.fecha_inicio
                FROM iteracion i
                WHERE i.id_proyecto = ?
                AND i.fecha_inicio > ?
                ORDER BY i.fecha_inicio ASC
            ) AS siguientes)
        ORDER BY fecha_inicio DESC";
        $stmt = $this->conexion->prepare($query);

        $stmt->bind_param("isisis", $id_proyecto, $fecha_actual, $id_proyecto, $fecha_actual, $id_proyecto, $fecha_actual);
        $stmt->execute();
        $iteraciones = $stmt->get_result();

        $resultado = [];
        while ($iteracion = $iteraciones->fetch_assoc()) {
            $resultado[] = new IteracionDTO(
                $iteracion["id_iteracion"],
                $iteracion["nombre"],
                $iteracion["fecha_inicio"],
                $iteracion["fecha_fin"]
            );
        }
        return $resultado;
    }

    public function obtenerIteracionPorId(int $id_iteracion): IteracionDTO|null
    {
        $query = "SELECT i.id_iteracion, i.nombre, i.fecha_inicio, i.fecha_fin FROM iteracion i 
        WHERE i.id_iteracion = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_iteracion);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();

        if ($resultado == null) {
            return null; //TODO: Se debe arrojar una excepcion de dominio. No es posible que este metodo reciba un id_categoria incorrecto
        }

        return new IteracionDTO(
            $resultado["id_iteracion"],
            $resultado["nombre"],
            $resultado["fecha_inicio"],
            $resultado["fecha_fin"]
        );
    }
}