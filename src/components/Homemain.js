import { DatePicker } from 'antd'
import React, { useState } from 'react'
import moment from 'moment'
import { NavLink } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/antd.css';
import axios from 'axios'
import Searchbar from './Searchbar';
// import axios from 'axios';
const { RangePicker } = DatePicker

function Homemain() {
    const [fromtime, setfromtime] = useState()
    const [totime, settotime] = useState()
    const [totaltime, settotaltime] = useState()
    const [alladd, setalladd] = useState()
    const [sstatus, setsstatus] = useState()
    const [select, setselect] = useState()


    const selecttime = (value) => {
        setfromtime(moment(value[0]).format('MMM DD yyyy HH:mm'))
        settotime(moment(value[1]).format('MMM DD yyyy HH:mm'))
        settotaltime(value[1].diff(value[0], 'Hours'))



    }
    
 

    return (
        <div className='homemain'>
            <div className='homemaindiv'>
                <div className='homemainhead'>
                    <h2>The perfect car for your next trip is just around the corner
                        Book your drive now!</h2>
                </div>
                <div className='datecard'>
                    <p>Rent Your Self Drive Car</p>
                    <Searchbar setalladd={(v)=>setalladd(v)} setsstatus={(v)=>setsstatus(v)} setselect={(v)=>setselect(v)} select={select} alladd={alladd} sstatus={sstatus} />
                    <div>
                        

                                <RangePicker showTime={"HH:mm"} format="MMM DD yyyy HH:mm" onChange={selecttime} />

                    </div>
                    {
                        fromtime && select?.address ? <NavLink to={`/home/${JSON.stringify({ from: fromtime, to: totime, address: select, city: select?.city ,ttime:totaltime})}`}>
                            <button>Find Car</button>
                        </NavLink> :
                            <button onClick={() => toast.error('Select Date')} style={{backgroundColor:'grey'}}>Find Car</button>
                    }


                </div>

            </div>
            <ToastContainer />

        </div>
    )
}

export default Homemain