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
    ('987654321', 'Digitador 1', '$2b$10$tirOiLz9DaVpKch.cisrde9AJCewvtlksRe.Sem5g7pc5ikPrLJNS', 2), -- (digic123)
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

    ('Inmueble', 'DECRETAR EL EMBARGO del derecho de dominio de que sea titular la demandada °, respecto del bien distinguido con el REM_Inmueble Verificada y acreditada la inscripción de dicha medida, se resolverá lo pertinente sobre su secuestro', null);

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
    ('123123', '987654321', '2024-06-06 14:30:00'),
    ('321321', '987654321', '2024-05-04 12:00:00'),

    ('456789', '543216789', '2023-06-07 12:00:00'),
    ('987654', '543216789', '2023-07-05 12:00:00'),
    ('456456', '543216789', '2023-08-02 12:00:00'),
    ('654654', '222333444', '2023-09-04 12:00:00'),
    ('789789', '222333444', '2023-10-01 12:00:00'),
    ('789123', '987654321', '2024-01-15 10:00:00'),
    ('456321', '987654321', '2023-02-20 11:30:00'),
    ('654987', '543216789', '2023-03-25 09:00:00'),
    ('321654', '543216789', '2023-04-30 13:45:00'),
    ('789456', '222333444', '2023-05-05 14:20:00'),
    ('123789', '987654321', '2024-06-10 15:00:00'),
    ('987321', '543216789', '2024-07-15 16:30:00'),
    ('654321', '222333444', '2023-08-20 17:15:00'),
    ('321789', '987654321', '2024-09-25 18:40:00'),
    ('987456', '543216789', '2023-10-30 08:55:00');
    
