# Backend — Antique Cafe (PostgreSQL)

Este servidor maneja **dos cosas** sobre la misma base de datos `antique_cafe`:
1. Los **pedidos** del carrito de compras.
2. El **inicio de sesión y registro** de usuarios (con contraseñas encriptadas).

## Por qué necesitas esto

Una página HTML abierta en el navegador no puede hablar directo con PostgreSQL.
Por eso existe este servidor intermedio: el navegador le manda los datos por
internet (`fetch`) y el servidor los guarda en la base de datos.

```
  Navegador  ──fetch──>  server.js (Node)  ──SQL──>  PostgreSQL
```

## Requisitos

1. Node.js (https://nodejs.org) — versión 18 o superior.
2. PostgreSQL (https://www.postgresql.org/download/).

## Pasos de instalación

### 1. Crear la base de datos
En "SQL Shell (psql)":

```sql
CREATE DATABASE antique_cafe;
```

### 2. Cargar las tablas (incluye usuarios, pedidos y pedido_items)
Desde la carpeta backend, en una terminal:

```bash
psql -U postgres -d antique_cafe -f schema.sql
```

### 3. Configurar la conexión
Abre `server.js` y cambia la contraseña en el bloque `new Pool({...})` por la
tuya de PostgreSQL. Por defecto usa usuario `postgres` y base `antique_cafe`.

### 4. Instalar dependencias y arrancar
Dentro de la carpeta backend:

```bash
npm install
npm start
```

```
 Conectado a PostgreSQL
 Servidor escuchando en http://localhost:3000
```

> Nota: `npm install` compila el paquete `bcrypt` (usado para encriptar
> contraseñas). Necesita tener instaladas las herramientas de compilación de
> tu sistema. En Windows normalmente funciona directo; si diera error, instala
> "Visual Studio Build Tools" o cambia `bcrypt` por `bcryptjs` en package.json
> y en server.js (bcryptjs no requiere compilación).

### 5. Usar el sitio
- Carrito: abre `Antique Cafe.html`, agrega productos y pulsa "Realizar pedido".
- Login: pulsa "Iniciar sesión" en la barra de navegación, o abre
  `iniciar-sesion.html`. Puedes registrarte y luego iniciar sesión.

Para ver los datos guardados en PostgreSQL:
```sql
SELECT id, nombre, correo, creado_en FROM usuarios;
SELECT * FROM vista_pedidos;
```
(La columna password se ve como un hash largo: así debe ser, está encriptada.)

## Rutas de la API

| Método | Ruta              | Para qué sirve                  |
|--------|-------------------|---------------------------------|
| POST   | /api/registro     | Crear una cuenta nueva          |
| POST   | /api/login        | Iniciar sesión                  |
| POST   | /api/pedidos      | Registrar un pedido             |
| GET    | /api/pedidos      | Listar todos los pedidos        |
| GET    | /api/pedidos/:id  | Ver el detalle de un pedido     |

## Nota sobre el puerto
El frontend apunta a `http://localhost:3000`. Si cambias el puerto del servidor,
actualiza la constante `API_URL` al inicio de `carrito.js` y de `iniciar-sesion.html`.

---
El inicio de sesión se basó en el proyecto de
https://github.com/JeseDfi240/ProyectoCafeteria adaptado a la base de datos y
el estilo de Antique Cafe.
