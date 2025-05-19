import React from "react";
import Navegador from "../../../components/Navegador";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";

export default function VerEvaluacionLider() {
  return (
    <>
      <Navegador />
      <Contenedor>
        <h3>Evaluaciones</h3>
        <p>Aquí se mostrarán todas las evaluaciones del proyecto.</p>
      </Contenedor>
      <Footer />
    </>
  );
}