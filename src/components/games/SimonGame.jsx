import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import GameLayout from '../ui/GameLayout';
import { useGameStats } from '../../hooks/useGameHelpers';
import { getColor } from '../../constants/colors';

export default function SimonGame({ setCurrentGame }) {
  const { stats, incrementPlays, recordWin, recordLoss } = useGameStats('simon');
  
  // Estados del juego
  const [gameState, setGameState] = useState('idle'); // idle, showing, waiting, correct, wrong, won
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [activeButton, setActiveButton] = useState(null);
  const [showingSequence, setShowingSequence] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(800); // ms entre cada color
  
  const audioContext = useRef(null);
  const sequenceTimeoutRef = useRef(null);
  
  // Colores del Simon (usando nuestro sistema de colores) - memoizado para evitar recreación
  const colors = useMemo(() => [
    { id: 0, name: 'red', color: getColor('red'), sound: 329.63 },
    { id: 1, name: 'yellow', color: getColor('yellow'), sound: 261.63 },
    { id: 2, name: 'green', color: getColor('green'), sound: 392.00 },
    { id: 3, name: 'blue', color: getColor('blue'), sound: 440.00 }
  ], []);
  
  // Inicializar AudioContext
  useEffect(() => {
    audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);
  
  // Reproducir sonido
  const playSound = useCallback((frequency, duration = 300) => {
    if (!audioContext.current) return;
    
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration / 1000);
    
    oscillator.start(audioContext.current.currentTime);
    oscillator.stop(audioContext.current.currentTime + duration / 1000);
  }, []);
  
  // Iluminar botón
  const highlightButton = useCallback((colorId, currentSpeed) => {
    return new Promise(resolve => {
      setActiveButton(colorId);
      playSound(colors[colorId].sound, 300);
      
      setTimeout(() => {
        setActiveButton(null);
        resolve();
      }, currentSpeed * 0.6);
    });
  }, [colors, playSound]);
  
  // Mostrar secuencia al jugador
  const showSequence = useCallback(async (seq, currentSpeed) => {
    setShowingSequence(true);
    setPlayerSequence([]);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    for (let i = 0; i < seq.length; i++) {
      const colorId = seq[i];
      await highlightButton(colorId, currentSpeed);
      await new Promise(resolve => setTimeout(resolve, currentSpeed));
    }
    
    setShowingSequence(false);
    setGameState('waiting');
  }, [highlightButton]);
  
  // Iniciar juego
  const startGame = () => {
    incrementPlays();
    const initialSequence = [Math.floor(Math.random() * 4)];
    const initialSpeed = 800;
    setGameState('showing');
    setSequence(initialSequence);
    setPlayerSequence([]);
    setCurrentLevel(1);
    setCurrentSpeed(initialSpeed);
    sequenceTimeoutRef.current = setTimeout(() => {
      showSequence(initialSequence, initialSpeed);
    }, 100);
  };
  
  // Agregar color a la secuencia
  const addToSequence = useCallback((currentSeq, currentSpeed) => {
    const newColor = Math.floor(Math.random() * 4);
    const newSequence = [...currentSeq, newColor];
    setSequence(newSequence);
    sequenceTimeoutRef.current = setTimeout(() => {
      showSequence(newSequence, currentSpeed);
    }, 50);
  }, [showSequence]);
  
  // Manejar click del jugador
  const handleButtonClick = async (colorId) => {
    if (showingSequence || gameState !== 'waiting') return;
    
    playSound(colors[colorId].sound, 200);
    setActiveButton(colorId);
    setTimeout(() => setActiveButton(null), 200);
    
    const newPlayerSequence = [...playerSequence, colorId];
    setPlayerSequence(newPlayerSequence);
    
    // Verificar si es correcto
    const currentIndex = newPlayerSequence.length - 1;
    if (sequence[currentIndex] !== colorId) {
      // Error
      handleGameOver();
      return;
    }
    
    // Si completó la secuencia correctamente
    if (newPlayerSequence.length === sequence.length) {
      setGameState('correct');
      
      // Verificar si ganó (llegó al nivel 20)
      if (currentLevel >= 20) {
        setTimeout(() => handleWin(), 800);
        return;
      }
      
      // Siguiente nivel
      setTimeout(() => {
        const newLevel = currentLevel + 1;
        setCurrentLevel(newLevel);
        
        // Aumentar velocidad cada 5 niveles
        const newSpeed = newLevel % 5 === 0 ? Math.max(300, currentSpeed - 100) : currentSpeed;
        setCurrentSpeed(newSpeed);
        
        setGameState('showing');
        addToSequence(sequence, newSpeed);
      }, 1000);
    }
  };
  
  // Manejar victoria
  const handleWin = () => {
    setGameState('won');
    recordWin(currentLevel, 0);
  };
  
  // Manejar game over
  const handleGameOver = () => {
    setGameState('wrong');
    playSound(200, 500); // Sonido de error
    recordLoss(currentLevel);
    
    setTimeout(() => {
      setGameState('idle');
    }, 2000);
  };
  
  // Reiniciar
  const resetGame = () => {
    setGameState('idle');
    setSequence([]);
    setPlayerSequence([]);
    setCurrentLevel(1);
    setCurrentSpeed(800);
  };

  return (
    <GameLayout
      title="🎵 Simon Dice"
      onBack={() => setCurrentGame(null)}
    >
      <div className="max-w-2xl mx-auto">
        
        {/* Panel de información */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center text-white">
            <div>
              <span className="text-gray-400 text-sm block">Nivel</span>
              <span className="font-bold text-2xl text-cyan-400">{currentLevel}</span>
            </div>
            <div>
              <span className="text-gray-400 text-sm block">Secuencia</span>
              <span className="font-bold text-2xl text-purple-400">{sequence.length}</span>
            </div>
            <div>
              <span className="text-gray-400 text-sm block">Mejor</span>
              <span className="font-bold text-2xl text-yellow-400">{stats.bestScore || 0}</span>
            </div>
          </div>
        </div>
        
        {/* Estado del juego */}
        {gameState !== 'idle' && gameState !== 'won' && (
          <div className="text-center mb-4">
            <div className="inline-block px-6 py-2 rounded-full bg-gray-800/70 text-white">
              {showingSequence && '👁️ Observa la secuencia...'}
              {gameState === 'waiting' && '✋ Tu turno - Repite la secuencia'}
              {gameState === 'correct' && '✅ ¡Correcto! Siguiente nivel...'}
              {gameState === 'wrong' && '❌ ¡Error! Intenta de nuevo'}
            </div>
          </div>
        )}
        
        {/* Área del juego */}
        <div className="relative aspect-square max-w-md mx-auto mb-6">
          {gameState === 'idle' ? (
            // Pantalla inicial
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🎵</div>
                <h2 className="text-white text-3xl mb-2">Simon Dice</h2>
                <p className="text-gray-400 mb-6">Memoriza y repite la secuencia</p>
                <button
                  onClick={startGame}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl font-bold rounded-lg hover:scale-105 transition-transform shadow-lg shadow-cyan-500/50"
                >
                  Iniciar Juego
                </button>
              </div>
            </div>
          ) : gameState === 'won' ? (
            // Pantalla de victoria
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">🏆</div>
                <h2 className="text-white text-3xl mb-2">¡Increíble!</h2>
                <p className="text-gray-400 mb-2">Llegaste al nivel {currentLevel}</p>
                <p className="text-cyan-400 text-2xl font-bold mb-6">
                  Puntuación: {currentLevel * 100}
                </p>
                <button
                  onClick={resetGame}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:scale-105 transition-transform"
                >
                  Jugar de Nuevo
                </button>
              </div>
            </div>
          ) : (
            // Tablero del Simon
            <div className="absolute inset-0 grid grid-cols-2 gap-2 p-4 bg-gray-900 rounded-xl">
              {colors.map((color) => {
                const isActive = activeButton === color.id;
                const isWrong = gameState === 'wrong' && playerSequence[playerSequence.length - 1] === color.id;
                
                return (
                  <button
                    key={color.id}
                    onClick={() => handleButtonClick(color.id)}
                    disabled={showingSequence || gameState !== 'waiting'}
                    className={`
                      rounded-xl transition-all duration-150 transform
                      ${showingSequence || gameState !== 'waiting' ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-95'}
                      ${isActive ? 'scale-95' : 'scale-100'}
                      ${isWrong ? 'animate-pulse' : ''}
                    `}
                    style={{
                      backgroundColor: isActive ? color.color.hex : color.color.dark,
                      opacity: isActive ? 1 : (isWrong ? 0.3 : 0.7),
                      boxShadow: isActive ? `0 0 40px ${color.color.hex}` : 'none',
                      border: `3px solid ${isActive ? color.color.light : color.color.dark}`
                    }}
                  />
                );
              })}
              
              {/* Contador en el centro */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-gray-950 rounded-full w-24 h-24 flex items-center justify-center border-4 border-gray-800">
                  <span className="text-white text-3xl font-bold">
                    {showingSequence ? '👀' : playerSequence.length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Instrucciones */}
        {gameState === 'idle' && (
          <div className="bg-gray-800/50 rounded-lg p-4 text-gray-300 text-sm">
            <h3 className="font-bold text-white mb-2">📖 Cómo jugar:</h3>
            <ul className="space-y-1 ml-4">
              <li>• Observa la secuencia de colores</li>
              <li>• Repite la secuencia en el mismo orden</li>
              <li>• Cada nivel agrega un color más</li>
              <li>• Llega al nivel 20 para ganar</li>
              <li>• La velocidad aumenta cada 5 niveles</li>
            </ul>
          </div>
        )}
        
        {/* Panel de estadísticas */}
        <div className="bg-gray-800/50 rounded-lg p-4 mt-6">
          <h3 className="text-white font-bold mb-3">📊 Tus Estadísticas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-gray-400 text-sm">Partidas</p>
              <p className="text-white text-2xl font-bold">{stats.plays}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Victorias</p>
              <p className="text-green-400 text-2xl font-bold">{stats.wins}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Derrotas</p>
              <p className="text-red-400 text-2xl font-bold">{stats.losses}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Mejor Nivel</p>
              <p className="text-yellow-400 text-2xl font-bold">{stats.bestScore || 0}</p>
            </div>
          </div>
        </div>
        
      </div>
    </GameLayout>
  );
}
