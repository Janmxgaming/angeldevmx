// ============================================
// ABOUT PAGE - Contenido
// ============================================

export const ABOUT_CONTENT = {
  intro: {
    title: { 
      es: '👋 Hola, soy José Ángel', 
      en: '👋 Hi, I\'m José Ángel' 
    },
    subtitle: { 
      es: 'Desarrollador Full Stack | Sistemas, Lógica & Soluciones',
      en: 'Full Stack Developer | Systems, Logic & Solutions'
    },
    bio: {
      es: 'Desarrollador Full Stack con enfoque en sistemas, lógica y construcción de soluciones claras. Me interesa crear software funcional, entendible y mantenible, más allá de solo "hacer que funcione".',
      en: 'Full Stack Developer focused on systems, logic, and building clear solutions. I\'m interested in creating functional, understandable, and maintainable software, beyond just "making it work".'
    },
    description: {
      es: 'Trabajo principalmente con JavaScript y Python, desarrollando proyectos web con React, Next.js y Node.js, y utilizando bases de datos como MongoDB. Me siento cómodo trabajando con control de versiones mediante Git y GitHub, y cuidando la estructura y evolución de los proyectos.',
      en: 'I mainly work with JavaScript and Python, developing web projects with React, Next.js, and Node.js, and using databases like MongoDB. I feel comfortable working with version control through Git and GitHub, and taking care of project structure and evolution.'
    },
    approach: {
      es: 'Mi forma de trabajar se basa en entender el sistema completo: el problema, la lógica, el proceso y la solución. He aprendido a mantener enfoque bajo presión, a mejorar a partir de errores y a construir con constancia, dejando cada proyecto mejor de como lo encontré.',
      en: 'My way of working is based on understanding the complete system: the problem, the logic, the process, and the solution. I\'ve learned to maintain focus under pressure, to improve from mistakes, and to build with consistency, leaving each project better than I found it.'
    },
    interests_work: {
      es: 'Me interesan los proyectos donde hay estructura, crecimiento y mejora continua. Disfruto trabajar en sistemas que evolucionan con el tiempo y en herramientas que aportan valor real.',
      en: 'I\'m interested in projects where there is structure, growth, and continuous improvement. I enjoy working on systems that evolve over time and tools that provide real value.'
    },
    interests_personal: {
      es: 'Fuera del código, me gustan los simuladores, los videojuegos de estrategia, la mecánica y los proyectos técnicos donde puedo aprender y optimizar cosas poco a poco.',
      en: 'Outside of coding, I enjoy simulators, strategy video games, mechanics, and technical projects where I can learn and optimize things step by step.'
    },
    vision: {
      es: 'Actualmente estoy construyendo una etapa profesional sólida, con visión a largo plazo, buscando entornos donde aportar, aprender y seguir creciendo.',
      en: 'I\'m currently building a solid professional stage, with long-term vision, looking for environments where I can contribute, learn, and continue growing.'
    },
    socials: {
      github: 'https://github.com/angeldevmx',
      twitter: 'https://x.com/angeldevmx',
      instagram: 'https://instagram.com/angeldevmx'
    }
  },
  
  skills: [
    { 
      category: { es: 'Frontend', en: 'Frontend' },
      items: ['React', 'Next.js', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'],
      icon: '⚛️',
      color: 'cyan',
      level: 'advanced'
    },
    {
      category: { es: 'Backend & APIs', en: 'Backend & APIs' },
      items: ['Node.js', 'Express', 'API Design', 'RESTful APIs'],
      icon: '⚙️',
      color: 'green',
      level: 'advanced'
    },
    {
      category: { es: 'Bases de Datos', en: 'Databases' },
      items: ['MongoDB', 'Database Design', 'Data Modeling'],
      icon: '🗄️',
      color: 'emerald',
      level: 'intermediate'
    },
    {
      category: { es: 'Lenguajes', en: 'Languages' },
      items: ['JavaScript', 'Python', 'HTML/CSS'],
      icon: '💻',
      color: 'blue',
      level: 'advanced'
    },
    {
      category: { es: 'Herramientas & DevOps', en: 'Tools & DevOps' },
      items: ['Git', 'GitHub', 'VS Code', 'npm/pnpm', 'Terminal'],
      icon: '🛠️',
      color: 'orange',
      level: 'advanced'
    },
    {
      category: { es: 'Arquitectura & Diseño', en: 'Architecture & Design' },
      items: ['System Design', 'Clean Code', 'Best Practices', 'Scalability'],
      icon: '🏗️',
      color: 'purple',
      level: 'intermediate'
    }
  ],

  experience: [
    {
      title: { es: 'Desarrollador Full Stack', en: 'Full Stack Developer' },
      company: 'Proyectos Independientes',
      period: { es: '2024 - Presente', en: '2024 - Present' },
      type: 'freelance',
      description: {
        es: 'Desarrollo de aplicaciones web completas, bots de automatización y herramientas útiles con enfoque en arquitectura limpia y código mantenible.',
        en: 'Development of complete web applications, automation bots, and useful tools with focus on clean architecture and maintainable code.'
      },
      technologies: ['React', 'Next.js', 'Node.js', 'Python', 'MongoDB'],
      highlights: [
        { es: 'Desarrollo de aplicaciones web con React y Next.js', en: 'Web application development with React and Next.js' },
        { es: 'Bot de Telegram para automatización', en: 'Telegram bot for automation' },
        { es: 'Herramientas personalizadas (Temporizador, Notepad)', en: 'Custom tools (Timer, Notepad)' },
        { es: 'Enfoque en estructura y evolución de proyectos', en: 'Focus on project structure and evolution' }
      ]
    }
  ],

  education: [
    {
      degree: { es: 'Formación Continua en Desarrollo', en: 'Continuous Development Training' },
      institution: { es: 'Autodidacta & Práctica', en: 'Self-taught & Practice' },
      year: { es: 'En curso', en: 'Ongoing' },
      type: 'continuous',
      description: {
        es: 'Aprendizaje continuo mediante proyectos reales, documentación oficial y mejores prácticas de la industria.',
        en: 'Continuous learning through real projects, official documentation, and industry best practices.'
      },
      experience: {
        programming: { es: '2 años', en: '2 years' },
        professional: { es: '1 año', en: '1 year' }
      }
    }
  ],

  projects: {
    summary: {
      es: '🚀 Proyectos Desarrollados',
      en: '🚀 Developed Projects'
    },
    list: [
      {
        title: { es: 'Aplicaciones Web', en: 'Web Applications' },
        count: 3,
        description: { 
          es: 'Desarrollo con React, Next.js y Node.js', 
          en: 'Development with React, Next.js and Node.js' 
        },
        icon: '🌐'
      },
      {
        title: { es: 'Bot de Telegram', en: 'Telegram Bot' },
        count: 1,
        description: { 
          es: 'Automatización y funcionalidad avanzada', 
          en: 'Automation and advanced functionality' 
        },
        icon: '🤖'
      },
      {
        title: { es: 'Juegos Web Interactivos', en: 'Interactive Web Games' },
        count: { es: 'En este portfolio', en: 'In this portfolio' },
        description: { 
          es: 'Lógica de juegos con React', 
          en: 'Game logic with React' 
        },
        icon: '🎮'
      },
      {
        title: { es: 'Herramientas Útiles', en: 'Useful Tools' },
        count: 2,
        description: { 
          es: 'Temporizador y Notepad personalizados', 
          en: 'Custom Timer and Notepad' 
        },
        icon: '🛠️'
      }
    ]
  },

  values: [
    {
      icon: '🎯',
      title: { es: 'Soluciones Claras', en: 'Clear Solutions' },
      description: {
        es: 'Código funcional, entendible y mantenible',
        en: 'Functional, understandable, and maintainable code'
      }
    },
    {
      icon: '🏗️',
      title: { es: 'Arquitectura Sólida', en: 'Solid Architecture' },
      description: {
        es: 'Estructura y evolución de proyectos',
        en: 'Project structure and evolution'
      }
    },
    {
      icon: '📈',
      title: { es: 'Mejora Continua', en: 'Continuous Improvement' },
      description: {
        es: 'Dejar cada proyecto mejor que antes',
        en: 'Leave each project better than before'
      }
    },
    {
      icon: '🧠',
      title: { es: 'Pensamiento Sistémico', en: 'Systems Thinking' },
      description: {
        es: 'Entender el problema completo',
        en: 'Understand the complete problem'
      }
    }
  ],

  interests: {
    title: { es: 'Intereses & Hobbies', en: 'Interests & Hobbies' },
    items: [
      { 
        icon: '🎮', 
        text: { 
          es: 'Simuladores y videojuegos de estrategia',
          en: 'Simulators and strategy video games'
        }
      },
      { 
        icon: '🔧', 
        text: { 
          es: 'Mecánica y proyectos técnicos',
          en: 'Mechanics and technical projects'
        }
      },
      { 
        icon: '⚙️', 
        text: { 
          es: 'Optimización de sistemas',
          en: 'System optimization'
        }
      },
      { 
        icon: '📚', 
        text: { 
          es: 'Aprendizaje continuo de tecnologías',
          en: 'Continuous technology learning'
        }
      }
    ]
  },

  availability: {
    status: 'available',
    message: {
      es: '🟢 Disponible para proyectos y colaboraciones',
      en: '🟢 Available for projects and collaborations'
    },
    lookingFor: {
      es: 'Buscando entornos con estructura, crecimiento y mejora continua donde aportar valor real.',
      en: 'Looking for environments with structure, growth, and continuous improvement where I can provide real value.'
    }
  }
};