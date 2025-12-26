import { ArrowLeft, RotateCcw } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTicTacToeGame } from '../../hooks/useTicTacToeGame';
import { GAME_MODES, DIFFICULTY_LEVELS, formatOptionsForSelector } from '../../constants/gameOptions';
import { GradientButton, DangerButton } from '../ui/GameButtons';
import { ScoreBadge, NeutralBadge, BadgeGroup } from '../ui/GameBadges';
import { GameTitle, GameHeader } from '../ui/GameLayout';
import UsernameInput from '../ui/UsernameInput';
import { useLeaderboard, useLeaderboardSubmission, useUsername } from '../../hooks/useGameHelpers';
import LocalLeaderboard from '../ui/LocalLeaderboard';
import { GameContainer, GameControls } from './shared/GameContainer';
import OptionSelector from './shared/OptionSelector';
import TicTacToeBoard from './tictactoe/TicTacToeBoard';
import GameStatus from './tictactoe/GameStatus';

export default function TicTacToeGame({ setCurrentGame }) {
  const { t } = useLanguage();
  
  // Toda la lógica del juego en un custom hook
  const {
    board,
    isXNext,
    winner,
    winningLine,
    gameMode,
    difficulty,
    scores,
    maxStreak,
    handleCellClick,
    setGameMode,
    setDifficulty,
    resetGame,
    resetAll
  } = useTicTacToeGame();

  const { username } = useUsername();
  const { board: leaderboardEntries } = useLeaderboard('tictactoe');
  
  // Enviar score cuando hay victoria (usar wins del jugador como score)
  const playerWins = winner === 'X' ? scores.X : winner === 'O' ? scores.O : 0;
  useLeaderboardSubmission('tictactoe', username, !!winner && winner !== 'draw', playerWins);

  // Opciones formateadas con traducciones
  const modeOptions = formatOptionsForSelector(GAME_MODES, t.ticTacToeGame);
  const difficultyOptions = formatOptionsForSelector(DIFFICULTY_LEVELS, t.ticTacToeGame);

  return (
    <GameContainer>
        
        {/* Header */}
        <GameHeader
          onBack={() => setCurrentGame(null)}
          backLabel={t.ticTacToeGame.backToGames}
        >
          <UsernameInput />
          {gameMode && (
            <BadgeGroup>
              <ScoreBadge label="X" value={scores.X} />
              <ScoreBadge label="O" value={scores.O} />
              <NeutralBadge label={t.ticTacToeGame.draw} value={scores.draws} />
              <ScoreBadge label="Racha Máx" value={maxStreak} />
            </BadgeGroup>
          )}
        </GameHeader>

        {/* Título */}
        <GameTitle>{t.ticTacToeGame.title}</GameTitle>

        {/* Selector de modo */}
        {!gameMode && (
          <OptionSelector
            title={t.ticTacToeGame.selectMode}
            options={modeOptions}
            onSelect={setGameMode}
          />
        )}

        {/* Selector de dificultad */}
        {gameMode === 'pvc' && !difficulty && (
          <OptionSelector
            title={t.ticTacToeGame.selectDifficulty}
            options={difficultyOptions}
            onSelect={setDifficulty}
            columns={3}
          />
        )}

        {/* Juego activo */}
        {((gameMode === 'pvp') || (gameMode === 'pvc' && difficulty)) && (
          <>
            {/* Estado del juego */}
            <div className="text-center mb-8">
              <GameStatus
                winner={winner}
                isXNext={isXNext}
                gameMode={gameMode}
                translations={t.ticTacToeGame}
              />
            </div>

            {/* Tablero */}
            <TicTacToeBoard
              board={board}
              winningLine={winningLine}
              onCellClick={handleCellClick}
            />

            {/* Botones de control */}
            <GameControls>
              <GradientButton onClick={resetGame} icon={RotateCcw}>
                {t.ticTacToeGame.restart}
              </GradientButton>

              <DangerButton onClick={resetAll} icon={ArrowLeft}>
                {t.ticTacToeGame.backToMenu}
              </DangerButton>
            </GameControls>
            <LocalLeaderboard entries={leaderboardEntries} title="TicTacToe - Puntuaciones (local)" />
          </>
        )}
    </GameContainer>
  );
}