-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 16-11-2025 a las 02:27:04
-- Versión del servidor: 8.0.42-33.1
-- Versión de PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `c2871312_bdvesta`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL,
  `nombre` varchar(40) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `estado` enum('activo','inactivo') COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'activo',
  `version` int NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`, `descripcion`, `estado`, `version`) VALUES
(1, 'Compromiso del Cliente', 'Riesgos asociados al nivel de involucramiento y apoyo del cliente en el proyecto, lo que puede afectar su desarrollo y entrega.', 'activo', 1),
(2, 'Definición del Cliente', 'Riesgos derivados de la claridad y estabilidad de los requerimientos del cliente, pudiendo generar cambios inesperados y costos adicionales.', 'activo', 1),
(3, 'Cronograma', 'Riesgos relacionados con retrasos en la planificación y ejecución del proyecto, afectando entregas y costos.', 'activo', 1),
(4, 'Experiencia y Capacidad', 'Riesgos que surgen por la falta de conocimientos, habilidades o experiencia del equipo, lo que puede comprometer la calidad y el éxito del proyecto.', 'activo', 1),
(5, 'Duración y Tamaño', 'Riesgos asociados a la magnitud y tiempo de ejecución del proyecto, donde una mayor duración o tamaño incrementa la probabilidad de imprevistos.', 'activo', 1),
(6, 'Legal y Contractual', 'Riesgos vinculados a aspectos legales, regulaciones y cumplimiento de contratos, lo que puede generar disputas o sanciones.', 'activo', 1),
(7, 'Tecnología', 'Riesgos derivados del uso de tecnologías nuevas o inestables, que pueden generar fallos, incompatibilidades o problemas de implementación.', 'activo', 1),
(8, 'Complejidad', 'Riesgos asociados al grado de dificultad del proyecto en términos técnicos, organizativos o de integración con otros sistemas.', 'activo', 1),
(9, 'Aspectos Financieros', 'Riesgos relacionados con la disponibilidad y gestión de recursos financieros, afectando la viabilidad y sostenibilidad del proyecto.', 'activo', 1),
(10, 'Subcontratistas', 'Riesgos derivados de la dependencia de terceros para la ejecución de partes del proyecto, lo que puede afectar la calidad, tiempos y costos.', 'activo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `id_evaluacion` int NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci NOT NULL,
  `impacto` enum('1','2','3','4','5','6','7','8','9','10') COLLATE utf8mb4_general_ci NOT NULL,
  `probabilidad` enum('1','2','3','4','5','6','7','8','9','10') COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_realizacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_usuario` int DEFAULT NULL,
  `id_riesgo` int NOT NULL,
  `id_proyecto` int NOT NULL,
  `id_iteracion` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evaluacion`
--

INSERT INTO `evaluacion` (`id_evaluacion`, `descripcion`, `impacto`, `probabilidad`, `fecha_realizacion`, `id_usuario`, `id_riesgo`, `id_proyecto`, `id_iteracion`) VALUES
(1, 'Siguen existiendo posibilidades de enfermedad, pero hemos distribuido mejor las tareas', '5', '2', '2025-06-01 00:00:00', 2, 1, 1, 12),
(2, 'Las estimaciones siguen siendo un problema, algunos miembros están sobrecargados', '8', '3', '2025-06-01 00:00:00', 4, 2, 1, 12),
(3, 'La dependencia de un desarrollador clave sigue siendo alta, pero estamos documentando su trabajo', '8', '3', '2025-06-01 00:00:00', 6, 3, 1, 12),
(4, 'La comunicación ha mejorado, pero aún es un punto de atención', '9', '1', '2025-06-01 00:00:00', 2, 4, 1, 12),
(5, 'Los exámenes finales están afectando seriamente la disponibilidad del equipo', '9', '5', '2025-06-01 00:00:00', 4, 5, 1, 12),
(6, 'El conocimiento de PHP ha mejorado, pero aún se cometen errores básicos', '5', '2', '2025-06-01 00:00:00', 6, 7, 1, 12),
(7, 'Implementamos revisiones de Git obligatorias para prevenir pérdidas', '9', '1', '2025-06-01 00:00:00', 2, 8, 1, 12),
(8, 'Los problemas técnicos complejos nos han causado varios bloqueos esta iteración', '7', '4', '2025-06-01 00:00:00', 4, 9, 1, 12),
(9, 'Usamos prettier para unificar estilos de código, reduciendo el problema', '2', '1', '2025-06-01 00:00:00', 6, 10, 1, 12),
(10, 'Seguimos teniendo problemas de compatibilidad entre Windows y Linux', '3', '2', '2025-06-01 00:00:00', 2, 11, 1, 12),
(11, 'La experiencia en gestión ha mejorado con el uso de plantillas', '7', '3', '2025-06-01 00:00:00', 4, 12, 1, 12),
(12, 'Aumentamos la cobertura de pruebas para reducir bugs en producción', '6', '4', '2025-06-01 00:00:00', 6, 13, 1, 12),
(13, 'Documentamos después de cada hito para prevenir pérdida de conocimiento', '9', '2', '2025-06-01 00:00:00', 4, 15, 1, 12),
(14, 'Si alguien se enferma cerca de un hito importante, el equipo podría sobrecargarse. Aunque es poco probable, el impacto sería considerable', '5', '1', '2025-05-31 00:00:00', 4, 1, 1, 13),
(15, 'Nuestro equipo está teniendo problemas para estimar tareas. He visto que algunos compañeros están saturados de trabajo', '8', '2', '2025-05-31 00:00:00', 2, 2, 1, 13),
(16, 'El equipo sigue contando con alta experiencia pero el proyecto esta terminado', '8', '1', '2025-05-31 00:00:00', 6, 3, 1, 13),
(17, 'Nos estamos comunicando correctamente', '9', '1', '2025-05-31 00:00:00', 4, 4, 1, 13),
(18, 'Los examenes finales ya finalizaron', '1', '1', '2025-05-31 00:00:00', 2, 5, 1, 13),
(19, 'En la próxima revisión con el cliente, es casi seguro que pedirán cambios. Debemos reservar tiempo para ajustes', '7', '8', '2025-05-31 00:00:00', 6, 6, 1, 13),
(20, 'La mayoria del equipo pudo experimentar las tecnologias utilizadas', '2', '1', '2025-05-31 00:00:00', 4, 7, 1, 13),
(21, 'Con la separacion de tareas correcta y con los recursos brindados, se evito este riesgo', '9', '1', '2025-05-31 00:00:00', 2, 8, 1, 13),
(22, 'Ya se finalizaron las funciones complejas, no requeria un gran nivel de conocimiento', '5', '1', '2025-05-31 00:00:00', 6, 9, 1, 13),
(23, 'El programador fue uno solo y formateo el codigo con una herramienta automatizada', '2', '1', '2025-05-31 00:00:00', 4, 10, 1, 13),
(24, 'Se establecieron las versiones correspondientes, todo el equipo esta claro con eso', '3', '1', '2025-05-31 00:00:00', 2, 11, 1, 13),
(25, 'En este punto del proyecto, contamos con experiencias de diferentes catedras por lo que mejoramos el analisis de proyectos y viabilidad', '5', '1', '2025-05-31 00:00:00', 6, 12, 1, 13),
(26, 'Hasta ultimo momento se detectaron algunos errores. Se solucionaron y se volvio a probar el software', '6', '2', '2025-05-31 00:00:00', 4, 13, 1, 13),
(27, 'No contamos con sistema de permisos', '1', '1', '2025-05-31 00:00:00', 2, 14, 1, 13),
(28, 'Ya iniciamos el proyecto desde la iteracion C4', '1', '1', '2025-05-31 00:00:00', 6, 15, 1, 13),
(29, 'Se rehizo el uargflow en react y php', '1', '1', '2025-05-31 00:00:00', 4, 16, 1, 13),
(30, 'No se usara un sistema de notificaciones', '1', '1', '2025-05-31 00:00:00', 2, 17, 1, 13),
(31, 'esto es solo una prueba', '3', '6', '2025-09-04 20:10:09', 2, 1, 1, 41),
(33, 'Ya que somos un grupo de 5 integrantes con roles definidos, consideramos que tiene un impacto significante', '7', '3', '2025-09-06 19:13:15', 27, 1, 5, 43),
(34, 'Al ser la primera vez que realizamos un proyecto de software, la cantidad de documentación podría generar una carga acumulativa que provoque esta dificultad', '9', '6', '2025-09-06 19:27:05', 27, 2, 5, 43),
(35, 'Al ser la primera vez del grupo en un proceso de desarrollo podría ocurrir', '9', '6', '2025-09-06 19:30:47', 27, 3, 5, 43),
(36, 'La probabilidad está basada en que los integrantes del grupo deberían tener los conocimientos de diferentes estándares para aplicar en el proyecto', '9', '4', '2025-09-06 19:33:03', 27, 4, 5, 43),
(38, 'Este riesgo se debe a las posibles correcciones de los clientes a lo largo del proyecto', '8', '9', '2025-09-06 19:38:42', 27, 6, 5, 43),
(39, 'El riesgo presenta un impacto de 4 (moderado) porque una mala interpretación de los requerimientos genera retrabajo en entrevistas, documentación y prototipos, afectando tiempos y entregas, aunque no necesariamente paraliza el proyecto completo. La probabilidad se estima en 80–90% ya que, al inicio del proyecto, el alcance y los criterios de aceptación aún no están completamente definidos y pueden surgir interpretaciones diferentes entre el equipo y los docentes, lo que hace muy probable que se produzcan ajustes reiterados', '4', '9', '2025-09-12 13:12:34', 22, 1, 6, 44),
(40, 'La mayoría del equipo no cuenta con experiencia en PHP lo que incrementa la probabilidad de errores y retrabajo al intentar comprender, modificar e integrar UARGFlow. Genera alta probabilidad de retrasos y afectaría de forma significativa la integración con Kairos', '8', '9', '2025-09-09 06:00:42', 18, 1, 4, 42),
(41, 'La ausencia de documentación oficial de UargFlow dificulta la migración y genera incertidumbre, lo que puede derivar en pérdida de funcionalidades o errores no detectados a tiempo obligando a mayor esfuerzo en pruebas y correcciones', '7', '8', '2025-09-09 06:04:36', 18, 2, 4, 42),
(42, 'Si bien la ausencia de un miembro puede afectar el reparto de las tareas, el impacto es bajo ya que el equipo puede reorganizarse y cubrir temporalmente las responsabilidades', '2', '3', '2025-09-09 06:06:43', 18, 3, 4, 42),
(43, 'La falta de experiencia en la estimación de tiempos y tareas puede generar desviaciones importantes entre lo planificado y lo ejecutado lo que afecta el cumplimiento de los plazos y la calidad', '6', '6', '2025-09-09 06:08:53', 18, 4, 4, 42),
(44, 'La ausencia de requerimientos funcionales claramente validados puede provocar desvíos en el desarrollo, con retrabajo y replanificación que afecten las entregas', '6', '5', '2025-09-09 06:10:50', 18, 5, 4, 42),
(45, 'El riesgo tendría un impacto significante si ocurriese, pero debido a que estamos ante un contexto académico donde se busca validar constantemente todas las clases hay baja probabilidad de que el riesgo ocurra', '7', '2', '2025-09-11 21:57:57', 27, 7, 5, 43),
(46, 'El riesgo tendría un impacto significante si ocurriese, pero debido a que el enunciado brindado por la cátedra es bastante claro y no se busca cambiar con frecuencia los requisitos es muy poco probable que ocurra', '8', '2', '2025-09-11 21:59:36', 27, 8, 5, 43),
(47, 'El riesgo se considera de impacto moderado ya que el proyecto no se considera de magnitud grande sino que es un proyecto pequeño, y la probabilidad es baja ya que se están utilizando herramientas de gestión de proyectos para evitar los problemas de comunicación', '6', '3', '2025-09-11 22:03:15', 27, 9, 5, 43),
(48, 'El riesgo es de impacto moderado y probabilidad baja ya que una desactualización o incompatibilidad se resolvería de manera relativamente rápida y fácil', '4', '3', '2025-09-11 22:04:53', 27, 10, 5, 43),
(49, 'Este riesgo tendría un impacto alto ya que cada persona tiene un rol clave asignado y podría dificultar mucho que un integrante abandone el proyecto, pero al menos hasta esta iteración se ve muy poco probable', '9', '1', '2025-09-11 22:06:56', 27, 11, 5, 43),
(50, 'Este riesgo tiene un impacto moderado ya que al haber 5 integrantes, en caso de que alguno deba preparar un examen final habrá otro asignado a realizar esa tarea, y tiene probabilidad intermedia debido a que hay integrantes que van a rendir examen en esta iteración', '6', '4', '2025-09-11 22:09:22', 27, 12, 5, 43),
(51, 'El riesgo tiene un impacto significante debido a que la falta de respuesta pueda perjudicar a la toma de decisiones o al entendimiento de alguna actividad por parte del equipo, pero es poco probable debido a que el equipo de cátedra está a disposición ante cualquier consulta o inquietud', '8', '2', '2025-09-11 22:11:13', 27, 13, 5, 43),
(52, 'El riesgo es considerado significante ya que hará que cada integrante trabaje de forma local y no se permiten ver avances propios a menos que cada uno lo comente por otro medio, pero es de baja probabilidad ya que no es algo que suela ocurrir seguidamente', '8', '1', '2025-09-11 22:13:06', 27, 15, 5, 43),
(53, 'El riesgo presenta un impacto de 4 (moderado) porque, si bien una modificación de requerimientos en esta etapa implica rehacer entrevistas, actualizar la documentación y replanificar el cronograma, todavía no se ha comenzado con la programación ni con pruebas, por lo que el retrabajo se limita principalmente a tareas de análisis y documentación. La probabilidad se estima en el rango de 60–70% debido a que aún estamos en fase inicial de definición de requerimientos candidatos y los docentes brindan feedback constante, lo que hace muy probable que surjan ajustes o nuevas necesidades no previstas.', '4', '7', '2025-09-12 11:47:43', 24, 2, 6, 44),
(54, 'El riesgo presenta un impacto de 5 (moderado) porque una reducción de horas efectivas no implica la imposibilidad de continuar el proyecto, pero sí genera retrasos en hitos y mayor esfuerzo de coordinación. La probabilidad se estima en 70–80% debido a que los integrantes del equipo deben atender otras materias y obligaciones de forma simultánea, lo cual hace muy probable que se resienta la disponibilidad para este proyecto.', '5', '9', '2025-09-12 12:20:46', 24, 11, 6, 44),
(55, 'El riesgo presenta un impacto de 4 (moderado) porque una planificación poco realista y una asignación ineficiente de recursos pueden afectar los tiempos y la calidad de los entregables, aunque no necesariamente bloquean el avance del proyecto. La probabilidad se estima en 70-80% porque, al ser un equipo con poca experiencia práctica en la gestión de proyectos, existe una alta posibilidad de que se cometan errores en la organización inicial.', '4', '8', '2025-09-12 12:24:34', 24, 6, 6, 44),
(56, 'El riesgo presenta un impacto de 5 (moderado) porque un retraso en los entregables iniciales, como los requerimientos, puede generar un efecto en cadena sobre casos de uso y demás actividades dependientes, comprometiendo el cumplimiento de plazos. La probabilidad se estima en 80–90% ya que, en proyectos con plazos ajustados, es frecuente que los entregables iniciales requieran más tiempo del planificado, lo que aumenta el riesgo de atrasos sucesivos.', '5', '9', '2025-09-12 12:32:35', 24, 4, 6, 44),
(57, 'Puede ocurrir que al priorizar la codificación se descuide la actualización de documentos', '4', '6', '2025-09-12 14:27:53', 18, 6, 4, 42),
(58, 'Las herramientas gratuitas suelen tener limites de almacenamiento y aunque no se bloquee el acceso el impacto si ocurre sería importante', '6', '4', '2025-09-12 14:29:25', 18, 7, 4, 42),
(61, 'Al tratarse de nuevas tecnologías es probable que el equipo invierta tiempo en resolver errores básicos y puede retrasar avances importantes', '7', '8', '2025-09-12 14:32:52', 18, 10, 4, 42),
(62, 'Aunque la probabilidad no es tan alta el impacto es grave ya que una mala arquitectura compromete todo el sistema y es costosa de corregir', '10', '6', '2025-09-12 14:34:18', 18, 11, 4, 42),
(63, 'Dado que es muy probable cometer errores con Git/GitHub por la falta de experiencia, la pérdida o inconsistencias en código/documentación impactaría en hacer ajustes', '7', '10', '2025-09-12 14:37:57', 18, 12, 4, 42),
(64, 'El riesgo presenta un impacto de 7 (significante) porque una sobrecarga al final del cuatrimestre puede reducir la calidad de pruebas y documentación, afectando directamente la entrega final. La probabilidad en esta iteración es 10-20% ya que todavía estamos en una fase temprana, pero el tiempo limitado de un cuatrimestre hace previsible que la acumulación ocurra más adelante.', '7', '2', '2025-09-16 12:36:08', 24, 3, 6, 44),
(65, 'El riesgo presenta un impacto de 8 (significante) porque la ausencia de un integrante con conocimientos clave puede frenar el avance del equipo. La probabilidad de que el riesgo ocurra es baja (10%-20%) porque, en esta etapa inicial del proyecto, la carga de trabajo es menor. Sin embargo, esta probabilidad aumentará significativamente a medida que el proyecto avance y la dependencia de este rol se incremente.', '8', '2', '2025-09-16 12:49:46', 24, 5, 6, 44),
(67, 'El riesgo presenta un impacto de 7 (significante) porque el estancamiento en funcionalidades complejas, como la trazabilidad, puede retrasar significativamente las entregas. La probabilidad de que el riesgo ocurra es baja (10%-20%). En la etapa de elaboración, la fase de desarrollo y codificación aún no ha comenzado. Sin embargo, la complejidad técnica de las funcionalidades ya es un factor de riesgo presente. A medida que se avance hacia las fases de programación y pruebas, esta probabilidad aumentará si no se aborda adecuadamente el diseño de estas funcionalidades.', '7', '2', '2025-09-16 13:05:54', 24, 8, 6, 44),
(68, 'El riesgo presenta un impacto de 7 (significante) porque la acumulación de tareas y retrasos en hitos puede comprometer la entrega final del prototipo. La probabilidad de que el riesgo ocurra es baja (10%-20%). A pesar de que la duración de un cuatrimestre es un factor de riesgo inherente, el proyecto se encuentra en una fase temprana. Esto permite un margen de planificación inicial para ajustar el alcance o los recursos. Sin embargo, esta probabilidad aumentará significativamente a medida que el proyecto avance y el cronograma se vuelva más rígido sin que se logren los hitos clave.', '7', '2', '2025-09-16 13:29:24', 24, 9, 6, 44),
(70, 'Si bien no necesariamente genera la cancelación del proyecto ni un daño catastrófico, puede ocasionar retrasos en la entrega por necesidad de retrabajo,  incremento de costos asociados a correcciones tardías y deterioro en la percepción de calidad del producto. Por estos motivos se ubica en un nivel moderado, ya que sus consecuencias son relevantes, aunque controlables con medidas preventivas o correctivas. El rango es del 50–60% porque la carencia de datos de prueba representativos es un problema bastante recurrente en proyectos de software, aunque puede mitigarse con anticipación.', '4', '6', '2025-09-19 14:28:59', 20, 14, 4, 42),
(71, 'Impacto bajo (3): porque las interrupciones generan demoras pero no bloquean el avance del proyecto gracias a alternativas de trabajo remoto.\nProbabilidad media-alta (60–70%): porque en el contexto político-social, estas situaciones son recurrentes y plausibles, aunque no seguras.', '3', '7', '2025-09-19 14:33:44', 20, 15, 4, 42),
(72, 'Las fechas de parciales y entregar tienen fechas distantes.', '4', '3', '2025-09-23 18:15:33', 17, 16, 4, 42),
(73, 'La aplicación de diferentes herramientas para reuniones no presenciales facilitará el intercambio de ideas.', '3', '2', '2025-09-23 18:16:31', 17, 17, 4, 42),
(74, 'La evaluación del riesgo RK05 se basa en la dependencia exclusiva de un único desarrollador, lo que incrementa la probabilidad (70%-80%) de paralización del proyecto ante cualquier imprevisto como sobrecarga, enfermedad o abandono. El impacto significativo (8) se deriva de la posible pérdida de información crucial y el incumplimiento de los plazos establecidos. Se recomienda planificar medidas de mitigación, como la distribución de conocimientos o la incorporación de soporte adicional, para reducir esta vulnerabilidad.', '8', '8', '2025-09-23 18:43:02', 25, 5, 6, 48),
(75, 'Debido a que somos 5 integrantes consideramos un impacto bajo pero probable ya que es una situación que podría ocurrir', '3', '4', '2025-09-24 13:29:35', 27, 1, 5, 50),
(76, 'Consideramos que es un riesgo significante ya que si ocurriera podría generar un desfase pero se considera poco probable que ocurra', '7', '3', '2025-09-24 13:32:17', 27, 2, 5, 50),
(77, 'Se considera un riesgo significante ya que si ocurre podría generar una administración ineficiente, pero la probabilidad es media debido a que ya se cuenta con algo de experiencia de la iteración anterior con respecto a la gestión de tareas', '8', '5', '2025-09-24 13:36:49', 27, 3, 5, 50),
(78, 'Se considera un riesgo de impacto alto debido a que los estándares de calidad son la base fundamental del proyecto, pero que la probabilidad se redujo debido a la investigación del equipo con respecto a los estándares de calidad ', '9', '3', '2025-09-24 13:40:33', 27, 4, 5, 50),
(79, 'Debido a la próxima presentación de prototipos y actividades claves podrían ocurrir numerosas correcciones, por lo cual se considera un riesgo de impacto significante y probabilidad media', '7', '6', '2025-09-24 13:47:00', 27, 6, 5, 50),
(80, 'Debido a la constante comunicación por medio de presentaciones en clase o por otros medios (vía email) para validar los entregables, se considera este riesgo de probabilidad baja', '5', '2', '2025-09-24 13:51:43', 27, 7, 5, 50),
(81, 'Este riesgo puede tener probabilidad media, ya que a la hora de presentar los prototipos puede surgir algún descontento por parte del cliente, lo que deriva en una mala comprensión del equipo a la hora de definir los requerimientos', '7', '6', '2025-09-24 13:57:57', 27, 8, 5, 50),
(82, 'Este riesgo es considerado de probabilidad casi nula debido a que el equipo se encuentra en constante comunicación ', '5', '2', '2025-09-24 14:02:21', 27, 9, 5, 50),
(83, 'Se considera de probabilidad media ya que podría ocurrir, pero de impacto bajo debido a que en esta etapa inicial de integración no tendría un impacto significativo con respecto al proyecto la desactualización de alguna herramienta, por lo que el equipo podría solucionarlo correctamente ', '3', '5', '2025-09-24 14:06:56', 27, 10, 5, 50),
(84, 'Este riesgo se considera de probabilidad nula ya que los integrantes del equipo se encuentran fuertemente comprometidos con el proyecto', '7', '1', '2025-09-24 14:09:13', 27, 11, 5, 50),
(85, 'Este riesgo tiene impacto bajo ya que al estar constantemente comunicados, sabemos con anterioridad qué integrante puede llegar a reducir sus tiempos de tareas, por lo que a la hora de planificar la asignación de las mismas, esto se tiene en cuenta y el equipo puede respaldar a ese integrante en particular, pero se considera de probabilidad alta porque es algo que puede ocurrir ', '2', '8', '2025-09-24 14:14:46', 27, 12, 5, 50),
(86, 'Este riesgo es de probabilidad baja debido a la constante comunicación entre el equipo y los clientes a través de diferentes medios', '7', '2', '2025-09-24 14:17:28', 27, 13, 5, 50),
(87, 'Este riesgo es considerado significante ya que si hubiese un problema con la API de Google no se podrían realizar las pruebas pertinentes definidas en la planificación, por lo que conduciría a retrasos en las pruebas o despliegue de UARGFlow, pero es considerado poco probable que ocurra', '7', '1', '2025-09-24 14:23:29', 27, 15, 5, 50),
(88, 'Aunque no se pueda asistir a clases, el grupo aún puede seguir trabajando en el proyecto.', '1', '2', '2025-09-25 18:36:44', 17, 15, 4, 49),
(89, 'A través de la creación de ramas, políticas de commits, revisiones frecuentes, la perdida de información se minimizó.', '4', '3', '2025-09-25 18:38:27', 17, 12, 4, 49),
(90, 'El equipo aún debe investigar acerca de arquitectura de software y patrones de diseño.', '7', '6', '2025-09-25 18:39:28', 17, 11, 4, 49),
(91, 'Dado que algunas plataformas ofrecen funcionalidades limitadas, esto puede afectar al proyecto.', '7', '8', '2025-09-25 19:10:09', 17, 7, 4, 49),
(92, 'El equipo aún necesita mayor experiencia en el uso de las tecnologías que se utilizaran para el proyecto.', '7', '6', '2025-09-25 19:11:24', 17, 10, 4, 49),
(93, 'El equipo mantiene una planificación para realizar sus actividades en los tiempos establecidos.', '4', '3', '2025-09-25 19:12:13', 17, 16, 4, 49),
(94, 'El equipo realiza reuniones todas las semanas para evaluar avances y discutir inquietudes.', '3', '3', '2025-09-25 19:12:47', 17, 17, 4, 49),
(95, 'Al equipo aún le falta mayor experiencia en el uso de PHP', '7', '6', '2025-09-25 19:13:35', 17, 1, 4, 49),
(96, 'Aún no se cuenta con una documentación detallada del sistema UARGFlow.', '7', '6', '2025-09-25 19:14:36', 17, 2, 4, 49),
(97, 'Cada integrante del equipo mantiene la responsabilidad acerca de sus tareas.', '3', '3', '2025-09-25 19:15:05', 17, 3, 4, 49),
(98, 'Las reuniones con los clientes facilitaron la claridad de las funcionalidades necesarias para el sistema.', '5', '3', '2025-09-25 19:15:53', 17, 5, 4, 49),
(99, 'El equipo debe capacitarse acerca de las tecnologías de testing.', '7', '7', '2025-09-25 19:16:42', 17, 14, 4, 49),
(100, 'El equipo planifica sobre tareas importantes, evitando que el proyecto se aleje de las mismas.', '4', '3', '2025-09-25 19:47:36', 17, 4, 4, 49),
(101, 'El riesgo presenta un impacto de 4 (moderado) porque una mala interpretación de los requerimientos genera retrabajo en entrevistas, documentación y prototipos, afectando tiempos y entregas, aunque no necesariamente paraliza el proyecto completo. La probabilidad se estima en 80–90% ya que, al inicio del proyecto, el alcance y los criterios de aceptación aún no están completamente definidos y pueden surgir interpretaciones diferentes entre el equipo y los docentes, lo que hace muy probable que se produzcan ajustes reiterados', '4', '6', '2025-09-30 07:19:09', 22, 1, 6, 48),
(102, 'El riesgo presenta un impacto de 4 (moderado) porque, si bien una modificación de requerimientos en esta etapa implica rehacer entrevistas, actualizar la documentación y replanificar el cronograma, todavía no se ha comenzado con la programación ni con pruebas, por lo que el retrabajo se limita principalmente a tareas de análisis y documentación. La probabilidad se estima en el rango de 60–70% debido a que aún estamos en fase inicial de definición de requerimientos candidatos y los docentes brindan feedback constante, lo que hace muy probable que surjan ajustes o nuevas necesidades no previstas.', '4', '6', '2025-09-30 07:19:43', 22, 2, 6, 48),
(103, 'El riesgo presenta un impacto de 7 (significante) porque una sobrecarga al final del cuatrimestre puede reducir la calidad de pruebas y documentación, afectando directamente la entrega final. La probabilidad en esta iteración es 10-20% ya que todavía estamos en una fase temprana, pero el tiempo limitado de un cuatrimestre hace previsible que la acumulación ocurra más adelante.', '7', '3', '2025-09-30 07:20:34', 22, 3, 6, 48),
(104, 'El riesgo presenta un impacto de 5 (moderado) porque un retraso en los entregables iniciales, como los requerimientos, puede generar un efecto en cadena sobre casos de uso y demás actividades dependientes, comprometiendo el cumplimiento de plazos. La probabilidad se estima en 80–90% ya que, en proyectos con plazos ajustados, es frecuente que los entregables iniciales requieran más tiempo del planificado, lo que aumenta el riesgo de atrasos sucesivos.', '5', '9', '2025-09-30 07:21:02', 22, 4, 6, 48),
(105, 'El riesgo presenta un impacto de 4 (moderado) porque una planificación poco realista y una asignación ineficiente de recursos pueden afectar los tiempos y la calidad de los entregables, aunque no necesariamente bloquean el avance del proyecto. La probabilidad se estima en 70-80% porque, al ser un equipo con poca experiencia práctica en la gestión de proyectos, existe una alta posibilidad de que se cometan errores en la organización inicial.', '4', '8', '2025-09-30 07:21:49', 22, 6, 6, 48),
(106, 'El riesgo presenta un impacto de 7 (significante) porque el estancamiento en funcionalidades complejas, como la trazabilidad, puede retrasar significativamente las entregas. La probabilidad de que el riesgo ocurra es baja (10%-20%). En la etapa de elaboración, la fase de desarrollo y codificación aún no ha comenzado. Sin embargo, la complejidad técnica de las funcionalidades ya es un factor de riesgo presente. A medida que se avance hacia las fases de programación y pruebas, esta probabilidad aumentará si no se aborda adecuadamente el diseño de estas funcionalidades.', '7', '2', '2025-09-30 07:22:24', 22, 8, 6, 48),
(107, 'El riesgo presenta un impacto de 7 (significante) porque la acumulación de tareas y retrasos en hitos puede comprometer la entrega final del prototipo. La probabilidad de que el riesgo ocurra es baja (10%-20%). A pesar de que la duración de un cuatrimestre es un factor de riesgo inherente, el proyecto se encuentra en una fase temprana. Esto permite un margen de planificación inicial para ajustar el alcance o los recursos. Sin embargo, esta probabilidad aumentará significativamente a medida que el proyecto avance y el cronograma se vuelva más rígido sin que se logren los hitos clave.', '7', '2', '2025-09-30 07:23:03', 22, 9, 6, 48),
(108, 'El riesgo presenta un impacto de 5 (moderado) porque una reducción de horas efectivas no implica la imposibilidad de continuar el proyecto, pero sí genera retrasos en hitos y mayor esfuerzo de coordinación. La probabilidad se estima en 70–80% debido a que los integrantes del equipo deben atender otras materias y obligaciones de forma simultánea, lo cual hace muy probable que se resienta la disponibilidad para este proyecto.', '5', '9', '2025-09-30 07:23:28', 22, 11, 6, 48),
(109, 'Evaluación de prueba del servidor nuevo', '10', '10', '2025-10-21 19:12:05', 4, 1, 1, 52),
(110, 'El riesgo presenta un impacto de 4 (moderado) porque, si no se logra una cobertura adecuada de pruebas unitarias, podrían surgir fallos en los módulos ya desarrollados, afectando la calidad del producto y generando retrabajos que retrasen el avance de la construcción.\nLa probabilidad es del 80%-90% ya que, estando en la fase de construcción, se evidencia que la complejidad funcional de los casos de uso implementados y el tiempo disponible dificultan alcanzar una cobertura integral de pruebas unitarias, aumentando la posibilidad de que este riesgo ocurra.', '4', '9', '2025-10-23 17:08:06', 24, 13, 6, 57),
(114, 'Ya fue mitigado', '1', '1', '2025-10-23 18:43:25', 18, 2, 4, 55),
(115, 'Ya fue mitigado', '1', '1', '2025-10-23 18:44:11', 18, 1, 4, 55),
(117, 'El riesgo presenta una probabilidad de 10%-20% debido a que el proyecto se encuentra en una fase avanzada de entendimiento (Iteración de Construcción), y las ambigüedades en el alcance y los criterios de aceptación ya han sido, en su mayoría, resueltas. El impacto es 4 (Moderado) porque una malinterpretación, aunque conduciría a la necesidad de rehacer documentación y ajustar parte del prototipo, el alcance de los cambios estaría limitado a ciertos requerimientos, lo que resultaría en retrasos manejables sin comprometer la entrega final.', '4', '2', '2025-10-23 20:17:01', 24, 1, 6, 57),
(119, 'El riesgo presenta una probabilidad del 20%-30%, ya que, aunque el desarrollo está avanzado, la revisión continua de los docentes introduce una posibilidad real de modificaciones tardías o nuevas necesidades. El impacto es de 9 (alto) porque cualquier cambio en esta fase obligaría a una replanificación drástica del cronograma y a un retrabajo considerable sobre el código ya implementado, lo cual amenaza el cumplimiento de los plazos de entrega establecidos y aumenta significativamente el esfuerzo requerido.', '9', '3', '2025-10-23 20:23:22', 24, 2, 6, 57),
(121, 'El riesgo presenta un impacto de 5 (moderado) porque, si se produce una sobrecarga de actividades hacia el final del cuatrimestre, podría afectar la calidad de las entregas, especialmente en la documentación y las pruebas, generando errores menores o falta de completitud en el producto final, aunque sin comprometer totalmente el cumplimiento del proyecto. La probabilidad es del 80%–90% ya que, al tratarse de un proyecto con plazos académicos fijos y múltiples tareas simultáneas, es altamente probable que las actividades se acumulen en las últimas etapas, incrementando la presión del equipo y la posibilidad de entregas apresuradas.', '5', '9', '2025-10-23 20:42:34', 24, 3, 6, 57),
(124, 'El riesgo presenta un impacto de 8 (significante) porque los retrasos en entregables clave pueden afectar directamente el cumplimiento del cronograma y generar replanificaciones que alteren la organización general del proyecto. La probabilidad es 30%–40%, ya que si bien se lleva un control constante del avance, las dependencias entre tareas pueden generar demoras en cadena ante cualquier inconveniente puntual.', '8', '4', '2025-10-23 21:24:55', 24, 4, 6, 57),
(126, 'El riesgo presenta un impacto de 9 (alto) porque la indisponibilidad del único desarrollador con conocimiento técnico completo podría detener el progreso del sistema y poner en riesgo la entrega final. La probabilidad es 20%–30%, ya que, aunque es un escenario posible, se implementaron medidas preventivas como la documentación compartida y la transferencia de conocimiento para reducir la dependencia técnica.', '9', '3', '2025-10-23 21:25:56', 24, 5, 6, 57),
(128, 'El riesgo presenta un impacto de 5 (moderado) porque una planificación o gestión ineficiente podría generar entregables de menor calidad o desviaciones de tiempo sin comprometer totalmente el desarrollo. La probabilidad es 60%–70%, debido a que el equipo aún se encuentra en proceso de adquirir experiencia en gestión de proyectos y metodologías, lo que aumenta la posibilidad de errores de estimación o asignación de recursos.', '5', '7', '2025-10-23 21:27:08', 24, 6, 6, 57),
(130, 'El riesgo presenta un impacto de 7 (significante) porque la integración de funcionalidades complejas como trazabilidad, historial y comentarios puede generar dificultades técnicas que afecten los tiempos de desarrollo y la estabilidad del sistema. La probabilidad es 40%–50%, ya que si bien se cuenta con un diseño planificado, la implementación de módulos interconectados incrementa la posibilidad de errores o sobrecarga durante la codificación.', '7', '5', '2025-10-23 21:28:32', 24, 8, 6, 57),
(132, 'El riesgo presenta un impacto de 7 (significante) porque la falta de tiempo para completar todas las fases dentro del cuatrimestre podría afectar la calidad de los entregables y el cumplimiento de los objetivos del proyecto. La probabilidad es 40%–50%, considerando que los plazos académicos son ajustados y el avance depende de la disponibilidad y ritmo de trabajo de todos los integrantes.', '7', '5', '2025-10-23 21:29:26', 24, 9, 6, 57),
(134, 'El riesgo presenta un impacto de 7 (significante) porque la disminución en las horas efectivas dedicadas al proyecto puede generar desequilibrio en la carga de trabajo y retrasos en los hitos planificados. La probabilidad es 40%–50%, ya que la coincidencia con otras materias y compromisos es habitual y puede afectar la disponibilidad semanal de los integrantes.', '7', '5', '2025-10-23 21:30:35', 24, 11, 6, 57),
(138, 'Ausencia entre los días 22 y 25 de Valeria Centurión', '3', '10', '2025-10-24 11:27:10', 18, 3, 4, 55),
(141, 'Nos está generando conflictos repetidos', '7', '10', '2025-10-24 11:46:31', 18, 18, 4, 55),
(147, '.', '7', '7', '2025-10-24 13:59:08', 18, 19, 4, 55),
(150, 'ninguna', '3', '7', '2025-10-24 14:18:07', 2, 1, 5, 60),
(153, 'ninguna', '6', '5', '2025-10-24 14:18:24', 2, 2, 5, 60),
(156, 'ninguna', '6', '6', '2025-10-24 14:10:57', 2, 3, 5, 60),
(159, 'ninguna', '4', '6', '2025-10-24 14:18:53', 2, 4, 5, 60),
(162, 'Ninguna', '2', '8', '2025-10-24 14:19:14', 2, 6, 5, 60),
(165, 'Ninguna', '2', '7', '2025-10-24 14:19:30', 2, 7, 5, 60),
(168, 'Por el Prototipo final', '2', '8', '2025-10-24 14:21:55', 2, 8, 5, 60),
(171, 'Ninguna', '3', '6', '2025-10-24 14:23:14', 2, 9, 5, 60),
(174, 'Ninguna', '3', '4', '2025-10-24 14:23:33', 2, 10, 5, 60),
(177, 'Ninguna', '1', '9', '2025-10-24 14:26:39', 2, 11, 5, 60),
(180, 'Ninguna', '4', '6', '2025-10-24 14:26:55', 2, 12, 5, 60),
(183, 'Ninguna', '2', '8', '2025-10-24 14:27:19', 2, 13, 5, 60),
(186, 'Ninguna', '1', '8', '2025-10-24 14:27:39', 2, 15, 5, 60),
(189, 'ninguna', '6', '7', '2025-10-24 14:28:00', 2, 16, 5, 60),
(192, '.', '4', '4', '2025-10-24 14:28:08', 18, 4, 4, 55),
(195, 'Fueron definidos', '2', '2', '2025-10-24 14:29:02', 18, 5, 4, 55),
(198, 'Fueron definidos los responsables de cada acción', '2', '3', '2025-10-24 14:31:39', 18, 6, 4, 55),
(201, 'Actualmente no presenta riesgo alguno', '3', '4', '2025-10-24 14:32:56', 18, 7, 4, 55),
(204, 'No presenta un riesgo actual, se hicieron capacitaciones al respecto', '3', '3', '2025-10-24 14:33:27', 18, 10, 4, 55),
(207, 'No presenta un riesgo actual', '4', '2', '2025-10-24 14:34:12', 18, 11, 4, 55),
(210, 'Contemplado en otro riesgo específico', '4', '4', '2025-10-24 14:34:47', 18, 12, 4, 55),
(213, 'Investigar sobre pruebas', '7', '6', '2025-10-24 14:36:22', 18, 14, 4, 55),
(216, '.', '2', '2', '2025-10-24 14:38:35', 18, 15, 4, 55),
(219, 'No es un riesgo actual', '2', '2', '2025-10-24 14:38:59', 18, 16, 4, 55),
(222, 'No es un riesgo actual', '4', '2', '2025-10-24 14:39:59', 18, 17, 4, 55),
(225, 'La probabilidad de que ocurra puede darse como no pero si se ocurre tendría un impacto significante ya que está involucrado a un caso de uso de valor esencial', '7', '6', '2025-10-24 17:31:05', 27, 17, 5, 60),
(228, 'Consideramos que este riesgo es significante definirlo de manera previa ya que al definirlo con anterioridad evitará complicaciones a la hora de codificar', '7', '6', '2025-10-24 17:32:56', 27, 18, 5, 60),
(229, 'El riesgo presenta una probabilidad de 10%-20% debido a que el proyecto se encuentra en una fase avanzada de entendimiento (Iteración de Construcción), y las ambigüedades en el alcance y los criterios de aceptación ya han sido, en su mayoría, resueltas. El impacto es 4 (Moderado) porque una malinterpretación, aunque conduciría a la necesidad de rehacer documentación y ajustar parte del prototipo, el alcance de los cambios estaría limitado a ciertos requerimientos, lo que resultaría en retrasos manejables sin comprometer la entrega final.', '4', '2', '2025-10-27 20:27:35', 23, 1, 6, 63),
(230, 'El riesgo presenta una probabilidad del 20%-30%, ya que, aunque el desarrollo está avanzado, la revisión continua de los docentes introduce una posibilidad real de modificaciones tardías o nuevas necesidades. El impacto es de 9 (alto) porque cualquier cambio en esta fase obligaría a una replanificación drástica del cronograma y a un retrabajo considerable sobre el código ya implementado, lo cual amenaza el cumplimiento de los plazos de entrega establecidos y aumenta significativamente el esfuerzo requerido.', '9', '3', '2025-10-27 20:29:26', 23, 2, 6, 63),
(231, 'El riesgo presenta un impacto de 6 (moderado) porque, si se produce una sobrecarga de actividades hacia el final del cuatrimestre, podría afectar la calidad de las entregas, especialmente en la documentación y las pruebas, generando errores menores o falta de completitud en el producto final, aunque sin comprometer totalmente el cumplimiento del proyecto. La probabilidad es del 80%–90% ya que, al tratarse de un proyecto con plazos académicos fijos y múltiples tareas simultáneas, es altamente probable que las actividades se acumulen en las últimas etapas, incrementando la presión del equipo y la posibilidad de entregas apresuradas.', '6', '9', '2025-10-27 20:45:06', 23, 3, 6, 63),
(232, 'El riesgo presenta un impacto de 8 (significante) porque los retrasos en entregables clave pueden afectar directamente el cumplimiento del cronograma y generar replanificaciones que alteren la organización general del proyecto. La probabilidad es 30%–40%, ya que si bien se lleva un control constante del avance, las dependencias entre tareas pueden generar demoras en cadena ante cualquier inconveniente puntual.', '8', '4', '2025-10-27 20:47:26', 23, 4, 6, 63),
(233, 'El riesgo presenta un impacto de 9 (alto) porque la indisponibilidad del único desarrollador con conocimiento técnico completo podría detener el progreso del sistema y poner en riesgo la entrega final. La probabilidad es 20%–30%, ya que, aunque es un escenario posible, se implementaron medidas preventivas como la documentación compartida y la transferencia de conocimiento para reducir la dependencia técnica.', '9', '3', '2025-10-27 20:48:59', 23, 5, 6, 63),
(234, 'El riesgo presenta un impacto de 5 (moderado) porque una planificación o gestión ineficiente podría generar entregables de menor calidad o desviaciones de tiempo sin comprometer totalmente el desarrollo. La probabilidad es 60%–70%, debido a que el equipo aún se encuentra en proceso de adquirir experiencia en gestión de proyectos y metodologías, lo que aumenta la posibilidad de errores de estimación o asignación de recursos.', '5', '7', '2025-10-27 20:52:21', 23, 6, 6, 63),
(235, 'El riesgo presenta un impacto de 7 (significante) porque la integración de funcionalidades complejas como trazabilidad, historial y comentarios puede generar dificultades técnicas que afecten los tiempos de desarrollo y la estabilidad del sistema. La probabilidad es 40%–50%, ya que si bien se cuenta con un diseño planificado, la implementación de módulos interconectados incrementa la posibilidad de errores o sobrecarga durante la codificación.', '7', '5', '2025-10-27 20:55:13', 23, 8, 6, 63),
(236, 'El riesgo presenta un impacto de 7 (significante) porque la falta de tiempo para completar todas las fases dentro del cuatrimestre podría afectar la calidad de los entregables y el cumplimiento de los objetivos del proyecto. La probabilidad es 40%–50%, considerando que los plazos académicos son ajustados y el avance depende de la disponibilidad y ritmo de trabajo de todos los integrantes.', '7', '5', '2025-10-27 20:58:13', 23, 9, 6, 63),
(237, 'El riesgo presenta un impacto de 8 (significante) porque la falta de tiempo para completar todas las fases dentro del cuatrimestre podría afectar la calidad de los entregables y el cumplimiento de los objetivos del proyecto. La probabilidad es 40%–50%, considerando que los plazos académicos son ajustados y el avance depende de la disponibilidad y ritmo de trabajo de todos los integrantes.', '8', '5', '2025-10-27 21:03:25', 23, 11, 6, 63),
(238, 'El riesgo presenta un impacto de 5 (moderado) porque, si no se logra una cobertura adecuada de pruebas unitarias, podrían surgir fallos en los módulos ya desarrollados, afectando la calidad del producto y generando retrabajos que retrasen el avance de la construcción. La probabilidad es del 80%-90% ya que, estando en la fase de construcción, se evidencia que la complejidad funcional de los casos de uso implementados y el tiempo disponible dificultan alcanzar una cobertura integral de pruebas unitarias, aumentando la posibilidad de que este riesgo ocurra.', '5', '9', '2025-10-27 21:08:06', 23, 13, 6, 63),
(240, 'Fallos en la integración implica retrasos en realizar cambios.', '7', '6', '2025-10-28 18:23:26', 17, 20, 4, 55),
(241, 'Poco impacto si el riesgo ocurre', '3', '7', '2025-10-30 20:49:03', 27, 1, 5, 66),
(244, 'Poco impacto si el riesgo ocurre', '4', '3', '2025-10-30 20:50:16', 27, 2, 5, 66),
(247, 'Riesgo poco probable que ocurra ', '6', '2', '2025-10-30 20:51:39', 27, 3, 5, 66),
(250, 'Riesgo poco probable que ocurra ', '4', '3', '2025-10-30 20:52:24', 27, 4, 5, 66),
(253, 'Riesgo de poco impacto si ocurre', '2', '8', '2025-10-30 20:52:46', 27, 6, 5, 66),
(256, 'Riesgo poco probable que ocurra ', '2', '4', '2025-10-30 20:53:15', 27, 7, 5, 66),
(259, 'Riesgo poco probable que ocurra ', '2', '4', '2025-10-30 20:53:39', 27, 8, 5, 66),
(262, 'Riesgo poco probable que ocurra ', '3', '4', '2025-10-30 20:54:03', 27, 9, 5, 66),
(265, 'Riesgo de poco impacto si ocurre', '3', '4', '2025-10-30 20:54:34', 27, 10, 5, 66),
(268, 'Riesgo poco probable que ocurra ', '7', '2', '2025-10-30 20:55:12', 27, 11, 5, 66),
(271, 'Riesgo poco probable que ocurra ', '4', '3', '2025-10-30 20:55:56', 27, 12, 5, 66),
(274, 'Riesgo poco probable que ocurra ', '2', '4', '2025-10-30 20:56:17', 27, 13, 5, 66),
(277, 'Riesgo poco probable que ocurra ', '6', '3', '2025-10-30 20:56:50', 27, 15, 5, 66),
(280, 'Riesgo poco probable que ocurra ', '6', '2', '2025-10-30 21:00:26', 27, 16, 5, 66),
(283, 'Riesgo poco probable que ocurra ', '7', '2', '2025-10-30 21:00:54', 27, 17, 5, 66),
(286, 'Riesgo no tan probable que ocurra', '7', '4', '2025-10-30 21:01:20', 27, 18, 5, 66),
(289, 'Riesgo probable debido a que puede afectar la implementación de los CU de esta iteración', '8', '5', '2025-10-30 21:02:04', 27, 19, 5, 66),
(292, 'Riesgo probable debido a que puede afectar la implementación de los CU de esta iteración', '8', '5', '2025-10-30 21:02:14', 27, 20, 5, 66),
(296, 'No aplica actualmente.', '3', '1', '2025-10-31 12:11:10', 18, 15, 4, 69),
(299, 'No aplica actualmente.', '4', '1', '2025-10-31 12:11:43', 18, 16, 4, 69),
(302, 'No aplica actualmente.', '5', '1', '2025-10-31 12:14:50', 18, 17, 4, 69),
(305, 'Riesgo actual, en proceso de construcción', '7', '5', '2025-10-31 14:18:35', 18, 14, 4, 69),
(308, 'No es riesgo actual', '1', '1', '2025-10-31 14:27:21', 18, 1, 4, 69),
(311, 'No es riesgo actual', '1', '1', '2025-10-31 14:27:32', 18, 2, 4, 69),
(314, 'No es riesgo actual, probablemente no suceda', '3', '2', '2025-10-31 14:28:05', 18, 3, 4, 69),
(317, 'No es riesgo actual', '4', '1', '2025-10-31 14:28:22', 18, 4, 4, 69),
(320, 'No es riesgo actual', '3', '1', '2025-10-31 14:28:35', 18, 5, 4, 69),
(323, 'No es riesgo actual', '6', '3', '2025-10-31 14:29:09', 18, 6, 4, 69),
(326, 'No es riesgo actual', '6', '5', '2025-10-31 14:29:25', 18, 7, 4, 69),
(329, 'No es riesgo actual', '6', '5', '2025-10-31 14:29:42', 18, 10, 4, 69),
(332, 'No es riesgo actual.', '6', '5', '2025-10-31 14:30:08', 18, 11, 4, 69),
(335, 'No es riesgo actual', '6', '4', '2025-10-31 14:30:24', 18, 12, 4, 69),
(338, 'Riesgo mitigado en iteración anterior', '6', '3', '2025-10-31 14:31:11', 18, 19, 4, 69),
(341, 'La integración puede volverse complicada ', '5', '5', '2025-10-31 14:50:41', 17, 18, 4, 69),
(344, 'La integración puede volverse complicada al implementar más módulos ', '6', '5', '2025-10-31 14:51:19', 17, 20, 4, 69),
(347, 'esto es una prueba', '6', '7', '2025-11-04 18:24:27', 2, 1, 1, 71),
(348, 'Riesgo de bajo impacto', '3', '5', '2025-11-07 11:37:56', 27, 1, 5, 81),
(351, 'Riesgo poco probable', '2', '2', '2025-11-07 11:38:19', 27, 2, 5, 81),
(354, 'Riesgo poco probable', '3', '2', '2025-11-07 11:38:40', 27, 3, 5, 81),
(357, 'Riesgo poco probable y de bajo impacto', '2', '2', '2025-11-07 11:39:11', 27, 4, 5, 81),
(360, 'Riesgo poco probable', '3', '3', '2025-11-07 11:39:37', 27, 6, 5, 81),
(363, 'Riesgo de bajo impacto', '3', '4', '2025-11-07 11:39:56', 27, 7, 5, 81),
(366, 'Riesgo poco probable y de bajo impacto', '2', '2', '2025-11-07 11:40:22', 27, 8, 5, 81),
(369, 'Riesgo de bajo impacto', '3', '3', '2025-11-07 11:40:34', 27, 9, 5, 81),
(372, 'Riesgo de bajo impacto', '3', '4', '2025-11-07 11:40:54', 27, 10, 5, 81),
(375, 'Riesgo de bajo impacto', '2', '7', '2025-11-07 11:41:12', 27, 11, 5, 81),
(378, 'Riesgo de impacto moderado', '4', '6', '2025-11-07 11:41:44', 27, 12, 5, 81),
(381, 'Riesgo de bajo impacto', '3', '4', '2025-11-07 11:41:59', 27, 13, 5, 81),
(384, 'Riesgo de muy bajo impacto', '1', '5', '2025-11-07 11:42:21', 27, 15, 5, 81),
(387, 'Riesgo poco probable', '5', '2', '2025-11-07 11:42:38', 27, 16, 5, 81),
(390, 'Riesgo poco probable', '5', '2', '2025-11-07 11:43:13', 27, 17, 5, 81),
(393, 'Riesgo poco probable', '5', '2', '2025-11-07 11:43:33', 27, 18, 5, 81),
(396, 'Riesgo poco probable', '5', '3', '2025-11-07 11:43:43', 27, 19, 5, 81),
(399, 'Riesgo de bajo impacto', '2', '3', '2025-11-07 11:44:00', 27, 20, 5, 81),
(402, 'Debido a que pueden surgir inconvenientes en la integración completa del sistema hay probabilidad de que el riesgo ocurra y tendría un impacto significante ya que tendría que acoplarse a modificaciones', '7', '6', '2025-11-07 11:45:51', 27, 21, 5, 81),
(405, 'El riesgo presenta una probabilidad de 10%-20% debido a que el proyecto se encuentra en una fase avanzada de entendimiento (Iteración de Construcción), y las ambigüedades en el alcance y los criterios de aceptación ya han sido, en su mayoría, resueltas. El impacto es 4 (Moderado) porque una malinterpretación, aunque conduciría a la necesidad de rehacer documentación y ajustar parte del prototipo, el alcance de los cambios estaría limitado a ciertos requerimientos, lo que resultaría en retrasos manejables sin comprometer la entrega final.', '4', '2', '2025-11-07 14:47:45', 23, 1, 6, 108),
(406, 'El riesgo presenta una probabilidad del 20%-30%, ya que, aunque el desarrollo está avanzado, la revisión continua de los docentes introduce una posibilidad real de modificaciones tardías o nuevas necesidades. El impacto es de 9 (alto) porque cualquier cambio en esta fase obligaría a una replanificación drástica del cronograma y a un retrabajo considerable sobre el código ya implementado, lo cual amenaza el cumplimiento de los plazos de entrega establecidos y aumenta significativamente el esfuerzo requerido.', '9', '3', '2025-11-07 14:49:09', 23, 2, 6, 108),
(407, 'El riesgo presenta un impacto de 6 (moderado) porque, si se produce una sobrecarga de actividades hacia el final del cuatrimestre, podría afectar la calidad de las entregas, especialmente en la documentación y las pruebas, generando errores menores o falta de completitud en el producto final, aunque sin comprometer totalmente el cumplimiento del proyecto. La probabilidad es del 80%–90% ya que, al tratarse de un proyecto con plazos académicos fijos y múltiples tareas simultáneas, es altamente probable que las actividades se acumulen en las últimas etapas, incrementando la presión del equipo y la posibilidad de entregas apresuradas.', '6', '9', '2025-11-07 14:50:32', 23, 3, 6, 108),
(408, 'El riesgo presenta un impacto de 8 (significante) porque los retrasos en entregables clave pueden afectar directamente el cumplimiento del cronograma y generar replanificaciones que alteren la organización general del proyecto. La probabilidad es 30%–40%, ya que si bien se lleva un control constante del avance, las dependencias entre tareas pueden generar demoras en cadena ante cualquier inconveniente puntual.', '8', '4', '2025-11-07 14:51:57', 23, 4, 6, 108),
(409, 'El riesgo presenta un impacto de 9 (alto) porque la indisponibilidad del único desarrollador con conocimiento técnico completo podría detener el progreso del sistema y poner en riesgo la entrega final. La probabilidad es 20%–30%, ya que, aunque es un escenario posible, se implementaron medidas preventivas como la documentación compartida y la transferencia de conocimiento para reducir la dependencia técnica.', '9', '3', '2025-11-07 14:53:12', 23, 5, 6, 108),
(410, 'El riesgo presenta un impacto de 5 (moderado) porque una planificación o gestión ineficiente podría generar entregables de menor calidad o desviaciones de tiempo sin comprometer totalmente el desarrollo. La probabilidad es 60%–70%, debido a que el equipo aún se encuentra en proceso de adquirir experiencia en gestión de proyectos y metodologías, lo que aumenta la posibilidad de errores de estimación o asignación de recursos.', '5', '7', '2025-11-07 14:54:16', 23, 6, 6, 108),
(411, 'El riesgo presenta un impacto de 7 (significante) porque la integración de funcionalidades complejas como trazabilidad, historial y comentarios puede generar dificultades técnicas que afecten los tiempos de desarrollo y la estabilidad del sistema. La probabilidad es 40%–50%, ya que si bien se cuenta con un diseño planificado, la implementación de módulos interconectados incrementa la posibilidad de errores o sobrecarga durante la codificación.', '7', '5', '2025-11-07 14:55:46', 23, 8, 6, 108),
(412, 'El riesgo presenta un impacto de 7 (significante) porque la falta de tiempo para completar todas las fases dentro del cuatrimestre podría afectar la calidad de los entregables y el cumplimiento de los objetivos del proyecto. La probabilidad es 40%–50%, considerando que los plazos académicos son ajustados y el avance depende de la disponibilidad y ritmo de trabajo de todos los integrantes.', '7', '5', '2025-11-07 14:59:41', 23, 9, 6, 108),
(413, 'El riesgo presenta un impacto de 8 (significante) porque la falta de tiempo para completar todas las fases dentro del cuatrimestre podría afectar la calidad de los entregables y el cumplimiento de los objetivos del proyecto. La probabilidad es 40%–50%, considerando que los plazos académicos son ajustados y el avance depende de la disponibilidad y ritmo de trabajo de todos los integrantes.', '8', '5', '2025-11-07 15:01:47', 23, 11, 6, 108),
(414, 'El riesgo presenta un impacto de 5 (moderado) porque, si no se logra una cobertura adecuada de pruebas unitarias, podrían surgir fallos en los módulos ya desarrollados, afectando la calidad del producto y generando retrabajos que retrasen el avance de la construcción. La probabilidad es del 80%-90% ya que, estando en la fase de construcción, se evidencia que la complejidad funcional de los casos de uso implementados y el tiempo disponible dificultan alcanzar una cobertura integral de pruebas unitarias, aumentando la posibilidad de que este riesgo ocurra.', '5', '9', '2025-11-07 15:04:10', 23, 13, 6, 108),
(416, 'No es un riesgo actual, ya fue mitigado.', '1', '1', '2025-11-11 10:40:33', 18, 1, 4, 112),
(419, 'No es un riesgo actual, ya fue mitigado.', '1', '1', '2025-11-11 10:40:49', 18, 2, 4, 112),
(422, 'No es un riesgo actual.', '3', '3', '2025-11-11 10:41:13', 18, 3, 4, 112),
(425, 'Riesgo mitigado en iteraciones anteriores', '2', '4', '2025-11-11 11:09:00', 18, 19, 4, 112);
INSERT INTO `evaluacion` (`id_evaluacion`, `descripcion`, `impacto`, `probabilidad`, `fecha_realizacion`, `id_usuario`, `id_riesgo`, `id_proyecto`, `id_iteracion`) VALUES
(428, 'Realizar merge', '7', '8', '2025-11-11 11:09:58', 18, 20, 4, 112),
(431, 'Separar en ramas de trabajo', '4', '7', '2025-11-11 11:11:50', 18, 18, 4, 112),
(434, 'Riesgo mitigado en iteraciones anteriores', '4', '2', '2025-11-11 11:12:46', 18, 4, 4, 112),
(437, 'Riesgo mitigado en iteraciones anteriores', '1', '1', '2025-11-11 11:13:04', 18, 5, 4, 112),
(440, 'Riesgo mitigado en iteraciones anteriores', '3', '4', '2025-11-11 11:17:18', 18, 7, 4, 112),
(443, 'Riesgo mitigado en iteraciones anteriores', '3', '3', '2025-11-11 11:17:33', 18, 10, 4, 112),
(446, 'Riesgo mitigado en iteraciones anteriores', '3', '2', '2025-11-11 11:17:52', 18, 11, 4, 112),
(449, 'Riesgo mitigado en iteraciones anteriores', '3', '1', '2025-11-11 11:18:12', 18, 12, 4, 112),
(452, 'Riesgo mitigado en iteraciones anteriores', '1', '1', '2025-11-11 11:18:28', 18, 15, 4, 112),
(455, 'Riesgo mitigado en iteraciones anteriores', '1', '1', '2025-11-11 11:18:46', 18, 16, 4, 112),
(458, 'Riesgo mitigado en iteraciones anteriores', '1', '1', '2025-11-11 11:18:59', 18, 17, 4, 112),
(461, 'Riesgo a mitigar', '7', '7', '2025-11-11 11:19:29', 18, 14, 4, 112),
(464, 'Riesgo mitigado', '3', '2', '2025-11-11 13:37:25', 18, 6, 4, 112);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencia`
--

