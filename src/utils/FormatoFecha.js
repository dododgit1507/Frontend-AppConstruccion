

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


// Transforma una hora en formato HH:MM:SS a formato HH:MM AM/PM
// Ejemplo: "14:35:22" -> "2:35 PM"
export const formatearHora = (horaStr) => {
  if (!horaStr) return '';

  const partes = horaStr.split(':');
  if (partes.length < 2) return horaStr;

  let [hh, mm] = partes;
  hh = parseInt(hh, 10);

  const ampm = hh >= 12 ? 'PM' : 'AM';
  const hora12 = hh % 12 === 0 ? 12 : hh % 12;

  return `${hora12}:${mm} ${ampm}`;
};