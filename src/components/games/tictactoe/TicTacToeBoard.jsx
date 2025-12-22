import { useThemeStyles } from '../../../hooks/useThemeStyles';
import BoardCell from './BoardCell';

/**
 * Tablero completo de TicTacToe (3x3)
 */
export default function TicTacToeBoard({ board, winningLine, onCellClick }) {
  const { primary, primaryRgba } = useThemeStyles();

  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="grid grid-cols-3 gap-4">
        {board.map((value, index) => (
          <BoardCell
            key={index}
            value={value}
            isWinning={winningLine?.includes(index)}
            onClick={() => onCellClick(index)}
            primary={primary}
            primaryRgba={primaryRgba}
          />
        ))}
      </div>
    </div>
  );
}
