import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Col, Container, Row} from 'react-bootstrap'
import { MdAirlineSeatReclineNormal, MdShoppingBag } from "react-icons/md";
import { GiCarDoor } from 'react-icons/gi'
import { carorder } from '../action/user'
function Carorder() {
    const dispatch = useDispatch()
    const data = useSelector(p=>p.mybook.book)
    console.log('mybook',data)
    const time = new Date().toLocaleString()
    const filup = data?.filter(p=>p.from>=time)
    const filpast = data?.filter(p=>p.from<=time)
    useEffect(()=>{
        dispatch(carorder())
    },[])
  return (
    <Container className='mybook'>
        <h2 style={{ fontSize: '40px', margin: '10px 0', color: 'grey', borderBottom: '2px dotted grey' }}>CAR DELIVERY ORDER</h2>
       <h2 style={{ fontSize: '20px', margin: '10px 0', color: 'green', borderBottom: '2px dotted green' }}>Upcoming</h2>
      <Row>
        {
          filup?.map((val,ind)=>{
            return <Col sm={12} className="my-2 px-md-5" >
            <div className='shadow' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{width:'30%',display:'flex',justifyContent:'center',alignItems:'center'}} >
                <img src={val?.carid?.img[0].url} className="img-fluid" style={{height:'200px',width:'200px',objectFit:'contain'}} />
  
              </div>
              <div style={{width:'40%',display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}} className="cen" >
                <p style={{fontSize:15,color:'grey'}}>Order Id: {val?._id}</p>
                <h4 style={{ fontSize: 35 }}>{val?.carid?.name}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 0 }} >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            <MdAirlineSeatReclineNormal fontSize={25} />
                            <p style={{ fontSize: 15, margin: 0, fontWeight: 'bold' }}>{val?.carid?.seats}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            <MdShoppingBag fontSize={25} />
                            <p style={{ fontSize: 15, margin: 0, fontWeight: 'bold' }}>{val?.carid?.bags}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            <GiCarDoor fontSize={25} />
                            <p style={{ fontSize: 15, margin: 0, fontWeight: 'bold' }}>{val?.carid?.doors}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            <GiCarDoor fontSize={25} />
                            <p style={{ fontSize: 15, margin: 0, fontWeight: 'bold' }}>{val?.carid?.doors}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            <p style={{ fontSize: 25, margin: 0, fontWeight: 'bold', color: 'orangered' }}>{val?.carid?.fueltype?.slice(0, 1)}</p>
                            <p style={{ fontSize: 15, margin: 0, fontWeight: 'bold' }}>{val?.carid?.fueltype}</p>
                        </div>
                    </div>
              </div>
              <div style={{width:'30%'}} className="mid" >
                <p style={{fontSize:15,color:'grey'}}>Order Details</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:'0 5px' }}>
                  <p>Ordered By</p>
                  <p>{val?.by?.name}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:'0 5px' }}>
                  <p>Email</p>
                  <p>{val?.by?.email}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:'0 5px' }}>
                  <p>From</p>
                  <p>{val?.from}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:'0 5px' }}>
                  <p>To</p>
                  <p>{val?.to}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:'0 5px' }}>
                  <p>Total Hours</p>
                  <p>{val?.hours}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:'0 5px',color:'orangered' }}>
                  <p>Total Amount</p>
                  <p>₹ {val?.amount} (₹{val?.carid?.price}/- per hour )</p>
                </div>
              </div>
  
            </div>
          </Col>
          })
        }
        
      </Row>
      <h2 style={{ fontSize: '20px', margin: '10px 0', color: 'grey', borderBottom: '2px dotted green' }}>Past Booking Order</h2>
      <Row>
        {
          filpast?.map((val,ind)=>{
            return <Col sm={12} className="my-2 px-md-5" >
            <div className='shadow' style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{width:'30%',display:'flex',justifyContent:'center',alignItems:'center'}} >
                <img src={val?.carid?.img[0].url} className="img-fluid" style={{height:'200px',width:'200px',objectFit:'contain'}} />
  
              </div>
              <div style={{width:'40%',display:'flex',flexDirection:'column',justifyContent:'flex-start',alignItems:'flex-start'}} className="cen" >
                <p style={{fontSize:15,color:'grey'}}>Order Id: {val?._id}</p>
                <h4 style={{ fontSize: 35 }}>{val?.carid?.name}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 0 }} >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            <MdAirlineSeatReclineNormal fontSize={25} />
                            <p style={{ fontSize: 15, margin: 0, fontWeight: 'bold' }}>{val?.carid?.seats}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            <MdShoppingBag fontSize={25} />
                            <p style={{ fontSize: 15, margin: 0, fontWeight: 'bold' }}>{val?.carid?.bags}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            <GiCarDoor fontSize={25} />
                            <p style={{ fontSize: 15, margin: 0, fontWeight: 'bold' }}>{val?.carid?.doors}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            <GiCarDoor fontSize={25} />
                            <p style={{ fontSize: 15, margin: 0, fontWeight: 'bold' }}>{val?.carid?.doors}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            <p style={{ fontSize: 25, margin: 0, fontWeight: 'bold', color: 'orangered' }}>{val?.carid?.fueltype?.slice(0, 1)}</p>
                            <p style={{ fontSize: 15, margin: 0, fontWeight: 'bold' }}>{val?.carid?.fueltype}</p>
                        </div>
                    </div>
              </div>
              <div style={{width:'30%'}} className="mid" >
                <p style={{fontSize:15,color:'grey'}}>Order Details</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:'0 5px' }}>
                  <p>Ordered By</p>
                  <p>{val?.by?.name}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:'0 5px' }}>
                  <p>Email</p>
                  <p>{val?.by?.email}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:'0 5px' }}>
                  <p>From</p>
                  <p>{val?.from}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:'0 5px' }}>
                  <p>To</p>
                  <p>{val?.to}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:'0 5px' }}>
                  <p>Total Hours</p>
                  <p>{val?.hours}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:'0 5px',color:'orangered' }}>
                  <p>Total Amount</p>
                  <p>₹ {val?.amount} (₹{val?.carid?.price}/- per hour )</p>
                </div>
              </div>
  
            </div>
          </Col>
          })
        }
        
      </Row>

    </Container>
  )
}

export default Carorder