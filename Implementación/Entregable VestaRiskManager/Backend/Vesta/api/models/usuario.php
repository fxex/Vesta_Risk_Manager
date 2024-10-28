<?php

class Usuario {
    private $nombre, $email, $conexion;
    
    function __construct($nombre=null, $email=null, $conexion) {
        $this->nombre = $nombre;
        $this->email = $email;
        $this->conexion = $conexion;
    }

    public function getNombre(){
        return $this->nombre;
    }

    public function getEmail(){
        return $this->email;
    }

    public function setNombre($nombre){
        $this->nombre = $nombre;
    }

    public function setEmail($email){
        $this->email = $email;
    }

    public function crearUsuario(){
        $query = "INSERT INTO usuario (nombre, email) VALUES (?, ?)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("ss", $this->nombre, $this->email);
        if ($stmt->execute()) {
            return $this->conexion->insert_id;
        } else {
            throw new Exception("Error al crear el usuario: " . $stmt->error);
        }
        
    }

    public function obtenerTodosUsuarios(){
        $usuarios = $this->conexion->query("select * from usuario");
        $resultado = [];
        while ($fila = $usuarios->fetch_assoc()) {
            $resultado[] = $fila;
        }
        return $resultado;
    }

    // Obtener usuario por ID
    public function obtenerUsuarioId($id) {
        $query = "SELECT u.nombre as nombre_usuario, u.email,p.id_perfil, p.nombre as nombre_perfil FROM usuario u INNER JOIN usuario_perfil up on u.id_usuario = up.id_usuario INNER JOIN perfil p on up.id_perfil = p.id_perfil WHERE u.id_usuario = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();
        $this->setNombre($resultado["nombre_usuario"]);
        $this->setEmail($resultado["email"]);

        return $resultado; // Retorna el usuario
    }

    public function obtenerUsuariosNombre() {
        $query = "SELECT u.nombre as nombre_usuario, u.email,p.id_perfil, p.nombre as nombre_perfil FROM usuario u INNER JOIN usuario_perfil up on u.id_usuario = up.id_usuario INNER JOIN perfil p on up.id_perfil = p.id_perfil WHERE u.nombre like ?";
        $stmt = $this->conexion->prepare($query);
        $search = "%". $this->nombre ."%";
        $stmt->bind_param("s", $search);
        $stmt->execute();
        $usuarios = $stmt->get_result();
        $resultado = [];
        while ($fila = $usuarios->fetch_assoc()) {
            $resultado[] = $fila;
        }

        return $resultado; // Retorna el usuario
    }
    // Obtener usuario por Email
    public function obtenerUsuarioEmail() {
        $query = "SELECT u.nombre as nombre_usuario, u.email, p.nombre as nombre_perfil FROM usuario u INNER JOIN usuario_perfil up on u.id_usuario = up.id_usuario INNER JOIN perfil p on up.id_perfil = p.id_perfil WHERE u.email = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("s", $this->email);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();

        $this->setNombre($resultado["nombre_usuario"]);

        return $resultado; // Retorna el usuario
    }

    // Actualizar usuario
    public function actualizarUsuario($id) {
        $query = "UPDATE usuario SET nombre = ?, email = ? WHERE id_usuario = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("ssi", $this->nombre, $this->email, $id);

        if (!$stmt->execute()) {
            throw new Exception("Error al actualizar el usuario: " . $stmt->error);
            return false;
        }else{
            return true;
        }
    }

    // Eliminar usuario
    public function eliminarUsuario($id) {
        $query = "DELETE FROM usuario WHERE id_usuario = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id);

        if (!$stmt->execute()) {
            throw new Exception("Error al eliminar el usuario: " . $stmt->error);
            return false;
        }else{
            return true;
        }
    }

}
