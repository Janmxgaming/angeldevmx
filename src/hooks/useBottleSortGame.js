import { useState, useCallback } from 'react';
import { BOTTLE_COLORS } from '../constants/theme';

/**
 * Custom hook para manejar toda la lógica del juego BottleSort
 * Incluye: generación de niveles, movimientos, validaciones, historial
 */
export function useBottleSortGame() {
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(0);
  const [selectedBottle, setSelectedBottle] = useState(null);
  const [history, setHistory] = useState([]);
  const [bottles, setBottles] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [initializedLevel, setInitializedLevel] = useState(0);

  // Genera datos del nivel
  const generateLevelData = useCallback((lvl) => {
    const numColors = Math.min(2 + lvl, 4);
    const bottleCapacity = 4;
    const colorArray = BOTTLE_COLORS.slice(0, numColors);
    
    let allColors = [];
    colorArray.forEach(color => {
      for (let i = 0; i < bottleCapacity; i++) {
        allColors.push(color);
      }
    });
    
    // Shuffle Fisher-Yates
    for (let i = allColors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allColors[i], allColors[j]] = [allColors[j], allColors[i]];
    }
    
    const newBottles = [];
    for (let i = 0; i < numColors; i++) {
      newBottles.push(allColors.slice(i * bottleCapacity, (i + 1) * bottleCapacity));
    }
    newBottles.push([]);
    newBottles.push([]);
    
    return newBottles;
  }, []);

  // Inicializar nivel
  if (initializedLevel !== level) {
    const newBottles = generateLevelData(level);
    setBottles(newBottles);
    setMoves(0);
    setSelectedBottle(null);
    setHistory([]);
    setIsWon(false);
    setInitializedLevel(level);
  }

  // Verificar victoria
  const checkWin = useCallback((btls) => {
    return btls.every(bottle => {
      if (bottle.length === 0) return true;
      if (bottle.length !== 4) return false;
      return bottle.every(color => color === bottle[0]);
    });
  }, []);

  // Manejar click en botella
  const handleBottleClick = useCallback((index) => {
    if (isWon) return;
    
    if (selectedBottle === null) {
      if (bottles[index].length > 0) {
        setSelectedBottle(index);
      }
    } else {
      if (selectedBottle === index) {
        setSelectedBottle(null);
        return;
      }
      
      const fromBottle = bottles[selectedBottle];
      const toBottle = bottles[index];
      
      // Validaciones
      if (fromBottle.length === 0 || toBottle.length >= 4) {
        setSelectedBottle(null);
        return;
      }
      
      if (toBottle.length > 0 && toBottle[toBottle.length - 1] !== fromBottle[fromBottle.length - 1]) {
        setSelectedBottle(null);
        return;
      }
      
      // Realizar movimiento
      const newBottles = bottles.map(b => [...b]);
      const colorToMove = newBottles[selectedBottle].pop();
      newBottles[index].push(colorToMove);
      
      setHistory([...history, bottles]);
      setBottles(newBottles);
      setMoves(moves + 1);
      setSelectedBottle(null);
      
      // Verificar victoria
      if (checkWin(newBottles)) {
        setIsWon(true);
      }
    }
  }, [bottles, selectedBottle, isWon, history, moves, checkWin]);

  // Deshacer movimiento
  const handleUndo = useCallback(() => {
    if (history.length > 0) {
      const prevState = history[history.length - 1];
      setBottles(prevState);
      setHistory(history.slice(0, -1));
      setMoves(Math.max(0, moves - 1));
      setSelectedBottle(null);
    }
  }, [history, moves]);

  // Reiniciar nivel
  const handleRestart = useCallback(() => {
    const newBottles = generateLevelData(level);
    setBottles(newBottles);
    setMoves(0);
    setSelectedBottle(null);
    setHistory([]);
    setIsWon(false);
  }, [level, generateLevelData]);

  // Siguiente nivel
  const nextLevel = useCallback(() => {
    setLevel(level + 1);
  }, [level]);

  return {
    // Estado
    level,
    moves,
    selectedBottle,
    bottles,
    isWon,
    canUndo: history.length > 0,
    
    // Acciones
    handleBottleClick,
    handleUndo,
    handleRestart,
    nextLevel
  };
}
