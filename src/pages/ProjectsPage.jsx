import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { getTitleStyle, getDividerStyle } from '../utils/styleHelpers';
import { FolderGit2, RefreshCw } from 'lucide-react';
import RepoCard from '../components/ui/RepoCard';

const API_URL = import.meta.env.VITE_LEADERBOARD_API?.replace('/api/leaderboard', '') || 'http://localhost:3001';

export default function ProjectsPage() {
  const { t, theme } = useLanguage();
  const { primary, primaryRgba, gradient } = useThemeStyles();
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Validar que existan las traducciones
  const translations = t.projects || {
    title: 'Projects',
    subtitle: 'Explore my work',
    loading: 'Loading...',
    error: 'Error loading',
    retry: 'Retry',
    noRepos: 'No repositories',
    viewCode: 'View Code',
    liveDemo: 'Live Demo',
    updated: 'Updated',
    noDescription: 'No description'
  };

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching repos from:', `${API_URL}/api/github/repos`);
      const response = await fetch(`${API_URL}/api/github/repos`);
      if (!response.ok) throw new Error('Failed to fetch repos');
      const data = await response.json();
      console.log('Repos data received:', data);
      setRepos(data.repos || []);
    } catch (err) {
      console.error('Error fetching repos:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Título */}
        <div className="text-center mb-12" key={theme}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <FolderGit2 
              size={48} 
              className="transition-all duration-500"
              style={{ color: primary }}
            />
            <h1 
              className="text-5xl md:text-6xl font-bold transition-all duration-500"
              style={getTitleStyle(gradient, primaryRgba)}
            >
              {translations.title}
            </h1>
          </div>
          <p className="text-gray-400 text-lg mb-4">{translations.subtitle}</p>
          <div 
            className="w-24 h-1 rounded-full mx-auto transition-all duration-500"
            style={getDividerStyle(primary, primaryRgba)}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div 
              className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mb-4"
              style={{ borderColor: primary, borderTopColor: 'transparent' }}
            />
            <p className="text-gray-400 text-lg">{translations.loading}</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div 
              className="px-6 py-4 rounded-lg border mb-4"
              style={{
                backgroundColor: primaryRgba(0.1),
                borderColor: primary
              }}
            >
              <p className="text-gray-300 mb-4">{translations.error}</p>
              <button
                onClick={fetchRepos}
                className="flex items-center gap-2 mx-auto px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: primaryRgba(0.2),
                  color: primary,
                  border: `1px solid ${primary}`
                }}
              >
                <RefreshCw size={16} />
                {translations.retry}
              </button>
            </div>
          </div>
        )}

        {/* Repos Grid */}
        {!loading && !error && repos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {repos.map(repo => (
              <RepoCard 
                key={repo.name} 
                repo={repo}
                translations={translations}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && repos.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">{translations.noRepos}</p>
          </div>
        )}
        
      </div>
    </div>
  );
}