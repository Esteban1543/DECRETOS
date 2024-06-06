-- Tipo Persona
INSERT INTO
    tipo_persona (tipo_persona)
VALUES
    ("Cliente"),
    ("Digitador");

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
    ('CC', '444555666', 'Edwin', null, 'Marín', null, '3114445660', 'Calle 56 # 12 - 06', 'edwin.marin@example.com', '2', 1), 
    ('CC', '123456789', 'Juan', null, 'Pérez', 'Sabogal', '3001234590', 'Calle 12 # 08 - 10', 'juan.perez@example.com', '2', 1),
    ('CC', '777888999', 'Ana', 'Maria', 'García', null, '3117778890', 'Avenida 32 # 12 - 06', 'ana.maria@example.com', '2', 1), 
    ('CC', '999888777', 'Enrique', null, 'Hernández', null, '319998770', 'Carrera 65 # 08 - 10', 'enrique.hernandez@example.com', '2', 1),
    ('CE', '666777888', 'Laura', null, 'Rodríguez', 'Parrado', '316667880', 'Calle 89 # 12 - 06', 'laura.rodriguez@example.com', '2', 1), 

    -- Clientes
    ('Otro', '987654321', 'María', null, 'Gómez', null, '319876210', 'Carrera 46 # 08 - 10', 'maria.gomez@example.com', '1', 1),
    ('CE', '111222333', 'Carlos', null, 'López', null, '3111112330', 'Avenida 79 # 12 - 06', 'carlos.lopez@example.com', '1', 1),
    ('CC', '543216789', 'Sofía', null, 'López', null, '315432890', 'Calle 76 # 08 - 10', 'sofia.lopez@example.com', '1', 1),
    ('Otro', '222333444', 'Manuel', null, 'Díaz', null, '3001113330', 'Avenida 26 # 12 - 06', 'manuel.diaz@example.com', '1', 1),

    ('Otro', '987654323', 'María', null, 'Gómez', null, '3119876210', 'Carrera 46 # 08 - 10', 'maria.gomez2@example.com', '1', 1),
    ('CE', '111222336', 'Carlos', null, 'López', null, '311112330', 'Avenida 79 # 12 - 06', 'carlos.lopez2@example.com', '1', 1),
    ('CC', '543216783', 'Sofía', null, 'López', null, '3115432890', 'Calle 76 # 08 - 10', 'sofia.lopez2@example.com', '1', 1),
    ('Otro', '222333447', 'Manuel', null, 'Díaz', null, '3001113330', 'Avenida 26 # 12 - 06', 'manuel.diaz2@example.com', '1', 1),
    ('CC', '444555665', 'Ana', 'Isabel', 'Pérez', null, '3114445566', 'Calle 10 # 20 - 30', 'ana.perez@example.com', '1', 1),
    ('CE', '777888997', 'Luis', null, 'Ramírez', 'Torres', '7778999', 'Carrera 55 # 22 - 15', 'luis.ramirez@example.com', '1', 1),
    ('CC', '999888771', 'Claudia', null, 'Martínez', null, '3119998777', 'Avenida 34 # 18 - 25', 'claudia.martinez@example.com', '1', 1),
    ('Otro', '555444333', 'Miguel', 'Ángel', 'Rodríguez', null, '315554333', 'Calle 65 # 14 - 12', 'miguel.rodriguez@example.com', '1', 1),
    ('CC', '333444555', 'Elena', null, 'Fernández', 'López', '313334555', 'Carrera 15 # 18 - 19', 'elena.fernandez@example.com', '1', 1),
    ('CE', '123456788', 'Jorge', 'Luis', 'Vargas', null, '3111234567', 'Avenida 45 # 10 - 20', 'jorge.vargas@example.com', '1', 1),
    ('CC', '111333555', 'Gloria', null, 'Muñoz', 'Ríos', '3001113555', 'Calle 12 # 13 - 14', 'gloria.munoz@example.com', '1', 1),
    ('Otro', '222444666', 'Andrés', null, 'Moreno', null, '312224666', 'Carrera 25 # 14 - 10', 'andres.moreno@example.com', '1', 1),
    ('CC', '333555777', 'Lucía', 'María', 'Gómez', null, '3113335777', 'Avenida 16 # 22 - 30', 'lucia.gomez@example.com', '1', 1),
    ('CE', '444666888', 'Fernando', null, 'Hernández', null, '314446888', 'Calle 40 # 10 - 12', 'fernando.hernandez@example.com', '1', 1),
    ('CC', '555777999', 'Paula', null, 'Ortiz', 'Martínez', '3005557999', 'Carrera 18 # 25 - 40', 'paula.ortiz@example.com', '1', 1),
    ('Otro', '666888000', 'Raúl', 'Emilio', 'Suárez', null, '3116668000', 'Avenida 27 # 14 - 22', 'raul.suarez@example.com', '1', 1),
    ('CC', '777999111', 'Marta', null, 'Pineda', 'López', '317779111', 'Calle 31 # 18 - 10', 'marta.pineda@example.com', '1', 1),
    ('CE', '888000222', 'Sergio', 'Andrés', 'Castro', null, '318880222', 'Carrera 52 # 10 - 23', 'sergio.castro@example.com', '1', 1),
    ('CC', '999111333', 'Natalia', null, 'Ramos', 'García', '3119991133', 'Avenida 29 # 14 - 16', 'natalia.ramos@example.com', '1', 1),
    ('Otro', '000222444', 'Esteban', null, 'Guzmán', null, '310002444', 'Calle 11 # 15 - 21', 'esteban.guzman@example.com', '1', 1),
    ('CC', '111333666', 'Verónica', 'Lucía', 'Navarro', null, '3112113666', 'Carrera 41 # 20 - 11', 'veronica.navarro@example.com', '1', 1),
    ('CE', '222444777', 'Javier', null, 'Vega', null, '312224777', 'Avenida 32 # 18 - 10', 'javier.vega@example.com', '1', 1),
    ('Otro', '333555888', 'Alejandra', 'María', 'Rubio', null, '3003335888', 'Calle 14 # 15 - 13', 'alejandra.rubio@example.com', '1', 1),
    ('CC', '444666999', 'David', null, 'Mejía', null, '314446999', 'Carrera 34 # 12 - 11', 'david.mejia@example.com', '1', 1),
    ('CE', '555777111', 'Inés', null, 'Flores', 'Sánchez', '3115557111', 'Avenida 56 # 19 - 12', 'ines.flores@example.com', '1', 1),
    ('Otro', '666888222', 'Gonzalo', 'María', 'García', null, '316668222', 'Calle 25 # 14 - 10', 'gonzalo.garcia@example.com', '1', 1),
    ('CC', '777999333', 'Isabel', null, 'Duarte', 'Vargas', '3007779333', 'Carrera 37 # 18 - 21', 'isabel.duarte@example.com', '1', 1),
    ('CE', '888000444', 'Felipe', null, 'Montoya', null, '318880444', 'Avenida 50 # 16 - 14', 'felipe.montoya@example.com', '1', 1),
    ('Otro', '999111555', 'Gabriela', 'Luz', 'Quintero', null, '319991155', 'Calle 22 # 12 - 10', 'gabriela.quintero@example.com', '1', 1),
    ('CC', '000222666', 'Pablo', null, 'Salazar', null, '3110002666', 'Carrera 33 # 20 - 30', 'pablo.salazar@example.com', '1', 1);

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
    ley (ley)
