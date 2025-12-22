# 🚀 Guía Rápida de Uso - Sistema Escalable

## ✅ Lo que acabas de ganar

### Antes vs Ahora

| Tarea | Antes | Ahora |
|-------|-------|-------|
| Agregar juego | 3 archivos + imports | 1 archivo + 1 línea |
| Cargar juegos | Todo junto | Lazy loading automático |
| Agregar contenido | Editar componentes | Editar config |
| Persistencia | Implementar desde cero | Hook listo |
| Estadísticas | No había | Sistema automático |
| Performance | Sin optimización | Code splitting + lazy |

---

## 🎯 3 Casos de Uso Prácticos

### 1️⃣ Agregar el juego "Snake" AHORA MISMO

**Paso 1**: Crea el archivo
```bash
touch src/components/games/SnakeGame.jsx
```

**Paso 2**: Copia GameTemplate.jsx y modifica:
```jsx
// src/components/games/SnakeGame.jsx
import { useState, useEffect } from 'react';
import GameLayout from '../ui/GameLayout';
import { useGameStats } from '../../hooks/useGameHelpers';

export default function SnakeGame({ setCurrentGame }) {
  const { incrementPlays } = useGameStats('snake');
  
  useEffect(() => {
    incrementPlays();
  }, [incrementPlays]);
  
  return (
    <GameLayout title="🐍 Snake" onBack={() => setCurrentGame(null)}>
      <div className="text-white text-center">
        <h2 className="text-3xl mb-4">¡Snake Game!</h2>
        {/* Tu lógica aquí */}
      </div>
    </GameLayout>
  );
}
```

**Paso 3**: Activa en config/games.js
```javascript
// Línea ~8: Agregar import
const SnakeGame = () => import('../components/games/SnakeGame');

// Línea ~77: Cambiar enabled
snake: {
  id: 'snake',
  component: SnakeGame,  // ← Agregar
  enabled: true,         // ← Cambiar a true
  // ... resto ya existe
}
```

**¡Listo!** Guarda y el juego aparece automáticamente en la página.

---

### 2️⃣ Agregar un nuevo proyecto en 30 segundos

Abre `src/config/content.js` y agrega:

```javascript
export const PROJECTS_CONTENT = {
  featured: [
    // ... proyectos existentes
    {
      id: 'my-awesome-app',
      title: { 
        es: 'Mi App Increíble', 
        en: 'My Awesome App' 
      },
      description: {
        es: 'Una aplicación que hace cosas increíbles',
        en: 'An app that does amazing things'
      },
      image: '/projects/my-app.png',
      technologies: ['React', 'Node.js', 'MongoDB'],
      links: {
        demo: 'https://my-app.com',
        github: 'https://github.com/user/my-app'
      },
      status: 'active',
      featured: true,
      category: 'web'
    }
  ]
};
```

**¡Eso es todo!** Aparece automáticamente en Projects.

---

### 3️⃣ Guardar configuración del usuario

```jsx
import { useUserPreferences } from '../hooks/useGameHelpers';

function SettingsPanel() {
  const { prefs, toggleSound, toggleMusic, updatePreference } = useUserPreferences();
  
  return (
    <div>
      <button onClick={toggleSound}>
        Sonido: {prefs.soundEnabled ? '🔊' : '🔇'}
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

Las preferencias se guardan automáticamente en localStorage.

---

## 📊 Ver estadísticas de juegos

Usa el hook en cualquier juego:

```jsx
import { useGameStats } from '../hooks/useGameHelpers';

function MyGame() {
  const { 
    stats,          // { plays, wins, losses, bestScore, ... }
    recordWin,      // Registrar victoria
    recordLoss,     // Registrar derrota
    incrementPlays  // Contador de partidas
  } = useGameStats('myGameId');
  
  const handleGameEnd = (won) => {
    if (won) {
      recordWin(score, timeElapsed);
    } else {
      recordLoss();
    }
  };
  
  return (
    <div>
      <p>Has jugado {stats.plays} veces</p>
      <p>Victorias: {stats.wins}</p>
      <p>Mejor puntuación: {stats.bestScore}</p>
    </div>
  );
}
```

---

## 🎨 Usar el sistema de colores

```jsx
import { getColor, toRgba, createGradient } from '../constants/colors';

function MyComponent() {
  const cyan = getColor('cyan');
  
  return (
    <div style={{
      // Color sólido
      color: cyan.hex,
      
      // Con transparencia
      backgroundColor: toRgba('cyan', 0.2),
      
      // Gradiente
      background: createGradient('cyan', 'purple', '135deg'),
      
      // Variante oscura
      borderColor: cyan.dark
    }}>
      Contenido
    </div>
  );
}
```

---

## 🔍 Filtrar juegos por categoría

```jsx
import { getGamesByCategory, GAME_CATEGORIES } from '../config/games';

