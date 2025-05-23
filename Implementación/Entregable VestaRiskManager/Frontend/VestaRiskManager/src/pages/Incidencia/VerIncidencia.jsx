import React from 'react'
import NavegadorLider from '../../components/NavegadorLider'
import Footer from '../../components/Footer'
import Contenedor from '../../components/Contenedor'
import { useLoaderData, useLocation } from 'react-router-dom';
import BotonSalir from '../../components/BotonSalir';
import { formatearFecha, formatearFechaHora } from '../../utils/funciones';

export default function VerIncidencia() {
    const location = useLocation();
    const { incidencia, iteracion } = useLoaderData();
    
    const ruta = location.state?.ruta;
    const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));

  return (
    <>
    <NavegadorLider/>
    <Contenedor>
        <>
            <h3>{proyecto.nombre} - Incidencia del Riesgo {incidencia.id_riesgo < 9 ? "RK0" + incidencia.id_riesgo : "RK" + incidencia.id_riesgo}</h3>
            <h4>{iteracion.nombre} - {formatearFecha(iteracion.fecha_inicio)} al {formatearFecha(iteracion.fecha_fin)}</h4>
        </>
        <>
        <h4>Descripción de la incidencia</h4>
        <p>{incidencia.descripcion}</p>
        <hr />
        <h4>Gravedad</h4>
        <p>{incidencia.gravedad}</p>
        <hr />
        <h4>Fecha de ocurrencia</h4>
        <p>{formatearFechaHora(new Date(incidencia.fecha_ocurrencia))}</p>
        <hr />
        <h4>Responsable</h4>
        <p>{incidencia.responsable_nombre}</p>
        <hr />
        <h4>Opciones</h4>
        <BotonSalir ruta={ruta}/>
        </>
    </Contenedor>
    <Footer />
    </>
  )
}
