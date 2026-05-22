# Rendimiento Académico — MEAN Stack

## ¿Qué cambió respecto al proyecto anterior?

| Antes (PHP + MySQL) | Ahora (MEAN Stack) |
|---|---|
| `backend/api/registros.php` | `backend/routes/registros.js` |
| `backend/config/db.php` | `backend/config/db.js` |
| `backend/database.sql` | `backend/models/Registro.js` (Mongoose) |
| MySQL (puerto 3306) | MongoDB (puerto 27017) |
| Apache/XAMPP (puerto 80) | Node.js + Express (puerto 3000) |
| `firestore.service.ts` → localhost/... | `firestore.service.ts` → localhost:3000/... |

---

## Estructura del backend

```
backend/
├── server.js              ← Entrada principal Express
├── package.json           ← Dependencias Node.js
├── .env.example           ← Renombrar a .env y configurar
├── config/
│   └── db.js              ← Conexión a MongoDB
├── models/
│   └── Registro.js        ← Esquema Mongoose
└── routes/
    └── registros.js       ← Rutas GET / POST / DELETE
```

---

## Pasos para instalar

### 1. Instala MongoDB
Descarga MongoDB Community desde:
```
https://www.mongodb.com/try/download/community
```
Instálalo y déjalo corriendo (se inicia automáticamente como servicio).

### 2. Configura el backend
```bash
cd backend
npm install
```

Renombra `.env.example` a `.env`:
```
MONGO_URI=mongodb://localhost:27017/rendimiento_academico
PORT=3000
```

### 3. Inicia el backend
```bash
# Modo normal
node server.js

# Modo desarrollo (se reinicia solo al guardar cambios)
npm run dev
```

Debes ver:
```
✅ MongoDB conectado correctamente
🚀 Servidor corriendo en http://localhost:3000
```

### 4. Verifica que funciona
Abre el navegador en:
```
http://localhost:3000
```
Debe mostrar:
```json
{ "message": "✅ Backend MEAN - Rendimiento Académico funcionando" }
```

### 5. Reemplaza el archivo Angular
```
src/app/services/firestore.service.ts  ← pega el nuevo archivo
```

### 6. Corre Angular
```bash
ng serve
```

---

## Endpoints del API

| Método | URL | Descripción |
|---|---|---|
| `GET` | `/api/registros?uid=xxx` | Obtiene registros del usuario |
| `POST` | `/api/registros` | Guarda un nuevo registro |
| `DELETE` | `/api/registros/:id` | Elimina un registro |

---

## MongoDB vs MySQL — diferencias para el proyecto

| MySQL | MongoDB |
|---|---|
| Tabla `registros` | Colección `registros` |
| Filas | Documentos JSON |
| `id` numérico | `_id` ObjectId |
| SQL `INSERT` | `documento.save()` |
| SQL `SELECT WHERE` | `Registro.find({ uid })` |

La base de datos y la colección se crean **automáticamente** cuando se guarda el primer registro. No necesitas ejecutar ningún script SQL.

---

## Notas

- Firebase Authentication sigue igual (Google SSO intacto).
- MongoDB se crea solo, no necesitas crear nada manualmente.
- XAMPP ya no es necesario para PHP, pero sigue siendo útil si quieres ver los datos visualmente — puedes usar **MongoDB Compass** en su lugar.
