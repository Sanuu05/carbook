import React from 'react'
import {  Col, Card } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
function Homecard({cars,fil,hdata}) {
   
   
    return (
        <Col sm={12} md={4} xl={3}>
            <Card className='mt-3' >
                <Card.Img variant="top" src={cars?.val?.img[0]?.url} style={{ height: 180, objectFit: 'cover' }} />
                <Card.Body>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                        <div style={{ flex: 1 }}>
                            <p style={{ margin: 0 }}>{cars?.val?.name}</p>
                            <p style={{ margin: 0 }}>{cars?.val?.price}/- Per Hour</p>
                        </div>
                        <NavLink to={`/detail/${JSON.stringify({id:cars?.val?._id,...hdata})}`}>
                            <button style={{ backgroundColor: 'transparent', color: 'orangered', outline: 'none', border: '1px solid orangered', padding: '5px 10px', fontSize: 13, fontWeight: 'bold' }} >Book Now</button>
                        </NavLink>

                    </div>


                </Card.Body>
            </Card>

        </Col>
    )
}

export default Homecard