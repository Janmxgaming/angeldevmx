import { useState, useEffect, useCallback, useRef } from 'react';
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
      const normalizedUsername = entry.username?.toLowerCase().trim();
      
      // Buscar si el usuario ya tiene una entrada (case-insensitive)
      const existingEntry = board.find(
        item => item.username?.toLowerCase().trim() === normalizedUsername
      );

      // Si existe y la nueva puntuación NO es mayor, no hacer nada
      if (existingEntry && entry.score <= existingEntry.score) {
        console.log(`Score ${entry.score} not higher than existing ${existingEntry.score} for ${entry.username}`);
        return false;
      }

      let next;
      if (existingEntry) {
        // Actualizar solo la puntuación y fecha de la entrada existente
        next = board.map(item => 
          item.username?.toLowerCase().trim() === normalizedUsername
            ? { ...item, score: entry.score, date: Date.now() }
            : item
        );
        console.log(`Updated score for ${entry.username}: ${existingEntry.score} -> ${entry.score}`);
      } else {
        // Crear nueva entrada solo si no existe
        const newEntry = { 
          ...entry, 
          date: Date.now(),
          id: `${entry.username}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        };
        next = [...board, newEntry];
        console.log(`New entry created for ${entry.username}: ${entry.score}`);
      }
      
      // Ordenar por puntuación y mantener solo top 50
      next = next
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

  // Función para limpiar duplicados manteniendo solo la mejor puntuación por usuario
  const removeDuplicates = useCallback(async () => {
    // Limpiar localmente
    const uniqueEntries = new Map();
    
    board.forEach(entry => {
      const username = entry.username?.toLowerCase().trim();
      if (!username) return;
      
      const existing = uniqueEntries.get(username);
      if (!existing || entry.score > existing.score) {
        uniqueEntries.set(username, entry);
      }
    });
    
    const cleaned = Array.from(uniqueEntries.values())
      .sort((a, b) => (b.score || 0) - (a.score || 0));
    
    setBoard(cleaned);
    console.log(`Cleaned local leaderboard: ${board.length} -> ${cleaned.length} entries`);

    // También limpiar en el servidor si está disponible
    if (serverAvailable) {
      try {
        const api = await import('../services/leaderboardAPI');
        const result = await api.deduplicateLeaderboard(gameId);
        console.log('Server deduplicated:', result);
        // Resincronizar desde el servidor
        await syncFromServer();
      } catch (error) {
        console.warn('Failed to deduplicate on server:', error);
      }
    }
  }, [board, setBoard, gameId, serverAvailable, syncFromServer]);

  return { board, submitScore, clearBoard, removeDuplicates, serverAvailable, syncing, syncFromServer };
}

/**
 * Hook simple para obtener solo los usernames del leaderboard
 * Útil para validación de nombres duplicados
 */
export function useLeaderboardUsernames(gameId = 'global') {
  const { board } = useLeaderboard(gameId);
  return board.map(entry => entry.username).filter(Boolean);
}

/**
 * Hook para envío automático al leaderboard cuando termina un juego
 * IMPORTANTE: Solo envía una vez cuando condition cambia de false a true
 */
export function useLeaderboardSubmission(gameId, username, condition, score) {
  const { submitScore } = useLeaderboard(gameId);
  const hasSubmitted = useRef(false);
  const prevCondition = useRef(false);
  
  useEffect(() => {
    // Solo enviar cuando condition cambia de false a true (primera victoria)
    if (condition && !prevCondition.current && !hasSubmitted.current && score !== null && score !== undefined) {
      submitScore({ 
        username: username || 'Anon', 
        score 
      });
      hasSubmitted.current = true;
    }
    prevCondition.current = condition;
  }, [condition, score, username, submitScore]);
  
  // Reset cuando se reinicia el juego (condition vuelve a false)
  useEffect(() => {
    if (!condition) {
      hasSubmitted.current = false;
    }
  }, [condition]);
}
