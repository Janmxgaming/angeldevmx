import { Star, GitFork, ExternalLink, Globe } from 'lucide-react';
import { useThemeStyles } from '../../hooks/useThemeStyles';

export default function RepoCard({ repo, translations = {} }) {
  const { primary, primaryRgba, isNeon } = useThemeStyles();
  
  // Valores por defecto para traducciones
  const t = {
    noDescription: 'No description',
    viewCode: 'View Code',
    liveDemo: 'Live Demo',
    updated: 'Updated',
    ...translations
  };
  
  const cardBgColor = isNeon ? 'rgba(0, 20, 0, 0.8)' : 'rgba(15, 23, 42, 0.8)';
  const borderColor = isNeon ? 'rgba(0, 255, 65, 0.3)' : 'rgba(14, 165, 233, 0.3)';
  const hoverBorderColor = isNeon ? 'rgba(0, 255, 65, 0.6)' : 'rgba(14, 165, 233, 0.6)';
  
  const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Ruby: '#701516',
    Go: '#00ADD8',
    Rust: '#dea584',
    PHP: '#4F5D95',
    C: '#555555',
    'C++': '#f34b7d',
    'C#': '#178600',
    Swift: '#ffac45',
    Kotlin: '#A97BFF',
    Shell: '#89e051'
  };

  // Validación de datos
  if (!repo || !repo.owner) {
    return null;
  }

  return (
    <div
      className="group relative rounded-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl"
      style={{
        background: cardBgColor,
        border: `2px solid ${borderColor}`,
        boxShadow: `0 4px 20px ${primaryRgba(0.1)}`
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = hoverBorderColor;
        e.currentTarget.style.boxShadow = `0 8px 30px ${primaryRgba(0.3)}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = borderColor;
        e.currentTarget.style.boxShadow = `0 4px 20px ${primaryRgba(0.1)}`;
      }}
    >
      {/* Header con avatar */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <img 
            src={repo.owner.avatar_url} 
            alt={repo.owner.login}
            className="w-10 h-10 rounded-full border-2 transition-colors duration-500"
            style={{ borderColor: primary }}
          />
          <div className="flex-1 min-w-0">
            <h3 
              className="text-lg font-bold truncate transition-colors duration-500"
              style={{ color: primary }}
            >
              {repo.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
          {repo.description || t.noDescription}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Star size={16} className="transition-colors duration-500" style={{ color: primary }} />
            <span>{repo.stargazers_count || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork size={16} className="transition-colors duration-500" style={{ color: primary }} />
            <span>{repo.forks_count || 0}</span>
          </div>
          {repo.language && (
            <div className="flex items-center gap-1">
              <span 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: languageColors[repo.language] || '#888' }}
              />
              <span>{repo.language}</span>
            </div>
          )}
        </div>

        {/* Topics */}
        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {repo.topics.slice(0, 3).map(topic => (
              <span
                key={topic}
                className="px-2 py-1 text-xs rounded-full transition-all duration-500"
                style={{
                  backgroundColor: primaryRgba(0.15),
                  color: primary,
                  border: `1px solid ${primaryRgba(0.3)}`
                }}
              >
                {topic}
              </span>
            ))}
            {repo.topics.length > 3 && (
              <span className="text-xs text-gray-500 self-center">
                +{repo.topics.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: primaryRgba(0.15),
              color: primary,
              border: `1px solid ${primaryRgba(0.3)}`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = primaryRgba(0.25);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = primaryRgba(0.15);
            }}
          >
            <ExternalLink size={16} />
            {t.viewCode}
          </a>
          
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: primaryRgba(0.15),
                color: primary,
                border: `1px solid ${primaryRgba(0.3)}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = primaryRgba(0.25);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = primaryRgba(0.15);
              }}
              title={t.liveDemo}
            >
              <Globe size={16} />
            </a>
          )}
        </div>

        {/* Updated date */}
        <p className="text-xs text-gray-500 mt-3">
          {t.updated}: {new Date(repo.updated_at).toLocaleDateString('es-ES', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
          })}
        </p>
      </div>
    </div>
  );
}
