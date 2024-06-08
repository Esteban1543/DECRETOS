-- Tipo Persona
INSERT INTO
    tipo_persona (tipo_persona)
VALUES
    ("Digitador"),
    ("Cliente");

-- Tipo identificacion
INSERT INTO
    tipo_identificacion (tipo_id)
VALUES
    ("CC"),
    ("CE"),
    ("Otro");

-- Datos Persona
INSERT INTO datos_persona (fk_tipo_identificacion, n_identificacion, nombre_1, nombre_2, apellido_1, apellido_2, telefono, direccion, correo, fk_tipo_persona, estado_persona) 
VALUES

    -- Usuarios
    ('CC', '444555666', 'Edwin', null, 'Marín', null, '3114445660', 'Calle 56 # 12 - 06', 'edwin.marin@example.com', 1, 1), 
    ('CC', '123456789', 'Juan', null, 'Pérez', 'Sabogal', '3001234590', 'Calle 12 # 08 - 10', 'juan.perez@example.com', 1, 1),
    ('CC', '777888999', 'Ana', 'Maria', 'García', null, '3117778890', 'Avenida 32 # 12 - 06', 'ana.maria@example.com', 1, 1), 
    ('CC', '999888777', 'Enrique', null, 'Hernández', null, '319998770', 'Carrera 65 # 08 - 10', 'enrique.hernandez@example.com', 1, 1),
    ('CE', '666777888', 'Laura', null, 'Rodríguez', 'Parrado', '316667880', 'Calle 89 # 12 - 06', 'laura.rodriguez@example.com', 1, 1), 

    -- Clientes
    ('Otro', '987654321', 'María', null, 'Gómez', null, '319876210', 'Carrera 46 # 08 - 10', 'maria.gomez@example.com', 2, 1),
    ('CE', '111222333', 'Carlos', null, 'López', null, '3111112330', 'Avenida 79 # 12 - 06', 'carlos.lopez@example.com', 2, 1),
    ('CC', '543216789', 'Sofía', null, 'López', null, '315432890', 'Calle 76 # 08 - 10', 'sofia.lopez@example.com', 2, 1),
    ('Otro', '222333444', 'Manuel', null, 'Díaz', null, '3001113330', 'Avenida 26 # 12 - 06', 'manuel.diaz@example.com', 2, 1);

-- Usuarios
INSERT INTO usuarios (pfk_usuario, alias, contraseña, rol)
VALUES
    (1, 'Admin', '$2b$10$2cRofAbM9Szb62v9FzbA/eZPRhZffVaxSs.j0kCsTkvtEM029GfGi', 1), -- (admin123)
    (2, 'Digitador 1', '$2b$10$uzFOndb2j5RhAU8F/gnNMOqZrOQeK/6m6po0sL8k73PKkfKbySiGK', 2), -- (ventas123)
    (3, 'Digitador 2', '$2b$10$uzFOndb2j5RhAU8F/gnNMOqZrOQeK/6m6po0sL8k73PKkfKbySiGK', 2), 
    (4, 'Digitador 3', '$2b$10$uzFOndb2j5RhAU8F/gnNMOqZrOQeK/6m6po0sL8k73PKkfKbySiGK', 2), 
    (5, 'Digitador 4', '$2b$10$uzFOndb2j5RhAU8F/gnNMOqZrOQeK/6m6po0sL8k73PKkfKbySiGK', 2);


-- Leyes
INSERT INTO
    ley (ley, descipcion)
