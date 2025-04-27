# Backend Proyecto Desarrollo Web

Backend desarrollado en Node.js y Express usando Sequelize y PostgreSQL para la gestión de usuarios, proyectos y roles.


## Tecnologías utilizadas

<div>
  <img  alt="node" src ="https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white"/>
  <img  alt="express" src ="https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB"/>
  <img  alt="Sequalize" src ="https://img.shields.io/badge/Sequelize-52B0E7?logo=sequelize&logoColor=fff"/>
  <img  alt="PostgreSQL" src ="https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white"/>
</div>


## Instalación rápida

1. Clonar el repositorio o descargar el proyecto.

```bash
git clone https://github.com/tu_usuario/admin-access-project-backend.git


2. Instalar Dependecias

```bash
npm install


3. Debes Crear un archivo .env e ingresar las credenciales de tu base de datos y token

PORT=3000
DB_NAME=bd_proyecto
DB_USER=usuario
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=token

4. Correr proyecto

```bash
npm run dev


5. Endpoints del Backend

## Autenticación

- POST `/api/auth/login`
  - Descripción: Iniciar sesión y obtener un token
  - Protección: No requiere token

## Gestión de Usuarios

- POST `/api/user/create`
  - Descripción: Crear un nuevo usuario
  - Protección: No requiere token

- PUT `/api/user/update/:id`
  - Descripción: Actualizar un usuario
  - Protección: Requiere token JWT y rol ADMIN

- GET `/api/user/`
  - Descripción: Obtener todos los usuarios asociados a un administrador
  - Protección: Requiere token JWT y rol ADMIN

- DELETE `/api/user/delete/:id`
  - Descripción: Eliminar un usuario
  - Protección: Requiere token JWT y rol ADMIN

- GET `/api/user/rol/:id`
  - Descripción: Obtener todos los usuarios de un rol específico
  - Protección: Requiere token JWT y rol ADMIN

## Gestión de Proyectos

- POST `/api/project/create`
  - Descripción: Crear un nuevo proyecto
  - Protección: Requiere token JWT y rol ADMIN

- GET `/api/project/projects`
  - Descripción: Obtener todos los proyectos
  - Protección: Requiere token JWT y rol ADMIN

- GET `/api/project/:id`
  - Descripción: Obtener un proyecto por su ID
  - Protección: Requiere token JWT y rol ADMIN

- PUT `/api/project/update/:id`
  - Descripción: Actualizar un proyecto
  - Protección: Requiere token JWT y rol ADMIN

- DELETE `/api/project/delete/:id`
  - Descripción: Eliminar un proyecto
  - Protección: Requiere token JWT y rol ADMIN

- POST `/api/project/associate`
  - Descripción: Asignar usuarios a un proyecto
  - Protección: Requiere token JWT y rol ADMIN

- DELETE `/api/project/disassociate`
  - Descripción: Remover un usuario de un proyecto
  - Protección: Requiere token JWT y rol ADMIN


