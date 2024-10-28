<?php
class vincularTabla{
    public static function crearVinculo($conexion, $tabla, $nombre1, $nombre2, $id_primero, $id_segundo){
        $query = "INSERT INTO {$tabla} ({$nombre1}, {$nombre2}) VALUES (?, ?)";
        $stmt = $conexion->prepare($query);
        $stmt->bind_param("ii", $id_primero, $id_segundo);
        if (!$stmt->execute()) {
            throw new Exception("Error al asociar: " . $stmt->error);
        }
    }

    public static function modificarVinculo($conexion, $tabla, $nombre1, $nombre2, $id_primero, $id_segundo){
        $query = "UPDATE {$tabla} set {$nombre2} = ? where {$nombre1} = ?";
        $stmt = $conexion->prepare($query);
        $stmt->bind_param("ii", $id_segundo, $id_primero);
        if (!$stmt->execute()) {
            throw new Exception("Error al asociar: " . $stmt->error);
        }
    }

    public static function eliminarVinculo($conexion, $tabla, $nombre1, $id_primero){
        $query = "DELETE FROM {$tabla} where {$nombre1} = ?";
        $stmt = $conexion->prepare($query);
        $stmt->bind_param("i", $id_primero);
        if (!$stmt->execute()) {
            throw new Exception("Error al asociar: " . $stmt->error);
        }
    }

}
