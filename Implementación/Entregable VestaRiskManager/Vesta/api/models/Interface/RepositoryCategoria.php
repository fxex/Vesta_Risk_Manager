<?php

require_once __DIR__ . "/../DTO/Categoria/CategoriaDTO.php";

interface RepositoryCategoria{
    public function crearCategoria(CategoriaDTO $categoria): CategoriaDTO;
    public function actualizarCategoria(CategoriaDTO $categoria): CategoriaDTO;
    public function eliminarCategoria(int $id_categoria): int;
    public function obtenerCategoriaPorId(int $id_categoria): CategoriaDTO | null;
    public function obtenerCategoriaPorNombre(string $nombre): int | null;
    public function obtenerCategoriasGenerales(): array;
    public function obtenerCategoriasProyectoPorId(int $id_proyecto): array;
    public function obtenerDatosGraficoTelaraña(int $id_proyecto): array;
    public function obtenerCategoriasGeneralesPaginado(int $pagina, int $cantidad_pagina): array;
}