import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

/**
 * Hook para leaderboard con soporte local y servidor
 */
export function useLeaderboard(gameId = 'global') {
  const key = `leaderboard_${gameId}`;
  const [board, setBoard] = useLocalStorage(key, []);
  const [serverAvailable, setServerAvailable] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const syncFromServer = useCallback(async () => {
    if (!serverAvailable) return;
    setSyncing(true);
    try {
      const api = await import('../services/leaderboardAPI');
      const serverScores = await api.fetchTopScoresFromServer(gameId, 50);
      setBoard(serverScores);
    } catch (error) {
      console.error('Failed to sync from server:', error);
    } finally {
      setSyncing(false);
    }
  }, [gameId, serverAvailable, setBoard]);

  useEffect(() => {
    async function checkServer() {
      try {
        const api = await import('../services/leaderboardAPI');
        const available = await api.isServerAvailable();
        setServerAvailable(available);
        if (available) {
          syncFromServer();
        }
      } catch {
        setServerAvailable(false);
      }
    }
    checkServer();
  }, [gameId, syncFromServer]);

  const submitScore = useCallback(async (entry) => {
    try {
      const newEntry = { 
        ...entry, 
        date: Date.now(),
        id: `${entry.username}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      };
      
      const next = [...board, newEntry]
        .sort((a, b) => (b.score || 0) - (a.score || 0))
        .slice(0, 50);
      setBoard(next);

      if (serverAvailable) {
        try {
          const api = await import('../services/leaderboardAPI');
          await api.submitScoreToServer(gameId, entry.username, entry.score);
          await syncFromServer();
        } catch (error) {
          console.warn('Failed to submit to server, keeping local only:', error);
        }
      }

      return true;
    } catch (error) {
      console.error('Failed to submit score', error);
      return false;
    }
  }, [board, setBoard, gameId, serverAvailable, syncFromServer]);

  const clearBoard = useCallback(() => setBoard([]), [setBoard]);

  return { board, submitScore, clearBoard, serverAvailable, syncing, syncFromServer };
}

/**
 * Hook para envío automático al leaderboard cuando termina un juego
 */
export function useLeaderboardSubmission(gameId, username, condition, score) {
  const { submitScore } = useLeaderboard(gameId);
  
  useEffect(() => {
    if (condition && score !== null && score !== undefined) {
      submitScore({ 
        username: username || 'Anon', 
        score 
      });
    }
  }, [condition, score, username, submitScore]);
}
