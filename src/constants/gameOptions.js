import { User, Cpu } from 'lucide-react';
import { DIFFICULTY_COLORS } from './theme';

/**
 * Opciones de modo de juego para TicTacToe
 */
export const GAME_MODES = {
  pvp: { 
    value: 'pvp', 
    icon: User,
    labelKey: 'pvp' // clave para traducción: t.ticTacToeGame.pvp
  },
  pvc: { 
    value: 'pvc', 
    icon: Cpu,
    labelKey: 'pvc' // clave para traducción: t.ticTacToeGame.pvc
  }
};

/**
 * Opciones de dificultad para juegos con IA
 */
export const DIFFICULTY_LEVELS = {
  easy: {
    value: 'easy',
    labelKey: 'easy', // t.ticTacToeGame.easy
    descriptionKey: 'easyDesc', // t.ticTacToeGame.easyDesc
    icon: '😊',
    color: DIFFICULTY_COLORS.easy.border,
    glow: DIFFICULTY_COLORS.easy.rgba
  },
  medium: {
    value: 'medium',
    labelKey: 'medium',
    descriptionKey: 'mediumDesc',
    icon: '😐',
    color: DIFFICULTY_COLORS.medium.border,
    glow: DIFFICULTY_COLORS.medium.rgba
  },
  hard: {
    value: 'hard',
    labelKey: 'hard',
    descriptionKey: 'hardDesc',
    icon: '😈',
    color: DIFFICULTY_COLORS.hard.border,
    glow: DIFFICULTY_COLORS.hard.rgba
  }
};

/**
 * Convierte opciones de configuración a formato para OptionSelector
 * @param {Object} options - Objeto con opciones (ej: GAME_MODES)
 * @param {Object} translations - Objeto de traducciones del juego
 * @returns {Array} Array de opciones formateadas
 */
export function formatOptionsForSelector(options, translations) {
  return Object.values(options).map(option => ({
    value: option.value,
    label: translations[option.labelKey],
    description: option.descriptionKey ? translations[option.descriptionKey] : undefined,
    icon: option.icon,
    color: option.color,
    glow: option.glow
  }));
}
