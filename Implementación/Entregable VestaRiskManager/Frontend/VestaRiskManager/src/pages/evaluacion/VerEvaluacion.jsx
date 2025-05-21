import React from "react";
import Footer from "../../components/Footer";
import Contenedor from "../../components/Contenedor";
import NavegadorLider from "../../components/NavegadorLider";
import BotonSalir from "../../components/BotonSalir";
import { useLoaderData, useLocation } from "react-router-dom";
import { formatearFecha, formatearFechaHora, modificarImpacto, modificarProbabilidad } from "../../utils/funciones";

export default function VerEvaluacion() {
  const location = useLocation();
  const ruta = location.state?.ruta;

  const { evaluacion } = useLoaderData();

  return (
    <>
      <NavegadorLider />
      <Contenedor>
        <h3>Evaluacion - {evaluacion.id_riesgo > 9 ? "RK" : "RK0"}{evaluacion.id_riesgo}</h3>
        <>
          <h4>Descripción del riesgo {evaluacion.id_riesgo > 9 ? "RK" : "RK0"}{evaluacion.id_riesgo}</h4>
          <p>{evaluacion.descripcion_riesgo}</p>
          <hr />
          <h4>Iteración</h4>
          <p>{evaluacion.nombre_iteracion} - {formatearFecha(evaluacion.fecha_inicio_iteracion)} - {formatearFecha(evaluacion.fecha_fin_iteracion)}</p>
          <hr />
          <h4>Descripción de la evaluación</h4>
          <p>{evaluacion.descripcion}</p>
          <hr />
          <h4>Impacto</h4>
          <p>{modificarImpacto(evaluacion.impacto)}</p>
          <hr />
          <h4>Probabilidad</h4>
          <p>{modificarProbabilidad(evaluacion.probabilidad)}</p>
          <hr />
          <h4>Fecha de creación</h4>
          <p>{formatearFechaHora(new Date(evaluacion.fecha_realizacion))}</p>
          <hr />
          <h5>Opciones</h5>
          <BotonSalir ruta={ruta} />
        </>
      </Contenedor>
      <Footer />
    </>
  );
}