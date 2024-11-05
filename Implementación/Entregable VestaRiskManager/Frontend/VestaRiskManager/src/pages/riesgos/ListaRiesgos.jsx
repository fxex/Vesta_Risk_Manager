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
import useProyecto from "../../hooks/useProyecto";
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
  const [value] = useProyecto("proyecto_seleccionado", "");
  const location = useLocation();
  console.log(riesgos);

  const navigate = useNavigate();
  const comprobacionLider = location.pathname.includes("lider");

  return (
    <>
      <NavegadorLider />
      <Contenedor>
        <h3>{value.nombre}</h3>
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
                <th style={{ minWidth: "4em" }}></th>
                <th>ID</th>
                <th>Categoria</th>
                <th>Descripción</th>
                <th style={{ maxWidth: "2em" }}>Responsable</th>
                <th style={{ maxWidth: "5em" }}>Factor de riesgo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {riesgos.map((item, key) => (
                <tr key={key} style={{ textAlign: "center" }}>
                  <td>Escudo</td>
                  <td>
                    RK
                    {item.id_riesgo < 10
                      ? `0${item.id_riesgo}`
                      : item.id_riesgo}
                  </td>
                  <td>{item.nombre_categoria}</td>
                  <td style={{ maxWidth: "20em", textAlign: "justify" }}>
                    {item.descripcion}
                  </td>
                  <td>
                    {item.responsables.map((item) => (
                      <>
                        {item.nombre} <br />
                      </>
                    ))}
                  </td>
                  <td>{item.factor_riesgo}</td>
                  <td>
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
