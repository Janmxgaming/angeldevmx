import { useThemeStyles } from '../../../hooks/useThemeStyles';

/**
 * Componente genérico para historial de intentos/movimientos
 * Reutilizable para mostrar historial en cualquier juego
 */
export default function HistoryTracker({ 
  title, 
  items, 
  renderItem, 
  emptyMessage,
  isVisible = true 
}) {
  const { primary, primaryRgba: _primaryRgba, primaryRgb } = useThemeStyles();
  
  if (!isVisible || items.length === 0) return null;

  return (
    <div className="mb-8">
      <h3 className="text-lg font-bold text-center mb-3 text-gray-300">
        {title}
      </h3>
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="px-4 py-2 rounded-lg border-2 transition-all duration-300"
            style={{
              backgroundColor: `rgba(${primaryRgb}, 0.1)`,
              borderColor: item.isSuccess ? '#10b981' : primary,
              boxShadow: `0 0 10px ${item.isSuccess ? 'rgba(16, 185, 129, 0.3)' : `rgba(${primaryRgb}, 0.2)`}`
            }}
          >
            {renderItem ? renderItem(item, idx) : (
              <span 
                className="text-sm font-bold" 
                style={{ color: item.isSuccess ? '#10b981' : primary }}
              >
                {item.label || `#${idx + 1}`}
              </span>
            )}
          </div>
        ))}
      </div>
      {items.length === 0 && emptyMessage && (
        <p className="text-center text-gray-500 italic">{emptyMessage}</p>
      )}
    </div>
  );
}