VALUES
    ('2213 de 2022','Para el cumplimiento de la orden anterior, por la vía prevista en el artículo 11 de la Ley 2213 de 2022, remítase oficio a los gerentes de las entidades financieras relacionadas en el escrito de las cautelas, para que las sumas retenidas sean puestas a disposición del juzgado, por intermedio del Banco Agrario de Colombia S.A. dentro del término de tres (3) días, so pena de responder por los perjuicios que su incumplimiento ocasione, del correspondiente pago y de incurrir en multa de dos (2) a cinco (5) salarios mínimos legales mensuales (art. 593, núms. 4 y 10 C.G.P). Adviértasele, en la respectiva comunicación a las entidades financieras, que no podrán desconocer el contenido de los oficios ni su autenticidad habida cuenta de lo dispuesto en el inciso 2 del artículo 11 de la Ley 2213 de 2022, leído en concordancia con el Concepto 2020286687 de la Superintendencia Financiera, so pena de incurrir en desacato y hacerse acreedoras de las sanciones que la ley establece. Por Secretaría, procédase de conformidad y déjense las constancias del caso.');

-- Tipo Embargo 
INSERT INTO tipo_embargo (tipo, descripcion)
VALUES
    ('Establecimiento', 'DECRETAR EL EMBARGO del establecimiento de comercio denominado “°”, identificado con Matrícula No. °, ubicado en °, que se denuncia de propiedad del ejecutado °. Verificada y acreditada la inscripción de dicha medida, se resolverá lo pertinente sobre su secuestro (Art. 601 CGP).'),

    ('Banco', 'DECRETAR EL EMBARGO Y RETENCIÓN, en la cuantía y proporción permitida por la ley, de los saldos bancarios que a cualquier título existan a favor del demandado °, y los depósitos posteriores que se produzcan, hasta completar la suma de ° de pesos.'),

    ('Salario', 'OFICIAR al tesorero y/o pagador del °, para que del salario devengado por °, retenga la proporción del dinero antes determinada y constituya certificado de depósito a órdenes del Juzgado, previniéndole que de lo contrario responderá por dichos valores.'),

    ('Automovil', 'Previo a la orden de secuestro, se ordena la INMOVILIZACIÓN del vehículo de placas ° del que se señala su posesión en cabeza del demandado °.'),

    ('Fondo de Pensiones', 'DECRETAR EL EMBARGO Y RETENCIÓN hasta del ° de la pensión del demandado °, como pensionado del °, de conformidad con lo dispuesto por el artículo 134 de la Ley 100 de 1993, y que le corresponde en calidad pensionada. Se limita la medida en la cantidad de ° de pesos.'),

    ('Inmueble', 'DECRETAR EL EMBARGO del derecho de dominio de que sea titular la demandada °, respecto del bien distinguido con el F. M. I.  ° de la O. R. I. P. del municipio de Tunja, Boyacá. Verificada y acreditada la inscripción de dicha medida, se resolverá lo pertinente sobre su secuestro');

-- Origen
INSERT INTO origen (origen)
VALUES 
    ('Juzgado Sexto de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá DC');

-- Proceso
INSERT INTO proceso (proceso)
VALUES
    ('EJECUTIVO SINGULAR DE MÍNIMA CUANTÍA');

-- Acta embargo
INSERT INTO acta_embargo (id_acta, fk_id_usuario, fecha_registro)
VALUES
    ('123123', 1, '2024-06-06 14:30:00'),
    ('321321', 2, '2024-05-04 12:00:00');
    
-- Historial decretos
INSERT INTO historial_decretos (fkp_historial_decretos, fk_proceso, demandante, demandado, cod_folio, fk_origen)
VALUES
    ('123123', 1, 'Nutresa S.A.S.', 'Miguel Angel Bonilla Pelaez', '123132', 1),
    ('321321', 1, '789987', 'Anguie Catalina Romero Pinton', 'Nestle S.A.S', 1);

-- Datos decreto
INSERT INTO datos_decretos (fkp_id_datos_decreto, fk_ley, fk_embargo, datos_decretos)
VALUES
    ('123123', 1, 4, JSON_OBJECT('Demandado', 'Juan perez', 'Marca', 'Mazda', 'Placas', 'ABC-123')),
    ('321321', 1, 2, JSON_OBJECT('Demandado', 'Pepito Pelaez', 'Valor', '1.000.000'));