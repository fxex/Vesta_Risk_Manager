INSERT INTO categoria (nombre, descripcion) VALUES
('Compromiso del Cliente', 'Riesgos asociados al nivel de involucramiento y apoyo del cliente en el proyecto, lo que puede afectar su desarrollo y entrega.'),
('Definición del Cliente', 'Riesgos derivados de la claridad y estabilidad de los requerimientos del cliente, pudiendo generar cambios inesperados y costos adicionales.'),
('Cronograma', 'Riesgos relacionados con retrasos en la planificación y ejecución del proyecto, afectando entregas y costos.'),
('Experiencia y Capacidad', 'Riesgos que surgen por la falta de conocimientos, habilidades o experiencia del equipo, lo que puede comprometer la calidad y el éxito del proyecto.'),
('Duración y Tamaño', 'Riesgos asociados a la magnitud y tiempo de ejecución del proyecto, donde una mayor duración o tamaño incrementa la probabilidad de imprevistos.'),
('Legal y Contractual', 'Riesgos vinculados a aspectos legales, regulaciones y cumplimiento de contratos, lo que puede generar disputas o sanciones.'),
('Tecnología', 'Riesgos derivados del uso de tecnologías nuevas o inestables, que pueden generar fallos, incompatibilidades o problemas de implementación.'),
('Complejidad', 'Riesgos asociados al grado de dificultad del proyecto en términos técnicos, organizativos o de integración con otros sistemas.'),
('Aspectos Financieros', 'Riesgos relacionados con la disponibilidad y gestión de recursos financieros, afectando la viabilidad y sostenibilidad del proyecto.'),
('Subcontratistas', 'Riesgos derivados de la dependencia de terceros para la ejecución de partes del proyecto, lo que puede afectar la calidad, tiempos y costos.');

insert into perfil (nombre) VALUES 
("Administrador"), 
("Usuario Estandar"), 
("Espectador");

INSERT into usuario (nombre, email) VALUES 
("Hugo Frey", "hugofrey202@gmail.com"), ("Hugo Antonio Frey", "hugoantoniofrey2003@gmail.com"),  
("ardkrav", "ardkrav@gmail.com"), ("Agustin Collareda","collaredaagustinpmg@gmail.com"), 
("Mijuku", "cintiasod2021@gmail.com"), ("Cintia Hernandez","cintiah378@gmail.com");

INSERT INTO usuario_perfil(id_usuario, id_perfil) VALUES 
(1,1), (2,2), 
(3,1), (4,2), 
(5,1), (6,2);

Insert Into proyecto (nombre, descripcion, estado, fecha_inicio) values
("Vesta Risk Manager", "Es una aplicación que optimiza la identificación, analisis y monitereo de los diferentes 
riesgos que se presentan a la hora de desarrollar un software con el fin de asistir al usuario en la toma de 
decisiones y mitigar los riesgos", "activo", "2024-08-24");

insert into proyecto_participante (id_proyecto, id_usuario, rol) values
(1, 2, "Desarrollador"), 
(1, 6, "Desarrollador"),
(1, 4, "Lider del Proyecto");

insert into proyecto_categoria (id_proyecto, id_categoria) values
(1,1),
(1,2),
(1,3),
(1,4),
(1,5),
(1,6),
(1,7),
(1,8),
(1,9),
(1,10);

insert into iteracion (nombre, fecha_inicio, fecha_fin, id_proyecto) values 
("Etapa Inicio - Iteración 1", "2024-08-27", "2024-09-10", 1),
("Etapa Elaboración - Iteración 1", "2024-09-11", "2024-09-24", 1),
("Etapa Elaboración - Iteración 2", "2024-09-25", "2024-10-11", 1),
("Etapa Construcción - Iteración 1", "2024-10-12", "2024-10-29", 1),
("Etapa Construcción - Iteración 2", "2024-10-30", "2024-11-08", 1),
("Etapa Construcción - Iteración 3", "2024-11-09", "2024-11-19", 1),
("Etapa Construcción - Iteración 4", "2025-01-18", "2025-01-27", 1),
("Etapa Construcción - Iteración 5", "2025-01-28", "2025-02-11", 1),
("Etapa Construcción - Iteración 6", "2025-03-06", "2025-03-23", 1),
("Etapa Construcción - Iteración 7", "2025-03-24", "2025-04-06", 1),
("Etapa Construcción - Iteración 8", "2025-04-24", "2025-05-09", 1),
("Etapa Construcción - Iteración 9", "2025-05-10", "2025-05-28", 1),
("Etapa Cierre - Iteración 1", "2025-05-29", "2025-06-12", 1);

insert into riesgo (id_riesgo, descripcion, fecha_creacion, id_categoria, id_proyecto) values
();