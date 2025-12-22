/**
 * Sistema de Router simple pero poderoso
 * Maneja navegación de páginas y juegos
 */

// Definición de todas las rutas de la aplicación
export const ROUTES = {
  // Páginas principales
  HOME: { path: '/', id: 'home', type: 'page' },
  GAMES: { path: '/games', id: 'games', type: 'page' },
  ABOUT: { path: '/about', id: 'about', type: 'page' },
  PROJECTS: { path: '/projects', id: 'projects', type: 'page' },
  CONTACT: { path: '/contact', id: 'contact', type: 'page' },
  
  // Rutas de juegos (dinámicas)
  GAME: { path: '/game/:id', id: 'game', type: 'game' }
};

// Mapeo de componentes de página
export const PAGE_COMPONENTS = {
  home: () => import('../pages/HomePage'),
  games: () => import('../pages/GamesPage'),
  about: () => import('../pages/AboutPage'),
  projects: () => import('../pages/ProjectsPage'),
  contact: () => import('../pages/ContactPage')
};

/**
 * Navega a una página específica
 */
export function navigateToPage(pageId, setCurrentPage, setCurrentGame) {
  setCurrentGame(null); // Salir del juego
  setCurrentPage(pageId);
  
  // Actualizar URL (sin recargar)
  const route = Object.values(ROUTES).find(r => r.id === pageId);
  if (route && window.history) {
    window.history.pushState({}, '', route.path);
  }
}

/**
 * Navega a un juego específico
 */
export function navigateToGame(gameId, setCurrentGame, incrementPlays = null) {
  setCurrentGame(gameId);
  
  // Incrementar contador de plays
  if (incrementPlays) {
    incrementPlays(gameId);
  }
  
  // Actualizar URL
  if (window.history) {
    window.history.pushState({}, '', `/game/${gameId}`);
  }
}

/**
 * Regresa a la página anterior
 */
export function goBack(setCurrentGame, setCurrentPage, defaultPage = 'games') {
  setCurrentGame(null);
  
  if (window.history && window.history.length > 1) {
    window.history.back();
  } else {
    setCurrentPage(defaultPage);
  }
}

/**
 * Obtiene el estado actual de navegación
 */
export function getNavigationState(currentPage, currentGame) {
  return {
    isOnGame: currentGame !== null,
    isOnPage: currentGame === null,
    currentLocation: currentGame || currentPage,
    canGoBack: window.history && window.history.length > 1
  };
}
