<?php

require_once __DIR__ . "/../DTO/Usuario/UsuarioDTO.php";
require_once __DIR__ . "/../DTO/Usuario/ParticipanteDTO.php";
require_once __DIR__ . "/../DTO/Usuario/PerfilDTO.php";
require_once __DIR__ . "/../DTO/Usuario/UsuarioPerfilDTO.php";

class UsuarioDAO
{
    private $conexion;
    function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function crearUsuario(UsuarioDTO $usuario)
    {
        $nombre = $usuario->getNombre();
        $correo = $usuario->getCorreo();

        $query = "INSERT INTO usuario (nombre, email) VALUES (?, ?)";

        $stmt = $this->conexion->prepare($query);

        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }

        if (
            !$stmt->bind_param(
                "ss",
                $nombre,
                $correo
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

        return new UsuarioDTO(
            $this->conexion->insert_id,
            $nombre,
            $correo
        );

    }

    public function obtenerTodosUsuarios(int $pagina, int $cantidad_pagina = 10)
    {
        $usuariosPorPagina = $cantidad_pagina;
        $offset = 0;
        if ($pagina > 1) {
            $offset = ($pagina - 1) * $usuariosPorPagina;
        }

        $usuarios = $this->conexion->query("SELECT id_usuario, nombre, email FROM usuario LIMIT $usuariosPorPagina OFFSET $offset");
        $resultado = [];
        while ($usuario = $usuarios->fetch_assoc()) {
            $resultado[] = new UsuarioDTO(
                $usuario["id_usuario"],
                $usuario["nombre"],
                $usuario["email"]
            );
        }
        $totalPaginas = $this->obtenerCantidadUsuario($usuariosPorPagina);
        return ["usuarios" => $resultado, "totalPaginas" => $totalPaginas];
    }

    private function obtenerCantidadUsuario(int $usuariosPorPagina)
    {
        $totalQuery = $this->conexion->query("SELECT COUNT(*) AS total FROM usuario");
        $totalUsuarios = $totalQuery->fetch_assoc()['total'];
        $totalPaginas = ceil($totalUsuarios / $usuariosPorPagina);

        return $totalPaginas;
    }


    public function obtenerUsuarioPorId(int $id_usuario)
    {
        $query = "SELECT u.nombre AS nombre_usuario, u.email, p.id_perfil, p.nombre AS nombre_perfil FROM usuario u 
        INNER JOIN usuario_perfil up ON u.id_usuario = up.id_usuario 
        INNER JOIN perfil p ON up.id_perfil = p.id_perfil 
        WHERE u.id_usuario = ?";
        $stmt = $this->conexion->prepare($query);

        $stmt->bind_param("i", $id_usuario);
        $stmt->execute();

        $resultado = $stmt->get_result()->fetch_assoc();

        return new UsuarioPerfilDTO(
            new UsuarioDTO(
                $id_usuario,
                $resultado["nombre_usuario"],
                $resultado["email"]
            ),
            new PerfilDTO(
                $resultado["id_perfil"],
                $resultado["nombre_perfil"]
            )
        );
    }

    public function obtenerUsuariosPorNombre(string $nombre)
    {
        $query = "SELECT u.id_usuario, u.nombre AS nombre_usuario, u.email, p.id_perfil, p.nombre AS nombre_perfil 
        FROM usuario u 
        INNER JOIN usuario_perfil up ON u.id_usuario = up.id_usuario 
        INNER JOIN perfil p ON up.id_perfil = p.id_perfil 
        WHERE u.nombre like ? and p.nombre != 'Administrador'";

        $stmt = $this->conexion->prepare($query);
        $search = "%" . $nombre . "%";

        $stmt->bind_param("s", $search);
        $stmt->execute();
        $usuarios = $stmt->get_result();
        $resultado = [];

        while ($usuario = $usuarios->fetch_assoc()) {
            $resultado[] = new UsuarioPerfilDTO(
                new UsuarioDTO(
                    $usuario["id_usuario"],
                    $usuario["nombre_usuario"],
                    $usuario["email"],
                ),
                new PerfilDTO(
                    $usuario["id_perfil"],
                    $usuario["nombre_perfil"],
                )
            );
        }

        return $resultado;
    }

    public function obtenerUsuarioPorNombreIgual(string $nombre)
    {
        $query = "SELECT u.nombre AS nombre_usuario, u.email, p.id_perfil, p.nombre AS nombre_perfil 
        FROM usuario u 
        INNER JOIN usuario_perfil up ON u.id_usuario = up.id_usuario 
        INNER JOIN perfil p ON up.id_perfil = p.id_perfil 
        WHERE u.nombre = ?";

        $stmt = $this->conexion->prepare($query);
        $search = $nombre;
        $stmt->bind_param("s", $search);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();

        if ($resultado == null) {
            return null;
        }

        return new UsuarioPerfilDTO(
            new UsuarioDTO(
                $resultado["id_usuario"],
                $resultado["nombre_usuario"],
                $resultado["email"],
            ),
            new PerfilDTO(
                $resultado["id_perfil"],
                $resultado["nombre_perfil"],
            )
        );
    }

    public function obtenerUsuarioPorCorreo($correo)
    {
        $query = "SELECT u.id_usuario, u.nombre AS nombre_usuario, u.email, p.id_perfil, p.nombre AS nombre_perfil 
        FROM usuario u 
        INNER JOIN usuario_perfil up ON u.id_usuario = up.id_usuario 
        INNER JOIN perfil p ON up.id_perfil = p.id_perfil 
        WHERE u.email = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("s", $correo);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();

        if ($resultado == null) {
            return null;
        }

        return new UsuarioPerfilDTO(
            new UsuarioDTO(
                $resultado["id_usuario"],
                $resultado["nombre_usuario"],
                $resultado["email"],
            ),
            new PerfilDTO(
                $resultado["id_perfil"],
                $resultado["nombre_perfil"],
            )
        );
    }

    public function actualizarUsuario(UsuarioDTO $usuario)
    {
        $id_usuario = $usuario->getId();
        $nombre = $usuario->getNombre();
        $correo = $usuario->getCorreo();

        $query = "UPDATE usuario SET nombre = ?, email = ? WHERE id_usuario = ?";
        $stmt = $this->conexion->prepare($query);

        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }

        if (
            !$stmt->bind_param(
                "ssi",
                $nombre,
                $correo,
                $id_usuario
            )
        ) {
            throw new RuntimeException("Error en bind_param: " . $stmt->error);
        }

        if (!$stmt->execute()) {
            throw new RuntimeException("Error en execute: " . $stmt->error);
        }

        if ($stmt->affected_rows === 0) {
            throw new RuntimeException("No se actualizo ninguna fila o no cambio ninguna");
        }

        return $usuario;
    }

