import { useLanguage } from '../context/LanguageContext';
import { Sparkles } from 'lucide-react';
import { useThemeStyles } from '../hooks/useThemeStyles';

export default function HomePage({ setCurrentPage }) {
  const { t, theme } = useLanguage();
  const { primary: primaryColor, primaryRgb } = useThemeStyles();
  const isNeon = theme === 'neon';
  const gradientFrom = isNeon ? primaryColor : primaryColor;
  const gradientVia = isNeon ? '#4dff88' : '#38BDF8';
  const gradientTo = isNeon ? primaryColor : primaryColor;
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-4xl">
        
        {/* Logo animado con sombra dinámica */}
        <div className="flex justify-center mb-8" key={`logo-${theme}`}>
          <div 
            className="w-32 h-32 rounded-full flex items-center justify-center animate-pulse transition-all duration-500"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientVia} 100%)`,
              boxShadow: `0 0 60px rgba(${primaryRgb}, 0.6), 0 0 100px rgba(${primaryRgb}, 0.3)`
            }}
          >
            <span className="text-6xl filter drop-shadow-lg">⚙️</span>
          </div>
        </div>

        {/* Título principal con colores dinámicos */}
        <div className="space-y-4" key={theme}>
          <p 
            className="text-xl md:text-2xl font-mono font-bold tracking-wider uppercase transition-all duration-500"
            style={{
              color: primaryColor,
                textShadow: `0 0 20px rgba(${primaryRgb}, 0.8), 0 0 40px rgba(${primaryRgb}, 0.5)`,
              letterSpacing: '0.2em'
            }}
          >
            {t.home.welcome}
          </p>
          
          <h1 
            className="text-6xl md:text-8xl font-black tracking-tight transition-all duration-500"
            style={{
              background: `linear-gradient(to right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
                filter: `drop-shadow(0 0 30px rgba(${primaryRgb}, 0.6))`
            }}
          >
            {t.home.title}
          </h1>
          
          <p 
            className="text-2xl md:text-3xl font-light transition-colors duration-500"
            style={{
              color: '#e0e0e0',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
            }}
          >
            {t.home.subtitle}
          </p>
          
          <p 
            className="text-lg italic transition-colors duration-500"
            style={{
              color: '#a0a0a0',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)',
            }}
          >
            {t.home.description}
          </p>
        </div>

        {/* CTA Button con colores dinámicos */}
        <div className="flex justify-center pt-8">
          <button
            onClick={() => setCurrentPage('games')}
            className="group relative overflow-hidden text-lg px-10 py-5 rounded-xl font-bold transition-all duration-300 transform hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientVia} 100%)`,
                  boxShadow: `0 0 30px rgba(${primaryRgb}, 0.6), 0 10px 40px rgba(0, 0, 0, 0.5)`,
              color: isNeon ? '#000' : '#fff'
            }}
          >
            <span className="flex items-center gap-3 relative z-10">
              <Sparkles size={24} />
              <span>{t.home.cta}</span>
            </span>
            
            {/* Efecto hover */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${gradientVia} 0%, ${gradientFrom} 100%)`,
                boxShadow: `0 0 20px rgba(${primaryRgb}, 0.6)`
              }}
            />
          </button>
        </div>

        {/* Línea decorativa animada */}
        <div className="pt-12 flex justify-center">
          <div 
            className="w-64 h-1 rounded-full animate-pulse transition-all duration-500"
            style={{
              background: `linear-gradient(to right, transparent, ${primaryColor}, transparent)`,
              boxShadow: `0 0 20px rgba(${primaryRgb}, 0.6)`
            }}
          />
        </div>
      </div>
    </div>
  );
}