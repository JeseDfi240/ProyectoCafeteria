# Documentación del Sistema – Cafetería Ibarra App

## Información del Producto
* **Nombre del Producto:**  Antique Cafe
* **Descripción:** Aplicación móvil y plataforma web para la gestión de pedidos a domicilio, catálogo digital, carrito de compras, autenticación de usuarios con contraseñas encriptadas e inventario para Cafetería Ibarra.

## Integrantes del Equipo
* Acosta Elizalde Ian Jese
* Castro Salazar Jesús Alejandro
* Félix Avilés Jonathan Josué
* Félix Colores Marco Antonio
* Quintero Román Miguel Ángel
* Rocha Ibarra Ángel David

---

## 1. Introducción

### Descripción general
Cafetería Ibarra App es una solución tecnológica diseñada para modernizar el proceso de venta y atención al cliente. El sistema permite consultar el menú en tiempo real, realizar pedidos a domicilio, administrar métodos de pago, gestionar favoritos y consultar historiales de compra a través de una arquitectura cliente-servidor.

### Audiencia
* Clientes de Cafetería Ibarra
* Administradores del negocio
* Empleados encargados de ventas e inventario
* Equipo de desarrollo y mantenimiento

### Alcance
El sistema cubre el registro de usuarios, autenticación segura, catálogo de productos, carrito de compras, gestión de pedidos, métodos de pago, control de inventario, historial de compras y reportes administrativos.

---

## 2. Resumen del Sistema

### Objetivo General
Desarrollar e implementar un sistema integral para optimizar los pedidos a domicilio, mejorar la experiencia del usuario e incrementar la competitividad de Cafetería Ibarra.

### Arquitectura de Comunicación
El frontend no interactúa directamente con la base de datos relacional. El servidor intermedio en Node.js recibe las peticiones HTTP desde la aplicación cliente mediante la API Fetch, procesa la lógica de negocio y realiza las consultas SQL en PostgreSQL.

### Funcionalidades Principales
* Catálogo dinámico de productos y búsqueda avanzada.
* Registro e inicio de sesión seguro con contraseñas encriptadas.
* Carrito de compras y gestión de pedidos.
* Gestión de favoritos e historial de compras.
* Soporte para múltiples métodos de pago (tarjeta y efectivo).
* Módulos administrativos: gestión de inventario, clientes, empleados y generación de estadísticas.

---

## 3. Requisitos del Sistema

### Requisitos de Software
* Node.js (versión 18 o superior).
* PostgreSQL como motor de base de datos relacional.

### Requisitos Funcionales
* Registro de usuarios y autenticación basada en Hash.
* Consulta de menú e inventario en tiempo real.
* Agregar, editar y eliminar productos del carrito.
* Gestión de pedidos a domicilio.
* Control de roles (Clientes, Empleados, Administradores).
* Generación de reportes de ventas y rendimiento.

### Requisitos No Funcionales
* Interfaz intuitiva y de alto rendimiento.
* Disponibilidad continua del servicio.
* Seguridad de datos mediante encriptación.
* Escalabilidad de la infraestructura de backend.

---

## 4. Módulos y Arquitectura del Sistema

### Módulos Funcionales
* **Gestión de Clientes:** Registro, historial, promociones y recompensas.
* **Gestión de Empleados:** Control de productividad, horarios y desempeño.
* **Gestión de Productos e Inventario:** Alta, baja, actualización y control de existencias.
* **Gestión de Ventas:** Registro de transacciones, descuentos y generación de comprobantes.
* **Gestión de Reportes:** Análisis de ventas, inventario y comportamiento de clientes.

### Estructura de la Base de Datos
Entidades principales del modelo relacional en la base de datos `antique_cafe`:
* Usuarios (id, nombre, correo, password encriptada, creado_en)
* Clientes y Empleados
* Productos e Inventario
* Pedidos y Pedido_Items
* Métodos de Pago
* Reportes

---

## 5. Casos de Uso y Seguridad

### Casos de Uso Principales
* Cliente realiza pedido y gestiona favoritos.
* Cliente consulta historial de compras.
* Administrador controla productos e inventario.
* Empleado registra ventas en punto de acceso.
* Administrador genera reportes de rendimiento.

### Políticas de Seguridad
* **Autenticación:** Las contraseñas se almacenan de forma segura en la base de datos utilizando algoritmos de encriptación hash (Bcrypt).
* **Control de Acceso:** Restricción de rutas de la API y funciones de la interfaz basadas en roles de usuario.
* **Protección de Datos:** Almacenamiento seguro de credenciales y métodos de pago.

---

## 6. Instrucciones de Instalación y Despliegue

### 1. Inicialización de la Base de Datos
Desde la consola interactiva de PostgreSQL (psql), ejecute el siguiente comando para crear la base de datos:

```sql
CREATE DATABASE antique_cafe;
