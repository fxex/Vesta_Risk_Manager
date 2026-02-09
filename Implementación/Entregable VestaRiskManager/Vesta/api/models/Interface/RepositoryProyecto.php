<?php

require_once __DIR__ . "/../DTO/Proyecto/IteracionDTO.php";
require_once __DIR__ . "/../DTO/Proyecto/ProyectoDTO.php";
require_once __DIR__ . "/../DTO/Proyecto/ProyectoCategoriaDTO.php";
require_once __DIR__ . "/../DTO/Proyecto/ProyectoIteracionDTO.php";

interface RepositoryProyecto{
    public function crearProyecto(ProyectoDTO $proyecto): ProyectoDTO;
    public function actualizarProyecto(ProyectoDTO $proyecto): ProyectoDTO;
    public function obtenerProyectoPorId(int $id_proyecto): ProyectoDTO | null;
    public function obtenerTodosProyectos(): array;
    public function obtenerTodosProyectoPorRol(string $rol, string $correo): array;
    public function obtenerTodosProyectosPaginado(int $pagina, int $orden, int $cantidad_pagina): array;
    public function obtenerTodosProyectosPorRolPaginado(string $rol, string $correo, int $pagina, int $cantidad_pagina): array;
    public function actualizarEstadoYFechaFin(ProyectoDTO $proyecto): ProyectoDTO;
    public function modificarEstadoProyecto(ProyectoDTO $proyecto): ProyectoDTO;
    
}