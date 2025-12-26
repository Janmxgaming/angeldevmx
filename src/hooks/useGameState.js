import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Hook para gestionar estadísticas de juegos
 */
export function useGameStats(gameId) {
  const [stats, setStats] = useLocalStorage(`game_stats_${gameId}`, {
    plays: 0,
    wins: 0,
    losses: 0,
    bestScore: 0,
    totalTime: 0,
    achievements: []
  });

  const incrementPlays = useCallback(() => {
    setStats(prev => ({ ...prev, plays: prev.plays + 1 }));
  }, [setStats]);

  const recordWin = useCallback((score = 0, time = 0) => {
    setStats(prev => ({
      ...prev,
      wins: prev.wins + 1,
      bestScore: Math.max(prev.bestScore, score),
      totalTime: prev.totalTime + time
    }));
  }, [setStats]);

  const recordLoss = useCallback(() => {
    setStats(prev => ({ ...prev, losses: prev.losses + 1 }));
  }, [setStats]);

  const updateBestScore = useCallback((score = 0) => {
    setStats(prev => ({ ...prev, bestScore: Math.max(prev.bestScore || 0, score) }));
  }, [setStats]);

  const unlockAchievement = useCallback((achievementId) => {
    setStats(prev => {
      if (!prev.achievements.includes(achievementId)) {
        return {
          ...prev,
          achievements: [...prev.achievements, achievementId]
        };
      }
      return prev;
    });
  }, [setStats]);

  const resetStats = useCallback(() => {
    setStats({
      plays: 0,
      wins: 0,
      losses: 0,
      bestScore: 0,
      totalTime: 0,
      achievements: []
    });
  }, [setStats]);

  return { stats, incrementPlays, recordWin, recordLoss, updateBestScore, unlockAchievement, resetStats };
}

/**
 * Hook para gestionar preferencias del usuario
 */
export function useUserPreferences() {
  const [prefs, setPrefs] = useLocalStorage('user_preferences', {
    soundEnabled: true,
    musicEnabled: true,
    difficulty: 'medium',
    showTutorials: true,
    colorBlindMode: false,
    language: 'es'
  });

  const updatePreference = (key, value) => {
    setPrefs(prev => ({ ...prev, [key]: value }));
  };

  const toggleSound = () => updatePreference('soundEnabled', !prefs.soundEnabled);
  const toggleMusic = () => updatePreference('musicEnabled', !prefs.musicEnabled);
  const toggleTutorials = () => updatePreference('showTutorials', !prefs.showTutorials);

  return { prefs, updatePreference, toggleSound, toggleMusic, toggleTutorials };
}
