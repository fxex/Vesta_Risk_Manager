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
import { modificarImpacto, modificarProbabilidad } from "../../../utils/funciones";

export default function VerEvaluacionesActuLider() {
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));
  const navigate = useNavigate();
  
  const { evaluaciones } = useLoaderData();
    
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
            {evaluaciones.length > 0 ? evaluaciones.map((evaluacion, key) => (
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
                        navigate(`/inicio/proyecto/lider/${proyecto.id_proyecto}/monitoreo/evaluacion/${evaluacion.id_evaluacion}`, {
                          state: { ruta: `/inicio/proyecto/lider/${proyecto.id_proyecto}/evaluaciones/actual` }
                        })
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
            )) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No hay evaluaciones</td>
              </tr>
            )}
          </tbody>
        </Table>
        <BotonSalir ruta={"/inicio/proyecto/lider/" + proyecto.id_proyecto + "/monitoreo"} />
        </>
      </Contenedor>
      <Footer />
    </>
  );
}