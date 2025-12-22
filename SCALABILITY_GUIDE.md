# 📖 Guía de Escalabilidad - AngelDevMX

Esta guía explica el nuevo sistema modular implementado para facilitar la expansión del proyecto.

## 🎯 Visión General

El proyecto ahora está estructurado para permitir:
- **Agregar juegos en minutos** (1 archivo + 1 configuración)
- **Gestionar contenido de páginas** sin tocar componentes
- **Lazy loading automático** para mejor rendimiento
- **Sistema de estadísticas** y logros para cada juego
- **Persistencia local** de progreso y preferencias

---

## 🎮 CÓMO AGREGAR UN NUEVO JUEGO

### Paso 1: Crear el componente del juego

```jsx
// src/components/games/SnakeGame.jsx
import GameLayout from '../ui/GameLayout';

export default function SnakeGame({ setCurrentGame }) {
  return (
    <GameLayout 
      title="Snake Game"
      onBack={() => setCurrentGame(null)}
    >
      <div className="game-content">
        {/* Tu lógica del juego aquí */}
      </div>
    </GameLayout>
  );
}
```

### Paso 2: Registrar en config/games.js

```javascript
// Agregar el import lazy
const SnakeGame = () => import('../components/games/SnakeGame');

// Cambiar enabled: false → enabled: true
snake: {
  id: 'snake',
  component: SnakeGame,  // ← Agregar aquí
  enabled: true,         // ← Cambiar a true
  // ... resto de configuración ya existe
}
```

### Paso 3: Agregar traducciones (opcional)

```javascript
// src/utils/translations.js
export const translations = {
  es: {
    games: {
      snake: 'Serpiente',  // ← Agregar aquí
      // ...
    }
  },
  en: {
    games: {
      snake: 'Snake',  // ← Agregar aquí
      // ...
    }
  }
};
```

**¡Listo!** El juego aparecerá automáticamente en la página de juegos.

---

## 📊 Sistema de Configuración

### 1. config/games.js - Registro de Juegos

**Propósito**: Un solo lugar para definir todos los juegos.

**Estructura de un juego**:
```javascript
{
  id: 'myGame',              // ID único
  component: LazyComponent,  // Import dinámico
  enabled: true,             // ¿Mostrar en la app?
  category: 'puzzle',        // puzzle, arcade, strategy, memory
  difficulty: 'medium',      // easy, medium, hard
  players: { min: 1, max: 2 },
  
  meta: {
    icon: '🎮',             // Emoji o componente
    color: 'blue',          // Color del tema
    version: '1.0.0',
    author: 'AngelDevMX'
  },
  
  features: {
    multiplayer: false,
    saveGame: true,
    achievements: true,
    leaderboard: false,
    levels: true
  },
  
  stats: {
    avgPlayTime: 5,         // minutos
    popularity: 4.5,        // 0-5
    plays: 0                // contador
  }
}
```

**Funciones útiles**:
```javascript
import { 
  getEnabledGames,          // Solo juegos activos
  getGamesByCategory,       // Filtrar por categoría
  getGameById,              // Obtener un juego
  incrementGamePlays        // Contador de jugadas
} from './config/games';
```

### 2. config/content.js - Contenido de Páginas

**Propósito**: Centralizar TODO el contenido (textos, links, imágenes).

**Ejemplo - Agregar un proyecto**:
```javascript
export const PROJECTS_CONTENT = {
  featured: [
    {
      id: 'new-project',
      title: { es: 'Mi Proyecto', en: 'My Project' },
      description: {
        es: 'Descripción aquí',
        en: 'Description here'
      },
      image: '/projects/my-project.png',
      technologies: ['React', 'Node.js'],
      links: {
        demo: 'https://...',
        github: 'https://github.com/...'
      },
      status: 'active',
      featured: true,
      category: 'web'
    },
    // ... más proyectos
  ]
};
```

**Agregar skills en About**:
```javascript
export const ABOUT_CONTENT = {
  skills: [
    {
      category: { es: 'Mi Categoría', en: 'My Category' },
      items: ['Skill 1', 'Skill 2', 'Skill 3'],
      icon: '⚡',
      color: 'yellow'
    }
  ]
};
```

