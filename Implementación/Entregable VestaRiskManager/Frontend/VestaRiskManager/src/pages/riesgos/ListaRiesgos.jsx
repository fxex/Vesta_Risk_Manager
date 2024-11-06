import React from "react";
import Contenedor from "../../components/Contenedor";
import NavegadorLider from "../../components/NavegadorLider";
import Footer from "../../components/Footer";
import { Button, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNetworkWired,
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { obtenerRiesgosProyecto } from "../../services/riesgos";
import "./../../styles/ListaRiesgo.css";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons/faClipboardList";

export const riesgoLoader = async ({ params }) => {
  const riesgos = await obtenerRiesgosProyecto(params.id_proyecto);
  riesgos.map((item, key) => {
    item.id_riesgo = key + 1;
  });

  return riesgos;
};

export default function ListaRiesgos() {
  const { id_proyecto } = useParams();
  const riesgos = useLoaderData();
  const location = useLocation();

  const navigate = useNavigate();
  const comprobacionLider = location.pathname.includes("lider");
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));

  return (
    <>
      <NavegadorLider />
      <Contenedor>
        <h3>{proyecto.nombre}</h3>
        <>
          <Button
            variant="success"
            onClick={() => {
              navigate(
                `/inicio/proyecto/${
                  comprobacionLider ? "lider" : "desarrollador"
                }/${id_proyecto}/riesgo/crear`
              );
            }}
          >
            <FontAwesomeIcon icon={faPlus} className="mx-1" />
            Nuevo Riesgo
          </Button>
          <Table size="sm" hover className="mt-2" bordered>
            <thead className="cabecera">
              <tr>
                <th style={{ minWidth: "4em" }} className="th"></th>
                <th className="th">ID</th>
                <th className="th">Categoria</th>
                <th className="th">Descripción</th>
                <th style={{ maxWidth: "2em" }} className="th">
                  Responsable
                </th>
                <th style={{ maxWidth: "5em" }} className="th">
                  Factor de riesgo
                </th>
                <th className="th">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {riesgos.map((item, key) => (
                <tr key={key} style={{ textAlign: "center" }}>
                  <td className="td">Escudo</td>
                  <td className="td">
                    RK
                    {item.id_riesgo < 10
                      ? `0${item.id_riesgo}`
                      : item.id_riesgo}
                  </td>
                  <td className="td">{item.nombre_categoria}</td>
                  <td
                    style={{ maxWidth: "20em", textAlign: "justify" }}
                    className="td"
                  >
                    {item.descripcion}
                  </td>
                  <td className="td">
                    {item.responsables.map((item) => (
                      <>
                        {item.nombre} <br />
                      </>
                    ))}
                  </td>
                  <td className="td">{item.factor_riesgo}</td>
                  <td className="td">
                    <div>
                      <Button>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Button>
                      <Button style={{ marginLeft: "5px" }}>
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    </div>
                    <br />
                    <div>
                      <Button>
                        <FontAwesomeIcon icon={faClipboardList} />
                      </Button>
                      <Button style={{ marginLeft: "5px" }}>
                        <FontAwesomeIcon icon={faNetworkWired} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      </Contenedor>
      <Footer />
    </>
  );
}