-- Historial decretos
INSERT INTO historial_decretos (fkp_historial_decretos, fk_proceso, demandante, demandado, provincia, fk_origen, fk_ciudad)
VALUES
    ('123123', 'EJECUTIVO PARA LA EFECTIVIDAD DE LA GARANTÍA REAL', 'Nutresa S.A.S.', 'Miguel Angel Bonilla Pelaez', '123132', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('321321', 'EJECUTIVO DE MÍNIMA CUANTÍA', 'Anguie Catalina Romero Pinton', 'Nestle S.A.S', '78965411', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),

    ('456789', 'EJECUTIVO DE MÍNIMA CUANTÍA', 'Laura Gómez Pérez', 'Tech Innovators Inc.', '7984654','Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('987654', 'EJECUTIVO DE MÍNIMA CUANTÍA', 'Antonio Rivera Martínez', 'Green Earth Solutions', '7465789', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('456456', 'EJECUTIVO PARA LA EFECTIVIDAD DE LA GARANTÍA REAL', 'María Fernanda López Sánchez', 'Global Finance Corp.', '3484128', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('654654', 'EJECUTIVO PARA LA EFECTIVIDAD DE LA GARANTÍA REAL', 'Javier Hernández Torres', 'Stellar Marketing Group', '5648518', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('789789', 'EJECUTIVO PARA LA EFECTIVIDAD DE LA GARANTÍA REAL', 'Carmen Castillo García', 'Horizon Health Services', '987456168', 'Juzgado Ochenta y Tres (83) Civil Municipal de Bogotá D.C.  Transitorio Sesenta y Cinco (65) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('789123', 'EJECUTIVO PARA LA EFECTIVIDAD DE LA GARANTÍA REAL', 'Empresa A', 'Pedro Pérez', '124578', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('456321', 'EJECUTIVO DE MÍNIMA CUANTÍA', 'Empresa B', 'Juan Gómez', '785421', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('654987', 'EJECUTIVO DE MÍNIMA CUANTÍA', 'Empresa C', 'Laura Mendoza', '457896', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('321654', 'EJECUTIVO DE MÍNIMA CUANTÍA', 'Empresa D', 'Carlos Ramírez', '124578', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('789456', 'EJECUTIVO PARA LA EFECTIVIDAD DE LA GARANTÍA REAL', 'Empresa E', 'Ana Torres', '785421', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('123789', 'EJECUTIVO PARA LA EFECTIVIDAD DE LA GARANTÍA REAL', 'Empresa F', 'Luis Martínez', '457896', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('987321', 'EJECUTIVO DE MÍNIMA CUANTÍA', 'Empresa G', 'Elena García', '124578', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('654321', 'EJECUTIVO PARA LA EFECTIVIDAD DE LA GARANTÍA REAL', 'Empresa H', 'Marta Sánchez', '785421', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('321789', 'EJECUTIVO PARA LA EFECTIVIDAD DE LA GARANTÍA REAL', 'Empresa I', 'Carlos López', '457896', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C'),
    ('987456', 'EJECUTIVO DE MÍNIMA CUANTÍA', 'Empresa J', 'Patricia Fernández', '124578', 'Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 'Bogotá D.C');

-- Datos decreto
INSERT INTO datos_decretos (fkp_id_datos_decreto, fk_embargo, datos_decretos)
VALUES
    ('123123', 'Automovil', JSON_OBJECT('Demandado', 'Juan perez', 'Marca', 'Mazda', 'Placas', 'ABC-123')),
    ('321321', 'Salario', JSON_OBJECT('Porciento', '40','Demandado', 'Pepito Pelaez', 'Empresa', 'Panasonic S.A.S.', 'Valor', '1.000.000')),

    ('456789', 'Banco', JSON_OBJECT('Demandado', 'Laura Gómez Pérez', 'Valor', '50.000.000')),
    ('987654', 'Establecimiento', JSON_OBJECT('Comercion', 'Asadero de la 22', 'NumeroMatricula', '101010 Ubicado en Cualquier Ligar')),
    ('456456', 'Motocicleta', JSON_OBJECT('Placas', 'AAA-555', 'Marca', 'AKT', 'Demandado', 'María Fernanda López Sánchez')),
    ('654654', 'Inmueble', JSON_OBJECT('Demandado', 'Javier Hernández Torresv', 'Inmueble', '080-45687 de la O.R.I.P. de Bogotà D.C.')),
    ('789789', 'Salario', JSON_OBJECT('Porciento', '30','Demandado', 'Carmen Castillo García', 'Empresa', 'Panasonic S.A.S.', 'Valor', '1.000.000')),
    ('789123', 'Automovil', JSON_OBJECT('Demandado', 'Pedro Pérez', 'Marca', 'Toyota', 'Placas', 'XYZ-987')),
    ('456321', 'Salario', JSON_OBJECT('Porciento', '50', 'Demandado', 'Juan Gómez', 'Empresa', 'Samsung S.A.S.', 'Valor', '2.000.000')),
    ('654987', 'Banco', JSON_OBJECT('Demandado', 'Laura Mendoza', 'Valor', '30.000.000')),
    ('321654', 'Establecimiento', JSON_OBJECT('Comercio', 'Café de la Esquina', 'NumeroMatricula', '202020 Ubicado en Algún Lugar')),
    ('789456', 'Motocicleta', JSON_OBJECT('Placas', 'BBB-777', 'Marca', 'Honda', 'Demandado', 'Ana Torres')),
    ('123789', 'Inmueble', JSON_OBJECT('Demandado', 'Luis Martínez', 'Inmueble', '090-12345 de la O.R.I.P. de Bogotá D.C.')),
    ('987321', 'Salario', JSON_OBJECT('Porciento', '25', 'Demandado', 'Elena García', 'Empresa', 'Sony S.A.S.', 'Valor', '3.000.000')),
    ('654321', 'Automovil', JSON_OBJECT('Demandado', 'Marta Sánchez', 'Marca', 'Hyundai', 'Placas', 'ZZZ-555')),
    ('321789', 'Banco', JSON_OBJECT('Demandado', 'Carlos López', 'Valor', '10.000.000')),
    ('987456', 'Establecimiento', JSON_OBJECT('Comercio', 'Panadería del Centro', 'NumeroMatricula', '303030 Ubicado en Otro Lugar'));