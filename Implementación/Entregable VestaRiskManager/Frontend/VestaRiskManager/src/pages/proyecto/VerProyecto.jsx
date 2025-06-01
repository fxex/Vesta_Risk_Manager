import React from "react";
import Navegador from "../../components/Navegador";
import Footer from "../../components/Footer";
import Contenedor from "../../components/Contenedor";
import BotonSalir from "../../components/BotonSalir";
import { useLoaderData, useNavigate } from "react-router-dom";
import { formatearFecha } from "../../utils/funciones";
import { Button } from "react-bootstrap";

export default function VerProyecto() {
  const navigate = useNavigate();
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
          <h4>Descripción</h4>
          <p>{proyecto.descripcion}</p>
          <h4>Estado</h4>
          <p>
            {proyecto.estado.charAt(0).toUpperCase() + proyecto.estado.slice(1)}
          </p>
          <h4>Duración</h4>
          <p>
            {proyecto.fecha_inicio
              ? formatearFecha(proyecto.fecha_inicio)
              : "No posee fecha de inicio"}{" "}
            -{" "}
            {proyecto.fecha_fin
              ? formatearFecha(proyecto.fecha_fin)
              : "No posee fecha de finalización"}{" "}
          </p>
          <h4>Iteraciones</h4>
          <ul>
            {proyecto.iteraciones.map((item, key) => (
              <li key={key}>
                {item.nombre} <br />{" "}
                <b>
                  {formatearFecha(item.fecha_inicio)} -{" "}
                  {formatearFecha(item.fecha_fin)}
                </b>
              </li>
            ))}
          </ul>

          <h4>Participantes</h4>
          <ul>
            {proyecto.participantes.map((item, key) => (
              <li key={key}>
                {item.nombre} - {item.email} <br /> <b>{item.rol}</b>
              </li>
            ))}
          </ul>
          <h4>Categorías</h4>

          {proyecto.categorias.map((item, key) => (
            <p key={key}>{item.nombre}</p>
          ))}
          <hr />
          <h5>Opciones</h5>
          <BotonSalir ruta={"/inicio/proyectos"} />
          <Button className="m-1" onClick={()=>{
            navigate(`/inicio/espectador/proyecto/${proyecto.id_proyecto}`)
          }}>Supervisar Proyecto</Button>
        </>
      </Contenedor>
      <Footer />
    </>
  );
}
