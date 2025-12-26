# 🎮 AngelDevMX - Portfolio & Game Hub

Portfolio personal interactivo con sistema de juegos modulares construido con **React + Vite** y **Node.js**.

---

## ✨ Características Principales

- 🎯 **Sistema de juegos modular** - Arquitectura escalable y fácil de mantener
- ⚡ **Lazy loading automático** - Carga bajo demanda con code splitting
- 🎨 **Sistema de colores dinámico** - 25+ colores temáticos organizados
- 📊 **Estadísticas persistentes** - LocalStorage + Leaderboard con backend
- 🌍 **Multiidioma** - Español e Inglés
- 🌈 **Temas dinámicos** - Modo Normal y Neón
- 📱 **Totalmente responsive** - Optimizado para dispositivos móviles

---

## 🚀 Inicio Rápido

### Frontend

```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Build para producción
npm run build
```

### Backend (Opcional - para Leaderboard)

```bash
# Ir a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Iniciar servidor
npm run dev
# O en producción
npm start
```

El backend corre en `http://localhost:3001` y proporciona la API de leaderboard.

---

## 📁 Estructura del Proyecto

```
angeldevmx/
├── src/
│   ├── components/        # Componentes React
│   │   ├── games/         # Juegos individuales
│   │   ├── layout/        # Header, Footer, etc.
│   │   └── ui/            # Botones, Cards, etc.
│   ├── config/            # Configuraciones centralizadas
│   │   ├── games.js       # Registro de juegos
│   │   └── content.js     # Contenido estático
│   ├── constants/         # Constantes del proyecto
│   ├── hooks/             # Custom hooks modulares
│   │   ├── useLocalStorage.js
│   │   ├── useGameState.js
│   │   ├── useUsername.js
│   │   └── useLeaderboard.js
│   ├── pages/             # Páginas principales
│   ├── services/          # APIs y servicios externos
│   └── utils/             # Utilidades y helpers
├── backend/
│   ├── server.js          # Servidor Express
│   ├── routes.js          # Definición de rutas
│   └── database.js        # Lógica de base de datos
└── public/                # Archivos estáticos

```

---

## 🎮 Cómo Agregar un Nuevo Juego

### Paso 1: Crear el componente del juego

```jsx
// src/components/games/MyNewGame.jsx
import { useEffect } from 'react';
import GameLayout from '../ui/GameLayout';
import { useGameStats } from '../../hooks/useGameState';

export default function MyNewGame({ setCurrentGame }) {
  const { incrementPlays } = useGameStats('myNewGame');
  
  useEffect(() => {
    incrementPlays();
  }, [incrementPlays]);
  
  return (
    <GameLayout title="🎯 Mi Nuevo Juego" onBack={() => setCurrentGame(null)}>
      {/* Tu lógica de juego aquí */}
    </GameLayout>
  );
}
```

### Paso 2: Registrar el juego en la configuración

```javascript
// src/config/games.js
export const GAME_REGISTRY = {
  // ... otros juegos
  myNewGame: {
    id: 'myNewGame',
    component: () => import('../components/games/MyNewGame.jsx'),
    enabled: true,  // ← Activar el juego
    category: 'puzzle',
    difficulty: 'medium',
    meta: {
      icon: '🎯',
      color: 'cyan',
      version: '1.0.0'
    },
    features: {
      multiplayer: false,
      leaderboard: true
    }
  }
};
```

### Paso 3: Agregar traducciones

```javascript
// src/utils/translations.js
export const translations = {
  myNewGame: {
    title: { es: 'Mi Nuevo Juego', en: 'My New Game' },
    description: { es: 'Descripción...', en: 'Description...' }
  }
};
```

¡Listo! El juego aparecerá automáticamente en la interfaz.

---

## 🎨 Sistema de Colores

El proyecto usa un sistema de colores dinámico centralizado en [src/constants/colors.js](src/constants/colors.js).

**Colores disponibles:**
- Básicos: `red`, `blue`, `green`, `yellow`, `purple`, `pink`
- Extendidos: `cyan`, `emerald`, `amber`, `rose`, `indigo`, `teal`
- Neón: `neon-pink`, `neon-cyan`, `neon-green`, `neon-purple`

**Uso:**
```javascript
import { COLORS } from './constants/colors';

const myColor = COLORS.cyan.primary;  // #06b6d4
```

---

## 🔧 Hooks Personalizados

### `useLocalStorage(key, initialValue)`
Persistencia automática en localStorage.

```javascript
const [value, setValue, removeValue] = useLocalStorage('myKey', 'default');
```

### `useGameStats(gameId)`
Gestión de estadísticas de juego.

