import { useThemeStyles } from '../../hooks/useThemeStyles';
import { getScoreBadgeStyle } from '../../utils/styleHelpers';

/**
 * Badge para mostrar puntuación o estadísticas
 */
export function ScoreBadge({ label, value, className = '' }) {
  const { primary, primaryRgba } = useThemeStyles();
  
  return (
    <div
      className={`px-6 py-3 rounded-lg border-2 font-bold transition-all duration-500 ${className}`}
      style={getScoreBadgeStyle(primary, primaryRgba)}
    >
      {label}: {value}
    </div>
  );
}

/**
 * Badge neutral (gris)
 */
export function NeutralBadge({ label, value, className = '' }) {
  return (
    <div
      className={`px-6 py-3 rounded-lg border-2 font-bold text-gray-400 ${className}`}
      style={{
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
        borderColor: '#6b7280'
      }}
    >
      {label}: {value}
    </div>
  );
}

/**
 * Grupo de badges con flex layout
 */
export function BadgeGroup({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {children}
    </div>
  );
}
