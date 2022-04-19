import React, { useEffect, useState } from 'react'
import { Col, Container, Row, TabContainer, Spinner } from 'react-bootstrap'
import { BiImageAdd } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { senddata } from '../action/user'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';

function Posttesti() {

    const [brand, setbrand] = useState("Tata")
    const [carname, setcarname] = useState()
    const [filter, setfilter] = useState()
    const [fueltype, setfueltype] = useState('Petrol')
    const [transmission, settransmission] = useState('Manual')
    const [bags, setbags] = useState(1)
    const [image, setimage] = useState()
    const [activeimage, setactiveimage] = useState()
    const [imagelist, setimagelist] = useState()
    const [amount, setamount] = useState()
    const [alladd, setalladd] = useState()
    const [sstatus, setsstatus] = useState()
    const [select, setselect] = useState()
    const port = "https://carbb.herokuapp.com"
    const handleMultipleImages = (evnt) => {
        const selectedFIles = [];
        const targetFiles = evnt.target.files;

        const targetFilesObject = [...targetFiles]
        setimagelist(targetFilesObject)
        targetFilesObject.map((file) => {
            return selectedFIles.push(URL.createObjectURL(file))
        })
        setimage(selectedFIles);
        setactiveimage(selectedFIles[0])
    }
    const cars = [
        {
            brand: "Tata",
            list: [{
                name: "Tata Nexon",
                seats: 5,
                doors: 4,
                img: []
            },
            {
                name: "Tata Altroz",
                seats: 5,
                doors: 4
            },
            {
                name: "Tata Punch",
                seats: 5,
                doors: 4
            },
            {
                name: "Tata Punch",
                seats: 5,
                doors: 4
            },
            {
                name: "Tata Safari",
                seats: 7,
                doors: 4
            }
            ]
        },
        {
            brand: "Tata",
            list: [{
                name: "Tata Nexon",
                seats: 5,
                doors: 4
            },
            {
                name: "Tata Altroz",
                seats: 5,
                doors: 4
            },
            {
                name: "Tata Tigor",
                seats: 5,
                doors: 4
            },
            {
                name: "Tata Punch",
                seats: 5,
                doors: 4
            },
            {
                name: "Tata Safari",
                seats: 7,
                doors: 4
            }
            ]
        },


        {
            brand: "Honda",
            list: [{
                name: "Honda Amaze",
                seats: 5,
                doors: 4
            },
            {
                name: "Honda All New City",
                seats: 5,
                doors: 4
            },
            {
                name: "Honda Jazz",
                seats: 5,
                doors: 4
            },
            {
                name: "Honda New Jazz",
                seats: 5,
                doors: 4
            },
            {
                name: "Honda WR-V",
                seats: 5,
                doors: 4
            }
            ]
        },





        {
            brand: "Maruti Suzuki",
            list: [{
                name: "Maruti Suzuki Baleno",
                seats: 5,
                doors: 4
            },
            {
                name: "Maruti Suzuki Swift",
                seats: 5,
                doors: 4
            },
            {
                name: "Maruti Suzuki Wagon R",
                seats: 5,
                doors: 4
            },
            {
                name: "Maruti Suzuki Vitara Brezza",
                seats: 5,
                doors: 4
            },
            {
                name: "Maruti Suzuki Ertiga",
                seats: 7,
                doors: 4
            }
            ]
        },




        {
            brand: "Toyota",
            list: [{
                name: "Toyota Glanza",
                seats: 5,
                doors: 4
            },
            {
                name: "Toyota Urban Cruiser",
                seats: 5,
                doors: 4
            },
            {
                name: "Toyota Innova Crysta ",
                seats: 7,
                doors: 4
            },
            {
                name: "Toyota Fortuner",
                seats: 7,
                doors: 4
            }
            ]
        },


        {
            brand: "Hyundai",
            list: [{
                name: "Hyundai Venue",
                seats: 5,
                doors: 4
            },
            {
                name: "Hyundai Creta  ",
                seats: 5,
                doors: 4
            },
            {
                name: "Hyundai Grand i10 Nios",
                seats: 5,
                doors: 4
            },
            {
                name: "Hyundai i20",
                seats: 5,
                doors: 4
            },
            {
                name: "Hyundai Verna",
                seats: 5,
                doors: 4
            },
            {
                name: "Hyundai Aura",
                seats: 5,
                doors: 4
            }
            ]
        },

        {
            brand: "Mahindra & Mahindra",
            list: [{
                name: "Mahindra XUV700",
                seats: 7,
                doors: 4
            },
            {
                name: "Mahindra Thar  ",
                seats: 4,
                doors: 4
            },
            {
                name: "Mahindra XUV300",
                seats: 5,
                doors: 4
            }
            ]
        }
    ]
    const dispatch = useDispatch()
    const [load, setload] = useState(false)
    const postres = useSelector(p => p.post.postmsg)
    console.log('ppp', postres)
    useEffect(() => {
        if (postres) {
            // window.location.reload()
            toast.success('Car Added Sucessfully')
            setload(false)
        }

    }, [postres])
    useEffect(() => {
        const find = cars.find(p => p.brand === brand)
        setfilter(find)
        setcarname(JSON.stringify(find?.list[0]))

    }, [brand])
    console.log('find', imagelist)
    const filterimage = (data) => {
        const filter = image?.filter(p => p !== data)
        setimage(filter)
        setactiveimage(filter ? filter[0] : '')

    }
    const submit = () => {
        setload(true)
        var formData = new FormData();
        imagelist?.map((val) => {
            return formData.append('image', val);
        })
        formData.append('name', carname ? JSON.parse(carname)?.name : null);
        formData.append('brand', brand);
        formData.append('price', amount);
        formData.append('fueltype', fueltype);
        formData.append('bags', bags);
        formData.append('transmission', transmission);
        formData.append('address', select?.address);
        formData.append('city',select?.city );
        formData.append('seats', carname ? JSON.parse(carname)?.seats : null);
        formData.append('doors', carname ? JSON.parse(carname)?.doors : null);

        dispatch(senddata(formData))







    }
    const search = async (v) => {
        try {
            setsstatus(v.target.value)
            const { data } = await axios.get(`${port}/main/search/${v.target.value}`)
            // console.log('ddd', data?.order)
            // setdata(data)

            console.log(data)
            setalladd(data?.copResults)
        } catch (error) {

        }


    }
    return (
        <Container className='posttest'>
            <Row className='mt-5'>
                <Col sm={12} md={6} xl={6}>
                    <div>

                        <img src={activeimage ? activeimage : "https://media.istockphoto.com/vectors/car-front-icon-or-sign-black-vehicle-silhouette-isolated-on-white-vector-id1059581060?k=20&m=1059581060&s=612x612&w=0&h=d5Rd6h0YOeCyTax4L8gz28-gDBZl6AlPLR-LbIcVxAo="} className='img-fluid' style={{ height: 350, width: '100%', objectFit: 'contain' }} />

                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', marginTop: 10 }}>

                            {
                                image?.map((val) => {
                                    return <div className={activeimage === val ? "shadow img-fluid p-2" : 'img-fluid p-2'} style={{ position: 'relative' }}>
                                        <MdCancel style={{ cursor: 'pointer', position: 'absolute', margin: 5, background: 'white' }} onClick={() => filterimage(val)} />

                                        <img src={val} className='img-fluid p-0' style={{ height: 100, width: 100, objectFit: 'contain', marginRight: 10, cursor: 'pointer' }} onClick={(e) => setactiveimage(val)} />
                                    </div>
                                })
                            }




                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <label for="file-upload" class="custom-file-upload">
                            <BiImageAdd fontSize={80} style={{ color: 'orangered', cursor: 'pointer' }} />
                        </label>
                        <input id="file-upload" type="file" className='d-none' onChange={handleMultipleImages} multiple />
                    </div>
                </Col>
                <Col sm={12} md={6} xl={6}>
                    <Row>
                        <Col sm={12} md={12} xl={12} className="mt-2">
                            <p className='m-0'>Car Brand</p>
                            <select id="cars" value={brand} onChange={(e) => setbrand(e.target.value)}>

                                <option value="Tata">Tata</option>
                                <option value="Honda">Honda</option>
                                <option value="Maruti Suzuki">Maruti Suzuki</option>
                                <option value="Toyota">Toyota</option>
                                <option value="Hyundai">Hyundai</option>
                                <option value="Mahindra & Mahindra">Mahindra & Mahindra</option>
                            </select>
                        </Col>
                        <Col sm={12} md={12} xl={12} className="mt-2">
                            <p className='m-0'>Car Name</p>
                            <select id="cars" value={carname} onChange={(e) => setcarname((e.target.value))}>
                                {
                                    filter?.list?.map((val) => {
                                        return <option value={JSON.stringify(val)} >{val.name}</option>
                                    })
                                }

                            </select>
                        </Col>
                        <Col sm={6} md={6} xl={6} className="mt-2">
                            <p className='m-0'>Seating Capacity</p>
                            <input value={carname ? JSON.parse(carname)?.seats : null} />
                        </Col>
                        <Col sm={6} md={6} xl={6} className="mt-2">
                            <p className='m-0'>Doors</p>
                            <input value={carname ? JSON.parse(carname)?.doors : null} />
                        </Col>
                        <Col sm={6} md={6} xl={6} className="mt-2">
                            <p className='m-0'>Fuel Type</p>
                            <select id="cars" value={fueltype} onChange={(e) => setfueltype(e.target.value)}>

                                <option value="Petrol">Petrol</option>
                                <option value="Disel">Disel</option>
                                <option value="Electric">Electric</option>

                            </select>
                        </Col>
                        <Col sm={6} md={6} xl={6} className="mt-2">
                            <p className='m-0'>Transmission</p>
                            <select id="cars" value={transmission} onChange={(e) => settransmission(e.target.value)}>

                                <option value="Manual">Manual</option>
                                <option value="Automatic">Automatic</option>


                            </select>
                        </Col>
                        <Col sm={6} md={6} xl={6} className="mt-2">
                            <p className='m-0'>Bags</p>
                            <select id="cars" value={bags} onChange={(e) => setbags(e.target.value)}>

                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>



                            </select>
                        </Col>
                        <Col sm={12} md={6} xl={6} className="mt-2">
                            <p className='m-0'>Price per Hours</p>
                            <input placeholder='Ex: 500 per Hors' onChange={(e) => setamount(e.target.value)} />
                        </Col>
                        <Col sm={12} md={12} xl={12} className="mt-2">
                            <p className='m-0'>Location</p>
                            <input placeholder='Location' value={select?.address} type='text' className='sinput' onChange={search} />
                            {
                                alladd && sstatus ?
                                    <div className='suggest' style={{minHeight:'80px',maxHeight:'150px',border:'border: 1px solid #d9d9d9',overflowY:'scroll'}} >
                                        {
                                            alladd?.map((v, i) => {
                                                return <p style={{cursor:'pointer'}} onClick={() => {
                                                    setselect({ address: v?.formattedAddress, city: v?.city })
                                                    setsstatus('')
                                                }}>{v?.formattedAddress}</p>
                                            })
                                        }

                                    </div>
                                    : null
                            }
                        </Col>


                        <Col sm={12} md={12} xl={12} className="mt-2">
                            {/* style={{ backgroundColor: 'transparent', color: 'orangered', outline: 'none', border: '1px solid orangered', padding: '5px 10px', fontSize: 16, fontWeight: 'bold',width:'200px' }} ><Spinner animation="border" variant="info" /></button> :  */}
                            {
                                load ? <button style={{ backgroundColor: 'transparent', color: 'orangered', outline: 'none', border: '1px solid orangered', padding: '5px 10px', fontSize: 16, fontWeight: 'bold', width: '200px' }} ><Spinner animation="border" variant="info" />
                                </button > : <button style={{ backgroundColor: 'transparent', color: 'orangered', outline: 'none', border: '1px solid orangered', padding: '5px 10px', fontSize: 16, fontWeight: 'bold', width: '200px' }} onClick={submit}>Submit
                                </button >
                            }

                        </Col>


                    </Row>

                </Col>
                <ToastContainer />
            </Row>
        </Container>
    )
}

export default Posttesti