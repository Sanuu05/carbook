import React, { useState } from 'react'
import {Navbar,Container,NavDropdown,Nav,Form,FormControl,Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from './../../action/user'
import logo from '../../img/logo.png'
function Navbarm({show,searchdata,tag}) {
  const succ = useSelector((state) => state.user.user)
  console.log('user',succ)
  const dispatch = useDispatch()
  const[sdata,setsdata] = useState()
  return (
    <Navbar bg="light" expand="lg">
  <Container>
    {
      show? <Navbar.Brand  href='/'><img src={logo} style={{width:'150px'}} alt='logo' /></Navbar.Brand>
      : <Navbar.Brand style={{cursor:'pointer'}} onClick={()=>tag==="home"?window.location.href="/": window.history?.back()}><img src={logo} style={{width:'150px'}} alt='logo' /></Navbar.Brand>
    }
   
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        
      </Nav>
      {
          show?
      
      <Form className="d-flex" onSubmit={(e)=>{
        e.preventDefault()
        searchdata(sdata)
      }}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={(v)=>setsdata(v)}

        />
        <Button variant="outline-success">Search</Button>
      </Form>:null}
      {
        succ? <NavDropdown title={succ?.name} id="navbarScrollingDropdown">
        <NavDropdown.Item href="/mybooking">My BOOKING</NavDropdown.Item>
        <NavDropdown.Item href="/post">POST A TESTIMONIAL</NavDropdown.Item>
        <NavDropdown.Item href="/mycars">MY TESTIMONIAL</NavDropdown.Item>
        <NavDropdown.Item href="/carorder">CAR ORDERED (delivery)</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>dispatch(logout())}>Logout</NavDropdown.Item>
        <NavDropdown.Divider />
      </NavDropdown>:
      <Nav.Link href="/login">Login</Nav.Link>

      }
     
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default Navbarm