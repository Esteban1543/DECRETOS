CREATE DATABASE IF NOT EXISTS BDC_DECRETOS;
USE BDC_DECRETOS;

----------------------------------------------------------------------------------------------------------------------
-------------                                       DDL                                                  -------------
----------------------------------------------------------------------------------------------------------------------

create table
    tipo_persona (
        id_tipo_persona int auto_increment,
        tipo_persona varchar(20) not null,

        primary key (id_tipo_persona)
    );

create table
    tipo_identificacion (
        tipo_id varchar(8) not null,

        primary key (tipo_id)
    );

create table
    datos_persona (
        fk_tipo_identificacion varchar(8) not null,
        n_identificacion varchar(15) not null unique,
        nombre_1 varchar(45) not null,
        nombre_2 varchar(45),
        apellido_1 varchar(45) not null,
        apellido_2 varchar(45),
        telefono varchar (20) not null,
        correo varchar(70) not null,
        fk_tipo_persona int,
        estado_persona tinyint not null,

        primary key (n_identificacion),
        foreign key (fk_tipo_identificacion) references tipo_identificacion (tipo_id),
        foreign key (fk_tipo_persona) references tipo_persona (id_tipo_persona)
    );

create table
    usuarios (
        pfk_usuario varchar(15) not null,
        alias varchar(15) not null,
        contraseña TEXT (80) not null,
        rol tinyint not null,

        primary key (pfk_usuario),
        foreign key (pfk_usuario) references datos_persona (n_identificacion)
    );

create table
    tipo_embargo (
        tipo varchar(30) not null unique,
        descripcion text,
        ley text,

        primary key (tipo)
    );

create table
    origen (
        origen varchar(255) not null,
        estado tinyint not null,

        primary key (origen)
    );

create table   
    proceso (
        proceso varchar(255) not null,
        estado tinyint not null,

        primary key (proceso) 
    );

create table 
    ciudad (
        ciudad varchar(30) not null,
        estado tinyint not null,

        primary key(ciudad)
    );


create table
    acta_embargo (
        id_acta  varchar(50) not null, -- Radicado
        fk_id_usuario varchar(15) not null,
        fecha_registro datetime, 

        primary key (id_acta),
        foreign key (fk_id_usuario) references usuarios (pfk_usuario)
    );


create table
    historial_decretos (
        fkp_historial_decretos varchar(50) not null, -- Radicado
        fk_proceso varchar(255) not null,
        demandante varchar(50) not null,
        demandado varchar(50) not null,
        provincia varchar(30) not null, 
        fk_origen varchar(255) not null,
        fk_ciudad varchar(30) not null,
        juez varchar(50) not null,

        primary key (fkp_historial_decretos),
        foreign key (fkp_historial_decretos) references acta_embargo(id_acta),
        foreign key (fk_origen) references origen (origen),
        foreign key (fk_proceso) references proceso(proceso),
        foreign key (fk_ciudad) references ciudad (ciudad)
    );


create table
    datos_decretos (
		id_datos_decretos int auto_increment,
        fkp_id_datos_decreto  varchar(50) not null,
        fk_embargo varchar(30) not null,
        datos_decretos JSON not null,

        primary key (id_datos_decretos),
        foreign key (fkp_id_datos_decreto) references acta_embargo(id_acta),
        foreign key (fk_embargo) references tipo_embargo (tipo)
    );

----------------------------------------------------------------------------------------------------------------------
-------------                                       DML                                                  -------------
----------------------------------------------------------------------------------------------------------------------
	-- Tipo Persona
INSERT IGNORE INTO
    tipo_persona (tipo_persona)
VALUES
    ("Administrador"),
    ("Digitador");

-- Tipo identificacion
INSERT IGNORE INTO
    tipo_identificacion (tipo_id)
VALUES
    ("CC"),
    ("CE"),
    ("Otro");

-- Datos Persona
INSERT IGNORE INTO datos_persona (fk_tipo_identificacion, n_identificacion, nombre_1, nombre_2, apellido_1, apellido_2, telefono, correo, fk_tipo_persona, estado_persona) 
VALUES
    -- Tipo persona administrador
    ('CC', '444555666', 'Edwin', null, 'Marín', null, '3114445660', 'edwin.marin@example.com', 1, 1),
    
    -- Tipo persona Digitador
    ('Otro', '987654321', 'María', null, 'Gómez', null, '319876210','maria.gomez@example.com', 2, 1),
    ('CE', '111222333', 'Carlos', null, 'López', null, '3111112330', 'carlos.lopez@example.com', 2, 1),
    ('CC', '543216789', 'Sofía', null, 'López', null, '315432890', 'sofia.lopez@example.com', 2, 1),
    ('Otro', '222333444', 'Manuel', null, 'Díaz', null, '3001113330', 'manuel.diaz@example.com', 2, 1);

