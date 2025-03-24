import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Card, Table, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faMagnifyingGlass,
  faPlus,
  faTrashCan,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Contenedor from "../../components/Contenedor";
import Footer from "../../components/Footer";
import Navegador from "../../components/Navegador";
import ModalPersonalizado from "../../components/ModalPersonalizado";
import { crearIncidencia } from "../../services/riesgos";
import { obtenerParticipanteNombre } from "../../services/proyectos";

export default function CrearIncidencia() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    descripcion: "",
    gravedad: "",
    responsable: null,
  });
  const [error, setError] = useState({
    descripcion: false,
    gravedad: false,
    responsable: false,
  });

  // Estados para el modal de selección de responsable
  const [mostrarResponsable, setMostrarResponsable] = useState(false);
  const [responsablesTotal, setResponsablesTotal] = useState([]);
  const [responsablesMostrado, setResponsablesMostrado] = useState([]);
  const [formDataResponsable, setFormDataResponsable] = useState({
    nombre: "",
    usuarioElegido: null,
  });
  const [errorResponsable, setErrorResponsable] = useState({
    nombre: false,
    usuarioElegido: false,
  });
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const ITEMSPORPAGINA = 5;

  // Severity options matching database enum
  const gravedadOpciones = [
    { valor: "Baja", clase: "success" },
    { valor: "Media", clase: "warning" },
    { valor: "Alta", clase: "danger" }
  ];

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError(prev => ({
      ...prev,
      [name]: false,
    }));
  };

  // Selección de gravedad
  const handleSeveritySelect = (gravedad) => {
    setFormData(prev => ({
      ...prev,
      gravedad: gravedad,
    }));
    setError(prev => ({
      ...prev,
      gravedad: false,
    }));
  };

  // Manejar cambios en la búsqueda de responsable
  const handleChangeResponsable = (e) => {
    const { name, value } = e.target;
    setFormDataResponsable(prev => ({
      ...prev,
      [name]: value,
    }));
    setErrorResponsable(prev => ({
      ...prev,
      [name]: false,
    }));
  };

  // Mostrar/ocultar modal de responsable
  const handleMostrarResponsable = () => {
    setMostrarResponsable(!mostrarResponsable);
    setFormDataResponsable({
      nombre: "",
      usuarioElegido: null,
    });
    setResponsablesTotal([]);
    setResponsablesMostrado([]);
    setErrorResponsable({
      nombre: false,
      usuarioElegido: false,
    });
  };

  // Cambiar página de responsables
  const handlePageChange = (nuevaPagina) => {
    if (nuevaPagina > 0 && nuevaPagina <= totalPaginas) {
      setPagina(nuevaPagina);
    }
  };

  // Efecto para actualizar responsables mostrados según la página
  useEffect(() => {
    if (responsablesTotal.length > 0) {
      setResponsablesMostrado(
        responsablesTotal.slice(
          (pagina - 1) * ITEMSPORPAGINA,
          ITEMSPORPAGINA * pagina
        )
      );
    }
  }, [pagina, responsablesTotal]);

  // Confirmar selección de responsable
  const handleClickResponsable = () => {
    const comprobarError = {
      nombre: formDataResponsable.nombre.length === 0,
      usuarioElegido: !formDataResponsable.usuarioElegido,
    };

    setErrorResponsable(comprobarError);

    const comprobacion = !comprobarError.nombre && !comprobarError.usuarioElegido;
    if (comprobacion) {
      setFormData(prev => ({
        ...prev,
        responsable: formDataResponsable.usuarioElegido,
      }));
      handleMostrarResponsable();
    }
  };

  const handleClick = async () => {
    // Validate form
    const comprobacionError = {
      descripcion: !formData.descripcion.trim(),
      gravedad: !formData.gravedad,
      responsable: !formData.responsable,
    };

    // Set errors
    setError(comprobacionError);

    // Check if there are any errors
    const hasErrors = Object.values(comprobacionError).some(error => error);

    if (hasErrors) {
      return;
    }

    try {
      // Implement your API call to create incident
      const resultado = await crearIncidencia({
        descripcion: formData.descripcion,
        gravedad: formData.gravedad,
        responsable: formData.responsable.id, // Assuming the responsable object has an id
      });

      if (resultado) {
        navigate("/inicio/categorias", {
          state: { mensaje: "Incidencia creada con éxito" },
        });
      }
    } catch (err) {
      // Handle error (you might want to add more robust error handling)
      console.error("Error creating incident:", err);
    }
  };

  return (
    <>
      <Navegador />
      <Contenedor>
        <>
          <h3>Crear Incidencia</h3>
          <p>
            Complete los campos a continuaci&oacute;n. Luego, presione el
            bot&oacute;n <b>Confirmar</b>.<br />
            Si desea cancelar, presione el bot&oacute;n <b>Cancelar</b>.
          </p>
        </>
        <Form>
          <h4>Propiedades</h4>
          
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la descripción de la incidencia"
              name="descripcion"
              onChange={handleChange}
              value={formData.descripcion}
              isInvalid={error.descripcion}
            />
            {error.descripcion && (
              <Form.Text className="text-danger">
                La descripción no puede estar vacía.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Gravedad</Form.Label>
            <Row>
              {gravedadOpciones.map((opcion) => (
                <Col key={opcion.valor} xs={4}>
                  <Card 
                    border={formData.gravedad === opcion.valor ? opcion.clase : 'secondary'}
                    className={`mb-3 ${formData.gravedad === opcion.valor ? `border-3` : ''}`}
                    onClick={() => handleSeveritySelect(opcion.valor)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Body className={`text-center text-${opcion.clase}`}>
                      <Card.Title>{opcion.valor}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            {error.gravedad && (
              <Form.Text className="text-danger">
                Debe seleccionar un nivel de gravedad.
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Responsable</Form.Label>
            <br />
            <Button variant="success" onClick={handleMostrarResponsable}>
              <FontAwesomeIcon icon={faPlus} className="mx-1" />
              Agregar Responsable
            </Button>
            {formData.responsable && (
              <Table size="sm" hover className="mt-2">
                <thead className="table-info">
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{formData.responsable.nombre_usuario}</td>
                    <td>{formData.responsable.email}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        className="mx-1"
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          responsable: null,
                        }))}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            )}
            {error.responsable && (
              <Form.Text className="text-danger">
                Debe seleccionar un responsable.
              </Form.Text>
            )}
          </Form.Group>

          <div>
            <Button
              variant="outline-success"
              className="mx-1"
              onClick={handleClick}
            >
              ✓ Confirmar
            </Button>
            <Button
              variant="outline-danger"
              className="mx-1"
              onClick={() => navigate("/inicio/proyecto/lider/${proyecto.id}/monitoreo/incidencia/crear")}
            >
              × Cancelar
            </Button>
          </div>
        </Form>
      </Contenedor>
      <Footer />

      <ModalPersonalizado
        title={"Añadir Responsable"}
        show={mostrarResponsable}
        setShow={setMostrarResponsable}
        onConfirm={handleClickResponsable}
        datosDefecto={() => {
          setResponsablesTotal([]);
          setResponsablesMostrado([]);
          setPagina(1);
          setTotalPaginas(0);
          setFormDataResponsable({
            nombre: "",
            usuarioElegido: null,
          });
          setErrorResponsable({
            nombre: false,
            usuarioElegido: false,
          });
        }}
      >
        <Form>
          <h5>Buscar Responsable</h5>
          <Form.Group className="d-flex align-items-center mb-2">
            <Form.Control
              type="text"
              placeholder="Ingrese el nombre del responsable"
              className="w-75"
              name="nombre"
              onChange={(e) => {
                handleChangeResponsable(e);
                setResponsablesTotal([]);
                setResponsablesMostrado([]);
              }}
              isInvalid={errorResponsable.nombre}
            />
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              color={errorResponsable.nombre ? "red" : "black"}
              style={{
                marginLeft: "10px",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={async () => {
                if (formDataResponsable.nombre.length === 0) {
                  setErrorResponsable(prev => ({
                    ...prev,
                    nombre: true,
                  }));
                } else {
                  try {
                    const data = await obtenerParticipanteNombre(
                      formDataResponsable.nombre
                    );
                    const json = JSON.parse(data);

                    setResponsablesTotal(json);
                    setResponsablesMostrado(
                      json.slice(pagina - 1, ITEMSPORPAGINA)
                    );
                    const cantidadPaginas = Math.ceil(
                      json.length / ITEMSPORPAGINA
                    );
                    setTotalPaginas(cantidadPaginas);
                    setPagina(1);
                  } catch (error) {
                    console.error("Error fetching responsables:", error);
                  }
                }
              }}
            />
          </Form.Group>
          {errorResponsable.nombre && (
            <Form.Text className="text-danger">
              Revise que el campo no está vacío.
            </Form.Text>
          )}
          <Form.Group>
            <h5>Responsables</h5>
            {responsablesMostrado && responsablesMostrado.length > 0 ? (
              responsablesMostrado.map((item, key) => (
                <Form.Check
                  key={key}
                  label={`${item.nombre_usuario} - ${item.email}`}
                  value={JSON.stringify(item)}
                  name="usuarioElegido"
                  type="radio"
                  checked={
                    formDataResponsable.usuarioElegido
                      ? formDataResponsable.usuarioElegido.email === item.email
                      : false
                  }
                  onChange={(e) => {
                    const selectedUser = JSON.parse(e.target.value);
                    setFormDataResponsable(prev => ({
                      ...prev,
                      usuarioElegido: selectedUser
                    }));
                    setErrorResponsable(prev => ({
                      ...prev,
                      usuarioElegido: false
                    }));
                  }}
                  isInvalid={errorResponsable.usuarioElegido}
                />
              ))
            ) : (
              <p>No hay responsables disponibles.</p>
            )}
            {errorResponsable.usuarioElegido && (
              <Form.Text className="text-danger">
                Seleccione un responsable.
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
        </Form>
      </ModalPersonalizado>
    </>
  );
}