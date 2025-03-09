import React from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { obtenerPlanesProyecto } from "../../../services/riesgos";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const planesLoader = async ({ params }) => {
  const planes = await obtenerPlanesProyecto(params.id_proyecto);
  return { planes };
};

export default function VerPlanesActuales() {
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));
  const mapId = JSON.parse(localStorage.getItem("mapId"));
  const navigate = useNavigate();

  const { planes } = useLoaderData();

  return (
    <>
      <NavegadorLider />
      <Contenedor>
        <h3>{proyecto.nombre} - Planes actuales</h3>
        <Table size="sm" hover className="mt-2" bordered>
          <thead className="cabecera">
            <tr>
              <th className="th" style={{ width: "6em" }}>
                Riesgo
              </th>
              <th className="th" style={{ width: "8em" }}>
                Factor de riesgo
              </th>
              <th className="th" style={{ width: "10em" }}>
                Tipo
              </th>
              <th className="th" style={{ width: "28em" }}>
                Descripción
              </th>
              <th className="th">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {planes && planes.length > 0
              ? planes.map((plan, key) => (
                  <tr key={key}>
                    <td className="td">
                      RK
                      {plan.id_riesgo < 10
                        ? "0"
                        : ""}
                      {
                        plan.id_riesgo
                      }
                    </td>
                    <td className="td">{plan.factor_riesgo}</td>
                    <td className="td">{plan.tipo}</td>
                    <td className="td">{plan.descripcion}</td>
                    <td className="td">
                      <div>
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip id="tooltip-edit">Editar</Tooltip>}
                        >
                          <Button
                            variant="outline-warning"
                            onClick={() => {
                              navigate(
                                `/inicio/proyecto/lider/${proyecto.id_proyecto}/monitoreo/plan/editar/${plan.id_plan}`
                              );
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
                            variant="outline-danger"
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </Button>
                        </OverlayTrigger>
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </Contenedor>
      <Footer />
    </>
  );
}