CREATE TABLE `incidencia` (
  `id_incidencia` int NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci NOT NULL,
  `gravedad` enum('Alta','Media','Baja') COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_ocurrencia` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_riesgo` int NOT NULL,
  `id_usuario` int DEFAULT NULL,
  `id_proyecto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `iteracion`
--

CREATE TABLE `iteracion` (
  `id_iteracion` int NOT NULL,
  `nombre` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `id_proyecto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `iteracion`
--

INSERT INTO `iteracion` (`id_iteracion`, `nombre`, `fecha_inicio`, `fecha_fin`, `id_proyecto`) VALUES
(1, 'Etapa Inicio - Iteración 1', '2024-08-27', '2024-09-10', 1),
(2, 'Etapa Elaboración - Iteración 1', '2024-09-11', '2024-09-24', 1),
(3, 'Etapa Elaboración - Iteración 2', '2024-09-25', '2024-10-11', 1),
(4, 'Etapa Construcción - Iteración 1', '2024-10-12', '2024-10-29', 1),
(5, 'Etapa Construcción - Iteración 2', '2024-10-30', '2024-11-08', 1),
(6, 'Etapa Construcción - Iteración 3', '2024-11-09', '2024-11-19', 1),
(7, 'Etapa Construcción - Iteración 4', '2025-01-18', '2025-01-27', 1),
(8, 'Etapa Construcción - Iteración 5', '2025-01-28', '2025-02-11', 1),
(9, 'Etapa Construcción - Iteración 6', '2025-03-06', '2025-03-23', 1),
(10, 'Etapa Construcción - Iteración 7', '2025-03-24', '2025-04-06', 1),
(11, 'Etapa Construcción - Iteración 8', '2025-04-24', '2025-05-09', 1),
(12, 'Etapa Construcción - Iteración 9', '2025-05-10', '2025-05-28', 1),
(13, 'Etapa Cierre - Iteración 1', '2025-05-29', '2025-06-12', 1),
(14, 'Etapa Inicio - Iteración 1', '2024-08-27', '2024-09-10', 2),
(15, 'Etapa Elaboración - Iteración 1', '2024-09-11', '2024-09-24', 2),
(16, 'Etapa Elaboración - Iteración 2', '2024-09-25', '2024-10-11', 2),
(17, 'Etapa Construcción - Iteración 1', '2024-10-12', '2024-10-29', 2),
(18, 'Etapa Construcción - Iteración 2', '2024-10-30', '2024-11-08', 2),
(19, 'Etapa Construcción - Iteración 3', '2024-11-09', '2024-11-19', 2),
(20, 'Etapa Construcción - Iteración 4', '2025-01-18', '2025-01-27', 2),
(21, 'Etapa Construcción - Iteración 5', '2025-01-28', '2025-02-11', 2),
(22, 'Etapa Construcción - Iteración 6', '2025-03-06', '2025-03-23', 2),
(23, 'Etapa Construcción - Iteración 7', '2025-03-24', '2025-04-06', 2),
(24, 'Etapa Construcción - Iteración 8', '2025-04-24', '2025-05-09', 2),
(25, 'Etapa Construcción - Iteración 9', '2025-05-10', '2025-05-28', 2),
(26, 'Etapa Cierre - Iteración 1', '2025-05-29', '2025-06-12', 2),
(27, 'Etapa Inicio - Iteración 1', '2024-08-27', '2024-09-10', 3),
(28, 'Etapa Elaboración - Iteración 1', '2024-09-11', '2024-09-24', 3),
(29, 'Etapa Elaboración - Iteración 2', '2024-09-25', '2024-10-11', 3),
(30, 'Etapa Construcción - Iteración 1', '2024-10-12', '2024-10-29', 3),
(31, 'Etapa Construcción - Iteración 2', '2024-10-30', '2024-11-08', 3),
(32, 'Etapa Construcción - Iteración 3', '2024-11-09', '2024-11-19', 3),
(33, 'Etapa Construcción - Iteración 4', '2025-01-18', '2025-01-27', 3),
(34, 'Etapa Construcción - Iteración 5', '2025-01-28', '2025-02-11', 3),
(35, 'Etapa Construcción - Iteración 6', '2025-03-06', '2025-03-23', 3),
(36, 'Etapa Construcción - Iteración 7', '2025-03-24', '2025-04-06', 3),
(37, 'Etapa Construcción - Iteración 8', '2025-04-24', '2025-05-09', 3),
(38, 'Etapa Construcción - Iteración 9', '2025-05-10', '2025-05-28', 3),
(39, 'Etapa Cierre - Iteración 1', '2025-05-29', '2025-06-12', 3),
(40, 'Etapa Cierre - Iteración 2', '2025-06-27', '2025-07-07', 1),
(41, 'Etapa de Despliegue - Iteración 1 ', '2025-09-01', '2025-09-15', 1),
(42, 'Etapa de Elaboración - Iteración 1', '2025-08-09', '2025-09-22', 4),
(43, 'Etapa de Elaboración - Iteración 1', '2025-09-09', '2025-09-22', 5),
(44, 'Etapa de Elaboración - iteración 1', '2025-08-09', '2025-09-22', 6),
(48, 'Etapa de Elaboración - Iteración 2', '2025-09-23', '2025-10-10', 6),
(49, 'Etapa de Elaboración - Iteración 2', '2025-09-23', '2025-10-10', 4),
(50, 'Etapa de Elaboración - Iteración 2', '2025-09-23', '2025-10-10', 5),
(52, 'Etapa de Despliegue - Iteración 2', '2025-10-20', '2025-11-01', 1),
(55, 'Etapa de Construcción - Iteración 1', '2025-10-11', '2025-10-28', 4),
(57, 'Etapa de Construcción - Iteración 1', '2025-10-11', '2025-10-26', 6),
(60, 'Etapa de Construcción - Iteración 1', '2025-10-11', '2025-10-28', 5),
(63, 'Etapa de Construcción - Iteración 2', '2025-10-28', '2025-11-06', 6),
(66, 'Etapa de Construcción - Iteración 2', '2025-10-29', '2025-11-06', 5),
(69, 'Etapa de Construcción - Iteración 2', '2025-10-29', '2025-11-07', 4),
(71, 'Etapa de Despliegue - Iteración 3', '2025-11-04', '2025-11-30', 1),
(77, 'Etapa de Despliegue - Iteración 4', '2025-12-01', '2025-12-30', 1),
(81, 'Etapa de Construcción - Iteración 3', '2025-11-07', '2025-11-18', 5),
(108, 'Etapa de Construcción - Iteración 3', '2025-11-07', '2025-11-14', 6),
(112, 'Etapa de Construcción - Iteración 3', '2025-11-08', '2025-11-14', 4),
(118, '1', '2025-11-11', '2025-11-19', 8),
(121, 'Etapa de Cierre - Iteración 1', '2025-11-15', '2025-11-28', 6),
(124, 'Etapa post Cursada - Iteración 1', '2026-02-09', '2026-02-20', 6),
(127, 'Etapa post Cursada - Iteración 2', '2026-03-09', '2026-03-20', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participante_riesgo`
--

CREATE TABLE `participante_riesgo` (
  `id_usuario` int NOT NULL,
  `id_riesgo` int NOT NULL,
  `id_proyecto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `participante_riesgo`
--

INSERT INTO `participante_riesgo` (`id_usuario`, `id_riesgo`, `id_proyecto`) VALUES
(2, 1, 1),
(4, 1, 1),
(6, 1, 1),
(4, 2, 1),
(6, 2, 1),
(2, 3, 1),
(6, 3, 1),
(4, 4, 1),
(2, 5, 1),
(6, 5, 1),
(2, 6, 1),
(4, 7, 1),
(6, 7, 1),
(2, 8, 1),
(4, 8, 1),
(2, 9, 1),
(6, 9, 1),
(4, 10, 1),
(6, 10, 1),
(2, 11, 1),
(4, 12, 1),
(6, 12, 1),
(2, 13, 1),
(6, 13, 1),
(4, 14, 1),
(2, 15, 1),
(6, 15, 1),
(4, 16, 1),
(6, 16, 1),
(2, 17, 1),
(4, 17, 1),
(18, 1, 4),
(17, 2, 4),
(18, 2, 4),
(19, 2, 4),
(18, 3, 4),
(20, 4, 4),
(21, 4, 4),
(17, 5, 4),
(19, 5, 4),
(20, 6, 4),
(21, 6, 4),
(18, 7, 4),
(17, 10, 4),
(19, 10, 4),
(17, 11, 4),
(18, 12, 4),
(18, 14, 4),
(20, 14, 4),
(21, 14, 4),
(18, 15, 4),
(17, 16, 4),
(18, 16, 4),
(21, 16, 4),
(17, 17, 4),
(18, 17, 4),
(17, 18, 4),
(18, 18, 4),
(18, 19, 4),
(18, 20, 4),
(27, 1, 5),
(26, 2, 5),
(27, 2, 5),
(26, 3, 5),
(27, 3, 5),
(28, 3, 5),
(29, 3, 5),
(30, 3, 5),
(26, 4, 5),
(27, 4, 5),
(28, 4, 5),
(29, 4, 5),
(30, 4, 5),
(26, 6, 5),
(27, 6, 5),
(28, 6, 5),
(27, 7, 5),
(26, 8, 5),
(28, 8, 5),
(27, 9, 5),
(29, 10, 5),
(30, 10, 5),
(27, 11, 5),
(27, 12, 5),
(26, 13, 5),
(27, 13, 5),
(28, 13, 5),
(29, 15, 5),
(30, 15, 5),
(26, 16, 5),
(27, 16, 5),
(28, 16, 5),
(29, 16, 5),
(30, 16, 5),
(29, 17, 5),
(30, 17, 5),
(26, 18, 5),
(27, 18, 5),
(28, 18, 5),
(30, 19, 5),
(29, 20, 5),
(30, 20, 5),
(26, 21, 5),
(27, 21, 5),
(28, 21, 5),
(29, 21, 5),
(30, 21, 5),
(22, 1, 6),
(23, 1, 6),
(24, 1, 6),
(25, 1, 6),
(22, 2, 6),
(23, 2, 6),
(24, 2, 6),
(25, 2, 6),
(22, 3, 6),
(23, 3, 6),
(24, 3, 6),
(25, 3, 6),
(22, 4, 6),
(23, 4, 6),
(24, 4, 6),
(25, 4, 6),
(23, 5, 6),
(24, 5, 6),
(25, 5, 6),
(22, 6, 6),
(23, 6, 6),
(24, 6, 6),
(25, 6, 6),
(23, 8, 6),
(24, 8, 6),
(25, 8, 6),
(22, 9, 6),
(23, 9, 6),
(24, 9, 6),
(25, 9, 6),
(22, 11, 6),
(23, 11, 6),
(24, 11, 6),
(25, 11, 6),
(22, 13, 6),
(23, 13, 6),
(24, 13, 6),
(25, 13, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participante_tarea`
--

CREATE TABLE `participante_tarea` (
  `id_usuario` int NOT NULL,
  `id_tarea` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `participante_tarea`
--

INSERT INTO `participante_tarea` (`id_usuario`, `id_tarea`) VALUES
(2, 1),
(4, 1),
(4, 2),
(6, 2),
(2, 3),
(6, 3),
(4, 4),
(6, 4),
(2, 5),
(4, 5),
(6, 6),
(2, 7),
(4, 7),
(2, 8),
(6, 8),
(4, 9),
(6, 9),
(2, 10),
(4, 10),
(2, 11),
(6, 11),
(4, 12),
(6, 12),
(2, 13),
(4, 13),
(2, 14),
(6, 14),
(4, 15),
(6, 15),
(2, 16),
(4, 16),
(2, 17),
(6, 17),
(4, 18),
(6, 18),
(2, 19),
(4, 19),
(2, 20),
(6, 20),
(4, 21),
(6, 21),
(2, 22),
(4, 22),
(2, 23),
(6, 23),
(4, 24),
(6, 24),
(17, 25),
(18, 25),
(19, 25),
(17, 26),
(18, 26),
(19, 26),
(18, 27),
(27, 28),
(27, 29),
(28, 30),
(26, 31),
(27, 31),
(28, 31),
(27, 32),
(27, 33),
(18, 36),
(18, 37),
(23, 38),
(24, 38),
(22, 39),
(30, 40),
(17, 41),
(18, 41),
(19, 41),
(20, 41),
(21, 41),
(17, 42),
(18, 42),
(19, 42),
(20, 42),
(21, 42),
(17, 43),
(18, 43),
(19, 43),
(17, 44),
(18, 44),
(19, 44),
(17, 45),
(18, 45),
(19, 45),
(20, 45),
(21, 45),
(17, 46),
(18, 46),
(19, 46),
(20, 46),
(21, 46),
(17, 47),
(18, 47),
(19, 47),
(20, 47),
(21, 47),
(22, 48),
(24, 48),
(17, 58),
(19, 58),
(17, 59),
(19, 59),
(18, 60),
(18, 61),
(18, 62),
(18, 63),
(17, 64),
(19, 64),
(17, 65),
(19, 65),
(22, 66),
(23, 66),
(24, 66),
(26, 67),
(27, 67),
(28, 67),
(29, 67),
(30, 67),
(26, 68),
(27, 68),
(29, 68),
(27, 69),
(28, 69),
(20, 70),
(20, 71),
(18, 72),
(18, 73),
(17, 74),
(19, 74),
(18, 75),
(18, 76),
(19, 77),
(19, 78),
(17, 79),
(17, 80),
(17, 81),
(19, 81),
(17, 82),
(19, 82),
(23, 84),
(24, 84),
(22, 85),
(23, 99),
(24, 99),
(25, 99),
(23, 101),
(24, 101),
(23, 103),
(24, 103),
(22, 105),
(23, 105),
(24, 105),
(25, 105),
(18, 108),
(18, 111),
(17, 114),
(18, 114),
(17, 117),
(18, 117),
(18, 120),
(18, 123),
(18, 126),
(2, 129),
(26, 132),
(27, 132),
(28, 132),
(29, 132),
(30, 132),
(29, 135),
(30, 135),
(30, 138),
(26, 141),
(27, 141),
(28, 141),
(29, 144),
(30, 144),
(22, 145),
(23, 145),
(24, 145),
(25, 145),
(22, 148),
(24, 148),
(22, 151),
(23, 151),
(24, 151),
(25, 151),
(22, 154),
(23, 154),
(24, 154),
(25, 154),
(23, 157),
(24, 157),
(29, 160),
(30, 163),
(22, 167),
(23, 167),
(24, 167),
(25, 167),
(22, 170),
(23, 170),
(24, 170),
(25, 170),
(22, 173),
(23, 173),
(24, 173),
(25, 173),
(17, 176),
(20, 176),
(21, 176),
(19, 179),
(20, 179),
(21, 179),
(18, 182),
(20, 182),
(21, 182),
(18, 183),
(17, 186),
(18, 186),
(19, 186),
(18, 189),
(17, 192),
(18, 192),
(19, 192),
(26, 195),
(27, 195),
(28, 195),
(29, 195),
(30, 195),
(22, 198),
(23, 198),
(24, 198),
(25, 198),
(22, 199),
(23, 199),
(24, 199),
(25, 199),
(22, 200),
(23, 200),
(24, 200),
(25, 200),
(22, 201),
(23, 201),
(24, 201),
(25, 201),
(22, 202),
(23, 202),
(24, 202),
(25, 202),
(22, 203),
(23, 203),
(24, 203),
(25, 203),
(22, 204),
(23, 204),
(24, 204),
(25, 204),
(17, 205),
(18, 205),
(19, 205),
(20, 205),
(21, 205),
(17, 206),
(20, 206),
(21, 206),
(17, 209),
(18, 209),
(19, 209),
(20, 209),
(21, 209),
(18, 212),
(18, 215),
(18, 218),
(18, 221),
(18, 224),
(18, 227),
(17, 230),
(18, 230),
(19, 230),
(18, 233),
(18, 236);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil`
--

CREATE TABLE `perfil` (
  `id_perfil` int NOT NULL,
  `nombre` varchar(30) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `perfil`
--

INSERT INTO `perfil` (`id_perfil`, `nombre`) VALUES
(1, 'Administrador'),
(2, 'Usuario Estandar'),
(3, 'Espectador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plan`
--

CREATE TABLE `plan` (
  `id_plan` int NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci NOT NULL,
  `tipo` enum('minimizacion','mitigacion','contingencia') COLLATE utf8mb4_general_ci NOT NULL,
  `id_riesgo` int NOT NULL,
  `id_proyecto` int NOT NULL,
  `id_iteracion` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `plan`
--

INSERT INTO `plan` (`id_plan`, `descripcion`, `tipo`, `id_riesgo`, `id_proyecto`, `id_iteracion`) VALUES
(1, 'Buscar cursos de PHP disponibles en línea', 'minimizacion', 7, 1, 3),
(2, 'Implementar pequeños programas de prueba para practicar PHP', 'minimizacion', 7, 1, 3),
(3, 'Revisar código con IA para detectar errores sintácticos', 'contingencia', 7, 1, 4),
(4, 'Realizar pruebas de integración controladas con datos de muestra', 'mitigacion', 16, 1, 3),
(5, 'Actualizar librerías para compatibilidad con PHP 8.3', 'contingencia', 16, 1, 3),
(6, 'Configurar tablero Trello con columnas de progreso', 'mitigacion', 2, 1, 3),
(7, 'Realizar retrospectiva semanal de estimaciones', 'contingencia', 2, 1, 3),
(8, 'Establecer checklist de calidad para revisiones de código', 'mitigacion', 12, 1, 3),
(9, 'Convocar reunión de emergencia para redistribución de tareas', 'contingencia', 12, 1, 3),
(10, 'Documentar estructura de componentes en estándar PSR-12', 'mitigacion', 3, 1, 5),
(11, 'Asignar tareas de documentación a miembros secundarios', 'contingencia', 3, 1, 5),
(12, 'Crear lista de tareas de baja complejidad para nuevos desarrolladores', 'mitigacion', 3, 1, 8),
(13, 'Enviar recordatorios de inicio de iteración 48h antes', 'mitigacion', 4, 1, 7),
(14, 'Ajustar fechas de entrega en documentos de planificación', 'contingencia', 4, 1, 7),
(15, 'Crear calendario compartido con fechas de exámenes', 'minimizacion', 5, 1, 7),
(16, 'Extender duración de iteraciones durante periodo de exámenes', 'contingencia', 5, 1, 7),
(17, 'Revisar documentos de especificación semanalmente', 'minimizacion', 15, 1, 7),
(18, 'Realizar demo quincenal con cliente para validaciones', 'contingencia', 15, 1, 8),
(19, 'Implementar pruebas unitarias automatizadas para componentes críticos', 'mitigacion', 13, 1, 12),
(20, 'Crear ambiente de staging para validación con cliente', 'contingencia', 6, 1, 12),
(21, 'Realizar capacitación cruzada en componentes del sistema', 'minimizacion', 3, 1, 13),
(22, 'Desarrollar guía de transición para mantenimiento futuro', 'mitigacion', 15, 1, 13),
(23, 'Automatizar despliegue en ambiente de producción', 'contingencia', 9, 1, 13),
(24, 'Implementar sistema de monitoreo de rendimiento post-implementación', 'minimizacion', 17, 1, 13),
(25, 'Mitigar el riesgo mediante documentación paralela, pruebas continuas y validación comparativa entre PHP y Spring Boot priorizando las funcionalidades más críticas', 'mitigacion', 2, 4, 42),
(26, 'El riesgo se considera realista y tiene posibilidad considerable de ocurrir por lo tanto, se determinó realizar un plan de mitigación que busca reducir el impacto o probabilidad antes de que éste se materialice', 'mitigacion', 2, 5, 43),
(27, 'El riesgo se considera realista y tiene posibilidad considerable de ocurrir por lo tanto, se determinó realizar un plan de mitigación que busca reducir el impacto o probabilidad antes de que éste se materialice', 'mitigacion', 4, 5, 43),
(28, 'El riesgo se considera realista y tiene posibilidad considerable de ocurrir por lo tanto, se determinó realizar un plan de contingencia que busca determinar acciones a ejecutar si el riesgo se materializa', 'contingencia', 6, 5, 43),
(29, 'El riesgo se considera realista y tiene posibilidad considerable de ocurrir por lo tanto, se determinó realizar un plan de mitigación que busca reducir el impacto o probabilidad antes de que éste se materialice', 'mitigacion', 3, 5, 43),
(31, 'Mitigar haciendo capacitación en Git/GitHub y Rclone, definición de políticas de commits y ramas,', 'mitigacion', 12, 4, 42),
(32, 'Se implementarán entregas parciales de requerimientos y prototipos validados periódicamente con los docentes, acompañadas de  checklists de aceptación. Además, se reservará un margen de tiempo en el cronograma para absorber ajustes derivados de diferencias de interpretación.', 'mitigacion', 1, 6, 44),
(33, 'Se realizará una planificación semanal con estimaciones realistas de carga académica, redistribuyendo tareas en función de la disponibilidad de cada integrante.', 'mitigacion', 11, 6, 44),
(34, 'Se realizará un plan de mitigación que busque reducir la posibilidad de que el riesgo ocurra', 'mitigacion', 6, 5, 43),
(35, 'Reducir retrasos y errores mediante capacitación y estandarización de entornos', 'mitigacion', 10, 4, 42),
(36, 'Este riesgo depende directamente del riesgo RK02. El plan se centra en cerrar la migración a Spring Boot y validarla con pruebas, reduciendo al mínimo la necesidad de depender de PHP. Como contingencia, se mantiene un respaldo de UARGFlow en PHP para cubrir funcionalidades que eventualmente no puedan migrarse', 'contingencia', 1, 4, 42),
(37, 'Mejorar la planificación y estimación del equipo, revisiones y validaciones externas, reduciendo desvíos', 'mitigacion', 4, 4, 42),
(38, 'Ante un retraso en la entrega de artefactos previos, se incorporará un responsable adicional a la tarea afectada, con el objetivo de reducir el impacto en cadena y minimizar el retraso global del cronograma.', 'mitigacion', 4, 6, 44),
(48, 'Realizar investigaciones sobre PHP y la arquitectura de Uargflow.', 'mitigacion', 1, 4, 42),
(49, 'El plan de contingencia tiene como objetivo prevenir y mitigar las posibles pérdidas de código y documentación debido a la falta de experiencia del equipo en control de versiones, asegurando la continuidad y calidad del proyecto. Este plan establece medidas para recuperar rápidamente el trabajo perdido y minimizar retrasos en las entregas.', 'contingencia', 12, 4, 42),
(50, 'Reducir la probabilidad de errores de diseño y asegurar que la arquitectura del sistema sea integrable, escalable y mantenible, minimizando los riesgos asociados a la falta de experiencia del equipo.', 'mitigacion', 11, 4, 42),
(51, 'Implementar un plan de mitigación que incluya la documentación detallada de todo el conocimiento técnico y funcional en un repositorio accesible, realizar transferencias periódicas de información a un segundo miembro del equipo o colaborador externo, y establecer un cronograma de respaldo para priorizar tareas críticas en caso de imprevistos. Además, se programarán revisiones semanales para asegurar la continuidad del proyecto.', 'mitigacion', 5, 6, 48),
(52, 'Se considera un riesgo probable por lo tanto se busca mitigar o minimizar la probabilidad de que el mismo ocurra', 'mitigacion', 3, 5, 50),
(53, 'Se considera optar por un plan de mitigación debido a que a la hora de enseñar el prototipo, surgirán cambios por lo que habrá que mitigar los mismos', 'mitigacion', 8, 5, 50),
(54, 'Se realizará un plan de mitigación que busque minimizar la carga de tiempos a la hora de corregir los cambios solicitados', 'mitigacion', 6, 5, 50),
(55, 'Ante la posible limitación o caída de las plataformas gratuitas utilizadas en el proyecto, se establece un plan de contingencia que permita garantizar la continuidad de las actividades y la protección de la información crítica', 'contingencia', 7, 4, 49),
(56, 'Disminuir el impacto en la continuidad del proyecto y reducir la pérdida de datos una vez que el riesgo se materializa.', 'minimizacion', 7, 4, 49),
(57, 'Reducir la probabilidad de que el sistema se valide con datos no representativos, garantizando que las pruebas cubran los escenarios críticos y reales.', 'mitigacion', 14, 4, 49),
(58, 'Reducir la probabilidad de errores y pérdida de funcionalidades durante la migración, asegurando que el sistema en Spring Boot mantenga la lógica y características clave del sistema original en PHP.', 'mitigacion', 2, 4, 49),
(59, 'Asegurar que el equipo tenga la capacitación y recursos necesarios para configurar correctamente entornos y usar las herramientas y frameworks, minimizando errores y retrasos.', 'mitigacion', 10, 4, 49),
(60, 'Asegurar que la arquitectura del sistema esté bien definida, documentada y validada antes del desarrollo, reduciendo errores costosos y problemas de integración.', 'mitigacion', 11, 4, 49),
(61, 'Disminuir los efectos negativos derivados del desconocimiento del equipo en PHP, garantizando que el sistema UARGFlow pueda integrarse y mantenerse correctamente para su conexión con Kairos.', 'mitigacion', 1, 4, 49),
(62, 'Disminuir los efectos negativos derivados del desconocimiento del equipo en PHP, garantizando que el sistema UARGFlow pueda integrarse y mantenerse correctamente para su conexión con Kairos.', 'mitigacion', 1, 4, 49),
(64, 'Ante un retraso en la entrega de artefactos previos, se incorporará un responsable adicional a la tarea afectada, con el objetivo de reducir el impacto en cadena y minimizar el retraso global del cronograma.', 'mitigacion', 4, 6, 48),
(65, 'Se realizará una planificación semanal con estimaciones realistas de carga académica, redistribuyendo tareas en función de la disponibilidad de cada integrante.', 'mitigacion', 11, 6, 48),
(71, 'Se priorizará la calidad funcional sobre la cobertura de código. Se implementará un Plan de Pruebas de Caja Negra Mínimo Obligatorio para cada Caso de Uso, enfocándose en los flujos principales y casos críticos. Esto asegura que el sistema cumpla con los requerimientos funcionales a pesar de las limitaciones de tiempo.', 'mitigacion', 13, 6, 57),
(75, 'La ausencia es inevitable, se definen nuevos responsables', 'mitigacion', 3, 4, 55),
(78, 'Resolver los conflictos y determinar como tratar el riesgo', 'contingencia', 18, 4, 55),
(81, 'Crear ramas para cada caso de uso y cada integrante, luego hacer un pull request', 'mitigacion', 18, 4, 55),
(84, 'Almacenar temporalmente en memoria local los tiempos de inicio/detención antes de enviarlos a la base de datos', 'mitigacion', 19, 4, 55),
(87, 'Investigar datos de pruebas según CU y priorizar valores extremos', 'mitigacion', 14, 4, 55),
(90, 'prueba', 'minimizacion', 1, 1, 52),
(93, 'Se definió establecer un plan de mitigación para minimizar o eliminar el impacto negativo que puede tener el riesgo en caso de que ocurra', 'mitigacion', 3, 5, 60),
(96, 'Se definió establecer un plan de mitigación para minimizar o eliminar el impacto negativo que puede tener el riesgo en caso de que ocurra', 'minimizacion', 16, 5, 60),
(99, 'Se definió establecer un plan de mitigación para minimizar o eliminar el impacto negativo que puede tener el riesgo en caso de que ocurra', 'mitigacion', 17, 5, 60),
(102, 'Se definió establecer un plan de mitigación para minimizar o eliminar el impacto negativo que puede tener el riesgo en caso de que ocurra', 'mitigacion', 18, 5, 60),
(103, 'Se establecerá una planificación ajustada y revisiones semanales (los días domingo) del avance para distribuir equitativamente las tareas y evitar acumulación al final del cuatrimestre. Se priorizarán los entregables críticos y se ajustarán las cargas de trabajo según el progreso de cada integrante para mantener la calidad en la documentación', 'minimizacion', 3, 6, 63),
(106, 'Se reorganizarán las tareas según la disponibilidad real de cada integrante y se mantendrán reuniones breves de coordinación para equilibrar la carga de trabajo. Se priorizarán actividades críticas y se fomentará el apoyo cruzado entre miembros del equipo para evitar retrasos por falta de tiempo individual.', 'minimizacion', 11, 6, 63),
(109, 'Se ejecutarán pruebas parciales por módulo de manera paralela al desarrollo para reducir la acumulación al cierre de la iteración. Se priorizarán los casos de prueba críticos (CU07, 08, 10, 11 y 12) y se elaborarán informes breves de verificación al momento de su ejecución, evitando retrasos en la documentación final.', 'minimizacion', 13, 6, 63),
(112, 'Se realizará un plan de mitigación que elimine el riesgo antes de que este ocurra y provoque consecuencias negativas como la demora de la implementación de los CU correspondientes a esta iteración', 'mitigacion', 19, 5, 66),
(115, 'Se realizará un plan de mitigación que elimine el riesgo antes de que este ocurra y provoque consecuencias negativas como la demora de la implementación de los CU correspondientes a esta iteración', 'mitigacion', 20, 5, 66),
(119, 'Definición de casos de prueba', 'mitigacion', 14, 4, 69),
(120, 'Integración de todas las funcionalidades en la misma rama', 'mitigacion', 20, 4, 69),
(123, 'Se optó por un plan de mitigación para evitar que el riesgo ocurra', 'mitigacion', 21, 5, 81),
(126, 'Se establecerá una planificación ajustada y revisiones semanales (los días domingo) del avance para distribuir equitativamente las tareas y evitar acumulación al final del cuatrimestre. Se priorizarán los entregables críticos y se ajustarán las cargas de trabajo según el progreso de cada integrante para mantener la calidad en la documentación', 'minimizacion', 3, 6, 108),
(127, 'Se reorganizarán las tareas según la disponibilidad real de cada integrante y se mantendrán reuniones breves de coordinación para equilibrar la carga de trabajo. Se priorizarán actividades críticas y se fomentará el apoyo cruzado entre miembros del equipo para evitar retrasos por falta de tiempo individual.', 'minimizacion', 11, 6, 108),
(128, 'Se ejecutarán pruebas parciales por módulo de manera paralela al desarrollo para reducir la acumulación al cierre de la iteración. Se priorizarán los casos de prueba críticos (CU13, 14, y 16) y se elaborarán informes breves de verificación al momento de su ejecución, evitando retrasos en la documentación final.', 'minimizacion', 13, 6, 108),
(129, 'Definición de casos de prueba para los casos de uso', 'minimizacion', 14, 4, 69),
(131, 'Definir casos de prueba', 'mitigacion', 14, 4, 112),
(134, 'Realizar pull y resolver conflictos', 'mitigacion', 20, 4, 112),
(137, 'Tareas para mitigar el riesgo de mala generacion de casos de pruebas.', 'minimizacion', 14, 4, 112);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto`
--

CREATE TABLE `proyecto` (
  `id_proyecto` int NOT NULL,
  `nombre` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci NOT NULL,
  `estado` enum('activo','inactivo','finalizado','abandonado') COLLATE utf8mb4_general_ci NOT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyecto`
--

INSERT INTO `proyecto` (`id_proyecto`, `nombre`, `descripcion`, `estado`, `fecha_inicio`, `fecha_fin`) VALUES
(1, 'Vesta Risk Manager', 'Es una aplicación que optimiza la identificación, analisis y monitereo de los diferentes \nriesgos que se presentan a la hora de desarrollar un software con el fin de asistir al usuario en la toma de \ndecisiones y mitigar los riesgos', 'activo', '2024-08-27', '2025-11-30'),
(2, 'Testify', 'Es una aplicación que optimiza el proceso de pruebas que se presentan a la hora de desarrollar \nun software con el fin de asistir al usuario en la toma de \ndecisiones.', 'finalizado', '2024-08-24', '2025-09-05'),
(3, 'Planificacion', 'Es una aplicación que optimiza la estimaciones que se presentan a la hora de desarrollar un software \ncon el fin de asistir al usuario en la toma de decisiones', 'inactivo', '2024-08-24', NULL),
(4, 'Kairos', 'Kairos tiene como objetivo brindar a los equipos de desarrollo de un proyecto de software, una herramienta que les permita planificar tareas, registrar tiempos y controlar el avance', 'activo', '2025-08-09', '2025-10-10'),
(5, 'MetricFlow SQA', 'Software web para llevar registro, seguimiento y análisis de las métricas de calidad durante las iteraciones en los proyectos. Garantizando el cumplimiento de estándares de calidad definidos en el plan SQA.', 'activo', '2025-09-09', '2025-10-28'),
(6, 'GRCU Manager', 'Desarrollar una aplicación web que permita registrar los requerimientos, mantener historial de versiones y garantizar la cobertura de los requerimientos mediante una matriz de trazabilidad que los relacione con los casos de uso.', 'activo', '2025-08-09', '2025-10-10'),
(8, 'Hackeado por NexTech', 'kk', 'finalizado', NULL, '2025-11-14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_categoria`
--

CREATE TABLE `proyecto_categoria` (
  `id_proyecto` int NOT NULL,
  `id_categoria` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyecto_categoria`
--

INSERT INTO `proyecto_categoria` (`id_proyecto`, `id_categoria`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(8, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(8, 2),
(1, 3),
(2, 3),
(3, 3),
(4, 3),
(5, 3),
(6, 3),
(8, 3),
(1, 4),
(2, 4),
(3, 4),
(4, 4),
(5, 4),
(6, 4),
(8, 4),
(1, 5),
(2, 5),
(3, 5),
(4, 5),
(5, 5),
(6, 5),
(8, 5),
(1, 6),
(2, 6),
(3, 6),
(4, 6),
(5, 6),
(6, 6),
(8, 6),
(1, 7),
(2, 7),
(3, 7),
(4, 7),
(5, 7),
(6, 7),
(8, 7),
(1, 8),
(2, 8),
(3, 8),
(4, 8),
(5, 8),
(6, 8),
(8, 8),
(1, 9),
(2, 9),
(3, 9),
(4, 9),
(5, 9),
(6, 9),
(8, 9),
(1, 10),
(2, 10),
(3, 10),
(4, 10),
(5, 10),
(6, 10),
(8, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyecto_participante`
--

CREATE TABLE `proyecto_participante` (
  `id_proyecto` int NOT NULL,
  `id_usuario` int NOT NULL,
  `rol` enum('Lider del proyecto','Desarrollador') COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyecto_participante`
--

INSERT INTO `proyecto_participante` (`id_proyecto`, `id_usuario`, `rol`) VALUES
(1, 2, 'Lider del proyecto'),
(1, 4, 'Lider del proyecto'),
(2, 13, 'Desarrollador'),
(2, 14, 'Lider del proyecto'),
(2, 15, 'Desarrollador'),
(2, 16, 'Desarrollador'),
(3, 10, 'Desarrollador'),
(3, 11, 'Desarrollador'),
(3, 12, 'Lider del proyecto'),
(4, 17, 'Lider del proyecto'),
(4, 18, 'Lider del proyecto'),
(4, 19, 'Desarrollador'),
(4, 20, 'Desarrollador'),
(4, 21, 'Desarrollador'),
(5, 26, 'Desarrollador'),
(5, 27, 'Lider del proyecto'),
(5, 28, 'Desarrollador'),
(5, 29, 'Desarrollador'),
(5, 30, 'Desarrollador'),
(6, 22, 'Lider del proyecto'),
(6, 23, 'Desarrollador'),
(6, 24, 'Desarrollador'),
(6, 25, 'Desarrollador');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `riesgo`
--

CREATE TABLE `riesgo` (
  `id_riesgo` int NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci NOT NULL,
  `factor_riesgo` int DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_categoria` int NOT NULL,
  `id_proyecto` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `riesgo`
--

INSERT INTO `riesgo` (`id_riesgo`, `descripcion`, `factor_riesgo`, `fecha_creacion`, `id_categoria`, `id_proyecto`) VALUES
(1, 'Dada una enfermedad, podría ocurrir la ausencia de un integrante del grupo en ocasiones importantes, lo que podría causar un impacto negativo en la moral del equipo, generando incertidumbre o sobrecarga de trabajo en los otros miembros.', 42, '2025-09-04 11:07:16', 3, 1),
(2, 'Dada la inexperiencia del equipo, podrían ocurrir dificultades en la estimación de tareas, lo que podría generar sobreasignación de tareas a ciertos miembros del equipo, provocando agotamiento o sobrecarga de trabajo.', 16, '2025-09-04 11:07:16', 3, 1),
(3, 'Dada la dependencia exclusiva de un solo desarrollador para la implementación del sistema, podrían ocurrir retrasos significativos cuando esta persona no esté disponible o esté sobrecargada, lo que podría resultar en incumplimientos de plazos y afectar la entrega del proyecto.', 8, '2025-09-04 11:07:16', 3, 1),
(4, 'Dada la falta de comunicación por un tiempo prolongado, podría ocurrir que el equipo no inicie en la fecha planificada, lo que conduciría a un mayor esfuerzo destinado al proyecto para cumplir con el tiempo propuesto.', 9, '2025-09-04 11:07:16', 3, 1),
(5, 'Dado el poco tiempo que puede destinar cada miembro del equipo a causa de los finales y/o cursada, podría ocurrir el descuido de las actividades de la gestión de proyectos, lo que conduciría a una mala organización y planificación de las tareas del proyecto.', 1, '2025-09-04 11:07:16', 3, 1),
(6, 'Dado que se realizará una próxima reunión con el cliente para revisar el avance del proyecto, existe la posibilidad de que surjan numerosas correcciones o ajustes solicitados. Esto podría generar retrasos en el cronograma, aumento en la carga de trabajo del equipo y posibles desviaciones respecto al alcance inicialmente planificado.', 56, '2025-09-04 11:07:16', 3, 1),
(7, 'Dado el escaso conocimiento de lenguaje de programación (php), podría ocurrir un desarrollo ineficiente y con errores, lo que podría generar dependencias excesivas de ciertos miembros del equipo, afectando la distribución equitativa de las tareas.', 2, '2025-09-04 11:07:16', 4, 1),
(8, 'Dados los errores humanos en el uso del sistema de control de versiones, podría ocurrir una pérdida de datos, lo que podría conducir a la repetición del trabajo y posible pérdida de funcionalidades ya desarrolladas.', 9, '2025-09-04 11:07:16', 4, 1),
(9, 'Dada la dificultad para encontrar soluciones a problemas técnicos complejos, podrían ocurrir estancamientos en el desarrollo del proyecto, lo que podría afectar la estabilidad general del producto, aumentando los riesgos de fallos críticos en el sistema.', 5, '2025-09-04 11:07:16', 4, 1),
(10, 'Dadas las diferencias en los estilos de codificación entre miembros del equipo, podría ocurrir una falta de consistencia en el código del proyecto, lo que podría dificultar la capacidad del equipo para mantener una estructura clara y comprensible del código a largo plazo.', 2, '2025-09-04 11:07:16', 4, 1),
(11, 'Dados los problemas de compatibilidad entre las herramientas y entornos de desarrollo de los miembros del equipo, podrían ocurrir inconsistencias en la ejecución y compilación del código, lo que podría derivar en conflictos entre los desarrolladores al intentar resolver los problemas de configuración, afectando la colaboración.', 3, '2025-09-04 11:07:16', 4, 1),
(12, 'Dada la falta de experiencia del grupo de desarrollo en la conducción de un proyecto de software, podría ocurrir una gestión ineficaz del proyecto, lo que podría conducir a posibles fallos en la calidad del producto final, a decisiones técnicas incorrectas y a una mala asignación de recursos.', 5, '2025-09-04 11:07:16', 4, 1),
(13, 'Dadas las dificultades en la implementación de pruebas efectivas y la falta de un proceso robusto, podrían no detectarse defectos hasta etapas tardías del desarrollo, lo que requeriría un esfuerzo mucho mayor para corregirlos e incrementaría la posibilidad de entregar versiones con defectos no detectados, impactando negativamente la reputación del equipo y aumentando el tiempo dedicado a correcciones en lugar de avanzar con la implementación restante.', 12, '2025-09-04 11:07:16', 4, 1),
(14, 'Dados los problemas con la gestión de permisos y roles en el sistema, podría ocurrir un control inadecuado de acceso, lo que podría aumentar la probabilidad de que el sistema sea vulnerable a ataques externos o internos.', 1, '2025-09-04 11:07:16', 4, 1),
(15, 'Dadas la detencion del desarrollo del proyecto y la posible documentación incompleta, podría ocurrir que el equipo olvide el dominio del problema, lo que conduciría a implementaciones que no cumplan con las expectativas del cliente.', 1, '2025-09-04 11:07:16', 4, 1),
(16, 'Dada la complejidad de la adaptación del módulo UARGFLOW a nuestra aplicación, podría ocurrir que el proceso de integración sea complicado, lo que podría causar errores en la interacción con otros módulos del sistema, afectando la integridad de los datos.', 1, '2025-09-04 11:07:16', 7, 1),
(17, 'Dadas las dificultades en la implementación de un sistema de notificaciones en tiempo real, podría ocurrir que las alertas no se envíen de manera oportuna, lo que podría provocar la pérdida de oportunidades para prevenir o mitigar incidentes críticos, afectando la seguridad o integridad del sistema.', 1, '2025-09-04 11:07:16', 7, 1),
(1, 'Dado el poco conocimiento en PHP del equipo, podría ocurrir una dificultad significativa en el entendimiento y mantenimiento del sistema UARGFlow, lo que conduciría a demoras en la integración con el sistema Kairos, aumento de la curva de aprendizaje y posibles errores en la adaptación.', 1, '2025-09-07 21:24:42', 4, 4),
(2, 'Dada la falta de documentación del sistema UARGFlow, podría ocurrir que la migración del sistema de PHP a Spring Boot podría presentar dificultades en la interpretación del código y funcionalidades, lo que conduciría a errores en la implementación, pérdida de características que puedan ser importantes y mayor esfuerzo de validación y pruebas.', 1, '2025-09-07 23:48:50', 7, 4),
(3, 'Dada la posible ausencia de algún integrante del grupo, podría ocurrir que ciertas tareas queden sin responsable, lo que conduciría a sobrecarga de trabajo para el resto del equipo y retrasos en entregas', 9, '2025-09-08 00:00:20', 3, 4),
(4, 'Dada la inexperiencia del equipo, podrían ocurrir dificultades en la planificación del proyecto y estimación de tareas, lo que conduciría a una mala planificación del proyecto', 8, '2025-09-08 00:07:27', 3, 4),
(5, 'Dada la falta de definición clara de los requerimientos funcionales, podría ocurrir que se desarrollen funcionalidades que no respondan a las necesidades reales, lo que conduciría a retrabajo y retraso en la planificación', 1, '2025-09-09 08:56:18', 3, 4),
(6, 'Dado que la documentación se realiza en paralelo con el desarrollo podría ocurrir que no se registren todos los cambios a tiempo lo que conduciría a documentación incompleta y dificultades en mantenimiento futuro', 6, '2025-09-11 22:06:09', 3, 4),
(7, 'Dado que el proyecto depende del uso de herramientas gratuitas podría ocurrir la limitación en la capacidad o disponibilidad de dichas plataformas lo que conduciría a dificultades para coordinar tareas y perdida de información critica', 12, '2025-09-11 22:09:48', 10, 4),
(10, 'Dada la falta de conocimientos en herramientas y tecnologías podría ocurrir la dificultad para configurar entornos o utilizar frameworks correctamente, lo que conduciría a retrasos en el inicio del desarrollo y errores recurrentes en el código', 9, '2025-09-11 22:23:40', 7, 4),
(11, 'Dada la escasa experiencia en el desarrollo de software podría ocurrir una arquitectura mal planificada, lo que conduciría a dificultades para integrar módulos, escalar el sistema o corregir fallos.', 6, '2025-09-11 22:27:44', 8, 4),
(12, 'Dada la falta de experiencia en control de versiones podría ocurrir la perdida de código o documentación, lo que conduciría a retrabajos y demoras en entregas', 3, '2025-09-11 22:33:34', 8, 4),
(14, 'Dado que puede no existir un conjunto de datos de prueba adecuado, podría ocurrir que el sistema se valide con información poco representativa, lo que conduciría a errores no detectados hasta etapas tardías.', 49, '2025-09-18 22:44:23', 8, 4),
(15, 'Dado el contexto político y social (huelgas, paros, manifestaciones), podría ocurrir la imposibilidad de asistir a clases o  que las mismas se vean interrumpidas, lo que conduciría a pérdida de tiempo efectivo de trabajo en grupo y demoras en la entrega.', 1, '2025-09-18 22:50:06', 3, 4),
(16, 'Dada la duración acotada del cuatrimestre y múltiple entregas parciales podría ocurrir que no se pueda completar todas las funcionalidades propuestas lo que conduciría a entregar un producto incompleto o recortado', 1, '2025-09-23 21:13:52', 3, 4),
(17, 'Dada la escasa verificación de avances o falta de reuniones periódicas podría ocurrir que los entregables no cumplan con las expectativas lo que conduciría a necesidad de correcciones a ultimo momento y retraso en las entregas', 1, '2025-09-23 21:15:00', 4, 4),
(18, 'Dada/s la contribución del equipo a la única rama de desarrollo principal (Dev) y la falta de aislamiento de tareas, podría ocurrir la generación constante y frecuente de conflictos de fusión (merge conflicts) y la sobrescritura no intencionada de código, lo que conduciría a retrasos significativos en la integración y el despliegue.', 28, '2025-10-24 11:38:50', 7, 4),
(19, 'Dada la dependencia de cálculos para los tiempos de inicio y detención podría ocurrir una pérdida o un cálculo inexacto del tiempo registrado, lo que conduciría a un seguimiento de tareas incorrecto', 8, '2025-10-24 13:57:47', 7, 4),
(20, 'Dadas las múltiples ramas de desarrollo utilizadas para implementar distintas funcionalidades en paralelo, podría ocurrir la generación de conflictos o incompatibilidades al momento de integrar los cambios, lo que conduciría a errores en el código, pérdida de coherencia entre módulos e incompatibilidades funcionales.', 56, '2025-10-28 18:21:42', 7, 4),
(1, 'Dadas situaciones de enfermedad, podría ocurrir la inasistencia de un integrante del grupo en momentos clave, lo que conduciría a demoras en la entrega y circulación de la información.', 15, '2025-09-06 20:58:28', 3, 5),
(2, 'Dadas las estimaciones optimistas en tiempos de desarrollo, podría ocurrir un desfase en las entregas, lo que conduciría a acumulación de tareas y presión sobre el equipo.', 4, '2025-09-06 21:00:04', 3, 5),
(3, 'Dada la falta de experiencia del grupo en la gestión de proyectos de software, podría ocurrir una administración ineficiente del desarrollo, lo que conduciría a retrasos en el cronograma, incremento de costos y disminución en la calidad del producto final.', 6, '2025-09-06 21:14:36', 4, 5),
(4, 'Dada la falta de conocimiento del equipo sobre estándares de calidad en el desarrollo de software, podría ocurrir una aplicación inadecuada de buenas prácticas, lo que conduciría a un aumento en la complejidad del proyecto', 4, '2025-09-06 21:29:46', 8, 5),
(6, 'Dado que se realizará una próxima reunión con el cliente para revisar el avance del proyecto, existe la posibilidad de que surjan numerosas correcciones o ajustes solicitados. Esto podría generar retrasos en el cronograma, aumento en la carga de trabajo del equipo y posibles desviaciones respecto al alcance inicialmente planificado.', 9, '2025-09-06 22:01:10', 3, 5),
(7, 'Dada la baja disponibilidad del cliente para participar en reuniones y validar entregables, podría ocurrir una demora en la toma de decisiones, lo que conduciría a retrasos en el avance del proyecto.', 12, '2025-09-11 14:54:56', 1, 5),
(8, 'Dado que los requisitos pueden estar poco definidos o cambiar con frecuencia, podría ocurrir una ambigüedad en el alcance, lo que conduciría a retrabajos y desviaciones en la planificación.', 4, '2025-09-11 14:55:44', 2, 5),
(9, 'Dada la magnitud y extensión del proyecto, podría ocurrir una dificultad en la coordinación de actividades, lo que conduciría a problemas de comunicación y retrasos en la integración de componentes.', 9, '2025-09-11 15:00:39', 5, 5),
(10, 'Dada la posible incompatibilidad o desactualización de las herramientas tecnológicas, podría ocurrir una dificultad en la integración del sistema, lo que conduciría a retrabajos y costos adicionales de adaptación', 12, '2025-09-11 15:01:14', 7, 5),
(11, 'Dada la posibilidad de que algún integrante clave del equipo abandone el proyecto, podría ocurrir una pérdida de continuidad en las tareas asignadas, lo que conduciría a retrasos en las entregas y sobrecarga de trabajo para el resto del equipo.', 14, '2025-09-11 15:05:05', 4, 5),
(12, 'Dada la posibilidad de que algún integrante reduzca su rendimiento debido a la preparación de exámenes finales en la universidad, podría ocurrir un incumplimiento de tareas o baja productividad, lo que conduciría a demoras en el cronograma y necesidad de reasignación de responsabilidades', 24, '2025-09-11 15:05:26', 4, 5),
(13, 'Dada la falta de respuesta del cliente ante consultas del equipo, podría ocurrir un estancamiento en la toma de decisiones, lo que conduciría a demoras en la ejecución de tareas críticas.', 12, '2025-09-11 15:07:38', 1, 5),
(15, 'Dada la dependencia de un servicio en la nube de un tercero, podría ocurrir una interrupción en su disponibilidad, lo que conduciría a fallos temporales en el sistema y retrasos en pruebas o despliegues', 5, '2025-09-11 15:10:16', 7, 5),
(16, 'Dada la complejidad del sistema y la falta de mecanismos de prueba, podría ocurrir una dificultad para detectar errores en el software, lo que conduciría a fallas no identificadas durante la fase de desarrollo y posibles defectos en el producto final.', 10, '2025-10-24 14:17:02', 8, 5),
(17, 'Dada la posible limitación o falta de adecuación de las herramientas o librerías seleccionadas para la visualización del dashboard, podría ocurrir que no se logre cumplir con los requerimientos funcionales o de rendimiento esperados, lo que afectaría la calidad y usabilidad del CU12.', 10, '2025-10-24 17:23:25', 7, 5),
(18, 'Dada la posibilidad de implementar fórmulas o cálculos incorrectos en el módulo de gestión o registro de métricas, podría ocurrir un almacenamiento de datos inexactos, lo que afectaría la validez de los resultados visualizados en el dashboard.', 10, '2025-10-24 17:24:01', 8, 5),
(19, 'Dada la posibilidad de inconsistencias o errores en los datos provenientes de los módulos de registro o procesamiento de métricas, podría ocurrir que las visualizaciones muestren información incorrecta o desactualizada, lo que conduciría a interpretaciones erróneas y pérdida de confiabilidad en los resultados mostrados.', 15, '2025-10-30 20:44:43', 8, 5),
(20, 'Dada la diversidad de formatos y configuraciones requeridas para la exportación de informes y gráficos, podría ocurrir que se presenten errores o pérdidas de formato durante el proceso, lo que conduciría a la generación de archivos incompletos o con una presentación inadecuada para el usuario.', 6, '2025-10-30 20:45:11', 8, 5),
(21, 'Dada la complejidad que implica la integración de todos los casos de uso desarrollados en el sistema, podría ocurrir que surjan errores de compatibilidad, dependencias no resueltas o fallas en la comunicación entre módulos, lo que conduciría a un mal funcionamiento del sistema en su conjunto y a la necesidad de realizar ajustes adicionales antes de su entrega final', 42, '2025-11-07 11:27:54', 8, 5),
(1, 'Dadas las interpretaciones distintas entre el equipo y los docentes sobre el alcance y los criterios de aceptación, podría ocurrir una malinterpretación de los requerimientos por parte del equipo de desarrollo, lo que conduciría a rehacer entrevistas y documentación, ajustar el prototipo y generar retrasos en las entregas.', 8, '2025-09-08 17:29:40', 1, 6),
(2, 'Dado el feedback continuo de los docentes y la aparición de necesidades no previstas, podría ocurrir una modificación de requerimientos durante el desarrollo, lo que conduciría a replanificar el cronograma, aumentar el esfuerzo y generar retrabajo.', 27, '2025-09-08 17:31:00', 1, 6),
(3, 'Dado que el tiempo disponible está limitado a un cuatrimestre académico, podría ocurrir una sobrecarga de actividades en las etapas finales, lo que conduciría a entregas apresuradas y menor calidad en la documentación y pruebas.', 54, '2025-09-08 17:31:36', 3, 6),
(4, 'Dada la dependencia entre entregables (ejemplo: la especificación de casos de uso antes de las pruebas), podría ocurrir un retraso en cadena si un entregable previo no está listo a tiempo, lo que conduciría a replanificaciones y riesgo de incumplir el cronograma final.', 32, '2025-09-08 17:32:12', 3, 6),
(5, 'Dada la concentración del conocimiento técnico y funcional en un único desarrollador, podría ocurrir su indisponibilidad (por sobrecarga, enfermedad o abandono), lo que conduciría a la paralización del desarrollo, pérdida de información crucial e incumplimiento de los plazos de entrega establecidos.', 27, '2025-09-08 17:39:55', 4, 6),
(6, 'Dada la inexperiencia del equipo en la conducción y metodologías de gestión de proyectos, podría ocurrir una planificación poco realista y una asignación ineficiente de recursos, lo que conduciría a entregables de baja calidad, desviaciones en tiempos y fracaso en alcanzar los objetivos del proyecto.', 35, '2025-09-08 17:41:03', 4, 6),
(8, 'Dado que la solución a desarrollar presenta un nivel elevado de dificultad en la integración de funcionalidades clave (como trazabilidad bidireccional, historial de cambios y comentarios), podría ocurrir un estancamiento en el desarrollo por sobrecarga de tareas complejas, lo que conduciría a retrasos en las entregas y a una mayor probabilidad de errores en la documentación y el sistema final.', 35, '2025-09-08 17:42:23', 8, 6),
(9, 'Dado que el proyecto debe desarrollarse en un cuatrimestre académico, podría ocurrir que el tiempo real requerido para completar todas las fases (inicio, elaboración, construcción y cierre) sea mayor al planificado, lo que conduciría a acumulación de tareas, incumplimiento de hitos y riesgo de no finalizar el prototipo en la cursada.', 35, '2025-09-08 17:44:27', 5, 6),
(11, 'Dada la simultaneidad con otras materias y obligaciones académicas, podría ocurrir una reducción en las horas efectivas que cada integrante puede dedicar al proyecto, lo que conduciría a un desequilibrio en la distribución del trabajo, retrasos en la entrega de hitos y un mayor costo de coordinación entre los miembros del equipo.', 40, '2025-09-08 17:52:24', 4, 6),
(13, 'Dada la complejidad funcional de los casos de uso implementados, podría no alcanzarse a realizar una cobertura adecuada de pruebas unitarias integrales dentro del tiempo planificado, lo que conduciría a fallos no detectados o retrabajos posteriores. ', 45, '2025-10-23 16:51:21', 3, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `id_tarea` int NOT NULL,
  `nombre` varchar(80) COLLATE utf8mb4_general_ci NOT NULL,
  `descripcion` text COLLATE utf8mb4_general_ci NOT NULL,
  `estado` enum('1','0') COLLATE utf8mb4_general_ci NOT NULL COMMENT '1: completada, 0: no completada',
  `id_plan` int NOT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `fecha_fin_real` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`id_tarea`, `nombre`, `descripcion`, `estado`, `id_plan`, `fecha_inicio`, `fecha_fin`, `fecha_fin_real`) VALUES
(1, 'Buscar cursos de PHP disponibles en línea', 'Buscar cursos de PHP disponibles en línea', '0', 1, '2024-09-25', '2024-10-11', NULL),
(2, 'Implementar pequeños programas de prueba para practicar PHP', 'Implementar pequeños programas de prueba para practicar PHP', '0', 2, '2024-09-25', '2024-10-11', NULL),
(3, 'Revisar código con IA para detectar errores sintácticos', 'Revisar código con IA para detectar errores sintácticos', '0', 3, '2024-10-12', '2024-10-29', NULL),
(4, 'Realizar pruebas de integración controladas con datos de muestra', 'Realizar pruebas de integración controladas con datos de muestra', '0', 4, '2024-09-25', '2024-10-11', NULL),
(5, 'Actualizar librerías para compatibilidad con PHP 8.3', 'Actualizar librerías para compatibilidad con PHP 8.3', '0', 5, '2024-09-25', '2024-10-11', NULL),
(6, 'Configurar tablero Trello con columnas de progreso', 'Configurar tablero Trello con columnas de progreso', '0', 6, '2024-09-25', '2024-10-11', NULL),
(7, 'Realizar retrospectiva semanal de estimaciones', 'Realizar retrospectiva semanal de estimaciones', '0', 7, '2024-09-25', '2024-10-11', NULL),
(8, 'Establecer checklist de calidad para revisiones de código', 'Establecer checklist de calidad para revisiones de código', '0', 8, '2024-09-25', '2024-10-11', NULL),
(9, 'Convocar reunión de emergencia para redistribución de tareas', 'Convocar reunión de emergencia para redistribución de tareas', '0', 9, '2024-09-25', '2024-10-11', NULL),
(10, 'Documentar estructura de componentes en estándar PSR-12', 'Documentar estructura de componentes en estándar PSR-12', '0', 10, '2024-10-30', '2024-11-08', NULL),
(11, 'Asignar tareas de documentación a miembros secundarios', 'Asignar tareas de documentación a miembros secundarios', '0', 11, '2024-10-30', '2024-11-08', NULL),
(12, 'Crear lista de tareas de baja complejidad para nuevos desarrolladores', 'Crear lista de tareas de baja complejidad para nuevos desarrolladores', '0', 12, '2025-01-28', '2025-02-11', NULL),
(13, 'Enviar recordatorios de inicio de iteración 48h antes', 'Enviar recordatorios de inicio de iteración 48h antes', '0', 13, '2025-01-18', '2025-01-27', NULL),
(14, 'Ajustar fechas de entrega en documentos de planificación', 'Ajustar fechas de entrega en documentos de planificación', '0', 14, '2025-01-18', '2025-01-27', NULL),
(15, 'Crear calendario compartido con fechas de exámenes', 'Crear calendario compartido con fechas de exámenes', '0', 15, '2025-01-18', '2025-01-27', NULL),
(16, 'Extender duración de iteraciones durante periodo de exámenes', 'Extender duración de iteraciones durante periodo de exámenes', '0', 16, '2025-01-18', '2025-01-27', NULL),
(17, 'Revisar documentos de especificación semanalmente', 'Revisar documentos de especificación semanalmente', '0', 17, '2025-01-18', '2025-01-27', NULL),
(18, 'Realizar demo quincenal con cliente para validaciones', 'Realizar demo quincenal con cliente para validaciones', '0', 18, '2025-01-28', '2025-02-11', NULL),
(19, 'Implementar pruebas unitarias automatizadas para componentes críticos', 'Implementar pruebas unitarias automatizadas para componentes críticos', '0', 19, '2025-05-10', '2025-05-28', NULL),
(20, 'Crear ambiente de staging para validación con cliente', 'Crear ambiente de staging para validación con cliente', '0', 20, '2025-05-10', '2025-05-28', NULL),
(21, 'Realizar capacitación cruzada en componentes del sistema', 'Realizar capacitación cruzada en componentes del sistema', '0', 21, '2025-05-29', '2025-06-12', NULL),
(22, 'Desarrollar guía de transición para mantenimiento futuro', 'Desarrollar guía de transición para mantenimiento futuro', '0', 22, '2025-05-29', '2025-06-12', NULL),
(23, 'Automatizar despliegue en ambiente de producción', 'Automatizar despliegue en ambiente de producción', '0', 23, '2025-05-29', '2025-06-12', NULL),
(24, 'Implementar sistema de monitoreo de rendimiento post-implementación', 'Implementar sistema de monitoreo de rendimiento post-implementación', '0', 24, '2025-05-29', '2025-06-12', NULL),
(25, 'Documentar', 'Documentar de manera interna cada módulo o funcionalidad a medida que se vaya migrando', '0', 25, '2025-09-07', '2025-09-16', NULL),
(26, 'Comparar', 'Comparar en paralelo el funcionamiento del sistema original en PHP y la nueva versión en Spring Boot para asegurar que no se pierdan características importantes', '1', 25, '2025-09-07', '2025-09-16', '2025-09-16'),
(27, 'Pruebas', 'Realizar pruebas unitarias y de integración en cada etapa de la migración', '0', 25, '2025-09-07', '2025-09-16', NULL),
(28, 'Establecer márgenes de tiempo en tareas críticas en el plan de iteración', 'Se analizarán las tareas que se consideren más críticas o que pueden llegar a demandar de más tiempo y se establecerá un tiempo acorde para la misma y más de un responsable si es necesario', '1', 26, '2025-09-09', '2025-09-10', '2025-09-11'),
(29, 'Controlar continuamente los avances mediante Trello', 'Mediante la herramienta Trello se establecerán fechas y responsables para la asignación de tareas que ayude a monitorizar', '1', 26, '2025-09-09', '2025-09-10', '2025-09-11'),
(30, 'Investigar acerca de estándares de calidad', 'Se debe investigar sobre los distintos estándares de calidad propuestos y acerca de los nuevos que se agregarán en el futuro sistema', '1', 27, '2025-09-13', '2025-09-15', '2025-09-17'),
(31, 'Gestionar los cambios de manera formalizada', 'Se registran los cambios solicitados, se establece una evaluación de las solicitudes de cambio y se procede a realizar los mismos', '1', 28, '2025-09-19', '2025-09-22', '2025-09-17'),
(32, 'Replanificar el próximo plan de iteración', 'Se procede a establecer nuevas tareas en el próximo plan de iteración según los cambios solicitados por los clientes', '1', 28, '2025-09-19', '2025-09-22', '2025-09-23'),
(33, 'Implementar herramientas de gestión', 'Se implementarán herramientas de gestión que ayuden al seguimiento transparente del desarrollo del proyecto', '1', 29, '2025-09-09', '2025-09-09', '2025-09-11'),
(36, 'Capacitación', 'Capacitación de GitHub y Rclone', '1', 31, '2025-09-11', '2025-09-23', '2025-09-16'),
(37, 'Definición de Políticas', 'Politica de commits y ramas', '1', 31, '2025-09-10', '2025-09-23', '2025-09-16'),
(38, 'Reuniones de validación de requerimientos', 'Coordinar encuentros al final de cada iteración con los docentes para revisar los requerimientos trabajados y validar los criterios de aceptación de la siguiente iteración.', '0', 32, '2025-08-09', '2025-09-23', NULL),
(39, 'Relevamiento de disponibilidad semanal', 'Cada domingo, reunión de equipo para relevar la disponibilidad de la semana entrante y ajustar la planificación y asignación de tareas según cargas académicas y compromisos.', '0', 33, '2025-09-10', '2025-09-23', NULL),
(40, 'Comunicación anticipada con el cliente', 'Nos comunicaremos con el cliente de manera anticipada (vía email), de forma que podamos corregir lo solicitado y llegar a la próxima presentación con los cambios solicitados', '1', 34, '2025-09-16', '2025-09-16', '2025-09-17'),
(41, 'Capacitación 1', 'Capacitación en las tecnologías desconocidas (Angular, JUnit, Mockito, Postman, etc.)', '1', 35, '2025-09-20', '2025-09-20', '2025-09-23'),
(42, 'Capacitación 2', 'Capacitación en las tecnologías desconocidas (Angular, JUnit, Mockito, Postman, etc.)', '0', 35, '2025-09-27', '2025-09-27', NULL),
(43, 'Comparar', 'Comparar en paralelo el funcionamiento del sistema original en PHP y la nueva versión en Spring Boot para asegurar que no se pierdan características importantes', '0', 36, '2025-09-20', '2025-09-20', NULL),
(44, 'Mantener el funcionamiento en PHP', 'Mantener el funcionamiento de UARGFlow en PHP como respaldo en caso de que no sea posible la migración', '0', 36, '2025-09-16', '2025-09-23', NULL),
(45, 'Practica de estimación y planificación', 'Mejorar las practicas de estimación y planificación', '1', 37, '2025-09-18', '2025-09-19', '2025-09-23'),
(46, 'Uso de herramientas', 'Hacer uso de herramientas de gestión (Toggl Track)', '1', 37, '2025-09-16', '2025-09-20', '2025-09-23'),
(47, 'Validación de estimaciones', 'Validar con los docentes', '1', 37, '2025-09-19', '2025-09-19', '2025-09-23'),
(48, 'Reasignación de recursos', 'Incorporar un responsable adicional a las tareas afectadas para reducir el impacto en cadena y minimizar el retraso global del cronograma. Se revisarán dependencias y se ejecutarán en paralelo las actividades posibles', '0', 38, '2025-09-10', '2025-09-23', NULL),
(58, 'Capacitación del equipo', 'Organizar capacitaciones sobre PHP y Uargflow, asegurando que todos los miembros tengan el conocimiento necesario para realizar la integración.', '0', 48, '2025-09-20', '2025-09-27', NULL),
(59, 'Documentación', 'Crear y mantener una buena documentación del sistema Uargflow para facilitar el entendimiento y reducir errores.', '0', 48, '2025-09-28', '2025-09-30', NULL),
(60, 'Creación de ramas', 'Crear diferentes ramas para evitar conflictos y sobreescritura de información', '1', 49, '2025-08-26', '2025-08-26', '2025-09-23'),
(61, 'Restauración', 'Crear copias de seguridad periódicas del repositorio para recuperar información perdida', '1', 49, '2025-08-26', '2025-08-26', '2025-09-23'),
(62, 'Politicas de commits', 'Establecer políticas claras de commits, incluyendo rama y descripcion del commit.', '1', 49, '2025-08-28', '2025-08-28', '2025-09-23'),
(63, 'Reforzamiento y guias de control de versiones', 'Realizar reforzamientos con entrenamientos rápidos al equipo y creación de guías para los mismos.', '1', 49, '2025-08-26', '2025-08-30', '2025-09-23'),
(64, 'Capacitación', 'Capacitar al equipo sobre buenas prácticas de arquitectura de software y patrones de diseño.', '0', 50, '2025-09-18', '2025-09-21', NULL),
(65, 'Capacitación UML', 'Capacitar al equipo en herramientas y metodologías de desarrollo estructurado (ej. UML, diagramas de flujo, arquitectura modular).', '1', 50, '2025-09-21', '2025-09-23', '2025-09-23'),
(66, 'Mitigación de Riesgo RK05 - Documentación y Respaldo', 'Crear un repositorio de documentación técnica y funcional, transferir conocimientos a un colaborador secundario (Cristian Carranza), y establecer un plan de respaldo para priorizar tareas críticas en caso de indisponibilidad. Revisión semanal programada para asegurar continuidad.', '0', 51, '2025-09-24', '2025-10-08', NULL),
(67, 'Seguir implementando herramientas de gestión', 'Se optó por seguir utilizando herramientas de gestión ya que hasta el momento han ayudado a una gestión eficiente para el proyecto', '0', 52, '2025-09-24', '2025-10-10', NULL),
(68, 'Gestionar los cambios de manera formalizada', 'Esta tarea refiere a llevar a cabo los cambios sugeridos luego de la presentación del primer prototipo funcional, por lo que habrá que modificar los distintos cambios que surjan al respecto', '0', 53, '2025-09-30', '2025-10-02', NULL),
(69, 'Documentar de forma inmediata los cambios y llevarlos a cabo', 'Esta tarea busca dejar por sentado los cambios que deban realizarse ya sea de las distintas tareas o documentos a modificar, y realizarlos de forma inmediata para no generar acumulación de tareas futuras', '0', 54, '2025-09-24', '2025-10-10', NULL),
(70, 'Investigar nuevas herramientas', 'Se deberá investigar nuevas herramientas gratuitas que permitan continuar con el proyecto.', '0', 55, '2025-09-26', '2025-09-27', NULL),
(71, 'Copias de seguridad', 'Realizar copias de seguridad de la información guardadas en las aplicaciónes gratuitas.', '0', 55, '2025-09-26', '2025-09-26', NULL),
(72, 'Resguardar la información', 'Los datos generados en las herramientas gratuitas deben ser resguardados en algún medio que este disponible para su rápida recuperación.', '0', 56, '2025-09-26', '2025-09-26', NULL),
(73, 'Responsables de recuperación', 'Establecer responsables que se encarguen de mudar la información a otra herramienta.', '0', 56, '2025-09-26', '2025-09-27', NULL),
(74, 'Capacitación', 'Capacitar al equipo sobre testing para realizar pruebas eficientes en el sistema.', '0', 57, '2025-09-28', '2025-09-30', NULL),
(75, 'Identificar funcionalidades clave', 'Analizar el sistema en PHP para identificar todas las funcionalidades necesarias.', '0', 58, '2025-09-29', '2025-09-29', NULL),
(76, 'Documentación', 'Generar la documentación mínima necesaria a partir del código y pruebas.', '0', 58, '2025-09-28', '2025-09-30', NULL),
(77, 'Capacitación ', 'Capacitar al equipo con el uso de las herramientas mediante tutoriales, cursos, etc.', '0', 59, '2025-10-01', '2025-10-03', NULL),
(78, 'Pruebas de configuración inicial', 'Validar que todos los entornos funcionen correctamente antes de iniciar el desarrollo', '0', 59, '2025-10-05', '2025-10-06', NULL),
(79, 'Investigación', 'Investigar acerca de patrones conocidos y frameworks probados.', '0', 60, '2025-10-06', '2025-10-07', NULL),
(80, 'Prototipos previos', 'Crear prototipos previos para validar las arquitecturas antes de implementarlas.', '0', 60, '2025-10-05', '2025-10-07', NULL),
(81, 'Capacitación en PHP', 'Realizar tutoriales, cursos y capacitaciones acerca de PHP', '0', 61, '2025-10-01', '2025-10-03', NULL),
(82, 'Capacitación en PHP', 'Realizar tutoriales, cursos y capacitaciones acerca de PHP', '0', 62, '2025-10-01', '2025-10-03', NULL),
(84, 'Reasignación de recursos', 'Incorporar un responsable adicional a las tareas afectadas para reducir el impacto en cadena y minimizar el retraso global del cronograma', '0', 64, '2025-09-23', '2025-10-10', NULL),
(85, 'Relevamiento de disponibilidad semanal', 'Cada domingo, reunión de equipo para relevar la disponibilidad de la semana y ajustar la asignación de tareas según carga académicas y compromisos.', '0', 65, '2025-09-23', '2025-10-10', NULL),
(99, 'Priorización de Casos de Prueba Críticos', 'Identificar y documentar los escenarios de prueba funcionales (Caja Negra) más críticos y los flujos principales para los casos de uso a implementar en esta iteración. ', '1', 71, '2025-10-24', '2025-10-24', '2025-10-26'),
(101, 'Preparación de pruebas', 'Añadir los datos de prueba necesarios para ejecutar los escenarios priorizados, simulando la operación real.', '1', 71, '2025-10-25', '2025-10-25', '2025-10-26'),
(103, 'Ejecución de Pruebas de Caja Negra Mínimas', 'Ejecutar el conjunto mínimo obligatorio de pruebas de Caja Negra priorizadas, verificando que todos los casos de uso cumplan con sus requerimientos funcionales esperados.', '1', 71, '2025-10-26', '2025-10-26', '2025-10-26'),
(105, 'Corrección de Fallos Funcionales y Re-prueba', 'Documentar los defectos funcionales encontrados, coordinar las correcciones con el equipo de desarrollo y realizar pruebas de regresión enfocadas en las áreas afectadas.', '0', 71, '2025-10-26', '2025-10-27', NULL),
(108, 'Definir responsabilidades', 'Redistribución de responsabilidades', '1', 75, '2025-10-20', '2025-10-20', '2025-10-24'),
(111, 'Resolver conflictos en Git', 'Resolver los conflictos generados en Git en las computadoras de todos los integrantes', '1', 78, '2025-10-23', '2025-10-23', '2025-10-24'),
(114, 'Reunión de investigación', 'Investigación para tratar el riesgo', '1', 78, '2025-10-23', '2025-10-23', '2025-10-24'),
(117, 'Creación de ramas específicas', 'Crear ramas específicas para que cada integrante utilice en el caso de uso que está trabajando, luego una vez terminado se hace un pull request', '1', 81, '2025-10-24', '2025-10-24', '2025-10-24'),
(120, 'Almacenar datos temporalmente', 'Almacenar temporalmente en memoria local los tiempos de inicio/detención antes de enviarlos a la base de datos', '0', 84, '2025-10-24', '2025-10-24', NULL),
(123, 'Buscar datos de referencia', 'Contemplar los casos de uso y ver que datos se deben probar según su funcionalidad', '0', 87, '2025-10-26', '2025-10-26', NULL),
(126, 'Priorizar valores extremos', 'Priorizar valores extremos', '0', 87, '2025-10-26', '2025-10-26', NULL),
(129, 'a', 'esto es una prueba', '0', 90, '2025-10-22', '2025-10-28', NULL),
(132, 'Realizar retrospectiva para evaluar su eficiencia', 'Se realizará a la mitad de la iteración para comprobar la eficiencia de las herramientas de gestión', '1', 93, '2025-10-21', '2025-10-21', '2025-10-24'),
(135, 'Investigar métodos de prueba adecuados', 'Se investigarán métodos de prueba que permitan la efectividad de las pruebas que se realizarán', '1', 96, '2025-10-11', '2025-10-11', '2025-10-24'),
(138, 'Investigar y evaluar previamente distintas librerías de visualización', 'Se investigarán las librerías que se adapten a las necesidades del proyecto', '1', 99, '2025-10-22', '2025-10-22', '2025-10-24'),
(141, 'Revisar y validar las fórmulas de cálculo antes de la codificación', 'Se validarán las fórmulas o cálculos como el umbral para definirlo previamente y agilizar la codificación y pruebas', '1', 102, '2025-10-25', '2025-10-25', '2025-10-28'),
(144, 'Modificar los casos de prueba para mejorar la detección de errores', 'Se modificarán las casos de prueba implementados de UARGFlow para mejorar la detección de errores', '1', 96, '2025-10-11', '2025-10-12', '2025-10-24'),
(145, 'Revisión semanal del avance', 'Evaluar el progreso del equipo cada domingo. Detectar posibles atrasos y reorganizar prioridades para evitar acumulación de tareas al cierre de la iteración', '1', 103, '2025-11-02', '2025-11-02', '2025-11-04'),
(148, 'Repriorización de entregables críticos', 'Analizar los entregables planificados y reordenar la prioridad asegurando que las actividades más importantes se completen antes del fin de la iteración y evitando sobrecarga en la última semana.', '1', 103, '2025-11-02', '2025-11-02', '2025-11-04'),
(151, 'Reorganización de tareas según disponibilidad', 'Ajustar la asignación de actividades de acuerdo con la carga académica y disponibilidad semanal de cada integrante, garantizando una distribución equilibrada del trabajo y evitando sobrecarga individual', '1', 106, '2025-10-28', '2025-10-28', '2025-10-31'),
(154, 'Reuniones breves de coordinación', 'Realizar reuniones de 15 minutos al finalizar las clases de los días martes y viernes para revisar avances, identificar sobrecargas y redistribuir tareas según la disponibilidad del equipo', '1', 106, '2025-10-28', '2025-10-28', '2025-10-31'),
(157, 'Ejecución parcial de pruebas por módulo', 'Realizar pruebas inmediatamente después de cada implementación correspondiente a los casos de uso CU07, CU08, CU10, CU11 y CU12. Registrar los resultados en los informes de verificación al momento de su ejecución para evitar acumulación de tareas de prueba al cierre de la iteración.', '0', 109, '2025-10-29', '2025-11-07', NULL),
(160, 'Realizar pruebas de integración que permitan detectar posibles discrepancias', 'Se realizarán pruebas de integración para validar los datos entre el dashboard y la carga de métricas', '0', 112, '2025-11-06', '2025-11-06', NULL),
(163, 'Realizar pruebas de exportación para corregir errores de compatibilidad', 'Se realizarán pruebas de exportación para validar que los formatos e información sean correctos dentro de los documentos o imágenes', '1', 115, '2025-11-06', '2025-11-06', '2025-11-05'),
(167, 'Reorganización de tareas según disponibilidad 2', 'Ajustar la asignación de actividades de acuerdo con la carga académica y disponibilidad semanal de cada integrante, garantizando una distribución equilibrada del trabajo y evitando sobrecarga individual\n', '1', 106, '2025-10-31', '2025-10-31', '2025-11-04'),
(170, 'Reuniones breves de coordinación 2', 'Realizar reuniones de 15 minutos al finalizar las clases de los días martes y viernes para revisar avances, identificar sobrecargas y redistribuir tareas según la disponibilidad del equipo', '1', 106, '2025-10-31', '2025-10-31', '2025-11-04'),
(173, 'Reuniones breves de coordinación 3', 'Realizar reuniones de 15 minutos al finalizar las clases de los días martes y viernes para revisar avances, identificar sobrecargas y redistribuir tareas según la disponibilidad del equipo', '0', 106, '2025-11-04', '2025-11-04', NULL),
(176, 'Definición de casos de prueba para el CU: Gestionar Tareas', 'Determinar los casos de prueba para el CU Gestionar Tarea', '1', 119, '2025-10-30', '2025-10-30', '2025-11-04'),
(179, 'Definición de casos de prueba para los CU: Crear Etapa y Crear Iteración', 'Determinar los casos de prueba para los cu crear etapa y crear iteración', '1', 119, '2025-11-03', '2025-11-03', '2025-11-04'),
(182, 'Definición de casos de prueba para el CU: Registrar tiempo manual', 'Determinar los casos de prueba para el CU: Registrar tiempo manual', '1', 119, '2025-11-03', '2025-11-03', '2025-11-04'),
(183, 'Pull Request 1', 'Realizar pull request de las ramas de los CU 07 y 08 con la rama de los CU 13 a 16', '0', 120, '2025-11-07', '2025-11-07', NULL),
(186, 'Resolver posibles conflictos', 'Resolver los posibles conflictos que se presenten al hacer pull request', '0', 120, '2025-11-07', '2025-11-07', NULL),
(189, 'Pull Request 2', 'Realizar pull request esta vez integrando la rama que contiene el CU 21', '0', 120, '2025-11-07', '2025-11-09', NULL),
(192, 'Resolver posibles conflictos, segunda integración', 'Realizar posibles conflictos que se presenten para la nueva integración', '0', 120, '2025-11-07', '2025-11-09', NULL),
(195, 'Reunión grupal de integración en la que participen todos los miembros', 'Realizar una reunión grupal de integración en la que participen todos los miembros del equipo, con el objetivo de coordinar la unión de los distintos módulos, identificar posibles conflictos y resolverlos de manera colaborativa', '1', 123, '2025-11-13', '2025-11-13', '2025-11-14'),
(198, 'Revisión semanal del avance', 'Evaluar el progreso del equipo cada domingo. Detectar posibles atrasos y reorganizar prioridades para evitar acumulación de tareas al cierre de la iteración', '1', 126, '2025-11-09', '2025-11-09', '2025-11-11'),
(199, 'Repriorización de entregables críticos', 'Analizar los entregables planificados y reordenar la prioridad asegurando que las actividades más importantes se completen antes del fin de la iteración y evitando sobrecarga en la última semana.', '1', 126, '2025-11-09', '2025-11-09', '2025-11-11'),
(200, 'Reorganización de tareas según disponibilidad', 'Ajustar la asignación de actividades de acuerdo con la carga académica y disponibilidad semanal de cada integrante, garantizando una distribución equilibrada del trabajo y evitando sobrecarga individual', '1', 127, '2025-11-07', '2025-11-07', '2025-11-11'),
(201, 'Reuniones breves de coordinación', 'Realizar reuniones de 15 minutos al finalizar las clases de los días martes y viernes para revisar avances, identificar sobrecargas y redistribuir tareas según la disponibilidad del equipo', '1', 127, '2025-11-07', '2025-11-07', '2025-11-11'),
(202, 'Reorganización de tareas según disponibilidad 2', 'Ajustar la asignación de actividades de acuerdo con la carga académica y disponibilidad semanal de cada integrante, garantizando una distribución equilibrada del trabajo y evitando sobrecarga individual', '0', 127, '2025-11-11', '2025-11-11', NULL),
(203, 'Reuniones breves de coordinación 2', 'Realizar reuniones de 15 minutos al finalizar las clases de los días martes y viernes para revisar avances, identificar sobrecargas y redistribuir tareas según la disponibilidad del equipo', '0', 127, '2025-11-11', '2025-11-11', NULL),
(204, 'Ejecución parcial de pruebas por módulo', 'Realizar pruebas inmediatamente después de cada implementación correspondiente a los casos de uso CU13, 14 y 16. Registrar los resultados en los informes de verificación al momento de su ejecución para evitar acumulación de tareas de prueba al cierre de la iteración.', '0', 128, '2025-11-07', '2025-11-14', NULL),
(205, 'Definición de casos de prueba para los casos de uso', 'Definición de casos de prueba para los casos de uso', '0', 129, '2025-11-12', '2025-11-12', NULL),
(206, 'Definición de casos de prueba para el CU: Crear Proyecto y Modificar proyecto', 'Definir casos de prueba para Crear Proyecto y Modificar proyecto lo suficientement completos para este CU', '0', 131, '2025-11-11', '2025-11-11', NULL),
(209, 'Definir casos de prueba para Ver Reporte', 'Definir casos de prueba exhaustivos para Ver Reporte lo suficientemente completos para este CU ya que es el dashboard', '0', 131, '2025-11-11', '2025-11-11', NULL),
(212, 'Pull Request 1', 'Realizar pull request en la rama dev con rama timer_cronometro', '1', 134, '2025-11-08', '2025-11-08', '2025-11-11'),
(215, 'Resolver conflictos', 'Resolver conflictos que se generen', '1', 134, '2025-11-08', '2025-11-08', '2025-11-11'),
(218, 'Pull Request 2', 'Realizar pull con rama dev y rama integración', '1', 134, '2025-11-08', '2025-11-08', '2025-11-11'),
(221, 'Resolver conflictos 2', 'Resolver conflictos de integracion', '1', 134, '2025-11-08', '2025-11-08', '2025-11-11'),
(224, 'Pull request 3 ', 'Pull con rama tareas', '1', 134, '2025-11-08', '2025-11-08', '2025-11-11'),
(227, 'Resolver conflictos 3', 'Resolver conflicto de todas las ramas integradas', '1', 134, '2025-11-08', '2025-11-08', '2025-11-11'),
(230, 'Realizar integraciones parciales', 'Realizar integraciones parciales antes del 14 cuando se entregue el software ya integrado', '0', 134, '2025-11-12', '2025-11-12', NULL),
(233, 'Definir criterios de los datos', 'Establecer qué características deben tener los datos de prueba (volumen, variedad, casos límite, distribución, etc.) para reflejar los escenarios reales.', '0', 137, '2025-11-11', '2025-11-12', NULL),
(236, 'Revisar y validar los datos de prueba', 'Incluir una etapa de revisión por parte de analistas o usuarios clave para confirmar que los datos son representativos.', '0', 137, '2025-11-12', '2025-11-13', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL,
  `nombre` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(64) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `email`) VALUES
(23, 'Abril Alvarez', 'abriinahir1@gmail.com'),
(3, 'Agustin', 'ardkrav@gmail.com'),
(4, 'Agustin Collareda', 'collaredaagustinpmg@gmail.com'),
(20, 'Agustina Maldonado', 'agus0.0maldonado@gmail.com'),
(5, 'Cintia', 'cintiasod2021@gmail.com'),
(6, 'Cintia Hernandez', 'cintiah378@gmail.com'),
(22, 'Cristian Carranza', 'cristiancarranz@gmail.com'),
(10, 'Diego Portillo', 'dportillo@gmail.com'),
(13, 'Eduardo Sly', 'esly@gmail.com'),
(16, 'Emilio', 'emilio@gmail.com'),
(7, 'Esteban Gesto', 'egesto@uarg.unpa.edu.ar'),
(27, 'Ezequiel Mansilla', 'ezequielmansi87@gmail.com'),
(28, 'Fabricio Nuñez', 'fabrydamian@gmail.com'),
(21, 'Florencia Mendez', 'esstefaniamendez@gmail.com'),
(11, 'Franco Rosas', 'frosas@gmail.com'),
(12, 'Glenda Flores', 'gflores@gmail.com'),
(18, 'Gonzalo Ulloa', 'gonzalo.ulloa99@gmail.com'),
(17, 'Guillermo Escalante', 'guilleh114@gmail.com'),
(1, 'Hugo', 'hugofrey202@gmail.com'),
(2, 'Hugo Frey', 'hugoantoniofrey2003@gmail.com'),
(8, 'Karim Hallar', 'khallar@uarg.unpa.edu.ar'),
(43, 'Leonardo Gonzalez', 'lgonzalez@uarg.unpa.edu.ar'),
(30, 'Lorenzo Teppa', 'lorenzoas12@gmail.com'),
(29, 'Malcom Salazar', 'malcom38794@gmail.com'),
(15, 'Malena Oyarzo', 'moyarzo@gmail.com'),
(24, 'Martina Gagna', 'martinagagna@gmail.com'),
(25, 'Nicolas Butterfield', 'nicobutter@gmail.com'),
(9, 'Osiris Sofia', 'osofia@uarg.unpa.edu.ar'),
(26, 'Santiago Pacheco', 'pacheco.santi990@gmail.com'),
(19, 'Valeria Centurion', 'centurionvaleria6@gmail.com'),
(14, 'Valeria Ojeda', 'vojeda@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_perfil`
--

CREATE TABLE `usuario_perfil` (
  `id_usuario` int NOT NULL,
  `id_perfil` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario_perfil`
--

INSERT INTO `usuario_perfil` (`id_usuario`, `id_perfil`) VALUES
(1, 1),
(3, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(2, 2),
(4, 2),
(10, 2),
(11, 2),
(12, 2),
(13, 2),
(14, 2),
(15, 2),
(16, 2),
(17, 2),
(18, 2),
(19, 2),
(20, 2),
(21, 2),
(22, 2),
(23, 2),
(24, 2),
(25, 2),
(26, 2),
(27, 2),
(28, 2),
(29, 2),
(30, 2),
(43, 3);

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
  ADD KEY `fk_evaluacion_riesgo` (`id_proyecto`,`id_riesgo`),
  ADD KEY `fk_evaluacion_iteracion` (`id_iteracion`),
  ADD KEY `idx_evaluacion` (`id_riesgo`,`id_iteracion`);

--
-- Indices de la tabla `incidencia`
--
ALTER TABLE `incidencia`
  ADD PRIMARY KEY (`id_incidencia`),
  ADD KEY `fk_incidencia_riesgo` (`id_proyecto`,`id_riesgo`),
  ADD KEY `fk_incidencia_usuario` (`id_usuario`);

--
-- Indices de la tabla `iteracion`
--
ALTER TABLE `iteracion`
  ADD PRIMARY KEY (`id_iteracion`),
  ADD KEY `fk_iteracion_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `participante_riesgo`
--
ALTER TABLE `participante_riesgo`
  ADD PRIMARY KEY (`id_usuario`,`id_riesgo`,`id_proyecto`),
  ADD KEY `fk_pt_riesgo` (`id_proyecto`,`id_riesgo`),
  ADD KEY `idx_participante_riesgo` (`id_riesgo`,`id_usuario`);

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
-- Indices de la tabla `plan`
--
ALTER TABLE `plan`
  ADD PRIMARY KEY (`id_plan`),
  ADD KEY `fk_plan_riesgo` (`id_proyecto`,`id_riesgo`),
  ADD KEY `fk_plan_iteracion` (`id_iteracion`),
  ADD KEY `idx_plan` (`id_riesgo`,`id_iteracion`,`tipo`);

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
-- Indices de la tabla `riesgo`
--
ALTER TABLE `riesgo`
  ADD PRIMARY KEY (`id_proyecto`,`id_riesgo`),
  ADD KEY `idx_riesgo_proyecto` (`id_proyecto`),
  ADD KEY `idx_riesgo_categoria` (`id_categoria`);

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
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `id_evaluacion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=465;

--
-- AUTO_INCREMENT de la tabla `incidencia`
--
ALTER TABLE `incidencia`
  MODIFY `id_incidencia` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `iteracion`
--
ALTER TABLE `iteracion`
  MODIFY `id_iteracion` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;

--
-- AUTO_INCREMENT de la tabla `perfil`
--
ALTER TABLE `perfil`
  MODIFY `id_perfil` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `plan`
--
ALTER TABLE `plan`
  MODIFY `id_plan` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=138;

--
-- AUTO_INCREMENT de la tabla `proyecto`
--
ALTER TABLE `proyecto`
  MODIFY `id_proyecto` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `id_tarea` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=237;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD CONSTRAINT `fk_evaluacion_iteracion` FOREIGN KEY (`id_iteracion`) REFERENCES `iteracion` (`id_iteracion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_evaluacion_riesgo` FOREIGN KEY (`id_proyecto`,`id_riesgo`) REFERENCES `riesgo` (`id_proyecto`, `id_riesgo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_evaluacion_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `incidencia`
--
ALTER TABLE `incidencia`
  ADD CONSTRAINT `fk_incidencia_riesgo` FOREIGN KEY (`id_proyecto`,`id_riesgo`) REFERENCES `riesgo` (`id_proyecto`, `id_riesgo`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_incidencia_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `iteracion`
--
ALTER TABLE `iteracion`
  ADD CONSTRAINT `fk_iteracion_proyecto` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `participante_riesgo`
--
ALTER TABLE `participante_riesgo`
  ADD CONSTRAINT `fk_pt_riesgo` FOREIGN KEY (`id_proyecto`,`id_riesgo`) REFERENCES `riesgo` (`id_proyecto`, `id_riesgo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pt_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `participante_tarea`
--
ALTER TABLE `participante_tarea`
  ADD CONSTRAINT `fk_pt_participante` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pt_tarea` FOREIGN KEY (`id_tarea`) REFERENCES `tarea` (`id_tarea`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `plan`
--
ALTER TABLE `plan`
  ADD CONSTRAINT `fk_plan_iteracion` FOREIGN KEY (`id_iteracion`) REFERENCES `iteracion` (`id_iteracion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_plan_riesgo` FOREIGN KEY (`id_proyecto`,`id_riesgo`) REFERENCES `riesgo` (`id_proyecto`, `id_riesgo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proyecto_categoria`
--
ALTER TABLE `proyecto_categoria`
  ADD CONSTRAINT `fk_pc_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pc_proyecto` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `proyecto_participante`
--
ALTER TABLE `proyecto_participante`
  ADD CONSTRAINT `fk_pp_participante` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pp_proyecto` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `riesgo`
--
ALTER TABLE `riesgo`
  ADD CONSTRAINT `fk_riesgo_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`),
  ADD CONSTRAINT `fk_riesgo_proyecto` FOREIGN KEY (`id_proyecto`) REFERENCES `proyecto` (`id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `fk_tarea_plan` FOREIGN KEY (`id_plan`) REFERENCES `plan` (`id_plan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario_perfil`
--
ALTER TABLE `usuario_perfil`
  ADD CONSTRAINT `fk_ur_perfil` FOREIGN KEY (`id_perfil`) REFERENCES `perfil` (`id_perfil`),
  ADD CONSTRAINT `fk_ur_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
