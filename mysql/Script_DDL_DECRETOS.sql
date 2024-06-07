create database decretos_db;

use decretos_db;

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
        id_persona int auto_increment,
        fk_tipo_identificacion varchar(4) not null,
        n_identificacion varchar(15) not null unique,
        nombre_1 varchar(45) not null,
        nombre_2 varchar(45),
        apellido_1 varchar(45) not null,
        apellido_2 varchar(45),
        telefono varchar(15) not null,
        direccion varchar(65) not null,
        correo varchar(70) not null,
        fk_tipo_persona int not null,
        estado_persona tinyint not null,

        primary key (id_persona),
        foreign key (fk_tipo_identificacion) references tipo_identificacion (tipo_id),
        foreign key (fk_tipo_persona) references tipo_persona (id_tipo_persona)
    );

create table
    usuarios (
        pfk_usuario int not null,
        alias varchar(15) not null,
        contraseña TEXT (80) not null,
        rol tinyint not null,

        primary key (pfk_usuario),
        foreign key (pfk_usuario) references datos_persona (id_persona)
    );

create table
    ley (
        id_ley int not null auto_increment,
        ley varchar(30) not null,
        descipcion text,


        PRIMARY KEY (id_ley)
    );

create table
    tipo_embargo (
        id_tipo_embargo int not null auto_increment,
        tipo varchar(30) not null,
        descripcion text,

        primary key (id_tipo_embargo)
    );

create table
    origen (
        id_origen int not null auto_increment,
        origen text not null,

        primary key (id_origen)
    );

create table   
    proceso (
        id_proceso int not null auto_increment,
        proceso text not null,

        primary key (id_proceso) 
    );

create table
    historial_decretos (
        id_historial_decretos varchar(50) not null, -- Radicado
        fk_proceso int not null,
        cod_folio varchar(30), 
        fk_origen int not null,

        
        primary key (id_historial_decretos),
        foreign key (fk_origen) references origen (id_origen),
        foreign key (fk_proceso) references proceso(id_proceso)
    );

create table
    acta_embargo (
        fkp_id_acta  varchar(50) not null,
        fk_id_usuario int not null,
        fecha_registro datetime, 

        primary key (fkp_id_acta),
        foreign key (fkp_id_acta) references historial_decretos(id_historial_decretos),
        foreign key (fk_id_usuario) references usuarios (pfk_usuario)
    );

create table
    datos_decretos (
        fkp_id_datos_decreto  varchar(50) not null,
        fk_ley int not null,
        fk_embargo int not null,
        datos_decretos JSON not null,

        primary key (fkp_id_datos_decreto),
        foreign key (fkp_id_datos_decreto) references acta_embargo(fkp_id_acta),
        foreign key (fk_ley) references ley (id_ley),
        foreign key (fk_embargo) references tipo_embargo (id_tipo_embargo)
    );
    


