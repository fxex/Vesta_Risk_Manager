import React from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useUsuario } from "../../../context/usuarioContext";
import { informeSeguimiento } from "../../informes/seguimiento";

export default function MonitoreoLider() {
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));
  const navigate = useNavigate();
  const { id_proyecto } = useParams();
  const { usuario } = useUsuario();  

  return (
    <>
      <NavegadorLider />
      <Contenedor>
        <h3>{proyecto.nombre} - Monitoreo</h3>
        <div style={{ minHeight: "50vh" }}>
          <p>Seleccione una de las siguientes opciones:</p>
          <div className="d-flex gap-3" style={{ minHeight: "10vh" }}>
            <Button
              className="boton_2"
              onClick={() => {
                navigate(
                  `/inicio/proyecto/lider/${id_proyecto}/monitoreo/planes`
                );
              }}
            >
              Planes actuales
            </Button>
            <Button 
              className="boton_2"
              onClick={() => {
                navigate(
                  `/inicio/proyecto/lider/${id_proyecto}/monitoreo/planes/pasados`
                );
              }}
            >
              Planes pasados
            </Button>
            <Button 
              className="boton_2"
              onClick={() => {
                navigate(
                  `/inicio/proyecto/lider/${id_proyecto}/evaluaciones/actual`
                );
              }}
            >
              Evaluaciones actuales
            </Button>
            <Button 
              className="boton_2"
              onClick={() => {
                navigate(
                  `/inicio/proyecto/lider/${id_proyecto}/evaluaciones/pasada`
                );
              }}
            >
              Evaluaciones anteriores
            </Button>
          </div>
          <hr ></hr>
          <p>Informes:</p>
          <div className="d-flex gap-3" style={{ minHeight: "10vh" }}>
            <Button className="boton_2" onClick={() =>{
              navigate(
                `/inicio/proyecto/lider/${id_proyecto}/monitoreo/incidencias`
              );
            }
            }>Incidencias</Button>
            <Button className="boton_2" onClick={()=>{
              navigate(
                `/inicio/proyecto/lider/${id_proyecto}/monitoreo/${usuario.id_usuario}/tareas`
              );
            }
            }>Tareas a realizar</Button>
            <Button className="boton_2" onClick={() => {
                navigate(
                  `/inicio/proyecto/lider/${id_proyecto}/monitoreo/seguimiento`
                );
              }
            }>Seguimiento de riesgo</Button>
          </div>
        </div>
      </Contenedor>
      <Footer />
    </>
  );
}
