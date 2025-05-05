export function filtrarYFormatear(usuarios, rolBuscado) {
    return usuarios
      .filter(user => user.rol === rolBuscado)
      .map(user => `${user.nombre} - ${user.email}`)
      .join('\n');
}