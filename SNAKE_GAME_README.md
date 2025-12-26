# 🐍 Snake Game - Retro Nokia Style

## 📝 Descripción

Implementación del clásico juego Snake con estilo retro inspirado en los celulares Nokia 3310. El juego presenta gráficos pixelados, paleta de colores monocromática verde y controles simples e intuitivos.

## ✨ Características

### Jugabilidad
- 🎮 **Grid 20x20**: Área de juego clásica
- 🐍 **Crecimiento progresivo**: La serpiente crece al comer
- 🎯 **Sistema de puntuación**: 10 puntos por cada comida
- ⚡ **Velocidad incremental**: El juego acelera cada 50 puntos
- 💀 **Colisiones**: Game Over al chocar con paredes o con sí mismo

### Controles
- **Teclado**: Flechas direccionales o WASD
- **Botones D-Pad**: Controles táctiles en pantalla
- **Espacio**: Pausar/Reanudar
- **Responsivo**: Funciona en desktop y móvil

### Estilo Retro Nokia
- 🎨 **Paleta de colores auténtica**:
  - Screen: `#c9de9b` (verde claro fosforescente)
  - Background: `#839f4e` (verde medio)
  - Nokia Green: `#9cb84a` (verde característico)
  - Dark: `#2d3a1f` (verde oscuro/negro)
- 📱 **Diseño tipo consola**: Marco redondeado simulando Nokia 3310
- 🔲 **Gráficos pixelados**: `image-rendering: pixelated`
- 📟 **Display de puntuación**: Estilo LCD con números de 4 dígitos

### Métricas
- 📊 **Total de partidas jugadas**: Contador persistente
- 🏆 **Puntaje actual**: En tiempo real durante el juego
- 👑 **Mejor puntuación**: Record histórico del jugador
- 🌐 **Leaderboard público**: Sistema de clasificación con servidor

## 🛠️ Implementación Técnica

### Archivos creados
```
src/
├── hooks/
│   └── useSnakeGame.js          # Lógica del juego
└── components/games/
    └── SnakeGame.jsx            # UI y componente principal
```

### Hook `useSnakeGame`
```javascript
const {
  snake,          // Array de segmentos [{x, y}, ...]
  food,           // Posición de la comida {x, y}
  score,          // Puntuación actual
  gameState,      // 'idle' | 'playing' | 'paused' | 'gameover'
  gridSize,       // Tamaño del grid (20)
  startGame,      // Iniciar nueva partida
  resetGame,      // Reiniciar después de game over
  togglePause,    // Pausar/Reanudar
  changeDirection,// Cambiar dirección de la serpiente
  directions      // Objeto con direcciones (UP, DOWN, LEFT, RIGHT)
} = useSnakeGame();
```

### Características del Hook
- ✅ Detección de colisiones con paredes
- ✅ Detección de colisiones con sí mismo
- ✅ Generación aleatoria de comida (evita posición de serpiente)
- ✅ Sistema de velocidad progresiva
- ✅ Prevención de movimiento en dirección opuesta
- ✅ Controles de teclado integrados
- ✅ Loop de juego con useEffect e Interval
- ✅ Refs para evitar problemas de estado en callbacks

## 🎯 Integración con el Sistema

### Registro en `config/games.js`
```javascript
snake: createGame({
  id: 'snake',
  enabled: true,
  name: { es: 'Snake Retro', en: 'Retro Snake' },
  emoji: '🐍',
  category: 'arcade',
  difficulty: 'medium',
  stats: { avgPlayTime: 5, popularity: 5.0 }
})
```

### Traducciones en `translations.js`
```javascript
snake: {
  title: 'Snake Retro - Nokia',
  score: 'Puntuación',
  bestScore: 'Mejor Puntuación',
  startGame: 'Iniciar Juego',
  pause: 'Pausar',
  resume: 'Reanudar',
  restart: 'Reiniciar',
  paused: 'Pausado',
  gameOver: '¡Game Over!',
  finalScore: 'Puntuación Final',
  playAgain: 'Jugar de Nuevo',
  controls: 'Usa las flechas o WASD para moverte',
  instructions: 'Come la comida (●) y evita chocar...',
  keyboardHint: 'Presiona ESPACIO para pausar'
}
```

