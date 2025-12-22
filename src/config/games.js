/**
 * Configuración centralizada de todos los juegos
 * Agregar un nuevo juego es tan fácil como agregar un objeto aquí
 */

// ============================================
// CONFIGURACIÓN DE JUEGOS
// ============================================

export const GAME_REGISTRY = {
  bottleSort: {
    id: 'bottleSort',
    component: () => import('../components/games/BottleSortGame.jsx'),
    enabled: true,
    category: 'puzzle',
    difficulty: 'medium',
    players: { min: 1, max: 1 },
    meta: {
      icon: '🧪',
      color: 'cyan',
      version: '1.0.0',
      author: 'AngelDevMX',
      releaseDate: '2025-01-01'
    },
    features: {
      multiplayer: false,
      saveGame: true,
      achievements: true,
      leaderboard: false,
      levels: true
    },
    stats: {
      avgPlayTime: 5, // minutos
      popularity: 4.5,
      plays: 0
    }
  },

  bottleGuess: {
    id: 'bottleGuess',
    component: () => import('../components/games/BottleGuessGame.jsx'),
    enabled: true,
    category: 'memory',
    difficulty: 'easy',
    players: { min: 1, max: 1 },
    meta: {
      icon: '🎯',
      color: 'purple',
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
      avgPlayTime: 3,
      popularity: 4.2,
      plays: 0
    }
  },

  tictactoe: {
    id: 'tictactoe',
    component: () => import('../components/games/TicTacToeGame.jsx'),
    enabled: true,
    category: 'strategy',
    difficulty: 'easy',
    players: { min: 1, max: 2 },
    meta: {
      icon: '⭕',
      color: 'blue',
      version: '1.0.0',
      author: 'AngelDevMX',
      releaseDate: '2025-01-01'
    },
    features: {
      multiplayer: true,
      saveGame: false,
      achievements: false,
      leaderboard: false,
      levels: false
    },
    stats: {
      avgPlayTime: 2,
      popularity: 4.8,
      plays: 0
    }
  },

  simon: {
    id: 'simon',
    component: () => import('../components/games/SimonGame.jsx'),
    enabled: true,
    category: 'memory',
    difficulty: 'medium',
    players: { min: 1, max: 1 },
    meta: {
      icon: '🎵',
      color: 'purple',
      version: '1.0.0',
      author: 'AngelDevMX',
      releaseDate: '2025-12-21'
    },
    features: {
      multiplayer: false,
      saveGame: true,
      achievements: true,
      leaderboard: true,
      levels: true
    },
    stats: {
      avgPlayTime: 8,
      popularity: 4.7,
      plays: 0
    }
  },

  // ============================================
  // JUEGOS FUTUROS (Plantillas listas para usar)
  // ============================================

  snake: {
    id: 'snake',
    component: null, // () => import('../components/games/SnakeGame')
    enabled: false,
    category: 'arcade',
    difficulty: 'medium',
    players: { min: 1, max: 1 },
    meta: {
      icon: '🐍',
      color: 'green',
      version: '0.0.0',
      author: 'AngelDevMX',
      releaseDate: 'TBD'
    },
    features: {
      multiplayer: false,
      saveGame: true,
      achievements: true,
      leaderboard: true,
      levels: true
    },
    stats: {
      avgPlayTime: 10,
      popularity: 0,
      plays: 0
    }
  },

  memory: {
    id: 'memory',
    component: null,
    enabled: false,
    category: 'memory',
    difficulty: 'easy',
    players: { min: 1, max: 2 },
    meta: {
      icon: '🎴',
      color: 'pink',
      version: '0.0.0',
      author: 'AngelDevMX',
      releaseDate: 'TBD'
    },
    features: {
      multiplayer: true,
      saveGame: true,
      achievements: true,
      leaderboard: true,
      levels: true
    },
    stats: {
      avgPlayTime: 5,
      popularity: 0,
      plays: 0
    }
  },

  wordSearch: {
    id: 'wordSearch',
    component: null,
    enabled: false,
    category: 'puzzle',
    difficulty: 'medium',
    players: { min: 1, max: 1 },
    meta: {
      icon: '🔤',
      color: 'orange',
      version: '0.0.0',
      author: 'AngelDevMX',
      releaseDate: 'TBD'
    },
    features: {
      multiplayer: false,
      saveGame: true,
      achievements: true,
      leaderboard: true,
      levels: true
    },
    stats: {
      avgPlayTime: 8,
      popularity: 0,
      plays: 0
    }
  }
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

// ============================================
// FUNCIONES HELPER
// ============================================

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