VALUES
    (
        'Para el cumplimiento de la orden anterior, por la vía prevista en el artículo 11 de la Ley 2213 de 2022, remítase oficio a los gerentes de las entidades financieras relacionadas en el escrito de las cautelas, para que las sumas retenidas sean puestas a disposición del juzgado, por intermedio del Banco Agrario de Colombia S.A. dentro del término de tres (3) días, so pena de responder por los perjuicios que su incumplimiento ocasione, del correspondiente pago y de incurrir en multa de dos (2) a cinco (5) salarios mínimos legales mensuales (art. 593, núms. 4 y 10 C.G.P). 
 
Adviértasele, en la respectiva comunicación a las entidades financieras, que no podrán desconocer el contenido de los oficios ni su autenticidad habida cuenta de lo dispuesto en el inciso 2 del artículo 11 de la Ley 2213 de 2022, leído en concordancia con el Concepto 2020286687 de la Superintendencia Financiera, so pena de incurrir en desacato y hacerse acreedoras de las sanciones que la ley establece.
 
Por Secretaría, procédase de conformidad y déjense las constancias del caso.
'
    );

-- Tipo Embargo 
INSERT INTO tipo_embargo (tipo)
VALUES
    ('Establecimiento'),
    ('Banco'),
    ('Salario'),
    ('Fondo de Pensiones'),
    ('Inmueble');

-- Origen
INSERT INTO origen (origen)
VALUES 
    ('Juzgado Sexto de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá DC');

-- Clientes
INSERT INTO  clientes (pfk_cliente, fk_id_origen, radicacion, fk_id_embargo, demandado, proceso, codigo_folio)
VALUES
    ( 6, 1, '110014189006 – 2024 - 00349 - 00', 1, 'Juan Gonzales', 'EJECUTIVO SINGULAR DE MÍNIMA CUANTÍA', '123456'),
    ( 7, 1, '110014189436 – 2024 - 00349 - 00', 2, 'Maria Pinto', 'EJECUTIVO SINGULAR DE MÍNIMA CUANTÍA', '654321'),
    ( 8, 1, '110014183406 – 2024 - 00349 - 00', 3, 'Pepe Pelaez', 'EJECUTIVO SINGULAR DE MÍNIMA CUANTÍA', '789321'),
    ( 9, 1, '110014112006 – 2024 - 00349 - 00', 4, 'Jhon Gutierrez', 'EJECUTIVO SINGULAR DE MÍNIMA CUANTÍA', '321987');
