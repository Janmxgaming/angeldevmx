import { useThemeStyles } from '../../hooks/useThemeStyles';

export default function GameCard({ game, onPlay, translations, theme }) {
  const isNeon = theme === 'neon';
  const { primary: primaryColor, primaryRgba: _primaryRgba, primaryRgb } = useThemeStyles();
  
  return (
    <div
      className={`relative group transition-all duration-300 ${game.available ? 'cursor-pointer' : 'cursor-not-allowed'}`}
      onClick={() => game.available && onPlay(game.id)}
    >
      <div 
        className={`p-8 rounded-2xl border-2 transition-all duration-500 ${
          game.available
            ? 'bg-gray-800/50 backdrop-blur-sm hover:-translate-y-2'
            : 'bg-gray-800/30 opacity-50'
        }`}
        style={{
          borderColor: game.available 
            ? `rgba(${primaryRgb}, 0.3)` 
            : 'rgba(75, 85, 99, 0.3)',
          boxShadow: game.available 
            ? `0 0 0 rgba(${primaryRgb}, 0)`
            : 'none'
        }}
        onMouseEnter={(e) => {
          if (game.available) {
            e.currentTarget.style.borderColor = primaryColor;
            e.currentTarget.style.boxShadow = `0 0 30px rgba(${primaryRgb}, 0.5)`;
          }
        }}
        onMouseLeave={(e) => {
          if (game.available) {
            e.currentTarget.style.borderColor = `rgba(${primaryRgb}, 0.3)`;
            e.currentTarget.style.boxShadow = `0 0 0 rgba(${primaryRgb}, 0)`;
          }
        }}
      >
        <div className="text-6xl mb-4 text-center filter drop-shadow-lg">{game.icon}</div>
        <h3 className="text-2xl font-bold text-center text-white mb-4">{game.name}</h3>
        
        {game.available ? (
          <button 
            className="w-full py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            style={{
              background: `linear-gradient(to right, ${primaryColor}, ${isNeon ? '#00cc33' : '#0284C7'})`,
              color: isNeon ? '#000' : '#fff',
              boxShadow: `0 0 20px rgba(${primaryRgb}, 0.5)`
            }}
          >
            {translations.play} →
          </button>
        ) : (
          <div className="w-full py-3 rounded-lg bg-gray-700 text-gray-400 font-semibold text-center">
            {translations.comingSoon}
          </div>
        )}
      </div>
    </div>
  );
}