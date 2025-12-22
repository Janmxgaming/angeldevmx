# 🎨 Sistema de Estilos y Colores - Documentación

## 📂 Estructura de Archivos

### Constantes
- **`src/constants/theme.js`**: Paleta completa de colores, configuraciones y utilidades

### Hooks Personalizados
- **`src/hooks/useThemeStyles.js`**: Hook para acceder a estilos dinámicos del tema

### Componentes Reutilizables
- **`src/components/ui/GameButtons.jsx`**: Botones estilizados (Outline, Gradient, Danger)
- **`src/components/ui/GameBadges.jsx`**: Badges de puntuación y estadísticas
- **`src/components/ui/GameLayout.jsx`**: Componentes de layout (Título, Header, etc.)

### Utilidades
- **`src/utils/styleHelpers.js`**: Funciones helper para generar estilos

---

## 🎨 Sistema de Colores

### Paleta Extendida (GAME_COLORS)

Incluye **17 colores** organizados por familia:

#### 🔴 Rojos
- `red`: #ef4444 (Rojo básico)
- `crimson`: #dc143c (Carmesí profundo)

#### 🔵 Azules
- `blue`: #3b82f6 (Azul básico)
- `cyan`: #06b6d4 (Cian brillante)
- `indigo`: #6366f1 (Índigo)

#### 🟢 Verdes
- `green`: #10b981 (Verde básico)
- `emerald`: #10b981 (Esmeralda)
- `lime`: #84cc16 (Lima)

#### 🟡 Amarillos/Naranjas
- `yellow`: #fbbf24 (Amarillo)
- `amber`: #f59e0b (Ámbar)
- `orange`: #f97316 (Naranja)

#### 🟣 Púrpuras/Rosas
- `purple`: #a855f7 (Morado)
- `violet`: #8b5cf6 (Violeta)
- `pink`: #ec4899 (Rosa)
- `fuchsia`: #d946ef (Fucsia)

#### 🔷 Otros
- `teal`: #14b8a6 (Turquesa)

### Estructura de Color

Cada color incluye:
```javascript
{
  base: '#hex',      // Color principal
  dark: '#hex',      // Variante oscura
  light: '#hex',     // Variante clara
  rgba: 'rgba(...',  // Para transparencias
  name: {            // Nombres en múltiples idiomas
    es: 'Nombre',
    en: 'Name'
  }
}
```

### Sets de Colores (COLOR_SETS)

- **`basic`**: 5 colores básicos (red, blue, green, yellow, purple)
- **`extended`**: 8 colores vibrantes
- **`vibrant`**: 8 colores intensos alternativos
- **`all`**: Todos los 17 colores disponibles

---

## 🛠️ Utilidades

### getColorSet(setName, count)
Obtiene un set de colores configurado:
```javascript
// Obtener 4 colores básicos
const colors = getColorSet('basic', 4);

// Obtener todos los colores vibrantes
const vibrant = getColorSet('vibrant');
```

### getGameColor(colorKey)
Obtiene un color específico:
```javascript
const redColor = getGameColor('red');
// Retorna: { base, dark, light, rgba, name }
```

---

## 🧩 Componentes Reutilizables

### Botones

#### OutlineButton
Botón con borde y tema dinámico:
```jsx
<OutlineButton onClick={handleClick} icon={ArrowLeft}>
  Texto del botón
</OutlineButton>
```

Props: `onClick`, `icon`, `children`, `disabled`, `className`

#### GradientButton
Botón con gradiente temático:
```jsx
<GradientButton onClick={handleSubmit} icon={Send}>
  Enviar
</GradientButton>
```

Props: `onClick`, `icon`, `children`, `className`

#### DangerButton
Botón de acción peligrosa (rojo):
```jsx
<DangerButton onClick={handleReset} icon={RefreshCw}>
  Reiniciar
</DangerButton>
```

Props: `onClick`, `icon`, `children`, `className`

### Badges

#### ScoreBadge
Badge para mostrar puntuación:
```jsx
<ScoreBadge label="Nivel" value={5} />
```

Props: `label`, `value`, `className`

#### NeutralBadge
Badge gris para info secundaria:
```jsx
<NeutralBadge label="Empates" value={3} />
```

Props: `label`, `value`, `className`

#### BadgeGroup
Contenedor flex para múltiples badges:
```jsx
<BadgeGroup>
  <ScoreBadge label="X" value={score.X} />
  <ScoreBadge label="O" value={score.O} />
</BadgeGroup>
```

### Layout

#### GameTitle
Título principal con gradiente:
```jsx
<GameTitle>Título del Juego</GameTitle>
```

Props: `children`, `className`

#### GameSubtitle
Subtítulo descriptivo:
```jsx
<GameSubtitle>Instrucciones del juego</GameSubtitle>
```

Props: `children`, `className`

#### GameHeader
Encabezado con navegación y badges:
```jsx
<GameHeader>
  <OutlineButton onClick={goBack} icon={ArrowLeft}>
    Volver
  </OutlineButton>
  <BadgeGroup>
    <ScoreBadge label="Puntos" value={100} />
  </BadgeGroup>
</GameHeader>
```

Props: `children`, `onBack`, `backLabel`, `badges`

---

## 📝 Ejemplo de Uso Completo

```jsx
import { OutlineButton, GradientButton } from '../ui/GameButtons';
import { ScoreBadge, BadgeGroup } from '../ui/GameBadges';
import { GameTitle, GameHeader } from '../ui/GameLayout';
import { getColorSet } from '../../constants/theme';

function MiJuego({ setCurrentGame }) {
  const colors = getColorSet('extended', 6);
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <GameHeader>
          <OutlineButton onClick={() => setCurrentGame(null)} icon={ArrowLeft}>
            Volver
          </OutlineButton>
          
          <BadgeGroup>
            <ScoreBadge label="Puntos" value={score} />
            <ScoreBadge label="Nivel" value={level} />
          </BadgeGroup>
        </GameHeader>

        <GameTitle>Mi Juego Increíble</GameTitle>
        
        {/* Tu contenido aquí */}
        
        <div className="flex justify-center gap-4">
          <GradientButton onClick={handlePlay} icon={Play}>
            Jugar
          </GradientButton>
          
          <DangerButton onClick={handleReset} icon={RotateCcw}>
            Reiniciar
          </DangerButton>
        </div>
      </div>
    </div>
  );
}
```

---

## ✨ Beneficios del Sistema

1. **Escalabilidad**: Fácil agregar nuevos colores sin modificar componentes
2. **Consistencia**: Mismo estilo en toda la aplicación
3. **Mantenibilidad**: Cambios en un solo lugar
4. **Legibilidad**: Código más limpio y declarativo
5. **Reutilización**: Componentes y utilidades compartidas
6. **TypeSafety**: Mejor autocompletado en IDEs
7. **i18n**: Nombres de colores en múltiples idiomas

---

## 🚀 Próximas Mejoras Potenciales

- [ ] Agregar más variantes de botones (Success, Warning, Info)
- [ ] Crear componente Modal reutilizable
- [ ] Implementar sistema de notificaciones toast
- [ ] Agregar animaciones predefinidas
- [ ] Crear theme switcher avanzado con más temas
- [ ] Documentar TypeScript types
