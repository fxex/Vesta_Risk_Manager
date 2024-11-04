import React from "react";
import Contenedor from "../../components/Contenedor";
import NavegadorLider from "../../components/NavegadorLider";
import Footer from "../../components/Footer";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { obtenerRiesgosProyecto } from "../../services/riesgos";

export const riesgoLoader = async ({ params }) => {
  const riesgos = await obtenerRiesgosProyecto(params.id_proyecto);
  return riesgos;
};

export default function ListaRiesgos() {
  const { id_proyecto } = useParams();
  const riesgos = useLoaderData();
  console.log(riesgos);

  const navigate = useNavigate();
  const comprobacionLider = location.pathname.includes("lider");

  return (
    <>
      <NavegadorLider />
      <Contenedor>
        <h3>Proyecto</h3>
        <>
          <Button
            variant="success"
            onClick={() => {
              navigate(
                `/inicio/proyecto/${
                  comprobacionLider ? "lider" : "desarrollador"
                }/${id_proyecto}/riesgo/crear`
              );
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mx-1" />
            Nuevo Riesgo
          </Button>
          {riesgos ? "si pasa nada" : "No pasa nada"}
        </>
      </Contenedor>
      <Footer />
    </>
  );
}
