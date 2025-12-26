import { useThemeStyles } from '../../../hooks/useThemeStyles';

/**
 * Panel de estado del juego (turno actual o resultado)
 */
export default function GameStatus({ winner, isXNext, gameMode, translations }) {
  const { primary, primaryRgba: _primaryRgba, primaryRgb } = useThemeStyles();

  if (winner) {
    return (
      <div 
        className="p-6 rounded-2xl border-2 animate-pulse inline-block"
        style={{
          backgroundColor: `rgba(${primaryRgb}, 0.2)`,
          borderColor: primary,
          boxShadow: `0 0 30px rgba(${primaryRgb}, 0.5)`
        }}
      >
        <p className="text-3xl font-bold" style={{ color: primary }}>
          {winner === 'draw' 
            ? `¡${translations.draw}!` 
            : `¡${translations.winner}: ${winner}!`
          }
        </p>
      </div>
    );
  }

  return (
    <p className="text-2xl font-bold" style={{ color: primary }}>
      {translations.turn}: {isXNext ? 'X' : 'O'}
      {gameMode === 'pvc' && !isXNext && ` (${translations.computer})`}
    </p>
  );
}
