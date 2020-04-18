import React, { Component } from 'react';
import './App.css';

import Firebase from './component/Firebase/firebase';
import MenuList from './component/list-component';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import header from './images/header2.jpg';
import UserRegistration from './component/user/user-signup-component';
import UserLogin from './component/user/user-login-component';
import UserAccount from './component/user/account';
import { FaUser, FaShoppingBasket } from 'react-icons/fa';
import Item from './component/item';
import Basket from './component/basket';


// import "bootstrap/dist/js/bootstrap";
// import "jquery/dist/jquery"

//https://css-tricks.com/intro-firebase-react/


class App extends Component {
  constructor(props) {
    super(props);
    // set up react state
    this.state = {
      inputname: '',
      inputimage: '',
      inputingredient: '',
      inputtype: '',
      collapsed: true,

    };

    //binding
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);


  }


  handleSubmit(e) {
    e.preventDefault(); // prevent form submit from reloading the page
    

    const itemRef = Firebase.database().ref('bakery');

    const item =
    {
      name: this.state.inputname,
      image: this.state.inputimage,
      ingredient: this.state.inputingredient,
      type: this.state.inputtype
    }

    /* Send the message to Firebase */
    itemRef.push(item);

    // clear the input
    this.setState(
      {
        inputname: '',
        inputimage: '',
        inputingredient: '',
        inputtype: ''
      }
    )

  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value

    });
  }



  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }


  render() {
    // https://www.bennettnotes.com/bootstrap-navbar-collapse-reactjs/
    const collapsed = this.state.collapsed;
    const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
    return (
      <Router>
        <div className="App">
          {/* <div>
          //add event listner
            <form onSubmit={this.handleSubmit}>
            
              <input type="text" name="inputname" placeholder="What's your name?" onChange={this.handleChange} value={this.state.inputname} />
              <input type="text" name="inputimage" placeholder="image?" onChange={this.handleChange} value={this.state.inputimage} />
              <input type="text" name="inputingredient" placeholder="ingredient" onChange={this.handleChange} value={this.state.inputingredient} />
              <input type="text" name="inputtype" placeholder="type" onChange={this.handleChange} value={this.state.inputtype} />

              <button>Add Item</button>
            </form>
          </div> */}



          <div className="container">

            <nav className="navbar navbar-expand-lg navbar-light">
              {/* <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a> */}
              <Link to="/" className="navbar-brand">Bakery</Link>
              <button  type="button" onClick={this.toggleNavbar}
                data-toggle="collapse" data-target="#mynavbar" className={`${classTwo}`}
                aria-controls="mynavbar" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>


              <div className={`${classOne}`} id="mynavbar">
                <ul className="navbar-nav ml-auto">
                  <li className="navbar-item">
                    <Link to="/" className="nav-link">Menu</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/signup" className="nav-link" data-toggle="tooltip" data-placement="bottom" title="User Account"><FaUser /></Link>
                  </li>
                  <li className="navbar-item">
                  <Link to="/basket" className="nav-link" data-toggle="tooltip" data-placement="bottom" title="Basket"><FaShoppingBasket /></Link>
                </li>
                {/* <li className="navbar-item">
                  <Link to="/gallery" className="nav-link">Gallery</Link>
                </li> */}
                </ul>
              </div>
            </nav>
          </div>


          <div className="container">
            <img className="photo" src={header} alt="header" />

          </div>



          <div className="container">
            <div id="title" className="container"><h1>Bakery</h1></div>

            <Route path="/" exact component={MenuList} />
            <Route path="/signup" component={UserRegistration} />
            <Route path="/login" component={UserLogin} />
            <Route path="/account" component={UserAccount} />
            <Route path="/item" component={Item} />
            <Route path="/basket" component={Basket} />

            {/* <Route path="/gallery" component={Gallery} />
              <Route path="/edit/:id" component={EditList} /> */}


          </div>

        </div>
      </Router>
    );
  }

}

export default App;
