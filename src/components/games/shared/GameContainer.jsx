/**
 * Contenedor compartido para todos los juegos
 * Proporciona estructura consistente y espaciado
 */
export function GameContainer({ children, maxWidth = '4xl' }) {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className={`max-w-${maxWidth} mx-auto`}>
        {children}
      </div>
    </div>
  );
}

/**
 * Sección de contenido del juego
 */
export function GameContent({ children, className = '' }) {
  return (
    <div className={`space-y-6 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Sección de controles del juego
 */
export function GameControls({ children, className = '' }) {
  return (
    <div className={`flex flex-wrap justify-center gap-4 mt-8 ${className}`}>
      {children}
    </div>
  );
}
