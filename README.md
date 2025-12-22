# 🎮 AngelDevMX - Portfolio & Game Hub

Portfolio personal con sistema de juegos interactivos construido con React + Vite.

## ✨ Características

- 🎯 **Sistema de juegos modular** - Agrega juegos en minutos
- ⚡ **Lazy loading automático** - Carga bajo demanda con code splitting
- 🎨 **Sistema de colores centralizado** - 25+ colores organizados
- 📊 **Estadísticas persistentes** - LocalStorage para progreso y logros
- 🌍 **Multiidioma** - Español e Inglés
- 🌈 **Temas dinámicos** - Modo Normal y Neón
- 📱 **Totalmente responsive** - Optimizado para móviles

## 🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev

# Build para producción
npm run build
```

## 📖 Documentación

- **[QUICK_START.md](./QUICK_START.md)** - Ejemplos prácticos de uso
- **[SCALABILITY_GUIDE.md](./SCALABILITY_GUIDE.md)** - Sistema completo explicado
- **[COLORS_GUIDE.md](./COLORS_GUIDE.md)** - Paleta de colores

## 🎮 Agregar un Nuevo Juego

1. Crea el componente (usa `GameTemplate.jsx` como base)
2. Activa en `src/config/games.js`
3. ¡Listo! Aparece automáticamente

```javascript
// config/games.js
const MyGame = () => import('../components/games/MyGame');

myGame: {
  id: 'myGame',
  component: MyGame,
  enabled: true,  // ← Cambiar a true
  // ... metadata
}
```

## 📁 Estructura

```
src/
├── components/
│   ├── games/          # Juegos individuales
│   ├── shared/         # Componentes compartidos
│   └── ui/             # UI components
├── config/             # ⭐ Sistema de configuración
│   ├── games.js        # Registro de juegos
│   └── content.js      # Contenido de páginas
├── constants/          # Colores y temas
├── hooks/              # ⭐ Custom hooks
│   └── useGameHelpers.js
├── pages/              # Páginas principales
└── utils/              # Utilidades
```

## 🛠️ Tecnologías

- React 18+ con Hooks
- Vite para build ultra-rápido
- Tailwind CSS para estilos
- Context API para estado global
- LocalStorage para persistencia

## 🎯 Juegos Disponibles

✅ **Bottle Sort** - Ordena colores en botellas  
✅ **Bottle Guess** - Adivina el color mezclado  
✅ **Tic Tac Toe** - Clásico con IA  
🔜 **Snake** - Próximamente  
🔜 **Memory** - Próximamente  
🔜 **Word Search** - Próximamente  

## 🤝 Contribuir

Este es un proyecto personal, pero si encuentras bugs o tienes sugerencias, son bienvenidas.

## 📝 Notas Técnicas

- **Code splitting**: Cada juego se carga solo cuando se necesita
- **Performance**: Lazy loading + Vite optimizations
- **Mantenibilidad**: Sistema modular tipo plugin
- **Escalabilidad**: Agregar contenido sin tocar componentes

---

**Autor**: AngelDevMX  
**Versión**: 2.0.0  
**Licencia**: MIT
