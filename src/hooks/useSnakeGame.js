import { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20; // 20x20 grid
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 }; // Derecha
const INITIAL_SPEED = 150; // ms

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 }
};

/**
 * Hook personalizado para manejar la lógica del juego Snake
 */
export function useSnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState('idle'); // idle, playing, paused, gameover
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  
  const directionRef = useRef(direction);
  const gameLoopRef = useRef(null);

  // Generar comida en posición aleatoria
  const generateFood = useCallback((currentSnake) => {
    let newFood;
    let isOnSnake = true;
    
    while (isOnSnake) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      
      isOnSnake = currentSnake.some(
        segment => segment.x === newFood.x && segment.y === newFood.y
      );
    }
    
    return newFood;
  }, []);

  // Verificar colisión con paredes o con sí mismo
  const checkCollision = useCallback((head, currentSnake) => {
    // Colisión con paredes
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    
    // Colisión consigo mismo
    return currentSnake.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  // Mover la serpiente
  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + directionRef.current.x,
        y: head.y + directionRef.current.y
      };

      // Verificar colisión
      if (checkCollision(newHead, prevSnake)) {
        setGameState('gameover');
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Verificar si comió
      if (food && newHead.x === food.x && newHead.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood(newSnake));
        
        // Aumentar velocidad cada 5 comidas
        if ((score + 10) % 50 === 0 && speed > 50) {
          setSpeed(prev => Math.max(50, prev - 10));
        }
        
        return newSnake;
      }

      // Si no comió, remover la cola
      newSnake.pop();
      return newSnake;
    });
  }, [food, score, speed, checkCollision, generateFood]);

  // Cambiar dirección
  const changeDirection = useCallback((newDirection) => {
    // Evitar que se mueva en dirección opuesta
    const currentDir = directionRef.current;
    if (
      (newDirection.x === -currentDir.x && newDirection.x !== 0) ||
      (newDirection.y === -currentDir.y && newDirection.y !== 0)
    ) {
      return;
    }
    
    directionRef.current = newDirection;
    setDirection(newDirection);
  }, []);

  // Iniciar juego
  const startGame = useCallback(() => {
    const initialSnake = INITIAL_SNAKE;
    setSnake(initialSnake);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood(generateFood(initialSnake));
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameState('playing');
  }, [generateFood]);

  // Pausar/Reanudar
  const togglePause = useCallback(() => {
    setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
  }, []);

  // Reiniciar
  const resetGame = useCallback(() => {
    startGame();
  }, [startGame]);

  // Loop del juego
  useEffect(() => {
    if (gameState === 'playing') {
      gameLoopRef.current = setInterval(moveSnake, speed);
      return () => clearInterval(gameLoopRef.current);
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    }
  }, [gameState, speed, moveSnake]);

  // Controles de teclado
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== 'playing') return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          changeDirection(DIRECTIONS.UP);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          changeDirection(DIRECTIONS.DOWN);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          changeDirection(DIRECTIONS.LEFT);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          changeDirection(DIRECTIONS.RIGHT);
          break;
        case ' ':
          e.preventDefault();
          togglePause();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, changeDirection, togglePause]);

  return {
    snake,
    food,
    score,
    gameState,
    gridSize: GRID_SIZE,
    startGame,
    resetGame,
    togglePause,
    changeDirection,
    directions: DIRECTIONS
  };
}
