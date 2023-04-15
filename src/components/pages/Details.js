import React, { useEffect, useState } from 'react'
import { Container, Col, Row, Carousel, Spinner } from 'react-bootstrap'
import { MdAirlineSeatReclineNormal, MdShoppingBag } from "react-icons/md";
import { GiCarDoor } from 'react-icons/gi'
import { DatePicker, message } from 'antd';
import { useParams } from 'react-router-dom'
import 'antd/dist/antd.css';
import { async } from '@firebase/util';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { allorders } from '../../action/user'
import { IoLocation, IoTodaySharp } from 'react-icons/io5'
function Details() {
    const [totaltime, settotaltime] = useState()
    const [data, setdata] = useState()
    const { id } = useParams()
    const mdata = JSON.parse(id)
    const dispatch = useDispatch()
    const [load, setload] = useState(false)

    const port = "https://cariva.onrender.com"
    useEffect(() => {
        if (mdata?.id) {
            detail(mdata?.id)
        }
        dispatch(allorders())


    }, [mdata?.id])
    const allord = useSelector(state => state.allorders.allorders)
    console.log('sss', mdata)
    const detail = async (ids) => {
        try {
            const { data } = await axios.get(`${port}/main/detail/${ids}`)
            console.log('ddd', data?.order)
            setdata(data)
        } catch (error) {
            console.log('err', error)
        }


    }


    const succlog = useSelector((state) => state.user.user)
    const postres = useSelector(p => p.post.ordersuc)
    const token = useSelector((state) => state.user.token)
    console.log('usedata', succlog)
    useEffect(() => {
        if (postres) {
            toast.success("Order Placed Sucessfully")
            setload(false)
            settotaltime('')
        }

    }, [postres])




    const paydata = {
        total: Number((data?.data?.price * mdata?.ttime)?.toFixed(2))
        
    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    async function displayRazorpay() {
        // e.preventDefault()
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }


        const result = await axios.post("https://cariva.onrender.com/main/order", paydata);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_fvOAKuvkkgRaoU", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Cariva",
            description: "Test Transaction",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data1 = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    totaldata: paydata,
                    carid: data?.data?._id,
                    address: mdata?.address?.address,
                    from: mdata?.from,
                    to: mdata?.to,
                    hours: mdata?.ttime,
                    amount: data?.data?.price * totaltime

                };
                console.log('tokenn', token)

                const result = await axios.post("https://cariva.onrender.com/main/success", data1, { headers: { "x-auth-token": token } });
        
                if (result) {
                    window.location.href = '/mybooking'
                }
            },
            prefill: {
                name: succlog?.name,
                email: succlog?.email
                // contact:userdata.mobile,
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <Container>
            <Row style={{ marginTop: 100 }}>
                <Col sm={12} md={6} xl={6} >


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

                                </Carousel.Item>
                            })
                        }


                    </Carousel>

                </Col>
                <Col sm={12} md={6}>
                    <div>
                        <h4 style={{ fontSize: 55 }}>{data?.data?.name}</h4>
                        {/* IoLocation */}
                        <h4 style={{ fontSize: 18, color: 'grey' }}><IoLocation /> {data?.data?.address}</h4>
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
                    <h4 style={{ fontSize: 15, color: 'grey', marginTop: '15px' }}><IoLocation style={{ fontSize: 30, color: 'gray' }} /> {mdata?.address?.address}</h4>
                    <h4 style={{ fontSize: 15, color: 'grey', marginTop: '15px' }}><IoTodaySharp style={{ fontSize: 30, color: 'gray' }} /> {mdata?.from} - {mdata?.to}</h4>



                    {
                        mdata?.ttime ?

                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column', width: '70%', marginTop: 30 }}>
                                <div>
                                    <p style={{ fontSize: 16, margin: 0 }}>Total Hours : <span style={{ fontSize: 16, margin: 0, fontWeight: 'bold' }}>{mdata?.ttime}</span> </p>
                                </div>
                                <div>
                                    <p style={{ fontSize: 16, margin: 0 }}>Rent per Hour : <span style={{ fontSize: 16, margin: 0, fontWeight: 'bold' }}>₹{data?.data?.price}</span> </p>
                                </div>
                                <div>
                                    <p style={{ fontSize: 30, margin: 0 }}>Total : <span style={{ fontSize: 30, margin: 0, fontWeight: 'bold' }}>₹ {data?.data?.price * mdata?.ttime}</span> </p>
                                </div>
                                {
                                    succlog ? load ? <button style={{ backgroundColor: 'transparent', color: 'orangered', outline: 'none', border: '1px solid orangered', padding: '5px 10px', fontSize: 16, fontWeight: 'bold', width: '200px', marginBottom: '20px' }} ><Spinner animation="border" variant="info" /></button> : <button style={{ backgroundColor: 'transparent', color: 'orangered', outline: 'none', border: '1px solid orangered', padding: '5px 10px', fontSize: 16, fontWeight: 'bold', width: '200px', marginBottom: '20px' }} onClick={displayRazorpay} >Book Now</button>
                                        :
                                        <button style={{ backgroundColor: 'transparent', color: 'orangered', outline: 'none', border: '1px solid orangered', padding: '5px 10px', fontSize: 16, fontWeight: 'bold', width: '200px', marginBottom: '20px' }} onClick={() => toast.error("Login to book car")} >Book Now</button>

                                }



                            </div> : null
                    }

                </Col>
                <ToastContainer />
            </Row>
        </Container>
    )
}

export default Details