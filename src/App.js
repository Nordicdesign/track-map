import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.css';

import Homepage from './Pages/Homepage'
import Spa from './Pages/Spa'

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
