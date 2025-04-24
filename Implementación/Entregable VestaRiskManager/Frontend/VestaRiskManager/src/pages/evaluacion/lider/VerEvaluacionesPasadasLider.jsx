import React from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";
import {
  Alert,
  Button,
  Figure,
  Modal,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";


export default function VerEvaluacionesPasadasLider() {
  return (
    <>
      <NavegadorLider />
      {/*iteracion === null ? (
        <Alert variant="danger" className="text-center">
          No existe una iteración activa del proyecto. Sólo se permite
          visualizar.
        </Alert>
      ) : null*/}
      <Contenedor>
        <h3>Evaluaciones anteriores</h3>
        
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
        <Table size="sm" hover className="mt-2" bordered>
          <thead className="cabecera">
            <tr>
              <th style={{ maxWidth: "5em" }} className="th">Id</th>
              <th style={{ width: "5em" }} className="th">Riesgo</th>
              <th style={{ width: "5em" }} className="th">Impacto</th>
              <th style={{ width: "5em" }} className="th">Probabilidad</th>
              <th style={{ maxWidth: "20em" }} className="th">Justificaci&oacute;n</th>
              <th className="th">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/*tareas.map((evaluacion, key) => (
              <tr key={key} style={{ textAlign: "center" }}>
                <td>{evaluacion.id}</td>
                <td style={{ textWrap: "wrap" }}>{evaluacion.riesgo}</td>
                <td>{evaluacion.impacto}</td>
                <td>{evaluacion.probailidad}</td>
                <td style={{ textWrap: "wrap" }}>{evaluacion.justificacion}</td>
                <td className="td">

                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-edit">Ver</Tooltip>}
                  >
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        navigate(`inicio/proyecto/lider/${proyecto.id_proyecto}/monitoreo/${usuario.id_usuario}/tarea/${tarea.id_tarea}`)
                      }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </OverlayTrigger>


                </td>
              </tr>
            ))*/}
          </tbody>
        </Table>
      </Contenedor>
      <Footer />
    </>
  );
}