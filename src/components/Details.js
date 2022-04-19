import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Card, Button, Carousel, Spinner } from 'react-bootstrap'
import { MdAirlineSeatReclineNormal, MdShoppingBag } from "react-icons/md";
import { GiCarDoor } from 'react-icons/gi'
import { DatePicker, message } from 'antd';
import { NavLink, useParams } from 'react-router-dom'
import moment from 'moment'
import 'antd/dist/antd.css';
import { async } from '@firebase/util';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {allorders, order} from '../action/user'
import {IoLocation} from 'react-icons/io5'
const { RangePicker } = DatePicker
function Details() {
    const [fromtime, setfromtime] = useState()
    const [totime, settotime] = useState()
    const [totaltime, settotaltime] = useState()
    const [data, setdata] = useState()
    const { id } = useParams()
    const dispatch = useDispatch()
    const[load,setload] = useState(false)
    const selecttime = (value) => {
        setfromtime(moment(value[0]).format('MMM DD yyyy HH:mm'))
        settotime(moment(value[1]).format('MMM DD yyyy HH:mm'))
        const filter =data?.order?.filter(p=>(p.from >=(moment(value[0]).format('MMM DD yyyy HH:mm'))) && p.to<=(moment(value[1]).format('MMM DD yyyy HH:mm')))
        if(filter?.length===0){
            settotaltime(value[1].diff(value[0], 'Hours'))
        }
        else{
            toast.error('Car not availbe for the selected date')
        }
        
        


    }

    console.log({fromtime,settotime})
    const port = "https://carbb.herokuapp.com"
    useEffect(() => {
        if (id) {
            detail(id)
        }
        dispatch(allorders())
        

    }, [id])
   const allord = useSelector(state=>state.allorders.allorders)
   console.log('sss',allord)
    const detail = async (ids) => {
        try {
            const { data } = await axios.get(`${port}/main/detail/${ids}`)
            console.log('ddd', data?.order)
            setdata(data)
        } catch (error) {

        }


    }

    const orders = () => {
        setload(true)
        console.log({carid:data?._id,from:fromtime,to:totime,hours:totaltime,total:data?.price * totaltime})
        dispatch(order({carid:data?.data?._id,from:fromtime,to:totime,hours:totaltime,amount:data?.data?.price * totaltime}))
        
    }
    const dates = [ 'Apr 11 2022 17:03','Apr 12 2022 17:03','Apr 13 2022 17:03','Apr 14 2022 17:03','Apr 15 2022 17:03','Apr 16 2022 17:03','Apr 09 2022 17:03']

    const filtedate = dates?.filter(p=>p >='Apr 05 2022 17:03' && p<='Apr 14 2022 17:03')
    const succlog = useSelector((state) => state.user.user)
//   console.log('user',succ)
    console.log('fll',filtedate?.sort())
    const postres = useSelector(p=>p.post.ordersuc)
    useEffect(()=>{
        if(postres){
            toast.success("Order Placed Sucessfully")
            setload(false)
            settotaltime('')
        }

    },[postres])

    return (
        <Container>
            <Row style={{ marginTop: 100 }}>
                <Col sm={12} md={6} xl={6} >

                    {/* {
                        data?.img?.map((val, index) => {
                            return <img src={val?.url} style={{ height: 350 }} className="img-fluid" />
                        })
                    } */}
                    <Carousel>
                        {
                            data?.data?.img?.map((val, index) => {
                                return <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={val?.url}
                                        alt="First slide"
                                        style={{ height: '340px' }}
                                    />
                                    {/* <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption> */}
                                </Carousel.Item>
                            })
                        }


                    </Carousel>

                </Col>
                <Col sm={12} md={6}>
                    <div>
                        <h4 style={{ fontSize: 55 }}>{data?.data?.name}</h4>
                        {/* IoLocation */}
                        <h4 style={{ fontSize: 18,color:'grey' }}><IoLocation/> {data?.data?.address}</h4>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '70%', marginTop: 50 }} >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            <MdAirlineSeatReclineNormal fontSize={35} />
                            <p style={{ fontSize: 15, margin: 0, fontWeight: 'bold' }}>{data?.data?.seats}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            <MdShoppingBag fontSize={35} />
                            <p style={{ fontSize: 15, margin: 0, fontWeight: 'bold' }}>{data?.data?.bags}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            <GiCarDoor fontSize={35} />
                            <p style={{ fontSize: 15, margin: 0, fontWeight: 'bold' }}>{data?.data?.doors}</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column' }}>
                            <p style={{ fontSize: 25, margin: 0, fontWeight: 'bold', color: 'orangered' }}>{data?.data?.fueltype?.slice(0, 1)}</p>
                            <p style={{ fontSize: 15, margin: 0, fontWeight: 'bold' }}>{data?.data?.fueltype}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column', width: '70%', marginTop: 30 }}>
                        <div>
                            <p style={{ fontSize: 25, margin: 0, fontWeight: 'bold' }}>₹{data?.data?.price}/- Per Hour</p>
                        </div>
                        {/* <div></div> */}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column', width: '70%', marginTop: 30 }}>
                        <div>
                            <RangePicker showTime={"HH:mm"} format="MMM DD yyyy HH:mm" onChange={selecttime} />
                        </div>
                    </div>
                    {
                        totaltime ?

                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column', width: '70%', marginTop: 30 }}>
                                <div>
                                    <p style={{ fontSize: 16, margin: 0 }}>Total Hours : <span style={{ fontSize: 16, margin: 0, fontWeight: 'bold' }}>{totaltime}</span> </p>
                                </div>
                                <div>
                                    <p style={{ fontSize: 16, margin: 0 }}>Rent per Hour : <span style={{ fontSize: 16, margin: 0, fontWeight: 'bold' }}>₹{data?.data?.price}</span> </p>
                                </div>
                                <div>
                                    <p style={{ fontSize: 30, margin: 0 }}>Total : <span style={{ fontSize: 30, margin: 0, fontWeight: 'bold' }}>₹ {data?.data?.price * totaltime}</span> </p>
                                </div>
                                {
                                    succlog? load?<button style={{ backgroundColor: 'transparent', color: 'orangered', outline: 'none', border: '1px solid orangered', padding: '5px 10px', fontSize: 16, fontWeight: 'bold',width:'200px' }} ><Spinner animation="border" variant="info" /></button> : <button style={{ backgroundColor: 'transparent', color: 'orangered', outline: 'none', border: '1px solid orangered', padding: '5px 10px', fontSize: 16, fontWeight: 'bold',width:'200px' }} onClick={orders} >Book Now</button>
:
<button style={{ backgroundColor: 'transparent', color: 'orangered', outline: 'none', border: '1px solid orangered', padding: '5px 10px', fontSize: 16, fontWeight: 'bold' ,width:'200px'}} onClick={()=>toast.error("Login to book car")} >Book No</button>

                                }


                               
                            </div> : null
                    }

                </Col>
                <ToastContainer/>
            </Row>
        </Container>
    )
}

export default Details