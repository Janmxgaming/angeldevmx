import React from 'react';
import { Trophy, Medal, Award, Globe, RefreshCw } from 'lucide-react';

const getRankIcon = (rank) => {
  switch (rank) {
    case 1: return <Trophy size={16} className="text-yellow-400" />;
    case 2: return <Medal size={16} className="text-gray-300" />;
    case 3: return <Award size={16} className="text-amber-600" />;
    default: return null;
  }
};

const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Ahora';
  if (diffMins < 60) return `Hace ${diffMins}m`;
  if (diffHours < 24) return `Hace ${diffHours}h`;
  if (diffDays < 7) return `Hace ${diffDays}d`;
  return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
};

export default function LocalLeaderboard({ 
  entries = [], 
  title = 'Leaderboard', 
  limit = 10,
  showRank = true,
  showDate = true,
  serverAvailable = false,
  syncing = false,
  onSync = null
}) {
  const list = entries.slice(0, limit);
  
  if (list.length === 0) {
    return (
      <div className="bg-gray-800/40 rounded-lg p-4 mt-4 text-center">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-bold text-white flex items-center gap-2">
            <Trophy size={18} className="text-yellow-400" />
            {title}
          </h4>
          {serverAvailable && (
            <div className="flex items-center gap-1 text-xs text-green-400">
              <Globe size={12} />
              <span>Público</span>
            </div>
          )}
        </div>
        <div className="text-gray-400 text-sm py-4">
          <Trophy size={24} className="mx-auto mb-2 opacity-50" />
          <p>Nadie aún. ¡Sé el primero!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/40 rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-white flex items-center gap-2">
          <Trophy size={18} className="text-yellow-400" />
          {title}
        </h4>
        <div className="flex items-center gap-2">
          {serverAvailable && (
            <div className="flex items-center gap-1 text-xs text-green-400">
              <Globe size={12} />
              <span>Público</span>
            </div>
          )}
          {onSync && (
            <button
              onClick={onSync}
              disabled={syncing}
              className="p-1 hover:bg-gray-700/50 rounded transition-colors disabled:opacity-50"
              title="Sincronizar con servidor"
            >
              <RefreshCw size={14} className={`text-gray-400 ${syncing ? 'animate-spin' : ''}`} />
            </button>
          )}
        </div>
      </div>
      <div className="space-y-2">
        {list.map((entry, idx) => {
          const rank = idx + 1;
          const isTopThree = rank <= 3;
          
          return (
            <div
              key={entry.id || idx}
              className={`flex items-center justify-between p-2 rounded transition-colors ${
                isTopThree ? 'bg-gray-700/50' : 'bg-gray-800/30'
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                {showRank && (
                  <div className="flex items-center justify-center w-6">
                    {getRankIcon(rank) || (
                      <span className="text-gray-500 text-sm font-semibold">#{rank}</span>
                    )}
                  </div>
                )}
                <div className="flex-1">
                  <span className={`text-sm font-medium ${
                    isTopThree ? 'text-white' : 'text-gray-300'
                  }`}>
                    {entry.username || 'Anon'}
                  </span>
                  {showDate && entry.date && (
                    <p className="text-xs text-gray-500">{formatDate(entry.date)}</p>
                  )}
                </div>
              </div>
              <span className={`font-bold text-sm ${
                rank === 1 ? 'text-yellow-400' :
                rank === 2 ? 'text-gray-300' :
                rank === 3 ? 'text-amber-600' :
                'text-cyan-400'
              }`}>
                {entry.score}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
