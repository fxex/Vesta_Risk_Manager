import React, { useState } from "react";
import NavegadorLider from "../../../components/NavegadorLider";
import Footer from "../../../components/Footer";
import Contenedor from "../../../components/Contenedor";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Alert, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { verificarError } from "../../../utils/verificarErrores";
import { crearEvaluacion, obtenerRiesgoId } from "../../../services/riesgos";
import { obtenerIteracionActual } from "../../../services/proyectos";
import { useUsuario } from "../../../context/usuarioContext";
import BotonSalir from "../../../components/BotonSalir";
import { formatearFecha } from "../../../utils/fecha";

export const evaluacionCreacionLoader = async ({ params }) => {
  const id_riesgo_real = params.id_riesgo.split("-")[0];
  const riesgo = await obtenerRiesgoId(params.id_proyecto, id_riesgo_real);
  const iteracion = await obtenerIteracionActual(params.id_proyecto);
  return { riesgo, iteracion };
};

export default function CrearEvaluacionLider() {
  const { riesgo, iteracion } = useLoaderData();
  const navigate = useNavigate();

  const { id_proyecto, id_riesgo } = useParams();
  const [id_riesgo_real, id_riesgo_local] = id_riesgo.split("-");

  const { usuario } = useUsuario();

  const [formData, setFormData] = useState({
    impacto: 0,
    probabilidad: 0,
    descripcion: "",
  });

  const [error, setError] = useState({
    impacto: false,
    probabilidad: false,
    descripcion: false,
  });

  const [creado, setCreado] = useState(null);
  const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));

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

  const handleClick = async () => {
    const comprobacionError = {
      impacto: formData.impacto < 1 || formData.impacto === null,
      probabilidad: formData.probabilidad < 1 || formData.probabilidad === null,
      descripcion: formData.descripcion.length === 0,
    };

    setError(comprobacionError);

    const comprobacion = verificarError(comprobacionError);
    if (!comprobacion) {
      formData.id_iteracion = iteracion.id_iteracion;
      formData.responsable = usuario.id_usuario;
      const resultado = await crearEvaluacion(
        id_proyecto,
        id_riesgo_real,
        formData
      );
      setCreado(resultado);
    }
  };
  if (creado === null) {
    return (
      <>
        <NavegadorLider />
        <Contenedor>
          <>
            <h3>
              {proyecto.nombre} - Evaluar Riesgo {id_riesgo_local}
            </h3>
            {iteracion ? (
              <>
                <h4>
                  {iteracion.nombre}
                  {" - "}
                  {formatearFecha(iteracion.fecha_inicio)}
                  {" al "}
                  {formatearFecha(iteracion.fecha_fin)}
                </h4>
              </>
            ) : null}
          </>
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
              <Form.Control
                disabled
                value={`${iteracion.nombre} - ${formatearFecha(
                  iteracion.fecha_inicio
                )} al ${formatearFecha(iteracion.fecha_fin)}`}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Impacto</Form.Label>
              <Form.Select
                name="impacto"
                value={formData.impacto}
                onChange={handleChangeSelect}
                isInvalid={error.impacto}
              >
                <option value={0}>Ingrese el impacto del riesgo</option>
                <option value={1}>1 - Bajo</option>
                <option value={2}>2 - Bajo</option>
                <option value={3}>3 - Bajo</option>
                <option value={4}>4 - Moderado</option>
                <option value={5}>5 - Moderado</option>
                <option value={6}>6 - Moderado</option>
                <option value={7}>7 - Significante</option>
                <option value={8}>8 - Significante</option>
                <option value={9}>9 - Alto</option>
                <option value={10}>10 - Alto</option>
              </Form.Select>
              {error.impacto && (
                <Form.Text className="text-danger">
                  Seleccione el impacto del riesgo.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Probabilidad</Form.Label>
              <Form.Select
                name="probabilidad"
                value={formData.probabilidad}
                onChange={handleChangeSelect}
                isInvalid={error.probabilidad}
              >
                <option value={0}>
                  Ingrese la probabilidad de que el riesgo ocurra
                </option>
                <option value={1}>1 - 0 a 10%</option>
                <option value={2}>2 - 10% a 20%</option>
                <option value={3}>3 - 20% a 30%</option>
                <option value={4}>4 - 30% a 40%</option>
                <option value={5}>5 - 40% a 50%</option>
                <option value={6}>6 - 50% a 60%</option>
                <option value={7}>7 - 60% a 70%</option>
                <option value={8}>8 - 70% a 80%</option>
                <option value={9}>9 - 80% a 90%</option>
                <option value={10}>10 - 90% a 100%</option>
              </Form.Select>
              {error.probabilidad && (
                <Form.Text className="text-danger">
                  Seleccione la probabilidad del riesgo.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Justificación</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ingrese la justificación de la evaluacion realizada"
                name="descripcion"
                onChange={handleChangeControl}
                value={formData.descripcion}
                isInvalid={error.descripcion}
              />
              {error.descripcion && (
                <Form.Text className="text-danger">
                  Justifique la elección del impacto y la probabilidad del
                  riesgo.
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
            {proyecto.nombre} - Evaluar Riesgo {id_riesgo_local}
          </h3>
          <>
            {creado ? (
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
