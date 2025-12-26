import { RotateCcw, Undo2 } from 'lucide-react';
import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useBottleSortGame } from '../../hooks/useBottleSortGame';
import { useUsername, useLeaderboard, useLeaderboardSubmission, useGameStats } from '../../hooks/useGameHelpers';
import { OutlineButton, DangerButton } from '../ui/GameButtons';
import { ScoreBadge, BadgeGroup } from '../ui/GameBadges';
import { GameTitle, GameHeader } from '../ui/GameLayout';
import { GameContainer, GameControls } from './shared/GameContainer';
import VictoryBanner from './shared/VictoryBanner';
import BottleGrid from './bottlesort/BottleGrid';
import UsernameInput from '../ui/UsernameInput';
import LocalLeaderboard from '../ui/LocalLeaderboard';

export default function BottleSortGame({ setCurrentGame }) {
  const { t } = useLanguage();
  
  const {
    level,
    moves,
    selectedBottle,
    bottles,
    isWon,
    canUndo,
    maxLevel,
    handleBottleClick,
    handleUndo,
    handleRestart,
    nextLevel
  } = useBottleSortGame();

  const { incrementPlays } = useGameStats('bottlesort');
  const { username } = useUsername();
  const { board } = useLeaderboard('bottlesort');
  
  // Incrementar contador solo al iniciar el juego (primera vez que se monta el componente)
  useEffect(() => {
    incrementPlays();
  }, [incrementPlays]);
  
  // Auto-submit cuando gana
  useLeaderboardSubmission('bottlesort', username, isWon, level);

  return (
    <GameContainer>
        
        {/* Header */}
        <GameHeader
          onBack={() => setCurrentGame(null)}
          backLabel={t.bottleGame.backToGames}
        >
          <UsernameInput gameId="bottlesort" />
          <BadgeGroup>
            <ScoreBadge label={t.bottleGame.level} value={level} />
            <ScoreBadge label={t.bottleGame.moves} value={moves} />
            <ScoreBadge label="Nivel Máx" value={maxLevel} />
          </BadgeGroup>
        </GameHeader>

        {/* Título */}
        <GameTitle>{t.bottleGame.title}</GameTitle>

        {/* Victoria */}
        <VictoryBanner
          isVisible={isWon}
          title={t.bottleGame.win}
          message={`${t.bottleGame.winMsg} ${level} • ${t.bottleGame.moves}: ${moves}`}
          onAction={nextLevel}
          actionLabel={`${t.bottleGame.level} ${level + 1} →`}
        />

        {/* Grid de botellas */}
        <BottleGrid
          bottles={bottles}
          selectedBottle={selectedBottle}
          onBottleClick={handleBottleClick}
        />

        {/* Controles */}
        <GameControls>
          <OutlineButton 
            onClick={handleUndo} 
            disabled={!canUndo}
            icon={Undo2}
          >
            {t.bottleGame.undo}
          </OutlineButton>

          <DangerButton onClick={handleRestart} icon={RotateCcw}>
            {t.bottleGame.restart}
          </DangerButton>
        </GameControls>
        <LocalLeaderboard entries={board} title="BottleSort - Puntuaciones (local)" />
    </GameContainer>
  );
}