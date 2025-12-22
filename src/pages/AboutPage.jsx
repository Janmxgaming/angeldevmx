import { useLanguage } from '../context/LanguageContext';
import { ABOUT_CONTENT } from '../config/content';
import { User, Github, Twitter, Instagram, Code, Award, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const { theme, lang } = useLanguage();
  const isNeon = theme === 'neon';
  const primaryColor = isNeon ? '#00ff41' : '#0EA5E9';
  const primaryColorRgba = isNeon ? 'rgba(0, 255, 65' : 'rgba(14, 165, 233';

  // Obtener contenido traducido
  const intro = translateObject(ABOUT_CONTENT.intro, lang);
  const skills = ABOUT_CONTENT.skills.map(skill => ({
    ...skill,
    category: skill.category[lang]
  }));
  const experience = ABOUT_CONTENT.experience.map(exp => translateObject(exp, lang));
  const projects = translateObject(ABOUT_CONTENT.projects, lang);
  const values = ABOUT_CONTENT.values.map(val => translateObject(val, lang));
  const availability = translateObject(ABOUT_CONTENT.availability, lang);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header / Intro */}
        <section className="mb-16 text-center">
          <div className="mb-8">
            {/* Avatar placeholder */}
            <div 
              className="w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${isNeon ? '#00cc33' : '#0284C7'})`,
                boxShadow: `0 0 60px ${primaryColorRgba}, 0.6)`
              }}
            >
              <User size={64} className={isNeon ? 'text-black' : 'text-white'} />
            </div>

            <h1 
              className="text-5xl md:text-6xl font-bold mb-4 transition-all duration-500"
              key={theme}
              style={{
                background: `linear-gradient(to right, ${primaryColor}, ${isNeon ? '#4dff88' : '#38BDF8'}, ${primaryColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: `drop-shadow(0 0 30px ${primaryColorRgba}, 0.6))`
              }}
            >
              {intro.title}
            </h1>

            <p className="text-2xl text-gray-300 mb-4">{intro.subtitle}</p>
            
            <div className="flex flex-wrap justify-center gap-4 text-gray-400 mb-6">
              <a 
                href={ABOUT_CONTENT.intro.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Github size={18} style={{ color: primaryColor }} />
                <span>GitHub</span>
              </a>
              <a 
                href={ABOUT_CONTENT.intro.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Twitter size={18} style={{ color: primaryColor }} />
                <span>X</span>
              </a>
              <a 
                href={ABOUT_CONTENT.intro.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Instagram size={18} style={{ color: primaryColor }} />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Bio */}
          <div className="max-w-3xl mx-auto space-y-4 text-gray-300 text-lg">
            <p>{intro.bio}</p>
            <p>{intro.description}</p>
            <p>{intro.current}</p>
            <p 
              className="font-semibold transition-colors duration-500" 
              style={{ color: primaryColor }}
            >
              {intro.vision}
            </p>
          </div>

          {/* Availability Badge */}
          {availability.status === 'available' && (
            <div 
              className="inline-block mt-6 px-6 py-3 rounded-full font-semibold transition-all duration-500"
              style={{
                background: `${primaryColorRgba}, 0.2)`,
                border: `2px solid ${primaryColor}`,
                color: primaryColor,
                boxShadow: `0 0 20px ${primaryColorRgba}, 0.4)`
              }}
            >
              {availability.message}
            </div>
          )}
        </section>

        {/* Projects Summary */}
        <section className="mb-16">
          <h2 
            className="text-3xl font-bold mb-8 text-center transition-colors duration-500"
            style={{ color: primaryColor }}
          >
            {projects.summary}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.list.map((project, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105"
                style={{
                  background: `${primaryColorRgba}, 0.05)`,
                  borderColor: `${primaryColorRgba}, 0.3)`,
                  boxShadow: `0 4px 20px ${primaryColorRgba}, 0.1)`
                }}
              >
                <div className="flex items-start gap-4">
                  <span className="text-4xl">{project.icon}</span>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {project.title} 
                      <span className="ml-2 text-sm" style={{ color: primaryColor }}>
                        ({project.count})
                      </span>
                    </h3>
                    <p className="text-gray-400">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-16">
          <h2 
            className="text-3xl font-bold mb-8 text-center transition-colors duration-500"
            style={{ color: primaryColor }}
          >
            <Code className="inline mr-2" size={32} />
            {lang === 'es' ? 'Habilidades Técnicas' : 'Technical Skills'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border-2 transition-all duration-300 hover:-translate-y-2"
                style={{
                  background: `${primaryColorRgba}, 0.05)`,
                  borderColor: `${primaryColorRgba}, 0.3)`,
                  boxShadow: `0 4px 20px ${primaryColorRgba}, 0.1)`
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{skill.icon}</span>
                  <h3 className="text-xl font-bold text-white">{skill.category}</h3>
                </div>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li key={i} className="text-gray-400 flex items-center gap-2">
                      <span style={{ color: primaryColor }}>▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <h2 
            className="text-3xl font-bold mb-8 text-center transition-colors duration-500"
            style={{ color: primaryColor }}
          >
            <Code className="inline mr-2" size={32} />
            {lang === 'es' ? 'Experiencia' : 'Experience'}
          </h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border-2 transition-all duration-300"
                style={{
                  background: `${primaryColorRgba}, 0.05)`,
                  borderColor: `${primaryColorRgba}, 0.3)`,
                  boxShadow: `0 4px 20px ${primaryColorRgba}, 0.1)`
                }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{exp.title}</h3>
                    <p className="text-gray-400">{exp.company}</p>
                  </div>
                  <span 
                    className="text-sm font-semibold px-4 py-2 rounded-full mt-2 md:mt-0"
                    style={{
                      background: `${primaryColorRgba}, 0.2)`,
                      color: primaryColor
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">{lang === 'es' ? 'Tecnologías:' : 'Technologies:'}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-sm border"
                        style={{
                          borderColor: `${primaryColorRgba}, 0.5)`,
                          color: primaryColor
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">{lang === 'es' ? 'Logros destacados:' : 'Key achievements:'}</p>
                  <ul className="space-y-1">
                    {exp.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-400 flex items-start gap-2">
                        <span style={{ color: primaryColor }}>✓</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 
            className="text-3xl font-bold mb-8 text-center transition-colors duration-500"
            style={{ color: primaryColor }}
          >
            <Award className="inline mr-2" size={32} />
            {lang === 'es' ? 'Valores & Enfoque' : 'Values & Focus'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border-2 text-center transition-all duration-300 hover:scale-105"
                style={{
                  background: `${primaryColorRgba}, 0.05)`,
                  borderColor: `${primaryColorRgba}, 0.3)`,
                  boxShadow: `0 4px 20px ${primaryColorRgba}, 0.1)`
                }}
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

// Helper para traducir objetos
function translateObject(obj, lang) {
  if (!obj) return obj;
  if (typeof obj !== 'object') return obj;
  
  // Si el objeto tiene la estructura {es, en}, retornar el idioma correcto
  if (Object.prototype.hasOwnProperty.call(obj, 'es') && Object.prototype.hasOwnProperty.call(obj, 'en')) {
    return obj[lang] || obj.es;
  }
  
  // Si es un array, traducir cada elemento
  if (Array.isArray(obj)) {
    return obj.map(item => translateObject(item, lang));
  }
  
  // Si es un objeto, traducir cada propiedad
  const result = {};
  for (const key in obj) {
    result[key] = translateObject(obj[key], lang);
  }
  return result;
}