<?php
use PHPUnit\Framework\TestCase;
require_once __DIR__ . "/../api/controllers/gestorRiesgo.php";

$gestor = new GestorRiesgo();

$datos = $gestor->obtenerRiesgoProyecto(1);
print_r($datos[5]);
