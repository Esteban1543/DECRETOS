# Proyecto Sistema de Digitación - Juzgados con Docker

Este repositorio contiene un proyecto con el stack de MySQL, Node.js y React configurado para ejecutarse en un contenedor Docker. 
Sigue los pasos a continuación para inicializarlo fácilmente en tu sistema Windows.

## Requisitos Previos

Asegúrate de tener instalados los siguientes componentes en tu sistema:

1. [Docker Desktop](https://www.docker.com/products/docker-desktop) (incluye Docker Compose).
2. Una terminal, como PowerShell o el símbolo del sistema.

## Instrucciones de Uso

### 1. Clonar el Repositorio
Clona este repositorio en tu máquina local:
```bash
git clone https://github.com/Esteban1543/DECRETOS
cd repo

### **2. Inicializa el proyecto**
Ejecuta el comando:
  docker-compose up --build

### **3. Accede al aplicativo**
Da click en el link que aparece en la terminal
➜ Local: http://localhost:4002/

### **4. Finaliza la ejecución**
Ejecuta el comando:
  docker-compose down

### Estructura del proyecto
├── apps/backend          # Código fuente del Backend.
├── apps/frontend         # Código fuente del Frontend.
├── services/database     # Código fuente necesario de la Base de Datos (DDL - DML).
├── docker-compose.yml    # Configuración de servicios para Docker Compose.
└── README.md             # Documentación del proyecto.
