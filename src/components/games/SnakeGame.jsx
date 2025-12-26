import { useEffect } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, ArrowUp, ArrowDown, ArrowLeftIcon, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useSnakeGame } from '../../hooks/useSnakeGame';
import { useGameStats, useUsername, useLeaderboard, useLeaderboardSubmission } from '../../hooks/useGameHelpers';
import { ScoreBadge, BadgeGroup } from '../ui/GameBadges';
import { GameTitle, GameHeader } from '../ui/GameLayout';
import { GameContainer } from './shared/GameContainer';
import UsernameInput from '../ui/UsernameInput';
import LocalLeaderboard from '../ui/LocalLeaderboard';

export default function SnakeGame({ setCurrentGame }) {
  const { t } = useLanguage();
  const {
    snake,
    food,
    score,
    gameState,
    gridSize,
    startGame,
    resetGame,
    togglePause,
    changeDirection,
    directions
  } = useSnakeGame();

  const { stats, incrementPlays, updateBestScore } = useGameStats('snake');
  const { username } = useUsername();
  const { board: leaderboardEntries } = useLeaderboard('snake');

  // Incrementar contador al iniciar
  useEffect(() => {
    if (gameState === 'playing') {
      incrementPlays();
    }
  }, [gameState, incrementPlays]);

  // Actualizar mejor score cuando termine
  useEffect(() => {
    if (gameState === 'gameover' && score > 0) {
      updateBestScore(score);
    }
  }, [gameState, score, updateBestScore]);

  // Auto-submit al leaderboard
  useLeaderboardSubmission('snake', username, gameState === 'gameover', score);

  // Colores retro Nokia
  const nokiaGreen = '#9cb84a';
  const nokiaBackground = '#839f4e';
  const nokiaScreen = '#c9de9b';
  const nokiaDark = '#2d3a1f';

  const cellSize = 20; // px
  const gridPixelSize = gridSize * cellSize;

  return (
    <GameContainer
      backLabel={t.games.backToGames}
      onBack={() => setCurrentGame(null)}
    >
      <GameHeader>
        <BadgeGroup>
          <ScoreBadge label={t.snake.score} value={score} />
          <ScoreBadge label={t.snake.bestScore} value={stats.bestScore || 0} />
          <ScoreBadge label={t.common.plays} value={stats.plays || 0} />
        </BadgeGroup>
      </GameHeader>

      <GameTitle>{t.snake.title}</GameTitle>

      {/* Nokia Screen Container */}
      <div 
        className="mx-auto p-8 rounded-3xl shadow-2xl"
        style={{
          background: `linear-gradient(135deg, ${nokiaGreen} 0%, ${nokiaBackground} 100%)`,
          maxWidth: 'fit-content'
        }}
      >
        {/* Screen */}
        <div 
          className="relative rounded-lg shadow-inner p-4"
          style={{
            backgroundColor: nokiaScreen,
            width: gridPixelSize + 32,
            height: gridPixelSize + 32
          }}
        >
          {/* Game Grid */}
          <div 
            className="relative mx-auto border-2"
            style={{
              width: gridPixelSize,
              height: gridPixelSize,
              backgroundColor: nokiaBackground,
              borderColor: nokiaDark,
              imageRendering: 'pixelated'
            }}
          >
            {/* Snake */}
            {snake.map((segment, index) => (
              <div
                key={`snake-${index}`}
                className="absolute transition-all duration-75"
                style={{
                  left: segment.x * cellSize,
                  top: segment.y * cellSize,
                  width: cellSize - 2,
                  height: cellSize - 2,
                  backgroundColor: nokiaDark,
                  borderRadius: index === 0 ? '3px' : '2px',
                  border: index === 0 ? `2px solid ${nokiaDark}` : 'none'
                }}
              />
            ))}

            {/* Food */}
            {food && (
              <div
                className="absolute animate-pulse"
                style={{
                  left: food.x * cellSize,
                  top: food.y * cellSize,
                  width: cellSize - 2,
                  height: cellSize - 2,
                  backgroundColor: nokiaDark,
                  borderRadius: '50%'
                }}
              />
            )}

            {/* Overlay - Idle */}
            {gameState === 'idle' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-6xl mb-4">🐍</div>
                  <button
                    onClick={startGame}
                    className="px-8 py-4 text-xl font-bold rounded-lg transition-transform hover:scale-105 flex items-center gap-2 mx-auto"
                    style={{
                      backgroundColor: nokiaDark,
                      color: nokiaScreen
                    }}
                  >
                    <Play size={24} />
                    {t.snake.startGame}
                  </button>
                  <p className="mt-4 text-xs" style={{ color: nokiaDark }}>
                    {t.snake.controls}
                  </p>
                </div>
              </div>
            )}

            {/* Overlay - Paused */}
            {gameState === 'paused' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-6xl mb-4">⏸️</div>
                  <p className="text-2xl font-bold mb-4" style={{ color: nokiaDark }}>
                    {t.snake.paused}
                  </p>
                  <button
                    onClick={togglePause}
                    className="px-6 py-3 font-bold rounded-lg transition-transform hover:scale-105"
                    style={{
                      backgroundColor: nokiaDark,
                      color: nokiaScreen
                    }}
                  >
                    {t.snake.resume}
                  </button>
                </div>
              </div>
            )}

            {/* Overlay - Game Over */}
            {gameState === 'gameover' && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-6xl mb-4">💀</div>
                  <p className="text-2xl font-bold mb-2" style={{ color: nokiaScreen }}>
                    {t.snake.gameOver}
                  </p>
                  <p className="text-xl mb-4" style={{ color: nokiaScreen }}>
                    {t.snake.finalScore}: {score}
                  </p>
                  <button
                    onClick={resetGame}
                    className="px-6 py-3 font-bold rounded-lg transition-transform hover:scale-105 flex items-center gap-2 mx-auto"
                    style={{
                      backgroundColor: nokiaScreen,
                      color: nokiaDark
                    }}
                  >
                    <RotateCcw size={20} />
                    {t.snake.playAgain}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Score Display bajo la pantalla */}
          <div className="mt-4 text-center font-mono" style={{ color: nokiaDark }}>
            <div className="text-sm font-bold">{t.snake.score.toUpperCase()}</div>
            <div className="text-3xl font-bold tracking-wider">{score.toString().padStart(4, '0')}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-6">
          {/* D-Pad Controls */}
          <div className="flex flex-col items-center gap-2 mb-4">
            <button
              onClick={() => changeDirection(directions.UP)}
              disabled={gameState !== 'playing'}
              className="p-3 rounded-lg disabled:opacity-30 hover:scale-110 transition-transform"
              style={{ backgroundColor: nokiaDark, color: nokiaScreen }}
            >
              <ArrowUp size={24} />
            </button>
            <div className="flex gap-2">
              <button
                onClick={() => changeDirection(directions.LEFT)}
                disabled={gameState !== 'playing'}
                className="p-3 rounded-lg disabled:opacity-30 hover:scale-110 transition-transform"
                style={{ backgroundColor: nokiaDark, color: nokiaScreen }}
              >
                <ArrowLeftIcon size={24} />
              </button>
              <button
                onClick={() => changeDirection(directions.DOWN)}
                disabled={gameState !== 'playing'}
                className="p-3 rounded-lg disabled:opacity-30 hover:scale-110 transition-transform"
                style={{ backgroundColor: nokiaDark, color: nokiaScreen }}
              >
                <ArrowDown size={24} />
              </button>
              <button
                onClick={() => changeDirection(directions.RIGHT)}
                disabled={gameState !== 'playing'}
                className="p-3 rounded-lg disabled:opacity-30 hover:scale-110 transition-transform"
                style={{ backgroundColor: nokiaDark, color: nokiaScreen }}
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            {gameState === 'playing' && (
              <button
                onClick={togglePause}
                className="px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center gap-2"
                style={{ backgroundColor: nokiaDark, color: nokiaScreen }}
              >
                <Pause size={16} />
                {t.snake.pause}
              </button>
            )}
            {gameState !== 'idle' && (
              <button
                onClick={resetGame}
                className="px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform flex items-center gap-2"
                style={{ backgroundColor: nokiaDark, color: nokiaScreen }}
              >
                <RotateCcw size={16} />
                {t.snake.restart}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-6 text-center text-sm text-gray-400">
        <p>{t.snake.instructions}</p>
        <p className="mt-2 text-xs">
          {t.snake.keyboardHint}
        </p>
      </div>

      {/* Username & Leaderboard */}
      <div className="mt-8">
        <UsernameInput gameId="snake" />
        <LocalLeaderboard entries={leaderboardEntries} />
      </div>
    </GameContainer>
  );
}
