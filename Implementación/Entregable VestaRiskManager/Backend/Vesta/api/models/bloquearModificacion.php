<?php
class Bloquear{
    public static function bloquearModificacion($nombre, $id_nombre,$token){
        $archivo = __DIR__ . "/../bloqueo/{$nombre}_{$id_nombre}_lock.tmp";
    
        // Verifica si el recurso ya está bloqueado
        if (file_exists($archivo)) {
            $timestampActual = time();
            $lockInfo = json_decode(file_get_contents($archivo), true);
            
            if ($lockInfo["token"] === $token) {
                return ['bloqueado' => false];
            }
            
            if ($timestampActual - $lockInfo["timestamp"] >= 600) {
                unlink($archivo);
                file_put_contents($archivo, json_encode(['timestamp' => time(), "token" => $token]));
                return ['bloqueado' => false];
            }
            return ['bloqueado' => true];
        }
        // Bloquea el recurso creando el archivo
        file_put_contents($archivo, json_encode(['timestamp' => time(), "token" => $token]));
        return ['bloqueado' => false];
        
    }

    public static function desbloquearModificacion($nombre, $id_nombre, $token){
        $archivo = __DIR__ . "/../bloqueo/{$nombre}_{$id_nombre}_lock.tmp";
    
        if (file_exists($archivo)) {
            $timestampActual = time();
            $lockInfo = json_decode(file_get_contents($archivo), true);
            
            if ($lockInfo["token"] === $token) {
                unlink($archivo); 
                return ['desbloqueado' => true];
            }

            if ($timestampActual - $lockInfo["timestamp"] >= 600) {
                unlink($archivo);
                return ['desbloqueado' => true];
            }

            return ['desbloqueado' => false];
        }
        return ['desbloqueado' => false];
    }
}