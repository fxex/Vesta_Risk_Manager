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

insert into perfil (nombre) VALUES ("Administrador"), ("Usuario Estandar"), ("Espectador");
INSERT into usuario (nombre, email) VALUES ("Hugo Frey", "hugofrey202@gmail.com"), ("Hugo Antonio Frey", "hugoantoniofrey2003@gmail.com"), ("Agustin Collareda","collaredaagustinpmg@gmail.com"), ("ardkrav", "ardkrav@gmail.com"), ("Cintia Hernandez","cintiasod2021@gmail.com"), ("Mijuku", "cintiah378@gmail.com");
INSERT INTO usuario_perfil(id_usuario, id_perfil) VALUES (1,1), (2,2), (3,1), (4,2), (5,1), (6,2);