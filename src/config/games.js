/**
 * Configuración centralizada de todos los juegos
 */

// Plantilla de juego por defecto
const DEFAULT_GAME_CONFIG = {
  enabled: false,
  players: { min: 1, max: 1 },
  meta: {
    version: '1.0.0',
    author: 'AngelDevMX',
    releaseDate: '2025-01-01'
  },
  features: {
    multiplayer: false,
    saveGame: true,
    achievements: true,
    leaderboard: true,
    levels: false
  },
  stats: {
    avgPlayTime: 5,
    popularity: 4.0,
    plays: 0
  }
};

// Helper para crear configuración de juego
const createGame = (overrides) => ({
  ...DEFAULT_GAME_CONFIG,
  ...overrides,
  meta: { ...DEFAULT_GAME_CONFIG.meta, ...overrides.meta },
  features: { ...DEFAULT_GAME_CONFIG.features, ...overrides.features },
  stats: { ...DEFAULT_GAME_CONFIG.stats, ...overrides.stats },
  players: { ...DEFAULT_GAME_CONFIG.players, ...overrides.players }
});

export const GAME_REGISTRY = {
  bottleSort: createGame({
    id: 'bottleSort',
    component: () => import('../components/games/BottleSortGame.jsx'),
    enabled: true,
    category: 'puzzle',
    difficulty: 'medium',
    meta: { icon: '🧪', color: 'cyan' },
    features: { leaderboard: false, levels: true },
    stats: { popularity: 4.5 }
  }),

  bottleGuess: createGame({
    id: 'bottleGuess',
    component: () => import('../components/games/BottleGuessGame.jsx'),
    enabled: true,
    category: 'memory',
    difficulty: 'easy',
    meta: { icon: '🎯', color: 'purple' },
    stats: { avgPlayTime: 3, popularity: 4.2 }
  }),

  tictactoe: createGame({
    id: 'tictactoe',
    component: () => import('../components/games/TicTacToeGame.jsx'),
    enabled: true,
    category: 'strategy',
    difficulty: 'easy',
    players: { min: 1, max: 2 },
    meta: { icon: '⭕', color: 'blue' },
    features: { multiplayer: true, saveGame: false, achievements: false, leaderboard: false },
    stats: { avgPlayTime: 2, popularity: 4.8 }
  }),

  simon: createGame({
    id: 'simon',
    component: () => import('../components/games/SimonGame.jsx'),
    enabled: true,
    category: 'memory',
    difficulty: 'medium',
    meta: { icon: '🎵', color: 'purple', releaseDate: '2025-12-21' },
    features: { levels: true },
    stats: { avgPlayTime: 8, popularity: 4.7 }
  }),

  // Juegos futuros (deshabilitados)
  snake: createGame({
    id: 'snake',
    enabled: true,
    name: { es: 'Snake Retro', en: 'Retro Snake' },
    description: { 
      es: 'El clásico Snake estilo Nokia. Come, crece y evita chocar.',
      en: 'Classic Nokia-style Snake. Eat, grow, and avoid crashing.'
    },
    emoji: '🐍',
    component: () => import('../components/games/SnakeGame.jsx'),
    category: 'arcade',
    difficulty: 'medium',
    tags: ['retro', 'arcade', 'nokia', 'clasico'],
    meta: { icon: '🐍', color: 'green', releaseDate: '2025-12-25' },
    features: { levels: false, achievements: true },
    stats: { avgPlayTime: 5, popularity: 5.0, plays: 0 }
  }),

  memory: createGame({
    id: 'memory',
    component: null,
    category: 'memory',
    difficulty: 'easy',
    players: { min: 1, max: 2 },
    meta: { icon: '🎴', color: 'pink', version: '0.0.0', releaseDate: 'TBD' },
    features: { multiplayer: true, levels: true },
    stats: { popularity: 0 }
  }),

  wordSearch: createGame({
    id: 'wordSearch',
    component: null,
    category: 'puzzle',
    difficulty: 'medium',
    meta: { icon: '🔤', color: 'orange', version: '0.0.0', releaseDate: 'TBD' },
    features: { levels: true },
    stats: { popularity: 0 }
  })
};

// ============================================
// CATEGORÍAS DE JUEGOS
// ============================================

export const GAME_CATEGORIES = {
  all: { id: 'all', icon: '🎮', color: 'blue' },
  puzzle: { id: 'puzzle', icon: '🧩', color: 'purple' },
  arcade: { id: 'arcade', icon: '🕹️', color: 'red' },
  strategy: { id: 'strategy', icon: '♟️', color: 'amber' },
  memory: { id: 'memory', icon: '🧠', color: 'cyan' },
  multiplayer: { id: 'multiplayer', icon: '👥', color: 'green' }
};

/**
 * Obtiene todos los juegos habilitados
 */
export function getEnabledGames() {
  return Object.values(GAME_REGISTRY).filter(game => game.enabled);
}

/**
 * Obtiene juegos por categoría
 */
export function getGamesByCategory(category) {
  if (category === 'all') return getEnabledGames();
  return getEnabledGames().filter(game => game.category === category);
}

/**
 * Obtiene un juego por ID
 */
export function getGameById(id) {
  return GAME_REGISTRY[id];
}

/**
 * Obtiene juegos con multijugador
 */
export function getMultiplayerGames() {
  return getEnabledGames().filter(game => game.features.multiplayer);
}

/**
 * Obtiene juegos con logros
 */
export function getGamesWithAchievements() {
  return getEnabledGames().filter(game => game.features.achievements);
}

/**
 * Incrementa el contador de plays de un juego
 */
export function incrementGamePlays(gameId) {
  const game = GAME_REGISTRY[gameId];
  if (game) {
    game.stats.plays++;
    // Aquí podrías guardar en localStorage o backend
  }
}

/**
 * Obtiene estadísticas globales
 */
export function getGlobalStats() {
  const games = Object.values(GAME_REGISTRY);
  return {
    totalGames: games.length,
    enabledGames: games.filter(g => g.enabled).length,
    totalPlays: games.reduce((sum, g) => sum + g.stats.plays, 0),
    avgRating: games.reduce((sum, g) => sum + g.stats.popularity, 0) / games.length
  };
}
