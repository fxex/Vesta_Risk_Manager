import React, { useState, useEffect } from "react";
import Contenedor from "../../components/Contenedor";
import Footer from "./../../components/Footer";
import Navegador from "../../components/Navegador";
import { Alert, Button, Form, Pagination, Table } from "react-bootstrap";
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
import ModalPersonalizado from "../../components/ModalPersonalizado";
import { verificarError } from "../../utils/verificarErrores";

export default function ModificarProyecto() {
  const { proyecto } = useLoaderData();

  const { id_proyecto } = useParams();
  const navigate = useNavigate();

  //Estados relacionados a mostrar el modal.
  const [mostrarParticipante, setMostrarParticipante] = useState(false);
  const [mostrarIteracion, setMostrarIteracion] = useState(false);

  // Estados relacionados a los errores.
  const [errorPrincipal, setErrorPrincipal] = useState({
    nombre: false,
    descripcion: false,
    categorias: false,
    nombreIgual: false,
  });
  const [errorParticipante, setErrorParticipante] = useState({
    nombre: false,
    usuarioElegido: false,
    rol: false,
  });
  const [errorIteracion, setErrorIteracion] = useState({
    nombre: false,
    fecha_inicio: false,
    fecha_fin: false,
    fechasSuperpuestas: false,
    fechasFinAntes: false,
    nombreIgual: false,
  });

  // Estados relacionados al formulario
  const [formData, setFormData] = useState({
    nombre: proyecto.nombre,
    descripcion: proyecto.descripcion,
    estado: proyecto.estado,
    participantes: proyecto.participantes,
    iteraciones: proyecto.iteraciones,
    categorias: proyecto.categorias,
    iteraciones_eliminadas: [],
  });

  const [formDataParticipante, setFormDataParticipante] = useState({
    usuarioElegido: {},
    nombre: "",
    rol: "",
  });

  const [formDataIteracion, setFormDataIteracion] = useState({
    nombre: "",
    fecha_inicio: "",
    fecha_fin: "",
  });

  const [participantesTotal, setParticipantesTotal] = useState([]);
  const [participantesMostrado, setParticipantesMostrado] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState();
  const ITEMSPORPAGINA = 5; // Número de elementos por página

  const [modificado, setModificado] = useState(null);
  const [botonPresionado, setBotonPresionado] = useState(false);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setModificado(null);
    setErrorPrincipal({ ...errorPrincipal, [name]: false });
  };

  const handleChangeParticipante = (e) => {
    let { name, value } = e.target;
    value = name === "usuarioElegido" ? JSON.parse(value) : value;

    setFormDataParticipante({
      ...formDataParticipante,
      [name]: value,
    });
    setErrorParticipante({ ...errorParticipante, [name]: false });
  };

  const handleChangeIteracion = (e) => {
    const { name, value } = e.target;
    setErrorIteracion({
      ...errorIteracion,
      [name]: false,
      ["fechasSuperpuestas"]: false,
      ["fechasFinAntes"]: false,
    });
    setFormDataIteracion({
      ...formDataIteracion,
      [name]: value,
    });
  };

  const handleMostrarParticipante = () => {
    setMostrarParticipante(!mostrarParticipante);
    setFormDataParticipante({
      nombre: "",
      rol: "",
    });
    setParticipantesTotal([]);
    setParticipantesMostrado([]);
    setErrorParticipante({
      nombre: false,
      usuarioElegido: false,
      rol: false,
    });
  };

  const handleMostrarIteracion = () => {
    setErrorIteracion({
      nombre: false,
      fecha_inicio: false,
      fecha_fin: false,
      fechasSuperpuestas: false,
      fechasFinAntes: false,
      nombreIgual: false,
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
      return resultado > 0;
    } else {
      return true;
    }
  };

  const comprobarEstado = (iteracion_inicio, iteracion_fin) => {
    const fecha_actual = new Date();
    const fecha_iteracion_inicio = new Date(iteracion_inicio);
    const fecha_iteracion_fin = new Date(iteracion_fin);
    const resultado_inicio = fecha_actual - fecha_iteracion_inicio;
    const resultado_fin = fecha_actual - fecha_iteracion_fin;
    return resultado_inicio > 0 && resultado_fin < 0 ? "Activo" : "Inactivo";
  };

  const handleClick = async () => {
    setBotonPresionado(true);
    const comprobacionError = {
      nombre: formData.nombre.length === 0 || formData.nombre.length > 30,
      descripcion: formData.descripcion.length === 0,
      categorias: formData.categorias.length === 0,
      nombreIgual: false,
    };

    setErrorPrincipal(comprobacionError);
    const comprobacion = verificarError(comprobacionError);
    if (!comprobacion) {
      if (formData.iteraciones.length > 0) {
        const primeraIteracion = formData.iteraciones[0];
        const ultimaIteracion =
          formData.iteraciones[formData.iteraciones.length - 1];
        formData.fecha_inicio = primeraIteracion.fecha_inicio;
        formData.fecha_fin = ultimaIteracion.fecha_fin;
        const estado = comprobarEstado(
          primeraIteracion.fecha_inicio,
          ultimaIteracion.fecha_fin
        );
        formData.estado = estado;
      }

      const resultado = await actualizarProyecto(id_proyecto, formData);

      setModificado(resultado);
    }
    setBotonPresionado(false);
  };

  const handleClickParticipante = () => {
    setBotonPresionado(true);
    const comprobarError = {
      nombre: formDataParticipante.nombre.length === 0,
      usuarioElegido: formDataParticipante.usuarioElegido == null,
      rol: formDataParticipante.rol.length === 0,
    };

    setErrorParticipante(comprobarError);

    const comprobacion = verificarError(comprobarError);
    if (!comprobacion) {
      setErrorParticipante({
        nombre: false,
        usuarioElegido: false,
        rol: false,
      });
      formDataParticipante.usuarioElegido.rol = formDataParticipante.rol;
      setFormData((prevFormData) => {
        return {
          ...prevFormData,
          participantes: [
            ...prevFormData.participantes,
            formDataParticipante.usuarioElegido,
          ],
        };
      });
      setFormDataParticipante({
        nombre: "",
        rol: "",
      });
      setParticipantesTotal([]);
      setParticipantesMostrado([]);
      handleMostrarParticipante();
      setTotalPaginas(0);
      setPagina(1);
    }
    setBotonPresionado(false);
  };

  const handlePageChange = (nuevaPagina) => {
    if (nuevaPagina > 0 && nuevaPagina <= totalPaginas) {
      setPagina(nuevaPagina);
    }
  };

  const handleClickIteracion = () => {
    setBotonPresionado(true);

    const comprobacionError = {
      nombre:
        formDataIteracion.nombre.length === 0 ||
        formDataIteracion.nombre.length > 60,
      fecha_inicio: formDataIteracion.fecha_inicio.length === 0,
      fecha_fin: formDataIteracion.fecha_fin.length === 0,
      fechasSuperpuestas: !comprobarNuevaIteracion(
        formDataIteracion.fecha_inicio
      ),
      fechasFinAntes: !comprobarFechasNuevaIteracion(
        formDataIteracion.fecha_inicio,
        formDataIteracion.fecha_fin
      ),
      nombreIgual: formData.iteraciones.some(
        (item) => item.nombre === formDataIteracion.nombre
      ),
    };
    setErrorIteracion(comprobacionError);
    const comprobacion = verificarError(comprobacionError);
    if (!comprobacion) {
      setErrorIteracion({
        nombre: false,
        fecha_inicio: false,
        fecha_fin: false,
        fechasSuperpuestas: false,
        fechasFinAntes: false,
        nombreIgual: false,
      });
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

    setBotonPresionado(false);
  };

  useEffect(() => {
    if (!(participantesTotal.length === 0)) {
      setParticipantesMostrado(
        participantesTotal.slice(
          (pagina - 1) * ITEMSPORPAGINA,
          ITEMSPORPAGINA * pagina
        )
      );
    }
  }, [pagina]);

  return (
    <>
      <Navegador />
      {modificado ? (
        <Alert
          variant={modificado == true ? "success" : "danger"}
          className="text-center"
        >
          {modificado == true
            ? "Se modifico correctamente el proyecto"
            : "Ha ocurrido un error"}
        </Alert>
      ) : null}
      <Contenedor>
        <>
          <h3>Editar Proyecto - {proyecto.nombre}</h3>
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
              isInvalid={errorPrincipal.nombre || errorPrincipal.nombreIgual}
            />
            {(errorPrincipal.nombre || errorPrincipal.nombreIgual) && (
              <Form.Text className="text-danger">
                Revise que el nombre{" "}
                {formData.nombre.length === 0
                  ? "no este vacío"
                  : formData.nombre.length > 30
                  ? "no supere la cantidad maxima"
                  : errorPrincipal.nombreIgual
                  ? "no sea igual al de otro proyecto"
                  : null}
                .
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese la descripción del proyecto"
              name="descripcion"
              onChange={handleChange}
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
                        <td>
                          {item.nombre ? item.nombre : item.nombre_usuario}
                        </td>
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
              Agregar Iteración
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
                                if (item.id_iteracion) {
                                  setFormData((prevFormData) => {
                                    return {
                                      ...prevFormData,
                                      iteraciones_eliminadas: [
                                        ...prevFormData.iteraciones_eliminadas,
                                        item,
                                      ],
                                    };
                                  });
                                }
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
                              disabled={
                                item.id_iteracion
                                  ? new Date() > new Date(item.fecha_inicio)
                                  : false
                              }
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
              <b>Categorías</b>
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
                  <th>Descripción</th>
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

      <ModalPersonalizado
        title={"Añadir Participante"}
        show={mostrarParticipante}
        setShow={setMostrarParticipante}
        onConfirm={handleClickParticipante}
        datosDefecto={() => {
          setParticipantesTotal([]);
          setParticipantesMostrado([]);
          setPagina(1);
          setTotalPaginas(0);
          setFormDataParticipante({
            usuarioElegido: {},
            nombre: "",
            rol: "",
          });
          setErrorParticipante({
            nombre: false,
            usuarioElegido: false,
            rol: false,
          });
        }}
      >
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
                setParticipantesTotal([]);
                setParticipantesMostrado([]);
              }}
              isInvalid={errorParticipante.nombre}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              color={errorParticipante.nombre ? "red" : "black"}
              style={{
                marginLeft: "10px",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={async () => {
                if (formDataParticipante.nombre.length === 0) {
                  setErrorParticipante({
                    ...errorParticipante,
                    ["nombre"]: true,
                  });
                } else {
                  const data = await obtenerParticipanteNombre(
                    formDataParticipante.nombre
                  );
                  const json = JSON.parse(data);
                  // Crear un conjunto con los nombres en formData.participantes
                  const nombresFormData = new Set(
                    formData.participantes.map((item) => item.nombre_usuario)
                  );

                  const participantesFiltrados = json.filter(
                    (item) =>
                      !nombresFormData.has(
                        item.nombre_usuario ? item.nombre_usuario : item.nombre
                      )
                  );

                  setParticipantesTotal(participantesFiltrados);
                  setParticipantesMostrado(
                    participantesFiltrados.slice(pagina - 1, ITEMSPORPAGINA)
                  );
                  const cantidadPaginas = Math.ceil(
                    participantesFiltrados.length / ITEMSPORPAGINA
                  );
                  setTotalPaginas(cantidadPaginas);
                  setPagina(1);
                }
              }}
            />
          </Form.Group>
          {errorParticipante.nombre && (
            <Form.Text className="text-danger">
              Revise que el campo no esta vacío.
            </Form.Text>
          )}
          <Form.Group>
            <h5>Participantes</h5>
            {participantesMostrado && participantesMostrado.length > 0 ? (
              participantesMostrado.map((item, key) => (
                <Form.Check
                  key={key}
                  label={`${item.nombre_usuario} - ${item.email}`}
                  value={JSON.stringify(item)}
                  name="usuarioElegido"
                  type="radio"
                  checked={
                    formDataParticipante.usuarioElegido
                      ? formDataParticipante.usuarioElegido.email === item.email
                      : false
                  }
                  onChange={handleChangeParticipante}
                  isInvalid={errorParticipante.usuarioElegido}
                />
              ))
            ) : (
              <p>No hay participantes disponibles.</p>
            )}
            {errorParticipante.usuarioElegido && (
              <Form.Text className="text-danger">
                Seleccione un participante.
              </Form.Text>
            )}
            {totalPaginas > 1 && (
              <Pagination size="sm">
                <Pagination.Prev
                  onClick={() => handlePageChange(pagina - 1)}
                  disabled={pagina === 1}
                />
                {Array.from({ length: totalPaginas }, (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === pagina}
                    onClick={() => {
                      setPagina(index + 1);
                    }}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}

                <Pagination.Next
                  onClick={() => handlePageChange(pagina + 1)}
                  disabled={pagina === totalPaginas}
                />
              </Pagination>
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
              isInvalid={errorParticipante.rol}
            />
            <Form.Check
              type="radio"
              name="rol"
              label="Desarrollador"
              value="Desarrollador"
              onChange={handleChangeParticipante}
              isInvalid={errorParticipante.rol}
            />
            {errorParticipante.rol && (
              <Form.Text className="text-danger">Seleccione un rol.</Form.Text>
            )}
          </Form.Group>
        </Form>
      </ModalPersonalizado>

      <ModalPersonalizado
        title={"Añadir Iteración"}
        show={mostrarIteracion}
        setShow={setMostrarIteracion}
        onConfirm={handleClickIteracion}
        datosDefecto={() => {
          setFormDataIteracion({
            nombre: "",
            fecha_inicio: "",
            fecha_fin: "",
          });
        }}
      >
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
              isInvalid={errorIteracion.nombre || errorIteracion.nombreIgual}
            />
            {errorIteracion.nombre || errorIteracion.nombreIgual ? (
              <Form.Text className="text-danger">
                Revise que el nombre{" "}
                {formDataIteracion.nombre.length === 0
                  ? "no este vacío"
                  : formDataIteracion.nombre.length > 60
                  ? "no supere la cantidad maxima"
                  : "no sea igual al de otras iteraciones"}
                .
              </Form.Text>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <b>Fecha de inicio</b>
            </Form.Label>
            <Form.Control
              type="date"
              name="fecha_inicio"
              className="w-75"
              min={
                formData.iteraciones.length > 0
                  ? new Date(
                      new Date(
                        formData.iteraciones[
                          formData.iteraciones.length - 1
                        ].fecha_fin
                      ).setDate(
                        new Date(
                          formData.iteraciones[
                            formData.iteraciones.length - 1
                          ].fecha_fin
                        ).getDate() + 1
                      )
                    )
                      .toISOString()
                      .split("T")[0]
                  : null
              }
              value={formDataIteracion.fecha_inicio}
              onChange={handleChangeIteracion}
              isInvalid={
                errorIteracion.fecha_inicio || errorIteracion.fechasSuperpuestas
              }
            />
            {errorIteracion.fecha_inicio ||
            errorIteracion.fechasSuperpuestas ? (
              <Form.Text className="text-danger">
                {errorIteracion.fecha_inicio
                  ? "Revise que la fecha de inicio de la iteración no este vacía"
                  : errorIteracion.fechasSuperpuestas
                  ? "La iteración no debe superponerse con las demás iteraciones"
                  : ""}
                .
              </Form.Text>
            ) : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>
              <b>Fecha de finalización</b>
            </Form.Label>
            <Form.Control
              type="date"
              name="fecha_fin"
              min={
                formData.iteraciones.length > 0
                  ? new Date(
                      new Date(
                        formData.iteraciones[
                          formData.iteraciones.length - 1
                        ].fecha_fin
                      ).setDate(
                        new Date(
                          formData.iteraciones[
                            formData.iteraciones.length - 1
                          ].fecha_fin
                        ).getDate() + 1
                      )
                    )
                      .toISOString()
                      .split("T")[0]
                  : null
              }
              className="w-75"
              value={formDataIteracion.fecha_fin}
              onChange={handleChangeIteracion}
              isInvalid={
                errorIteracion.fecha_fin || errorIteracion.fechasFinAntes
              }
            />
            {errorIteracion.fecha_fin || errorIteracion.fechasFinAntes ? (
              <Form.Text className="text-danger">
                {errorIteracion.fecha_fin
                  ? "Revise que la fecha de finalización de la iteración no este vacía"
                  : errorIteracion.fechasFinAntes
                  ? "La fecha de finalización no puede estar antes que la fecha de inicio"
                  : ""}
                .
              </Form.Text>
            ) : null}
          </Form.Group>
        </Form>
      </ModalPersonalizado>
    </>
  );
}
