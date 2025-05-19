import React from "react";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";
import NavegadorLider from "../../../components/NavegadorLider";
import BotonSalir from "../../../components/BotonSalir";
import { useLoaderData, useLocation } from "react-router-dom";
import { formatearFechaHora, modificarImpacto, modificarProbabilidad } from "../../../utils/funciones";

export default function VerEvaluacionLider() {
  const location = useLocation();
  const ruta = location.state?.ruta;

  const { evaluacion } = useLoaderData();

  return (
    <>
      <NavegadorLider />
      <Contenedor>
        <h3>Evaluacion - {evaluacion.id_riesgo > 9 ? "RK" : "RK0"}{evaluacion.id_riesgo}</h3>
        <>
          <h4>Descripción de la evaluación</h4>
          <p>{evaluacion.descripcion}</p>
          <h4>Descripción del riesgo {evaluacion.id_riesgo > 9 ? "RK" : "RK0"}{evaluacion.id_riesgo}</h4>
          <p>{evaluacion.descripcion_riesgo}</p>
          <h4>Nombre de la iteración</h4>
          <p>{evaluacion.nombre_iteracion}</p>
          <h4>Impacto</h4>
          <p>{modificarImpacto(evaluacion.impacto)}</p>
          <h4>Probabilidad</h4>
          <p>{modificarProbabilidad(evaluacion.probabilidad)}</p>
          <h4>Fecha de creación</h4>
          <p>{formatearFechaHora(new Date(evaluacion.fecha_realizacion))}</p>
        </>
        <BotonSalir ruta={ruta} />
      </Contenedor>
      <Footer />
    </>
  );
}