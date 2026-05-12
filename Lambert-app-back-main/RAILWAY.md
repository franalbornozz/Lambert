# Guía de Despliegue en Railway

## 1. Backend + PostgreSQL en Railway

### Paso 1: Conectar el repo

1. Entrá a [railway.app](https://railway.app) e iniciá sesión con GitHub
2. Click en **"New Project"** → **"Deploy from GitHub repo"**
3. Seleccioná el repo **`EstebanVeronesi/Lambert`**

### Paso 2: Configurar el servicio del backend

1. Railway detectará automáticamente el `package.json`
2. En la vista del proyecto, hacé click en el servicio que se creó
3. Ve a **Settings** → **Root Directory** y configurá:
   - **Root Directory**: `Lambert-app-back-main`

### Paso 3: Agregar PostgreSQL

1. Click en **"+ New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway creará automáticamente la variable `DATABASE_URL`

### Paso 4: Variables de entorno

En **Settings** → **Variables**, agregá:

| Variable | Valor |
|----------|-------|
| `SECRET_JWT_KEY` | Una clave secreta larga (ej: `mi-clave-super-secreta-123`) |
| `NODE_ENV` | `production` |
| `CORS_ORIGIN` | `https://tu-frontend.vercel.app` (la URL de tu frontend) |

> **Nota**: `DATABASE_URL` la crea Railway automáticamente, no la toques.

### Paso 5: Inicializar la base de datos

1. Click en el servicio **PostgreSQL** → **Data** → **Open psql** (o **Console**)
2. Copiá y pegá el contenido del archivo `lambert-db-backup.sql` que está en la raíz del repo
3. Ejecutalo para crear todas las tablas y datos iniciales

### Paso 6: Deploy

Railway hará deploy automáticamente al detectar cambios en el repo. La URL del backend será algo como:
```
https://lambert-backend-production.up.railway.app
```

---

## 2. Frontend en Vercel (recomendado)

### Paso 1: Conectar el repo

1. Entrá a [vercel.com](https://vercel.com) e iniciá sesión con GitHub
2. Click en **"Add New..."** → **"Project"**
3. Importá el repo **`EstebanVeronesi/Lambert`**

### Paso 2: Configurar el build

En la configuración del proyecto:

| Setting | Valor |
|---------|-------|
| **Root Directory** | `Lambert-app-front-main` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist/mi-app/browser` |
| **Install Command** | `npm install` |

### Paso 3: Variables de entorno

Agregá una variable de entorno para la URL del backend:

| Variable | Valor |
|----------|-------|
| `API_URL` | `https://tu-backend.up.railway.app` |

> **Importante**: Necesitás actualizar el `environment.ts` del frontend para usar esta variable.

### Paso 4: Deploy

Vercel hará deploy automáticamente. La URL será algo como:
```
https://lambert-frontend.vercel.app
```

---

## 3. Actualizar CORS del backend

Una vez que tengas la URL del frontend, volvé a Railway y actualizá la variable `CORS_ORIGIN`:

```
CORS_ORIGIN = https://lambert-frontend.vercel.app
```

---

## 4. Verificar

1. Abrí la URL del frontend en el navegador
2. Iniciá sesión con un usuario existente en la DB
3. Creá una simulación de prueba
4. Verificá que los datos se guarden correctamente