**Funciones útiles**:
```javascript
import { 
  getPageContent,           // Obtiene contenido traducido
  getProjectsByCategory,    // Filtra proyectos
  getProjectById            // Obtiene un proyecto
} from './config/content';

// Uso:
const content = getPageContent('about', 'es');
```

---

## 🪝 Custom Hooks

### useGameStats - Estadísticas de Juego

```javascript
import { useGameStats } from '../hooks/useGameHelpers';

function MyGame() {
  const { 
    stats,           // { plays, wins, losses, bestScore, ... }
    incrementPlays,
    recordWin,
    recordLoss,
    unlockAchievement,
    resetStats
  } = useGameStats('myGameId');
  
  // Uso:
  useEffect(() => {
    incrementPlays();  // Al iniciar
  }, []);
  
  const handleWin = () => {
    recordWin(score, timeInSeconds);
    unlockAchievement('first_win');
  };
  
  return (
    <div>
      <p>Partidas: {stats.plays}</p>
      <p>Mejor puntuación: {stats.bestScore}</p>
    </div>
  );
}
```

### useLocalStorage - Persistencia de Datos

```javascript
import { useLocalStorage } from '../hooks/useGameHelpers';

function MyComponent() {
  const [settings, setSettings, removeSettings] = useLocalStorage('app_settings', {
    soundEnabled: true,
    difficulty: 'medium'
  });
  
  const toggleSound = () => {
    setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };
  
  return (
    <button onClick={toggleSound}>
      Sonido: {settings.soundEnabled ? 'ON' : 'OFF'}
    </button>
  );
}
```

### useLazyComponent - Carga bajo demanda

```javascript
import { useLazyComponent } from '../hooks/useGameHelpers';

function GameLoader({ gameId }) {
  const importFn = () => import(`../games/${gameId}`);
  const { Component, loading, error } = useLazyComponent(importFn);
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage />;
  if (Component) return <Component />;
  return null;
}
```

### useUserPreferences - Configuración Global

```javascript
import { useUserPreferences } from '../hooks/useGameHelpers';

function SettingsPanel() {
  const { 
    prefs,              // { soundEnabled, musicEnabled, ... }
    updatePreference,
    toggleSound,
    toggleMusic
  } = useUserPreferences();
  
  return (
    <div>
      <button onClick={toggleSound}>
        🔊 Sonido: {prefs.soundEnabled ? 'ON' : 'OFF'}
      </button>
      <button onClick={toggleMusic}>
        🎵 Música: {prefs.musicEnabled ? 'ON' : 'OFF'}
      </button>
      <select 
        value={prefs.difficulty}
        onChange={e => updatePreference('difficulty', e.target.value)}
      >
        <option value="easy">Fácil</option>
        <option value="medium">Medio</option>
        <option value="hard">Difícil</option>
      </select>
    </div>
  );
}
```

---

## 🎨 Sistema de Colores (Actualizado)

Usa el sistema centralizado de colors.js:

```javascript
import { getColor, toRgba, createGradient } from '../constants/colors';

// Obtener un color
const cyan = getColor('cyan');
// { hex: '#00ffff', rgb: '0, 255, 255', dark: '#00cccc', light: '#80ffff', name: {...} }

// Crear rgba con opacidad
const bgColor = toRgba('cyan', 0.2);
// 'rgba(0, 255, 255, 0.2)'

// Crear gradiente
const gradient = createGradient('cyan', 'purple', 'to right');
// 'linear-gradient(to right, #00ffff, #a855f7)'

// Usar en componentes
<div style={{ 
  backgroundColor: toRgba('cyan', 0.1),
  background: createGradient('cyan', 'blue', '135deg')
}}>
  Content
</div>
```

---

## 🚀 Beneficios del Nuevo Sistema

### Antes (Sistema Antiguo)
❌ Agregar juego = editar 3 archivos diferentes  
❌ Imports hardcoded, código duplicado  
❌ Sin lazy loading, carga todo de golpe  
❌ Contenido mezclado con componentes  
❌ Sin sistema de estadísticas  

### Ahora (Sistema Nuevo)
✅ Agregar juego = 1 archivo + 1 configuración  
✅ Imports dinámicos, código reutilizable  
✅ Lazy loading automático, mejor performance  
✅ Contenido centralizado, fácil actualizar  
✅ Stats y logros automáticos  
✅ LocalStorage para persistencia  
✅ Sistema modular tipo plugin  

