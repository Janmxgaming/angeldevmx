/**
 * Sistema de Router simplificado
 */

export const ROUTES = {
  HOME: { path: '/', id: 'home', type: 'page' },
  GAMES: { path: '/games', id: 'games', type: 'page' },
  ABOUT: { path: '/about', id: 'about', type: 'page' },
  PROJECTS: { path: '/projects', id: 'projects', type: 'page' },
  CONTACT: { path: '/contact', id: 'contact', type: 'page' },
  GAME: { path: '/game/:id', id: 'game', type: 'game' }
};

export const PAGE_COMPONENTS = {
  home: () => import('../pages/HomePage'),
  games: () => import('../pages/GamesPage'),
  about: () => import('../pages/AboutPage'),
  projects: () => import('../pages/ProjectsPage'),
  contact: () => import('../pages/ContactPage')
};

// Helper para actualizar URL sin recargar
function updateURL(path) {
  if (window.history) {
    window.history.pushState({}, '', path);
  }
}

export function navigateToPage(pageId, setCurrentPage, setCurrentGame) {
  setCurrentGame(null);
  setCurrentPage(pageId);
  const route = Object.values(ROUTES).find(r => r.id === pageId);
  if (route) updateURL(route.path);
}

export function navigateToGame(gameId, setCurrentGame, incrementPlays = null) {
  setCurrentGame(gameId);
  if (incrementPlays) incrementPlays(gameId);
  updateURL(`/game/${gameId}`);
}

export function goBack(setCurrentGame, setCurrentPage, defaultPage = 'games') {
  setCurrentGame(null);
  if (window.history && window.history.length > 1) {
    window.history.back();
  } else {
    setCurrentPage(defaultPage);
  }
}

export function getNavigationState(currentPage, currentGame) {
  return {
    isOnGame: currentGame !== null,
    isOnPage: currentGame === null,
    currentLocation: currentGame || currentPage,
    canGoBack: window.history && window.history.length > 1
  };
}
