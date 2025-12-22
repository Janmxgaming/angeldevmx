import { useEffect, useState, useCallback } from 'react';

/**
 * Hook para cargar componentes con Lazy Loading y Suspense
 * Mejora el rendimiento al cargar juegos bajo demanda
 */
export function useLazyComponent(importFunction) {
  const [state, setState] = useState(() => ({
    Component: null,
    loading: !!importFunction,
    error: null
  }));

  useEffect(() => {
    if (!importFunction) return;
    
    let cancelled = false;

    importFunction()
      .then(module => {
        if (!cancelled) {
          setState({
            Component: module.default,
            loading: false,
            error: null
          });
        }
      })
      .catch(err => {
        if (!cancelled) {
          console.error('Error loading component:', err);
          setState({
            Component: null,
            loading: false,
            error: err
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [importFunction]);

  return state;
}

/**
 * Hook para persistir datos en localStorage
 * Útil para guardar progreso, preferencias, etc.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      setStoredValue(current => {
        const valueToStore = value instanceof Function ? value(current) : value;
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        return valueToStore;
      });
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

/**
 * Hook para gestionar historial de navegación
 */
export function useNavigationHistory() {
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const navigate = (page) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(page);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      return history[currentIndex - 1];
    }
    return null;
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return history[currentIndex + 1];
    }
    return null;
  };

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex < history.length - 1;

  return { navigate, goBack, goForward, canGoBack, canGoForward, current: history[currentIndex] };
}

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

  return { stats, incrementPlays, recordWin, recordLoss, unlockAchievement, resetStats };
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
