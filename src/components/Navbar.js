import React from 'react'
import {Navbar,Container,NavDropdown,Nav,Form,FormControl,Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from './../action/user'
import {useLocation} from 'react-router-dom'
function Navbarm({show}) {
  const succ = useSelector((state) => state.user.user)
  console.log('user',succ)
  const dispatch = useDispatch()
  const location = useLocation()
  return (
    <Navbar bg="light" expand="lg">
  <Container>
    {
      show? <Navbar.Brand  href='/'>CarBx</Navbar.Brand>
      : <Navbar.Brand style={{cursor:'pointer'}} onClick={()=>window.history?.back()}>CarB</Navbar.Brand>
    }
   
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
      <Nav
        className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll
      >
        {/* <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/login">Login</Nav.Link>
        <NavDropdown title="Link" id="navbarScrollingDropdown">
          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action5">
            Something else here
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#" disabled>
          Link
        </Nav.Link> */}
      </Nav>
      {
          show?
      
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
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
        {/* <NavDropdown.Item href="#action5">
          Something else here
        </NavDropdown.Item> */}
      </NavDropdown>:
      <Nav.Link href="/login">Login</Nav.Link>

      }
     
    </Navbar.Collapse>
  </Container>
</Navbar>
  )
}

export default Navbarm