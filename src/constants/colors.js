/**
 * Paleta completa de colores para toda la aplicación
 * Centraliza TODOS los colores en un solo lugar
 */

// ============================================
// COLORES BASE DEL SISTEMA
// ============================================

export const SYSTEM_COLORS = {
  // Blacks & Grays
  black: '#000000',
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#030712'
  },
  white: '#ffffff',
  transparent: 'transparent'
};

// ============================================
// COLORES PRINCIPALES (ROJOS)
// ============================================

export const REDS = {
  red: {
    hex: '#ef4444',
    rgb: '239, 68, 68',
    dark: '#dc2626',
    light: '#f87171',
    name: { es: 'Rojo', en: 'Red' }
  },
  crimson: {
    hex: '#dc143c',
    rgb: '220, 20, 60',
    dark: '#b91c3d',
    light: '#e63757',
    name: { es: 'Carmesí', en: 'Crimson' }
  },
  rose: {
    hex: '#f43f5e',
    rgb: '244, 63, 94',
    dark: '#e11d48',
    light: '#fb7185',
    name: { es: 'Rosado', en: 'Rose' }
  }
};

// ============================================
// AZULES
// ============================================

export const BLUES = {
  blue: {
    hex: '#3b82f6',
    rgb: '59, 130, 246',
    dark: '#2563eb',
    light: '#60a5fa',
    name: { es: 'Azul', en: 'Blue' }
  },
  sky: {
    hex: '#0EA5E9',
    rgb: '14, 165, 233',
    dark: '#0284C7',
    light: '#38BDF8',
    name: { es: 'Cielo', en: 'Sky' }
  },
  cyan: {
    hex: '#06b6d4',
    rgb: '6, 182, 212',
    dark: '#0891b2',
    light: '#22d3ee',
    name: { es: 'Cian', en: 'Cyan' }
  },
  indigo: {
    hex: '#6366f1',
    rgb: '99, 102, 241',
    dark: '#4f46e5',
    light: '#818cf8',
    name: { es: 'Índigo', en: 'Indigo' }
  },
  navy: {
    hex: '#1e40af',
    rgb: '30, 64, 175',
    dark: '#1e3a8a',
    light: '#3b82f6',
    name: { es: 'Azul Marino', en: 'Navy' }
  }
};

// ============================================
// VERDES
// ============================================

export const GREENS = {
  green: {
    hex: '#10b981',
    rgb: '16, 185, 129',
    dark: '#059669',
    light: '#34d399',
    name: { es: 'Verde', en: 'Green' }
  },
  emerald: {
    hex: '#10b981',
    rgb: '16, 185, 129',
    dark: '#047857',
    light: '#6ee7b7',
    name: { es: 'Esmeralda', en: 'Emerald' }
  },
  lime: {
    hex: '#84cc16',
    rgb: '132, 204, 22',
    dark: '#65a30d',
    light: '#a3e635',
    name: { es: 'Lima', en: 'Lime' }
  },
  teal: {
    hex: '#14b8a6',
    rgb: '20, 184, 166',
    dark: '#0f766e',
    light: '#5eead4',
    name: { es: 'Turquesa', en: 'Teal' }
  },
  mint: {
    hex: '#00ffcc',
    rgb: '0, 255, 204',
    dark: '#00d9b3',
    light: '#66ffe0',
    name: { es: 'Menta', en: 'Mint' }
  },
  neon: {
    hex: '#00ff41',
    rgb: '0, 255, 65',
    dark: '#00cc33',
    light: '#4dff88',
    name: { es: 'Neón', en: 'Neon' }
  }
};

// ============================================
// AMARILLOS Y NARANJAS
// ============================================

export const YELLOWS_ORANGES = {
  yellow: {
    hex: '#fbbf24',
    rgb: '251, 191, 36',
    dark: '#f59e0b',
    light: '#fcd34d',
    name: { es: 'Amarillo', en: 'Yellow' }
  },
  amber: {
    hex: '#f59e0b',
    rgb: '245, 158, 11',
    dark: '#d97706',
    light: '#fbbf24',
    name: { es: 'Ámbar', en: 'Amber' }
  },
  orange: {
    hex: '#f97316',
    rgb: '249, 115, 22',
    dark: '#ea580c',
    light: '#fb923c',
    name: { es: 'Naranja', en: 'Orange' }
  },
  gold: {
    hex: '#ffd700',
    rgb: '255, 215, 0',
    dark: '#daa520',
    light: '#ffe55c',
    name: { es: 'Dorado', en: 'Gold' }
  }
};

// ============================================
// PÚRPURAS, VIOLETAS Y ROSAS
// ============================================

export const PURPLES_PINKS = {
  purple: {
    hex: '#a855f7',
    rgb: '168, 85, 247',
    dark: '#9333ea',
    light: '#c084fc',
    name: { es: 'Morado', en: 'Purple' }
  },
  violet: {
    hex: '#8b5cf6',
    rgb: '139, 92, 246',
    dark: '#7c3aed',
    light: '#a78bfa',
    name: { es: 'Violeta', en: 'Violet' }
  },
  pink: {
    hex: '#ec4899',
    rgb: '236, 72, 153',
    dark: '#db2777',
    light: '#f472b6',
    name: { es: 'Rosa', en: 'Pink' }
  },
  fuchsia: {
    hex: '#d946ef',
    rgb: '217, 70, 239',
    dark: '#c026d3',
    light: '#e879f9',
    name: { es: 'Fucsia', en: 'Fuchsia' }
  },
  magenta: {
    hex: '#ff00ff',
    rgb: '255, 0, 255',
    dark: '#cc00cc',
    light: '#ff66ff',
    name: { es: 'Magenta', en: 'Magenta' }
  }
};