function GameFilter() {
  const [category, setCategory] = useState('all');
  const games = getGamesByCategory(category);
  
  return (
    <div>
      <select onChange={e => setCategory(e.target.value)}>
        {Object.keys(GAME_CATEGORIES).map(cat => (
          <option key={cat} value={cat}>
            {GAME_CATEGORIES[cat].icon} {cat}
          </option>
        ))}
      </select>
      
      <div>
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}
```

---

## 💾 Persistencia personalizada

Guarda cualquier dato en localStorage:

```jsx
import { useLocalStorage } from '../hooks/useGameHelpers';

function GameProgress() {
  const [progress, setProgress, removeProgress] = useLocalStorage('game_progress', {
    level: 1,
    unlocked: [],
    inventory: []
  });
  
  const levelUp = () => {
    setProgress(prev => ({ ...prev, level: prev.level + 1 }));
  };
  
  const unlockItem = (item) => {
    setProgress(prev => ({
      ...prev,
      unlocked: [...prev.unlocked, item]
    }));
  };
  
  return (
    <div>
      <p>Nivel: {progress.level}</p>
      <button onClick={levelUp}>Subir de nivel</button>
      <button onClick={removeProgress}>Resetear progreso</button>
    </div>
  );
}
```

---

## 🎯 Achievements/Logros

```jsx
import { useGameStats } from '../hooks/useGameHelpers';

function GameWithAchievements() {
  const { stats, unlockAchievement } = useGameStats('myGame');
  
  useEffect(() => {
    // Logro: Primera victoria
    if (stats.wins === 1) {
      unlockAchievement('first_win');
    }
    
    // Logro: 10 partidas
    if (stats.plays === 10) {
      unlockAchievement('veteran');
    }
    
    // Logro: Puntuación perfecta
    if (stats.bestScore >= 1000) {
      unlockAchievement('perfect_score');
    }
  }, [stats, unlockAchievement]);
  
  return (
    <div>
      <h3>Logros Desbloqueados:</h3>
      <ul>
        {stats.achievements.map(achievement => (
          <li key={achievement}>🏆 {achievement}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 📁 Estructura Recomendada para Nuevo Juego

```
src/components/games/
├── MyGame.jsx                    # Componente principal
└── mygame/                       # Carpeta del juego (opcional)
    ├── Board.jsx                 # Tablero/Canvas
    ├── Controls.jsx              # Controles
    ├── ScorePanel.jsx            # Panel de puntuación
    └── useMyGameLogic.js         # Hook con lógica
```

Ejemplo completo:

```jsx
// src/components/games/MyGame.jsx
import GameLayout from '../ui/GameLayout';
import Board from './mygame/Board';
import Controls from './mygame/Controls';
import ScorePanel from './mygame/ScorePanel';
import useMyGameLogic from './mygame/useMyGameLogic';

export default function MyGame({ setCurrentGame }) {
  const gameLogic = useMyGameLogic();
  
  return (
    <GameLayout title="Mi Juego" onBack={() => setCurrentGame(null)}>
      <ScorePanel score={gameLogic.score} />
      <Board data={gameLogic.board} onClick={gameLogic.handleClick} />
      <Controls 
        onStart={gameLogic.start} 
        onReset={gameLogic.reset} 
      />
    </GameLayout>
  );
}
```

---

## 🚀 Performance Tips

### 1. Memoiza listas grandes
```jsx
const filteredGames = useMemo(() => {
  return games.filter(g => g.category === category);
}, [category, games]);
```

### 2. Debounce en búsquedas
```jsx
const [search, setSearch] = useState('');
const debouncedSearch = useMemo(() => 
  debounce(setSearch, 300), []
);
```

### 3. Lazy load imágenes
```jsx
<img 
  src={image} 
  loading="lazy" 
  alt="Game"
/>
```

---

## 🐛 Troubleshooting

### El juego no aparece
- ✅ Verifica `enabled: true` en config/games.js
- ✅ Verifica que el import esté agregado
- ✅ Revisa la consola por errores de compilación

### Las estadísticas no se guardan
- ✅ Verifica que el gameId coincida
- ✅ Llama a `recordWin()` / `recordLoss()` al terminar
- ✅ Revisa localStorage en DevTools

### El lazy loading no funciona
- ✅ Usa arrow function: `() => import('...')`
- ✅ No pongas `.jsx` en el import
- ✅ Verifica la ruta del archivo

---

## 📚 Recursos

- **[SCALABILITY_GUIDE.md](./SCALABILITY_GUIDE.md)** - Guía completa del sistema
- **[COLORS_GUIDE.md](./COLORS_GUIDE.md)** - Sistema de colores detallado
- **[GameTemplate.jsx](./src/components/games/GameTemplate.jsx)** - Plantilla para copiar

---

## 🎉 Próximos Pasos Sugeridos

1. **Implementa Snake** usando la plantilla
2. **Agrega más proyectos** en content.js
3. **Crea logros** para cada juego
4. **Implementa leaderboards** (opcional, requiere backend)
5. **Añade animaciones** con Framer Motion
6. **Modo offline** con Service Workers

---

**¿Tienes dudas?** Consulta SCALABILITY_GUIDE.md para más detalles.

**Happy coding!** 🚀
