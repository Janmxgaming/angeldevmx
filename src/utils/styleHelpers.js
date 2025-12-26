/**
 * Utilidades de estilos reutilizables para el tema dinámico
 */

/**
 * Genera estilo base con glow effect
 */
function getGlowStyle(primaryRgb, opacity = 0.3, spread = 20) {
  return {
    boxShadow: `0 0 ${spread}px rgba(${primaryRgb}, ${opacity})`
  };
}

/**
 * Genera estilo de gradiente para texto
 */
export function getTextGradientStyle(gradient, primaryRgb) {
  return {
    background: `linear-gradient(to right, ${gradient.from}, ${gradient.via}, ${gradient.to})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: `drop-shadow(0 0 30px rgba(${primaryRgb}, 0.6))`
  };
}

/**
 * Genera estilo para botón primario con borde
 */
export function getPrimaryButtonStyle(primary, primaryRgb, transparent = false) {
  return {
    backgroundColor: transparent ? 'transparent' : `rgba(${primaryRgb}, 0.1)`,
    borderColor: primary,
    color: primary,
    ...getGlowStyle(primaryRgb)
  };
}

/**
 * Genera estilo para botón con gradiente
 */
export function getGradientButtonStyle(primary, secondary, primaryRgb, isNeon) {
  return {
    background: `linear-gradient(135deg, ${primary}, ${secondary})`,
    color: isNeon ? '#000' : '#fff',
    ...getGlowStyle(primaryRgb, 0.6, 30)
  };
}

/**
 * Genera estilo para tarjeta/contenedor con glow
 */
export function getGlowCardStyle(primary, primaryRgb) {
  return {
    backgroundColor: `rgba(${primaryRgb}, 0.1)`,
    borderColor: primary,
    color: primary,
    ...getGlowStyle(primaryRgb)
  };
}

/**
 * Genera estilo para divisor horizontal con gradiente
 */
export function getDividerStyle(primary, primaryRgb) {
  return {
    background: `linear-gradient(to right, transparent, ${primary}, transparent)`,
    ...getGlowStyle(primaryRgb, 0.6)
  };
}

/**
 * Genera estilo para badge de puntuación
 */
export function getScoreBadgeStyle(primary, primaryRgb) {
  return {
    backgroundColor: `rgba(${primaryRgb}, 0.1)`,
    borderColor: primary,
    color: primary,
    ...getGlowStyle(primaryRgb, 0.3, 15)
  };
}

/**
 * Genera estilo para elemento ganador con animación
 */
export function getWinningStyle(primaryRgb, isWinning = true) {
  return {
    backgroundColor: isWinning ? `rgba(${primaryRgb}, 0.2)` : `rgba(${primaryRgb}, 0.05)`,
    ...getGlowStyle(primaryRgb, isWinning ? 0.6 : 0, isWinning ? 30 : 0),
    transform: isWinning ? 'scale(1.05)' : 'scale(1)'
  };
}

// Alias para mantener compatibilidad
export const getTitleStyle = getTextGradientStyle;

