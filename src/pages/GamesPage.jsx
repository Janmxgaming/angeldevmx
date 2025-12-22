import { useLanguage } from '../context/LanguageContext';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { getTitleStyle, getDividerStyle } from '../utils/styleHelpers';
import GameCard from '../components/ui/GameCard';
import { getEnabledGames, GAME_REGISTRY } from '../config/games';

export default function GamesPage({ setCurrentGame }) {
  const { t, theme } = useLanguage();
  const { primary, primaryRgba, gradient } = useThemeStyles();
  
  // Obtener juegos desde el registro (incluye disponibles y no disponibles)
  const allGames = Object.values(GAME_REGISTRY).map(game => ({
    id: game.id,
    name: t.games[game.id] || game.id,
    available: game.enabled,
    icon: game.meta.icon,
    category: game.category,
    difficulty: game.difficulty
  }));

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Título */}
        <div className="text-center mb-12" key={theme}>
          <h1 
            className="text-5xl md:text-6xl font-bold mb-4 transition-all duration-500"
            style={getTitleStyle(gradient, primaryRgba)}
          >
            {t.games.title}
          </h1>
          <div 
            className="w-24 h-1 rounded-full mx-auto transition-all duration-500"
            style={getDividerStyle(primary, primaryRgba)}
          />
        </div>
        
        {/* Grid de juegos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allGames.map(game => (
            <GameCard 
              key={game.id}
              game={game}
              onPlay={setCurrentGame}
              translations={t.games}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
}