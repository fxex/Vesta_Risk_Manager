import React from "react";
import Navegador from "../../../components/Navegador";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";

export default function VerEvaluacionesActuLider() {
  return (
    <>
      <Navegador />
      <Contenedor>
        <h3>Evaluaciones Actuales</h3>
        <p>Aquí se mostrarán las evaluaciones actuales del proyecto.</p>
      </Contenedor>
      <Footer />
    </>
  );
}