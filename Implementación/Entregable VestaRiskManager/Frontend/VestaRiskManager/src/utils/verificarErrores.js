export const verificarError = (comprobacionError) => {
  let comprobacion = false;
  Object.values(comprobacionError);
  for (const valor of Object.values(comprobacionError)) {
    if (valor) {
      comprobacion = valor;
      break;
    }
  }
  return comprobacion;
};
