import { useState, Suspense } from 'react';
import LanguageProvider from './context/LanguageContext';
import { useLanguage } from './context/LanguageContext';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import { GAME_REGISTRY, incrementGamePlays } from './config/games';
import { useLazyComponent } from './hooks/useGameHelpers';

// Componente de loading para juegos
function GameLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-500 mx-auto mb-4"></div>
        <p className="text-white text-xl">Cargando juego...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentGame, setCurrentGame] = useState(null);
  const { theme } = useLanguage();
  
  // Función para cambiar de página y salir del juego
  const handlePageChange = (page) => {
    setCurrentGame(null); // Salir del juego al cambiar de página
    setCurrentPage(page);
  };
  
  // Cargar componente del juego dinámicamente
  const gameConfig = currentGame ? GAME_REGISTRY[currentGame] : null;
  
  // La función component en gameConfig ya es una función que retorna import()
  // Así que la pasamos directamente
  const { Component: GameComponent, loading, error } = useLazyComponent(
    gameConfig?.component
  );
  
  const isNeon = theme === 'neon';
  const backgroundImage = isNeon ? '/logo-bg-green.png' : '/logo-bg-blue.png';

  const renderPage = () => {
    // Renderizar juego si hay uno seleccionado
    if (currentGame) {
      if (loading) return <GameLoader />;
      if (error) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <p className="text-red-500 text-xl mb-4">Error al cargar el juego</p>
              <button 
                onClick={() => setCurrentGame(null)}
                className="px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600"
              >
                Volver a Juegos
              </button>
            </div>
          </div>
        );
      }
      if (GameComponent) {
        // Incrementar contador de plays
        incrementGamePlays(currentGame);
        return <GameComponent setCurrentGame={setCurrentGame} />;
      }
      return <GamesPage setCurrentGame={setCurrentGame} />;
    }

    // Renderizar página
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'games':
        return <GamesPage setCurrentGame={setCurrentGame} />;
      case 'about':
        return <AboutPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Fondo con tu logo - cambia según el tema */}
      <div 
        key={theme}
        className="fixed inset-0 z-0 transition-opacity duration-500" 
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '40%',
          backgroundAttachment: 'fixed',
          opacity: 0.08,
          filter: 'blur(0px)',
          pointerEvents: 'none'
        }}
      />
      
      {/* Contenido */}
      <div className="relative z-10">
        <Navbar currentPage={currentPage} setCurrentPage={handlePageChange} />
        <main>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;