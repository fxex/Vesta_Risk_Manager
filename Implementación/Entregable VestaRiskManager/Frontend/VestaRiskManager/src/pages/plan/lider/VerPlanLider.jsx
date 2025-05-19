import React from "react";
import Navegador from "../../../components/Navegador";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";

export default function VerPlanLider() {
  return (
    <>
      <Navegador />
      <Contenedor>
        <h3>Evaluaciones</h3>
        <p>Aquí se mostrarán todos los planes del proyecto.</p>
      </Contenedor>
      <Footer />
    </>
  );
}