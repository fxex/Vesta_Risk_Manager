<?php
use PHPUnit\Framework\TestCase;
require_once __DIR__ . "/../api/controllers/gestorRiesgo.php";
require_once __DIR__ . "/../api/controllers/gestorProyecto.php";

$gestor = new GestorProyecto();

$datos = $gestor->obtenerIteracionActual(1);
print_r(date("Y-m-d"));
