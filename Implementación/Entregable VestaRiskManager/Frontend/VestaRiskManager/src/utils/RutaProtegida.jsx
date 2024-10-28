import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUsuario } from "../context/usuarioContext";

export default function RutaProtegida({ element, isAdmin }) {
  const { usuario } = useUsuario();

  if (isAdmin) {
    return usuario && usuario.perfil == "Administrador" ? (
      element
    ) : (
      <Navigate to="/inicio" />
    );
  } else {
    return usuario ? element : <Navigate to="/" />;
  }
}
