<?php

require_once __DIR__ . "/../DTO/Riesgo/RiesgoDTO.php";
require_once __DIR__ . "/../DTO/Categoria/CategoriaDTO.php";
require_once __DIR__ . "/../DTO/Riesgo/RiesgoCategoriaDTO.php";
require_once __DIR__ . "/../DTO/Riesgo/RiesgoCantidadPlanDTO.php";
require_once __DIR__ . "/../Interface/RepositoryRiesgo.php";

class RiesgoDAO implements RepositoryRiesgo
{
    private $conexion;

    public function __construct($conexion)
    {
        $this->conexion = $conexion;
    }

    public function crearRiesgo(RiesgoDTO $riesgo, int $id_proyecto, int $id_categoria): RiesgoDTO
    {
        $id_riesgo = $this->obtenerUltimoIdRiesgo($id_proyecto);
        $descripcion = $riesgo->getDescripcion();

        if ($id_riesgo === null) {
            $id_riesgo = 0;
        }

        $nuevo_id = $id_riesgo + 1;


        $query = "INSERT INTO riesgo (id_riesgo, descripcion, id_categoria, id_proyecto) VALUES (?, ?, ?, ?)";
        $stmt = $this->conexion->prepare($query);

        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }
        if (
            !$stmt->bind_param(
                "isii",
                $nuevo_id,
                $descripcion,
                $id_categoria,
                $id_proyecto,
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

        return new RiesgoDTO(
            $nuevo_id,
            $descripcion,
            date("Y-m-d hh:mm")
        );

    }
    private function obtenerUltimoIdRiesgo(int $id_proyecto): int|null
    {
        $query = "SELECT MAX(id_riesgo) AS id_riesgo_max FROM riesgo WHERE id_proyecto = ?";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_proyecto);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();
        return $resultado["id_riesgo_max"];

    }
    public function actualizarRiesgo(RiesgoDTO $riesgo, int $id_proyecto, int $id_categoria): RiesgoDTO
    {
        $id_riesgo = $riesgo->getId();
        $descripcion = $riesgo->getDescripcion();
        $query = "UPDATE riesgo SET descripcion = ?, id_categoria = ? 
        WHERE id_riesgo = ? AND id_proyecto = ?";
        $stmt = $this->conexion->prepare($query);

        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }

        if (
            !$stmt->bind_param(
                "siii",
                $descripcion,
                $id_categoria,
                $id_riesgo,
                $id_proyecto,
            )
        ) {
            throw new RuntimeException("Error en bind_param: " . $stmt->error);
        }

        if (!$stmt->execute()) {
            throw new RuntimeException("Error en execute: " . $stmt->error);
        }

        if ($stmt->affected_rows === 0) {
            throw new RuntimeException("No se actualizo ninguna fila o no se realizo ningun cambio"); // TODO: Cambiar Tipo de excepcion, de dominio.  
        }

