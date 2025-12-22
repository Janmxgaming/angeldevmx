import { useLanguage } from '../context/LanguageContext';
import { FolderGit2 } from 'lucide-react';

export default function ProjectsPage() {
  const { t, theme } = useLanguage();
  const isNeon = theme === 'neon';
  const primaryColor = isNeon ? '#00ff41' : '#0EA5E9';
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <FolderGit2 
          size={80} 
          className="mx-auto animate-pulse transition-colors duration-500" 
          style={{ color: primaryColor }}
        />
        <h1 
          className="text-5xl font-bold transition-colors duration-500"
          style={{ color: primaryColor }}
        >
          {t.games.comingSoon}
        </h1>
        <p className="text-gray-400 text-xl">Esta sección está en construcción 🚧</p>
        <div className="pt-4">
          <div 
            className="inline-block px-6 py-3 rounded-lg bg-gray-800/50 border transition-all duration-500"
            style={{ borderColor: `${isNeon ? 'rgba(0, 255, 65, 0.2)' : 'rgba(14, 165, 233, 0.2)'}` }}
          >
            <p className="text-gray-300">Aquí irán tus proyectos y portfolio</p>
          </div>
        </div>
      </div>
    </div>
  );
}