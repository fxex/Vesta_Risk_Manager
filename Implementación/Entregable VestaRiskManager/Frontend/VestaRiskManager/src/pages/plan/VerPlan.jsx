import React from "react";
import Footer from "../../components/Footer";
import Contenedor from "../../components/Contenedor";
import { useLoaderData, useLocation } from "react-router-dom";
import BotonSalir from "../../components/BotonSalir";
import { formatearFecha } from "../../utils/funciones";
import NavegadorLider from "../../components/NavegadorLider";

export default function VerPlan() {
  const {  iteracion, plan  } = useLoaderData();
  const location = useLocation();
  const ruta = location.state?.ruta;

  return (
    <>
      <NavegadorLider />
      <Contenedor>
        <h3>Plan de {plan.tipo} del riesgo {plan.id_riesgo > 9 ? "RK" : "RK0"}{plan.id_riesgo}</h3>
        <>
          <h4>Descripción del riesgo</h4>
          <p>{plan.riesgo.descripcion}</p>
          <hr />
          <h4>Iteración</h4>
          <p>{iteracion.nombre}: {formatearFecha(iteracion.fecha_inicio)} - {formatearFecha(iteracion.fecha_fin)}</p>
          <hr/>
          <h4>Descripción del plan</h4>
          <p>{plan.descripcion}</p>
          <hr />
          <h4>Tareas del plan</h4>
          <ul>
            {plan.tareas.map((tarea) => (
              <li key={tarea.id_tarea}>
                <h5>{tarea.nombre} </h5>
                <ul>
                  <li><b>Descripción:</b> {tarea.descripcion}</li>
                  <li><b>Responsables:</b> {tarea.responsables.map((responsable) => responsable.nombre).join(", ")}</li>
                  <li><b>Estado:</b> {tarea.estado == 0 ? "Pendiente" : "Completada"}</li>
                  <li><b>Fecha de inicio:</b> {formatearFecha(tarea.fecha_inicio)}</li>
                  <li><b>Fecha de fin:</b> {formatearFecha(tarea.fecha_fin)}</li>
                </ul>
              </li>
            ))}
          </ul>
          <hr />
          <h5>Opciones</h5>
          <BotonSalir ruta={ruta} />
        </>
      </Contenedor>
      <Footer />
    </>
  );
}