import React, { useEffect, useState } from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";
import { Alert, Button, Modal, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPenToSquare, faSearch, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";


export default function VerPlanesActuales() {
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));
  const navigate = useNavigate();

  const { planes } = useLoaderData();
  const location = useLocation();
  
  const [mensaje, setMensaje] = useState("");

  const [eliminar, setEliminar] = useState(false)
  const [planSeleccionado, setPlanSeleccionado] = useState(0)
  
    useEffect(() => {
      if (location.state?.mensaje) {
        window.scrollTo(0, 0);
        setMensaje(location.state.mensaje);
  
        // Limpiar el mensaje después de unos segundos
        const timeoutId = setTimeout(() => {
          setMensaje("");
        }, 3000); // Mostrar el mensaje durante 3 segundos
  
        // Limpiar el timeout si el componente se desmonta
        return () => clearTimeout(timeoutId);
      }
    }, [location.state]);

  return (
    <>
      <NavegadorLider />
      {mensaje ? (
        <Alert variant="success" className="text-center fs-4">
          {mensaje}
        </Alert>
      ) : null}
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
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip id="tooltip-edit">Editar</Tooltip>}
                        >
                          <Button
                            variant="outline-warning"
                            style={{ marginLeft: "5px" }}

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
                            onClick={()=>{
                              setEliminar(true)
                              setPlanSeleccionado(plan.id_plan)
                            }}
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

      <Modal
        show={eliminar}
        onHide={() => {
          setEliminar(false)
          setPlanSeleccionado(0)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>¿Está seguro?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Una vez eliminado el plan, será irrecuperable.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-success"
            onClick={async() => {
              // await eliminarRiesgo(id_proyecto, riesgoSeleccionado)
              window.location.reload()
            }}
          >
            <FontAwesomeIcon
              icon={faCheck}
              style={{ marginRight: "5px" }}
            />
            Eliminar
          </Button>
          <Button
            variant="outline-danger"
            onClick={() => {
              setEliminar(false)
              setPlanSeleccionado(0)
            }}
          >
            <FontAwesomeIcon
              icon={faXmark}
              style={{ marginRight: "5px" }}
            />
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