        return $riesgo;

    }
    public function eliminarRiesgo(int $id_proyecto, int $id_riesgo): int
    {
        $query = "DELETE FROM riesgo WHERE id_proyecto = ? AND id_riesgo = ?";
        $stmt = $this->conexion->prepare($query);

        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }

        if (
            !$stmt->bind_param(
                "ii",
                $id_proyecto,
                $id_riesgo
            )
        ) {
            throw new RuntimeException("Error en bind_param: " . $stmt->error);
        }

        if (!$stmt->execute()) {
            throw new RuntimeException("Error en execute: " . $stmt->error);
        }

        if ($stmt->affected_rows !== 1) {
            throw new RuntimeException("No se elimino el registro del " . $id_riesgo . " del proyecto " . $id_proyecto);
        }

        return $id_riesgo;
    }
    public function obtenerRiesgoPorId(int $id_proyecto, int $id_riesgo): RiesgoCategoriaDTO|null
    {
        $query = "SELECT r.id_riesgo, r.descripcion AS descripcion_riesgo, r.fecha_creacion, r.factor_riesgo, 
        c.id_categoria, c.nombre AS nombre_categoria, c.descripcion AS descripcion_categoria FROM riesgo r 
        INNER JOIN categoria c ON r.id_categoria = c.id_categoria 
        WHERE r.id_riesgo = ? AND r.id_proyecto = ?";
        $stmt = $this->conexion->prepare($query);

        $stmt->bind_param("ii", $id_riesgo, $id_proyecto);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();

        if ($resultado == null) {
            return null;
        }

        return new RiesgoCategoriaDTO(
            new RiesgoDTO(
                $resultado["id_riesgo"],
                $resultado["descripcion_riesgo"],
                $resultado["fecha_creacion"],
                $resultado["factor_riesgo"]
            ),
            new CategoriaDTO(
                $resultado["id_categoria"],
                $resultado["nombre_categoria"],
                $resultado["descripcion_categoria"]
            )
        );
    }
    public function obtenerRiesgosProyecto(int $id_proyecto, int $id_iteracion): array
    {
        $query = "SELECT 
                        r.id_riesgo, 
                        r.descripcion, 
                        r.factor_riesgo, 
                        c.nombre AS nombre_categoria,
                        GROUP_CONCAT(DISTINCT u.nombre ORDER BY u.nombre SEPARATOR ', ') AS responsables,
                        COUNT(DISTINCT e.id_evaluacion) AS evaluado
                    FROM riesgo r
                    INNER JOIN categoria c ON r.id_categoria = c.id_categoria
                    LEFT JOIN participante_riesgo pr ON r.id_riesgo = pr.id_riesgo
                    LEFT JOIN usuario u ON pr.id_usuario = u.id_usuario
                    LEFT JOIN evaluacion e ON r.id_riesgo = e.id_riesgo AND e.id_iteracion = ?
                    WHERE r.id_proyecto = ?
                    GROUP BY r.id_riesgo, r.descripcion, r.factor_riesgo, c.nombre
        ";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("ii", $id_iteracion, $id_proyecto);
        $stmt->execute();
        $riesgos = $stmt->get_result();
        $resultado = [];

        while ($riesgo = $riesgos->fetch_assoc()) {
            $resultado[] = new RiesgoDeProyectoDTO(
                $riesgo["id_riesgo"],
                $riesgo["descripcion"],
                $riesgo["factor_riesgo"],
                $riesgo["responsables"],
                $riesgo["evaluado"],
                $riesgo["nombre_categoria"],
            );
        }
        return $resultado;
    }
    public function obtenerRiesgosProyectoPaginado(int $id_proyecto, int $id_iteracion, int $pagina, int $orden, int $cantidad_pagina = 5): array
    {
        $cantidad_riesgos = $cantidad_pagina;
        $offset = 0;
        if ($pagina > 1) {
            $offset = ($pagina - 1) * $cantidad_riesgos;
        }

        $ordenado = $this->obtenerOrden($orden);

        $ids_string = $this->obtenerIdsRiesgo($ordenado, $cantidad_riesgos, $offset, $id_iteracion, $id_proyecto);

        if ($ids_string == null) {
            return ["riesgos" => [], "totalPaginas" => 0];
        }

        $query = "SELECT 
                        r.id_riesgo, 
                        r.descripcion, 
                        COALESCE(max(CAST(e.impacto AS UNSIGNED) * CAST(e.probabilidad AS UNSIGNED)), 0) AS factor_riesgo,
                        c.nombre AS nombre_categoria,
                        GROUP_CONCAT(DISTINCT u.nombre ORDER BY u.nombre SEPARATOR ', ') AS responsables,
                        COUNT(DISTINCT e.id_evaluacion) AS evaluado
                    FROM riesgo r
                    INNER JOIN categoria c ON r.id_categoria = c.id_categoria
                    LEFT JOIN participante_riesgo pr ON r.id_riesgo = pr.id_riesgo and pr.id_proyecto = r.id_proyecto
                    LEFT JOIN usuario u ON pr.id_usuario = u.id_usuario
                    LEFT JOIN evaluacion e ON r.id_riesgo = e.id_riesgo AND e.id_iteracion = ?
                    WHERE r.id_riesgo in ($ids_string) and r.id_proyecto = ?
                    GROUP BY r.id_riesgo, r.descripcion, c.nombre
                    order by $ordenado
                    ";

        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("ii", $id_iteracion, $id_proyecto);
        $stmt->execute();
        $riesgos = $stmt->get_result();
        $resultado = [];
        while ($riesgo = $riesgos->fetch_assoc()) {
            $resultado[] = new RiesgoDeProyectoDTO(
                $riesgo["id_riesgo"],
                $riesgo["descripcion"],
                $riesgo["factor_riesgo"],
                $riesgo["responsables"],
                $riesgo["evaluado"],
                $riesgo["nombre_categoria"],
            );
        }
        $totalPaginas = $this->obtenerCantidadPaginas($cantidad_riesgos, $id_proyecto);

        return ["riesgos" => $resultado, "totalPaginas" => $totalPaginas];

    }
    private function obtenerOrden($orden): string
    {
        switch ($orden) {
            case 1:
                return "r.id_riesgo asc";
            case 2:
                return "factor_riesgo desc";
            case 3:
                return "factor_riesgo asc";
            default:
                return "r.id_riesgo asc";
        }
    }

    private function obtenerIdsRiesgo(string $ordenado, int $cantidad_riesgos, int $offset, int $id_iteracion, $id_proyecto): string|null
    {

        $queryIds = "SELECT id_riesgo, factor_riesgo
            FROM (
                SELECT r.id_riesgo,
                    CAST(eval.impacto AS UNSIGNED) * CAST(eval.probabilidad AS UNSIGNED) AS factor_riesgo
                FROM riesgo r
                LEFT JOIN (
                    SELECT e.id_riesgo,
                        e.impacto,
                        e.probabilidad,
                        e.id_iteracion,
                        ROW_NUMBER() OVER (PARTITION BY e.id_riesgo ORDER BY e.fecha_realizacion DESC) AS rn
                    FROM evaluacion e
                    where e.id_iteracion = ?
                ) AS eval ON eval.id_riesgo = r.id_riesgo AND eval.rn = 1
                WHERE r.id_proyecto = ?
            ) AS r
            ORDER BY $ordenado
        LIMIT $cantidad_riesgos OFFSET $offset
        ";

        $stmtId = $this->conexion->prepare($queryIds);
        $stmtId->bind_param("ii", $id_iteracion, $id_proyecto);
        $stmtId->execute();
        $resultado = $stmtId->get_result();
        $ids = [];
        while ($fila = $resultado->fetch_assoc()) {
            $ids[] = $fila['id_riesgo'];
        }
        if (count($ids) == 0) {
            return null;
        }

        $ids_string = implode(',', $ids);
        return $ids_string;
    }

    private function obtenerCantidadPaginas(int $cantidadRiesgos, int $id_proyecto): float
    {
        $totalQuery = $this->conexion->query("SELECT COUNT(*) AS total FROM riesgo WHERE id_proyecto = $id_proyecto");
        $totalRiesgo = $totalQuery->fetch_assoc()['total'];
        $totalPaginas = ceil($totalRiesgo / $cantidadRiesgos);

        return $totalPaginas;
    }
    public function actualizarFactorRiesgo(RiesgoDTO $riesgo, int $id_proyecto): RiesgoDTO
    {
        $factor_riesgo = $riesgo->getFactorRiesgo();
        $id_riesgo = $riesgo->getId();
        $query = "UPDATE riesgo SET factor_riesgo= ? WHERE id_riesgo = ? and id_proyecto = ?";
        $stmt = $this->conexion->prepare($query);

        if ($stmt === false) {
            throw new RuntimeException("Error en prepare: " . $this->conexion->error);
        }

        if (
            !$stmt->bind_param(
                "iii",
                $factor_riesgo,
                $id_riesgo,
                $id_proyecto
            )
        ) {
            throw new RuntimeException("Error en bind_param: " . $stmt->error);
        }

        if (!$stmt->execute()) {
            throw new RuntimeException("Error en execute: " . $stmt->error);
        }

        if ($stmt->affected_rows === 0) {
            throw new RuntimeException("No se actualizo ninguna fila o no se realizo ningun cambio"); // TODO: Cambiar Tipo de excepcion, de dominio.  
        }

        return $riesgo;
        
    }
    public function obtenerCantidadTiposPlanes(int $id_proyecto, int $id_riesgo, int $id_iteracion): RiesgoCantidadPlanDTO
    {
        $query = "SELECT r.id_riesgo,
                SUM(CASE WHEN p.tipo = 'minimizacion' THEN 1 ELSE 0 END) AS total_minimizacion,
                SUM(CASE WHEN p.tipo = 'mitigacion' THEN 1 ELSE 0 END) AS total_mitigacion,
                SUM(CASE WHEN p.tipo = 'contingencia' THEN 1 ELSE 0 END) AS total_contingencia
                FROM riesgo r
                LEFT JOIN plan p ON r.id_riesgo = p.id_riesgo
                where p.id_iteracion = ? and r.id_riesgo = ? and r.id_proyecto = ?
                GROUP BY r.id_riesgo";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("iii", $id_iteracion, $id_riesgo, $id_proyecto);
        $stmt->execute();
        $resultado = $stmt->get_result()->fetch_assoc();
        return new RiesgoCantidadPlanDTO(
            $resultado["id_riesgo"],
            $resultado["total_minimizacion"],
            $resultado["total_mitigacion"],
            $resultado["total_contingencia"],
        );
    }
    public function obtenerDatosDashboard(int $id_proyecto, int $id_iteracion): array
    {
        $consultas = [
            // "total_riesgos"=>[
            //     "query" => "Select count(DISTINCT id_riesgo) from riesgo where id_proyecto = ?",
            //     "params"=>["i", $id_proyecto]
            // ], 
            "riesgos_activos" => [
                "query" => "Select count(Distinct e.id_evaluacion) from evaluacion e inner join riesgo r on r.id_riesgo = e.id_riesgo where e.id_proyecto = ? and e.id_iteracion = ? and r.factor_riesgo > 9",
                "params" => ["ii", $id_proyecto, $id_iteracion]
            ],
            "evaluaciones_pendientes" => [
                "query" => "SELECT COUNT(DISTINCT r.id_riesgo) FROM riesgo r LEFT join evaluacion e on r.id_riesgo = e.id_riesgo and e.id_iteracion = ? where r.id_proyecto = ? and e.id_evaluacion is null",
                "params" => ["ii", $id_iteracion, $id_proyecto]
            ],
            "planes_accion" => [
                "query" => "select count(DISTINCT p.id_plan) from riesgo r inner join plan p on p.id_riesgo = r.id_riesgo and p.id_iteracion = ? where r.id_proyecto = ?",
                "params" => ["ii", $id_iteracion, $id_proyecto]
            ],
            "riesgos_atencion" => [
                "query" => "SELECT COUNT(DISTINCT r.id_riesgo) FROM riesgo r
                            INNER JOIN evaluacion e ON r.id_riesgo = e.id_riesgo AND e.id_iteracion = ?
                            WHERE r.factor_riesgo > 35 and r.id_proyecto = ?
                            AND NOT EXISTS (
                                SELECT 1 
                                FROM plan p 
                                WHERE p.id_riesgo = r.id_riesgo 
                                AND p.id_iteracion = ?
                            )",
                "params" => ["iii", $id_iteracion, $id_proyecto, $id_iteracion]
            ],
            "cantidad_categoria" => [
                "query" => "SELECT COUNT(c.id_categoria) FROM categoria c inner join proyecto_categoria pc on c.id_categoria = pc.id_categoria WHERE pc.id_proyecto = ?",
                "params" => ["i", $id_proyecto]
            ]

        ];

        $resultados = [];
        foreach ($consultas as $clave => $consulta) {
            $stmt = $this->conexion->prepare($consulta["query"]);

            // Si hay parámetros, los vinculamos
            if (!empty($consulta["params"])) {
                $stmt->bind_param(...$consulta["params"]);
            }
            $total = null;

            $stmt->execute();
            $stmt->bind_result($total);
            $stmt->fetch();
            $resultados[$clave] = $total;
            $stmt->close();
        }
        return $resultados;
    }
    public function obtenerDatosInformeSeguimiento(int $id_proyecto, int $id_iteracion): array
    {
        $query = "SELECT r.id_riesgo, r.descripcion, r.factor_riesgo,
        CASE
            WHEN r.factor_riesgo is null then 'No se ha iniciado'
            WHEN r.factor_riesgo < 9 then 'Cerrado'
            WHEN r.factor_riesgo >= 9 then 'En curso' 
        END as estado,
        CASE
            WHEN r.factor_riesgo IS NULL THEN 'Desconocida'
            WHEN r.factor_riesgo < 9 THEN 'Nula'
            WHEN r.factor_riesgo >= 9 AND r.factor_riesgo < 36 THEN 'Media'
            WHEN r.factor_riesgo >= 36 AND r.factor_riesgo < 64 THEN 'Alta'
            WHEN r.factor_riesgo >= 64 THEN 'Crítica'
        END as prioridad,
        GROUP_CONCAT(DISTINCT u.nombre ORDER BY u.nombre SEPARATOR ', ') AS responsables
        from riesgo r
        left join participante_riesgo pr on r.id_riesgo = pr.id_riesgo and pr.id_proyecto = r.id_proyecto
        left join usuario u on pr.id_usuario = u.id_usuario
        where r.id_proyecto = ?
        GROUP BY r.id_riesgo, r.descripcion, r.factor_riesgo, estado, prioridad
        ";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_proyecto);
        $stmt->execute();

        $riesgos = $stmt->get_result();

        $resultado = ["riesgos" => []];
        while ($fila = $riesgos->fetch_assoc()) {
            $resultado["riesgos"][] = $fila;
        }

        $resultado["estado"] = $this->obtenerCantidadEstado($id_proyecto);
        $resultado["prioridad"] = $this->obtenerCantidadPrioridad($id_proyecto);

        return $resultado;
    }

     private function obtenerCantidadEstado($id_proyecto)
    {
        $query = "SELECT COUNT(r.id_riesgo) AS total
        FROM (
            SELECT 'No se ha iniciado' AS estado
            UNION ALL
            SELECT 'Cerrado'
            UNION ALL
            SELECT 'En curso'
        ) AS e
        LEFT JOIN (
            SELECT 
                CASE
                    WHEN r.factor_riesgo IS NULL THEN 'No se ha iniciado'
                    WHEN r.factor_riesgo < 9 THEN 'Cerrado'
                    WHEN r.factor_riesgo >= 9 THEN 'En curso' 
                END AS estado,
                r.id_riesgo
            FROM riesgo r
            WHERE r.id_proyecto = ?
        ) AS r ON r.estado = e.estado
        GROUP BY e.estado
        ORDER BY FIELD(e.estado, 'No se ha iniciado', 'En curso', 'Cerrado')";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_proyecto);
        $stmt->execute();
        $riesgos = $stmt->get_result();
        $resultado = [];
        while ($fila = $riesgos->fetch_assoc()) {
            $resultado[] = $fila["total"];
        }
        return $resultado;
    }

    private function obtenerCantidadPrioridad($id_proyecto)
    {
        $query = "SELECT COUNT(r.id_riesgo) AS total
        FROM (
            SELECT 'Desconocida' AS prioridad
            UNION ALL
            SELECT 'Nula'
            UNION ALL
            SELECT 'Media'
            UNION ALL
            SELECT 'Alta'
            UNION ALL
            SELECT 'Critica'
        ) AS p
        LEFT JOIN (
            SELECT 
                CASE
                    WHEN r.factor_riesgo IS NULL THEN 'Desconocida'
                    WHEN r.factor_riesgo < 9 THEN 'Nula'
                    WHEN r.factor_riesgo >= 9 AND r.factor_riesgo < 36 THEN 'Media'
                    WHEN r.factor_riesgo >= 36 AND r.factor_riesgo < 64 THEN 'Alta'
                    WHEN r.factor_riesgo >= 64 THEN 'Crítica'
                END as prioridad,
                r.id_riesgo
            FROM riesgo r
            WHERE r.id_proyecto = ?
        ) AS r ON r.prioridad = p.prioridad
        GROUP BY p.prioridad
        ORDER BY FIELD(p.prioridad, 'Desconocida', 'Nula', 'Media', 'Alta', 'Critica')";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param("i", $id_proyecto);
        $stmt->execute();
        $riesgos = $stmt->get_result();
        $resultado = [];
        while ($fila = $riesgos->fetch_assoc()) {
            $resultado[] = $fila["total"];
        }
        return $resultado;
    }

}