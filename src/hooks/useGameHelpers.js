import { useEffect, useState } from 'react';

/**
 * Hook para cargar componentes con Lazy Loading
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

// Re-export hooks from their new locations for backward compatibility
export { useLocalStorage } from './useLocalStorage';
export { useGameStats, useUserPreferences } from './useGameState';
export { useUsername } from './useUsername';
export { useLeaderboard, useLeaderboardSubmission, useLeaderboardUsernames } from './useLeaderboard';

