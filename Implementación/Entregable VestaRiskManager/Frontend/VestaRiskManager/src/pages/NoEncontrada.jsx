import React from "react";
import Navegador from "../components/Navegador";
import LogoVesta from "./../assets/img/Logo-VestaRiskManager1.png";
import { Figure } from "react-bootstrap";

export default function NoEncontrada() {
  return (
    <div>
      <Navegador />
      <div
        style={{ height: "70vh" }}
        className="d-flex justify-content-center align-items-center flex-column"
      >
        <Figure.Image src={LogoVesta} style={{ height: "200px" }} />
        <h3>Página no encontrada</h3>
        <p>
          Por favor, compruebe la <b>URL</b> o acceda desde aquí{" "}
          <a href="http://localhost:5173/inicio">Presione aquí</a>
        </p>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
