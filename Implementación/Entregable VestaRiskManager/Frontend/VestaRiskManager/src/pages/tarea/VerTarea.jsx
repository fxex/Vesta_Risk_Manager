import React from 'react'
import NavegadorLider from '../../components/NavegadorLider'
import Footer from '../../components/Footer'
import Contenedor from '../../components/Contenedor'
import { useLoaderData, useLocation } from 'react-router-dom';
import BotonSalir from '../../components/BotonSalir';
import { formatearFecha } from '../../utils/funciones';

export default function VerTarea() {
    const location = useLocation();
    const { tarea } = useLoaderData();
    
    const ruta = location.state?.ruta;
  return (
    <>
    <NavegadorLider/>
    <Contenedor>
        <>
            <h2>Ver Tarea - Plan de {""}</h2>
            <h3>Iteracion</h3>
        </>
        <>
        <h3>Nombre de la tarea</h3>
        <p>{tarea.nombre}</p>
        <hr />
        <h3>Descripción de la tarea</h3>
        <p>{tarea.descripcion}</p>
        <hr />
        <h3>Fecha de inicio</h3>
        <p>{formatearFecha(tarea.fecha_inicio)}</p>
        <hr />
        <h3>Fecha de fin</h3>
        <p>{formatearFecha(tarea.estado == 0 ? tarea.fecha_fin : tarea.fecha_fin_real)}</p>
        <hr />
        <h3>Estado</h3>
        <p>{tarea.estado == 0 ? "Pendiente" : "Completado"}</p>
        <hr />
        <h3>Responsable</h3>
        <p>{tarea.responsables}</p>
        <hr />
        <h3>Opciones</h3>
        <BotonSalir ruta={ruta}/>
        </>
    </Contenedor>
    <Footer />
    </>
  )
}
