import React from "react";
import Navegador from "../../components/Navegador";
import Footer from "../../components/Footer";
import Contenedor from "../../components/Contenedor";
import BotonSalir from "../../components/BotonSalir";
import { obtenerProyectosId } from "../../services/proyectos";
import { useLoaderData } from "react-router-dom";

export async function cargarProyecto({ params }) {
  const proyecto = await obtenerProyectosId(params.id_proyecto);
  return { proyecto };
}

export default function VerProyecto() {
  const { proyecto } = useLoaderData();

  return (
    <>
      <Navegador />
      <Contenedor>
        <h3>Propiedades del Proyecto</h3>
        <>
          <h4>Nombre</h4>
          <p>{proyecto.nombre}</p>
          <hr />
          <h4>Descripcion</h4>
          <p>{proyecto.descripcion}</p>
          <h4>Estado</h4>
          <p>{proyecto.estado}</p>
          <h4>Duracion</h4>
          <p>{proyecto.fecha_inicio} - {proyecto.fecha_fin}</p>
          <hr />
          <h5>Opciones</h5>
          <BotonSalir ruta={"/inicio/proyectos"} />
        </>
      </Contenedor>
      <Footer />
    </>
  );
}