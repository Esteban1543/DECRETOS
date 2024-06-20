	-- Tipo Persona
INSERT INTO
    tipo_persona (tipo_persona)
VALUES
    ("Administrador"),
    ("Digitador");

-- Tipo identificacion
INSERT INTO
    tipo_identificacion (tipo_id)
VALUES
    ("CC"),
    ("CE"),
    ("Otro");

-- Datos Persona
INSERT INTO datos_persona (fk_tipo_identificacion, n_identificacion, nombre_1, nombre_2, apellido_1, apellido_2, telefono, correo, fk_tipo_persona, estado_persona) 
VALUES

    -- Tipo persona administrador
    ('CC', '444555666', 'Edwin', null, 'Marín', null, '3114445660', 'edwin.marin@example.com', 1, 1),
    
    -- Tipo persona Digitador
    ('Otro', '987654321', 'María', null, 'Gómez', null, '319876210','maria.gomez@example.com', 2, 1),
    ('CE', '111222333', 'Carlos', null, 'López', null, '3111112330', 'carlos.lopez@example.com', 2, 1),
    ('CC', '543216789', 'Sofía', null, 'López', null, '315432890', 'sofia.lopez@example.com', 2, 1),
    ('Otro', '222333444', 'Manuel', null, 'Díaz', null, '3001113330', 'manuel.diaz@example.com', 2, 1);

-- Usuarios
INSERT INTO usuarios (pfk_usuario, alias, contraseña, rol)
VALUES
    ('444555666', 'Admin', '$2b$10$2cRofAbM9Szb62v9FzbA/eZPRhZffVaxSs.j0kCsTkvtEM029GfGi', 1), -- (admin123)
    ('987654321', 'Digitador 1', '$2b$10$tirOiLz9DaVpKch.cisrde9AJCewvtlksRe.Sem5g7pc5ikPrLJNS', 2), -- (ventas123)
    ('543216789', 'Digitador 2', '$2b$10$tirOiLz9DaVpKch.cisrde9AJCewvtlksRe.Sem5g7pc5ikPrLJNS', 2), 
    ('222333444', 'Digitador 3', '$2b$10$tirOiLz9DaVpKch.cisrde9AJCewvtlksRe.Sem5g7pc5ikPrLJNS', 2);



-- Tipo Embargo
    -- Contienen la ley segun el embargo
INSERT INTO tipo_embargo (tipo, descripcion, ley)
VALUES
    ('Establecimiento', 'ª, DECRETAR EL EMBARGO Y RETENCIÓN, del establecimiento de comercio denominado “REM_Comercio”, identificado con Matrícula No. REM_Matricula, que se denuncia de propiedad del ejecutado REM_Demandando. Verificada y acreditada la inscripción de dicha medida, se resolverá lo pertinente sobre su secuestro (Art. 601 CGP).', null),

    ('Banco', 'ª, DECRETAR EL EMBARGO Y RETENCIÓN, en la cuantía y proporción permitida por la ley, de los saldos bancarios que a cualquier título existan a favor del demandado REM_Demandado, y los depósitos posteriores que se produzcan, hasta completar la suma de REM_Valor de pesos.', null),

    ('Salario', 'ª, DECRETAR EL EMBARGO Y RETENCIÓN, hasta del REM_Porciento% del salario, y prestaciones sociales de los demandados REM_Demandado, de conformidad con lo dispuesto por el artículo 156 y 344 del Código Sustantivo del Trabajo, y que le corresponde en calidad de empleado de REM_Empresa. Se limita la medida en la cantidad de $° de pesos.', null),

    ('Automovil', 'ª, DECRETAR EL EMBARGO Y RETENCIÓN, del vehículo automotor de placas REM_Placas automóvil marca REM_Marca, que se denuncia de propiedad del demandado REM_Demandado. Verificada y acreditada la inscripción de dicha medida, se resolverá lo pertinente sobre su secuestro (Art. 601 CGP).', null),

    ('Motocicleta', 'DECRETAR EL EMBARGO del vehículo automotor de placas REM_Placas motocicleta marca REM_Marca, que se denuncia de propiedad del demandado REM_Demandado. Verificada y acreditada la inscripción de dicha medida, se resolverá lo pertinente sobre su secuestro (Art. 601 CGP)', null),

    ('Fondo de Pensiones', 'ª, DECRETAR EL EMBARGO Y RETENCIÓN hasta del REM_Porciento de la pensión del demandado REM_Demandado, como pensionado del REM_FondoDePensiones, de conformidad con lo dispuesto por el artículo 134 de la Ley 100 de 1993, y que le corresponde en calidad pensionada. Se limita la medida en la cantidad de REM_Valor de pesos.', null),

    ('Salario/Penciones', 'ª, OFICIAR al tesorero y/o pagador del REM_Demandado, para que del salario devengado por REM_Valor, retenga la proporción del dinero antes determinada y constituya certificado de depósito a órdenes del Juzgado, previniéndole que de lo contrario responderá por dichos valores.', null),

    ('Inmueble', 'DECRETAR EL EMBARGO del derecho de dominio de que sea titular la demandada °, respecto del bien distinguido con el F. M. I.  ° de la O. R. I. P. del municipio de Tunja, Boyacá. Verificada y acreditada la inscripción de dicha medida, se resolverá lo pertinente sobre su secuestro', null);

-- Origen
INSERT INTO origen (origen)
VALUES 
    ('Juzgado Ochenta (80) Civil Municipal de Bogotá D.C.  Transitorio Sesenta y Dos (62) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.'),
    ('Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.'),
    ('Juzgado Ochenta y Tres (83) Civil Municipal de Bogotá D.C.  Transitorio Sesenta y Cinco (65) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.');

-- Proceso
INSERT INTO proceso (proceso)
VALUES
    ('EJECUTIVO DE MÍNIMA CUANTÍA'),
    ('EJECUTIVO PARA LA EFECTIVIDAD DE LA GARANTÍA REAL');

-- Ciudad
INSERT INTO ciudad (ciudad)
VALUES 
    ('Bogotá D.C'),
    ('Tunja');

-- Acta embargo
INSERT INTO acta_embargo (id_acta, fk_id_usuario, fecha_registro)
VALUES
    ('123123', '444555666', '2024-06-06 14:30:00'),
    ('321321', '444555666', '2024-05-04 12:00:00');
    
-- Historial decretos
INSERT INTO historial_decretos (fkp_historial_decretos, fk_proceso, demandante, demandado, provincia, fk_origen, fk_ciudad)
VALUES
    ('123123', 'EJECUTIVO PARA LA EFECTIVIDAD DE LA GARANTÍA REAL', 'Nutresa S.A.S.', 'Miguel Angel Bonilla Pelaez', '123132', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('321321', 'EJECUTIVO DE MÍNIMA CUANTÍA', '789987', 'Anguie Catalina Romero Pinton', 'Nestle S.A.S', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C');

-- Datos decreto
INSERT INTO datos_decretos (fkp_id_datos_decreto, fk_embargo, datos_decretos)
VALUES
    ('123123', 'Automovil', JSON_OBJECT('Demandado', 'Juan perez', 'Marca', 'Mazda', 'Placas', 'ABC-123')),
    ('321321', 'Salario', JSON_OBJECT('Porciento', '40','Demandado', 'Pepito Pelaez', 'Empresa', 'Panasonic S.A.S.', 'Valor', '1.000.000'));