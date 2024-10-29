//Recibe la fecha en formato YYYY-MM-DD y la salida es DD/MM/YYYY
export const formatearFecha = (fecha) => {
  const [year, month, day] = fecha.split("-");
  return `${day}/${month}/${year}`;
};