// ============================================
// MARRONES Y TIERRAS
// ============================================

export const BROWNS = {
  brown: {
    hex: '#a0522d',
    rgb: '160, 82, 45',
    dark: '#8b4513',
    light: '#cd853f',
    name: { es: 'Marrón', en: 'Brown' }
  },
  chocolate: {
    hex: '#d2691e',
    rgb: '210, 105, 30',
    dark: '#b8520d',
    light: '#e88c3c',
    name: { es: 'Chocolate', en: 'Chocolate' }
  },
  beige: {
    hex: '#f5f5dc',
    rgb: '245, 245, 220',
    dark: '#d4cdb3',
    light: '#fffef0',
    name: { es: 'Beige', en: 'Beige' }
  }
};

// ============================================
// PALETA COMPLETA (TODOS LOS COLORES)
// ============================================

export const ALL_COLORS = {
  ...REDS,
  ...BLUES,
  ...GREENS,
  ...YELLOWS_ORANGES,
  ...PURPLES_PINKS,
  ...BROWNS
};

// ============================================
// SETS DE COLORES PRE-CONFIGURADOS
// ============================================

export const COLOR_SETS = {
  // Básico - 5 colores primarios
  basic: ['red', 'blue', 'green', 'yellow', 'purple'],
  
  // Extendido - 8 colores comunes
  extended: ['red', 'blue', 'cyan', 'green', 'yellow', 'orange', 'purple', 'pink'],
  
  // Vibrantes - colores brillantes
  vibrant: ['crimson', 'sky', 'emerald', 'amber', 'violet', 'fuchsia', 'teal', 'orange'],
  
  // Neón - colores brillantes estilo neón
  neon: ['neon', 'cyan', 'fuchsia', 'yellow', 'orange', 'pink'],
  
  // Pasteles - colores suaves (usando variantes light)
  pastel: ['rose', 'sky', 'mint', 'amber', 'violet', 'pink'],
  
  // Arcoíris
  rainbow: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
  
  // Cálidos
  warm: ['red', 'orange', 'amber', 'gold', 'rose'],
  
  // Fríos
  cool: ['blue', 'cyan', 'teal', 'indigo', 'violet'],
  
  // Todos
  all: Object.keys(ALL_COLORS)
};

// ============================================
// FUNCIONES HELPER
// ============================================

/**
 * Obtiene un color por su nombre
 * @param {string} colorName - Nombre del color (ej: 'red', 'blue')
 * @returns {object} Objeto con hex, rgb, dark, light, name
 */
export function getColor(colorName) {
  return ALL_COLORS[colorName] || ALL_COLORS.blue;
}

/**
 * Obtiene un set de colores pre-configurado
 * @param {string} setName - Nombre del set ('basic', 'extended', etc)
 * @param {number} count - Cantidad de colores (opcional)
 * @returns {array} Array de objetos de color
 */
export function getColorSet(setName = 'basic', count = null) {
  const set = COLOR_SETS[setName] || COLOR_SETS.basic;
  const colors = set.map(key => ({
    id: key,
    ...ALL_COLORS[key]
  }));
  return count ? colors.slice(0, count) : colors;
}

/**
 * Convierte un color a formato rgba
 * @param {string} colorName - Nombre del color
 * @param {number} alpha - Transparencia (0-1)
 * @returns {string} String rgba
 */
export function toRgba(colorName, alpha = 1) {
  const color = getColor(colorName);
  return `rgba(${color.rgb}, ${alpha})`;
}

/**
 * Obtiene una variante del color (dark o light)
 * @param {string} colorName - Nombre del color
 * @param {string} variant - 'dark' o 'light'
 * @returns {string} Código hex del color
 */
export function getColorVariant(colorName, variant = 'hex') {
  const color = getColor(colorName);
  return color[variant] || color.hex;
}

/**
 * Genera un gradiente CSS
 * @param {string} colorName - Nombre del color
 * @param {string} direction - Dirección del gradiente ('to right', '135deg', etc)
 * @returns {string} String de gradiente CSS
 */
export function createGradient(colorName, direction = 'to right') {
  const color = getColor(colorName);
  return `linear-gradient(${direction}, ${color.hex}, ${color.light})`;
}

/**
 * Obtiene colores aleatorios del set especificado
 * @param {string} setName - Nombre del set
 * @param {number} count - Cantidad de colores
 * @returns {array} Array de colores aleatorios
 */
export function getRandomColors(setName = 'extended', count = 4) {
  const set = [...(COLOR_SETS[setName] || COLOR_SETS.extended)];
  const shuffled = set.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(key => ({
    id: key,
    ...ALL_COLORS[key]
  }));
}

// ============================================
// EXPORTS RÁPIDOS PARA COMPATIBILIDAD
// ============================================

// Para usar fácilmente en componentes
export const COLORS = ALL_COLORS;

// Array de colores hex para casos simples
export const COLOR_ARRAY = Object.keys(ALL_COLORS).map(key => ALL_COLORS[key].hex);

// Mapeo simple nombre → hex
export const COLOR_MAP = Object.keys(ALL_COLORS).reduce((acc, key) => {
  acc[key] = ALL_COLORS[key].hex;
  return acc;
}, {});
