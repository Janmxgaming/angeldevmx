/**
 * Barrel export para simplificar imports
 * Uso: import { useGameStats, useLeaderboard, useUsername } from '@/hooks'
 */

// Hooks de estado
export { useLocalStorage } from './useLocalStorage';
export { useGameStats, useUserPreferences } from './useGameState';
export { useUsername } from './useUsername';
export { useLeaderboard, useLeaderboardSubmission } from './useLeaderboard';

// Hooks de juegos
export { useBottleGame } from './useBottleGame';
export { useBottleSortGame } from './useBottleSortGame';
export { useTicTacToeGame } from './useTicTacToeGame';

// Hooks de UI
export { useThemeStyles } from './useThemeStyles';

// Hooks comunes
export { useGameCommon } from './useGameCommon';

// Re-export para backward compatibility
export { useLazyComponent } from './useGameHelpers';
