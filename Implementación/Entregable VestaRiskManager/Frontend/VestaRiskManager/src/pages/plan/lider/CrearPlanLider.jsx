import React from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";
import {
  obtenerCantidadPlanTipo,
  obtenerRiesgoId,
} from "../../../services/riesgos";
import {
  obtenerIteracionActual,
  obtenerParticipanteNombre,
} from "../../../services/proyectos";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useUsuario } from "../../../context/usuarioContext";
import { Button, Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMagnifyingGlass,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ModalPersonalizado from "../../../components/ModalPersonalizado";

export const planCreacionLoader = async ({ params }) => {
  const id_riesgo_real = params.id_riesgo.split("-")[0];

  const riesgo = await obtenerRiesgoId(params.id_proyecto, id_riesgo_real);
  const iteracion = await obtenerIteracionActual(params.id_proyecto);
  const planes = await obtenerCantidadPlanTipo(
    params.id_proyecto,
    id_riesgo_real
  );
  return { riesgo, iteracion, planes };
};

export default function CrearPlanLider() {
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));

  const { riesgo, iteracion, planes } = useLoaderData();
  const navigate = useNavigate();

  const { id_proyecto, id_riesgo } = useParams();
  const [id_riesgo_real, id_riesgo_local] = id_riesgo.split("-");

  const { usuario } = useUsuario();

  const [mostrarTarea, setMostrarTarea] = useState(false);

  const [formData, setFormData] = useState({
    tipo: "",
    descripcion: "",
    tareas: [],
  });

  const [formDataTarea, setFormDataTarea] = useState({
    nombre: "",
    descripcion: "",
    fecha_inicio: "",
    buscar: "",
    responsables: [],
  });

  const [errorPrincipal, setErrorPrincipal] = useState({
    tipo: false,
    descripcion: false,
    tareas: false,
  });

  const handleChangeSelect = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorPrincipal({ ...errorPrincipal, [name]: false });
  };

  const handleChangeControl = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorPrincipal({ ...errorPrincipal, [name]: false });
  };

  const handleChangeControlTarea = (e) => {
    const { name, value } = e.target;
    setFormDataTarea({ ...formDataTarea, [name]: value });
    // setErrorPrincipal({ ...errorPrincipal, [name]: false });
  };

  const handleMostrarParticipante = () => {
    setMostrarTarea(!mostrarTarea);
    setFormDataTarea({
      nombre: "",
      descripcion: "",
      fecha_inicio: "",
      fecha_finalizacion: "",
      buscar: "",
      responsables: [],
    });
    // setFormDataParticipante({
    //   nombre: "",
    //   rol: "",
    // });
    // setParticipantesTotal([]);
    // setParticipantesMostrado([]);
    // setErrorParticipante(false);
  };

  return (
    <>
      <NavegadorLider />
      <Contenedor>
        <h3>
          {proyecto.nombre} - Planificar Riesgo {id_riesgo_local}
        </h3>
        <Form>
          <Form.Group>
            <Form.Label>Id del riesgo</Form.Label>
            <Form.Control
              disabled
              value={`RK${
                id_riesgo_local < 10 ? "0" + id_riesgo_local : id_riesgo_local
              }`}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción del riesgo</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              disabled
              value={riesgo.descripcion}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Categoría del riesgo</Form.Label>
            <Form.Control disabled value={riesgo.nombre_categoria} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Iteración</Form.Label>
            <Form.Control disabled value={iteracion.nombre} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Tipo</Form.Label>
            <Form.Select
              name="tipo"
              value={formData.tipo}
              onChange={handleChangeSelect}
            >
              <option value={""}>Seleccione el tipo de plan</option>
              {planes.total_minimizacion === 0 ? (
                <option value={"minimizacion"}>Minimización</option>
              ) : null}
              {planes.total_mitigacion === 0 ? (
                <option value={"mitigacion"}>Mitigación</option>
              ) : null}
              {planes.total_contigencia === 0 ? (
                <option value={"contingencia"}>Contingencia</option>
              ) : null}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese la descripción del plan"
              name="descripcion"
              onChange={handleChangeControl}
              value={formData.descripcion}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tareas</Form.Label>
            <br></br>
            <Button variant="success" onClick={handleMostrarParticipante}>
              <FontAwesomeIcon icon={faPlus} className="mx-1" />
              Agregar Tarea
            </Button>
            <Table size="sm" hover className="mt-2">
              <thead className="table-info">
                <tr className="th">
                  <th>Tarea</th>
                  <th>Responsable</th>
                  <th>Fecha de inicio</th>
                  <th>Fecha de finalización</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {formData.tareas && formData.tareas.length > 0
                  ? formData.tareas.map((item, key) => (
                      <tr key={key} className="td"></tr>
                    ))
                  : null}
              </tbody>
            </Table>
          </Form.Group>
        </Form>
        <>
          <Button variant="outline-success" className="mx-1" onClick={() => {}}>
            <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />
            Confirmar
          </Button>
          <Button
            variant="outline-danger"
            className="mx-1"
            onClick={() => {
              navigate(
                `/inicio/proyecto/lider/${proyecto.id_proyecto}/riesgos`
              );
            }}
          >
            <FontAwesomeIcon icon={faXmark} style={{ marginRight: "5px" }} />
            Cancelar
          </Button>
        </>
      </Contenedor>
      <ModalPersonalizado
        title={"Añadir Tarea"}
        datosDefecto={() => {
          setFormDataTarea({
            nombre: "",
            descripcion: "",
            fecha_inicio: "",
            responsables: [],
          });
        }}
        onConfirm={() => {}}
        setShow={setMostrarTarea}
        show={mostrarTarea}
      >
        <Form>
          <Form.Group>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="nombre"
              placeholder="Ingrese el nombre de la tarea"
              value={formDataTarea.nombre}
              onChange={handleChangeControlTarea}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              placeholder="Ingrese la descripción de la tarea"
              value={formDataTarea.descripcion}
              onChange={handleChangeControlTarea}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha de inicio</Form.Label>
            <Form.Control
              type="date"
              name="fecha_inicio"
              value={formDataTarea.fecha_inicio}
              onChange={handleChangeControlTarea}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Fecha de finalización</Form.Label>
            <Form.Control
              type="date"
              name="fecha_finalizacion"
              value={formDataTarea.fecha_finalizacion}
              onChange={handleChangeControlTarea}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Responsables</Form.Label>
            {proyecto.participantes && proyecto.participantes.length > 0
              ? proyecto.participantes.map((participante, key) => (
                  <Form.Check
                    key={key}
                    label={`${participante.nombre} - ${participante.email}`}
                  />
                ))
              : null}
          </Form.Group>
        </Form>
      </ModalPersonalizado>
      <Footer />
    </>
  );
}
