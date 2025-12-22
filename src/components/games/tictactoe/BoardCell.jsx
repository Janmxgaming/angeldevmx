import { PLAYER_COLORS } from '../../../constants/theme';
import { getWinningStyle } from '../../../utils/styleHelpers';

/**
 * Celda individual del tablero de TicTacToe
 */
export default function BoardCell({ 
  value, 
  isWinning, 
  onClick, 
  primary, 
  primaryRgba 
}) {
  return (
    <button
      onClick={onClick}
      disabled={!!value}
      className="aspect-square rounded-xl border-4 flex items-center justify-center text-6xl font-bold transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed"
      style={{
        ...getWinningStyle(primaryRgba, isWinning),
        borderColor: isWinning ? primary : '#4b5563',
        color: value === 'X' 
          ? PLAYER_COLORS.X 
          : value === 'O' 
          ? PLAYER_COLORS.O 
          : 'transparent'
      }}
    >
      {value}
    </button>
  );
}
