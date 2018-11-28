import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom'
import './App.css';

import Homepage from './Pages/Homepage.jsx'
import Spa from './Pages/Spa.jsx'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
         <Route exact path="/" component={Homepage}/>
         <Route path="/spa" component={Spa}/>

      </div>
    </Router>
    );
  }
}

export default App;
