import { DatePicker } from 'antd'
import React, { useState } from 'react'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import axios from 'axios'
// import axios from 'axios';
const { RangePicker } = DatePicker

function Homemain() {
    const [fromtime, setfromtime] = useState()
    const [totime, settotime] = useState()
    const [totaltime, settotaltime] = useState()
    const [alladd, setalladd] = useState()
    const [sstatus, setsstatus] = useState()
    const [select, setselect] = useState()
    const [input, setinput] = useState()


    const selecttime = (value) => {
        setfromtime(moment(value[0]).format('MMM DD yyyy HH:mm'))
        settotime(moment(value[1]).format('MMM DD yyyy HH:mm'))
        settotaltime(value[1].diff(value[0], 'Hours'))



    }
    console.log(JSON.stringify({ from: fromtime, to: totime }))
    const port = "https://carbb.herokuapp.com"
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
    console.log(alladd?.copResults?.map((v) => v?.formattedAddress))

    return (
        <div className='homemain'>
            <div className='homemaindiv'>
                <div className='datecard'>
                    <p>Trip</p>
                    <div style={{ position: 'relative' }}>
                        <input placeholder='Location' value={select?.address} type='text' className='sinput' onChange={search} />
                        {
                            alladd && sstatus ?
                                <div className='suggest' >
                                    {
                                        alladd?.map((v, i) => {
                                            return <p onClick={() => {
                                                setselect({ address: v?.formattedAddress,city:v?.city })
                                                setsstatus('')
                                            }}>{v?.formattedAddress}</p>
                                        })
                                    }

                                </div>
                                : null
                        }
                    </div>
                    <div>
                        {
                            select ?

                                <RangePicker showTime={"HH:mm"} format="MMM DD yyyy HH:mm" onChange={selecttime} /> : null
                        }

                    </div>
                    {
                        fromtime ? <NavLink to={`/home/${JSON.stringify({ from: fromtime, to: totime,address:select?.address,city: select?.city})}`}>
                            <button>Find Car</button>
                        </NavLink> :
                            <button onClick={() => toast.error('Select Date')}>Find Car</button>
                    }


                </div>

            </div>
            <ToastContainer />

        </div>
    )
}

export default Homemain