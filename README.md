# Rolling Store 🛒🎸

## 📖 Descripción del Proyecto

* **Nombre del Proyecto**: **Rolling Store**
* **Proposito Principal**: **Rolling Store** es una plataforma de e-commerce diseñada para la venta de CDs y vinilos, ofreciendo una experiencia de compra fluida y segura.
* **Tecnologias de Frontend**:
    * **Handlebars.js**: Como motor de plantillas para renderizar las vistas dinámicas directamente desde el backend.
* **Tecnologias de Backend**:
    * **Node.js** y **JavaScript**: Plataforma y lenguaje principal.
    * **Express.js**: Framework para el desarrollo de la API y el manejo de rutas.
    * **Dependencias Clave**: `bcrypt`, `commander`, `cookie-parser`, `dotenv`, `express`, `express-handlebars`, `express-rate-limit`, `express-session`, `jsonwebtoken`, `mercadopago`, `mongoose`, `nodemailer`, `passport`, `passport-jwt`, `passport-local`, `socket.io`, `faker`, `morgan`.
* **Contexto del Proyecto**: Este proyecto fue desarrollado como parte de un **portafolio personal**.

---

## 🏗️ Estructura del Proyecto

* **Separación Frontend/Backend**: El proyecto integra tanto el frontend como el backend en una unica codebase. Esto se debe a que el frontend utiliza **Handlebars.js** como motor de plantillas, lo que permite renderizar las vistas directamente desde el servidor Node.js.
* **Arquitectura del Backend**: La arquitectura del backend sigue un patron **MVC (Modelo-Vista-Controlador)**, incorporando además los siguientes patrones de diseño:
    * **DAO (Data Access Object)**: Se utiliza para abstraer la capa de persistencia de datos. Actualmente, la implementación DAO esta activa para **MongoDB**, con estructuras base creadas para futuras integraciones con `fs` (File System) y `memory`.
    * **Factory**: Para la creacion de instancias de objetos.
    * **DTO (Data Transfer Object)**: Para estandarizar la transferencia de datos entre capas.
    * **Repository**: Para gestionar colecciones de objetos de dominio.
    * **Protocolo SMTP**: Integrado para el manejo de envio de correos electrónicos.
* **Base de Datos**: Se utiliza **MongoDB** como base de datos.
    
---

## 🛠 Tecnologías Utilizadas

Este proyecto esta construido sobre una pila tecnologica robusta y moderna, optimizada para el desarrollo de aplicaciones web con Node.js:

* **Backend**: Desarrollado con **Node.js** y **Express.js**, proporcionando una API RESTful solida y eficiente.
* **Base de Datos**: Utiliza **MongoDB** como base de datos NoSQL, gestionada a traves de **Mongoose** para la modelacion de datos.
* **Frontend (Vistas)**: Las vistas dinámicas son renderizadas desde el servidor usando **Handlebars.js**.
* **Autenticacion y Autorizacion**: Implementada con **Passport.js**, utilizando estrategias **local** (para login con usuario/contraseña) y **JWT (JSON Web Tokens)** para sesiones seguras y sin estado.
* **Comunicacion en Tiempo Real**: **Socket.IO** permite la comunicación bidireccional en tiempo real entre el servidor y el cliente.
* **Correo Electrónico**: **Nodemailer** se encarga del envío de correos, esencial para funcionalidades como la verificacion de cuentas.
* **Gestion de Sesiones**: Las sesiones de usuario se manejan con **Express-session** y **Cookies**, asegurando una persistencia de estado segura.
* **Pagos**: Integración con **MercadoPago** (actualmente comentada por motivos de seguridad en desarrollo).
* **Utilidades de Desarrollo**:
    * **Faker.js**: Para la generación de datos de prueba.
    * **Morgan**: Middleware para el registro de logs HTTP, útil para el monitoreo y depuración.
    * **Bcrypt**: Utilizado para el hashing seguro de contraseñas.
    * **Express-rate-limit**: Implementado para proteger endpoints clave contra ataques de fuerza bruta.

---

## ⚙️ Instalacion

