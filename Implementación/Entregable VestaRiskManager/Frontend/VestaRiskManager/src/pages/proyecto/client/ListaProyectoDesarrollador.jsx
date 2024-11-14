import React, { useEffect, useState } from "react";
import Navegador from "../../../components/Navegador";
import Footer from "../../../components/Footer";
import { useLoaderData, useNavigate } from "react-router-dom";
import Contenedor from "../../../components/Contenedor";
import "./../../../styles/Home.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import {
  obtenerProyectosId,
  obtenerProyectosUsuarioDesarrollador,
} from "../../../services/proyectos";
import { useUsuario } from "../../../context/usuarioContext";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const obtenerListaProyectoDesarrollador = async () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const proyectos = await obtenerProyectosUsuarioDesarrollador(usuario.email);
  return { proyectos };
};

export default function ListaProyectoDesarrollador() {
  const navigate = useNavigate();
  const { usuario } = useUsuario();
  const { proyectos } = useLoaderData();

  return (
    <>
      <Navegador />
      <Contenedor>
        <h3>Proyectos de Desarrollador</h3>
        <div style={{ minHeight: "40vh" }}>
          {proyectos.map((item, key) => (
            <Button
              key={key}
              className="w-100 d-flex justify-content-between align-items-center py-3 mb-2 boton_proyecto"
            >
              {item.nombre}
              <FontAwesomeIcon
                icon={faSearch}
                className="fw-bold fs-3 me-2 icono"
                onClick={async () => {
                  const proyecto = await obtenerProyectosId(item.id_proyecto);
                  localStorage.setItem(
                    "proyecto_seleccionado",
                    JSON.stringify(proyecto)
                  );
                  navigate(
                    `/inicio/proyecto/desarrollador/${item.id_proyecto}/riesgos`
                  );
                }}
              />
            </Button>
          ))}
        </div>
      </Contenedor>
      <Footer />
    </>
  );
}
