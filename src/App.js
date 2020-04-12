import React, { Component } from 'react';
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CreateList from './components/create-list.component';
import DisplayList from './components/list.component';
import EditList from './components/edit-list.component';


class App extends Component {
  render()
  {
    return(
      <Router>
        <div className="container">

          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* <a class="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a> */}
            <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>

          <br/>

          <h1>MERN Enterprise App</h1>
          <Route path="/" exact component={DisplayList} />
          <Route path="/edit/:id" component={EditList} />
          <Route path="/create" component={CreateList} />
        </div>
       
      </Router>
    );
  }
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       {/* <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a> */}
  //       <div className="container">
  //         <h2>MERN-Stack Enterprise App</h2>
  //       </div>



  //     </header>
  //   </div>
  // );
}

export default App;
