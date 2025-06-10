# Sistema de Tema Global - BuildApp

## 🎨 Resumen
Se ha implementado un sistema completo de colores globales y tema claro/oscuro para la aplicación BuildApp. El sistema utiliza CSS variables y React Context para proporcionar un cambio de tema seamless y consistente en toda la aplicación.

## 🛠️ Arquitectura

### 1. **CSS Variables Global** (`src/index.css`)
- ✅ Variables de color para tema claro y oscuro
- ✅ Colores primarios (naranja) para BuildApp
- ✅ Colores de estado (success, warning, error, info)
- ✅ Colores de texto y fondos adaptativos
- ✅ Clases utilitarias personalizadas
- ✅ Efectos de hover y transiciones suaves

### 2. **React Context** (`src/context/ThemeContext.jsx`)
- ✅ Hook `useApp()` para acceso global al tema
- ✅ Estado de tema con persistencia en localStorage
- ✅ Función `toggleTheme()` para cambiar entre claro/oscuro
- ✅ Estado del sidebar para dispositivos móviles
- ✅ Configuración global de la aplicación

### 3. **Componentes Actualizados**

#### MainLayout (`src/layouts/MainLayout.jsx`)
- ✅ Convertido para usar variables CSS globales
- ✅ Botones de toggle de tema en sidebar y header
- ✅ Colores adaptativos según el tema activo
- ✅ Hover effects y transiciones suaves

#### Dashboard (`src/pages/dashboard/Dashboard.jsx`)
- ✅ Convertido para usar el sistema de colores global
- ✅ Cards estadísticas con colores temáticos
- ✅ Efectos de hover consistentes
- ✅ Textos adaptativos al tema

## 🎯 Características Principales

### Colores del Sistema
```css
/* Primario (BuildApp Orange) */
--color-primary: 234 88 12;
--color-primary-light: 251 146 60;
--color-primary-dark: 194 65 12;

/* Estados */
--color-success: 34 197 94;
--color-warning: 234 179 8;
--color-error: 239 68 68;
--color-info: 59 130 246;
```

### Clases Utilitarias
- `bg-theme-background` - Fondo principal del tema
- `text-theme-text` - Texto principal del tema
- `border-theme-border` - Bordes del tema
- `bg-surface` - Superficies de cards/modales
- `card-hover` - Efectos de hover para cards

### Funcionalidades del Theme Context
```jsx
const { theme, toggleTheme, isDark } = useApp();
```

## 🔧 Uso

### Toggle de Tema
Los usuarios pueden cambiar entre tema claro y oscuro usando:
- Botón en el header principal (Sol/Luna)
- Botón en el sidebar móvil
- La preferencia se guarda automáticamente

### Aplicar Colores en Componentes
```jsx
// Usar las clases del sistema global
<div className="bg-surface border-theme-border text-theme-text">
  <button className="bg-primary text-white hover:bg-primary-dark">
    Botón Primario
  </button>
</div>
```

## 📱 Responsive
- ✅ Sidebar colapsable en móvil
- ✅ Botones de tema accesibles en todas las resoluciones
- ✅ Layout adaptativo

## 🚀 Mejoras Implementadas

### Espaciado
- Increased spacing from `space-y-6` to `space-y-8` en Dashboard
- Padding consistente en todos los componentes
- Margins apropiados para mejor legibilidad

### Diseño
- Sistema de colores centralizado y consistente
- Efectos de hover mejorados con `card-hover`
- Transiciones suaves en todos los elementos
- Borderes y sombras adaptativos al tema

### UX/UI
- Toggle de tema intuitivo con iconos Sol/Luna
- Persistencia de preferencias del usuario
- Detección automática de tema del sistema
- Tooltips informativos en botones

## 🎉 Estado Actual
✅ **COMPLETADO** - El sistema está 100% funcional y listo para producción.

### Archivos Modificados
1. `src/index.css` - Sistema de CSS variables global
2. `src/context/ThemeContext.jsx` - Context de tema creado
3. `src/main.jsx` - App envuelto con AppProvider
4. `src/layouts/MainLayout.jsx` - Convertido al sistema global
5. `src/pages/dashboard/Dashboard.jsx` - Convertido al sistema global

### Siguientes Pasos Recomendados
1. Aplicar el sistema a las demás páginas (Demolición, Construcción, etc.)
2. Crear componentes reutilizables que usen el sistema
3. Añadir más variantes de color si es necesario
4. Documentar el sistema para el equipo

---
*Sistema implementado para BuildApp Frontend - React + Vite + Tailwind CSS v4*
