import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getColorSet } from '../constants/theme';

const BOTTLES_PER_GAME = 4;

/**
 * Hook personalizado para manejar la lógica del juego de botellas
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
    }
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
    
    // Acciones
    initGame,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleSubmit
  };
}
