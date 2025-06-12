

// Transforma una fecha en formato ISO (YYYY-MM-DD) a formato DD/MM/YYYY
// Ejemplo: 2025-05-19 -> 19/05/2025
export const formatearFechaInversa = (fecha) => {
  if (!fecha) return '';
  
  // Verificar si la fecha ya está en formato DD/MM/YYYY
  if (fecha.includes('/')) {
    return fecha; // Ya está en el formato deseado
  }
  
  // Para formato ISO YYYY-MM-DD
  const [anio, mes, dia] = fecha.split('-');
  
  return `${dia}/${mes}/${anio}`;
};