import React, { createContext, useContext, useState, useEffect } from "react";

// Crear el contexto de usuario
const UsuarioContext = createContext();

// Crear el proveedor del contexto
export function UsuarioProvider({ children }) {
  // Carga el usuario desde localStorage al inicializar
  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null;
  });

  // Función para iniciar sesión y almacenar el usuario en localStorage
  function iniciarSesion(nombre, email, perfil) {
    const usuarioData = { nombre, email, perfil };
    setUsuario(usuarioData);
    localStorage.setItem("usuario", JSON.stringify(usuarioData)); // Guarda en localStorage
  }

  // Función para cerrar sesión y limpiar el usuario de localStorage
  function cerrarSesion() {
    setUsuario(null);
    localStorage.removeItem("usuario");
  }

  // Al montarse el componente, verifica si hay usuario guardado en localStorage
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

// Hook para usar el contexto de usuario
export function useUsuario() {
  return useContext(UsuarioContext);
}
