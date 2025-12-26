import { useLocalStorage } from './useLocalStorage';

const OFFENSIVE_WORDS = [
  'puta', 'puto', 'mierda', 'shit', 'fuck', 'bitch', 'cunt', 'asshole', 'idiot', 'stupid'
];

function containsOffensive(text) {
  if (!text) return false;
  const lower = text.toLowerCase();
  return OFFENSIVE_WORDS.some(word => lower.includes(word));
}

/**
 * Hook para gestionar nombre de usuario con validación
 */
export function useUsername() {
  const [username, setUsernameRaw, removeUsername] = useLocalStorage('player_username', null);

  const isLocked = !!username;

  const setUsername = (value) => {
    if (isLocked) return { ok: false, reason: 'locked' };
    if (!value || typeof value !== 'string') return { ok: false, reason: 'invalid' };
    const trimmed = value.trim().slice(0, 24);
    if (trimmed.length < 2) return { ok: false, reason: 'too_short' };
    if (containsOffensive(trimmed)) return { ok: false, reason: 'offensive' };
    setUsernameRaw(trimmed);
    return { ok: true };
  };

  const clearUsername = () => {
    removeUsername();
  };

  return { username, isLocked, setUsername, clearUsername };
}
