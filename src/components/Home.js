import React from 'react'
import { Container, Col, Row, Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Homecard from './Homecard'
import {IoLocation,IoTodaySharp} from 'react-icons/io5'
function Home() {
    const cars = useSelector(state=>state.all?.allcars)
    const { id } = useParams()
    const srch = JSON.parse(id)
    console.log('cars',cars)
    const filt = cars?.map((v,i)=>{
        console.log('vaa',v)
        console.log('vaacv',srch)

        const filter =v?.findorder?.filter(p=>p.from >=srch?.from && p.to<=srch?.to)
        const filtercity =v?.val?.city ===srch?.city
        console.log('vbbb',filtercity)
        return filter?.length==0 && filtercity?v:null
        
    })
    console.log(filt)
    return (
        <Container>
             <h4 style={{ fontSize: 15,color:'grey' ,marginTop:'15px'}}><IoLocation style={{ fontSize: 30,color:'gray' }}/> {srch?.address}</h4>
             <h4 style={{ fontSize: 15,color:'grey' ,marginTop:'15px'}}><IoTodaySharp style={{ fontSize: 30,color:'gray' }}/> {srch?.from} - {srch?.to}</h4>
             
            <Row>
                {
                    filt?.map((val,index)=>{
                        return val===null?null:  <Homecard cars={val} fil={JSON.parse(id)}/>
                    })
                }
            </Row>
        </Container>
    )
}

export default Home