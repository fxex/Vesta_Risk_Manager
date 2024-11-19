import React from "react";
import Navegador from "../components/Navegador";
import Footer from "../components/Footer";
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
        <h3>Pagina no encontrada</h3>
        <p>
          Por favor compruebe la <b>URL</b> o acceda desde aca{" "}
          <a href="http://localhost:5173/inicio">Presione aqui</a>
        </p>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
