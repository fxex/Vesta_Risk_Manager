import React, { createContext, useContext, useState, useEffect } from "react";

const UsuarioContext = createContext();

/**
 * Proveedor del contexto de usuario.
 *
 * Este componente envuelve la aplicación (o parte de ella) y proporciona
 * el estado del usuario y funciones para iniciar y cerrar sesión.
 *
 * @param {ReactNode} children - Componentes hijos que tendrán acceso al contexto.
 * @returns {JSX.Element} - Proveedor del contexto de usuario.
 */
export function UsuarioProvider({ children }) {
  // Estado para almacenar los datos del usuario
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  /**
   * Función para iniciar sesión.
   *
   * @param {string} id_usuario - ID único del usuario.
   * @param {string} nombre - Nombre del usuario.
   * @param {string} email - Correo electrónico del usuario.
   * @param {string} perfil - Perfil o rol del usuario.
   */
  function iniciarSesion(id_usuario, nombre, email, perfil) {
    const usuarioData = { id_usuario, nombre, email, perfil };
    setUsuario(usuarioData);
    localStorage.setItem("usuario", JSON.stringify(usuarioData)); // Guarda en localStorage
  }

  /**
   * Función para cerrar sesión.
   *
   * Elimina los datos del usuario del estado y de localStorage.
   */
  function cerrarSesion() {
    setUsuario(null);
    localStorage.removeItem("usuario");
  }

  // Efecto para cargar el usuario desde localStorage al montar el componente
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  return (
    <UsuarioContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </UsuarioContext.Provider>
  );
}

/**
 * Hook personalizado para usar el contexto de usuario.
 *
 * @returns {Object} - El contexto de usuario, que incluye:
 *   - usuario: Datos del usuario actual.
 *   - iniciarSesion: Función para iniciar sesión.
 *   - cerrarSesion: Función para cerrar sesión.
 */
export function useUsuario() {
  return useContext(UsuarioContext);
}
