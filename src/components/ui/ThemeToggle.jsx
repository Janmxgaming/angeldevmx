import { useLanguage } from '../../context/LanguageContext';
import { Zap, Sparkles } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useLanguage();
  const isNeon = theme === 'neon';

  return (
    <button
      onClick={toggleTheme}
      className="relative rounded-full transition-all duration-500 hover:scale-105"
      style={{
        width: '70px',
        height: '36px',
        background: isNeon 
          ? 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)'
          : 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        border: `2px solid ${isNeon ? '#00ff41' : '#0EA5E9'}`,
        boxShadow: isNeon 
          ? '0 4px 20px rgba(0, 255, 65, 0.4), inset 0 2px 5px rgba(0, 0, 0, 0.5)'
          : '0 4px 20px rgba(14, 165, 233, 0.4), inset 0 2px 5px rgba(0, 0, 0, 0.5)'
      }}
    >
      {/* Círculo deslizante con efecto 3D */}
      <div
        className="absolute rounded-full transition-all duration-500 flex items-center justify-center"
        style={{
          width: '28px',
          height: '28px',
          top: '2px',
          left: isNeon ? '4px' : '36px',
          background: isNeon
            ? 'linear-gradient(135deg, #00ff41 0%, #00cc33 100%)'
            : 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
          boxShadow: isNeon
            ? '0 0 25px rgba(0, 255, 65, 0.9), 0 4px 8px rgba(0, 0, 0, 0.5), inset 0 -2px 8px rgba(0, 0, 0, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.4)'
            : '0 0 25px rgba(14, 165, 233, 0.9), 0 4px 8px rgba(0, 0, 0, 0.5), inset 0 -2px 8px rgba(0, 0, 0, 0.3), inset 0 2px 8px rgba(255, 255, 255, 0.4)'
        }}
      >
        {isNeon ? (
          <Zap 
            size={16} 
            className="text-black" 
            strokeWidth={3} 
            fill="currentColor"
          />
        ) : (
          <Sparkles 
            size={16} 
            className="text-white" 
            strokeWidth={3}
          />
        )}
      </div>
    </button>
  );
}