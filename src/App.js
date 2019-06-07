import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.scss';

import Homepage from './Pages/Homepage'
import Spa from './Pages/Spa'
import Fb from './Pages/Fb'

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
         <Route exact path="/" component={Homepage}/>
         <Route path="/spa" component={Spa}/>
         <Route path="/fb" component={Fb}/>

      </div>
    </Router>
    );
  }
}

export default App;
