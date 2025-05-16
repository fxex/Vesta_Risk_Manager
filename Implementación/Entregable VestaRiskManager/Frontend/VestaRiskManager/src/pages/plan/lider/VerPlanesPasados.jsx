import React from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";
import { Button, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export default function VerPlanesPasados() {
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));
  const navigate = useNavigate();

  const { planes } = useLoaderData();
  

  return (
    <>
      <NavegadorLider />
      <Contenedor>
        <h3>{proyecto.nombre} - Planes pasados</h3>
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
                          overlay={<Tooltip id="tooltip-edit">Ver</Tooltip>}
                        >
                          <Button
                            variant="outline-primary"
                            onClick={() => {
                              navigate(
                                `/inicio/proyecto/lider/${proyecto.id_proyecto}/monitoreo/plan/${plan.id_plan}`
                              );
                            }}
                          >
                            <FontAwesomeIcon icon={faSearch} />
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
