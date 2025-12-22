# 🎨 Sistema de Colores Centralizado

## 📁 Estructura

```
src/constants/
├── colors.js       ← PALETA COMPLETA (400+ líneas)
├── theme.js        ← Configuración de temas (55 líneas)
└── gameOptions.js  ← Opciones de juegos
```

## 🎯 ¿Por Qué Esta Arquitectura?

### ❌ **Antes:**
- Colores hardcodeados en componentes: `#ef4444`, `rgba(239, 68, 68, 0.5)`
- Duplicación en múltiples archivos
- Difícil de mantener consistencia
- No había paleta centralizada

### ✅ **Ahora:**
- **1 solo archivo** (`colors.js`) con TODOS los colores
- **Funciones helper** para manipular colores fácilmente
- **Sets pre-configurados** (basic, vibrant, neon, etc.)
- **Formato consistente** (hex, rgb, dark, light, name)

---

## 📚 Guía de Uso

### 1. **Importar Colores Individuales**

```javascript
import { REDS, BLUES, GREENS } from '../constants/colors';

// Usar en componentes
const buttonStyle = {
  backgroundColor: REDS.red.hex,      // '#ef4444'
  color: BLUES.sky.light,             // '#38BDF8'
  border: `2px solid ${GREENS.neon.hex}`
};
```

### 2. **Usar Funciones Helper**

```javascript
import { getColor, toRgba, getColorSet } from '../constants/colors';

// Obtener un color completo
const redColor = getColor('red');
console.log(redColor);
// {
//   hex: '#ef4444',
//   rgb: '239, 68, 68',
//   dark: '#dc2626',
//   light: '#f87171',
//   name: { es: 'Rojo', en: 'Red' }
// }

// Crear rgba con transparencia
const semiTransparent = toRgba('blue', 0.5);  // 'rgba(59, 130, 246, 0.5)'

// Obtener un set de colores
const gameColors = getColorSet('vibrant', 4);
// [
//   { id: 'crimson', hex: '#dc143c', rgb: '220, 20, 60', ... },
//   { id: 'sky', hex: '#0EA5E9', rgb: '14, 165, 233', ... },
//   ...
// ]
```

### 3. **Usar Sets Pre-configurados**

```javascript
import { COLOR_SETS, getColorSet } from '../constants/colors';

// Sets disponibles
COLOR_SETS.basic      // ['red', 'blue', 'green', 'yellow', 'purple']
COLOR_SETS.extended   // 8 colores comunes
COLOR_SETS.vibrant    // Colores brillantes
COLOR_SETS.neon       // Estilo neón
COLOR_SETS.rainbow    // Arcoíris completo
COLOR_SETS.warm       // Colores cálidos
COLOR_SETS.cool       // Colores fríos
COLOR_SETS.all        // Todos los colores

// Obtener colores del set
const neonColors = getColorSet('neon');
```

### 4. **Crear Gradientes**

```javascript
import { createGradient } from '../constants/colors';

const gradient = createGradient('blue', '135deg');
// 'linear-gradient(135deg, #3b82f6, #60a5fa)'

// Usar en componentes
<div style={{ background: createGradient('purple', 'to right') }} />
```

### 5. **Colores Aleatorios**

```javascript
import { getRandomColors } from '../constants/colors';

// 4 colores aleatorios del set 'vibrant'
const randomColors = getRandomColors('vibrant', 4);

// Útil para juegos
function generateLevel() {
  const colors = getRandomColors('extended', 3);
  return colors.map(c => c.hex);
}
```

---

## 🎮 Casos de Uso Reales

### **1. Juego con Colores Aleatorios**

```javascript
import { getRandomColors } from '../constants/colors';

function BottleSortGame() {
  const [bottles, setBottles] = useState([]);
  
  const initGame = () => {
    const colors = getRandomColors('vibrant', 4);
    const newBottles = colors.map((color, i) => ({
      id: i,
      color: color.hex,
      name: color.name.es
    }));
    setBottles(newBottles);
  };
  
  // ...
}
```

### **2. Botón con Variantes de Color**

```javascript
import { getColor, getColorVariant } from '../constants/colors';

function CustomButton({ colorName }) {
  const color = getColor(colorName);
  
  return (
    <button
      style={{
        backgroundColor: color.hex,
        borderColor: color.dark
      }}
      onHover={(e) => {
        e.target.style.backgroundColor = color.light;
      }}
    >
      Click Me
    </button>
  );
}
```

### **3. Tema con Rgba Dinámico**

```javascript
import { toRgba } from '../constants/colors';

function ThemedCard({ themeColor }) {
  return (
    <div style={{
      backgroundColor: toRgba(themeColor, 0.1),
      border: `1px solid ${toRgba(themeColor, 0.3)}`,
      boxShadow: `0 4px 20px ${toRgba(themeColor, 0.2)}`
    }}>
      Content
    </div>
  );
}
```

