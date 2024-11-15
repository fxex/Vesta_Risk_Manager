import React from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import Construccion from "./../../../assets/img/Construccion.png";
import { Figure } from "react-bootstrap";

export default function VerProyectoLider() {
  return (
    <>
      <NavegadorLider />
      <div
        style={{ minHeight: "70vh" }}
        className="d-flex justify-content-center"
      >
        <Figure.Image src={Construccion}></Figure.Image>
      </div>
      <Footer />
    </>
  );
}
