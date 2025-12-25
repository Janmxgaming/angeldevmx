import { RotateCcw, Undo2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useBottleSortGame } from '../../hooks/useBottleSortGame';
import { OutlineButton, DangerButton } from '../ui/GameButtons';
import { ScoreBadge, BadgeGroup } from '../ui/GameBadges';
import { GameTitle, GameHeader } from '../ui/GameLayout';
import { GameContainer, GameControls } from './shared/GameContainer';
import VictoryBanner from './shared/VictoryBanner';
import BottleGrid from './bottlesort/BottleGrid';

export default function BottleSortGame({ setCurrentGame }) {
  const { t } = useLanguage();
  
  // Toda la lógica del juego en un custom hook
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

  return (
    <GameContainer>
        
        {/* Header */}
        <GameHeader
          onBack={() => setCurrentGame(null)}
          backLabel={t.bottleGame.backToGames}
        >
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
    </GameContainer>
  );
}