```javascript
const { stats, incrementPlays, recordWin, updateBestScore } = useGameStats('myGame');
```

### `useUsername()`
Gestión de nombre de usuario con validación.

```javascript
const { username, setUsername, isLocked } = useUsername();
```

### `useLeaderboard(gameId)`
Leaderboard local y servidor con sincronización automática.

```javascript
const { board, submitScore, serverAvailable } = useLeaderboard('myGame');
```

---

## 🌍 API Backend

### Endpoints Disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Health check del servidor |
| GET | `/api/leaderboard/:gameId` | Obtener top 50 del juego |
| POST | `/api/leaderboard/:gameId` | Enviar nueva puntuación |
| GET | `/api/leaderboards` | Obtener todos los leaderboards |
| DELETE | `/api/leaderboard/:gameId` | Limpiar leaderboard |

### Ejemplo de uso

```javascript
// Enviar puntuación
const response = await fetch('http://localhost:3001/api/leaderboard/myGame', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'Player1', score: 1000 })
});
```

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Librería UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos utility-first
- **ESLint** - Linting

### Backend
- **Node.js** - Runtime
- **Express** - Framework web
- **CORS** - Manejo de CORS
- **dotenv** - Variables de entorno

---

## 📦 Scripts Disponibles

### Frontend
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build
npm run lint         # Ejecutar ESLint
```

### Backend
```bash
npm start            # Iniciar servidor (producción)
npm run dev          # Modo desarrollo con hot reload
```

---

## 🌐 Variables de Entorno

Crea un archivo `.env` en la raíz del backend:

```env
PORT=3001
NODE_ENV=development
```

Para el frontend, crea `.env` en la raíz:

```env
VITE_LEADERBOARD_API=http://localhost:3001/api/leaderboard
```

---

## 🚀 Despliegue

### Frontend (Vercel/Netlify)
```bash
npm run build
# El contenido de /dist está listo para desplegar
```

### Backend (Railway/Render/Heroku)
El backend está listo para desplegar en cualquier plataforma que soporte Node.js.

---

## 📄 Licencia

MIT License - Puedes usar este proyecto libremente.

---

## 👤 Autor

**José Ángel** - [@angeldevmx](https://github.com/angeldevmx)

- 🌐 GitHub: [github.com/angeldevmx](https://github.com/angeldevmx)
- 𝕏 Twitter: [@angeldevmx](https://x.com/angeldevmx)
- 📷 Instagram: [@angeldevmx](https://instagram.com/angeldevmx)

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si encuentras un bug o tienes una sugerencia:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**¡Gracias por visitar mi proyecto! 🎮✨**

## 📁 Estructura

```
src/
├── components/
│   ├── games/          # Juegos individuales
│   ├── shared/         # Componentes compartidos
│   └── ui/             # UI components
├── config/             # ⭐ Sistema de configuración
│   ├── games.js        # Registro de juegos
│   └── content.js      # Contenido de páginas
├── constants/          # Colores y temas
├── hooks/              # ⭐ Custom hooks
│   └── useGameHelpers.js
├── pages/              # Páginas principales
└── utils/              # Utilidades
```

## 🛠️ Tecnologías

- React 18+ con Hooks
- Vite para build ultra-rápido
- Tailwind CSS para estilos
- Context API para estado global
- LocalStorage para persistencia

## 🎯 Juegos Disponibles

✅ **Bottle Sort** - Ordena colores en botellas  
✅ **Bottle Guess** - Adivina el color mezclado  
✅ **Tic Tac Toe** - Clásico con IA  
🔜 **Snake** - Próximamente  
🔜 **Memory** - Próximamente  
🔜 **Word Search** - Próximamente  

## 🤝 Contribuir

Este es un proyecto personal, pero si encuentras bugs o tienes sugerencias, son bienvenidas.

---

## 🔧 Utilidades

### Resetear Leaderboard
```bash
# Backend
echo '{"leaderboards":{}}' > backend/leaderboard.json

# Frontend (consola del navegador F12)
Object.keys(localStorage).filter(k => k.startsWith('leaderboard_')).forEach(k => localStorage.removeItem(k));
location.reload();
```

### Resetear Username
```javascript
localStorage.removeItem('player_username');
location.reload();
```

---

## 📝 Notas Técnicas

- **Code splitting**: Cada juego se carga solo cuando se necesita
- **Performance**: Lazy loading + Vite optimizations
- **Mantenibilidad**: Sistema modular tipo plugin
- **Escalabilidad**: Agregar contenido sin tocar componentes

---

**Autor**: AngelDevMX  
**Versión**: 2.0.0  
**Licencia**: MIT

