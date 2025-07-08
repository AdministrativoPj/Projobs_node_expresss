
# Nuevo Proyecto Node

Proyecto backend en Node.js que implementa autenticación con Passport (Facebook) y manejo de sesiones. Utiliza Express y Sequelize con base de datos SQLite. También incluye EJS como motor de plantillas.

---

## Tecnologías y Dependencias

### Dependencias principales (`dependencies`)
- **bcrypt** (^5.1.1): Para encriptación de contraseñas.
- **dotenv** (^16.5.0): Carga de variables de entorno desde `.env`.
- **ejs** (^3.1.9): Motor de plantillas para vistas dinámicas.
- **express** (^4.18.2): Framework web principal.
- **express-session** (^1.17.3): Manejo de sesiones.
- **nodemailer** (^7.0.3): Envío de correos electrónicos.
- **passport** (^0.7.0): Middleware para autenticación.
- **passport-facebook** (^3.0.0): Estrategia de autenticación con Facebook.
- **sequelize** (^6.32.1): ORM para bases de datos.
- **sqlite3** (^5.1.6): Base de datos local en archivo.

### Dependencias de desarrollo (`devDependencies`)
- **nodemon** (^3.0.1): Reinicio automático del servidor en desarrollo.

---

## Instalación

1. Clona el repositorio o descomprime el `.zip`.
2. Instala dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
FACEBOOK_APP_ID=TU_APP_ID
FACEBOOK_APP_SECRET=TU_APP_SECRET
FACEBOOK_CALLBACK_URL=http://localhost:3000/auth/facebook/callback
SESSION_SECRET=un_secreto_seguro
```

4. Ejecuta el servidor en modo desarrollo:

```bash
npm run dev
```

---

## Estructura Principal

```
src/
├── controllers/
│   └── authController.js  # Lógica de autenticación
├── models/
│   └── index.js           # Configuración de Sequelize
├── views/
│   └── *.ejs              # Plantillas EJS
└── index.js               # Punto de entrada del servidor
```

---

## Autenticación

Utiliza Passport con la estrategia de Facebook. Al acceder a `/auth/facebook`, redirige al login de Facebook y retorna a `/auth/facebook/callback`.

---

## Base de Datos

- Se utiliza **SQLite** (archivo local `database.sqlite`).
- Puedes adaptar el código para usar PostgreSQL, MySQL, etc., modificando la configuración de Sequelize en `src/models/index.js`.

---

## Licencia

ISC

## Autor

*Ruben Esteban Jimenez Taborda*
 
 ## Credenciales de inisio de secion

 ### user:node1@gmail.
 ### pass:12345678q