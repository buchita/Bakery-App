import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav, NavItem, NavDropdown, Glyphicon, Form, FormControl, Button} from "react-bootstrap";


const navbar = () => (

    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home">Stationery Store</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Products</Nav.Link>
      <Nav.Link href="#pricing">Reviews</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>




);

export default navbar;