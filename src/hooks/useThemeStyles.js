import { useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { THEME_TYPES, COLORS } from '../constants/theme';

/**
 * Hook personalizado que proporciona estilos dinámicos basados en el tema actual
 * @returns {Object} Objeto con colores y utilidades de estilo para el tema actual
 */
export function useThemeStyles() {
  const { theme } = useLanguage();
  const isNeon = theme === THEME_TYPES.NEON;

  const themeColors = useMemo(() => {
    const colors = isNeon ? COLORS.neon : COLORS.normal;
    
    return {
      primary: colors.primary,
      primaryRgba: colors.primaryRgba,
      primaryRgb: colors.primaryRgb,
      gradient: colors.gradient,
      secondary: colors.secondary,
      isNeon
    };
  }, [isNeon]);

  return themeColors;
}
