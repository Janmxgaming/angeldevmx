import { useThemeStyles } from '../../../hooks/useThemeStyles';
import { GradientButton } from '../../ui/GameButtons';

/**
 * Componente genérico para banner de victoria
 * Reutilizable en cualquier juego que necesite mostrar victoria
 */
export default function VictoryBanner({ 
  title, 
  message, 
  onAction, 
  actionLabel, 
  actionIcon,
  isVisible = true 
}) {
  const { primary, primaryRgba } = useThemeStyles();

  if (!isVisible) return null;

  return (
    <div 
      className="mb-8 p-6 rounded-2xl border-2 text-center animate-pulse transition-all duration-500"
      style={{
        background: `linear-gradient(to right, ${primaryRgba}, 0.2), ${primaryRgba}, 0.3))`,
        borderColor: primary,
        boxShadow: `0 0 40px ${primaryRgba}, 0.6)`
      }}
    >
      <h2 
        className="text-3xl font-bold mb-2 transition-colors duration-500" 
        style={{ color: primary }}
      >
        {title}
      </h2>
      {message && (
        <p className="text-white text-lg mb-4">
          {message}
        </p>
      )}
      {onAction && actionLabel && (
        <GradientButton onClick={onAction} icon={actionIcon}>
          {actionLabel}
        </GradientButton>
      )}
    </div>
  );
}
