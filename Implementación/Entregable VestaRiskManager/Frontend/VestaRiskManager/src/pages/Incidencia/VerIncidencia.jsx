import React from "react";
import Navegador from "../../components/Navegador";
import Footer from "../../components/Footer";
import Contenedor from "../../components/Contenedor";
import BotonSalir from "../../components/BotonSalir";
import { useLoaderData } from "react-router-dom";
import { obtenerIncidenciaId } from "../../services/informes";

export async function cargarIncidencia({ params }) {
  const incidencia = await obtenerIncidenciaId(params.id_incidencia);
  return { incidencia };
}

export default function VerIncidencia() {
  const { incidencia } = useLoaderData();

  return (
    <>
      <Navegador />
      <Contenedor>
        <h3>Propiedades de la incidencia</h3>
        <>
          <h4>Identificador del riesgo</h4>
          <p>{incidencia.id_riesgo}</p>
          <hr />
          <h4>Descripc&iacute;a</h4>
          <p>{incidencia.descripcion}</p>
          <hr />
          <h4>Responsable</h4>
          <p>{incidencia.responsable}</p>
          <hr />
          <h4>Gravedad</h4>
          <p>{incidencia.gravedad}</p>
          <hr />
          <h4>Fecha de ocurrencia</h4>
          <p>{incidencia.fecha_ocurrencia}</p>
          <hr />
          <h5>Opciones</h5>
          <BotonSalir ruta={"/inicio/categorias"} />
        </>
      </Contenedor>
      <Footer />
    </>
  );
}
