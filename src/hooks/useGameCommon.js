/**
 * Helper para reducir boilerplate en componentes de juegos
 * 
 * IMPORTANTE: Este hook NO incrementa automáticamente el contador de plays.
 * Cada juego debe llamar `incrementPlays()` manualmente cuando el usuario
 * realmente inicie una partida (ej: al presionar "Iniciar", "Jugar", etc.)
 */

import { useLanguage } from '@context/LanguageContext';
import { useGameStats, useLeaderboard, useUsername, useLeaderboardSubmission } from '@hooks';

/**
 * Hook que agrupa toda la lógica común de juegos
 * 
 * @param {string} gameId - ID del juego
 * @param {boolean} hasWon - Si el jugador ha ganado (para auto-submit al leaderboard)
 * @param {number} score - Puntuación actual (para auto-submit al leaderboard)
 * @returns {Object} Valores comunes para juegos (t, lang, username, leaderboardEntries, incrementPlays)
 */
export function useGameCommon(gameId, hasWon, score) {
  const { t, lang } = useLanguage();
  const { incrementPlays } = useGameStats(gameId);
  const { username } = useUsername();
  const { board: leaderboardEntries } = useLeaderboard(gameId);
  
  // Auto-submit al leaderboard cuando se gana
  useLeaderboardSubmission(gameId, username, hasWon, score);

  return {
    t,
    lang,
    username,
    leaderboardEntries,
    incrementPlays // Devolver la función para que el juego la llame cuando inicie
  };
}

/**
 * Props comunes para todos los juegos
 */
export const commonGameProps = {
  setCurrentGame: null // Debe ser pasado por el componente padre
};
