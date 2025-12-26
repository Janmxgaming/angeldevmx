/**
 * Helper para reducir boilerplate en componentes de juegos
 */

import { useEffect } from 'react';
import { useLanguage } from '@context/LanguageContext';
import { useGameStats, useLeaderboard, useUsername, useLeaderboardSubmission } from '@hooks';

/**
 * Hook que agrupa toda la lógica común de juegos
 */
export function useGameCommon(gameId, hasWon, score) {
  const { t, lang } = useLanguage();
  const { incrementPlays } = useGameStats(gameId);
  const { username } = useUsername();
  const { board: leaderboardEntries } = useLeaderboard(gameId);
  
  useEffect(() => {
    incrementPlays();
  }, [incrementPlays]);

  // Auto-submit al leaderboard cuando se gana
  useLeaderboardSubmission(gameId, username, hasWon, score);

  return {
    t,
    lang,
    username,
    leaderboardEntries
  };
}

/**
 * Props comunes para todos los juegos
 */
export const commonGameProps = {
  setCurrentGame: null // Debe ser pasado por el componente padre
};
