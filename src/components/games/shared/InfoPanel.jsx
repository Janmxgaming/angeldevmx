import { useThemeStyles } from '../../../hooks/useThemeStyles';

/**
 * Componente genérico para paneles de feedback/información
 * Reutilizable en cualquier juego que necesite mostrar retroalimentación
 */
export default function InfoPanel({ message, submessage, isVisible = true }) {
  const { primary, primaryRgba } = useThemeStyles();
  
  if (!isVisible) return null;

  return (
    <div 
      className="mb-6 p-4 rounded-xl border-2 text-center transition-all duration-500 animate-pulse"
      style={{
        backgroundColor: `${primaryRgba}, 0.15)`,
        borderColor: primary,
        boxShadow: `0 0 20px ${primaryRgba}, 0.4)`
      }}
    >
      <p className="text-xl font-bold" style={{ color: primary }}>
        {message}
      </p>
      {submessage && (
        <p className="text-sm text-gray-400 mt-1">
          {submessage}
        </p>
      )}
    </div>
  );
}
