import React, { useEffect, useState } from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";
import {
  Alert,
  Button,
  OverlayTrigger,
  Table,
  Tooltip,
} from "react-bootstrap";
import BotonSalir from "../../../components/BotonSalir";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { obtenerEvaluacionesAnterioresProyectoPaginado } from "../../../services/evaluacion";
import Paginado from "../../../components/Paginado";
import { formatearFecha } from "../../../utils/funciones";

export default function VerEvaluacionesPasadasLider() {
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));
  const navigate = useNavigate();
  const { evaluaciones, totalPaginas, iteracion } = useLoaderData();
  const [paginaActual, setPaginaActual] = useState(1);
  const [evaluacionesCargadas, setEvaluacionesCargadas] = useState(evaluaciones);

  useEffect(() => {
    obtenerEvaluacionesAnterioresProyectoPaginado(proyecto.id_proyecto, paginaActual).then(
      (data) => {
        setEvaluacionesCargadas(data.evaluaciones);
      }
    );
  }, [paginaActual]);

  return (
    <>
      <NavegadorLider />
      {iteracion === null ? (
        <Alert variant="danger" className="text-center">
          No existe una iteración activa del proyecto. Sólo se permite
          visualizar.
        </Alert>
      ) : null}
      <Contenedor>

        <>
        <h3>{proyecto.nombre} - Evaluaciones anteriores</h3>
        
        {iteracion ? (
          <>
            <h4>
              {iteracion.nombre}
              {" - "}
              {formatearFecha(iteracion.fecha_inicio)}
              {" al "}
              {formatearFecha(iteracion.fecha_fin)}
            </h4>
          </>
        ) : null}
        </>
        <>
        <Table size="sm" hover className="mt-2" bordered>
          <thead className="cabecera">
            <tr>
              <th style={{ width: "5em" }} className="th">Riesgo</th>
              <th style={{ width: "5em" }} className="th">Impacto</th>
              <th style={{ width: "5em" }} className="th">Probabilidad</th>
              <th style={{ maxWidth: "20em" }} className="th">Justificaci&oacute;n</th>
              <th className="th">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {evaluacionesCargadas && evaluacionesCargadas.length > 0 ? evaluacionesCargadas.map((evaluacion, key) => (
              <tr key={key} style={{ textAlign: "center" }}>
                <td className="td">{evaluacion.id_riesgo}</td>
                <td className="td">{evaluacion.impacto}</td>
                <td className="td">{evaluacion.probabilidad}</td>
                <td className="td">{evaluacion.descripcion}</td>
                <td className="td">
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="tooltip-edit">Ver</Tooltip>}
                  >
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        navigate(`/inicio/proyecto/lider/${proyecto.id_proyecto}/monitoreo/evaluacion/${evaluacion.id_evaluacion}`, {
                          state: { ruta: `/inicio/proyecto/lider/${proyecto.id_proyecto}/evaluaciones/pasadas` }
                        })
                      }}
                    >
                      <FontAwesomeIcon icon={faSearch} />
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            )) :
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>No hay evaluaciones anteriores</td>
            </tr> 
            }
          </tbody>
        </Table>
        <Paginado paginaActual={paginaActual} setPaginaActual={setPaginaActual} totalPaginas={totalPaginas} />
        <BotonSalir ruta={"/inicio/proyecto/lider/" + proyecto.id_proyecto + "/monitoreo"} />
        </>
      </Contenedor>
      <Footer />
    </>
  );
}