### **4. Selector de Colores**

```javascript
import { COLORS, getColorSet } from '../constants/colors';

function ColorPicker({ onSelect }) {
  const colors = getColorSet('all');
  
  return (
    <div className="color-grid">
      {colors.map(color => (
        <button
          key={color.id}
          onClick={() => onSelect(color)}
          style={{ 
            backgroundColor: color.hex,
            border: `2px solid ${color.dark}`
          }}
          title={color.name.es}
        >
          {color.name.es}
        </button>
      ))}
    </div>
  );
}
```

---

## 🌈 Categorías de Colores Disponibles

### **Rojos** (REDS)
- `red` - Rojo estándar
- `crimson` - Carmesí
- `rose` - Rosado

### **Azules** (BLUES)
- `blue` - Azul estándar
- `sky` - Azul cielo (tema normal)
- `cyan` - Cian
- `indigo` - Índigo
- `navy` - Azul marino

### **Verdes** (GREENS)
- `green` - Verde estándar
- `emerald` - Esmeralda
- `lime` - Lima
- `teal` - Turquesa
- `mint` - Menta
- `neon` - Verde neón (tema neon)

### **Amarillos y Naranjas** (YELLOWS_ORANGES)
- `yellow` - Amarillo
- `amber` - Ámbar
- `orange` - Naranja
- `gold` - Dorado

### **Púrpuras y Rosas** (PURPLES_PINKS)
- `purple` - Morado
- `violet` - Violeta
- `pink` - Rosa
- `fuchsia` - Fucsia
- `magenta` - Magenta

### **Marrones** (BROWNS)
- `brown` - Marrón
- `chocolate` - Chocolate
- `beige` - Beige

---

## 🛠️ Funciones Helper Completas

```javascript
// Obtener un color
getColor('red')
// { hex: '#ef4444', rgb: '239, 68, 68', dark: '#dc2626', ... }

// Convertir a rgba
toRgba('blue', 0.5)
// 'rgba(59, 130, 246, 0.5)'

// Obtener variante
getColorVariant('green', 'dark')
// '#059669'

// Set de colores
getColorSet('vibrant', 5)
// Array de 5 colores del set vibrant

// Colores aleatorios
getRandomColors('extended', 3)
// Array de 3 colores aleatorios

// Crear gradiente
createGradient('purple', '45deg')
// 'linear-gradient(45deg, #a855f7, #c084fc)'
```

---

## 📊 Estructura de Objeto Color

```javascript
{
  hex: '#ef4444',           // Color principal
  rgb: '239, 68, 68',       // RGB sin 'rgba()' para usar dinámicamente
  dark: '#dc2626',          // Variante oscura
  light: '#f87171',         // Variante clara
  name: {
    es: 'Rojo',            // Nombre en español
    en: 'Red'              // Nombre en inglés
  }
}
```

---

## 🎯 Beneficios

### **Antes:**
```javascript
// ❌ Hardcoded, difícil de cambiar
const button = {
  backgroundColor: '#3b82f6',
  boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)'
};
```

### **Ahora:**
```javascript
// ✅ Centralizado, fácil de mantener
import { getColor, toRgba } from '../constants/colors';

const color = getColor('blue');
const button = {
  backgroundColor: color.hex,
  boxShadow: `0 4px 20px ${toRgba('blue', 0.3)}`
};
```

---

## 🚀 Próximos Pasos

1. **Gradientes Personalizados:** Ya tienes `createGradient()`
2. **Modo Oscuro/Claro:** Los colores están listos para ambos
3. **Accesibilidad:** Todas las variantes dark/light para contraste
4. **Themes Custom:** Fácil crear nuevos temas usando `getColor()`

---

## 📝 Notas Importantes

- ✅ Todos los colores en **formato hex, rgb, dark, light**
- ✅ RGB sin `rgba()` para usar dinámicamente: `rgba(${color.rgb}, 0.5)`
- ✅ **25+ colores** pre-definidos
- ✅ **7 sets** pre-configurados
- ✅ **6 funciones helper** para manipulación
- ✅ Compatible con código existente (exports de `theme.js`)

---

## 🎨 Agregar Nuevos Colores

```javascript
// En colors.js, agregar a la categoría correspondiente
export const BLUES = {
  // ... colores existentes
  
  sapphire: {
    hex: '#0f52ba',
    rgb: '15, 82, 186',
    dark: '#0a3d8f',
    light: '#3a70c9',
    name: { es: 'Zafiro', en: 'Sapphire' }
  }
};

// Automáticamente disponible en ALL_COLORS
```

---

**¡Tu sistema de colores ahora es profesional, escalable y fácil de mantener!** 🎉
