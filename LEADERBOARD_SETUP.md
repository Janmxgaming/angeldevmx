# Configuración del Leaderboard Público

El sistema de leaderboard funciona con un **backend propio** en Node.js + Express.

## 🚀 Inicio Rápido

### 1. Backend (ya instalado)
```bash
cd backend
npm run dev
```
El servidor estará en `http://localhost:3001`

### 2. Frontend
```bash
# En otra terminal
npm run dev
```
El frontend estará en `http://localhost:5173`

## ✅ ¿Cómo saber si funciona?

1. Abre tu juego
2. Si ves un icono 🌐 "Público" en el leaderboard, está conectado
3. Las puntuaciones se comparten entre todos los navegadores

## 📡 API Endpoints

El backend expone:
- `GET /api/health` - Verificar estado
- `GET /api/leaderboard/:gameId` - Obtener top 50
- `POST /api/leaderboard/:gameId` - Enviar puntuación
- `DELETE /api/leaderboard/:gameId` - Limpiar (admin)

## 🗄️ Almacenamiento

Los datos se guardan en `backend/leaderboard.json`

## 🔧 Configuración Avanzada

### Variables de Entorno

**Backend** (`backend/.env`):
```env
PORT=3001
NODE_ENV=development
```

**Frontend** (`.env` en raíz):
```env
VITE_LEADERBOARD_API=http://localhost:3001/api/leaderboard
```

### Deploy en Producción

Para producción, puedes usar:
- **Render.com** (gratis, Node.js)
- **Railway.app** (gratis hasta $5/mes)
- **Fly.io** (gratis para apps pequeñas)
- **Vercel** (con Vercel Functions)

Pasos generales:
1. Sube el código a GitHub
2. Conecta tu repo al servicio
3. Configura las variables de entorno
4. El backend se desplegará automáticamente

### Cambiar a otro backend

Si quieres usar Firebase, Supabase u otro servicio:
1. Actualiza `src/services/leaderboardAPI.js`
2. Modifica las funciones `submitScoreToServer` y `fetchTopScoresFromServer`
3. Configura `VITE_LEADERBOARD_API` con la nueva URL
