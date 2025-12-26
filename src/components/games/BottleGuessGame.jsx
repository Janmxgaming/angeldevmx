import { Send, RefreshCw } from 'lucide-react';
import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { useBottleGame } from '../../hooks/useBottleGame';
import { GradientButton, DangerButton } from '../ui/GameButtons';
import { ScoreBadge, BadgeGroup } from '../ui/GameBadges';
import { GameTitle, GameSubtitle, GameHeader } from '../ui/GameLayout';
import UsernameInput from '../ui/UsernameInput';
import { useLeaderboard, useUsername, useLeaderboardSubmission, useGameStats } from '../../hooks/useGameHelpers';
import LocalLeaderboard from '../ui/LocalLeaderboard';
import { GameContainer, GameControls } from './shared/GameContainer';
import InfoPanel from './shared/InfoPanel';
import HistoryTracker from './shared/HistoryTracker';
import VictoryBanner from './shared/VictoryBanner';
import CardboardBox from './bottle/CardboardBox';
import DraggableBottle from './bottle/DraggableBottle';

export default function BottleGuessGame({ setCurrentGame }) {
  const { t } = useLanguage();
  const { primary, primaryRgba, primaryRgb } = useThemeStyles();
  
  const {
    bottles,
    userOrder,
    correctCount,
    attempts,
    attemptsHistory,
    isWon,
    showAnswer,
    lastSubmitFeedback,
    totalWins,
    currentStreak: _currentStreak,
    maxStreak,
    initGame,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleSubmit
  } = useBottleGame();

  const { incrementPlays } = useGameStats('bottleguess');
  const { username } = useUsername();
  const { board } = useLeaderboard('bottleguess');
  
  // Incrementar contador solo al iniciar el juego (primera vez que se monta el componente)
  useEffect(() => {
    incrementPlays();
  }, [incrementPlays]);
  
  // Auto-submit cuando gana (usar victorias como score)
  useLeaderboardSubmission('bottleguess', username, isWon, totalWins);

  return (
    <GameContainer>
        
        {/* Header */}
        <GameHeader
          onBack={() => setCurrentGame(null)}
          backLabel={t.bottleGuessGame.backToGames}
        >
          <UsernameInput />
          <BadgeGroup>
            <ScoreBadge label={t.bottleGuessGame.attempts} value={attempts} />
            <ScoreBadge 
              label={t.bottleGuessGame.correct} 
              value={`${correctCount}/${bottles.length}`} 
            />
            <ScoreBadge label={t.common.wins} value={totalWins} />
            <ScoreBadge label={t.common.maxStreak} value={maxStreak} />
          </BadgeGroup>
        </GameHeader>

        {/* Título */}
        <GameTitle>{t.bottleGuessGame.title}</GameTitle>
        <GameSubtitle>{t.bottleGuessGame.instructions}</GameSubtitle>

        {/* Feedback del último intento */}
        <InfoPanel
          isVisible={!isWon && lastSubmitFeedback !== null}
          message={lastSubmitFeedback && `✓ ${lastSubmitFeedback.correct} de ${lastSubmitFeedback.total} correctas`}
          submessage={
            lastSubmitFeedback?.correct === 0 
              ? '¡Sigue intentando!' 
              : lastSubmitFeedback?.correct < lastSubmitFeedback?.total 
              ? '¡Vas por buen camino!' 
              : ''
          }
        />

        {/* Historial de intentos */}
        <HistoryTracker
          isVisible={!isWon}
          title="📊 Historial de Intentos"
          items={attemptsHistory.map(item => ({
            ...item,
            isSuccess: item.correct === bottles.length,
            label: `#${item.attempt}: ${item.correct}/${bottles.length}`
          }))}
        />

        {/* Banner de victoria */}
        <VictoryBanner
          isVisible={isWon}
          title={t.bottleGuessGame.win}
          message={`${t.bottleGuessGame.winMsg} • ${t.bottleGuessGame.attempts}: ${attempts}`}
          onAction={initGame}
          actionLabel={t.bottleGuessGame.tryAgain}
          actionIcon={RefreshCw}
        />

        {/* Caja de cartón con botellas correctas */}
        <CardboardBox
          bottles={bottles}
          isOpen={showAnswer}
          title="Caja Original"
        />

        {/* Área de ordenamiento del usuario */}
        <div>
          <h3 className="text-xl font-bold text-center mb-4" style={{ color: primary }}>
            🎯 {t.bottleGuessGame.dragHint}
          </h3>
          <div 
            className="relative p-8 rounded-2xl border-4 mx-auto max-w-2xl mb-8"
            style={{
              borderColor: primary,
              backgroundColor: `rgba(${primaryRgb}, 0.06)`,
              boxShadow: `0 0 30px ${primaryRgba}`
            }}
          >
            <div className="flex justify-center gap-4">
              {userOrder.map((bottle, index) => (
                <DraggableBottle
                  key={`${bottle.id}-${index}`}
                  bottle={bottle}
                  index={index}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />
              ))}
            </div>
          </div>

          {/* Botones */}
          <GameControls>
            <GradientButton 
              onClick={handleSubmit} 
              icon={Send}
              className={isWon ? 'opacity-50 cursor-not-allowed' : ''}
            >
              {t.bottleGuessGame.submit}
            </GradientButton>

            <DangerButton onClick={initGame} icon={RefreshCw}>
              {t.bottleGuessGame.tryAgain}
            </DangerButton>
          </GameControls>
          <LocalLeaderboard entries={board} title="Bottle Guess - Puntuaciones (local)" />
        </div>
    </GameContainer>
  );
}