import { Home, Gamepad2, User, FolderGit2, Mail, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ThemeToggle from '../ui/ThemeToggle';

export default function Navbar({ currentPage, setCurrentPage }) {
  const { lang, toggleLanguage, theme, t } = useLanguage();
  const isNeon = theme === 'neon';
  
  const primaryColor = isNeon ? '#00ff41' : '#0EA5E9';
  const primaryColorRgba = isNeon ? 'rgba(0, 255, 65' : 'rgba(14, 165, 233';
  
  const navItems = [
    { id: 'home', icon: Home, label: t.nav.home },
    { id: 'games', icon: Gamepad2, label: t.nav.games },
    { id: 'about', icon: User, label: t.nav.about },
    { id: 'projects', icon: FolderGit2, label: t.nav.projects },
    { id: 'contact', icon: Mail, label: t.nav.contact }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b transition-colors duration-500"
      style={{ borderColor: `${primaryColorRgba}, 0.2)` }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold transition-colors duration-500" style={{ color: primaryColor }}>
              AngelDevMX
            </div>
          </div>

          {/* Nav Items - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === item.id
                    ? 'text-black font-semibold shadow-lg'
                    : 'text-gray-400'
                }`}
                style={currentPage === item.id ? {
                  backgroundColor: primaryColor,
                  boxShadow: `0 0 20px ${primaryColorRgba}, 0.5)`,
                  color: isNeon ? '#000' : '#fff'
                } : {
                  color: '#9ca3af'
                }}
                onMouseEnter={(e) => {
                  if (currentPage !== item.id) {
                    e.currentTarget.style.color = primaryColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentPage !== item.id) {
                    e.currentTarget.style.color = '#9ca3af';
                  }
                }}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
          
          {/* Theme Toggle + Language */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-900 border transition-all duration-500 transform hover:scale-105"
              style={{
                borderColor: `${primaryColorRgba}, 0.3)`,
                color: primaryColor,
                boxShadow: `0 0 15px ${primaryColorRgba}, 0.2)`
              }}
            >
              <Globe size={18} />
              <span className="font-semibold">{lang.toUpperCase()}</span>
            </button>
          </div>
        </div>

        {/* Nav Items - Mobile */}
        <div className="md:hidden flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 whitespace-nowrap ${
                currentPage === item.id
                  ? 'font-semibold'
                  : 'text-gray-400'
              }`}
              style={currentPage === item.id ? {
                backgroundColor: primaryColor,
                boxShadow: `0 0 15px ${primaryColorRgba}, 0.5)`,
                color: isNeon ? '#000' : '#fff'
              } : {}}
            >
              <item.icon size={16} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}