# Proyecto de Gestión de votos

Este es un proyecto para gestionar campañas electorales. Permite a los usuarios autenticados crear, listar y gestionar campañas, así como postularse como candidatos a una campaña específica.

## Características

- **Registro de usuarios y autenticación:** Los usuarios pueden registrarse e iniciar sesión.
- **Gestión de campañas:** Los usuarios pueden crear y listar campañas electorales asociadas a su cuenta.
- **Postulación de candidatos:** Los usuarios pueden postularse como candidatos en una campaña especificada, con la opción de adjuntar archivos y agregar propuestas de campaña.
- **Subida de archivos:** Soporte para subir y asociar archivos (como imágenes o documentos) a las postulaciones.

## Tecnologías

Este proyecto está construido utilizando las siguientes tecnologías:

- **Frontend:**
  - [Next.js](https://nextjs.org/): Framework de React para aplicaciones web.
  - [TypeScript](https://www.typescriptlang.org/): Superconjunto de JavaScript que añade tipado estático.
  - [React Hooks](https://reactjs.org/docs/hooks-intro.html): Para la gestión del estado y ciclos de vida en componentes.
  - **CSS**: Para el diseño y estilización de componentes.

- **Backend:**
  - [NestJS](https://nestjs.com/): Framework para Node.js que permite crear aplicaciones backend escalables.
  - [TypeORM](https://typeorm.io/): ORM para manejar las interacciones con bases de datos relacionales.
  - [PostgreSQL](https://www.postgresql.org/): Sistema de gestión de bases de datos relacional.
  - **JWT**: Para la autenticación segura de los usuarios.
  - **Multer**: Middleware para la subida de archivos en el backend.

## Instalación y Configuración

### Requisitos

- [Node.js](https://nodejs.org/) v16 o superior.
- [PostgreSQL](https://www.postgresql.org/) como base de datos.
- [Docker](https://www.docker.com/) (opcional para entornos de desarrollo).

### Pasos para la instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/pi-rym/PM4BE-Sharonesaa.git
## Instalación de Dependencias

2. Instala las dependencias en el frontend y backend:

- **En el directorio del frontend (`/frontend`):**

  ```bash
  cd frontend
  npm install

- **En el directorio del backend (`/backend`):** 
  cd backend
  npm install

## Configuración de Variables de Entorno

3. Configura las variables de entorno para ambos proyectos:

- **Crea un archivo `.env` en el directorio del frontend con el siguiente contenido:**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api

- **Crea un archivo `.env` en el directorio del backend con el siguiente contenido:**

   ```env
  DATABASE_URL=postgres://username:password@localhost:5432/database_name
  JWT_SECRET=tu_secreto_de_jwt

Asegúrate de ajustar las configuraciones para la base de datos y el JWT según sea necesario.

## Acceso a la aplicación

4. Accede a la aplicación en tu navegador:

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend:** [http://localhost:4000](http://localhost:4000)

## Endpoints Principales

### Autenticación
- **POST** `/auth/login`: Iniciar sesión con credenciales de usuario.
- **POST** `/auth/register`: Registrar un nuevo usuario.

### Campañas
- **GET** `/campaigns/user/:userId`: Obtener todas las campañas asociadas a un usuario.
- **POST** `/campaigns`: Crear una nueva campaña.

### Candidatos
- **POST** `/candidates`: Crear un candidato asociado a una campaña.

### Subida de Archivos
- **POST** `/upload`: Subir archivos asociados a una postulación de candidato.

### Votación
- **POST** `/vote`: Votar por un candidato específico en una campaña.
