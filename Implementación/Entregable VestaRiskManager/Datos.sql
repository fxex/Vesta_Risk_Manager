-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-10-2024 a las 19:07:29
-- Versión del servidor: 11.2.0-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdvestariskmanager`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`, `descripcion`) VALUES
(1, 'Compromiso del Cliente', 'Evalúa el grado de involucramiento y disposición del cliente para colaborar activamente en el proyecto. Un cliente comprometido aporta claridad y toma decisiones a tiempo, lo que facilita la alineación con los objetivos del proyecto.'),
(2, 'Definición del Cliente', 'Se refiere a la claridad con la que se han especificado los requerimientos y expectativas del cliente para el proyecto. Es crucial para evitar malentendidos y asegurar que el proyecto cumpla con las expectativas finales.'),
(3, 'Cronograma', 'Esta categoría evalúa los plazos y la planificación temporal del proyecto. Incluye la duración estimada y los hitos importantes para asegurar el cumplimiento de fechas límite.'),
(4, 'Experiencia y Capacidad', 'Considera la experiencia y habilidades del equipo asignado al proyecto, así como su capacidad para cumplir con las demandas específicas del trabajo.'),
(5, 'Duración y Tamaño', 'Evalúa el alcance total del proyecto en términos de duración y cantidad de tareas involucradas. Los proyectos de mayor tamaño y duración tienden a presentar más riesgos debido a la complejidad de su administración.'),
(6, 'Legal y Contractual', 'Involucra los aspectos legales, normativos y de cumplimiento de los contratos asociados al proyecto. Incluye temas de propiedad intelectual, obligaciones contractuales, y términos de servicio.'),
(7, 'Tecnología', 'Esta categoría evalúa la tecnología utilizada en el proyecto, su viabilidad y compatibilidad con otros sistemas o herramientas. También considera la madurez de la tecnología y si es innovadora o ampliamente probada.'),
(8, 'Complejidad', 'Se refiere al nivel de dificultad del proyecto, incluyendo el número de tareas interdependientes, la necesidad de coordinación entre equipos o la integración de sistemas complejos.'),
(9, 'Aspectos Financieros', 'Considera los recursos financieros necesarios para el proyecto y la estabilidad de las fuentes de financiación. Los proyectos necesitan fondos suficientes y constantes para evitar problemas de presupuesto.'),
(10, 'Subcontratistas', 'Involucra la gestión de los subcontratistas o proveedores externos que participan en el proyecto. La relación y dependencia de terceros introduce riesgos adicionales en la cadena de trabajo.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `id_evaluacion` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `impacto` enum('1','2','3','4','5','6','7','8','9','10') NOT NULL,
  `probabilidad` enum('1','2','3','4','5','6','7','8','9','10') NOT NULL,
  `fecha_realizacion` datetime NOT NULL DEFAULT current_timestamp(),
  `id_usuario` int(11) DEFAULT NULL,
  `id_riesgo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencia`
--

CREATE TABLE `incidencia` (
  `id_incidencia` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_ocurrencia` datetime NOT NULL DEFAULT current_timestamp(),
  `id_riesgo` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `iteracion`
--

CREATE TABLE `iteracion` (
  `id_iteracion` int(11) NOT NULL,
  `nombre` varchar(60) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `id_proyecto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `iteracion`
--

INSERT INTO `iteracion` (`id_iteracion`, `nombre`, `fecha_inicio`, `fecha_fin`, `id_proyecto`) VALUES
(15, 'iteracion 1', '2024-10-30', '2024-11-10', 6),
(19, 'Etapa de Construcción - Iteracion 1', '2024-10-12', '2024-10-29', 4),
(20, 'Etapa de Construcción - Iteracion 2', '2024-10-30', '2024-11-08', 4),
(21, 'Etapa de Construcción - Iteracion 3', '2024-11-09', '2024-11-19', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `iteracion_evaluacion`
--

CREATE TABLE `iteracion_evaluacion` (
  `id_iteracion` int(11) NOT NULL,
  `id_evaluacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `iteracion_plan`
--

CREATE TABLE `iteracion_plan` (
  `id_iteracion` int(11) NOT NULL,
  `id_plan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participante_riesgo`
--

CREATE TABLE `participante_riesgo` (
  `id_usuario` int(11) NOT NULL,
  `id_riesgo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participante_tarea`
--

CREATE TABLE `participante_tarea` (
  `id_usuario` int(11) NOT NULL,
  `id_tarea` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `id_perfil` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`id_perfil`, `nombre`) VALUES
(1, 'Usuario Comun'),
(2, 'Administrador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_permiso`
--

CREATE TABLE `perfil_permiso` (
  `id_perfil` int(11) NOT NULL,
  `id_permiso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `perfil_permiso`
--

INSERT INTO `perfil_permiso` (`id_perfil`, `id_permiso`) VALUES
(2, 1),
(2, 2),
(1, 3),
(2, 3),
(1, 4),
(2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `id_permiso` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `permiso`
--

INSERT INTO `permiso` (`id_permiso`, `nombre`) VALUES
(1, 'Administrar acceso'),
(2, 'Administrar perfil'),
(3, 'Salir'),
(4, 'Ingresar');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan`
--

CREATE TABLE `plan` (
  `id_plan` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `tipo` enum('minimizacion','mitigacion','contingencia') NOT NULL,
  `id_riesgo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id_proyecto` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id_proyecto`, `nombre`, `descripcion`, `estado`, `fecha_inicio`, `fecha_fin`) VALUES
(4, 'Vesta Risk Manager', 'El sistema Vesta Risk Manager se encarga de optimizar la identificación, analisis y monitoreo de los diferentes riesgos que se presentan a la hora de desarrollar software con el fin de asistir en la toma de decisiones y mitigación de los riesgos', 'inactivo', '2024-10-12', '2024-11-19'),
(6, 'Sigma', 'Proyecto destinado a las estimaciones por medio de puntos de casos de uso.', 'inactivo', '2024-10-30', '2024-11-10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_categoria`
--

CREATE TABLE `proyecto_categoria` (
  `id_proyecto` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `proyecto_categoria`
--

INSERT INTO `proyecto_categoria` (`id_proyecto`, `id_categoria`) VALUES
(4, 1),
(6, 1),
(4, 2),
(6, 2),
(4, 3),
(6, 3),
(4, 4),
(6, 4),
(4, 5),
(6, 5),
(4, 6),
(6, 6),
(4, 7),
(6, 7),
(4, 8),
(6, 8),
(4, 9),
(6, 9),
(4, 10),
(6, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_participante`
--

CREATE TABLE `proyecto_participante` (
  `id_proyecto` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `rol` enum('lider del proyecto','desarrollador') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `proyecto_participante`
--

INSERT INTO `proyecto_participante` (`id_proyecto`, `id_usuario`, `rol`) VALUES
(4, 8, 'lider del proyecto'),
(6, 8, 'desarrollador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_riesgo`
--

CREATE TABLE `proyecto_riesgo` (
  `id_proyecto` int(11) NOT NULL,
  `id_riesgo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `riesgo`
--

CREATE TABLE `riesgo` (
  `id_riesgo` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `factor_riesgo` int(11) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `id_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `id_tarea` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `estado` enum('1','0') NOT NULL COMMENT '1: completada, 0: no completada',
  `id_plan` int(11) NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `email`) VALUES
(8, 'Antonio Aguilar', 'hugoantoniofrey2003@gmail.com'),
(9, 'Collareda Agustin', 'collaredaagustinpmg@gmail.com'),
(6, 'Coradeghini Diloff Itzel Naybé', 'coradeghiniitzelnaybe@gmail.com'),
(1, 'Hugo Frey', 'hugofrey202@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_perfil`
--

CREATE TABLE `usuario_perfil` (
  `id_usuario` int(11) NOT NULL,
  `id_perfil` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuario_perfil`
--

INSERT INTO `usuario_perfil` (`id_usuario`, `id_perfil`) VALUES
(6, 1),
(8, 1),
(1, 2),
(9, 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`id_evaluacion`),
  ADD KEY `fk_evaluacion_usuario` (`id_usuario`),
  ADD KEY `fk_evaluacion_riesgo` (`id_riesgo`);

--
-- Indices de la tabla `incidencia`
--
ALTER TABLE `incidencia`
  ADD PRIMARY KEY (`id_incidencia`),
  ADD KEY `fk_incidencia_riesgo` (`id_riesgo`),
  ADD KEY `fk_incidencia_usuario` (`id_usuario`);

--
-- Indices de la tabla `iteracion`
--
ALTER TABLE `iteracion`
  ADD PRIMARY KEY (`id_iteracion`),
  ADD KEY `fk_iteracion_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `iteracion_evaluacion`
--
ALTER TABLE `iteracion_evaluacion`
  ADD PRIMARY KEY (`id_iteracion`),
  ADD KEY `fk_ie_evaluacion` (`id_evaluacion`);

--
-- Indices de la tabla `iteracion_plan`
--
ALTER TABLE `iteracion_plan`
  ADD PRIMARY KEY (`id_iteracion`),
  ADD KEY `fk_ip_plan` (`id_plan`);

--
-- Indices de la tabla `participante_riesgo`
--
ALTER TABLE `participante_riesgo`
  ADD PRIMARY KEY (`id_usuario`,`id_riesgo`),
  ADD KEY `fk_pari_riesgo` (`id_riesgo`);

--
-- Indices de la tabla `participante_tarea`
--
ALTER TABLE `participante_tarea`
  ADD PRIMARY KEY (`id_usuario`,`id_tarea`),
  ADD KEY `fk_pt_tarea` (`id_tarea`);

--
-- Indices de la tabla `perfil`
--
ALTER TABLE `perfil`
  ADD PRIMARY KEY (`id_perfil`);

--
-- Indices de la tabla `perfil_permiso`
--
ALTER TABLE `perfil_permiso`
  ADD PRIMARY KEY (`id_perfil`,`id_permiso`),
  ADD KEY `fk_rp_permiso` (`id_permiso`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD PRIMARY KEY (`id_permiso`);

--
-- Indices de la tabla `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id_plan`),
  ADD KEY `fk_plan_riesgo` (`id_riesgo`);

--
-- Indices de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  ADD PRIMARY KEY (`id_proyecto`);

--
-- Indices de la tabla `proyecto_categoria`
--
ALTER TABLE `proyecto_categoria`
  ADD PRIMARY KEY (`id_proyecto`,`id_categoria`),
  ADD KEY `fk_pc_categoria` (`id_categoria`);

--
-- Indices de la tabla `proyecto_participante`
--
ALTER TABLE `proyecto_participante`
  ADD PRIMARY KEY (`id_proyecto`,`id_usuario`),
  ADD KEY `fk_pp_participante` (`id_usuario`);

--
-- Indices de la tabla `proyecto_riesgo`
--
ALTER TABLE `proyecto_riesgo`
  ADD PRIMARY KEY (`id_proyecto`),
  ADD KEY `fk_pr_riesgo` (`id_riesgo`);

--
-- Indices de la tabla `riesgo`
--
ALTER TABLE `riesgo`
  ADD PRIMARY KEY (`id_riesgo`),
  ADD KEY `fk_riesgo_categoria` (`id_categoria`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`id_tarea`),
  ADD KEY `fk_tarea_plan` (`id_plan`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `UN_USUARIO` (`nombre`,`email`);

--
-- Indices de la tabla `usuario_perfil`
--
ALTER TABLE `usuario_perfil`
  ADD PRIMARY KEY (`id_usuario`,`id_perfil`),
  ADD KEY `fk_ur_perfil` (`id_perfil`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `id_evaluacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `incidencia`
--
ALTER TABLE `incidencia`
  MODIFY `id_incidencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `iteracion`
--
ALTER TABLE `iteracion`
  MODIFY `id_iteracion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `id_perfil` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `permiso`
  MODIFY `id_permiso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `plan`
--
ALTER TABLE `plan`
  MODIFY `id_plan` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id_proyecto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `riesgo`
--
ALTER TABLE `riesgo`
  MODIFY `id_riesgo` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `id_tarea` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD CONSTRAINT `fk_evaluacion_riesgo` FOREIGN KEY (`id_riesgo`) REFERENCES `riesgo` (`id_riesgo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_evaluacion_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `incidencia`
--
ALTER TABLE `incidencia`
  ADD CONSTRAINT `fk_incidencia_riesgo` FOREIGN KEY (`id_riesgo`) REFERENCES `riesgo` (`id_riesgo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_incidencia_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `iteracion`
--
ALTER TABLE `iteracion`
  ADD CONSTRAINT `fk_iteracion_proyecto` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `iteracion_evaluacion`
--
ALTER TABLE `iteracion_evaluacion`
  ADD CONSTRAINT `fk_ie_evaluacion` FOREIGN KEY (`id_evaluacion`) REFERENCES `evaluacion` (`id_evaluacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ie_iteracion` FOREIGN KEY (`id_iteracion`) REFERENCES `iteracion` (`id_iteracion`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `iteracion_plan`
--
ALTER TABLE `iteracion_plan`
  ADD CONSTRAINT `fk_ip_iteracion` FOREIGN KEY (`id_iteracion`) REFERENCES `iteracion` (`id_iteracion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ip_plan` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id_plan`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `participante_riesgo`
--
ALTER TABLE `participante_riesgo`
  ADD CONSTRAINT `fk_pari_participante` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pari_riesgo` FOREIGN KEY (`id_riesgo`) REFERENCES `riesgo` (`id_riesgo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `participante_tarea`
--
ALTER TABLE `participante_tarea`
  ADD CONSTRAINT `fk_pt_participante` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pt_tarea` FOREIGN KEY (`id_tarea`) REFERENCES `tarea` (`id_tarea`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `perfil_permiso`
--
ALTER TABLE `perfil_permiso`
  ADD CONSTRAINT `fk_rp_perfil` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id_perfil`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_rp_permiso` FOREIGN KEY (`id_permiso`) REFERENCES `permiso` (`id_permiso`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `plan`
--
ALTER TABLE `plan`
  ADD CONSTRAINT `fk_plan_riesgo` FOREIGN KEY (`id_riesgo`) REFERENCES `riesgo` (`id_riesgo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `proyecto_categoria`
--
ALTER TABLE `proyecto_categoria`
  ADD CONSTRAINT `fk_pc_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pc_proyecto` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `proyecto_participante`
--
ALTER TABLE `proyecto_participante`
  ADD CONSTRAINT `fk_pp_participante` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pp_proyecto` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `proyecto_riesgo`
--
ALTER TABLE `proyecto_riesgo`
  ADD CONSTRAINT `fk_pr_proyecto` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_pr_riesgo` FOREIGN KEY (`id_riesgo`) REFERENCES `riesgo` (`id_riesgo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `riesgo`
--
ALTER TABLE `riesgo`
  ADD CONSTRAINT `fk_riesgo_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `fk_tarea_plan` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id_plan`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario_perfil`
--
ALTER TABLE `usuario_perfil`
  ADD CONSTRAINT `fk_ur_perfil` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id_perfil`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_ur_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
