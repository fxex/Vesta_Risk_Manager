import React from "react";
import Navegador from "../../../components/Navegador";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";

export default function VerEvaluacionesPasadasLider() {
  return (
    <>
      <Navegador />
      <Contenedor>
        <h3>Evaluaciones Anteriores</h3>
        <p>Aquí se mostrarán las evaluaciones pasadas del proyecto.</p>
      </Contenedor>
      <Footer />
    </>
  );
}