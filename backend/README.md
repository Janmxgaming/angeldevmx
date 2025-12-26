# AngelDevMX Backend API

Backend simple para el sistema de leaderboard público.

## 🚀 Instalación

```bash
cd backend
npm install
```

## ▶️ Ejecutar

```bash
# Desarrollo (con hot-reload)
npm run dev

# Producción
npm start
```

El servidor estará disponible en `http://localhost:3001`

## 📡 Endpoints

### Health Check
```
GET /api/health
```
Verifica que el servidor esté funcionando.

### Obtener Leaderboard
```
GET /api/leaderboard/:gameId
```
Obtiene el top 50 de puntuaciones de un juego específico.

**Parámetros:**
- `gameId`: ID del juego (simon, tictactoe, bottlesort, bottleguess)

**Respuesta:**
```json
[
  {
    "id": "1234567890-abc123",
    "username": "Player1",
    "score": 100,
    "date": 1703548800000
  }
]
```

### Agregar Puntuación
```
POST /api/leaderboard/:gameId
```
Agrega una nueva puntuación al leaderboard.

**Body:**
```json
{
  "username": "Player1",
  "score": 100
}
```

### Obtener Todos los Leaderboards
```
GET /api/leaderboards
```
Obtiene todos los leaderboards de todos los juegos.

### Limpiar Leaderboard (Admin)
```
DELETE /api/leaderboard/:gameId
```
Limpia todas las puntuaciones de un juego específico.

## 🗄️ Almacenamiento

Los datos se guardan en `leaderboard.json` en el mismo directorio del servidor.

## ⚙️ Variables de Entorno

Configura en el archivo `.env`:
```
PORT=3001
NODE_ENV=development
```

## 🔧 Tecnologías

- **Express**: Framework web
- **CORS**: Manejo de peticiones cross-origin
- **dotenv**: Variables de entorno
- **File System**: Almacenamiento en JSON (sin DB externa)

## 📝 Notas

- El leaderboard mantiene un máximo de 100 entradas por juego
- Solo devuelve el top 50 en las peticiones GET
- Los datos persisten entre reinicios del servidor
