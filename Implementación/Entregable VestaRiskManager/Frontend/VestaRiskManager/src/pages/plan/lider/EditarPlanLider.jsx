import React from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";
import {
  crearPlan,
  modificarPlan,
  obtenerCantidadPlanTipo,
  obtenerPlanId,
  obtenerRiesgoId,
} from "../../../services/riesgos";
import { obtenerIteracionActual } from "../../../services/proyectos";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useUsuario } from "../../../context/usuarioContext";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faPlus,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ModalPersonalizado from "../../../components/ModalPersonalizado";
import { verificarError } from "../../../utils/verificarErrores";
import { formatearFecha } from "../../../utils/fecha";
import BotonSalir from "../../../components/BotonSalir";

export const planLoader = async ({ params }) => {
  const id_plan= params.id_plan;
  const iteracion = await obtenerIteracionActual(params.id_proyecto);
  const plan = await obtenerPlanId(params.id_proyecto, id_plan);

  return { iteracion, plan };
};

export default function EditarPlanLider() {
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));
  const { iteracion, plan } = useLoaderData();

  const navigate = useNavigate();

  const { id_proyecto, id_plan} = useParams();

  const [mostrarTarea, setMostrarTarea] = useState(false);
  const [modificado, setModificado] = useState(null);

  const [formData, setFormData] = useState({
    tipo: plan.tipo,
    descripcion: plan.descripcion,
    tareas: plan.tareas,
    tareas_eliminadas: [],
  });

  const [formDataTarea, setFormDataTarea] = useState({
    nombre: "",
    descripcion: "",
    fecha_inicio: "",
    fecha_fin: "",
    responsables: [],
  });

  const [errorPrincipal, setErrorPrincipal] = useState({
    tipo: false,
    descripcion: false,
    tareas: false,
  });

  const [errorTarea, setErrorTarea] = useState({
    nombre: false,
    descripcion: false,
    fecha_inicio: false,
    fecha_fin: false,
    responsables: false,
    fecha_fin_antes: false,
    fecha_inicio_antes_iteracion: false,
    fecha_fin_despues_iteracion: false,
    nombre_igual: false,
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
    setErrorTarea({ ...errorTarea, [name]: false });
  };

  const handleChangeCheckTarea = (e) => {
    const { name, value, checked } = e.target;
    const value_json = JSON.parse(value);
    setFormDataTarea((prevFormData) => {
      if (checked) {
        return {
          ...prevFormData,
          [name]: [...prevFormData.responsables, value_json],
        };
      } else {
        return {
          ...prevFormData,
          [name]: prevFormData.responsables.filter(
            (responsable) => responsable.id_usuario !== value_json.id_usuario
          ),
        };
      }
    });
    setErrorTarea({ ...errorTarea, [name]: false });
  };

  const handleMostrarTarea = () => {
    setMostrarTarea(!mostrarTarea);
    setFormDataTarea({
      nombre: "",
      descripcion: "",
      fecha_inicio: "",
      fecha_fin: "",
      responsables: [],
    });

    setErrorTarea({
      nombre: false,
      descripcion: false,
      fecha_inicio: false,
      fecha_fin: false,
      responsables: false,
      fecha_fin_antes: false,
      fecha_inicio_antes_iteracion: false,
      fecha_fin_despues_iteracion: false,
      nombre_igual: false,
    });
  };

  const handleClickPrincipal = async () => {
    const comprobacionError = {
      tipo: formData.tipo.length === 0,
      descripcion: formData.descripcion.length === 0,
      tareas: formData.tareas.length === 0,
    };
    setErrorPrincipal(comprobacionError);

    const resultado = verificarError(comprobacionError);
    if (!resultado) {
      const modificacion = await modificarPlan(
        id_proyecto,
        id_plan,
        formData
      );
      setModificado(modificacion);
    }
  };

  const comprobarDosFechas = (fecha1, fecha2) => {
    return new Date(fecha1) < new Date(fecha2);
  };

  const handleClickTarea = () => {
    const nombre_igual =
      formData.tareas.length > 0
        ? formData.tareas.some((tarea) => tarea.nombre === formDataTarea.nombre)
        : false;
    const comprobacionError = {
      nombre:
        formDataTarea.nombre.length === 0 || formDataTarea.nombre.length > 80,
      descripcion: formDataTarea.descripcion.length === 0,
      fecha_inicio: formDataTarea.fecha_inicio.length === 0,
      fecha_fin: formDataTarea.fecha_fin.length === 0,
      responsables: formDataTarea.responsables.length === 0,
      fecha_fin_antes: comprobarDosFechas(
        formDataTarea.fecha_fin,
        formDataTarea.fecha_inicio
      ),
      fecha_inicio_antes_iteracion: comprobarDosFechas(
        formDataTarea.fecha_inicio,
        iteracion.fecha_inicio
      ),
      fecha_fin_despues_iteracion: false,
      nombre_igual: nombre_igual,
    };

    setErrorTarea(comprobacionError);

    const resultado = verificarError(comprobacionError);
    if (!resultado) {
      formDataTarea.estado = 0;
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          tareas: [...prevFormData.tareas, formDataTarea],
        };
      });
      handleMostrarTarea();
      errorPrincipal.tareas = false;
    }
  };
  if (modificado === null) {
    return (
      <>
        <NavegadorLider />
        <Contenedor>
          <h3>
            {proyecto.nombre} - Editar Plan del Riesgo RK{plan.id_riesgo < 10 ? "0" : ""}
            {plan.id_riesgo}
          </h3>
          <Form>
            <Form.Group>
              <Form.Label>Id del riesgo</Form.Label>
              <Form.Control
                disabled
                value={`RK${ plan.id_riesgo < 10 ? "0" : ""}${plan.id_riesgo}
                `}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripción del riesgo</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                disabled
                value={plan.riesgo.descripcion}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Categoría del riesgo</Form.Label>
              <Form.Control disabled value={plan.riesgo.nombre_categoria} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Iteración</Form.Label>
              <Form.Control
                disabled
                value={`${iteracion.nombre} - ${formatearFecha(
                  iteracion.fecha_inicio
                )} al ${formatearFecha(iteracion.fecha_fin)}`}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipo</Form.Label>
              <Form.Select
                name="tipo"
                value={formData.tipo}
                onChange={handleChangeSelect}
                isInvalid={errorPrincipal.tipo}
              >
                <option value={""}>Seleccione el tipo de plan</option>
                {plan.planes_realizado.total_minimizacion == 0 ||
                plan.tipo == "minimizacion" ? (
                  <option value={"minimizacion"}>Minimización</option>
                ) : null}
                {plan.planes_realizado.total_mitigacion == 0 ||
                plan.tipo == "mitigacion" ? (
                  <option value={"mitigacion"}>Mitigación</option>
                ) : null}
                {plan.planes_realizado.total_contingencia == 0 ||
                plan.tipo == "contingencia" ? (
                  <option value={"contingencia"}>Contingencia</option>
                ) : null}
              </Form.Select>
              {errorPrincipal.tipo && (
                <Form.Text className="text-danger">
                  Seleccione el tipo de plan.
                </Form.Text>
              )}
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
                isInvalid={errorPrincipal.descripcion}
              />
              {errorPrincipal.descripcion && (
                <Form.Text className="text-danger">
                  Revise que la descripción no este vacía.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Tareas</Form.Label>
              <br></br>
              <Button variant="success" onClick={handleMostrarTarea}>
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
                    ? formData.tareas.map((tarea, key) => (
                        <tr key={key} className="td">
                          <td>{tarea.nombre}</td>
                          <td>
                            {tarea.responsables.map((responsable) => (
                              <>
                                {responsable.nombre} <br />
                              </>
                            ))}
                          </td>
                          <td>{formatearFecha(tarea.fecha_inicio)}</td>
                          <td>{formatearFecha(tarea.fecha_fin)}</td>
                          <td>
                            <Button
                              variant="outline-danger"
                              className="mx-1"
                              onClick={() => {
                                if (tarea.id_tarea) {
                                  setFormData((prevFormData) => {
                                    return {
                                      ...prevFormData,
                                      tareas_eliminadas: [
                                        ...prevFormData.tareas_eliminadas,
                                        tarea,
                                      ],
                                    };
                                  });
                                }
                                setFormData((prevFormData) => {
                                  return {
                                    ...prevFormData,
                                    tareas: prevFormData.tareas.filter(
                                      (tareaForm) =>
                                        tareaForm.nombre !== tarea.nombre
                                    ),
                                  };
                                });
                              }}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </Button>
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
              {errorPrincipal.tareas && (
                <Form.Text className="text-danger">
                  El plan debe tener al menos una tarea.
                </Form.Text>
              )}
            </Form.Group>
          </Form>
          <>
            <Button
              variant="outline-success"
              className="mx-1"
              onClick={handleClickPrincipal}
            >
              <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />
              Confirmar
            </Button>
            <Button
              variant="outline-danger"
              className="mx-1"
              onClick={() => {
                navigate(
                  `/inicio/proyecto/lider/${proyecto.id_proyecto}/monitoreo/planes`
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
              fecha_fin: "",
              responsables: [],
            });
          }}
          onConfirm={handleClickTarea}
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
                isInvalid={errorTarea.nombre || errorTarea.nombre_igual}
              />
              {errorTarea.nombre || errorTarea.nombre_igual ? (
                <Form.Text className="text-danger">
                  Revise que el nombre{" "}
                  {formDataTarea.nombre.length === 0
                    ? "no este vacío"
                    : formDataTarea.nombre.length > 80
                    ? "supera la longitud maxima (80 caracteres)"
                    : "no sea igual al de otra tarea"}
                  .
                </Form.Text>
              ) : null}
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
                isInvalid={errorTarea.descripcion}
              />
              {errorTarea.descripcion && (
                <Form.Text className="text-danger">
                  Revise que la descripción no este vacía.
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha de inicio</Form.Label>
              <Form.Control
                type="date"
                name="fecha_inicio"
                min={iteracion.fecha_inicio}
                max={iteracion.fecha_fin}
                value={formDataTarea.fecha_inicio}
                onChange={handleChangeControlTarea}
                isInvalid={
                  errorTarea.fecha_inicio ||
                  errorTarea.fecha_inicio_antes_iteracion
                }
              />
              {errorTarea.fecha_inicio ||
              errorTarea.fecha_inicio_antes_iteracion ? (
                <Form.Text className="text-danger">
                  Revise que la fecha{" "}
                  {errorTarea.fecha_inicio
                    ? "no este vacía"
                    : "no este antes que la fecha de iteración"}
                  .
                </Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Fecha de finalización</Form.Label>
              <Form.Control
                type="date"
                name="fecha_fin"
                min={iteracion.fecha_inicio}
                max={iteracion.fecha_fin}
                value={formDataTarea.fecha_fin}
                onChange={handleChangeControlTarea}
                isInvalid={
                  errorTarea.fecha_fin ||
                  errorTarea.fecha_fin_antes ||
                  errorTarea.fecha_fin_despues_iteracion
                }
              />

              {errorTarea.fecha_fin ||
              errorTarea.fecha_fin_antes ||
              errorTarea.fecha_fin_despues_iteracion ? (
                <Form.Text className="text-danger">
                  Revise que la fecha{" "}
                  {errorTarea.fecha_fin
                    ? "no este vacía"
                    : errorTarea.fecha_fin_antes
                    ? "no este antes que la fecha de inicio"
                    : "no este despues que la fecha de iteración"}
                  .
                </Form.Text>
              ) : null}
            </Form.Group>

            <Form.Group>
              <Form.Label>Responsables</Form.Label>
              {proyecto.participantes && proyecto.participantes.length > 0
                ? proyecto.participantes.map((participante, key) => (
                    <Form.Check
                      key={key}
                      label={participante.nombre}
                      value={JSON.stringify({
                        id_usuario: participante.id_usuario,
                        nombre: participante.nombre,
                      })}
                      name="responsables"
                      onChange={handleChangeCheckTarea}
                      isInvalid={errorTarea.responsables}
                    />
                  ))
                : null}
              {errorTarea.responsables && (
                <Form.Text className="text-danger">
                  Seleccione al menos un responsable.
                </Form.Text>
              )}
            </Form.Group>
          </Form>
        </ModalPersonalizado>
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <NavegadorLider />
        <Contenedor>
        <h3>
            {proyecto.nombre} - Editar Plan del Riesgo RK{plan.id_riesgo < 10 ? "0" : ""}
            {plan.id_riesgo}
          </h3>
          <>
            {modificado ? (
              <Alert variant="success">Operación realizada con éxito.</Alert>
            ) : (
              <Alert variant="danger">Ha ocurrido un error.</Alert>
            )}
            <hr />
            <h5>Opciones</h5>
            <BotonSalir
              ruta={`/inicio/proyecto/lider/${proyecto.id_proyecto}/monitoreo/planes`}
            />
          </>
        </Contenedor>
      </>
    );
  }
}
