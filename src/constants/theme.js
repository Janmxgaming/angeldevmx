import { BLUES, GREENS, REDS, YELLOWS_ORANGES, getColor as _getColor, getColorSet, COLOR_SETS } from './colors';

// ============================================
// TIPOS DE TEMA
// ============================================

export const THEME_TYPES = {
  NEON: 'neon',
  NORMAL: 'normal'
};

// ============================================
// COLORES POR TEMA (USANDO colors.js)
// ============================================

export const COLORS = {
  neon: {
    primary: GREENS.neon.hex,
    primaryRgb: `${GREENS.neon.rgb}`,
    primaryRgba: `rgba(${GREENS.neon.rgb}, 1)`,
    gradient: {
      from: GREENS.neon.hex,
      via: GREENS.neon.light,
      to: GREENS.neon.hex
    },
    secondary: GREENS.neon.dark
  },
  normal: {
    primary: BLUES.sky.hex,
    primaryRgb: `${BLUES.sky.rgb}`,
    primaryRgba: `rgba(${BLUES.sky.rgb}, 1)`,
    gradient: {
      from: BLUES.sky.hex,
      via: BLUES.sky.light,
      to: BLUES.sky.hex
    },
    secondary: BLUES.sky.dark
  }
};

// ============================================
// COLORES DE JUEGOS (IMPORTADOS DE colors.js)
// ============================================

// Exportar colores para juegos (compatibilidad)
export { ALL_COLORS as GAME_COLORS } from './colors';
export { getColor as getGameColor, getColorSet } from './colors';

// Re-exportar COLOR_SETS para compatibilidad
export { COLOR_SETS };

// ============================================
// COLORES ESPECÍFICOS DE APLICACIÓN
// ============================================

// Colores para dificultad
export const DIFFICULTY_COLORS = {
  easy: {
    border: GREENS.green.hex,
    rgba: `rgba(${GREENS.green.rgb}, 0.3)`
  },
  medium: {
    border: YELLOWS_ORANGES.amber.hex,
    rgba: `rgba(${YELLOWS_ORANGES.amber.rgb}, 0.3)`
  },
  hard: {
    border: REDS.red.hex,
    rgba: `rgba(${REDS.red.rgb}, 0.3)`
  }
};

// Colores para jugadores (TicTacToe)
export const PLAYER_COLORS = {
  X: REDS.red.hex,
  O: BLUES.blue.hex
};

// Colores para botellas (BottleSort - usando set extendido)
export const BOTTLE_COLORS = getColorSet('extended').map(c => c.hex);
