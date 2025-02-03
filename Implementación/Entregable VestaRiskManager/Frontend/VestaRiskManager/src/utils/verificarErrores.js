/**
 * Verifica si algún valor en un objeto de errores es `true`.
 *
 * @param {Object} comprobacionError - Un objeto cuyos valores son booleanos.
 * @returns {boolean} - El primer valor `true` encontrado en el objeto, o `false` si no hay errores.
 */
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
