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
    


