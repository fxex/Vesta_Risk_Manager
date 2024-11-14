import React from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";
import { Button } from "react-bootstrap";

export default function MonitoreoLider() {
  return (
    <>
      <NavegadorLider />
      <Contenedor>
        <h3>Monitoreo</h3>
        <div style={{ minHeight: "50vh" }}>
          <p>Seleccione una de las siguientes opciones:</p>
          <div className="d-flex gap-3" style={{ minHeight: "10vh" }}>
            <Button className="boton_2">Planes actuales</Button>
            <Button className="boton_2">Planes pasados</Button>
            <Button className="boton_2">Evaluaciones actuales</Button>
            <Button className="boton_2">Evaluaciones anteriores</Button>
          </div>
        </div>
      </Contenedor>
      <Footer />
    </>
  );
}
