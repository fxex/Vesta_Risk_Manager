import React from 'react'
import NavegadorLider from '../../components/NavegadorLider'
import Footer from '../../components/Footer'
import { Card, Col, Container, Row } from 'react-bootstrap'
import { Pie } from 'react-chartjs-2'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

export default function SeguimientoRiesgo() {
  return (
    <>
        <NavegadorLider />
        <Container>
            <Row>
                <Col xs={6}>
                    <Card>
                        <Card.Header>
                            Resumen de Estado
                        </Card.Header>
                        <Card.Body className='d-flex justify-content-center'>
                            <Pie 
                            data={
                                {
                                    labels:["No se ha iniciado", "En curso", "Cerrado"],
                                    datasets:[
                                        {
                                            data:[1,5,3],
                                            backgroundColor: ['#aaa', '#F44336', '#009929'],
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
                            data={
                                {
                                    labels:["uno", "dos", "tres"],
                                    datasets:[
                                        {
                                            data:[10,20,30],
                                            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
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

            <Row>

            </Row>

            <Row>

            </Row>
        </Container>
        <Footer />
    </>
  )
}
