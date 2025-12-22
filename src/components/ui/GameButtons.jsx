import { useThemeStyles } from '../../hooks/useThemeStyles';
import {
  getPrimaryButtonStyle,
  getGradientButtonStyle
} from '../../utils/styleHelpers';

/**
 * Botón outline con tema dinámico
 */
export function OutlineButton({ onClick, icon: Icon, children, disabled = false, className = '' }) {
  const { primary, primaryRgba } = useThemeStyles();
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg border-2 font-semibold transition-all duration-300 transform hover:scale-105 ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      style={{
        ...getPrimaryButtonStyle(primary, primaryRgba, true),
        ...(disabled && {
          borderColor: '#6b7280',
          color: '#6b7280',
          boxShadow: 'none'
        })
      }}
    >
      {Icon && <Icon size={20} />}
      <span>{children}</span>
    </button>
  );
}

/**
 * Botón con gradiente
 */
export function GradientButton({ onClick, icon: Icon, children, className = '' }) {
  const { primary, primaryRgba, secondary, isNeon } = useThemeStyles();
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-8 py-4 rounded-lg font-bold transition-all duration-300 hover:scale-105 ${className}`}
      style={getGradientButtonStyle(primary, secondary, primaryRgba, isNeon)}
    >
      {Icon && <Icon size={20} />}
      <span>{children}</span>
    </button>
  );
}

/**
 * Botón de peligro (rojo)
 */
export function DangerButton({ onClick, icon: Icon, children, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg bg-red-500/20 border-2 border-red-500/50 text-red-400 hover:bg-red-500/30 font-semibold transition-all duration-300 hover:scale-105 ${className}`}
      style={{
        boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)'
      }}
    >
      {Icon && <Icon size={20} />}
      <span>{children}</span>
    </button>
  );
}
