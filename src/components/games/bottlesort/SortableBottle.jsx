import { useThemeStyles } from '../../../hooks/useThemeStyles';

/**
 * Botella individual ordenable con colores apilados
 */
export default function SortableBottle({ 
  bottle, 
  isSelected, 
  onClick 
}) {
  const { primary, primaryRgba } = useThemeStyles();

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isSelected ? 'scale-110 -translate-y-2' : ''
      }`}
    >
      <div 
        className="w-20 h-32 rounded-t-lg rounded-b-3xl border-4 flex flex-col-reverse p-2 gap-1 transition-all duration-300"
        style={{
          borderColor: isSelected ? primary : '#4b5563',
          backgroundColor: isSelected 
            ? `${primaryRgba}, 0.2)` 
            : 'rgba(31, 41, 55, 0.5)',
          boxShadow: isSelected 
            ? `0 0 25px ${primaryRgba}, 0.6)` 
            : 'none'
        }}
      >
        {bottle.map((color, colorIdx) => (
          <div
            key={colorIdx}
            className="h-6 rounded-md transition-all duration-300 shadow-inner"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
}