### Integración con Hooks del Sistema
- ✅ `useGameStats('snake')`: Contador de partidas y mejor score
- ✅ `useLeaderboard('snake')`: Sistema de clasificación
- ✅ `useLeaderboardSubmission`: Auto-submit al terminar
- ✅ `useUsername`: Sistema de nombres de usuario
- ✅ `useLanguage`: Internacionalización (ES/EN)

## 📱 Responsive Design

### Desktop
- Grid centrado con marco Nokia simulado
- Controles de teclado principales
- Botones D-Pad como alternativa visual

### Mobile
- Botones D-Pad táctiles funcionales
- Grid adaptado al tamaño de pantalla
- Controles grandes para facilitar el juego

## 🎮 Flujo del Juego

1. **Idle**: Pantalla inicial con botón "Iniciar Juego"
2. **Playing**: Juego activo con controles habilitados
3. **Paused**: Overlay con mensaje "Pausado"
4. **Game Over**: Pantalla final con puntuación y botón "Jugar de Nuevo"

## 🚀 Características Avanzadas

### Velocidad Adaptativa
```javascript
// Aumenta velocidad cada 50 puntos
if ((score + 10) % 50 === 0 && speed > 50) {
  setSpeed(prev => Math.max(50, prev - 10));
}
```

### Generación Inteligente de Comida
```javascript
// Evita generar comida sobre la serpiente
while (isOnSnake) {
  newFood = {
    x: Math.floor(Math.random() * GRID_SIZE),
    y: Math.floor(Math.random() * GRID_SIZE)
  };
  isOnSnake = currentSnake.some(
    segment => segment.x === newFood.x && segment.y === newFood.y
  );
}
```

### Prevención de Movimiento Inverso
```javascript
// Evita que la serpiente se mueva hacia atrás
const currentDir = directionRef.current;
if (
  (newDirection.x === -currentDir.x && newDirection.x !== 0) ||
  (newDirection.y === -currentDir.y && newDirection.y !== 0)
) {
  return; // Ignora el cambio
}
```

## 📊 Bundle Size

```
SnakeGame-eXuYvAXt.js: 8.02 kB │ gzip: 2.72 kB
```

## 🎨 Paleta de Colores

```css
--nokia-green: #9cb84a;      /* Color característico Nokia */
--nokia-background: #839f4e; /* Fondo de la carcasa */
--nokia-screen: #c9de9b;     /* Pantalla LCD verde */
--nokia-dark: #2d3a1f;       /* Pixeles oscuros */
```

## ✅ Testing Checklist

- [x] Movimiento fluido de la serpiente
- [x] Detección correcta de colisiones
- [x] Generación de comida sin solapamientos
- [x] Sistema de puntuación funcional
- [x] Velocidad incremental
- [x] Controles de teclado (flechas y WASD)
- [x] Botones táctiles D-Pad
- [x] Pausa/Reanudar
- [x] Game Over y reinicio
- [x] Integración con leaderboard
- [x] Traducciones completas (ES/EN)
- [x] Build exitoso sin errores
- [x] Responsive design

## 🎯 Mejoras Futuras (Opcionales)

- [ ] Modos de dificultad (Fácil, Normal, Difícil)
- [ ] Obstáculos en el mapa
- [ ] Power-ups temporales
- [ ] Modo multijugador
- [ ] Sonidos retro 8-bit
- [ ] Achievements/Logros
- [ ] Paredes que teletransportan (wrap-around)
- [ ] Diferentes tipos de comida con bonificaciones

## 📝 Notas de Desarrollo

- El juego usa un grid de 20x20 para mantener el equilibrio entre dificultad y jugabilidad
- La velocidad inicial es de 150ms, llegando hasta un mínimo de 50ms
- Se usa `useRef` para `directionRef` para evitar problemas de cierre en el loop del juego
- Los controles de teclado usan `preventDefault()` para evitar scroll de página
- El componente es completamente funcional y usa hooks de React modernos

---

**Desarrollado por**: AngelDevMX  
**Fecha**: 25 de diciembre de 2025  
**Versión**: 1.0.0  
**Rama**: `game-snake`
