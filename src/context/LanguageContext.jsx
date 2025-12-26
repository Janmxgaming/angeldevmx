/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de LanguageProvider');
  }
  return context;
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState('es');
  const [theme, setTheme] = useState('neon'); // 'neon' o 'professional'

  // Aplicar data-theme al body para que el scrollbar cambie de color
  useEffect(() => {
    const themeMap = {
      'neon': 'neon',
      'professional': 'cyan'
    };
    document.documentElement.setAttribute('data-theme', themeMap[theme] || 'neon');
  }, [theme]);

  const toggleLanguage = () => {
    setLang(prevLang => prevLang === 'es' ? 'en' : 'es');
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'neon' ? 'professional' : 'neon');
  };

  const t = translations[lang];

  const value = { lang, setLang, toggleLanguage, theme, toggleTheme, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}