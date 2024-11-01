export function verificarCorreo(correo) {
  const regex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|uarg\.unpa\.edu\.ar)$/;
  return regex.test(correo);
}
