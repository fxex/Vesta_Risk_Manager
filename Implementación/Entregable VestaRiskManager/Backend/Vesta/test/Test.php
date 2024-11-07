<?php
use PHPUnit\Framework\TestCase;
require_once __DIR__ . "/../api/controllers/gestorRiesgo.php";

$controlador = new GestorRiesgo();

$iteracion = $controlador->obtenerRiesgoProyecto(4);
print_r($iteracion);