<?php

require_once __DIR__ . "/../DTO/Usuario/ParticipanteDTO.php";
require_once __DIR__ . "/../DTO/Usuario/PerfilDTO.php";
require_once __DIR__ . "/../DTO/Usuario/UsuarioPerfilDTO.php";
require_once __DIR__ . "/../DTO/Usuario/UsuarioDTO.php";

interface RepositoryUsuario{
    public function crearUsuario(UsuarioDTO $usuario): UsuarioDTO;
    public function actualizarUsuario(UsuarioDTO $usuario): UsuarioDTO;
    public function eliminarUsuario(int $id_usuario): int;
    public function obtenerUsuarioPorId(int $id_usuario): UsuarioPerfilDTO | null;
    public function obtenerTodosUsuariosPaginado(int $pagina, int $cantidad_pagina): array;
    public function obtenerUsuariosPorNombre(string $nombre): array;
    public function obtenerUsuarioPorNombreIgual(string $nombre): UsuarioPerfilDTO | null;
    public function obtenerUsuarioPorCorreo(string $correo): UsuarioPerfilDTO | null;
    public function obtenerIdUsuarioPorNombre(string $nombre): int | null;
    public function obtenerParticipantesProyectoPorId(int $id_proyecto): array;
    public function obtenerRolParticipanteProyecto(int $id_proyecto, int $id_usuario): string;
    public function obtenerParticipantesRiesgo(int $id_proyecto, int $id_riesgo): array;
}