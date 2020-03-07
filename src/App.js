import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Router, Route } from 'react-router';
import home from './stationery_pages/home';
import navbar from "./stationery_pages/navbar";


function App() {
  return (
       <Router>
          <div className="App">
            <Route path="/" component={navbar} exact></Route>
          </div>
            <div>
                <Route path="/" component={home} exact></Route>
            </div>



    </Router>
  );
}

export default App;