Para poner el proyecto en marcha, sigue estos pasos:

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```
2.  **Configurar Variables de Entorno**:
    * Crea tres archivos en la raiz de tu proyecto: `.env.dev`, `.env.prod`, y `.env.test`.
    * Dentro de cada uno, pega la siguiente estructura de variables y rellena los valores correspondientes a cada entorno:
        ```ini
        NODE_ENV =
        SERVER_PORT = 
        MONGO_URL =
        COOKIE_KEY = 
        SESSION_KEY = 
        SECRET =
        PERSISTENCE =
        GOOGLE_PASS = 
        GOOGLE_EMAIL = 
        MP_ACCESS_TOKEN = 
        MP_WEBHOOK_SECRET = 
        FRONT_URL = 
        BACK_URL = 
        ```
    * *(Nota: El proyecto utiliza un helper `setArgs` para gestionar argumentos de línea de comandos, lo que permite seleccionar el modo de entorno (`prod`, `dev`, `test`). Por defecto, `npm start` asume el modo `prod`.)*
3.  **Ejecucion del Proyecto**:
    * **Modo Produccion**:
        ```bash
        npm start
        ```
        (Este comando ejecuta `node ./app.js`)
    * **Modo Desarrollo**:
        ```bash
        npm run dev
        ```
        (Este comando ejecuta `node --watch ./app.js --mode dev`, aprovechando la funcionalidad `--watch` de Node.js para recarga automática sin `nodemon`.)
    * **Modo Test**:
        ```bash
        npm run test
        ```
        (Este comando ejecuta `node ./app.js --mode test`)

--- 

## 📄 Variables de Entorno

El proyecto utiliza **variables de entorno** para manejar configuraciones que varian entre entornos (desarrollo, testing, produccion) y para proteger informacion sensible.
Las siguientes variables de entorno deben definirse en los archivos `.env` correspondientes (`.env.dev`, `.env.prod`, `.env.test`):

* **`NODE_ENV`**: Define el entorno de ejecución (`development`, `production`, `test`). Influye en configuraciones como las cookies.
* **`SERVER_PORT`**: Puerto en el que se ejecutara el servidor.
* **`MONGO_URL`**: Cadena de conexion a la base de datos MongoDB.
* **`COOKIE_KEY`**: Clave secreta para firmar las cookies.
* **`SESSION_KEY`**: Clave secreta para la sesión de `express-session` (aunque la sesion no se utilice activamente, esta configurada).
* **`SECRET`**: Clave secreta utilizada para firmar los JSON Web Tokens (JWT).
* **`PERSISTENCE`**: Tipo de persistencia de datos a usar (e.g., `mongo`).
* **`GOOGLE_PASS`**: Contraseña de aplicación de Google para el envío de correos electronicos (requerido para `nodemailer`).
* **`GOOGLE_EMAIL`**: Direccion de correo electronico de Google utilizada para enviar emails (asociada a `GOOGLE_PASS`).
* **`MP_ACCESS_TOKEN`**: Token de acceso para la integración con MercadoPago Checkout Pro.
* **`MP_WEBHOOK_SECRET`**: Secreto del webhook de MercadoPago para verificar la autenticidad de las notificaciones.
* **`FRONT_URL`**: URL base del frontend, utilizada en la integración con MercadoPago.
* **`BACK_URL`**: URL base del backend, utilizada para callbacks de servicios externos como MercadoPago.


--- 

## 🚀 Caracteristicas del Proyecto

Este proyecto está diseñado con las siguientes características clave:

* **Autenticacion Robusta**: Implementa autenticacion de usuarios utilizando **Passport.js** con estrategias **JWT (JSON Web Tokens)** para APIs seguras y **local** para logins tradicionales.
* **Control de Acceso Basado en Roles (RBAC)**: Gestión de permisos y acceso a funcionalidades según el rol del usuario (por ejemplo, `admin`, `user`).
* **Políticas de Acceso**: Implementación de políticas de acceso para definir con precisión qué acciones puede realizar cada rol en diferentes recursos.
* **Gestion de Sesiones**: Manejo seguro de sesiones a traves de **cookies HTTP-only** y la libreria **`express-session`**.
* **Seguridad Mejorada**: Proteccion contra ataques de fuerza bruta y "credential stuffing" mediante **rate limiting**, y almacenamiento seguro de contraseñas con **hashing (bcrypt)**.
* **Registro y Verificacion de Usuarios**: Proceso de registro que incluye **verificacion de cuenta por correo electronico** utilizando **SMTP**, asegurando la validez de las direcciones de email.
* **Ruteo Avanzado**: Organización de las rutas de la aplicación mediante una implementación de **`CustomRouter`**, facilitando una estructura limpia y escalable.
* **Control de Acceso Basado en Roles (RBAC)**: Gestión de permisos y acceso a funcionalidades según el rol del usuario (por ejemplo, `admin`, `user`).
* **Mocking de Datos**: Generación de datos de prueba con la librería **Faker** para desarrollo y testing eficiente.
* **Integracion con MercadoPago Checkout Pro**: Funcionalidad de pago integrada (actualmente comentada por motivos de seguridad), preparada para transacciones en línea.
* **Arquitectura Modular y Escalable**: Diseño del proyecto pensando en la facilidad de mantenimiento y la capacidad de crecimiento futuro.

--- 

## 🔌 Integraciones

El proyecto integra los siguientes servicios externos:

* **MercadoPago Checkout Pro**: Se ha implementado la integracion con la pasarela de pagos MercadoPago Checkout Pro. Sin embargo, por **medidas de seguridad**, la funcionalidad principal de pago se encuentra actualmente **comentada** en el codigo.
* **Servicio de Mailing (SMTP)**: Se utiliza un servicio SMTP (configurado con credenciales de Google) para el **envio de correos electronicos**, fundamental para el proceso de verificacion de cuenta de usuario tras el registro.

---

## 📦 Dependencias

Este proyecto utiliza las siguientes dependencias clave para su funcionamiento:

* **`bcrypt`**: Para el hashing seguro de contraseñas.
* **`commander`**: Para construir interfaces de linea de comandos robustas (CLI).
* **`cookie-parser`**: Middleware para parsear cookies en las solicitudes HTTP.
* **`dotenv`**: Para cargar variables de entorno desde un archivo `.env`.
* **`express`**: El framework de Node.js para construir aplicaciones web y APIs.
* **`express-handlebars`**: Motor de plantillas para renderizar vistas dinamicas.
* **`express-rate-limit`**: Middleware para limitar la tasa de solicitudes y proteger contra ataques de fuerza bruta.
* **`express-session`**: Middleware para la gestion de sesiones de usuario.
* **`jsonwebtoken`**: Para implementar autenticación basada en JSON Web Tokens (JWT).
* **`mercadopago`**: SDK oficial para la integracion con la plataforma de pagos Mercado Pago.
* **`mongoose`**: Un modelado de objetos de MongoDB diseñado para trabajar en un entorno asincrono.
* **`nodemailer`**: Modulo para el envio de correos electronicos desde Node.js (utilizado para verificacion de cuenta).
* **`passport`**: Middleware de autenticacion para Node.js, flexible y modular.
* **`passport-jwt`**: Estrategia de Passport para autenticación con JWT.
* **`passport-local`**: Estrategia de Passport para autenticacion con nombres de usuario y contraseñas.
* **`socket.io`**: Para habilitar la comunicacion bidireccional en tiempo real basada en eventos.
* **`faker`**: Para generar datos falsos de alta calidad, útil en desarrollo y pruebas.
* **`morgan`**: Middleware de registro de solicitudes HTTP para Node.js, ideal para debugging y logging de actividad.

--- 

## 🔐 Consideraciones de Seguridad

El proyecto ha sido desarrollado teniendo en cuenta las siguientes consideraciones clave de seguridad:

* **Hashing de Contraseñas**: Las contraseñas de los usuarios son encriptadas utilizando la libreria **Bcrypt** antes de ser almacenadas en la base de datos, garantizando que nunca se guarden en texto plano.
* **Verificacion de Email**: Se implementa un proceso de **verificacion de cuenta por email** tras el registro, enviando codigos unicos a traves de **SMTP de Google**. Esto valida la propiedad de la direccion de correo electrónico del usuario.
* **Rate Limiting**: El proyecto incluye **rate limiting** en endpoints críticos (como login y registro) para mitigar ataques de fuerza bruta y denegacion de servicio.
* **Manejo de Sesiones Seguras**: Las sesiones estan protegidas con **cookies HTTP-only** y configuraciones seguras para prevenir ataques basados en inyeccion de scripts.
* **Variables de Entorno**: El uso estricto de variables de entorno garantiza que la información sensible (claves secretas, credenciales) no se exponga en el codigo fuente.
* **Recomendacion de HTTPS**: Para un entorno de producción, se recomienda encarecidamente el uso de **HTTPS** para cifrar toda la comunicación.

---

## 🚀 Deploy

El proyecto está desplegado en Render:  
🔗 [https://rolling-store.onrender.com/](https://rolling-store.onrender.com/)

> ⚠️ Al estar en un plan gratuito, el servidor puede tardar unos segundos en activarse si estuvo inactivo.

---

## 👤 Autor y Créditos

### 10. Créditos y Autoría

* **Autor**: Gerónimo Tortosa
* **GitHub**: [Gero0202](https://github.com/Gero0202)
* **Diseño**: El diseño y la implementación de este proyecto son 100% originales del autor.
* **Colaboración**: Este proyecto ha sido desarrollado de manera individual, sin colaboradores externos.