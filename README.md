# Aplicación Full-Stack de Gestión de Tareas (NestJS + React)

## Descripción

Este proyecto es una aplicación **Full-Stack** para la gestión de tareas.  
Permite a los usuarios registrarse, iniciar sesión y realizar un **CRUD de tareas** de manera segura usando **JWT**.  
Se desarrolló siguiendo las mejores prácticas de arquitectura, con persistencia en **PostgreSQL** y una interfaz **responsiva y atractiva** usando **React + Tailwind**.

**Funcionalidades principales:**
- Registro y login de usuarios con autenticación JWT.
- Crear, listar, actualizar y eliminar tareas propias.
- Marcar tareas como completadas.
- Protección de rutas privadas en frontend.
- Manejo de errores y validaciones con `class-validator`.

**Estructura del Proyecto**

**Backend (NestJS)**
backend/
├─ src/
│ ├─ auth/ # Autenticación JWT
│ ├─ tasks/ # CRUD de tareas
│ ├─ users/ # Gestión de usuarios
│ ├─ main.ts
│ └─ app.module.ts
├─ migrations/ # Migraciones de TypeORM
├─ .env.example # Variables de entorno
└─ package.json

## Frontend (React + Tailwind)
frontend/
├─ src/
│ ├─ pages/ # Login, Register, Tasks
│ ├─ components/ # ProtectedRoute
│ ├─ context/ # AuthContext
│ └─ api/axios.js # Configuración axios
├─ index.css
└─ package.json

## Tecnologías Utilizadas

**Backend:**
- NestJS
- TypeORM + PostgreSQL
- JWT para autenticación
- bcrypt para hash de contraseñas
- class-validator / class-transformer
- Passport.js

**Frontend:**
- React
- React Router v6
- Axios
- Tailwind CSS

## Repositorios

Backend: [https://github.com/mendoza2004victor/Backend-parcial2.git]
Frontend: [https://github.com/mendoza2004victor/Frontend-parcial2.git]

## Autor

Nombre: Victor Eduardo Mendoza Velásquez
Carné: [0904-22-11336]
Proyecto realizado como práctica de desarrollo Full-Stack con NestJS + React

## Instalación y ejecución local

1. Clona el repositorio:

```bash
git clone https://github.com/TU_USUARIO/nombre-del-repositorio.git
cd nombre-del-repositorio