/**
 * Servicio de API para leaderboard con backend Node.js
 */

const API_URL = import.meta.env.VITE_LEADERBOARD_API || 'http://localhost:3001/api/leaderboard';
const HEALTH_URL = 'http://localhost:3001/api/health';

// Helper para manejar respuestas HTTP
async function handleResponse(response) {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Helper para manejar errores
function handleError(error, message) {
  console.error(message, error);
  throw error;
}

/**
 * Enviar puntuación al servidor
 */
export async function submitScoreToServer(gameId, username, score) {
  try {
    const response = await fetch(`${API_URL}/${gameId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, score })
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error, 'Error submitting score to server:');
  }
}

/**
 * Obtener top puntuaciones del servidor
 */
export async function fetchTopScoresFromServer(gameId) {
  try {
    const response = await fetch(`${API_URL}/${gameId}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error, 'Error fetching scores from server:');
  }
}

/**
 * Verificar disponibilidad del servidor
 */
export async function isServerAvailable() {
  try {
    const response = await fetch(HEALTH_URL, {
      method: 'GET',
      mode: 'cors'
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Limpiar duplicados en el leaderboard del servidor
 */
export async function deduplicateLeaderboard(gameId) {
  try {
    const response = await fetch(`${API_URL}/${gameId}/deduplicate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error, 'Error deduplicating leaderboard:');
  }
}
