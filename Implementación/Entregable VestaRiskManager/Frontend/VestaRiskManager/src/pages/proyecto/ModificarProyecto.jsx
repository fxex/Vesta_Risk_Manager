import React, { useState } from "react";
import Contenedor from "../../components/Contenedor";
import Footer from "./../../components/Footer";
import Navegador from "../../components/Navegador";
import { Alert, Button, Form, Modal, Table } from "react-bootstrap";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import BotonSalir from "../../components/BotonSalir";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMagnifyingGlass,
  faPlus,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./../../styles/modal.css";
import {
  actualizarProyecto,
  obtenerParticipanteNombre,
} from "../../services/proyectos";
import {
  comprobarFechasNuevaIteracion,
  formatearFecha,
} from "../../utils/fecha";

export default function ModificarProyecto() {
  const { proyecto } = useLoaderData();
  const { id_proyecto } = useParams();
  const navigate = useNavigate();

  const [mostrarParticipante, setMostrarParticipante] = useState(false);
  const [mostrarIteracion, setMostrarIteracion] = useState(false);
  const [errorPrincipal, setErrorPrincipal] = useState(false);
  const [errorParticipante, setErrorParticipante] = useState(false);
  const [errorIteracion, setErrorIteracion] = useState({
    validacion: false,
    mensaje: "",
  });
  const [botonPresionado, setBotonPresionado] = useState(false);

  const [formData, setFormData] = useState({
    nombre: proyecto.nombre,
    descripcion: proyecto.descripcion,
    estado: proyecto.estado,
    participantes: proyecto.participantes,
    iteraciones: proyecto.iteraciones,
    categorias: proyecto.categorias,
  });

  const [formDataParticipante, setFormDataParticipante] = useState({
    nombre: "",
    rol: "",
  });

  const [formDataIteracion, setFormDataIteracion] = useState({
    nombre: "",
    fecha_inicio: "",
    fecha_fin: "",
  });

  const [participantes, setParticipantes] = useState([]);

  const [modificado, setModificado] = useState(null);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setErrorPrincipal(false);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeParticipante = (e) => {
    setErrorParticipante(false);
    setFormDataParticipante({
      ...formDataParticipante,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeIteracion = (e) => {
    setErrorIteracion({
      validacion: false,
      mensaje: "",
    });
    setFormDataIteracion({
      ...formDataIteracion,
      [e.target.name]: e.target.value,
    });
  };

  const handleMostrarParticipante = () => {
    setMostrarParticipante(!mostrarParticipante);
    setFormDataParticipante({
      nombre: "",
      rol: "",
    });
    setParticipantes([]);
    setErrorParticipante(false);
  };

  const handleMostrarIteracion = () => {
    setErrorIteracion({
      validacion: false,
      mensaje: "",
    });
    setMostrarIteracion(!mostrarIteracion);
    setFormDataIteracion({
      nombre: "",
      fecha_inicio: "",
      fecha_fin: "",
    });
  };

  const comprobarNuevaIteracion = (fecha_inicio) => {
    if (formData.iteraciones.length > 0) {
      const ultimaIteracion =
        formData.iteraciones[formData.iteraciones.length - 1];
      let fechaNuevaIteracion = new Date(fecha_inicio);
      let fechaUltimaIteracion = new Date(ultimaIteracion.fecha_fin);
      const resultado = fechaNuevaIteracion - fechaUltimaIteracion;
      if (resultado > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  const handleClick = async () => {
    setBotonPresionado(true);
    if (
      formData.nombre.length === 0 ||
      formData.descripcion.length === 0 ||
      formData.estado.length === 0 ||
      formData.categorias.length === 0
    ) {
      setErrorPrincipal(true);
    } else {
      setErrorPrincipal(false);
      if (formData.iteraciones.length > 0) {
        const primeraIteracion = formData.iteraciones[0];
        const ultimaIteracion =
          formData.iteraciones[formData.iteraciones.length - 1];
        formData.fecha_inicio = primeraIteracion.fecha_inicio;
        formData.fecha_fin = ultimaIteracion.fecha_fin;
      }

      const resultado = await actualizarProyecto(id_proyecto, formData);
      setModificado(resultado);
    }
    setBotonPresionado(false);
  };

  const handleClickParticipante = () => {
    setBotonPresionado(true);
    if (
      formDataParticipante.nombre.length === 0 ||
      formDataParticipante.rol.length === 0
    ) {
      setErrorParticipante(true);
    } else {
      setErrorParticipante(false);
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          participantes: [...prevFormData.participantes, formDataParticipante],
        };
      });
      setFormDataParticipante({
        nombre: "",
        rol: "",
      });
      setParticipantes([]);
      handleMostrarParticipante();
    }
    setBotonPresionado(false);
  };

  const handleClickIteracion = () => {
    setBotonPresionado(true);
    if (
      formDataIteracion.nombre.length === 0 ||
      formDataIteracion.fecha_inicio.length === 0 ||
      formDataIteracion.fecha_fin.length === 0
    ) {
      setErrorIteracion({
        validacion: true,
        mensaje: "Revise los campos ingresados",
      });
    } else {
      if (
        !comprobarFechasNuevaIteracion(
          formDataIteracion.fecha_inicio,
          formDataIteracion.fecha_fin
        )
      ) {
        setErrorIteracion({
          validacion: true,
          mensaje:
            "La fecha de fin no puede estar antes que la fecha de inicio",
        });
      } else {
        if (!comprobarNuevaIteracion(formDataIteracion.fecha_fin)) {
          setErrorIteracion({
            validacion: true,
            mensaje: "La iteraciones no se pueden superponer",
          });
        } else {
          setErrorIteracion({ validacion: false, mensaje: "" });
          setFormData((prevFormData) => {
            return {
              ...prevFormData,
              iteraciones: [...prevFormData.iteraciones, formDataIteracion],
            };
          });
          setFormDataIteracion({
            nombre: "",
            fecha_inicio: "",
            fecha_fin: "",
          });
          handleMostrarIteracion();
        }
      }
    }
    setBotonPresionado(false);
  };

  if (modificado === null) {
    return (
      <>
        <Navegador />
        <Contenedor>
          <>
            <h3>Crear Proyecto</h3>
            <p>
              Complete los campos a continuaci&oacute;n. Luego, presione el
              bot&oacute;n <b>Confirmar</b>.<br />
              Si desea cancelar, presione el bot&oacute;n <b>Cancelar</b>.
            </p>
          </>
          <Form>
            <h4>Propiedades</h4>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese el nombre del proyecto"
                onChange={handleChange}
                name="nombre"
                value={formData.nombre}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese la descripcion del proyecto"
                name="descripcion"
                onChange={handleChange}
                value={formData.descripcion}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Check
                type="radio"
                label="Activo"
                value="Activo"
                name="estado"
                checked={formData.estado.toLowerCase() == "activo"}
                onChange={handleChange}
              />
              <Form.Check
                type="radio"
                label="Inactivo"
                value="Inactivo"
                name="estado"
                checked={formData.estado.toLowerCase() == "inactivo"}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                <b>Participante</b>
              </Form.Label>
              <br></br>
              <Button variant="success" onClick={handleMostrarParticipante}>
                <FontAwesomeIcon icon={faPlus} className="mx-1" />
                Agregar Participante
              </Button>
              <Table size="sm" hover className="mt-2">
                <thead className="table-info">
                  <tr>
                    <th>Participantes</th>
                    <th>Rol</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.participantes && formData.participantes.length > 0
                    ? formData.participantes.map((item, key) => (
                        <tr key={key}>
                          <td>{item.nombre}</td>
                          <td>{item.rol}</td>
                          <td>
                            <Button
                              variant="outline-danger"
                              className="mx-1"
                              onClick={() => {
                                setFormData((prevFormData) => {
                                  return {
                                    ...prevFormData,
                                    participantes:
                                      prevFormData.participantes.filter(
                                        (participante) =>
                                          participante.nombre !== item.nombre
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
            </Form.Group>

            <Form.Group>
              <Form.Label>
                <b>Iteraciones</b>
              </Form.Label>
              <br></br>
              <Button variant="success" onClick={handleMostrarIteracion}>
                <FontAwesomeIcon icon={faPlus} className="mx-1" />
                Agregar Iteracion
              </Button>
              <Table size="sm" hover className="mt-2">
                <thead className="table-info">
                  <tr>
                    <th>Nombre</th>
                    <th>Fecha de inicio</th>
                    <th>Fecha de finalización</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.iteraciones && formData.iteraciones.length > 0
                    ? formData.iteraciones.map((item, key) => (
                        <>
                          <tr key={key}>
                            <td>{item.nombre}</td>
                            <td>{formatearFecha(item.fecha_inicio)}</td>
                            <td>{formatearFecha(item.fecha_fin)}</td>
                            <td>
                              <Button
                                variant="outline-danger"
                                className="mx-1"
                                onClick={() => {
                                  setFormData((prevFormData) => {
                                    return {
                                      ...prevFormData,
                                      iteraciones:
                                        prevFormData.iteraciones.filter(
                                          (iteracion) =>
                                            iteracion.nombre !== item.nombre
                                        ),
                                    };
                                  });
                                }}
                              >
                                <FontAwesomeIcon icon={faTrashCan} />
                              </Button>
                            </td>
                          </tr>
                        </>
                      ))
                    : null}
                </tbody>
              </Table>
            </Form.Group>

            <Form.Group>
              <Form.Label>
                <b>Categorias</b>
              </Form.Label>
              <br></br>
              {/* <Button variant="success" onClick={() => {}}>
                <FontAwesomeIcon icon={faPlus} className="mx-1" />
                Agregar Categoria
              </Button> */}
              <Table size="sm" hover className="mt-2">
                <thead className="table-info">
                  <tr>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    {/* <th>Opciones</th> */}
                  </tr>
                </thead>
                <tbody>
                  {formData.categorias && formData.categorias.length > 0
                    ? formData.categorias.map((item, key) => (
                        <tr key={key}>
                          <td>{item.nombre}</td>
                          <td>{item.descripcion}</td>
                          {/* <td>
                            <Button
                              variant="outline-danger"
                              className="mx-1"
                              onClick={() => {
                                setFormData((prevFormData) => {
                                  return {
                                    ...prevFormData,
                                    categorias: prevFormData.categorias.filter(
                                      (categoria) =>
                                        categoria.nombre !== item.nombre
                                    ),
                                  };
                                });
                              }}
                            >
                              <FontAwesomeIcon icon={faTrashCan} />
                            </Button>
                          </td> */}
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
            </Form.Group>
            {errorPrincipal && (
              <Alert variant="danger">Revise los campos ingresados</Alert>
            )}
          </Form>
          <>
            <Button
              variant="outline-success"
              className="mx-1"
              onClick={handleClick}
              disabled={botonPresionado}
            >
              <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />
              Confirmar
            </Button>
            <Button
              variant="outline-danger"
              className="mx-1"
              onClick={() => {
                navigate("/inicio/proyectos");
              }}
            >
              <FontAwesomeIcon icon={faXmark} style={{ marginRight: "5px" }} />
              Cancelar
            </Button>
          </>
        </Contenedor>
        <Footer />

        <Modal
          show={mostrarParticipante}
          onHide={handleMostrarParticipante}
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Añadir Participante</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <h5>Buscar Participante</h5>
              <Form.Group className="d-flex align-items-center mb-2">
                <Form.Control
                  type="text"
                  placeholder="Ingrese el nombre del participante"
                  className="w-75"
                  name="nombre"
                  onChange={(e) => {
                    handleChangeParticipante(e);
                    setParticipantes([]);
                  }}
                />
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  style={{
                    marginLeft: "10px",
                    fontSize: "20px",
                    cursor: "pointer",
                  }}
                  onClick={async () => {
                    const data = await obtenerParticipanteNombre(
                      formDataParticipante.nombre
                    );
                    const json = JSON.parse(data);
                    // Crear un conjunto con los nombres en formData.participantes
                    const nombresFormData = new Set(
                      formData.participantes.map((item) => item.nombre)
                    );

                    const participantesFiltrados = json.filter(
                      (item) => !nombresFormData.has(item.nombre_usuario)
                    );

                    setParticipantes(participantesFiltrados);
                  }}
                />
              </Form.Group>
              <Form.Group>
                <h5>Participantes</h5>
                {participantes && participantes.length > 0 ? (
                  participantes.map((item, key) => (
                    <Form.Check
                      key={key}
                      label={item.nombre_usuario}
                      value={item.nombre_usuario}
                      name="nombre"
                      type="radio"
                      onChange={handleChangeParticipante}
                    />
                  ))
                ) : (
                  <p>No hay participantes disponibles.</p>
                )}
              </Form.Group>
              <Form.Group>
                <h5>Rol</h5>
                <Form.Check
                  type="radio"
                  name="rol"
                  label="Lider del proyecto"
                  value="Lider del proyecto"
                  onChange={handleChangeParticipante}
                />
                <Form.Check
                  type="radio"
                  name="rol"
                  label="Desarrollador"
                  value="Desarrollador"
                  onChange={handleChangeParticipante}
                />
              </Form.Group>
              {errorParticipante && (
                <Alert variant="danger" className="mt-4">
                  Revise los campos ingresados
                </Alert>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-success"
              onClick={handleClickParticipante}
              disabled={botonPresionado}
            >
              <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />
              Añadir
            </Button>
            <Button
              variant="outline-danger"
              onClick={handleMostrarParticipante}
            >
              <FontAwesomeIcon icon={faXmark} style={{ marginRight: "5px" }} />
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={mostrarIteracion}
          onHide={handleMostrarIteracion}
          size="xl"
        >
          <Modal.Header closeButton>
            <Modal.Title>Añadir Iteracion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>
                  <b>Nombre</b>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  placeholder="Ingrese el nombre de la iteración"
                  className="w-75"
                  value={formDataIteracion.nombre}
                  onChange={handleChangeIteracion}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <b>Fecha de inicio</b>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="fecha_inicio"
                  className="w-75"
                  value={formDataIteracion.fecha_inicio}
                  onChange={handleChangeIteracion}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  <b>Fecha de finalización</b>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="fecha_fin"
                  className="w-75"
                  value={formDataIteracion.fecha_fin}
                  onChange={handleChangeIteracion}
                />
              </Form.Group>
              {errorIteracion.validacion && (
                <Alert variant="danger" className="mt-4">
                  {errorIteracion.mensaje}
                </Alert>
              )}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-success"
              onClick={handleClickIteracion}
              disabled={botonPresionado}
            >
              <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />
              Añadir
            </Button>
            <Button variant="outline-danger" onClick={handleMostrarIteracion}>
              <FontAwesomeIcon icon={faXmark} style={{ marginRight: "5px" }} />
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Navegador />
        <Contenedor>
          <h3>Actualizar Proyecto</h3>
          <>
            {modificado ? (
              <Alert variant="success">Operación realizada con éxito.</Alert>
            ) : (
              <Alert variant="danger">Ha ocurrido un error.</Alert>
            )}
            <hr />
            <h5>Opciones</h5>
            <BotonSalir ruta={"/inicio/proyectos"} />
          </>
        </Contenedor>
      </>
    );
  }
}
