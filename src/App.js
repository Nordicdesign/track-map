import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './App.scss'
import * as ROUTES from './constants/routes';

import UserProvider from './providers/UserProvider'
import Header from './Components/Header'
import { Homepage } from './Pages/Homepage'
import ForgotPassword from './Pages/ForgotPassword'
// import NotLoggedIn from './Components/NotLoggedIn'
import LoginPage from './Components/Login'
import SignUpForm from './Components/Signup';
import TrackHolder from './Pages/TrackHolder'

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <UserProvider>
            <Header />
            <div className="App">
               <Route exact path={ROUTES.LANDING} component={Homepage}/>
               <Route path={ROUTES.PASSWORD_FORGET} component={ForgotPassword}/>
               <Route path={ROUTES.SIGN_IN} component={LoginPage}/>
               <Route path={ROUTES.SIGN_UP} component={SignUpForm}/>
               <Route path="/tracks/:trackName" component={TrackHolder}/>
            </div>
        </UserProvider>
      </Router>
    </div>
    );
  }
}

export default App;
