import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useThemeStyles } from '../../hooks/useThemeStyles';
import { getTitleStyle } from '../../utils/styleHelpers';
import { OutlineButton } from './GameButtons';

/**
 * Título principal para páginas de juegos
 */
export function GameTitle({ children, className = '' }) {
  const { theme } = useLanguage();
  const { gradient, primaryRgba } = useThemeStyles();
  
  return (
    <h1
      className={`text-4xl md:text-5xl font-bold text-center mb-8 transition-all duration-500 ${className}`}
      key={theme}
      style={getTitleStyle(gradient, primaryRgba)}
    >
      {children}
    </h1>
  );
}

/**
 * Subtítulo o texto descriptivo
 */
export function GameSubtitle({ children, className = '' }) {
  return (
    <p className={`text-center text-gray-400 mb-8 ${className}`}>
      {children}
    </p>
  );
}

/**
 * Encabezado completo con navegación y estadísticas
 */
export function GameHeader({ onBack, backLabel, children }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
      {onBack && backLabel ? (
        <>
          <OutlineButton onClick={onBack} icon={ArrowLeft}>
            {backLabel}
          </OutlineButton>
          {children}
        </>
      ) : (
        children
      )}
    </div>
  );
}

/**
 * Layout completo para juegos con header y título
 */
export default function GameLayout({ title, onBack, children }) {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <GameHeader onBack={onBack} backLabel={t.games?.exit || 'Volver a Juegos'}>
          <GameTitle>{title}</GameTitle>
        </GameHeader>
        {children}
      </div>
    </div>
  );
}
