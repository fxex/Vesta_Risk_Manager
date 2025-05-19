import React from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";
import {
  Button,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faSearch, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import BotonSalir from "../../../components/BotonSalir";

export default function VerEvaluacionesActuLider() {
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));
  const navigate = useNavigate();
  
  const { evaluaciones } = useLoaderData();
  
  const modificarImpacto = (valor) => {
    if (valor <= 3) return valor + " - Bajo";
    if (valor <= 6) return valor + " - Moderado";
    if (valor <= 8) return valor + " - Significante";
    if (valor <= 10) return valor + " - Alto";
  }

  const modificarProbabilidad = (valor) => {
    switch (parseInt(valor)) {
      case 1:
        return valor + " - 0 ~ 10%";
      case 2:
        return valor + " - 10 ~ 20%";
      case 3:
        return valor + " - 20 ~ 30%";
      case 4:
        return valor + " - 30 ~ 40%";
      case 5:
        return valor + " - 40 ~ 50%";
      case 6:
        return valor + " - 50 ~ 60%";
      case 7:
        return valor + " - 60 ~ 70%";
      case 8:
        return valor + " - 70 ~ 80%";
      case 9:
        return valor + " - 80 ~ 90%";
      case 10:
        return valor + " - 90 ~ 100%";
      default:
        return valor;
    }
  }
    
  return (
    <>
      <NavegadorLider />
      <Contenedor>
        <h3>Evaluaciones Actuales</h3>
        
        {/*iteracion ? (
          <>
            <h4>
              {iteracion.nombre}
              {" - "}
              {formatearFecha(iteracion.fecha_inicio)}
              {" al "}
              {formatearFecha(iteracion.fecha_fin)}
            </h4>
          </>
        ) : null*/}
        <>
        <Table size="sm" hover className="mt-2" bordered>
          <thead className="cabecera">
            <tr>
              <th style={{ width: "5em" }} className="th">Riesgo</th>
              <th style={{ width: "10em" }} className="th">Impacto</th>
              <th style={{ width: "10em" }} className="th">Probabilidad</th>
              <th style={{ maxWidth: "20em" }} className="th">Justificaci&oacute;n</th>
              <th style={{ width: "14em" }} className="th">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {evaluaciones.map((evaluacion, key) => (
              <tr key={key} style={{ textAlign: "center" }}>
                <td style={{ textWrap: "wrap" }}>{evaluacion.id_riesgo < 9 ? "RK0" : "RK" }{evaluacion.id_riesgo}</td>
                <td>{modificarImpacto(evaluacion.impacto)}</td>
                <td>{modificarProbabilidad(evaluacion.probabilidad)}</td>
                <td style={{ textWrap: "wrap" }}>{evaluacion.descripcion}</td>
                <td className="td">

                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-edit">Ver</Tooltip>}
                  >
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        // navigate(`inicio/proyecto/lider/${proyecto.id_proyecto}/monitoreo/${usuario.id_usuario}/tarea/${tarea.id_tarea}`)
                      }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-edit">Editar</Tooltip>}
                  >
                    <Button
                      variant="outline-warning"
                      style={{ marginLeft: "5px" }}

                      onClick={() => {
                        // navigate(
                        //   `/inicio/proyecto/lider/${proyecto.id_proyecto}/monitoreo/plan/editar/${plan.id_plan}`
                        // );
                      }}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="tooltip-edit">Eliminar</Tooltip>
                    }
                  >
                    <Button
                      style={{ marginLeft: "5px" }}
                      onClick={()=>{
                        // setEliminar(true)
                        // setPlanSeleccionado(plan.id_plan)
                      }}
                      variant="outline-danger"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  </OverlayTrigger>


                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <BotonSalir ruta={"/inicio/proyecto/lider/" + proyecto.id_proyecto + "/monitoreo"} />
        </>
      </Contenedor>
      <Footer />
    </>
  );
}