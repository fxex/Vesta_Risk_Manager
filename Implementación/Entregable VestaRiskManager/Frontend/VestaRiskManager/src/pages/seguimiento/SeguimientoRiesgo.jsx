import React, { useRef } from 'react'
import NavegadorLider from '../../components/NavegadorLider'
import Footer from '../../components/Footer'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useLoaderData } from 'react-router-dom'
import { informeSeguimiento } from "../informes/seguimiento"
import { filtrarYFormatear } from '../../utils/filtrarUsuario'
ChartJS.register(ArcElement, Tooltip, Legend);

export default function SeguimientoRiesgo() {
    const {riesgos, estado, prioridad, iteracion_actual} = useLoaderData()
    const proyecto = JSON.parse(localStorage.getItem("proyecto_seleccionado"));
    const ultima_iteracion = proyecto.iteraciones[proyecto.iteraciones.length-1]
    const resumen_estado = useRef(null)
    const resumen_prioridad = useRef(null)
    
    
    
  return (
    <>
        <NavegadorLider />
        <Container>
            <Row className='mt-2'>
                <Col xs={6}>
                    <Card>
                        <Card.Header>
                            Resumen de Estado
                        </Card.Header>
                        <Card.Body className='d-flex justify-content-center'>
                            <Pie 
                            ref={resumen_estado}
                            data={
                                {
                                    labels:["No se ha iniciado", "En curso", "Cerrado"],
                                    datasets:[
                                        {
                                            data:estado,
                                            backgroundColor: ['#B0BEC5', '#5C6BC0', '#26A69A'],
                                            borderWidth:1
                                        }
                                    ]
                                }
                            }
                            options={
                                {
                                    responsive: false,
                                }
                            } 
                            height={250} 
                            width={400}
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col xs={6}>
                    <Card>
                        <Card.Header>
                            Resumen de Prioridad
                        </Card.Header>
                        <Card.Body className='d-flex justify-content-center'>
                            <Pie 
                            ref={resumen_prioridad}
                            data={
                                {
                                    labels:["Desconocida", "Nula", "Media", "Alta", "Critica"],
                                    datasets:[
                                        {
                                            data:prioridad,
                                            backgroundColor: ['#90A4AE', '#81D4FA', '#FFEB3B','#FF7043','#E53935'],
                                            borderWidth:1
                                        }
                                    ]
                                }
                            }
                            options={
                                {
                                    responsive: false,
                                }
                            } 
                            height={250} 
                            width={400}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Button
            variant="success"
            onClick={() => {
                const grafico_estado = resumen_estado.current.toBase64Image();
                const grafico_prioridad = resumen_prioridad.current.toBase64Image();
                
                const datos ={
                    nombre_proyecto: proyecto.nombre,
                    iteracion_nombre: (iteracion_actual??ultima_iteracion).nombre,
                    lideres_proyecto: filtrarYFormatear(proyecto.participantes, "Lider del proyecto"),
                    desarrolladores_proyecto: filtrarYFormatear(proyecto.participantes, "Desarrollador"),
                    riesgos: riesgos,
                    estados: estado,
                    prioridades: prioridad,
                    grafico_estado,
                    grafico_prioridad
                }
                informeSeguimiento(datos);
            }}
            className='mt-3'
          >
            Generar Informe
          </Button>
            <Row className='mt-1'>
                <Table>
                    <thead className='cabecera'>
                        <tr>
                            <th className='th'style={{width: "8em"}}>ID</th>
                            <th className='th' style={{width: "8em"}}>Factor Riesgo</th>
                            <th className='th'>Descripción</th>
                            <th className='th'>Estado</th>
                            <th className='th'>Prioridad</th>
                        </tr>
                    </thead>
                    <tbody>
                        {riesgos.map((riesgo, index)=>(
                            <tr key={index}>
                                <td className='td'>{riesgo.id_riesgo}</td>
                                <td className='td'>{riesgo.factor_riesgo}</td>
                                <td className='td'>{riesgo.descripcion}</td>
                                <td className='td'>{riesgo.estado}</td>
                                <td className='td'>{riesgo.prioridad}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

            </Row>
        </Container>
        <Footer />
    </>
  )
}