---

## 📝 Checklist para Agregar Contenido

### Nuevo Juego
- [ ] Crear componente en `src/components/games/`
- [ ] Agregar import lazy en `config/games.js`
- [ ] Cambiar `enabled: true` en el registro
- [ ] Agregar traducciones en `utils/translations.js`
- [ ] (Opcional) Implementar `useGameStats` para estadísticas
- [ ] Probar en desarrollo

### Nuevo Proyecto
- [ ] Agregar objeto en `config/content.js` → `PROJECTS_CONTENT.featured`
- [ ] Agregar imagen en `public/projects/`
- [ ] Verificar categoría existe
- [ ] Probar en página de proyectos

### Nueva Skill
- [ ] Agregar en `config/content.js` → `ABOUT_CONTENT.skills`
- [ ] Elegir icono y color
- [ ] Probar en about page

### Nuevo Idioma
- [ ] Agregar claves en `utils/translations.js`
- [ ] Actualizar objetos `{ es, en }` en `config/content.js`
- [ ] Agregar soporte en `LanguageContext`

---

## 🔧 Tips de Performance

1. **Lazy Loading**: Todos los juegos se cargan bajo demanda
2. **Code Splitting**: Vite divide automáticamente el código
3. **LocalStorage**: Datos persisten sin backend
4. **Memoization**: Usa `useMemo` en operaciones pesadas
5. **Debounce**: Para inputs de búsqueda/filtros

```javascript
// Ejemplo de filtrado optimizado
const filteredGames = useMemo(() => {
  return getGamesByCategory(selectedCategory);
}, [selectedCategory]);
```

---

## 🎓 Arquitectura del Proyecto

```
src/
├── components/          # Componentes React
│   ├── games/          # Juegos individuales
│   ├── layout/         # Navbar, Footer
│   ├── shared/         # Componentes compartidos
│   └── ui/             # Elementos de UI
├── config/             # ⭐ CONFIGURACIONES (NUEVO)
│   ├── games.js        # Registro de juegos
│   └── content.js      # Contenido de páginas
├── constants/          # Constantes globales
│   ├── colors.js       # Sistema de colores
│   └── theme.js        # Temas
├── context/            # Context API
│   └── LanguageContext.jsx
├── hooks/              # ⭐ CUSTOM HOOKS (NUEVO)
│   ├── useGameHelpers.js
│   ├── useThemeStyles.js
│   └── ...
├── pages/              # Páginas principales
├── utils/              # ⭐ UTILIDADES (NUEVO)
│   ├── router.js       # Sistema de rutas
│   ├── styleHelpers.js
│   └── translations.js
├── App.jsx             # ⭐ ACTUALIZADO (lazy loading)
└── main.jsx
```

---

## 🤝 Contribuir

Para mantener el código limpio:

1. **Un archivo, una responsabilidad**
2. **Configuración separada de lógica**
3. **Componentes pequeños y reutilizables**
4. **Hooks para lógica compartida**
5. **Comentarios en funciones complejas**

---

## 📚 Recursos Adicionales

- [COLORS_GUIDE.md](./COLORS_GUIDE.md) - Sistema de colores detallado
- [React Lazy](https://react.dev/reference/react/lazy) - Documentación oficial
- [Vite Code Splitting](https://vitejs.dev/guide/features.html#code-splitting)

---

## ❓ FAQ

**P: ¿Cómo desactivo un juego temporalmente?**  
R: En `config/games.js`, cambia `enabled: false`

**P: ¿Puedo agregar más categorías de juegos?**  
R: Sí, edita `GAME_CATEGORIES` en `config/games.js`

**P: ¿Cómo reseteo las estadísticas de un juego?**  
R: Usa el hook: `const { resetStats } = useGameStats('gameId'); resetStats();`

**P: ¿El lazy loading funciona en producción?**  
R: Sí, Vite lo optimiza automáticamente en build

**P: ¿Puedo usar este sistema para otros tipos de contenido?**  
R: ¡Absolutamente! Sigue el patrón de `config/games.js`

---

**Última actualización**: Enero 2025  
**Autor**: AngelDevMX  
**Versión**: 2.0.0
