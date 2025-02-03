/**
 * Valida si un correo electrónico tiene un formato válido y pertenece a los dominios permitidos.
 *
 * @param {string} correo - El correo electrónico a validar.
 * @returns {boolean} - `true` si el correo es válido, `false` en caso contrario.
 */
export function verificarCorreo(correo) {
  const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|uarg\.unpa\.edu\.ar)$/;
  return regex.test(correo);
}
