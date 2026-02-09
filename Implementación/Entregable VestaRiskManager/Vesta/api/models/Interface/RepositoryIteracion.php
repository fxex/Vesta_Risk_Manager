<?php

require_once __DIR__ . "/../DTO/Proyecto/IteracionDTO.php";

interface RepositoryIteracion{
    public function crearIteracion(IteracionDTO $iteracion, int $id_proyecto): IteracionDTO;
    public function actualizarIteracion(IteracionDTO $iteracion, int $id_proyecto): IteracionDTO;
    public function eliminarIteracion(int $id_iteracion): int;
    public function obtenerIteracionPorId(int $id_iteracion): IteracionDTO | null;
    public function obtenerIteracionesPaginado(int $id_proyecto, int $pagina, int $cantidad_pagina): array;
    public function obtenerTodasIteracionesProyectoPorId(int $id_proyecto): array;
    public function obtenerIteracionActual(int $id_proyecto, string $fecha_actual): IteracionDTO;
    public function obtenerUltimaIteracion(int $id_proyecto): IteracionDTO;
    public function obtenerUltimasIteraciones(int $id_proyecto, string $fecha_actual): array;
    
}