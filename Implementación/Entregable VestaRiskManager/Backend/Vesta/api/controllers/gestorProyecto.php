<?php
require_once __DIR__ . "/../models/proyecto.php";
require_once __DIR__ . "/../models/iteracion.php";
require_once __DIR__ . "/../../config/BDConexion.php";

class GestorProyecto {
    private $conexion, $proyecto;

    function __construct() {
        $this->conexion = BDConexion::getInstancia();
        $this->proyecto = new Proyecto($this->conexion);
        $this->conexion->set_charset("utf8");
        // $this->iteracion = new Iteracion($this->conexion);
    }

    public function obtenerTodosProyecto(){
        $resultado = $this->proyecto->obtenerTodosProyecto();
        return $resultado;
    }

    public function obtenerParticipanteNombre($data){
        $url = "http://localhost/Vesta/participante";
        $jsonData = json_encode($data);
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  // Para obtener la respuesta como string
        curl_setopt($ch, CURLOPT_POST, true);            // Especificar que será un POST
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData); // Pasar los datos JSON

        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Content-Length: ' . strlen($jsonData)
        ]);

        // 6. Ejecutar la solicitud y obtener la respuesta
        $response = curl_exec($ch);

        // 7. Verificar si hubo un error
        if (curl_errno($ch)) {
           return curl_error($ch);
        } else {
            return $response;
        }

        // 8. Cerrar la conexión cURL
        curl_close($ch);
    }

    public function obtenerCategoriasGenerales(){
        $url = "http://localhost/Vesta/categoria/generales";
        
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  // Para obtener la respuesta como string

        $response = curl_exec($ch);
        
        if (curl_errno($ch)) {
            return curl_error($ch);
        } else {
            return $response;
        }
        
        curl_close($ch);
    }


}