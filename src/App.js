import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import './App.scss';

import Header from './Components/Header'
import Homepage from './Pages/Homepage'
import Spa from './Pages/Spa'
import LaSarthe from './Pages/LaSarthe'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router>
          <div className="App">

             <Route exact path="/" component={Homepage}/>
             <Route path="/spa" component={Spa}/>
             <Route path="/le-mans" component={LaSarthe}/>

          </div>
      </Router>
    </div>
    );
  }
}

export default App;
