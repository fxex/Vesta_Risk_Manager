<?php

require_once __DIR__ . "/../DTO/Riesgo/RiesgoDTO.php";
require_once __DIR__ . "/../DTO/Riesgo/RiesgoCategoriaDTO.php";

interface RepositoryRiesgo{
    public function crearRiesgo(RiesgoDTO $riesgo, int $id_proyecto, int $id_categoria): RiesgoDTO;
    public function actualizarRiesgo(RiesgoDTO $riesgo, int $id_proyecto, int $id_categoria): RiesgoDTO;
    public function eliminarRiesgo(int $id_proyecto, int $id_riesgo): int;
    public function obtenerRiesgoPorId(int $id_proyecto, int $id_riesgo): RiesgoCategoriaDTO | null;
    public function obtenerRiesgosProyecto(int $id_proyecto, int $id_iteracion): array;
    public function obtenerRiesgosProyectoPaginado(int $id_proyecto, int $id_iteracion, int $pagina, int $orden): array;
    public function actualizarFactorRiesgo(RiesgoDTO $riesgo, int $id_proyecto): RiesgoDTO;
    public function obtenerCantidadTiposPlanes(int $id_proyecto, int $id_riesgo, int $id_iteracion): RiesgoCantidadPlanDTO;
    public function obtenerDatosDashboard(int $id_proyecto, int $id_iteracion): array;
    public function obtenerDatosInformeSeguimiento(int $id_proyecto, int $id_iteracion): array;
    
}