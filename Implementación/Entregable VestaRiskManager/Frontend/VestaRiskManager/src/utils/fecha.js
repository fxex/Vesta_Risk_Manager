/**
 * Convierte una fecha en formato YYYY-MM-DD a DD/MM/YYYY.
 *
 * @param {string} fecha - La fecha en formato YYYY-MM-DD.
 * @returns {string} - La fecha en formato DD/MM/YYYY.
 */
export const formatearFecha = (fecha) => {
  const [year, month, day] = fecha.split("-");
  return `${day}/${month}/${year}`;
};

/**
 * Convierte una fecha en formato YYYY-MM-DD a DD/MM/YYYY.
 *
 * @param {Date} fecha
 * @returns {string} - La fecha en formato DD/MM/YYYY HH:MM.
 */
export const formatearFechaHora = (fecha) => {
  // Extraer día, mes y año
  const day = String(fecha.getDate()).padStart(2, "0"); // Asegura dos dígitos
  const month = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
  const year = fecha.getFullYear();

  // Extraer horas y minutos
  const hours = String(fecha.getHours()).padStart(2, "0");
  const minutes = String(fecha.getMinutes()).padStart(2, "0");

  // Formatear la fecha y hora
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

/**
 * Comprueba si la fecha de inicio es anterior a la fecha de fin.
 *
 * @param {string} fecha_inicio - La fecha de inicio en formato YYYY-MM-DD.
 * @param {string} fecha_fin - La fecha de fin en formato YYYY-MM-DD.
 * @returns {boolean} - `true` si la fecha de inicio es anterior a la fecha de fin, `false` en caso contrario.
 */
export const comprobarFechasNuevaIteracion = (fecha_inicio, fecha_fin) => {
  let iteracionFechaInicio = new Date(fecha_inicio);
  let iteracionFechaFin = new Date(fecha_fin);
  const resultado = iteracionFechaFin - iteracionFechaInicio;
  if (resultado > 0) {
    return true;
  } else {
    return false;
  }
};