    public function eliminarUsuario($id_usuario)
    {
        $query = "DELETE FROM usuario WHERE id_usuario = ?";
        $stmt = $this->conexion->prepare($query);

        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }

        if (
            !$stmt->bind_param(
                "i",
                $id_usuario
            )
        ) {
            throw new RuntimeException("Error en bind_param: " . $stmt->error);
        }

        if (!$stmt->execute()) {
            throw new RuntimeException("Error en execute: " . $stmt->error);
        }

        if ($stmt->affected_rows !== 1) {
            throw new RuntimeException("No se elimino el registro del " . $id_usuario);
        }

        return $id_usuario;
    }

    public function obtenerIdUsuarioPorNombre(string $nombre)
    {
        $query = "SELECT id_usuario FROM usuario WHERE nombre = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("s", $nombre);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();
        return $resultado["id_usuario"]; 
    }

    public function obtenerParticipanteProyectoPorId(int $id_proyecto)
    {
        $query = "SELECT u.id_usuario, u.nombre, u.email, pp.rol FROM `proyecto` p 
        INNER JOIN proyecto_participante pp ON p.id_proyecto = pp.id_proyecto 
        INNER JOIN usuario u ON u.id_usuario = pp.id_usuario 
        WHERE p.id_proyecto = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_proyecto);
        $stmt->execute();
        $participantes = $stmt->get_result();

        $resultado = [];
        while ($participante = $participantes->fetch_assoc()) {
            $resultado[] = new ParticipanteDTO(
                $participante["id_usuario"],
                $participante["nombre"],
                $participante["email"], 
                $participante["rol"]
            );
        }
        return $resultado;
    }

    public function obtenerRolParticipanteProyecto(int $id_proyecto, int $id_usuario){
        $query = "SELECT rol from proyecto_participante where id_proyecto = ? and id_usuario = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("ii", $id_proyecto, $id_usuario);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();

        return $resultado["rol"];
    }


}