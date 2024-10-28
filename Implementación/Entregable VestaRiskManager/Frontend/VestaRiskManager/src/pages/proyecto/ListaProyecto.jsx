import React from "react";
import Navegador from "../../components/Navegador";
import Footer from "../../components/Footer";
import { useLoaderData } from "react-router-dom";
import Contenedor from "../../components/Contenedor";
import "./../../styles/Home.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

export default function ListaProyecto() {
  const proyectos = useLoaderData();

  return (
    <>
      <Navegador />
      <Contenedor>
        <h3>Proyectos</h3>
        <div style={{ minHeight: "40vh" }}>
          {proyectos.map((item, key) => (
            <Button
              key={key}
              className="w-100 d-flex boton_1 justify-content-between align-items-center py-3"
            >
              {item.nombre}
              <FontAwesomeIcon icon={faEye} className="fw-bold fs-3 me-2" />
            </Button>
          ))}
        </div>
      </Contenedor>
      <Footer />
    </>
  );
}
