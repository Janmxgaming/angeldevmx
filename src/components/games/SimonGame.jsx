import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useGameStats, useUsername, useLeaderboard } from '../../hooks/useGameHelpers';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import UsernameInput from '../ui/UsernameInput';
import LocalLeaderboard from '../ui/LocalLeaderboard';
import { getColor } from '../../constants/colors';

export default function SimonGame({ setCurrentGame }) {
  useLanguage();
  const { primary, primaryRgba } = useThemeStyles();
  const { stats, incrementPlays, recordWin, updateBestScore } = useGameStats('simon');
  const { username } = useUsername();
  const { board, submitScore, serverAvailable, syncing, syncFromServer } = useLeaderboard('simon');
  
  // Estados del juego
  const [gameState, setGameState] = useState('idle'); // idle, showing, waiting, correct, wrong, won
  const [sequence, setSequence] = useState([]);
  const [playerSequence, setPlayerSequence] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [activeButton, setActiveButton] = useState(null);
  const [showingSequence, setShowingSequence] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(800); // ms entre cada color
  const [speedFlash, setSpeedFlash] = useState(false);
  
  const audioContext = useRef(null);
  const sequenceTimeoutRef = useRef(null);
  
  // Colores del Simon (usando nuestro sistema de colores) - memoizado para evitar recreación
  // Simon colors: ensure four distinct colors (red, yellow, green, blue)
  // Use 'neon' theme only for styling elsewhere — keep classic Simon colors
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
        const newSpeed = newLevel % 5 === 0 ? Math.max(200, currentSpeed - 150) : currentSpeed;
        if (newSpeed !== currentSpeed) {
          setCurrentSpeed(newSpeed);
          setSpeedFlash(true);
          setTimeout(() => setSpeedFlash(false), 800);
        }
        
        setGameState('showing');
        addToSequence(sequence, newSpeed);
      }, 1000);
    }
  };
  
  // Manejar victoria
  const handleWin = useCallback(() => {
    setGameState('won');
    if (currentLevel > (stats.bestScore || 0)) {
      recordWin(currentLevel, 0);
    }
    submitScore({ username: username || 'Anon', score: currentLevel });
  }, [currentLevel, stats.bestScore, recordWin, submitScore, username]);
  
  // Manejar game over
  const handleGameOver = useCallback(() => {
    updateBestScore(currentLevel);
    setGameState('wrong');
    playSound(200, 500);
    submitScore({ username: username || 'Anon', score: currentLevel });
    
    setTimeout(() => {
      setGameState('idle');
    }, 2000);
  }, [currentLevel, updateBestScore, playSound, submitScore, username]);
  
  // Reiniciar
  const resetGame = () => {
    setGameState('idle');
    setSequence([]);
    setPlayerSequence([]);
    setCurrentLevel(1);
    setCurrentSpeed(800);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        
        {/* Header con botón de volver */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentGame(null)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all hover:scale-105"
              style={{
                borderColor: primary,
                color: primary,
              }}
            >
              <ArrowLeft size={20} />
              <span>Volver a Juegos</span>
            </button>
            <UsernameInput />
          </div>
        </div>

        {/* Título */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-white">
          🎵 Simon Dice
        </h1>

      <div className="max-w-2xl mx-auto">
        
        {/* Panel de información */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 gap-4 text-center text-white">
            <div>
              <span className="text-gray-400 text-sm block">Nivel</span>
              <span className="font-bold text-2xl text-cyan-400">{currentLevel}</span>
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
                  className="px-8 py-4 text-white text-xl font-bold rounded-lg hover:scale-105 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${primary} 0%, ${primaryRgba} 100%)`,
                    boxShadow: `0 10px 25px ${primaryRgba}`
                  }}
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
                  className="px-6 py-3 text-white rounded-lg hover:scale-105 transition-transform"
                  style={{
                    background: `linear-gradient(135deg, ${primary} 0%, ${primaryRgba} 100%)`,
                    boxShadow: `0 10px 25px ${primaryRgba}`
                  }}
                >
                  Jugar de Nuevo
                </button>
              </div>
            </div>
          ) : (
            // Tablero del Simon
                <div className="absolute inset-0 grid grid-cols-2 gap-2 p-4 bg-gray-900 rounded-xl" style={{ perspective: '1200px' }}>
              {colors.map((color) => {
                const isActive = activeButton === color.id;
                const isWrong = gameState === 'wrong' && playerSequence[playerSequence.length - 1] === color.id;
                    const rgb = color.color.rgb || '0,0,0';
                    const baseHex = color.color.hex;
                    const light = color.color.light;
                    const dark = color.color.dark;
                    const glow = `rgba(${rgb}, ${isActive ? 0.55 : 0.18})`;

                    return (
                      <button
                        key={color.id}
                        onClick={() => handleButtonClick(color.id)}
                        disabled={showingSequence || gameState !== 'waiting'}
                        className={`rounded-xl transition-transform duration-180 ease-out will-change-transform ${showingSequence || gameState !== 'waiting' ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        style={{
                          background: isActive
                            ? `radial-gradient(circle at 30% 20%, rgba(${rgb},0.95), ${baseHex} 40%)`
                            : `linear-gradient(135deg, ${light}, ${baseHex})`,
                          opacity: isWrong ? 0.35 : 1,
                          boxShadow: `${isActive ? `0 20px 60px ${glow}` : `0 10px 30px ${glow}`}, inset 0 -8px 18px rgba(0,0,0,0.25)` ,
                          transform: isActive ? 'translateZ(30px) scale(1.03)' : 'translateZ(0) scale(1)',
                          border: `3px solid ${isActive ? light : dark}`,
                          transition: 'transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease'
                        }}
                      />
                    );
              })}
              
              {/* Contador en el centro */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`bg-gray-950 rounded-full w-24 h-24 flex items-center justify-center border-4 border-gray-800 ${speedFlash ? 'animate-pulse' : ''}`} style={{ boxShadow: speedFlash ? `0 0 40px ${primary}55, 0 10px 50px rgba(0,0,0,0.6)` : `0 6px 24px rgba(0,0,0,0.6)` }}>
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
          <h3 className="text-white font-bold mb-3">🏅 Mejor Nivel Logrado</h3>
          <div className="text-center">
            <span className="text-yellow-400 text-4xl font-bold">{stats.bestScore || 0}</span>
          </div>
        </div>
        <LocalLeaderboard 
          entries={board} 
          title="Simon - Puntuaciones" 
          serverAvailable={serverAvailable}
          syncing={syncing}
          onSync={syncFromServer}
        />
        
      </div>
      </div>
    </div>
  );
}
