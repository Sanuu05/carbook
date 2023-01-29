import React, { useEffect, useState } from 'react'
import { DatePicker } from 'antd'
import { Container, Col, Row, Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import Homecard from './Homecard'
import moment from 'moment'
import {IoLocation,IoTodaySharp} from 'react-icons/io5'
import {AiFillEdit,AiOutlineClose} from 'react-icons/ai'
import Searchbar from './Searchbar'
const { RangePicker } = DatePicker
function Home({sdata}) {
    const [fromtime, setfromtime] = useState()
    const [totime, settotime] = useState()
    const [totaltime, settotaltime] = useState()
    const [alladd, setalladd] = useState()
    const [sstatus, setsstatus] = useState()
    const [select, setselect] = useState()
    const [edit,setedit] = useState(false)

console.log('ttime',sdata)
    const selecttime = (value) => {
        setfromtime(moment(value[0]).format('MMM DD yyyy HH:mm'))
        settotime(moment(value[1]).format('MMM DD yyyy HH:mm'))
        settotaltime(value[1].diff(value[0], 'Hours'))



    }
   
    const cars = useSelector(state=>state.all?.allcars)
    const { id } = useParams()
    const srch = JSON.parse(id)
    useEffect(()=>{
setfromtime(srch.from)
setselect(srch.address)
settotime(srch.to)
settotaltime(srch.ttime)
    },[])
    console.log('cars',cars)
    // settotime(srch.totime)
    const filt = cars?.map((v,i)=>{
        console.log('vaa',v)
        console.log('vaacv',srch)

        const filter =v?.findorder?.filter(p=>p.from >=srch?.from && p.to<=srch?.to)
        const filtercity =v?.val?.city ===srch?.city
        console.log('vbbb',filtercity)
        return filter?.length==0 && filtercity?v:null
        
    })
    console.log(srch)
    return (
        <div className='homem'>
        <Container >
            <div style={{position:'relative'}}>
                {
                    edit?null:
                
<>
<h4 style={{ fontSize: 15,color:'grey' ,marginTop:'15px'}}><IoLocation style={{ fontSize: 30,color:'gray' }}/> {srch?.address?.address}</h4>
             <h4 style={{ fontSize: 15,color:'grey' ,marginTop:'15px'}}><IoTodaySharp style={{ fontSize: 30,color:'gray' }}/> {srch?.from} - {srch?.to}</h4>
             {/* <button onClick={()=>setedit(true)} >EDit</button> */}
</>
}
            
            {
                edit?<AiOutlineClose  style={{fontSize:'25px',position:'absolute',right:10,zIndex:99,cursor:'pointer',top:20}} onClick={()=>setedit(false)}/>:
            
             <AiFillEdit style={{fontSize:'25px',position:'absolute',right:10,zIndex:99,cursor:'pointer',top:0}} onClick={()=>setedit(true)}/>
            }
             
             {
                edit?
                <div style={{paddingTop:'60px'}} >
             <Searchbar  setalladd={(v)=>setalladd(v)} setsstatus={(v)=>setsstatus(v)} setselect={(v)=>setselect(v)} select={select} alladd={alladd} sstatus={sstatus} />
             <RangePicker defaultValue={[moment(srch?.from,"MMM DD yyyy HH:mm"),moment(srch?.to,"MMM DD yyyy HH:mm")]}  showTime={"HH:mm"} format="MMM DD yyyy HH:mm" onChange={selecttime} />
             {/* <button>Modify</button> */}
             {
                        fromtime && select?.address ?
             <a href={`/home/${JSON.stringify({ from: fromtime, to: totime, address: select, city: select?.city,ttime:totaltime })}`}>
                            <button>Modify</button>
                        </a>:null}
             </div>:null
             }
             </div>
             
             
             
            <Row>
                {
                    filt?.map((val,index)=>{
                        return val===null?null:  <Homecard cars={val} fil={JSON.parse(id)} hdata={{ from: fromtime, to: totime, address: select, city: select?.city,ttime:totaltime} }/>
                    })
                }
            </Row>
        </Container>
        </div>
    )
}

export default Home