import React from "react";
import Navegador from "../../components/Navegador";
import Footer from "../../components/Footer";
import { useLoaderData, useNavigate } from "react-router-dom";
import Contenedor from "../../components/Contenedor";
import "./../../styles/Home.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function ListaProyecto() {
  const navigate = useNavigate();
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
              className="w-100 d-flex justify-content-between align-items-center py-3 mb-2 boton_proyecto"
            >
              {item.nombre}
              <div className="w-25 d-flex justify-content-evenly align-items-center">
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="fw-bold fs-3 me-2 icono"
                  onClick={() => {
                    navigate(`/inicio/proyectos/modificar/${item.id_proyecto}`);
                  }}
                />
                <FontAwesomeIcon
                  icon={faEye}
                  className="fw-bold fs-3 me-2 icono"
                  onClick={() => {
                    navigate(`/inicio/proyectos/${item.id_proyecto}`);
                  }}
                />
              </div>
            </Button>
          ))}
        </div>
      </Contenedor>
      <Footer />
    </>
  );
}
