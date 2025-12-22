/**
 * 🎮 PLANTILLA PARA NUEVOS JUEGOS
 * 
 * Copia este archivo y renómbralo (ej: SnakeGame.jsx)
 * Sigue los pasos marcados con TODO
 */

import { useState, useEffect } from 'react';
import GameLayout from '../ui/GameLayout';
import { useGameStats } from '../../hooks/useGameHelpers';

export default function GameTemplate({ setCurrentGame }) {
  // TODO: Cambiar 'gameTemplate' por tu ID de juego (debe coincidir con config/games.js)
  const gameId = 'gameTemplate';
  
  // Estadísticas automáticas (opcional pero recomendado)
  const { stats, incrementPlays, recordWin, recordLoss } = useGameStats(gameId);
  
  // TODO: Define tus estados del juego aquí
  const [gameState, setGameState] = useState('idle'); // idle, playing, won, lost
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  
  // Incrementar plays al montar el componente
  useEffect(() => {
    incrementPlays();
  }, [incrementPlays]);
  
  // TODO: Implementa la lógica de tu juego
  const startGame = () => {
    setGameState('playing');
    setScore(0);
    // ... más lógica de inicio
  };
  
  const handleWin = () => {
    setGameState('won');
    recordWin(score, 0); // score, time en segundos
  };
  
  const handleLoss = () => {
    setGameState('lost');
    recordLoss();
  };
  
  const resetGame = () => {
    setGameState('idle');
    setScore(0);
    setLevel(1);
  };
  
  // TODO: Cambia el título por el nombre de tu juego
  return (
    <GameLayout
      title="Mi Juego Increíble" 
      onBack={() => setCurrentGame(null)}
    >
      <div className="max-w-4xl mx-auto">
        
        {/* Panel de información */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center text-white">
            <div>
              <span className="text-gray-400">Puntuación: </span>
              <span className="font-bold text-2xl text-cyan-400">{score}</span>
            </div>
            <div>
              <span className="text-gray-400">Nivel: </span>
              <span className="font-bold text-2xl text-purple-400">{level}</span>
            </div>
            <div>
              <span className="text-gray-400">Partidas: </span>
              <span className="font-bold text-green-400">{stats.plays}</span>
            </div>
          </div>
        </div>
        
        {/* TODO: Área del juego - reemplaza con tu UI */}
        <div className="bg-gray-900 rounded-xl p-8 mb-6 min-h-[400px] flex items-center justify-center">
          {gameState === 'idle' && (
            <div className="text-center">
              <h2 className="text-white text-3xl mb-4">¿Listo para jugar?</h2>
              <button
                onClick={startGame}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl font-bold rounded-lg hover:scale-105 transition-transform"
              >
                Iniciar Juego
              </button>
            </div>
          )}
          
          {gameState === 'playing' && (
            <div className="text-center text-white">
              <p className="text-2xl mb-4">¡Jugando!</p>
              {/* TODO: Tu interfaz del juego aquí */}
              <div className="space-x-4">
                <button
                  onClick={handleWin}
                  className="px-6 py-2 bg-green-500 rounded-lg hover:bg-green-600"
                >
                  Simular Victoria
                </button>
                <button
                  onClick={handleLoss}
                  className="px-6 py-2 bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Simular Derrota
                </button>
              </div>
            </div>
          )}
          
          {gameState === 'won' && (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-white text-3xl mb-2">¡Victoria!</h2>
              <p className="text-gray-400 mb-6">Puntuación: {score}</p>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:scale-105 transition-transform"
              >
                Jugar de Nuevo
              </button>
            </div>
          )}
          
          {gameState === 'lost' && (
            <div className="text-center">
              <div className="text-6xl mb-4">😢</div>
              <h2 className="text-white text-3xl mb-2">Game Over</h2>
              <p className="text-gray-400 mb-6">Puntuación final: {score}</p>
              <button
                onClick={resetGame}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:scale-105 transition-transform"
              >
                Intentar de Nuevo
              </button>
            </div>
          )}
        </div>
        
        {/* Panel de estadísticas */}
        <div className="bg-gray-800/50 rounded-lg p-4">
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
              <p className="text-gray-400 text-sm">Mejor</p>
              <p className="text-yellow-400 text-2xl font-bold">{stats.bestScore}</p>
            </div>
          </div>
        </div>
        
        {/* TODO: Agrega controles, instrucciones, etc. */}
        
      </div>
    </GameLayout>
  );
}

/**
 * 📝 CHECKLIST DE IMPLEMENTACIÓN
 * 
 * [ ] 1. Renombrar archivo (ej: SnakeGame.jsx)
 * [ ] 2. Cambiar el gameId en línea 14
 * [ ] 3. Cambiar el título en línea 44
 * [ ] 4. Implementar lógica del juego
 * [ ] 5. Diseñar la UI del juego
 * [ ] 6. Agregar a config/games.js:
 *        - Import lazy: const MyGame = () => import('...')
 *        - Cambiar enabled: true
 * [ ] 7. Agregar traducciones en utils/translations.js
 * [ ] 8. Probar en desarrollo
 * [ ] 9. (Opcional) Agregar logros personalizados
 * [ ] 10. (Opcional) Implementar niveles/dificultades
 */
