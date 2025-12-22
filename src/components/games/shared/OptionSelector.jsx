import { useThemeStyles } from '../../../hooks/useThemeStyles';

/**
 * Componente genérico para selector de opciones con tarjetas
 * Reutilizable para seleccionar modo, dificultad, niveles, etc.
 */
export default function OptionSelector({ 
  title, 
  options, 
  onSelect,
  columns = 2 
}) {
  const { primary, primaryRgba } = useThemeStyles();

  return (
    <div className="mb-12 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6" style={{ color: primary }}>
        {title}
      </h2>
      <div 
        className="grid gap-6"
        style={{ 
          gridTemplateColumns: `repeat(${Math.min(options.length, columns)}, minmax(0, 1fr))` 
        }}
      >
        {options.map((option, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(option.value)}
            className="p-6 rounded-2xl border-2 font-bold transition-all duration-300 hover:scale-105 flex flex-col items-center gap-3"
            style={{
              backgroundColor: `${primaryRgba}, 0.1)`,
              borderColor: option.color || primary,
              color: option.color || primary,
              boxShadow: option.glow ? `0 0 20px ${option.glow}` : `0 0 20px ${primaryRgba}, 0.4)`
            }}
          >
            {option.icon && (
              typeof option.icon === 'string' ? (
                <span className="text-4xl">{option.icon}</span>
              ) : (
                <option.icon size={48} />
              )
            )}
            <span className="text-xl">{option.label}</span>
            {option.description && (
              <span className="text-sm opacity-75">{option.description}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
