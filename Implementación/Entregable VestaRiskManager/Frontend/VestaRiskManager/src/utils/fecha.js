//Recibe la fecha en formato YYYY-MM-DD y la salida es DD/MM/YYYY
export const formatearFecha = (fecha) => {
  const [year, month, day] = fecha.split("-");
  return `${day}/${month}/${year}`;
};

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
