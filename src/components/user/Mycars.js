import React, { useState } from 'react'
import { Card, Container, Col, Row, Modal, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { MdAirlineSeatReclineNormal, MdShoppingBag } from "react-icons/md";
import { GiCarDoor } from 'react-icons/gi'
import { delcar } from '../../action/user';


function Mycars() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const [moddata, setmodtata] = useState()
  const dispatch = useDispatch()
  const data = useSelector(state => state.mycar?.mycars)
  return (
    <Container>
      <h2 style={{ fontSize: '40px', margin: '10px 0', color: 'grey', borderBottom: '2px dotted grey' }}>MY TESTIMONIAL</h2>
      <Row>
        {
          data?.map((val, index) => {
            return <Col sm={12} md={4} xl={3}>
              <Card className='mt-3 shadow' >
                <Card.Img variant="top" src={val?.img[0]?.url} style={{ height: 180, objectFit: 'cover' }} />
                <Card.Body>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <div style={{ flex: 1, padding: '4px' }}>
                      <p style={{ margin: 0 }}>{val?.name}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 0 }} >
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
                          <MdAirlineSeatReclineNormal fontSize={20} />
                          <p style={{ fontSize: 12, margin: 0, fontWeight: 'bold' }}>{val?.seats}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
                          <MdShoppingBag fontSize={20} />
                          <p style={{ fontSize: 12, margin: 0, fontWeight: 'bold' }}>{val?.bags}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
                          <GiCarDoor fontSize={20} />
                          <p style={{ fontSize: 12, margin: 0, fontWeight: 'bold' }}>{val?.doors}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column' }}>
                          <p style={{ fontSize: 18, margin: 0, fontWeight: 'bold', color: 'orangered' }}>{val?.fueltype?.slice(0, 1)}</p>
                          <p style={{ fontSize: 12, margin: 0, fontWeight: 'bold' }}>{val?.fueltype}</p>
                        </div>
                      </div>
                      <p style={{ margin: 0 }}>{val?.price}/- Per Hour</p>
                    </div>
                    {/* <NavLink to={`/detail/${cars?._id}`}> */}
                    <div style={{ display: 'block' }}>
                      {/* <button style={{ backgroundColor: 'transparent', color: 'orangered', outline: 'none', border: '1px solid orangered', padding: '5px 10px', fontSize: 13, fontWeight: 'bold', marginLeft: '10px' }} onClick={()=>{
                        setShow(true)
                        setmodtata(val)
                      }} >Edit</button> */}
                      <button style={{ backgroundColor: 'transparent', color: 'orangered', outline: 'none', border: '1px solid orangered', padding: '5px 10px', fontSize: 13, fontWeight: 'bold' }} onClick={() => dispatch(delcar(val?._id))} >Delete</button>
                    </div>

                    {/* </NavLink> */}

                  </div>


                </Card.Body>
              </Card>

            </Col>
          })
        }
      </Row>
      <>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input value={moddata?.name} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </Container>
  )
}

export default Mycars