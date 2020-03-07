import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
	Navbar,
	Nav,
	NavItem,
	NavDropdown,
	Glyphicon,
	Form,
	FormControl,
	Button,
	Jumbotron,
	Container,
	Image,
} from "react-bootstrap";
import './home.css';


// import {add_note} from './noteFunction';
// import {myFunction} from './dropdownbutton';
const home = () => (
<Container>
	<Jumbotron fluid>
	   <Container>
		   <h1>Stationery Store</h1>
		</Container>
	</Jumbotron>
	<Image id="navimg" src="./images/navimage.jpg"  />
</Container>


);

export default home;