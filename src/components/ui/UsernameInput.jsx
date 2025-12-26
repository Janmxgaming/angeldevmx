import { useState } from 'react';
import { useUsername } from '../../hooks/useGameHelpers';
import { useLanguage } from '../../context/LanguageContext';
import { useLeaderboardUsernames } from '../../hooks/useLeaderboard';

export default function UsernameInput({ className = '', gameId = 'global' }) {
  const existingUsernames = useLeaderboardUsernames(gameId);
  const { username, isLocked, setUsername } = useUsername(existingUsernames);
  const { t } = useLanguage();
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e && e.preventDefault();
    setError(null);
    const res = setUsername(value);
    if (!res.ok) {
      if (res.reason === 'offensive') setError(t.username.errorOffensive);
      else if (res.reason === 'too_short') setError(t.username.errorTooShort);
      else if (res.reason === 'locked') setError(t.username.errorLocked);
      else if (res.reason === 'already_taken') setError(t.username.errorAlreadyTaken);
      else setError(t.username.errorInvalid);
      return;
    }
    // success: input will become locked by hook state update
  };

  if (isLocked) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-sm text-gray-300">{t.username.player}:</span>
        <span className="font-semibold text-white">{username}</span>
        <small className="ml-2 text-xs text-gray-400">{t.username.locked}</small>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className}`}> 
      <input
        aria-label="username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t.username.enterName}
        className="px-3 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400"
      />
      <button
        type="submit"
        className="px-3 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md"
      >
        {t.username.save}
      </button>
      {error && <div className="text-xs text-red-400 ml-2">{error}</div>}
    </form>
  );
}
