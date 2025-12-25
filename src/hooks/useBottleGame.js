import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getColorSet } from '../constants/theme';
import { useLocalStorage } from './useGameHelpers';

const BOTTLES_PER_GAME = 4;

/**
 * Hook personalizado para manejar la lógica del juego de botellas
 * Ahora incluye sistema de victorias y rachas
 */
export function useBottleGame() {
  const { language } = useLanguage();
  
  const [bottles, setBottles] = useState([]);
  const [userOrder, setUserOrder] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [attemptsHistory, setAttemptsHistory] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [lastSubmitFeedback, setLastSubmitFeedback] = useState(null);
  
  // Sistema de victorias y rachas
  const [totalWins, setTotalWins] = useLocalStorage('bottleguess_wins', 0);
  const [currentStreak, setCurrentStreak] = useLocalStorage('bottleguess_current_streak', 0);
  const [maxStreak, setMaxStreak] = useLocalStorage('bottleguess_max_streak', 0);

  // Obtener colores del sistema centralizado
  const colors = getColorSet('basic', 5).map(color => ({
    id: color.id,
    color: color.hex,
    capColor: color.dark,
    name: color.name[language] || color.name.es
  }));

  // Inicializar juego
  const initGame = useCallback(() => {
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, BOTTLES_PER_GAME);
    
    setBottles(selected);
    setUserOrder([...selected].sort(() => Math.random() - 0.5));
    setCorrectCount(0);
    setAttempts(0);
    setAttemptsHistory([]);
    setIsWon(false);
    setShowAnswer(false);
    setLastSubmitFeedback(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Drag & Drop handlers
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null) return;
    
    const newOrder = [...userOrder];
    const draggedItem = newOrder[draggedIndex];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(dropIndex, 0, draggedItem);
    
    setUserOrder(newOrder);
    setDraggedIndex(null);
  };

  // Verificar respuesta
  const handleSubmit = () => {
    let correct = 0;
    userOrder.forEach((bottle, index) => {
      if (bottle.id === bottles[index].id) {
        correct++;
      }
    });
    
    const newAttempt = attempts + 1;
    setCorrectCount(correct);
    setAttempts(newAttempt);
    setAttemptsHistory([...attemptsHistory, { attempt: newAttempt, correct }]);
    setLastSubmitFeedback({ correct, total: bottles.length });
    
    if (correct === bottles.length) {
      setIsWon(true);
      setShowAnswer(true);
      
      // Actualizar estadísticas de victorias y rachas
      const newWins = totalWins + 1;
      const newStreak = currentStreak + 1;
      setTotalWins(newWins);
      setCurrentStreak(newStreak);
      
      if (newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }
    } else if (correct === 0 && newAttempt > 1) {
      // Si falló completamente, resetear racha actual
      setCurrentStreak(0);
    }
  };
  
  // Reiniciar juego (mantiene estadísticas pero resetea el juego actual)
  const resetGame = () => {
    initGame();
  };

  return {
    // Estado
    bottles,
    userOrder,
    correctCount,
    attempts,
    attemptsHistory,
    isWon,
    showAnswer,
    lastSubmitFeedback,
    
    // Estadísticas
    totalWins,
    currentStreak,
    maxStreak,
    
    // Acciones
    initGame,
    resetGame,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleSubmit
  };
}
