<?php

require_once __DIR__ . "/../DTO/Proyecto/IteracionDTO.php";
require_once __DIR__ . "/../DTO/Proyecto/ProyectoDTO.php";
require_once __DIR__ . "/../DTO/Proyecto/ProyectoIteracionDTO.php";
require_once __DIR__ . "/../Interface/RepositoryProyecto.php";

class ProyectoDAO implements RepositoryProyecto
{
    private $conexion;
    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function obtenerTodosProyectos(): array
    {
        $proyectos = $this->conexion->query("SELECT id_proyecto, nombre, descripcion, estado, fecha_inicio, fecha_fin 
        FROM proyecto");
        $resultado = [];

        while ($proyecto = $proyectos->fetch_assoc()) {
            $resultado[] = new ProyectoDTO(
                $proyecto["id_proyecto"],
                $proyecto["nombre"],
                $proyecto["descripcion"],
                $proyecto["estado"],
                $proyecto["fecha_inicio"],
                $proyecto["fecha_fin"],
            );
        }

        return $resultado;
    }



    public function obtenerTodosProyectosPaginado(int $pagina, int $orden, int $cantidad_pagina = 10): array
    {
        $ordenado = $this->obtenerOrden($orden);
        $cantidad_proyectos = $cantidad_pagina;
        $offset = 0;

        if ($pagina > 1) {
            $offset = ($pagina - 1) * $cantidad_proyectos;
        }

        $proyectos = $this->conexion->query("SELECT id_proyecto, nombre, descripcion, estado, fecha_inicio, fecha_fin 
        FROM proyecto  
        WHERE estado = '$ordenado' ORDER BY nombre ASC 
        LIMIT $cantidad_proyectos OFFSET $offset");

        $resultado = [];

        while ($proyecto = $proyectos->fetch_assoc()) {
            $resultado[] = new ProyectoDTO(
                $proyecto["id_proyecto"],
                $proyecto["nombre"],
                $proyecto["descripcion"],
                $proyecto["estado"],
                $proyecto["fecha_inicio"],
                $proyecto["fecha_fin"],
            );
        }

        $totalPaginas = $this->obtenerCantidadPaginas($cantidad_proyectos);
        return ["proyectos" => $resultado, "totalPaginas" => $totalPaginas];
    }

    private function obtenerOrden(int $orden)
    {
        switch ($orden) {
            case 1:
                return "activo";
            case 2:
                return "inactivo";
            case 3:
                return "abandonado";
            case 4:
                return "finalizado";
            default:
                return "activo";
        }
    }

    private function obtenerCantidadPaginas(int $cantidad_proyectos)
    {
        $query = "SELECT COUNT(*) AS total FROM proyecto";
        $stmt = $this->conexion->prepare($query);
        $stmt->execute();
        $total = $stmt->get_result()->fetch_assoc()['total'];
        $totalPaginas = ceil($total / $cantidad_proyectos);
        return $totalPaginas;
    }

    public function obtenerTodosProyectoPorRol(string $rol, string $correo): array
    {
        $query = "SELECT p.id_proyecto, p.nombre, p.descripcion, p.estado, p.fecha_inicio, p.fecha_fin FROM proyecto p 
        INNER JOIN proyecto_participante pp ON p.id_proyecto = pp.id_proyecto
        INNER JOIN usuario u ON u.id_usuario = pp.id_usuario 
        WHERE u.email = ? AND pp.rol = ?";
        $stmt = $this->conexion->prepare($query);

        $stmt->bind_param("ss", $correo, $rol);
        $stmt->execute();
        $proyectos = $stmt->get_result();
        $resultado = [];

        while ($proyecto = $proyectos->fetch_assoc()) {
            $resultado[] = new ProyectoDTO(
                $proyecto["id_proyecto"],
                $proyecto["nombre"],
                $proyecto["descripcion"],
                $proyecto["estado"],
                $proyecto["fecha_inicio"],
                $proyecto["fecha_fin"],
            );
        }

        return $resultado;
    }

    public function obtenerTodosProyectosPorRolPaginado(string $rol, string $correo, int $pagina, int $cantidad_pagina = 10): array
    {
        $cantidad_proyectos = $cantidad_pagina;
        $offset = 0;

        if ($pagina > 1) {
            $offset = ($pagina - 1) * $cantidad_proyectos;
        }

        $query = "SELECT p.id_proyecto, p.nombre, p.descripcion, p.estado, p.fecha_inicio, p.fecha_fin FROM proyecto p 
        INNER JOIN proyecto_participante pp ON p.id_proyecto = pp.id_proyecto
        INNER JOIN usuario u ON u.id_usuario = pp.id_usuario 
        WHERE u.email = ? AND pp.rol = ? 
        LIMIT $cantidad_proyectos offset $offset";
        $stmt = $this->conexion->prepare($query);

        $stmt->bind_param("ss", $correo, $rol);
        $stmt->execute();
        $proyectos = $stmt->get_result();
        $resultado = [];

        while ($proyecto = $proyectos->fetch_assoc()) {
            $resultado[] = new ProyectoDTO(
                $proyecto["id_proyecto"],
                $proyecto["nombre"],
                $proyecto["descripcion"],
                $proyecto["estado"],
                $proyecto["fecha_inicio"],
                $proyecto["fecha_fin"],
            );
        }

        $totalPaginas = $this->obtenerCantidadPaginasPorRol($cantidad_proyectos, $rol, $correo);

        return ["proyectos" => $resultado, "totalPaginas" => $totalPaginas];
    }

    private function obtenerCantidadPaginasPorRol(int $cantidad_proyectos, string $rol, string $correo)
    {
        $query = "SELECT COUNT(*) AS total FROM proyecto p 
        INNER JOIN proyecto_participante pp ON p.id_proyecto = pp.id_proyecto
        INNER JOIN usuario u ON u.id_usuario = pp.id_usuario 
        WHERE u.email = ? AND pp.rol = ?";
        $stmt = $this->conexion->prepare($query);

        $stmt->bind_param("ss", $correo, $rol);
        $stmt->execute();

        $total = $stmt->get_result()->fetch_assoc()['total'];
        $totalPaginas = ceil($total / $cantidad_proyectos);
        return $totalPaginas;
    }

    public function obtenerProyectoPorId($id_proyecto): ProyectoDTO|null
    {
        $query = "SELECT nombre, descripcion, estado, fecha_inicio, fecha_fin from proyecto 
        where id_proyecto = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_proyecto);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();

        if ($resultado == null) {
            return null; //TODO: Se debe arrojar una excepcion de dominio. No es posible que este metodo reciba un id incorrecto
        }

        return new ProyectoDTO(
            $id_proyecto,
            $resultado["nombre"],
            $resultado["descripcion"],
            $resultado["estado"],
            $resultado["fecha_inicio"],
            $resultado["fecha_fin"],
        );
    }

    public function crearProyecto(ProyectoDTO $proyecto): ProyectoDTO
    {
        $nombre = $proyecto->getNombre();
        $descripcion = $proyecto->getDescripcion();
        $estado = $proyecto->getEstado();
        $fecha_inicio = $proyecto->getFechaInicio();
        $fecha_fin = $proyecto->getFechaFin();

        $query = "INSERT INTO proyecto (nombre, descripcion, estado, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($query);

        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }

        if (
            !$stmt->bind_param(
                "sssss",
                $nombre,
                $descripcion,
                $estado,
                $fecha_inicio,
                $fecha_fin,
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

        return new ProyectoDTO(
            $this->conexion->insert_id,
            $nombre,
            $descripcion,
            $estado,
            $fecha_inicio,
            $fecha_fin,
        );

    }

    public function actualizarProyecto(ProyectoDTO $proyecto): ProyectoDTO
    {
        $id_proyecto = $proyecto->getId();
        $nombre = $proyecto->getNombre();
        $descripcion = $proyecto->getDescripcion();
        $estado = $proyecto->getEstado();
        $fecha_inicio = $proyecto->getFechaInicio();
        $fecha_fin = $proyecto->getFechaFin();

        $query = "UPDATE proyecto SET nombre = ?, descripcion = ?, estado = ?, fecha_inicio = ?, fecha_fin = ? 
        WHERE id_proyecto = ?";
        $stmt = $this->conexion->prepare($query);
        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }

        if (
            !$stmt->bind_param(
                "sssssi",
                $nombre,
                $descripcion,
                $estado,
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

        if ($stmt->affected_rows === 0) {
            throw new RuntimeException("No se actualizo ninguna fila o no se realizo ningun cambio"); // TODO: Cambiar Tipo de excepcion, de dominio.  
        }

        return $proyecto;
    }

    public function actualizarEstadoYFechaFin(ProyectoDTO $proyecto): ProyectoDTO
    {
        $id_proyecto = $proyecto->getId();
        $estado = $proyecto->getEstado();
        $fecha_fin = $proyecto->getFechaFin();

        $query = "UPDATE proyecto SET estado = ?, fecha_fin = ? WHERE id_proyecto = ?";
        $stmt = $this->conexion->prepare($query);
        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }

        if (
            !$stmt->bind_param(
                "ssi",
                $estado,
                $fecha_fin,
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

        return $proyecto;
    }

    public function modificarEstadoProyecto(ProyectoDTO $proyecto): ProyectoDTO
    {
        return $this->actualizarEstadoYFechaFin($proyecto);
    }




}