import { useState, useCallback, useEffect } from 'react';

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
  [0, 4, 8], [2, 4, 6] // Diagonales
];

/**
 * Custom hook para manejar toda la lógica del juego TicTacToe
 * Incluye: tablero, turnos, IA, victorias, modos de juego
 */
export function useTicTacToeGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);
  const [gameMode, setGameMode] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });

  // Verificar ganador
  const checkWinner = useCallback((squares) => {
    for (let pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: pattern };
      }
    }
    return null;
  }, []);

  // IA: Calcular mejor movimiento
  const getBestMove = useCallback((squares) => {
    const emptySquares = squares
      .map((val, idx) => val === null ? idx : null)
      .filter(val => val !== null);
    
    // Modo FÁCIL: Aleatorio
    if (difficulty === 'easy') {
      return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }
    
    // Modo MEDIO: 50% estratégico
    if (difficulty === 'medium' && Math.random() < 0.5) {
      return emptySquares[Math.floor(Math.random() * emptySquares.length)];
    }
    
    // Modo DIFÍCIL o MEDIO con suerte: Juega óptimamente
    
    // 1. Intenta ganar
    for (let idx of emptySquares) {
      const testBoard = [...squares];
      testBoard[idx] = 'O';
      if (checkWinner(testBoard)?.winner === 'O') return idx;
    }
    
    // 2. Bloquea al jugador
    for (let idx of emptySquares) {
      const testBoard = [...squares];
      testBoard[idx] = 'X';
      if (checkWinner(testBoard)?.winner === 'X') return idx;
    }
    
    // 3. Toma el centro
    if (squares[4] === null) return 4;
    
    // 4. Toma una esquina
    const corners = [0, 2, 6, 8].filter(idx => squares[idx] === null);
    if (corners.length > 0) {
      return corners[Math.floor(Math.random() * corners.length)];
    }
    
    // 5. Toma cualquier espacio
    return emptySquares[0];
  }, [checkWinner, difficulty]);

  // Procesar resultado del movimiento
  const processResult = useCallback((newBoard) => {
    const result = checkWinner(newBoard);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
      setScores(prev => ({ ...prev, [result.winner]: prev[result.winner] + 1 }));
      return true;
    } else if (newBoard.every(square => square !== null)) {
      setWinner('draw');
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));
      return true;
    }
    return false;
  }, [checkWinner]);

  // Manejar click en celda
  const handleCellClick = useCallback((index) => {
    if (board[index] || winner || !gameMode) return;
    if (gameMode === 'pvc' && !isXNext) return;
    
    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    
    if (!processResult(newBoard)) {
      setIsXNext(!isXNext);
    }
  }, [board, winner, gameMode, isXNext, processResult]);

  // Turno de la computadora
  useEffect(() => {
    if (gameMode === 'pvc' && !isXNext && !winner) {
      const timeoutId = setTimeout(() => {
        const move = getBestMove(board);
        if (move !== undefined) {
          const newBoard = [...board];
          newBoard[move] = 'O';
          setBoard(newBoard);
          
          if (!processResult(newBoard)) {
            setIsXNext(true);
          }
        }
      }, 500);
      
      return () => clearTimeout(timeoutId);
    }
  }, [gameMode, isXNext, winner, board, getBestMove, processResult]);

  // Reiniciar juego
  const resetGame = useCallback(() => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setWinningLine(null);
  }, []);

  // Reiniciar todo (incluye modo y scores)
  const resetAll = useCallback(() => {
    resetGame();
    setGameMode(null);
    setDifficulty(null);
    setScores({ X: 0, O: 0, draws: 0 });
  }, [resetGame]);

  return {
    // Estado
    board,
    isXNext,
    winner,
    winningLine,
    gameMode,
    difficulty,
    scores,
    
    // Acciones
    handleCellClick,
    setGameMode,
    setDifficulty,
    resetGame,
    resetAll
  };
}
