import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.scss'
import * as ROUTES from './constants/routes';

import Header from './Components/Header'
import {Homepage} from './Pages/Homepage'
import ForgotPassword from './Pages/ForgotPassword'
import NotLoggedIn from './Components/NotLoggedIn'
import Daytona from './Pages/Daytona'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <>
          <Header />
          <div className="App">
             <Route exact path={ROUTES.LANDING} component={Homepage}/>
             <Route path={ROUTES.PASSWORD_FORGET} component={ForgotPassword}/>
             <Route path={ROUTES.SIGN_IN} component={NotLoggedIn}/>
             <Route path={ROUTES.DAYTONA} component={Daytona}/>
          </div>
          </>
      </Router>
    </div>
    );
  }
}

export default App;
