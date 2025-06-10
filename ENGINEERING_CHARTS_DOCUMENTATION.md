# Gráficos Profesionales de Ingeniería - BuildApp

## Descripción General
Se han implementado gráficos especializados para ingeniería de construcción que proporcionan información crítica en tiempo real para la supervisión y gestión de proyectos de construcción.

## Gráficos Implementados

### 1. Dashboard de Productividad en Tiempo Real
- **Archivo**: `ProductivityDashboardChart` en `ConstructionCharts.jsx`
- **Propósito**: Monitoreo en vivo de la productividad por sectores
- **Métricas**:
  - Productividad promedio por sector
  - Trabajadores activos por zona
  - Horas trabajadas acumuladas
  - Tareas completadas vs pendientes
  - Estado operacional (excellent, optimal, attention, critical)
- **Características**:
  - Indicador "EN VIVO" con animación
  - Códigos de color por estado de productividad
  - Alertas críticas automáticas
  - Barras de progreso por sector

### 2. Utilización de Equipos
- **Archivo**: `EquipmentUtilizationChart` en `ConstructionCharts.jsx`
- **Propósito**: Control de eficiencia y estado de maquinaria
- **Métricas**:
  - Horas de operación vs capacidad máxima
  - Porcentaje de eficiencia por equipo
  - Estado operacional (operativo, mantenimiento, standby)
- **Visualización**: Gráfico combinado (barras + líneas)

### 3. Cronograma de Construcción
- **Archivo**: `ConstructionTimelineChart` en `ConstructionCharts.jsx`
- **Propósito**: Comparación entre cronograma planificado vs real
- **Fases incluidas**: Planificación, Demolición, Excavación, Cimentación, Estructura, Instalaciones, Acabados
- **Visualización**: Gráfico de áreas apiladas

### 4. Métricas de Seguridad
- **Archivo**: `SiteSafetyMetricsChart` en `ConstructionCharts.jsx`
- **Propósito**: Monitoreo integral de seguridad en obra
- **Métricas**:
  - Incidentes mensuales
  - KPIs de seguridad (EPP, Capacitación, Inspecciones, Reportes)
  - Días sin incidentes
  - Horas de capacitación
- **Visualización**: Gráficos de barras + indicadores KPI

### 5. Condiciones Ambientales
- **Archivo**: `EnvironmentalConditionsChart` en `ConstructionCharts.jsx`
- **Propósito**: Monitoreo de condiciones meteorológicas que afectan la obra
- **Métricas**:
  - Temperatura, humedad, velocidad del viento
  - Precipitación por hora
  - Horas de trabajo útil estimadas
- **Visualización**: Gráfico combinado (área + líneas + barras)

### 6. Stock de Materiales
- **Archivo**: `MaterialStockChart` en `ConstructionCharts.jsx`
- **Propósito**: Control de inventario y alertas de stock
- **Materiales monitoreados**:
  - Cemento (toneladas)
  - Acero (toneladas)
  - Arena (m³)
  - Grava (m³)
  - Ladrillos (unidades)
- **Estados**: Normal, Bajo, Crítico
- **Características**: Alertas automáticas y marcadores de niveles mínimos

### 7. Control de Calidad y Certificaciones
- **Archivo**: `QualityCertificationChart` en `ConstructionCharts.jsx`
- **Propósito**: Gestión de pruebas de calidad y certificaciones
- **Pruebas de calidad**:
  - Resistencia del concreto
  - Compactación del suelo
  - Calidad de soldadura
  - Precisión topográfica
- **Certificaciones monitoreadas**:
  - ISO 9001:2015
  - OHSAS 18001
  - ISO 14001
  - Licencia Ambiental
- **Estados**: Vigente, Por vencer, Vencido

## Gráficos Complementarios (Anteriores)

### 8. Progreso vs Cronograma (EngineeringCharts.jsx)
- Comparación de avance real vs planificado
- Análisis de desviaciones temporales

### 9. Productividad por Cuadrilla (EngineeringCharts.jsx)
- Rendimiento de equipos de trabajo
- Identificación de cuadrillas de alto/bajo rendimiento

### 10. Control de Calidad (EngineeringCharts.jsx)
- Tasa de aprobación/rechazo
- Tendencias de calidad

### 11. Consumo de Materiales (EngineeringCharts.jsx)
- Consumo planificado vs real
- Predicción de necesidades

### 12. Planificación de Recursos (EngineeringCharts.jsx)
- Distribución de recursos por fase
- Optimización de asignaciones

### 13. Gráficos Avanzados (AdvancedCharts.jsx)
- Análisis de seguridad
- Análisis de costos
- Eficiencia de equipos
- Impacto meteorológico
- KPIs radiales

## Integración con Sistema de Temas

Todos los gráficos soportan:
- ✅ Modo claro/oscuro automático
- ✅ Colores consistentes con el sistema de temas
- ✅ Responsive design
- ✅ Animaciones y transiciones suaves

## Características Técnicas

### Librerías Utilizadas
- **Chart.js** + **react-chartjs-2**: Gráficos de ingeniería principales
- **Recharts**: Gráficos estadísticos avanzados
- **Lucide React**: Iconografía profesional

### Datos Simulados
Todos los gráficos utilizan datos realistas simulados que representan:
- Métricas típicas de proyectos de construcción
- Variaciones temporales esperadas
- Estados críticos y alertas
- Tendencias de rendimiento

### Responsive Design
- Adaptación automática a diferentes tamaños de pantalla
- Grid layouts optimizados (1 columna en móvil, 2-3 en desktop)
- Texto y elementos escalables

## Beneficios para Ingenieros de Obra

1. **Visión Integral**: Dashboard completo con todas las métricas críticas
2. **Alertas Proactivas**: Identificación temprana de problemas
3. **Toma de Decisiones**: Datos en tiempo real para decisiones informadas
4. **Cumplimiento**: Monitoreo de certificaciones y calidad
5. **Eficiencia**: Optimización de recursos y productividad
6. **Seguridad**: Control exhaustivo de métricas de seguridad

## Estructura de Archivos

```
src/components/charts/
├── EngineeringCharts.jsx      # Gráficos principales con Chart.js
├── EngineeringCharts.css      # Estilos especializados
├── AdvancedCharts.jsx         # Gráficos avanzados con Recharts
└── ConstructionCharts.jsx     # Gráficos específicos de construcción
```

## Próximas Mejoras

1. **Integración con APIs reales**: Conectar con sistemas de gestión existentes
2. **Exportación de reportes**: Generar PDFs con los datos
3. **Alertas push**: Notificaciones automáticas por problemas críticos
4. **Predicciones ML**: Análisis predictivo de tendencias
5. **Comparativas históricas**: Análisis de rendimiento a largo plazo

---

*Documentación actualizada: 10 de junio de 2025*
*Versión: 2.0 - Gráficos Profesionales de Ingeniería*
