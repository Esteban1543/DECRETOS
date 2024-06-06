create database decretos_db;
use decretos_db;

create table tipo_persona (
	id_tipo_persona int auto_increment,
    tipo_persona varchar(20) not null,
    
    primary key (id_tipo_persona)
);

create table tipo_identificacion (
	tipo_id varchar(8) not null,
	primary key (tipo_id)
);

create table datos_persona (
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
    
    foreign key (fk_tipo_identificacion) references tipo_identificacion(tipo_id),
    foreign key (fk_tipo_persona) references tipo_persona(id_tipo_persona)
);

create table usuarios (
	pfk_usuario int not null,
    alias varchar(15) not null,
	contraseña TEXT(80) NOT NULL,
    rol tinyint not null,
		
    primary key (pfk_usuario),
    foreign key (pfk_usuario) references datos_persona(id_persona)
);

create table ley ( 
	id_ley int not null auto_increment,
    ley mediumtext not null,
    
	PRIMARY KEY (id_ley)
);

create table tipo_embargo (
	id_tipo_embargo int not null auto_increment,
    tipo varchar(30) not null,
    
    primary key (id_tipo_embargo)
);

create table origen (
	id_origen int not null auto_increment,
    origen text not null,
    
    primary key (id_origen)
);

create table productos (
	id_producto int not null auto_increment,
	pfk_demandado int not null,
    fk_id_origen int, 
    radicacion varchar(50) not null,
    fk_id_ley int not null,
    fk_id_embargo int,
    proceso text not null,
    codigo_folio varchar(30),
    
    primary key (id_producto, pfk_demandado),
	foreign key (pfk_demandado) references datos_persona(id_persona),
    foreign key (fk_id_origen) references origen(id_origen),
    foreign key (fk_id_embargo) references tipo_embargo(id_tipo_embargo),
    foreign key (fk_id_ley) references ley(id_ley)
 ); 
 
 create table clientes(
    pfk_cliente int not null,
    pfk_producto int not null,

    foreign key (pfk_cliente) references datos_persona(id_persona),
    foreign key (pfk_producto) references productos(id_producto)
 );
 
 
 
 
 
