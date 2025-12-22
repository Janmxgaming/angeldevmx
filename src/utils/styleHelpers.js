/**
 * Utilidades de estilos reutilizables
 */

/**
 * Genera estilo de gradiente para texto
 */
export function getTextGradientStyle(gradient, primaryRgba) {
  return {
    background: `linear-gradient(to right, ${gradient.from}, ${gradient.via}, ${gradient.to})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textShadow: 'none',
    filter: `drop-shadow(0 0 30px ${primaryRgba}, 0.6))`
  };
}

/**
 * Genera estilo para botón primario con borde
 */
export function getPrimaryButtonStyle(primary, primaryRgba, transparent = false) {
  return {
    backgroundColor: transparent ? 'transparent' : `${primaryRgba}, 0.1)`,
    borderColor: primary,
    color: primary,
    boxShadow: `0 0 20px ${primaryRgba}, 0.3)`
  };
}

/**
 * Genera estilo para botón con gradiente
 */
export function getGradientButtonStyle(primary, secondary, primaryRgba, isNeon) {
  return {
    background: `linear-gradient(135deg, ${primary}, ${secondary})`,
    color: isNeon ? '#000' : '#fff',
    boxShadow: `0 0 30px ${primaryRgba}, 0.6)`
  };
}

/**
 * Genera estilo para tarjeta/contenedor con glow
 */
export function getGlowCardStyle(primary, primaryRgba, intensity = 0.3) {
  return {
    backgroundColor: `${primaryRgba}, 0.1)`,
    borderColor: primary,
    color: primary,
    boxShadow: `0 0 20px ${primaryRgba}, ${intensity})`
  };
}

/**
 * Genera estilo para divisor horizontal con gradiente
 */
export function getDividerStyle(primary, primaryRgba) {
  return {
    background: `linear-gradient(to right, transparent, ${primary}, transparent)`,
    boxShadow: `0 0 20px ${primaryRgba}, 0.6)`
  };
}

/**
 * Genera estilo para badge de puntuación
 */
export function getScoreBadgeStyle(primary, primaryRgba) {
  return {
    backgroundColor: `${primaryRgba}, 0.1)`,
    borderColor: primary,
    color: primary,
    boxShadow: `0 0 15px ${primaryRgba}, 0.3)`
  };
}

/**
 * Genera estilo para elemento ganador con animación
 */
export function getWinningStyle(primaryRgba, isWinning = true) {
  return {
    backgroundColor: isWinning ? `${primaryRgba}, 0.3)` : `${primaryRgba}, 0.1)`,
    boxShadow: isWinning ? `0 0 30px ${primaryRgba}, 0.6)` : 'none',
    transform: isWinning ? 'scale(1.05)' : 'scale(1)'
  };
}

/**
 * Genera estilo de título principal con gradiente
 */
export function getTitleStyle(gradient, primaryRgba) {
  return {
    background: `linear-gradient(to right, ${gradient.from}, ${gradient.via}, ${gradient.to})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    filter: `drop-shadow(0 0 30px ${primaryRgba}, 0.6))`
  };
}
