import React, { useEffect, useState } from "react";
import Navegador from "../../../components/Navegador";
import Footer from "../../../components/Footer";
import { useLoaderData, useNavigate } from "react-router-dom";
import Contenedor from "../../../components/Contenedor";
import "./../../../styles/Home.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  obtenerProyectosId,
} from "../../../services/proyectos";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import BotonSalir from "../../../components/BotonSalir";
import { useUsuario } from "../../../context/usuarioContext";
import Paginado from "../../../components/Paginado";



export default function ListaProyectoDesarrollador() {
  const navigate = useNavigate();
  const { proyectos, totalPaginas } = useLoaderData();
  const {usuario} = useUsuario();

  const [paginaActual, setPaginaActual] = useState(1);
  const [proyectosCargados, setProyectosCargados] = useState(proyectos);

  useEffect(() => {
    localStorage.removeItem("pagina_riesgo")
    localStorage.removeItem("orden_riesgo")
    localStorage.removeItem("proyecto_seleccionado")
  }, [])

  return (
    <>
      <Navegador />
      <Contenedor>
        <h3>Proyectos de Desarrollador</h3>
        <div style={{ minHeight: "40vh" }}>
          {proyectosCargados && proyectosCargados.length > 0 ? (
            proyectosCargados.map((item, key) => (
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
            ))
          ) : (
            <p className="text-center fw-bold">No posee proyectos asignados</p>
          )}
          <Paginado
            paginaActual={paginaActual}
            totalPaginas={totalPaginas}
            setPaginaActual={setPaginaActual}
          />
          <BotonSalir ruta={"/inicio"} />

        </div>
      </Contenedor>
      <Footer />
    </>
  );
}
