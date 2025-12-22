/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';
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