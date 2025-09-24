/* eslint-disable react/display-name */
import React, { forwardRef, useState } from "react";
import ModalPersonalizado from "../../components/ModalPersonalizado";
import { Button, Form, Modal } from "react-bootstrap";
import {
  comprobarFechasNuevaIteracion,
  verificarError,
} from "../../utils/funciones";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const ModificarIteracion = forwardRef(
  ({ navigate, iteraciones, iteracionSeleccionada, id_proyecto }, ref) => {
    const [formDataIteracion, setFormDataIteracion] = useState(
      iteracionSeleccionada
    );
    const [botonPresionado, setBotonPresionado] = useState(false)
    const [modificarIteracion, setModificarIteracion] = useState(false);
    const [errorIteracion, setErrorIteracion] = useState({
      nombre: false,
      fecha_inicio: false,
      fecha_fin: false,
      fechasSuperpuestas: false,
      fechasFinAntes: false,
    });
    const [seguro, setSeguro] = useState(false);

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

    const handleModificarIteracion = () => {
      setErrorIteracion({
        nombre: false,
        fecha_inicio: false,
        fecha_fin: false,
        fechasSuperpuestas: false,
        fechasFinAntes: false,
        nombreIgual: false,
      });
      setModificarIteracion(!modificarIteracion);
    };

    const handleSeguro = () => {
      setSeguro(!seguro);
    };

    const comprobarIteracionAnterior = (fecha_inicio, identificador) => {
      const iteracionAnterior = iteraciones[identificador - 1];
      if (iteracionAnterior !== undefined) {
        const fechaFinAnterior = new Date(iteracionAnterior.fecha_fin);

        if (fecha_inicio <= fechaFinAnterior) {
          return false;
        }
      }
      return true;
    };

    const comprobarIteracionSiguiente = (fecha_fin, identificador) => {
      const iteracionSiguiente = iteraciones[identificador + 1];
      if (iteracionSiguiente !== undefined) {
        const fechaInicioSiguiente = new Date(iteracionSiguiente.fecha_inicio);

        if (fecha_fin >= fechaInicioSiguiente) {
          return false;
        }
      }
      return true;
    };

    const comprobarModificacionIteracion = (
      fecha_inicio,
      fecha_fin,
      identificador
    ) => {
      if (iteraciones.length <= 1) {
        return true;
      }
      const fechaInicioModificada = new Date(fecha_inicio);
      const fechaFinModificada = new Date(fecha_fin);

      const anterior = comprobarIteracionAnterior(
        fechaInicioModificada,
        identificador
      );

      const siguiente = comprobarIteracionSiguiente(
        fechaFinModificada,
        identificador
      );

      return anterior && siguiente;
    };

    const handleClickModificarIteracion = () => {
      setBotonPresionado(true);

      const comprobacionError = {
        nombre:
          formDataIteracion.nombre.length === 0 ||
          formDataIteracion.nombre.length > 60,
        fecha_inicio: formDataIteracion.fecha_inicio.length === 0,
        fecha_fin: formDataIteracion.fecha_fin.length === 0,
        fechasFinAntes: !comprobarFechasNuevaIteracion(
          formDataIteracion.fecha_inicio,
          formDataIteracion.fecha_fin
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
        });

        let iteracionesSuperpuestas = true;
        iteracionesSuperpuestas = comprobarModificacionIteracion(
          formDataIteracion.fecha_inicio,
          formDataIteracion.fecha_fin,
          formDataIteracion.key
        );

        if (iteracionesSuperpuestas) {
          setFormDataIteracion({
            nombre: "",
            fecha_inicio: "",
            fecha_fin: "",
          });
          handleModificarIteracion();
        } else {
          handleModificarIteracion();
          handleSeguro();
        }
      }
      setBotonPresionado(false);
    };

    const confirmarSeguro = () => {
      const nuevasIteraciones = [...iteraciones];

      const { key, ...resto } = formDataIteracion;
      // Modificar la iteración seleccionada
      nuevasIteraciones[key] = resto;

      const comprobacionAnterior = comprobarIteracionAnterior(
        new Date(resto.fecha_inicio),
        key
      );

      const comprobacionSiguiente = comprobarIteracionSiguiente(
        new Date(resto.fecha_fin),
        key
      );

      if (!comprobacionAnterior) {
        // Recalcular las fechas de las iteraciones anteriores
        for (let i = key - 1; i >= 0; i--) {
          const iteracionSiguiente = nuevasIteraciones[i + 1];
          const iteracionActual = nuevasIteraciones[i];

          // Calcular la nueva fecha de fin (fecha de inicio de la siguiente iteración - 1 día)
          const nuevaFechaFin = new Date(iteracionSiguiente.fecha_inicio);
          nuevaFechaFin.setDate(nuevaFechaFin.getDate() - 1);

          // Calcular la nueva fecha de inicio (mantener la misma duración)
          const duracion =
            new Date(iteracionActual.fecha_fin) -
            new Date(iteracionActual.fecha_inicio);
          const nuevaFechaInicio = new Date(nuevaFechaFin);
          nuevaFechaInicio.setDate(
            nuevaFechaInicio.getDate() - duracion / (1000 * 60 * 60 * 24)
          );

          // Actualizar la iteración actual
          nuevasIteraciones[i] = {
            ...iteracionActual,
            fecha_inicio: nuevaFechaInicio.toISOString().split("T")[0],
            fecha_fin: nuevaFechaFin.toISOString().split("T")[0],
          };
        }
      }

      if (!comprobacionSiguiente) {
        // Recalcular las fechas de las iteraciones siguientes
        for (let i = key + 1; i < nuevasIteraciones.length; i++) {
          const iteracionAnterior = nuevasIteraciones[i - 1];
          const iteracionActual = nuevasIteraciones[i];

          const nuevaFechaInicio = new Date(iteracionAnterior.fecha_fin);
          nuevaFechaInicio.setDate(nuevaFechaInicio.getDate() + 1);

          const duracion =
            new Date(iteracionActual.fecha_fin) -
            new Date(iteracionActual.fecha_inicio);
          const nuevaFechaFin = new Date(nuevaFechaInicio);
          nuevaFechaFin.setDate(
            nuevaFechaFin.getDate() + duracion / (1000 * 60 * 60 * 24)
          );

          nuevasIteraciones[i] = {
            ...iteracionActual,
            fecha_inicio: nuevaFechaInicio.toISOString().split("T")[0],
            fecha_fin: nuevaFechaFin.toISOString().split("T")[0],
          };
        }
      }

      handleSeguro();
    };

    return (
      <ModalPersonalizado
        title={"Modificar Iteración"}
        show={modificarIteracion}
        setShow={setModificarIteracion}
        onConfirm={handleClickModificarIteracion}
        datosDefecto={() => {
          setFormDataIteracion({
            nombre: "",
            fecha_inicio: "",
            fecha_fin: "",
          });
        }}
        modificado={true}
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
        <Modal show={seguro} onHide={handleSeguro}>
          <Modal.Body>
            <>
              <h1>¿Está seguro?</h1>
              <p>
                Se ha detectado un solapamiento en las fechas de las
                iteraciones, lo que implicará que las iteraciones anteriores y
                posteriores sean modificadas.
              </p>
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-success"
              onClick={() => {
                setBotonPresionado(true);
                confirmarSeguro();
                setBotonPresionado(false);
              }}
              disabled={botonPresionado}
            >
              <FontAwesomeIcon icon={faCheck} style={{ marginRight: "5px" }} />
              Si
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => {
                handleSeguro();
                handleModificarIteracion();
              }}
            >
              <FontAwesomeIcon icon={faXmark} style={{ marginRight: "5px" }} />
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </ModalPersonalizado>
    );
  }
);
