import React, { useState } from "react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import NavegadorLider from "../../components/NavegadorLider";
import Footer from "../../components/Footer";
import Contenedor from "../../components/Contenedor";
import { Form, Button, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  crearRiesgo,
  modificarRiesgo,
  obtenerRiesgoId,
} from "../../services/riesgos";
import BotonSalir from "../../components/BotonSalir";
import { verificarError } from "../../utils/verificarErrores";
import { obtenerProyectosId } from "../../services/proyectos";

export async function cargarRiesgo({ params }) {
  const id_riesgo_real = params.id_riesgo.split("-")[0];
  const proyecto = await obtenerProyectosId(params.id_proyecto);
  const riesgo = await obtenerRiesgoId(params.id_proyecto, id_riesgo_real);
  return { proyecto, riesgo };
}

export default function EditarRiesgo() {
  const { proyecto, riesgo } = useLoaderData();

  const { id_proyecto, id_riesgo } = useParams();

  const [id_riesgo_real, id_riesgo_local] = id_riesgo.split("-");

  const navigate = useNavigate();
  const [modificado, setModificado] = useState(null);
  const [error, setError] = useState({
    descripcion: false,
    categoria: false,
    responsables: false,
  });

  const [formData, setFormData] = useState({
    descripcion: riesgo.descripcion,
    categoria: riesgo.id_categoria,
    responsables: riesgo.responsables ? riesgo.responsables : [],
  });

  const handleChangeControl = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: false });
  };

  const handleChangeSelect = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: false });
  };

  const handleChangeCheck = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prevFormData) => {
      const currentValues = prevFormData[name] || [];

      return {
        ...prevFormData,
        [name]: checked
          ? [...currentValues, value]
          : currentValues.filter((responsable) => responsable != value),
      };
    });
    setError({ ...error, [name]: false });
  };

  const handleClick = async () => {
    const comprobacionError = {
      descripcion: formData.descripcion.length === 0,
      categoria: formData.categoria <= 0,
      responsables: formData.responsables.length === 0,
    };
    setError(comprobacionError);

    const comprobacion = verificarError(comprobacionError);
    if (!comprobacion) {
      setError({ descripcion: false, categoria: false, responsables: false });
      const resultado = await modificarRiesgo(
        proyecto.id_proyecto,
        id_riesgo_real,
        formData
      );
      setModificado(resultado);
    }
  };

  if (modificado === null) {
    return (
      <>
        <NavegadorLider />
        <Contenedor>
          <>
            <h3>
              {proyecto.nombre} - Editar Riesgo{" "}
              {id_riesgo_local < 10 ? "0" : ""}
              {id_riesgo_local}
            </h3>
            <p>
              Complete los campos a continuaci&oacute;n. Luego, presione el
              bot&oacute;n <b>Confirmar</b>.<br />
              Si desea cancelar, presione el bot&oacute;n <b>Cancelar</b>.
            </p>
          </>
          <Form>
            <h4>Propiedades</h4>
            <Form.Group>
              <Form.Label className="mb-0">Descripción</Form.Label>
              <br />
              <Form.Text className="ms-2">
                <b>Sugerencia</b>:{" "}
                {
                  "Dada/s <una o más causas>, podría ocurrir <el riesgo>, lo que conduciría a <uno o más efectos>."
                }
              </Form.Text>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese la descripción del riesgo"
                onChange={handleChangeControl}
                value={formData.descripcion}
                name="descripcion"
                isInvalid={error.descripcion}
              />
              {error.descripcion && (
                <Form.Text className="text-danger">
                  Revise que la descripción no este vacía.
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Categoria</Form.Label>
              <Form.Select
                value={formData.categoria}
                onChange={handleChangeSelect}
                name="categoria"
                isInvalid={error.categoria}
              >
                <option value={0}>Elija una categoria</option>
                {proyecto.categorias.map((item, key) => (
                  <option
                    key={key}
                    value={item.id_categoria}
                    selected={formData.categoria === item.id_categoria}
                  >
                    {item.nombre}
                  </option>
                ))}
              </Form.Select>
              {error.categoria && (
                <Form.Text className="text-danger">
                  Seleccione una categoria valida.
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Responsables</Form.Label>
              {proyecto.participantes.map((item, key) => (
                <Form.Check
                  key={key}
                  type="checkbox"
                  label={item.nombre}
                  value={item.id_usuario}
                  name="responsables"
                  onChange={handleChangeCheck}
                  isInvalid={error.responsables}
                  checked={
                    formData.responsables && formData.responsables.length > 0
                      ? formData.responsables.some(
                          (responsable) => responsable == item.id_usuario
                        )
                      : null
                  }
                />
              ))}
              {error.responsables && (
                <Form.Text className="text-danger">
                  Seleccione al menos un responsable.
                </Form.Text>
              )}
            </Form.Group>
          </Form>
          <>
            <Button
              variant="outline-success"
              className="mx-1"
              onClick={handleClick}
            >
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
        <Footer />
      </>
    );
  } else {
    return (
      <>
        <NavegadorLider />
        <Contenedor>
          <h3>
            {proyecto.nombre} - Editar Riesgo{id_riesgo_local < 10 ? "0" : ""}
            {id_riesgo_local}
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
              ruta={`/inicio/proyecto/lider/${proyecto.id_proyecto}/riesgos`}
            />
          </>
        </Contenedor>
      </>
    );
  }
}