-- Tipo Embargo
    -- Contienen la ley segun el embargo
INSERT IGNORE INTO tipo_embargo (tipo, descripcion, ley)
VALUES
    ('Establecimiento', 'ª, DECRETAR EL EMBARGO Y RETENCIÓN, del establecimiento de comercio denominado “°”, identificado con Matrícula No. °, que se denuncia de propiedad del ejecutado °. Verificada y acreditada la inscripción de dicha medida, se resolverá lo pertinente sobre su secuestro (Art. 601 CGP).', null), -- Comercio, Matricula, Demandado

    ('Banco', 'ª, DECRETAR EL EMBARGO Y RETENCIÓN, en la cuantía y proporción permitida por la ley, de los saldos bancarios que a cualquier título existan a favor del demandado °, y los depósitos posteriores que se produzcan, hasta completar la suma de ° de pesos.', null), -- Demandado, Valor

    ('Salario', 'ª, DECRETAR EL EMBARGO Y RETENCIÓN, hasta del °% del salario, y prestaciones sociales de los demandados °, de conformidad con lo dispuesto por el artículo 156 y 344 del Código Sustantivo del Trabajo, y que le corresponde en calidad de empleado de °. Se limita la medida en la cantidad de $° de pesos.', null), -- Porciento, Demandado, Empresa

    ('Automovil', 'ª, DECRETAR EL EMBARGO Y RETENCIÓN, del vehículo automotor de placas ° automóvil marca °, que se denuncia de propiedad del demandado °. Verificada y acreditada la inscripción de dicha medida, se resolverá lo pertinente sobre su secuestro (Art. 601 CGP).', null), -- Placas, Marca, Demandado

    ('Motocicleta', 'DECRETAR EL EMBARGO del vehículo automotor de placas ° motocicleta marca °, que se denuncia de propiedad del demandado °. Verificada y acreditada la inscripción de dicha medida, se resolverá lo pertinente sobre su secuestro (Art. 601 CGP)', null), -- Placas, Marca, Demandado

    ('Fondo de PeNsiones', 'ª, DECRETAR EL EMBARGO Y RETENCIÓN hasta del 40% de la pensión del demandado °, como pensionado del °, de conformidad con lo dispuesto por el artículo 134 de la Ley 100 de 1993, y que le corresponde en calidad pensionada. Se limita la medida en la cantidad de ° de pesos.', null), -- Demandado, Fondo de pensiones, Valor

    ('Salario/Penciones', 'ª, OFICIAR al tesorero y/o pagador del °, para que del salario devengado por °, retenga la proporción del dinero antes determinada y constituya certificado de depósito a órdenes del Juzgado, previniéndole que de lo contrario responderá por dichos valores.', null), -- Demandado, Valor

    ('Inmueble', 'DECRETAR EL EMBARGO del derecho de dominio de que sea titular la demandada °, respecto del bien distinguido con el ° Verificada y acreditada la inscripción de dicha medida, se resolverá lo pertinente sobre su secuestro', null); -- Demandado, Inmueble

-- Origen
INSERT IGNORE INTO origen (origen, estado)
VALUES 
    ('Juzgado Ochenta (80) Civil Municipal de Bogotá D.C.  Transitorio Sesenta y Dos (62) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 1),
    ('Juzgado Sexto (6) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 1),
    ('Juzgado Ochenta y Tres (83) Civil Municipal de Bogotá D.C.  Transitorio Sesenta y Cinco (65) de Pequeñas Causas Civiles y Competencia Múltiple de Bogotá D.C.', 1);

-- Proceso
INSERT IGNORE INTO proceso (proceso, estado)
VALUES
    ('EJECUTIVO DE MÍNIMA CUANTÍA', 1),
    ('EJECUTIVO PARA LA EFECTIVIDAD DE LA GARANTÍA REAL', 1);

-- Ciudad
INSERT IGNORE INTO ciudad (ciudad, estado)
VALUES 
    ('Bogotá D.C.', 1),
    ('Tunja', 1);

INSERT IGNORE INTO usuarios (pfk_usuario, alias, contraseña, rol)
VALUES
    ('444555666', 'Admin', '$2b$10$2cRofAbM9Szb62v9FzbA/eZPRhZffVaxSs.j0kCsTkvtEM029GfGi', 1), -- (admin123)
    ('987654321', 'Digitador 1', '$2b$10$tirOiLz9DaVpKch.cisrde9AJCewvtlksRe.Sem5g7pc5ikPrLJNS', 2), -- (digic123)
    ('543216789', 'Digitador 2', '$2b$10$tirOiLz9DaVpKch.cisrde9AJCewvtlksRe.Sem5g7pc5ikPrLJNS', 2), 
    ('222333444', 'Digitador 3', '$2b$10$tirOiLz9DaVpKch.cisrde9AJCewvtlksRe.Sem5g7pc5ikPrLJNS', 2);
